import { CountUp } from "@/components/motion/count-up";
import { GlowCard } from "@/components/motion/glow-card";
import { Reveal } from "@/components/motion/reveal";
import { proof } from "@/content/proof";

export function ProofStrip({ className }: { className?: string }) {
  return (
    <section aria-label="Results" className={className}>
      <ul className="mx-auto grid max-w-site grid-cols-2 gap-3 px-5 lg:grid-cols-4">
        {proof.map((p, i) => (
          <Reveal as="li" key={p.label} delay={i * 80}>
            <GlowCard className="h-full px-5 py-6">
              <p className="text-[clamp(28px,3.6vw,44px)] leading-none font-semibold tracking-[-0.04em]">
                {p.prefix && <span className="text-mint-ink">{p.prefix}</span>}
                <CountUp to={p.count} />
                {p.suffix && <span className="text-mint-ink">{p.suffix}</span>}
              </p>
              <p className="mt-2.5 text-sm leading-snug text-muted">{p.label}</p>
            </GlowCard>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
