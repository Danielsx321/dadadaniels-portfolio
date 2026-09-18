import type { Lane } from "@/lib/lanes";

export type Review = {
  /** Exact client words. Excerpts keep the original wording; "..." marks cut text. */
  quote: string;
  /** A phrase from the quote to set in the mint italic accent. */
  accent?: string;
  name: string;
  initials: string;
  project: string;
  source: "Upwork" | "Fiverr";
  date: string;
  lanes: Lane[];
};

/**
 * Real client reviews only. Full originals are in the workspace:
 * outputs/portfolio/upwork-reviews.md (pulled 2026-09-18). SOCA SANTA is from Fiverr.
 * Where Upwork hides the client's name, the project type stands in.
 */
export const reviews: Review[] = [
  {
    quote:
      "His expertise in WordPress optimization is outstanding. He quickly identified the issues, implemented the right solutions, and helped my website meet all the technical requirements I needed... It's rare to find someone who combines technical excellence with such a smooth and enjoyable collaboration.",
    accent: "technical excellence",
    name: "Panagiotis N.",
    initials: "PN",
    project: "WCAG 2.1 AA accessibility fixes",
    source: "Upwork",
    date: "2026-07",
    lanes: ["wordpress"],
  },
  {
    quote:
      "He built us a smooth event site with ticket booking, super easy to use and looks great. Fast, reliable, and really knows his stuff.",
    accent: "ticket booking",
    name: "Thiel J.",
    initials: "TJ",
    project: "Event website and ticket booking",
    source: "Upwork",
    date: "2025-10",
    lanes: ["event-tech"],
  },
  {
    quote:
      "...he significantly improved the speed and performance of our website. He fixed all the WordPress issues, optimized the site, and ensured it met the required accessibility standards for people with visual and hearing impairments, allowing us to obtain the necessary certification.",
    accent: "the necessary certification",
    name: "Accessibility client",
    initials: "AC",
    project: "WCAG 2.1 AA accessibility fixes",
    source: "Upwork",
    date: "2026-07",
    lanes: ["wordpress"],
  },
  {
    quote:
      "...he secured my website, continued monitoring, cleaned my site, and provided a very detailed report to ensure that I understood what actually happened, what he did to correct the issues and a pathway to move forward.",
    accent: "a very detailed report",
    name: "Returning client",
    initials: "RC",
    project: "Malware removal and site restore",
    source: "Upwork",
    date: "2026-09",
    lanes: ["wordpress"],
  },
  {
    quote:
      "Daniel delivered an outstanding WordPress landing page that perfectly matched our brand. The design was clean, modern, fast-loading, and fully responsive, with clear CTAs and a structure optimized for conversions and SEO.",
    accent: "perfectly matched our brand",
    name: "Landing page client",
    initials: "LP",
    project: "WordPress landing page",
    source: "Upwork",
    date: "2025-12",
    lanes: ["wordpress"],
  },
  {
    quote: "My very very best experience working with any freelancer on the internet.",
    accent: "any freelancer",
    name: "IslandKingMedia",
    initials: "IK",
    project: "SOCA SANTA event ticket integration",
    source: "Fiverr",
    date: "",
    lanes: ["event-tech"],
  },
];

export function reviewsFor(lane: Lane): Review[] {
  return reviews.filter((r) => r.lanes.includes(lane));
}
