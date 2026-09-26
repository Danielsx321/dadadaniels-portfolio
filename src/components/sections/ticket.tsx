"use client";

import { useEffect, useRef, useState } from "react";

/** Illustrative check-in ticket (decoration, approved as such). Not real client data. */
export function Ticket() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [checkedIn, setCheckedIn] = useState(8412);

  useEffect(() => {
    const c = canvasRef.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx) return;
    const n = 25;
    const s = c.width / n;
    let seed = 7;
    const rnd = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
    ctx.fillStyle = "#0a0b0d"; // colour-ok: QR ink, dark on white in both themes
    const finder = (x: number, y: number) => {
      ctx.fillRect(x * s, y * s, 7 * s, 7 * s);
      ctx.clearRect((x + 1) * s, (y + 1) * s, 5 * s, 5 * s);
      ctx.fillRect((x + 2) * s, (y + 2) * s, 3 * s, 3 * s);
    };
    for (let i = 0; i < n; i++)
      for (let j = 0; j < n; j++) {
        const inFinder = (i < 8 && j < 8) || (i > n - 9 && j < 8) || (i < 8 && j > n - 9);
        if (!inFinder && rnd() > 0.52) ctx.fillRect(i * s, j * s, s, s);
      }
    finder(0, 0);
    finder(n - 7, 0);
    finder(0, n - 7);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let id = 0;
    const io = new IntersectionObserver(([entry]) => {
      window.clearInterval(id);
      if (entry.isIntersecting) {
        id = window.setInterval(() => {
          setCheckedIn((v) => Math.min(10000, v + Math.ceil(Math.random() * 4)));
        }, 1200);
      }
    });
    io.observe(c);
    return () => {
      io.disconnect();
      window.clearInterval(id);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="relative mx-auto max-w-[380px] rotate-3 animate-[ticket-float_6s_ease-in-out_infinite] rounded-3xl border border-tint/14 bg-gradient-to-b from-tint/8 to-tint/3 p-5 shadow-[0_40px_100px_--alpha(var(--color-shade)/55%),0_0_80px_--alpha(var(--color-glow)/12%)] backdrop-blur-md"
    >
      <div className="flex justify-between text-xs text-muted">
        <span>ADMIT ONE</span>
        <span className="text-mint-ink">&#9679; Valid</span>
      </div>
      <p className="mt-3.5 text-[22px] font-semibold tracking-[-0.02em]">Your Event 2026</p>
      <p className="mt-1 text-[13px] text-muted">General admission &middot; Gate B</p>
      {/* colour-ok: the QR tile is white in both themes so the code scans */}
      <div className="relative mx-auto mt-5 size-[200px] overflow-hidden rounded-2xl bg-white p-3.5">
        <canvas ref={canvasRef} width={172} height={172} className="block size-full" />
        <div className="absolute inset-x-2 top-2.5 h-[3px] animate-[qr-scan_2.4s_cubic-bezier(.65,0,.35,1)_infinite] will-change-transform rounded bg-mint shadow-[0_0_18px_4px_--alpha(var(--color-glow)/80%)]" />
      </div>
      <div className="mt-4 flex items-center justify-center gap-2.5 rounded-2xl border border-mint-ink/30 bg-mint-ink/10 p-3 text-sm font-semibold text-mint-ink">
        <span className="grid size-5 place-items-center rounded-full bg-mint text-xs text-on-mint">&#10003;</span>
        Checked in
      </div>
      <p className="mt-3.5 text-center text-xs text-muted">
        Tonight <b className="text-text tabular-nums">{checkedIn.toLocaleString("en-US")}</b> of{" "}
        <b className="text-text">10,000</b>
      </p>
    </div>
  );
}
