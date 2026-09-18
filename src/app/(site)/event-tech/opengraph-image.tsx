import { getLane } from "@/content/lanes";
import { ogCard, ogSize } from "@/lib/og/card";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Dada Daniels: event-tech services";

export default function Image() {
  const lane = getLane("event-tech");
  return ogCard({ eyebrow: lane.eyebrow, title: lane.headline, accent: lane.headlineAccent });
}
