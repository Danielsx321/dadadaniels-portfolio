import Image from "next/image";
import { Button } from "@/components/ui/button";
import { HeroCarousel } from "./hero-carousel";
import { Particles } from "./particles";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pb-10">
      <Particles className="absolute inset-0 -z-20 size-full" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[-10%] left-1/2 -z-10 h-[700px] w-[1100px] -translate-x-1/2 bg-[radial-gradient(closest-side,rgb(75_255_165/0.16),rgb(75_255_165/0.05)_55%,transparent)] blur-[10px]"
      />

      <div className="mx-auto max-w-[980px] px-5 pt-[150px] text-center">
        <span className="animate-lift inline-flex items-center gap-2.5 rounded-full border border-glass-line bg-glass py-1.5 pr-3.5 pl-1.5 text-[0.8125rem] text-muted [animation-delay:100ms]">
          <span
            aria-hidden="true"
            className="grid size-6 place-items-center rounded-full bg-mint-deep text-xs text-mint shadow-[inset_0_0_0_1px_rgb(75_255_165/0.35)]"
          >
            &#9679;
          </span>
          <span className="sm:hidden">WordPress, apps and event tech</span>
          <span className="hidden sm:inline">WordPress, Full Stack, No-Code and Event Tech</span>
          <span aria-hidden="true" className="size-1.5 rounded-full bg-mint shadow-[0_0_10px_var(--color-mint)]" />
        </span>

        <h1 className="mt-6 text-[clamp(42px,7.2vw,92px)] leading-[0.98] font-semibold tracking-[-0.045em]">
          <span className="animate-rise block">Websites and systems</span>
          <span className="animate-rise block [animation-delay:120ms]">
            your business{" "}
            <span className="accent [text-shadow:0_0_40px_rgb(75_255_165/0.35)]">runs on</span>
          </span>
        </h1>

        <p className="animate-lift mx-auto mt-5 max-w-[600px] text-[clamp(16px,1.6vw,19px)] leading-relaxed text-muted [animation-delay:300ms]">
          I&apos;m Daniels. I build{" "}
          <strong className="font-medium text-text">WordPress sites, web apps and event tech</strong> with the
          bookings, payments and tickets behind them, for clients across the US, Europe and Africa.
        </p>

        <div className="animate-lift mt-8 flex flex-wrap justify-center gap-3 [animation-delay:420ms]">
          <Button href="/work">See my work &rarr;</Button>
          <Button href="/contact" variant="ghost">
            Book a call
          </Button>
        </div>
      </div>

      <HeroCarousel />

      <div className="animate-frame-up relative z-10 mx-auto -mt-[120px] w-[min(1040px,calc(100%-32px))] overflow-hidden rounded-2xl border border-glass-line bg-surface shadow-[0_-20px_80px_rgb(75_255_165/0.1),0_40px_120px_rgb(0_0_0/0.6)] [animation-delay:600ms]">
        <div className="flex items-center gap-2.5 border-b border-glass-line px-3.5 py-2.5">
          <i className="size-2.5 rounded-full bg-[#ff5f57]" />
          <i className="size-2.5 rounded-full bg-[#febc2e]" />
          <i className="size-2.5 rounded-full bg-[#28c840]" />
          <span className="mx-auto flex items-center gap-2 rounded-lg bg-white/5 px-3.5 py-1 text-xs text-muted">
            <span aria-hidden="true" className="text-mint">
              &#9679;
            </span>
            smgwrn.org
          </span>
        </div>
        <div className="relative aspect-[16/10]">
          <Image
            src="/work/smg-wrn-desktop.jpg"
            alt="SMG Worldwide Relief Network homepage, a WordPress site built by Daniels"
            fill
            sizes="(max-width: 1072px) 100vw, 1040px"
            className="object-cover object-top"
          />
          <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-b from-transparent to-canvas" />
        </div>
      </div>
    </section>
  );
}
