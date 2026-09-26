"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { Monogram } from "@/components/brand/monogram";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/components/ui/cn";
import { mainNav } from "@/content/site";

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-3">
      <nav
        aria-label="Main"
        className="mx-auto flex w-full max-w-[920px] items-center justify-between gap-3 rounded-[28px] border border-glass-line bg-veil/60 py-2 pr-2 pl-4 shadow-[0_10px_40px_--alpha(var(--color-shade)/35%),inset_0_1px_0_--alpha(var(--color-tint)/6%)] backdrop-blur-md"
      >
        <Link href="/" className="flex items-center gap-2.5 rounded-full text-[0.9375rem] font-semibold tracking-[-0.01em]">
          <Monogram className="w-5 text-mint-ink" />
          Dada Daniels
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {mainNav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className={cn(
                  "rounded-full px-3.5 py-2 text-sm transition-colors hover:bg-glass hover:text-text",
                  pathname === item.href ? "text-text" : "text-muted",
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1.5">
          <span className="hidden md:block">
            <ThemeToggle />
          </span>
          <Button href="/contact" size="md">
            Let&apos;s talk
          </Button>
          <button
            type="button"
            className="grid size-10 place-items-center rounded-full text-text hover:bg-glass md:hidden"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              ) : (
                <path d="M4 8h16M4 16h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      <div
        id={panelId}
        hidden={!open}
        className="mx-auto mt-2 w-full max-w-[920px] rounded-3xl border border-glass-line bg-veil/92 p-3 backdrop-blur-md md:hidden"
      >
        <ul className="flex flex-col">
          {mainNav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-2xl px-4 py-3 text-base text-text hover:bg-glass"
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="mt-1 border-t border-glass-line pt-1">
            <ThemeToggle withLabel />
          </li>
        </ul>
      </div>
    </header>
  );
}
