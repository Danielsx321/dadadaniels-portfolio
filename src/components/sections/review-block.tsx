import { Reveal } from "@/components/motion/reveal";
import { reviews } from "@/content/reviews";

export function ReviewBlock() {
  const r = reviews[0];
  const [before, after] = r.quote.split(r.accent);
  return (
    <section aria-label="Client review" className="mx-auto max-w-site px-5 pb-28">
      <Reveal className="mx-auto max-w-[900px] text-center">
        <p aria-label="5 out of 5 stars" className="mb-4.5 text-sm tracking-[3px] text-mint">
          &#9733;&#9733;&#9733;&#9733;&#9733;
        </p>
        <blockquote className="text-[clamp(28px,3.8vw,48px)] leading-[1.15] font-medium tracking-[-0.035em]">
          &ldquo;{before}
          <span className="accent">{r.accent}</span>
          {after}&rdquo;
        </blockquote>
        <p className="mt-6 inline-flex items-center gap-3 rounded-full border border-glass-line bg-glass py-2 pr-4 pl-2 text-sm">
          <span aria-hidden="true" className="grid size-8 place-items-center rounded-full bg-mint-deep text-[13px] font-bold text-mint">
            {r.initials}
          </span>
          <b className="font-semibold">{r.name}</b>
          <span className="text-muted">
            {r.project}, {r.source.replace(" review", "")}
          </span>
        </p>
      </Reveal>
    </section>
  );
}
