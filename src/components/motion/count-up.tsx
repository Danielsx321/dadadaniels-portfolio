"use client";

import { useEffect, useRef } from "react";

const format = (n: number) => n.toLocaleString("en-US");

/**
 * Counts up to a real value once, when seen. Writes straight to the DOM so React does not
 * re-render every frame. The final value is in the HTML, for screen readers and no-JS visitors.
 */
export function CountUp({ to, duration = 1400 }: { to: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const step = (now: number) => {
          const p = Math.min(1, (now - start) / duration);
          el.textContent = format(Math.round(to * (1 - Math.pow(1 - p, 4))));
          if (p < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, duration]);

  return (
    <span>
      <span ref={ref} aria-hidden="true">
        {format(to)}
      </span>
      <span className="sr-only">{format(to)}</span>
    </span>
  );
}
