import { cn } from "./cn";

export function Pill({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-glass-line bg-glass px-3.5 py-1.5 text-[0.8125rem] text-muted",
        className,
      )}
    >
      <span aria-hidden="true" className="size-1.5 rounded-full bg-mint shadow-[0_0_10px_var(--color-mint)]" />
      {children}
    </span>
  );
}
