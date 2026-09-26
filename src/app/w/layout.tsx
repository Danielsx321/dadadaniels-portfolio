import { Monogram } from "@/components/brand/monogram";
import { ThemeToggle } from "@/components/theme/theme-toggle";

/**
 * Upwork-safe layout for case studies linked from proposals.
 * No contact form, booking widget, email, WhatsApp or social links anywhere on these pages.
 */
export default function SafeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="px-3 pt-4">
        <div className="mx-auto flex w-full max-w-[920px] items-center justify-between rounded-[28px] border border-glass-line bg-veil/60 py-2 pr-2 pl-4 backdrop-blur-md">
          <span className="flex items-center gap-2.5 text-[0.9375rem] font-semibold">
            <Monogram className="w-5 text-mint-ink" />
            Dada Daniels
          </span>
          <span className="flex items-center gap-2 text-sm text-muted">
            Case study
            <ThemeToggle />
          </span>
        </div>
      </header>
      <main id="main">{children}</main>
      <footer className="mx-auto max-w-site border-t border-glass-line px-5 pt-8 pb-12 text-sm text-subtle">
        &copy; {new Date().getFullYear()} Dada Daniels
      </footer>
    </>
  );
}
