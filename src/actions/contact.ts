"use server";

import { Resend } from "resend";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(2, "Please tell me your name").max(80),
  email: z.email("That email address doesn't look right"),
  service: z.string().trim().min(2).max(60),
  budget: z.string().trim().max(60).optional().or(z.literal("")),
  message: z.string().trim().min(20, "A couple of sentences helps me answer properly").max(3000),
  // Spam traps: a field people cannot see, and the time the form was rendered.
  company_website: z.string().max(0).optional().or(z.literal("")),
  startedAt: z.coerce.number(),
});

export type ContactState = {
  ok: boolean;
  errors?: Partial<Record<"name" | "email" | "service" | "message" | "form", string>>;
};

export async function sendEnquiry(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const parsed = schema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    console.error("Enquiry rejected:", parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.code}`).join(", "));
    const errors: ContactState["errors"] = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if (field === "company_website" || field === "startedAt") return { ok: true };
      if (field === "name" || field === "email" || field === "service" || field === "message") {
        errors[field] ??= issue.message;
      }
    }
    return { ok: false, errors };
  }

  const data = parsed.data;

  // Quietly accept bot submissions so they stop trying, and drop them.
  if (data.company_website) return { ok: true };
  if (Date.now() - data.startedAt < 3000) return { ok: true };

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";

  if (!apiKey || !to) {
    console.error("Contact form is not configured: RESEND_API_KEY or CONTACT_TO_EMAIL is missing");
    return { ok: false, errors: { form: "The form is not set up yet. Please try again later." } };
  }

  const lines = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Needs: ${data.service}`,
    `Budget: ${data.budget || "not given"}`,
    "",
    data.message,
  ];

  try {
    const { error } = await new Resend(apiKey).emails.send({
      from: `Portfolio enquiry <${from}>`,
      to: [to],
      replyTo: data.email,
      subject: `Portfolio enquiry: ${data.service} from ${data.name}`,
      text: lines.join("\n"),
    });
    if (error) {
      console.error("Resend rejected the enquiry", error.name);
      return { ok: false, errors: { form: "Something went wrong sending that. Please try again." } };
    }
  } catch (err) {
    console.error("Enquiry failed to send", err instanceof Error ? err.name : "unknown error");
    return { ok: false, errors: { form: "Something went wrong sending that. Please try again." } };
  }

  return { ok: true };
}
