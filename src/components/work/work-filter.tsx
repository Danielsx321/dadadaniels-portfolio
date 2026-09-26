"use client";

import { useState } from "react";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/components/ui/cn";
import { laneLabels, type Lane } from "@/lib/lanes";
import type { CaseStudy } from "@/lib/schema";
import { WorkCard } from "./work-card";

type Filter = "all" | Exclude<Lane, "other">;

export function WorkFilter({ studies }: { studies: CaseStudy[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const main = studies.filter((s) => s.lane !== "other");
  const other = studies.filter((s) => s.lane === "other");
  const otherWithThumb = other.filter((s) => s.thumb);
  const otherText = other.filter((s) => !s.thumb);
  const lanesPresent = Array.from(new Set(main.map((s) => s.lane))) as Exclude<Lane, "other">[];
  const shown = filter === "all" ? main : main.filter((s) => s.lane === filter);
  const options: Filter[] = ["all", ...lanesPresent];

  return (
    <>
      <div role="group" aria-label="Filter projects" className="mt-10 flex flex-wrap justify-center gap-2">
        {options.map((o) => (
          <button
            key={o}
            type="button"
            aria-pressed={filter === o}
            onClick={() => setFilter(o)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm transition-colors",
              filter === o
                ? "border-mint bg-mint text-on-mint"
                : "border-glass-line bg-glass text-muted hover:text-text",
            )}
          >
            {o === "all" ? "All" : laneLabels[o]}
          </button>
        ))}
      </div>

      <ul className="mt-10 grid gap-4 md:grid-cols-2">
        {shown.map((study) => (
          <li key={study.slug}>
            <WorkCard study={study} />
          </li>
        ))}
      </ul>

      {filter === "all" && other.length > 0 && (
        <Reveal className="mt-20">
          <h2 className="text-2xl font-semibold tracking-[-0.03em]">
            Other <span className="accent">work</span>
          </h2>
          {/* Studies with a thumbnail get the image card; replaced sites without screenshots stay as text. */}
          {otherWithThumb.length > 0 && (
            <ul className="mt-6 grid gap-4 md:grid-cols-2">
              {otherWithThumb.map((s) => (
                <li key={s.slug}>
                  <WorkCard study={s} />
                </li>
              ))}
            </ul>
          )}
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            {otherText.map((s) => (
              <li key={s.slug}>
                <a
                  href={`/work/${s.slug}`}
                  className="glass flex h-full flex-col rounded-[22px] p-6 transition-colors hover:border-mint/35"
                >
                  <span className="text-lg font-semibold tracking-[-0.02em]">{s.title}</span>
                  <span className="mt-1.5 text-sm text-muted">{s.summary}</span>
                  <span className="mt-3 text-xs text-mint">{s.stack.join(", ")}</span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      )}
    </>
  );
}
