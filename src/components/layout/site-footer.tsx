import Link from "next/link";
import { Container } from "@/components/ui/container";
import { mainNav, site } from "@/content/site";
import { Wordmark } from "./wordmark";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface">
      <Container className="grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr] md:py-16">
        <div>
          <Wordmark />
          <p className="mt-4 max-w-sm text-ink-muted">
            {site.titles.join(", ")}. Event tech systems for organizers who
            want to own their ticketing and check-in.
          </p>
          <p className="mt-4 text-sm text-ink-muted">
            Based in {site.location}. Working with clients worldwide.
          </p>
        </div>
        <nav aria-label="Footer">
          <h2 className="font-sans text-sm font-semibold text-ink">Pages</h2>
          <ul className="mt-3 space-y-2">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="focus-ring rounded-card text-ink-muted hover:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/contact"
                className="focus-ring rounded-card text-ink-muted hover:text-ink"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
        <div>
          <h2 className="font-sans text-sm font-semibold text-ink">Get in touch</h2>
          <ul className="mt-3 space-y-2">
            <li>
              <Link
                href="/contact"
                className="focus-ring rounded-card text-ink-muted hover:text-ink"
              >
                Send a message or book a call
              </Link>
            </li>
            {site.socials.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring rounded-card text-ink-muted hover:text-ink"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
      <Container className="border-t border-line py-6 text-sm text-ink-muted">
        <p>
          &copy; {new Date().getFullYear()} {site.name}
        </p>
      </Container>
    </footer>
  );
}
