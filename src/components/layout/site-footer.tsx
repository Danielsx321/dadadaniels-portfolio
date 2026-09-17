import Link from "next/link";
import { Monogram } from "@/components/brand/monogram";
import { mainNav, site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="mx-auto flex max-w-site flex-wrap items-center justify-between gap-4 border-t border-glass-line px-5 pt-10 pb-12 text-sm text-subtle">
      <Link href="/" className="flex items-center gap-2.5 font-semibold text-text">
        <Monogram className="w-[18px] text-mint" />
        {site.name}
      </Link>
      <nav aria-label="Footer">
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {mainNav.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="hover:text-text">
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/contact" className="hover:text-text">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
      <span>
        &copy; {new Date().getFullYear()} {site.name}
      </span>
    </footer>
  );
}
