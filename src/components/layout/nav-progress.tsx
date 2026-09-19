"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// Fast navigations never show the spinner; it only appears when the next page takes a moment.
const SHOW_AFTER_MS = 120;
// Safety net so the spinner can never get stuck if a navigation is cancelled.
const GIVE_UP_AFTER_MS = 10000;

type Pending = { id: number; from: string };

/**
 * Small spinning ring shown while a clicked internal link is loading, so a click never looks ignored.
 * Listens for link clicks on the whole document. The navigation counts as finished once the
 * pathname is no longer the one the click started from.
 */
export function NavProgress() {
  const pathname = usePathname();
  const [pending, setPending] = useState<Pending | null>(null);
  const [shownId, setShownId] = useState(0);

  useEffect(() => {
    let nextId = 1;
    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!link || link.target === "_blank" || link.hasAttribute("download")) return;
      const url = new URL(link.href, window.location.href);
      // Other sites, and links to a spot on the page already open, load nothing here.
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return;
      setPending({ id: nextId++, from: window.location.pathname });
    };
    const clear = () => setPending(null);
    // Capture phase: next/link calls preventDefault on the click, so by the bubble phase it looks cancelled.
    document.addEventListener("click", onClick, true);
    window.addEventListener("popstate", clear);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("popstate", clear);
    };
  }, []);

  useEffect(() => {
    if (!pending) return;
    const show = window.setTimeout(() => setShownId(pending.id), SHOW_AFTER_MS);
    const giveUp = window.setTimeout(() => setPending(null), GIVE_UP_AFTER_MS);
    return () => {
      window.clearTimeout(show);
      window.clearTimeout(giveUp);
    };
  }, [pending]);

  const loading = pending !== null && pending.from === pathname && shownId === pending.id;
  if (!loading) return null;

  return (
    <div
      role="status"
      className="pointer-events-none fixed top-[84px] left-1/2 z-[70] grid size-11 -translate-x-1/2 place-items-center rounded-full border border-glass-line bg-[rgb(12_14_16/0.85)] shadow-[0_10px_40px_rgb(0_0_0/0.45)] backdrop-blur-md"
    >
      <span aria-hidden="true" className="size-5 animate-spin rounded-full border-2 border-mint/25 border-t-mint" />
      <span className="sr-only">Loading page</span>
    </div>
  );
}
