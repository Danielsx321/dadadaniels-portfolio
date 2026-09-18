import { SiteFooter } from "@/components/layout/site-footer";
import { SiteNav } from "@/components/layout/site-nav";
import { JsonLd } from "@/components/seo/json-ld";
import { lanes } from "@/content/lanes";
import { site } from "@/content/site";
import { siteUrl } from "@/lib/site-url";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const url = siteUrl().origin;
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    alternateName: "Daniels",
    jobTitle: site.titles,
    url,
    image: `${url}/me/portrait.jpg`,
    homeLocation: { "@type": "Place", name: site.location },
    sameAs: site.socials.map((s) => s.href),
  };
  const service = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    url,
    areaServed: ["United States", "Europe", "Africa"],
    founder: { "@type": "Person", name: site.name },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services",
      itemListElement: lanes.map((l) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: l.title, description: l.intro },
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "USD",
          minPrice: Number(l.priceFrom.replace(/[^0-9]/g, "")),
        },
      })),
    },
  };

  return (
    <>
      <JsonLd data={person} />
      <JsonLd data={service} />
      <SiteNav />
      <main id="main">{children}</main>
      <SiteFooter />
    </>
  );
}
