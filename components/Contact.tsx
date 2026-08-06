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
  return (
    <section
      id="iletisim"
      className="scroll-mt-28 border-t border-border px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            index="07"
            title="Yaz."
            subtitle="Kısa tut. Ne istediğini söyle."
          />
        </Reveal>
        <Reveal delay={0.08}>
          <Magnetic strength={0.12} range={180} className="block">
            <a
              href={`mailto:${site.email}`}
              className="group block break-words font-display text-[clamp(1.8rem,6vw,4.5rem)] leading-[1.05] text-foreground transition-opacity hover:opacity-70"
            >
              {site.email}
            </a>
          </Magnetic>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <CopyEmailButton email={site.email} />
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-border px-5 py-2.5 text-sm text-muted transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
