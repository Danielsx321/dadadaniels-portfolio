import Image from "next/image";
import { GlowCard } from "@/components/motion/glow-card";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/components/ui/cn";
import { lanes } from "@/content/lanes";
import { SectionHeading } from "./section-heading";

export function ServicesBento() {
  return (
    <section id="services" className="mx-auto max-w-site scroll-mt-24 px-5 py-28">
      <Reveal>
        <SectionHeading
          eyebrow="What I build"
          title="Four ways I can"
          accent="help"
          intro="WordPress is the core. When a site needs more than a page builder, I build the app or the event system behind it."
        />
      </Reveal>
      <div className="mt-14 grid gap-3.5 lg:grid-cols-[1.25fr_1fr_1fr]">
        {lanes.map((lane, i) => {
          const isCore = lane.slug === "wordpress";
          const isWide = lane.slug === "event-tech";
          return (
            <Reveal key={lane.slug} delay={i * 80} className={cn(isCore && "lg:row-span-2", isWide && "lg:col-span-2")}>
              <GlowCard href={lane.href} className={cn("h-full px-7 pt-7 pb-6", isCore ? "lg:min-h-[620px]" : "min-h-[300px]")}>
                {(isCore || isWide) && (
                  <span className="absolute top-7 right-6 rounded-full border border-mint-ink/30 bg-mint-ink/6 px-2.5 py-1 text-xs text-mint-ink">
                    {isCore ? "Core" : "Own your events"}
                  </span>
                )}
                <span
                  aria-hidden="true"
                  className="grid size-[46px] place-items-center rounded-[14px] bg-mint-deep font-bold text-mint-ink shadow-[inset_0_0_0_1px_--alpha(var(--color-glow)/30%),0_0_30px_--alpha(var(--color-glow)/15%)]"
                >
                  {lane.icon}
                </span>
                <h3 className="mt-6 text-[28px] font-semibold tracking-[-0.03em]">{lane.title}</h3>
                <p className="mt-2.5 max-w-[44ch] text-[15.5px] leading-relaxed text-muted">{lane.cardText}</p>
                <ul className="mt-4.5 flex flex-wrap gap-2">
                  {lane.chips.map((chip) => (
                    <li key={chip} className="rounded-full border border-glass-line bg-tint/4 px-3 py-1.5 text-[13px]">
                      {chip}
                    </li>
                  ))}
                </ul>
                {isCore && (
                  <div className="relative mt-7 aspect-[4/3] -rotate-2 overflow-hidden rounded-[14px] border border-glass-line shadow-[0_30px_60px_--alpha(var(--color-shade)/45%)] transition-transform duration-700 ease-soft group-hover:rotate-0">
                    <Image
                      src="/work/richard-saad.jpg"
                      alt="Richard Saad WordPress website"
                      fill
                      sizes="(max-width: 1024px) 90vw, 420px"
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="mt-auto flex items-end justify-between pt-7">
                  <span className="text-[13px] text-subtle">Starts at</span>
                  <span className="text-[30px] font-semibold tracking-[-0.03em]">
                    <span className="mr-1.5 font-serif text-lg font-normal tracking-normal text-mint-ink italic">from</span>
                    {lane.priceFrom}
                  </span>
                </div>
              </GlowCard>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
