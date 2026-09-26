import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/components/ui/cn";
import { reviews as allReviews, type Review } from "@/content/reviews";
import { SectionHeading } from "./section-heading";

function Quote({ review, large = false }: { review: Review; large?: boolean }) {
  const parts = review.accent ? review.quote.split(review.accent) : [review.quote];
  return (
    <blockquote
      className={cn(
        "font-medium tracking-[-0.03em]",
        large ? "text-[clamp(26px,3.4vw,42px)] leading-[1.18]" : "text-[17px] leading-relaxed tracking-[-0.01em] text-text",
      )}
    >
      &ldquo;{parts[0]}
      {review.accent && parts.length > 1 && <span className="accent">{review.accent}</span>}
      {parts.slice(1).join(review.accent ?? "")}&rdquo;
    </blockquote>
  );
}

function Attribution({ review }: { review: Review }) {
  return (
    <p className="flex items-center gap-3 text-sm">
      <span
        aria-hidden="true"
        className="grid size-9 flex-none place-items-center rounded-full bg-mint-deep text-[13px] font-bold text-mint-ink"
      >
        {review.initials}
      </span>
      <span>
        <b className="block font-semibold">{review.name}</b>
        <span className="text-muted">
          {review.project} &middot; {review.source}
        </span>
      </span>
    </p>
  );
}

/** Client reviews: one featured quote and a grid of the rest. Pass `reviews` to show a subset. */
export function ReviewBlock({ reviews = allReviews, heading = true }: { reviews?: Review[]; heading?: boolean }) {
  if (reviews.length === 0) return null;
  const [featured, ...rest] = reviews;
  return (
    <section aria-label="Client reviews" className="mx-auto max-w-site px-5 pb-28">
      {heading && (
        <Reveal>
          <SectionHeading eyebrow="Client reviews" title="What clients" accent="say" />
        </Reveal>
      )}
      <Reveal className={cn("glass mx-auto max-w-[980px] rounded-[28px] p-8 sm:p-12", heading && "mt-12")}>
        <p aria-label="5 out of 5 stars" className="mb-5 text-sm tracking-[3px] text-mint-ink">
          &#9733;&#9733;&#9733;&#9733;&#9733;
        </p>
        <Quote review={featured} large />
        <div className="mt-8">
          <Attribution review={featured} />
        </div>
      </Reveal>
      {rest.length > 0 && (
        <ul className="mx-auto mt-4 grid max-w-[980px] gap-4 md:grid-cols-2">
          {rest.map((r, i) => (
            <Reveal as="li" key={r.name + r.project} delay={(i % 2) * 80} className="glass flex flex-col justify-between gap-6 rounded-[22px] p-7 md:[&:last-child:nth-child(odd)]:col-span-2">
              <Quote review={r} />
              <Attribution review={r} />
            </Reveal>
          ))}
        </ul>
      )}
    </section>
  );
}
