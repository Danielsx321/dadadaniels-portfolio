import { cn } from "./cn";

export function Badge({
  tone = "neutral",
  className,
  children,
}: {
  tone?: "neutral" | "accent";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill px-3 py-1 text-[0.8125rem] font-medium",
        tone === "accent"
          ? "bg-accent-soft text-accent-strong"
          : "border border-line bg-surface text-ink-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}
