"use client";

import { useState } from "react";
import { cn } from "@/components/ui/cn";
import { laneLabels, type Lane } from "@/lib/lanes";
import type { CaseStudy } from "@/lib/schema";
import { WorkCard } from "./work-card";

type Filter = "all" | Lane;

export function WorkFilter({ studies }: { studies: CaseStudy[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  // One grid for everything; "Other work" is a tab like the lanes, and always the last one.
  const lanesPresent = Array.from(new Set(studies.map((s) => s.lane))).sort(
    (a, b) => Number(a === "other") - Number(b === "other"),
  );
  const shown = filter === "all" ? studies : studies.filter((s) => s.lane === filter);
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
                ? "border-mint-ink bg-mint text-on-mint"
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
    </>
  );
}
