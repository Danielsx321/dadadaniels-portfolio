import Link from "next/link";
import { cn } from "./cn";

type Variant = "glow" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-[-0.005em] transition-[transform,box-shadow,background-color] duration-300 ease-soft";

const variants: Record<Variant, string> = {
  glow: "glow-mint hover:-translate-y-px hover:shadow-[0_0_0_1px_rgb(75_255_165/0.7),0_12px_44px_rgb(75_255_165/0.45),inset_0_1px_0_rgb(255_255_255/0.6)]",
  ghost: "border border-glass-line bg-glass text-text hover:bg-white/8",
};

const sizes: Record<Size, string> = {
  md: "px-4 py-2.5 text-sm",
  lg: "px-6 py-3.5 text-[0.9375rem]",
};

type Props = {
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

export function Button({ href, variant = "glow", size = "lg", className, children }: Props) {
  return (
    <Link href={href} className={cn(base, variants[variant], sizes[size], className)}>
      {children}
    </Link>
  );
}
