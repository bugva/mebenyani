"use client";

import Link from "next/link";
import { site } from "@/content/site";
import { BugvaLogo } from "@/components/BugvaLogo";
import { LocalTime } from "@/components/LocalTime";
import { Magnetic } from "@/components/Magnetic";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export function Footer() {
  const year = new Date().getFullYear();
  const [first, ...rest] = site.name.split(" ");

  return (
    <footer className="relative overflow-hidden border-t border-border px-6 py-16">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent"
        aria-hidden
      />
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-10 md:flex-row md:items-end">
        <div>
          <BugvaLogo variant="mark" className="mb-5 h-10 w-10" />
          <motion.p
            className="font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, ease }}
          >
            {first}{" "}
            <span className="text-gradient">{rest.join(" ")}</span>
          </motion.p>
          <motion.p
            className="mt-2 font-mono text-xs uppercase tracking-wider text-muted"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {site.tagline}
          </motion.p>
          <p className="mt-8 flex flex-wrap items-center gap-4 text-sm text-muted">
            <LocalTime />
            <span>© {year}</span>
          </p>
        </div>
        <div className="flex flex-col items-start gap-3 md:items-end">
          <Magnetic strength={0.5} range={70}>
            <a
              href="#top"
              className="group inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-muted transition-all duration-300 hover:border-accent/45 hover:text-foreground"
              aria-label="Yukarı dön"
            >
              <span className="inline-block transition-transform duration-300 group-hover:-translate-y-1">
                ↑
              </span>
              Yukarı dön
            </a>
          </Magnetic>
          <Link
            href="/yazilar"
            className="text-sm text-muted transition-colors hover:text-accent"
          >
            Yazılar
          </Link>
          {site.instagram && (
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted transition-colors hover:text-accent"
            >
              {site.footer.socialLabel}
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
