import { CountUp } from "@/components/motion/count-up";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Pill } from "@/components/ui/pill";
import { getLane } from "@/content/lanes";
import { Ticket } from "./ticket";

export function EventSpotlight({ showHeading = true }: { showHeading?: boolean }) {
  const lane = getLane("event-tech");
  return (
    <section className="mx-auto max-w-site px-5 pb-28">
      <Reveal className="relative overflow-hidden rounded-[32px] border border-mint/22 bg-[radial-gradient(900px_500px_at_20%_0%,rgb(75_255_165/0.16),transparent_60%),radial-gradient(700px_500px_at_100%_100%,rgb(75_255_165/0.08),transparent_60%),#07100c] px-7 py-16 lg:px-16 lg:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div>
            {showHeading && (
              <>
                <Pill>Event Tech</Pill>
                <h2 className="mt-4.5 text-[clamp(34px,5vw,64px)] leading-[1.02] font-semibold tracking-[-0.04em]">
                  {lane.headline}
                  <br />
                  <span className="accent">{lane.headlineAccent}</span>
                </h2>
              </>
            )}
            <p className="mt-8 bg-gradient-to-b from-white to-[#7dffc0] bg-clip-text text-[clamp(64px,10vw,132px)] leading-[0.9] font-semibold tracking-[-0.06em] text-transparent">
              <CountUp to={10000} />+
            </p>
            <p className="mt-3.5 max-w-[44ch] text-lg leading-relaxed text-muted">
              people checked in through one QR system with 15 scanners, after I fixed a 16 second database slowdown that
              would have stopped the queue.
            </p>
            <ul className="mt-7 grid grid-cols-2 gap-2.5">
              {lane.services.slice(0, 4).map((s) => (
                <li key={s.name} className="rounded-2xl border border-glass-line bg-white/3 px-4 py-3.5">
                  <p className="text-[15px] font-semibold">{s.name}</p>
                  <p className="text-[13px] text-muted">{s.text}</p>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button href="/contact">Plan your event system &rarr;</Button>
            </div>
          </div>
          <Ticket />
        </div>
      </Reveal>
    </section>
  );
}
