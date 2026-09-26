import { GlowCard } from "@/components/motion/glow-card";
import { Reveal } from "@/components/motion/reveal";
import { WorkCard } from "@/components/work/work-card";
import { Button } from "@/components/ui/button";
import { getLane, type LaneContent } from "@/content/lanes";
import { getByLane } from "@/lib/content";
import { reviewsFor } from "@/content/reviews";
import { CtaBlock } from "./cta-block";
import { EventSpotlight } from "./event-spotlight";
import { ReviewBlock } from "./review-block";
import { SectionHeading } from "./section-heading";

export function LanePage({ slug }: { slug: LaneContent["slug"] }) {
  const lane = getLane(slug);
  const studies = lane.showWork ? getByLane(slug) : [];

  return (
    <>
      <section className="relative isolate overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-[-20%] left-1/2 -z-10 h-[600px] w-[1000px] -translate-x-1/2 bg-[radial-gradient(closest-side,--alpha(var(--color-glow)/14%),transparent)]"
        />
        <div className="mx-auto max-w-[900px] px-5 pt-40 pb-20 text-center">
          <SectionHeading as="h1" eyebrow={lane.eyebrow} title={lane.headline} accent={lane.headlineAccent} intro={lane.intro} />
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button href="/contact">Get a quote &rarr;</Button>
            <span className="rounded-full border border-glass-line bg-glass px-4 py-3 text-sm text-muted">
              Starts at <b className="font-semibold text-text">{lane.priceFrom}</b>
            </span>
          </div>
        </div>
      </section>

      {slug === "event-tech" && <EventSpotlight showHeading={false} />}

      <section className="mx-auto max-w-site px-5 pb-28">
        <Reveal>
          <SectionHeading eyebrow="Services" title="What I" accent="do" />
        </Reveal>
        <ul className="mt-12 grid gap-3.5 md:grid-cols-2 lg:grid-cols-3">
          {lane.services.map((s, i) => (
            <Reveal as="li" key={s.name} delay={(i % 3) * 80}>
              <GlowCard className="h-full p-7">
                <span className="font-serif text-xl text-mint-ink italic">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-xl font-semibold tracking-[-0.02em]">{s.name}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{s.text}</p>
              </GlowCard>
            </Reveal>
          ))}
        </ul>
      </section>

      {studies.length > 0 && (
        <section className="mx-auto max-w-site px-5 pb-28">
          <Reveal>
            <SectionHeading eyebrow="Work" title={`${lane.title} projects,`} accent="live online" />
          </Reveal>
          <ul className="mt-12 grid gap-4 md:grid-cols-2">
            {studies.map((study) => (
              <li key={study.slug}>
                <WorkCard study={study} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <ReviewBlock reviews={reviewsFor(slug)} />

      <CtaBlock />
    </>
  );
}
