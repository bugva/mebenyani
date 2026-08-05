"use client";

import { cn } from "@/lib/cn";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const sections = [
  { id: "hakkimda", label: "Hakkımda" },
  { id: "fotograf", label: "Fotoğraf" },
  { id: "surec", label: "Yaklaşım" },
  { id: "hizmetler", label: "Neler" },
  { id: "prensipler", label: "Prensipler" },
  { id: "iletisim", label: "İletişim" },
];

/** Masaüstünde aktif bölümü gösteren minimal sabit navigasyon rayı. */
export function SectionRail() {
  const [active, setActive] = useState(sections[0].id);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.65);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const observers = sections.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-42% 0px -48% 0px" },
      );
      observer.observe(el);
      return observer;
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observers.forEach((observer) => observer?.disconnect());
    };
  }, []);

  return (
    <motion.nav
      className="fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 xl:block"
      initial={false}
      animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : -10 }}
      transition={{ duration: 0.3 }}
      aria-label="Bölüm navigasyonu"
    >
      <div className="glass flex flex-col items-center gap-1 rounded-full px-2 py-3">
        {sections.map((section, i) => {
          const selected = section.id === active;
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="group relative grid h-7 w-7 place-items-center"
              aria-label={section.label}
              aria-current={selected ? "location" : undefined}
            >
              <span
                className={cn(
                  "block rounded-full transition-all duration-300",
                  selected
                    ? "h-2 w-2 bg-accent shadow-[0_0_10px_rgba(125,164,255,0.8)]"
                    : "h-1 w-1 bg-muted/60 group-hover:h-1.5 group-hover:w-1.5 group-hover:bg-foreground",
                )}
              />
              <span className="glass pointer-events-none absolute left-9 whitespace-nowrap rounded-md px-2.5 py-1.5 font-mono text-[10px] tracking-wider text-foreground opacity-0 -translate-x-1 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100">
                {String(i + 1).padStart(2, "0")} · {section.label}
              </span>
            </a>
          );
        })}
      </div>
    </motion.nav>
  );
}
