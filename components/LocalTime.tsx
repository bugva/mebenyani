"use client";

import { useEffect, useState } from "react";

/** Ankara yerel saati + müsaitlik rozeti. Hydration uyumsuzluğu olmasın diye mount sonrası render edilir. */
export function LocalTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat("tr-TR", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Europe/Istanbul",
      }).format(new Date());

    setTime(format());
    const id = setInterval(() => setTime(format()), 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="inline-flex items-center gap-2.5 rounded-full border border-border bg-surface/60 px-4 py-2 font-mono text-[11px] tracking-[0.15em] text-muted uppercase">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
      </span>
      Yeni işlere açık · Ankara{time ? ` · ${time}` : ""}
    </span>
  );
}
