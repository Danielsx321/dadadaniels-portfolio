import { Reveal } from "@/components/motion/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { SectionHeading } from "./section-heading";

/**
 * Lane FAQ. Native details/summary, so it opens and closes with no JavaScript
 * and works by keyboard and screen reader out of the box.
 */
export function FaqBlock({ items }: { items: { q: string; a: string }[] }) {
  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };

  return (
    <section className="mx-auto max-w-[820px] px-5 pb-28">
      <JsonLd data={faqPage} />
      <Reveal>
        <SectionHeading eyebrow="FAQ" title="Questions," accent="answered" />
      </Reveal>
      <ul className="mt-10 grid gap-3">
        {items.map((item) => (
          <li key={item.q}>
            <details className="group rounded-2xl border border-glass-line bg-tint/4 transition-colors open:border-mint-ink/30">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-6 py-5 text-lg font-semibold tracking-[-0.01em] [&::-webkit-details-marker]:hidden">
                {item.q}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="size-5 shrink-0 text-mint-ink transition-transform group-open:rotate-45 motion-reduce:transition-none"
                >
                  <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </summary>
              <p className="px-6 pb-5 text-[15px] leading-relaxed text-muted">{item.a}</p>
            </details>
          </li>
        ))}
      </ul>
    </section>
  );
}
