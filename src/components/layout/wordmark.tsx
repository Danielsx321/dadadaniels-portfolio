import Link from "next/link";

export function Wordmark() {
  return (
    <Link
      href="/"
      className="focus-ring inline-flex items-center gap-2.5 rounded-card font-display text-lg font-semibold tracking-tight text-ink"
    >
      <span
        aria-hidden="true"
        className="grid size-8 place-items-center rounded-card bg-accent text-[0.8125rem] font-bold text-white"
      >
        DD
      </span>
      Dada Daniels
    </Link>
  );
}
