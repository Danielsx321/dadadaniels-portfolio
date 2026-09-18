import { getCaseStudies, getCaseStudy } from "@/lib/content";
import { ogCard, ogSize } from "@/lib/og/card";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Case study by Dada Daniels";

export function generateStaticParams() {
  return getCaseStudies().map((s) => ({ slug: s.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const study = getCaseStudy((await params).slug);
  return ogCard({ eyebrow: study ? `Case study · ${study.tag}` : "Case study", title: study?.title ?? "Case study" });
}
