"use client";

import Script from "next/script";

/**
 * Inline Calendly booking in the site's dark colours. The script loads only on the
 * contact page, after everything else, so it never slows the rest of the site.
 */
export function CalendlyEmbed({ url }: { url: string }) {
  const themed = new URL(url);
  themed.searchParams.set("hide_gdpr_banner", "1");
  themed.searchParams.set("background_color", "0e1013");
  themed.searchParams.set("text_color", "f4f6f5");
  themed.searchParams.set("primary_color", "4bffa5");

  return (
    <div className="overflow-hidden rounded-[22px] border border-glass-line bg-surface">
      <div className="calendly-inline-widget" data-url={themed.toString()} style={{ minWidth: 320, height: 700 }} />
      <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" />
      <noscript>
        <a href={url} className="block p-6 text-mint underline">
          Book a call on Calendly
        </a>
      </noscript>
    </div>
  );
}
