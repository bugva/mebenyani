"use client";

import Link from "next/link";
import { site } from "@/content/site";
import { BugvaLogo } from "@/components/BugvaLogo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border px-6 py-14">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div>
          <BugvaLogo variant="full" className="h-5" />
          <p className="mt-6 font-mono text-[11px] tracking-[0.2em] text-muted uppercase">
            {site.tagline}
          </p>
          <p className="mt-4 text-sm text-muted">© {year}</p>
        </div>
        <div className="flex flex-wrap gap-6 text-sm text-muted">
          <a href="#top" className="transition-colors hover:text-foreground">
            Yukarı
          </a>
          <Link href="/yazilar" className="transition-colors hover:text-foreground">
            Yazılar
          </Link>
          {site.instagram && (
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              Instagram
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
