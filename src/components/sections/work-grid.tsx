import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { getFeatured } from "@/lib/content";
import { WorkCard } from "@/components/work/work-card";
import { SectionHeading } from "./section-heading";

export function WorkGrid() {
  const featured = getFeatured().slice(0, 4);
  return (
    <section id="work" className="mx-auto max-w-site scroll-mt-24 px-5 pb-28">
      <Reveal>
        <SectionHeading
          eyebrow="Selected work"
          title="Real projects,"
          accent="live online"
          intro="Real sites for real clients. Each project links to the live site and says exactly what I did on it."
        />
      </Reveal>
      <ul className="mt-14 grid gap-4 md:grid-cols-2">
        {featured.map((study, i) => (
          <Reveal as="li" key={study.slug} delay={(i % 2) * 80}>
            <WorkCard study={study} />
          </Reveal>
        ))}
      </ul>
      <Reveal className="mt-9 flex justify-center">
        <Button href="/work" variant="ghost">
          See all projects &rarr;
        </Button>
      </Reveal>
    </section>
  );
}
