import Link from "next/link";
import { cn } from "./cn";

export function LinkArrow({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "focus-ring group inline-flex items-center gap-1.5 font-semibold text-accent hover:text-accent-strong",
        className,
      )}
    >
      {children}
      <svg
        aria-hidden="true"
        viewBox="0 0 16 16"
        className="size-4 transition-transform group-hover:translate-x-0.5"
      >
        <path
          d="M3 8h9m-3.5-4L12 8l-3.5 4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
  );
}
