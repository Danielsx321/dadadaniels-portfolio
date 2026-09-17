import type { Metadata } from "next";
import Image from "next/image";
import { CalEmbed } from "@/components/contact/cal-embed";
import { ContactForm } from "@/components/contact/contact-form";
import { SectionHeading } from "@/components/sections/section-heading";
import { process as steps } from "@/content/process";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell me what you need built or fixed, or book a 30 minute call. WordPress, web apps, no-code and event tech.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const calLink = process.env.NEXT_PUBLIC_CAL_LINK?.trim();

  return (
    <div className="mx-auto max-w-site px-5 pt-36 pb-24">
      <SectionHeading
        as="h1"
        eyebrow="Contact"
        title="Tell me what you"
        accent="need built"
        intro="Send a message with a little detail, or book a call and we can talk it through."
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <ContactForm />
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {steps.map((s, i) => (
              <li key={s.name} className="rounded-2xl border border-glass-line bg-white/3 p-4">
                <span className="font-serif text-lg text-mint italic">{String(i + 1).padStart(2, "0")}</span>
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

          {calLink ? (
            <div className="mt-4">
              <h2 className="mb-3 text-lg font-semibold">Book a 30 minute call</h2>
              <CalEmbed link={calLink} />
            </div>
          ) : (
            <div className="glass mt-4 rounded-[22px] p-6">
              <h2 className="text-lg font-semibold">Prefer a call?</h2>
              <p className="mt-2 text-muted">
                Call booking is being set up. Send a message and say a call suits you better, and I&apos;ll send times.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
