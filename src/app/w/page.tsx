import type { Metadata } from "next";
import { SectionHeading } from "@/components/sections/section-heading";
import { WorkCard } from "@/components/work/work-card";
import { getCaseStudies } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  robots: { index: false, follow: false },
  alternates: { canonical: "/work" },
};

/** Upwork-safe project list: links stay inside /w. */
export default function SafeWorkPage() {
  const studies = getCaseStudies();
  return (
    <div className="mx-auto max-w-site px-5 pt-16 pb-24">
      <SectionHeading eyebrow="Projects" title="Real projects," accent="live online" as="h1" />
      <ul className="mt-12 grid gap-4 md:grid-cols-2">
        {studies
          .filter((s) => s.thumb)
          .map((s) => (
            <li key={s.slug}>
              <WorkCard study={s} basePath="/w" />
            </li>
          ))}
      </ul>
    </div>
  );
}
