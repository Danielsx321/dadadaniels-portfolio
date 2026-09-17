import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudy } from "@/components/work/case-study";
import { getCaseStudies, getCaseStudy } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getCaseStudies().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const study = getCaseStudy((await params).slug);
  if (!study) return {};
  return {
    title: study.title,
    description: study.summary,
    alternates: { canonical: `/work/${study.slug}` },
  };
}

export default async function WorkStudyPage({ params }: Props) {
  const { slug } = await params;
  const all = getCaseStudies();
  const i = all.findIndex((s) => s.slug === slug);
  if (i === -1) notFound();
  return <CaseStudy study={all[i]} next={all[(i + 1) % all.length]} />;
}
