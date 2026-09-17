import { Hero } from "@/components/home/hero";
import { AboutTeaser } from "@/components/sections/about-teaser";
import { CtaBlock } from "@/components/sections/cta-block";
import { EventSpotlight } from "@/components/sections/event-spotlight";
import { ProofStrip } from "@/components/sections/proof-strip";
import { ReviewBlock } from "@/components/sections/review-block";
import { ServicesBento } from "@/components/sections/services-bento";
import { WorkGrid } from "@/components/sections/work-grid";

export default function Home() {
  return (
    <>
      <Hero />
      <ProofStrip className="relative z-20 -mt-10" />
      <ServicesBento />
      <WorkGrid />
      <EventSpotlight />
      <AboutTeaser />
      <ReviewBlock />
      <CtaBlock />
    </>
  );
}
