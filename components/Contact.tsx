import { site } from "@/content/site";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { Magnetic } from "@/components/Magnetic";
import { CopyEmailButton } from "@/components/CopyEmailButton";

const socialLinks = [
  { label: "Instagram", href: site.instagram, show: !!site.instagram },
  { label: "LinkedIn", href: site.linkedin, show: !!site.linkedin },
  { label: "GitHub", href: site.github, show: !!site.github },
].filter((l) => l.show);

export function Contact() {
  const instagram = socialLinks.find((l) => l.label === "Instagram");
  const otherSocial = socialLinks.filter((l) => l.label !== "Instagram");

  return (
    <section
      id="iletisim"
      className="relative scroll-mt-28 overflow-hidden border-t border-border px-6 py-24 md:py-32"
    >
      <div
        className="pointer-events-none absolute -right-24 top-1/3 h-80 w-80 rounded-full bg-accent/10 blur-[110px]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            index="10 — İletişim"
            title={site.contact.heading}
            subtitle={site.contact.subtext}
          />
        </Reveal>
        <Reveal delay={0.1}>
          <Magnetic strength={0.15} range={200} className="block">
            <a
              href={`mailto:${site.email}`}
              className="group block w-full break-words font-display text-[clamp(1.6rem,5.5vw,4.8rem)] leading-[1.05] text-foreground transition-colors duration-300 hover:text-accent"
            >
              {site.email}
              <span className="ml-3 inline-block text-accent transition-transform duration-300 group-hover:translate-x-2 group-hover:-translate-y-2">
                ↗
              </span>
            </a>
          </Magnetic>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            {instagram && (
              <Magnetic strength={0.35} range={140}>
                <a
                  href={instagram.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-shimmer inline-block rounded-full bg-accent px-8 py-4 text-sm font-semibold text-background transition-all duration-300 hover:shadow-[0_0_36px_-6px_rgba(125,164,255,0.55)]"
                >
                  Instagram
                </a>
              </Magnetic>
            )}
            <CopyEmailButton email={site.email} />
            {otherSocial.map((link) => (
              <Magnetic key={link.label} strength={0.5} range={80}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gradient-border inline-block rounded-full px-6 py-3 text-sm font-medium text-muted transition-all duration-300 hover:text-foreground hover:shadow-[0_0_20px_-6px_rgba(125,164,255,0.3)]"
                >
                  {link.label} →
                </a>
              </Magnetic>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
