import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Pill } from "@/components/ui/pill";

export function CtaBlock() {
  return (
    <section className="mx-auto max-w-site px-5 pb-24">
      <Reveal className="relative overflow-hidden rounded-[32px] border border-glass-line bg-[radial-gradient(700px_380px_at_50%_110%,--alpha(var(--color-glow)/28%),transparent_70%),var(--color-surface-raised)] px-6 py-20 text-center md:py-24">
        <Pill>Available for new projects</Pill>
        <h2 className="mt-5 text-[clamp(40px,6.4vw,84px)] leading-[1] font-semibold tracking-[-0.045em]">
          Let&apos;s build what your
          <br />
          business <span className="accent">runs on</span>
        </h2>
        <p className="mx-auto mt-4.5 max-w-[520px] text-lg text-muted">
          Tell me what you need. I reply within 24 hours on weekdays.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/contact">Send a message &rarr;</Button>
          <Button href="/contact#book" variant="ghost">
            Book a 30 min call
          </Button>
        </div>
        <p className="mt-7 inline-flex items-center gap-3 rounded-full border border-glass-line bg-glass py-1.5 pr-4 pl-1.5 text-sm">
          <Image src="/me/avatar.jpg" alt="" width={34} height={34} className="rounded-full" />
          <b className="font-medium">You&apos;ll work with me directly</b>
        </p>
      </Reveal>
    </section>
  );
}
