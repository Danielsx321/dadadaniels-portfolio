"use client";

import Link from "next/link";
import { cn } from "@/components/ui/cn";

/** Glass card whose mint glow follows the cursor. */
export function GlowCard({
  href,
  className,
  children,
}: {
  href?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  const classes = cn(
    "glass group relative flex flex-col overflow-hidden rounded-[22px] transition-[transform,border-color] duration-500 ease-soft hover:-translate-y-1 hover:border-mint-ink/35",
    "before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(420px_260px_at_var(--mx,80%)_var(--my,0%),--alpha(var(--color-glow)/12%),transparent_65%)] before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100",
    className,
  );
  if (href) {
    return (
      <Link href={href} onPointerMove={onMove} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <div onPointerMove={onMove} className={classes}>
      {children}
    </div>
  );
}
