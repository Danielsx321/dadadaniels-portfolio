import { Pill } from "@/components/ui/pill";
import { cn } from "@/components/ui/cn";

export function SectionHeading({
  eyebrow,
  title,
  accent,
  intro,
  align = "center",
  as: H = "h2",
  className,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  intro?: string;
  align?: "center" | "left";
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <div className={cn(align === "center" ? "mx-auto max-w-[760px] text-center" : "max-w-[640px]", className)}>
      <Pill>{eyebrow}</Pill>
      <H
        className={cn(
          "mt-5 font-semibold tracking-[-0.04em]",
          H === "h1" ? "text-[clamp(40px,6vw,76px)] leading-[1]" : "text-[clamp(34px,5vw,64px)] leading-[1.02]",
        )}
      >
        {title} {accent && <span className="accent">{accent}</span>}
      </H>
      {intro && <p className="mt-4 text-lg leading-relaxed text-muted">{intro}</p>}
    </div>
  );
}
