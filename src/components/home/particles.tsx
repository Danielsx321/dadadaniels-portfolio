"use client";

import { useEffect, useRef } from "react";
import { isLowPower } from "@/components/motion/device";
import { whenIdle } from "@/components/motion/when-idle";

/** Sparse mint and white dots drifting upward behind the hero. Static when reduced motion is on. */
export function Particles({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    // Low-power devices get the same dots, drawn once, without the drift.
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches || isLowPower();

    type Dot = { x: number; y: number; r: number; s: number; a: number; mint: boolean };
    let w = 0;
    let h = 0;
    let dots: Dot[] = [];
    let raf = 0;
    let visible = true;
    let last = 0;
    let colourA = "";
    let colourB = "";
    let fade = 1;

    const readColours = () => {
      const css = getComputedStyle(document.documentElement);
      colourA = css.getPropertyValue("--color-particle-a").trim();
      colourB = css.getPropertyValue("--color-particle-b").trim();
      // Dark dots on a light canvas read heavier than light dots on dark, so they are drawn fainter.
      fade = document.documentElement.dataset.theme === "light" ? 0.6 : 1;
    };

    const size = () => {
      readColours();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * ratio;
      canvas.height = h * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      dots = Array.from({ length: Math.min(160, Math.round((w * h) / 12000)) }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.2 + 0.2,
        s: Math.random() * 0.15 + 0.03,
        a: Math.random() * 0.6 + 0.1,
        mint: Math.random() < 0.25,
      }));
    };

    const draw = (now = 0) => {
      if (now - last < 32 && now !== 0) {
        if (!reduce && visible) raf = requestAnimationFrame(draw);
        return;
      }
      last = now;
      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        if (!reduce) {
          d.y -= d.s;
          if (d.y < -2) {
            d.y = h + 2;
            d.x = Math.random() * w;
          }
        }
        ctx.globalAlpha = d.a * ((d.y / h) * 0.7 + 0.3) * fade;
        ctx.fillStyle = d.mint ? colourA : colourB;
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

    // Repaint once when the theme switches, so a static (reduced motion) canvas updates too.
    const themeWatch = new MutationObserver(() => {
      readColours();
      // A running loop picks the new colours up on its next frame; only a paused canvas needs a draw.
      if (reduce || !visible) draw();
    });
    themeWatch.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    size();
    draw();
    let delay = 0;
    const cancelIdle = whenIdle(() => {
      delay = window.setTimeout(() => io.observe(canvas), 1500);
    });
    window.addEventListener("resize", size);
    return () => {
      cancelIdle();
      window.clearTimeout(delay);
      cancelAnimationFrame(raf);
      io.disconnect();
      themeWatch.disconnect();
      window.removeEventListener("resize", size);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className={className} />;
}
