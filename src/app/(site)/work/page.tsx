import type { Metadata } from "next";
import { SectionHeading } from "@/components/sections/section-heading";
import { WorkFilter } from "@/components/work/work-filter";
import { getCaseStudies } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work",
  description:
    "WordPress builds, accessibility fixes and event tech for real clients. Every project links to the live site and says exactly what I did.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <div className="mx-auto max-w-site px-5 pt-36 pb-24">
      <SectionHeading
        as="h1"
        eyebrow="Work"
        title="Real projects,"
        accent="live online"
        intro="Every project links to the live site and says exactly what I did on it, whether that was the full build or one part of it."
      />
      <WorkFilter studies={getCaseStudies()} />
    </div>
  );
}
