import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { DesktopNav } from "./desktop-nav";
import { MobileNav } from "./mobile-nav";
import { Wordmark } from "./wordmark";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/85">
      <Container className="relative flex h-16 items-center justify-between gap-4">
        <Wordmark />
        <DesktopNav />
        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <Button href="/contact">Let&apos;s talk</Button>
          </div>
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
