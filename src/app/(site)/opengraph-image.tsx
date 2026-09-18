import { ogCard, ogSize } from "@/lib/og/card";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Dada Daniels: websites and systems your business runs on";

export default function Image() {
  return ogCard({ eyebrow: "WordPress, Full Stack, No-Code, Event Tech", title: "Websites and systems", accent: "your business runs on" });
}
