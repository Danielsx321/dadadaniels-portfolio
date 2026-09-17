import type { Metadata } from "next";
import Image from "next/image";
import { GlowCard } from "@/components/motion/glow-card";
import { Reveal } from "@/components/motion/reveal";
import { CtaBlock } from "@/components/sections/cta-block";
import { SectionHeading } from "@/components/sections/section-heading";
import { Pill } from "@/components/ui/pill";
import { process as steps } from "@/content/process";

export const metadata: Metadata = {
  title: "About",
  description:
    "Daniels is a web developer in Lagos, Nigeria, building WordPress sites, web apps and event tech for clients across the US, Europe and Africa.",
  alternates: { canonical: "/about" },
};

const tools = [
  { lane: "WordPress", items: ["Elementor Pro", "WooCommerce", "ACF Pro", "TranslatePress", "WPML", "Rank Math"] },
  { lane: "Full Stack", items: ["Next.js", "TypeScript", "Supabase", "Tailwind", "Stripe", "Claude API"] },
  { lane: "No-Code", items: ["Bubble", "n8n", "Zapier", "Make"] },
  { lane: "Event Tech", items: ["Tickera", "QR check-in", "The Events Calendar", "Registration flows"] },
];

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto max-w-site px-5 pt-36 pb-24">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] border border-glass-line shadow-[0_40px_100px_rgb(0_0_0/0.5)]">
            <Image
              src="/me/portrait.jpg"
              alt="Daniels, web developer based in Lagos"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 560px"
              className="object-cover object-[50%_20%]"
            />
          </div>
          <div>
            <Pill>About</Pill>
            <h1 className="mt-5 text-[clamp(40px,6vw,76px)] leading-[1] font-semibold tracking-[-0.045em]">
              Hi, I&apos;m <span className="accent">Daniels</span>
            </h1>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted">
              <p>
                I&apos;m a web developer based in Lagos, Nigeria. I build WordPress sites, web apps and event systems for
                small businesses, nonprofits, event organizers and agencies across the US, Europe and Africa.
              </p>
              <p>
                Most of my work touches money, bookings or people: donations, ticket sales, registrations, check-ins and
                logins. That is where a site has to actually work, so that is where I spend my attention.
              </p>
              <p>
                <strong className="font-medium text-text">You deal with me directly</strong>, from the first look at
                your site to handover. I design and code, so nothing gets lost between a designer and a developer.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-site px-5 pb-28">
        <Reveal>
          <SectionHeading eyebrow="How I work" title="Four steps, no" accent="surprises" />
        </Reveal>
        <ol className="mt-12 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.name} delay={i * 80}>
              <GlowCard className="h-full p-7">
                <span className="font-serif text-2xl text-mint italic">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-xl font-semibold">{s.name}</h3>
                <p className="mt-2 text-[15px] text-muted">{s.text}</p>
              </GlowCard>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-site px-5 pb-28">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <SectionHeading align="left" eyebrow="Tools" title="What I build" accent="with" />
            <ul className="mt-8 space-y-5">
              {tools.map((t) => (
                <li key={t.lane}>
                  <p className="text-sm text-mint">{t.lane}</p>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {t.items.map((item) => (
                      <li key={item} className="rounded-full border border-glass-line bg-white/4 px-3 py-1.5 text-[13px]">
                        {item}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={100} className="relative aspect-[5/4] overflow-hidden rounded-[28px] border border-glass-line">
            <Image src="/me/laptop.jpg" alt="Daniels working at a laptop" fill sizes="(max-width: 1024px) 90vw, 560px" className="object-cover" />
          </Reveal>
        </div>
      </section>

      <CtaBlock />
    </>
  );
}
