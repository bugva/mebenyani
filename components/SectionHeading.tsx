"use client";

import { cn } from "@/lib/cn";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

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
  const words = title.split(" ");

  return (
    <div className={cn("mb-12 md:mb-16", className)}>
      <motion.span
        className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3.5 py-1.5 backdrop-blur-sm"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.45, ease }}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
        <span className="font-mono text-[11px] tracking-[0.22em] text-accent uppercase">
          {index}
        </span>
      </motion.span>

      <motion.div
        className="mt-5 h-px w-full max-w-xs origin-left bg-gradient-to-r from-accent via-[rgba(167,139,250,0.6)] to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, delay: 0.1, ease }}
        aria-hidden
      />

      <h2 className="mt-5 font-display text-3xl tracking-tight md:text-5xl md:leading-[1.08]">
        {words.map((word, i) => (
          <motion.span
            key={`${word}-${i}`}
            className="inline-block text-gradient"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.15 + i * 0.06, ease }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        ))}
      </h2>

      {subtitle && (
        <motion.p
          className="mt-4 max-w-xl text-base text-muted md:text-lg"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, delay: 0.3, ease }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
