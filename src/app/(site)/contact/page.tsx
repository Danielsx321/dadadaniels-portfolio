import type { Metadata } from "next";
import Image from "next/image";
import { CalendlyEmbed } from "@/components/contact/calendly-embed";
import { ContactForm } from "@/components/contact/contact-form";
import { SectionHeading } from "@/components/sections/section-heading";
import { process as steps } from "@/content/process";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell me what you need built or fixed, or book a 30 minute call. WordPress, web apps, no-code and event tech.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const calendlyUrl = (() => {
    const raw = process.env.NEXT_PUBLIC_CALENDLY_URL?.trim();
    if (!raw) return undefined;
    try {
      return new URL(raw).hostname.endsWith("calendly.com") ? raw : undefined;
    } catch {
      return undefined;
    }
  })();
  // Without a mail provider the form cannot deliver, so offer a route that works instead.
  const formWorks = Boolean(process.env.RESEND_API_KEY?.trim() && process.env.CONTACT_TO_EMAIL?.trim());

  return (
    <div className="mx-auto max-w-site px-5 pt-36 pb-24">
      <SectionHeading
        as="h1"
        eyebrow="Contact"
        title="Tell me what you"
        accent="need built"
        intro={
          formWorks
            ? "Send a message with a little detail, or book a call and we can talk it through."
            : "Send me a direct message with a little detail and we can talk it through."
        }
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-[1.05fr_1fr]">
        <div>
          {formWorks ? (
            <ContactForm />
          ) : (
            <div className="glass rounded-[22px] p-6 sm:p-8">
              <h2 className="text-2xl font-semibold tracking-[-0.02em]">Message me on social</h2>
              <p className="mt-3 text-muted">
                The message form here is being set up. In the meantime the quickest way to reach me is a direct message.
              </p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-3">
                {site.socials.map((s) => (
                  <li key={s.href}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block rounded-2xl border border-glass-line bg-tint/4 px-4 py-3.5 text-center font-semibold hover:border-mint-ink/40"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-subtle">
                Hiring through Upwork? Send me the job link there and I will reply with a plan.
              </p>
            </div>
          )}
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {steps.map((s, i) => (
              <li key={s.name} className="rounded-2xl border border-glass-line bg-tint/3 p-4">
                <span className="font-serif text-lg text-mint-ink italic">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-1 text-[15px] font-semibold">{s.name}</p>
                <p className="text-[13px] text-muted">{s.text}</p>
              </li>
            ))}
          </ul>
        </div>

        <div id="book" className="scroll-mt-28">
          <div className="glass flex items-center gap-3 rounded-[22px] p-5">
            <Image src="/me/avatar.jpg" alt="" width={48} height={48} className="rounded-full" />
            <p className="text-sm text-muted">
              <b className="block font-medium text-text">You&apos;ll talk to me directly</b>
              Based in Lagos, working with clients across the US, Europe and Africa.
            </p>
          </div>

          {calendlyUrl ? (
            <div className="mt-4">
              <h2 className="mb-3 text-lg font-semibold">Book a 30 minute call</h2>
              <CalendlyEmbed url={calendlyUrl} />
            </div>
          ) : (
            <div className="glass mt-4 rounded-[22px] p-6">
              <h2 className="text-lg font-semibold">Prefer a call?</h2>
              <p className="mt-2 text-muted">
                Call booking is being set up. {formWorks ? "Send a message" : "Message me on social"} and say a call
                suits you better, and I&apos;ll send times.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
