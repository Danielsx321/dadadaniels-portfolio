import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LinkArrow } from "@/components/ui/link-arrow";
import { Eyebrow, Section } from "@/components/ui/section";
import { site } from "@/content/site";

// Temporary design review page (Part 1). Replaced by the real home page in Part 2.
export const metadata: Metadata = {
  title: "Design review",
  robots: { index: false, follow: false },
};

const swatches = [
  { name: "canvas", className: "bg-canvas", hex: "#FAFAF8" },
  { name: "surface", className: "bg-surface", hex: "#FFFFFF" },
  { name: "ink", className: "bg-ink", hex: "#16181D" },
  { name: "ink-muted", className: "bg-ink-muted", hex: "#5B616E" },
  { name: "line", className: "bg-line", hex: "#E6E6E1" },
  { name: "accent", className: "bg-accent", hex: "#1F4FD8" },
  { name: "accent-strong", className: "bg-accent-strong", hex: "#173DA8" },
  { name: "accent-soft", className: "bg-accent-soft", hex: "#E8EEFC" },
];

export default function DesignReview() {
  return (
    <>
      <Section className="pt-12 md:pt-20">
        <Eyebrow>Design review, Part 1</Eyebrow>
        <h1 className="max-w-4xl text-display-sm font-semibold md:text-display">
          WordPress developer who builds what your business runs on
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-ink-muted">
          Websites, web apps and event systems with bookings, payments, tickets
          and logins behind them. Draft headline for review.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {site.titles.map((t) => (
            <Badge key={t} tone="accent">
              {t}
            </Badge>
          ))}
          <Badge>Event Tech</Badge>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/work">See the work</Button>
          <Button href="/contact" variant="secondary">
            Book a call
          </Button>
          <Button variant="ghost" type="button">
            Ghost button
          </Button>
        </div>
      </Section>

      <Section tone="surface" aria-labelledby="colors">
        <h2 id="colors" className="text-h2 font-semibold">
          Colors
        </h2>
        <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {swatches.map((s) => (
            <li key={s.name}>
              <div
                className={`h-20 rounded-card border border-line ${s.className}`}
              />
              <p className="mt-2 text-sm font-semibold">{s.name}</p>
              <p className="text-sm text-ink-muted">{s.hex}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section aria-labelledby="type">
        <h2 id="type" className="text-h2 font-semibold">
          Type
        </h2>
        <div className="mt-8 space-y-6">
          <p className="font-display text-display-sm font-semibold md:text-display">
            Display, Bricolage Grotesque
          </p>
          <p className="font-display text-h2 font-semibold">
            Heading 2, Bricolage Grotesque
          </p>
          <p className="font-display text-h3 font-semibold">
            Heading 3, Bricolage Grotesque
          </p>
          <p className="max-w-2xl">
            Body, Inter 17px. Firstly, I will review the current site so we can
            see where visitors drop off, then I will proceed to fix the checkout
            flow (so every ticket sale lands in one place).
          </p>
          <p className="text-sm text-ink-muted">Small muted text, Inter 14px</p>
          <LinkArrow href="/work">Text link with arrow</LinkArrow>
        </div>
      </Section>

      <Section tone="soft" aria-labelledby="card">
        <h2 id="card" className="text-h2 font-semibold">
          Card sample
        </h2>
        <article className="mt-8 max-w-md overflow-hidden rounded-card border border-line bg-surface">
          <div className="aspect-[4/3] bg-canvas" />
          <div className="p-5">
            <Badge tone="accent">WordPress</Badge>
            <h3 className="mt-3 text-h3 font-semibold">Case study title</h3>
            <p className="mt-2 text-ink-muted">
              One sentence on the problem and what was built.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge>Elementor</Badge>
              <Badge>WooCommerce</Badge>
            </div>
          </div>
        </article>
      </Section>
    </>
  );
}
