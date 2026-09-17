"use client";

import { useEffect, useRef } from "react";

/** Sparse mint and white dots drifting upward behind the hero. Static when reduced motion is on. */
export function Particles({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    type Dot = { x: number; y: number; r: number; s: number; a: number; mint: boolean };
    let w = 0;
    let h = 0;
    let dots: Dot[] = [];
    let raf = 0;
    let visible = true;

    const size = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * ratio;
      canvas.height = h * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      dots = Array.from({ length: Math.round((w * h) / 9000) }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.2 + 0.2,
        s: Math.random() * 0.15 + 0.03,
        a: Math.random() * 0.6 + 0.1,
        mint: Math.random() < 0.25,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        if (!reduce) {
          d.y -= d.s;
          if (d.y < -2) {
            d.y = h + 2;
            d.x = Math.random() * w;
          }
        }
        ctx.globalAlpha = d.a * ((d.y / h) * 0.7 + 0.3);
        ctx.fillStyle = d.mint ? "#4bffa5" : "#ffffff";
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
      }
      if (!reduce && visible) raf = requestAnimationFrame(draw);
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) draw();
    });

    size();
    draw();
    io.observe(canvas);
    window.addEventListener("resize", size);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", size);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className={className} />;
}
