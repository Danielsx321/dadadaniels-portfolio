import type { Metadata } from "next";
import { LanePage } from "@/components/sections/lane-page";
import { getLane } from "@/content/lanes";

const lane = getLane("no-code");

export const metadata: Metadata = {
  title: lane.seoTitle,
  description: lane.seoDescription,
  alternates: { canonical: lane.href },
};

export default function Page() {
  return <LanePage slug="no-code" />;
}
