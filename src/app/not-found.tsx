import Link from "next/link";
import { Monogram } from "@/components/brand/monogram";

export default function NotFound() {
  return (
    <main id="main" className="grid min-h-dvh place-items-center px-5 text-center">
      <div>
        <Monogram className="mx-auto w-10 text-mint" />
        <h1 className="mt-6 text-[clamp(40px,6vw,72px)] leading-none font-semibold tracking-[-0.045em]">
          Page not <span className="accent">found</span>
        </h1>
        <p className="mt-4 text-lg text-muted">This page doesn&apos;t exist, or it hasn&apos;t been built yet.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="glow-mint rounded-full px-6 py-3.5 font-semibold">
            Go home
          </Link>
          <Link href="/work" className="rounded-full border border-glass-line bg-glass px-6 py-3.5 font-semibold">
            See the work
          </Link>
        </div>
      </div>
    </main>
  );
}
