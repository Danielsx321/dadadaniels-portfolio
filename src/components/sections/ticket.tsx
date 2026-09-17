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
    ctx.fillStyle = "#0a0b0d";
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
    const id = window.setInterval(() => {
      setCheckedIn((v) => Math.min(10000, v + Math.ceil(Math.random() * 4)));
    }, 900);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="relative mx-auto max-w-[380px] rotate-3 animate-[ticket-float_6s_ease-in-out_infinite] rounded-3xl border border-white/14 bg-gradient-to-b from-white/8 to-white/3 p-5 shadow-[0_40px_100px_rgb(0_0_0/0.55),0_0_80px_rgb(75_255_165/0.12)] backdrop-blur-md"
    >
      <div className="flex justify-between text-xs text-muted">
        <span>ADMIT ONE</span>
        <span className="text-mint">&#9679; Valid</span>
      </div>
      <p className="mt-3.5 text-[22px] font-semibold tracking-[-0.02em]">Your Event 2026</p>
      <p className="mt-1 text-[13px] text-muted">General admission &middot; Gate B</p>
      <div className="relative mx-auto mt-5 size-[200px] overflow-hidden rounded-2xl bg-white p-3.5">
        <canvas ref={canvasRef} width={172} height={172} className="block size-full" />
        <div className="absolute inset-x-2 h-[3px] animate-[qr-scan_2.4s_cubic-bezier(.65,0,.35,1)_infinite] rounded bg-mint shadow-[0_0_18px_4px_rgb(75_255_165/0.8)]" />
      </div>
      <div className="mt-4 flex items-center justify-center gap-2.5 rounded-2xl border border-mint/30 bg-mint/10 p-3 text-sm font-semibold text-mint">
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
