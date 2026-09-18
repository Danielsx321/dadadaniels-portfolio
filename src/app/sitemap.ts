import type { MetadataRoute } from "next";
import { lanes } from "@/content/lanes";
import { getCaseStudies } from "@/lib/content";
import { siteUrl } from "@/lib/site-url";

// Upwork-safe /w pages are deliberately left out: they are noindex copies.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl().origin;
  const now = new Date();
  const pages = ["", "/work", "/about", "/contact", ...lanes.map((l) => l.href)];
  return [
    ...pages.map((path) => ({
      url: `${base}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...getCaseStudies().map((s) => ({
      url: `${base}/work/${s.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
