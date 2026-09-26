"use client";

import { useEffect, useSyncExternalStore } from "react";
import { cn } from "@/components/ui/cn";

type Theme = "light" | "dark";

// colour-ok: browser chrome colour per theme, mirrors --color-canvas
const chrome: Record<Theme, string> = { dark: "#07080a", light: "#f6f7f5" };

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

const current = (): Theme => (document.documentElement.dataset.theme === "light" ? "light" : "dark");

function stored(): Theme | null {
  try {
    const t = localStorage.getItem("theme");
    return t === "light" || t === "dark" ? t : null;
  } catch {
    return null;
  }
}

function apply(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.querySelectorAll('meta[name="theme-color"]').forEach((m) => m.setAttribute("content", chrome[theme]));
}

/** Sun/moon button. Follows the system setting until the visitor picks, then remembers the pick. */
export function ThemeToggle({ className, withLabel = false }: { className?: string; withLabel?: boolean }) {
  // null on the server and during hydration, so the first client render matches the HTML.
  const theme = useSyncExternalStore(subscribe, current, () => null);

  useEffect(() => {
    const media = matchMedia("(prefers-color-scheme: light)");
    const follow = () => {
      if (!stored()) apply(media.matches ? "light" : "dark");
    };
    media.addEventListener("change", follow);
    return () => media.removeEventListener("change", follow);
  }, []);

  const next: Theme = theme === "light" ? "dark" : "light";
  const label = theme ? `Switch to ${next} mode` : "Switch theme";

  const toggle = () => {
    if (!theme) return;
    apply(next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Private mode: the switch still works for this page view.
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={withLabel ? undefined : label}
      className={cn(
        "text-text transition-colors hover:bg-glass",
        withLabel
          ? "flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-base"
          : "grid size-10 shrink-0 place-items-center rounded-full",
        className,
      )}
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        {theme === "light" ? (
          <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
        ) : theme === "dark" ? (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </>
        ) : null}
      </svg>
      {withLabel && <span>{theme ? (next === "light" ? "Light mode" : "Dark mode") : "Theme"}</span>}
    </button>
  );
}
