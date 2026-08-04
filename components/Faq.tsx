"use client";

import { site } from "@/content/site";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/cn";

const ease = [0.22, 1, 0.36, 1] as const;

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="sss" className="scroll-mt-28 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            index="09 — SSS"
            title="Sık sorulanlar"
            subtitle="Kafandaki soruların çoğu burada — yoksa yaz, konuşalım."
          />
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mx-auto max-w-3xl space-y-3">
            {site.faq.map((item, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={item.q}
                  className={cn(
                    "overflow-hidden rounded-2xl border transition-colors duration-300",
                    isOpen
                      ? "gradient-border"
                      : "border-border bg-surface/50 hover:border-accent/30",
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="font-mono text-[11px] tracking-widest text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-base text-foreground md:text-lg">
                        {item.q}
                      </span>
                    </span>
                    <motion.span
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-accent"
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3, ease }}
                      aria-hidden
                    >
                      +
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease }}
                      >
                        <p className="px-6 pb-6 pl-[4.15rem] text-sm leading-relaxed text-muted md:text-base">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
