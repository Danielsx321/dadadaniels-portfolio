import Image from "next/image";
import Link from "next/link";
import type { CaseStudy } from "@/lib/schema";

export function WorkCard({ study, basePath = "/work" }: { study: CaseStudy; basePath?: string }) {
  return (
    <Link
      href={`${basePath}/${study.slug}`}
      className="group relative block overflow-hidden rounded-[22px] border border-glass-line bg-surface transition-[border-color,box-shadow] duration-500 ease-soft hover:border-mint/35 hover:shadow-[0_30px_80px_rgb(0_0_0/0.5),0_0_60px_rgb(75_255_165/0.08)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {study.thumb ? (
          <Image
            src={study.thumb}
            alt={`${study.title} project preview`}
            fill
            sizes="(max-width: 800px) 100vw, 580px"
            className="object-cover transition-transform duration-[1200ms] ease-soft group-hover:scale-[1.04]"
          />
        ) : (
          <div className="grid size-full place-items-center bg-[radial-gradient(500px_300px_at_50%_0%,rgb(75_255_165/0.12),transparent_70%)] px-8 text-center">
            <span className="text-2xl font-semibold tracking-[-0.03em] text-muted">{study.client}</span>
          </div>
        )}
      </div>
      <span className="absolute top-3.5 left-3.5 rounded-full border border-glass-line bg-[rgb(8_9_11/0.72)] px-3 py-1 text-xs text-mint backdrop-blur-md">
        {study.tag}
      </span>
      <div className="absolute inset-x-3.5 bottom-3.5 flex items-center justify-between gap-3 rounded-2xl border border-glass-line bg-[rgb(8_9_11/0.72)] px-4 py-3.5 backdrop-blur-lg">
        <div className="min-w-0">
          <p className="truncate text-[17px] font-semibold tracking-[-0.02em]">{study.title}</p>
          <p className="line-clamp-1 text-[13px] text-muted">{study.summary}</p>
        </div>
        <span
          aria-hidden="true"
          className="grid size-[38px] flex-none -rotate-45 place-items-center rounded-full bg-mint font-bold text-on-mint transition-transform duration-500 ease-soft group-hover:rotate-0"
        >
          &rarr;
        </span>
      </div>
    </Link>
  );
}
