import Image from "next/image";
import { kafe } from "@/content/kafe";
import { asset } from "@/lib/asset";
import { KafeReveal } from "@/components/kafe/KafeReveal";

export function KafeStory() {
  return (
    <section
      id="hikaye"
      className="scroll-mt-28 px-6 py-24 md:py-32"
    >
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
        <KafeReveal>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-[var(--kafe-border)]">
            <Image
              src={asset("/kafe/hero-visual.svg")}
              alt=""
              fill
              className="object-cover opacity-90"
              sizes="50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[var(--kafe-espresso)]/20 to-transparent" />
          </div>
        </KafeReveal>
        <KafeReveal delay={0.1}>
          <p className="text-xs font-medium tracking-[0.25em] text-[var(--kafe-accent)] uppercase">
            Hikâye
          </p>
          <h2 className="kafe-display mt-4 text-4xl font-semibold text-[var(--kafe-espresso)] md:text-5xl">
            {kafe.story.title}
          </h2>
          <p className="mt-6 text-base leading-[1.85] text-[var(--kafe-muted)] md:text-lg">
            {kafe.story.text}
          </p>
          <p className="mt-8 border-l-2 border-[var(--kafe-accent)] pl-5 text-sm italic text-[var(--kafe-muted)]">
            &ldquo;Her fincan, aynı özenle.&rdquo;
          </p>
        </KafeReveal>
      </div>
    </section>
  );
}
