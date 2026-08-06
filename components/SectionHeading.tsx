"use client";

import { cn } from "@/lib/cn";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

/** Kibirli sadelik: numara + başlık. Pill, gradyan çizgi, süs yok. */
export function SectionHeading({
  index,
  title,
  subtitle,
  className,
}: {
  index: string;
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-14 md:mb-20", className)}>
      <motion.p
        className="font-mono text-[11px] tracking-[0.28em] text-muted uppercase"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.45, ease }}
      >
        {index}
      </motion.p>
      <motion.h2
        className="mt-4 max-w-3xl font-display text-3xl font-semibold tracking-tight text-foreground md:text-5xl md:leading-[1.05]"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.55, delay: 0.05, ease }}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          className="mt-5 max-w-md text-sm leading-relaxed text-muted md:text-base"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.12, ease }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
