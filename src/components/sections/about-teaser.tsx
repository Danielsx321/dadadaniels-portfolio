import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { Pill } from "@/components/ui/pill";
import { process as steps } from "@/content/process";

export function AboutTeaser() {
  return (
    <section id="about" className="mx-auto max-w-site scroll-mt-24 px-5 pb-28">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal className="relative aspect-[4/5] overflow-hidden rounded-[28px] border border-glass-line shadow-[0_40px_100px_rgb(0_0_0/0.5),0_0_80px_rgb(75_255_165/0.08)]">
          <Image
            src="/me/portrait.jpg"
            alt="Daniels, web developer based in Lagos"
            fill
            sizes="(max-width: 1024px) 90vw, 560px"
            className="object-cover object-[50%_20%] transition-transform duration-[1200ms] ease-soft hover:scale-[1.03]"
          />
          <span className="absolute bottom-4 left-4 rounded-full border border-glass-line bg-[rgb(8_9_11/0.75)] px-3 py-1.5 text-xs text-muted backdrop-blur-md">
            Daniels &middot; Lagos, Nigeria
          </span>
        </Reveal>
        <Reveal delay={100}>
          <Pill>About</Pill>
          <h2 className="mt-4.5 text-[clamp(34px,5vw,64px)] leading-[1.02] font-semibold tracking-[-0.04em]">
            One person.
            <br />
            Design <span className="accent">and</span> code.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            Before I quote, I look at what you already have, find what is actually broken, and tell you plainly.{" "}
            <strong className="font-medium text-text">Then we build it properly.</strong> You talk to me from the first
            call to handover, not an account manager.
          </p>
          <ol className="mt-7 grid grid-cols-2 gap-2.5">
            {steps.map((s, i) => (
              <li key={s.name} className="rounded-2xl border border-glass-line bg-white/3 p-4">
                <span className="font-serif text-lg text-mint italic">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-1 text-[15px] font-semibold">{s.name}</p>
                <p className="text-[13px] text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
