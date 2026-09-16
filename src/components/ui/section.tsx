import { cn } from "./cn";
import { Container } from "./container";

type SectionProps = {
  id?: string;
  tone?: "canvas" | "surface" | "soft";
  className?: string;
  children: React.ReactNode;
  "aria-labelledby"?: string;
};

const tones = {
  canvas: "bg-canvas",
  surface: "bg-surface border-y border-line",
  soft: "bg-accent-soft",
};

export function Section({
  id,
  tone = "canvas",
  className,
  children,
  ...rest
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn("py-16 md:py-24", tones[tone], className)}
      {...rest}
    >
      <Container>{children}</Container>
    </section>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-accent">
      {children}
    </p>
  );
}
