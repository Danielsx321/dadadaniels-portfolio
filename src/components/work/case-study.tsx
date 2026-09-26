import Image from "next/image";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Button } from "@/components/ui/button";
import { Pill } from "@/components/ui/pill";
import { JsonLd } from "@/components/seo/json-ld";
import type { CaseStudy as Study } from "@/lib/schema";
import { siteUrl } from "@/lib/site-url";

const mdx = {
  h2: (p: React.ComponentProps<"h2">) => (
    <h2 className="mt-12 text-[clamp(24px,3vw,32px)] font-semibold tracking-[-0.03em] first:mt-0" {...p} />
  ),
  p: (p: React.ComponentProps<"p">) => <p className="mt-4 text-lg leading-relaxed text-muted" {...p} />,
  ul: (p: React.ComponentProps<"ul">) => <ul className="mt-5 space-y-3" {...p} />,
  li: (p: React.ComponentProps<"li">) => (
    <li
      className="relative pl-6 text-lg leading-relaxed text-muted before:absolute before:top-[0.7em] before:left-0 before:h-px before:w-3 before:bg-mint"
      {...p}
    />
  ),
  strong: (p: React.ComponentProps<"strong">) => <strong className="font-semibold text-text" {...p} />,
};

/**
 * Case study body. `safe` renders the Upwork-safe version: no contact or booking calls to action.
 */
export function CaseStudy({ study, safe = false, next }: { study: Study; safe?: boolean; next?: Study }) {
  const facts = [
    { label: "Client", value: study.client },
    { label: "My role", value: study.role },
    { label: "Stack", value: study.stack.join(", ") },
    ...(study.year ? [{ label: "Year", value: String(study.year) }] : []),
  ];
  const base = safe ? "/w" : "/work";

  const origin = siteUrl().origin;
  const structured = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: study.title,
    abstract: study.summary,
    url: `${origin}/work/${study.slug}`,
    creator: { "@type": "Person", name: "Dada Daniels", url: origin },
    about: study.client,
    keywords: study.stack.join(", "),
    ...(study.hero ? { image: `${origin}${study.hero}` } : {}),
  };

  return (
    <article className={`mx-auto max-w-site px-5 pb-24 ${safe ? "pt-16" : "pt-36"}`}>
      {!safe && <JsonLd data={structured} />}
      <header className="mx-auto max-w-[860px] text-center">
        <Pill>{study.tag}</Pill>
        <h1 className="mt-5 text-[clamp(40px,6vw,76px)] leading-[1] font-semibold tracking-[-0.045em]">{study.title}</h1>
        <p className="mx-auto mt-5 max-w-[640px] text-lg leading-relaxed text-muted">{study.summary}</p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          {study.status === "live" && study.liveUrl ? (
            <a
              href={study.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glow-mint inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[0.9375rem] font-semibold"
            >
              Visit live site &#8599;
            </a>
          ) : (
            study.statusNote && (
              <span className="rounded-full border border-glass-line bg-glass px-4 py-2.5 text-sm text-muted">
                {study.statusNote}
              </span>
            )
          )}
        </div>
      </header>

      <dl className="glass mx-auto mt-12 grid max-w-[980px] gap-px overflow-hidden rounded-[22px] sm:grid-cols-2 lg:grid-cols-4">
        {facts.map((f) => (
          <div key={f.label} className="px-5 py-4">
            <dt className="text-xs text-subtle">{f.label}</dt>
            <dd className="mt-1 text-[15px] leading-snug">{f.value}</dd>
          </div>
        ))}
      </dl>

      {study.hero && (
        <div className="mx-auto mt-10 max-w-[1100px] overflow-hidden rounded-2xl border border-glass-line bg-surface shadow-[0_40px_120px_--alpha(var(--color-shade)/60%)]">
          <div className="flex items-center gap-2.5 border-b border-glass-line px-3.5 py-2.5">
            <i className="size-2.5 rounded-full bg-[#ff5f57]" />{/* colour-ok: window dot */}
            <i className="size-2.5 rounded-full bg-[#febc2e]" />{/* colour-ok: window dot */}
            <i className="size-2.5 rounded-full bg-[#28c840]" />{/* colour-ok: window dot */}
            {study.liveUrl && (
              <span className="mx-auto rounded-lg bg-tint/5 px-3.5 py-1 text-xs text-muted">
                {new URL(study.liveUrl).hostname}
              </span>
            )}
          </div>
          <div className="relative aspect-[16/10]">
            <Image
              src={study.hero}
              alt={`${study.title} website`}
              fill
              priority
              sizes="(max-width: 1140px) 100vw, 1100px"
              className="object-cover object-top"
            />
          </div>
        </div>
      )}

      {study.metrics.length > 0 && (
        <ul className="mx-auto mt-10 grid max-w-[980px] gap-3 sm:grid-cols-2">
          {study.metrics.map((m) => (
            <li key={m.label} className="glass rounded-[22px] px-6 py-5">
              <p className="text-5xl font-semibold tracking-[-0.04em] text-mint-ink">{m.value}</p>
              <p className="mt-2 text-base">{m.label}</p>
              <p className="mt-1 text-xs text-subtle">Source: {m.source}</p>
            </li>
          ))}
        </ul>
      )}

      <div className="mx-auto mt-16 max-w-[720px]">
        <MDXRemote source={study.body} components={mdx} />
      </div>

      {study.gallery.length > 0 && (
        <ul className="mx-auto mt-14 grid max-w-[1100px] gap-4">
          {study.gallery.map((g) => (
            <li key={g.src} className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-glass-line">
              <Image src={g.src} alt={g.alt} fill sizes="(max-width: 1140px) 100vw, 1100px" className="object-cover object-top" />
            </li>
          ))}
        </ul>
      )}

      <footer className="mx-auto mt-20 flex max-w-[980px] flex-wrap items-center justify-between gap-4 border-t border-glass-line pt-8">
        <Link href={safe ? "/w" : "/work"} className="text-sm text-muted hover:text-text">
          &larr; All projects
        </Link>
        {next && (
          <Link href={`${base}/${next.slug}`} className="text-right text-sm text-muted hover:text-text">
            Next project
            <span className="block text-lg font-semibold text-text">{next.title} &rarr;</span>
          </Link>
        )}
      </footer>

      {!safe && (
        <div className="mx-auto mt-16 max-w-[980px] text-center">
          <Button href="/contact">Start a similar project &rarr;</Button>
        </div>
      )}
    </article>
  );
}
