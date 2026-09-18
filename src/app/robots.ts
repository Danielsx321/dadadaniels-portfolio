import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  const base = siteUrl().origin;
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/w/"] },
    sitemap: `${base}/sitemap.xml`,
  };
}
