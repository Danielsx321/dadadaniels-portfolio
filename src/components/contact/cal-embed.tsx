"use client";

import { getCalApi } from "@calcom/embed-react";
import dynamic from "next/dynamic";
import { useEffect } from "react";

const Cal = dynamic(() => import("@calcom/embed-react"), {
  ssr: false,
  loading: () => <div className="h-[520px] animate-pulse rounded-[22px] bg-white/4" />,
});

/** Inline Cal.com booking. Renders nothing when no link is configured, so the page never shows a dead widget. */
export function CalEmbed({ link }: { link: string }) {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: "portfolio" });
      cal("ui", { theme: "dark", cssVarsPerTheme: { dark: { "cal-brand": "#4bffa5" }, light: {} } });
    })();
  }, []);

  return (
    <div className="overflow-hidden rounded-[22px] border border-glass-line bg-surface">
      <Cal
        namespace="portfolio"
        calLink={link}
        style={{ width: "100%", height: "620px", overflow: "scroll" }}
        config={{ layout: "month_view", theme: "dark" }}
      />
    </div>
  );
}
