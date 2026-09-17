"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { heroProjects } from "@/content/site";

const SLOT_DEG = 360 / 14;
const MAX_ANGLE = 78;

/**
 * Project thumbnails on the inside of a cylinder, drifting slowly.
 * Pauses on hover and when off screen. Static under reduced motion.
 */
export function HeroCarousel() {
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const cards = cardRefs.current.filter((c): c is HTMLDivElement => c !== null);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const loop = SLOT_DEG * cards.length;

    let offset = -SLOT_DEG * 4;
    let paused = false;
    let visible = true;
    let last = performance.now();
    let raf = 0;

    const layout = () => {
      const radius = cards[0].offsetWidth * 3.1;
      cards.forEach((card, i) => {
        const angle = ((((i * SLOT_DEG + offset) % loop) + loop) % loop) - loop / 2;
        const shown = Math.abs(angle) < MAX_ANGLE;
        card.style.opacity = shown ? String(Math.max(0, 1 - Math.pow(Math.abs(angle) / MAX_ANGLE, 3))) : "0";
        card.style.transform = `translateZ(${radius * 0.62}px) rotateY(${angle}deg) translateZ(${-radius}px)`;
      });
    };

    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      if (!paused) offset += dt * 0.006;
      layout();
      if (visible) raf = requestAnimationFrame(tick);
    };

    const onEnter = () => (paused = true);
    const onLeave = () => (paused = false);
    stage.addEventListener("pointerenter", onEnter);
    stage.addEventListener("pointerleave", onLeave);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible && !reduce) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    });

    layout();
    if (!reduce) io.observe(stage);
    window.addEventListener("resize", layout);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      stage.removeEventListener("pointerenter", onEnter);
      stage.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", layout);
    };
  }, []);

  return (
    <div
      ref={stageRef}
      aria-label="Project previews"
      role="group"
      className="relative mt-14 h-[clamp(300px,40.8vw,504px)] [perspective-origin:50%_40%] [perspective:1300px] [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]"
    >
      <div className="absolute top-0 left-1/2 h-full w-0 [transform-style:preserve-3d]">
        {heroProjects.map((project, i) => (
          <div
            key={project.title}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className="absolute top-0 left-[calc(clamp(180px,20.4vw,288px)/-2)] aspect-[4/5] w-[clamp(180px,20.4vw,288px)] overflow-hidden rounded-[18px] border border-white/12 bg-surface shadow-[0_30px_60px_rgb(0_0_0/0.5)] will-change-transform"
            style={{ opacity: 0 }}
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              loading="eager"
              sizes="(max-width: 900px) 200px, 290px"
              className="object-cover object-left"
            />
            <div className="absolute inset-x-2.5 bottom-2.5 flex items-center justify-between rounded-[10px] bg-[rgb(7_8_10/0.72)] px-2.5 py-1.5 text-xs font-medium backdrop-blur-md">
              {project.title}
              <span className="text-[0.6875rem] text-mint">{project.lane}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
