import { site } from "@/content/site";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { PortfolioCard } from "@/components/PortfolioCard";

export function Portfolio() {
  return (
    <section id="isler" className="scroll-mt-28 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            index="07 — İşler"
            title="Seçilmiş projeler"
            subtitle="Web ve fotoğraf — özet ve detay aynı sayfada."
          />
        </Reveal>
        <div className="mt-12 flex flex-col gap-6">
          {site.portfolio.map((item, i) => (
            <Reveal key={item.slug} delay={i * 0.06}>
              <PortfolioCard item={item} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
