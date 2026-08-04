const items = [
  "Espresso",
  "Filtre",
  "Latte",
  "Cold Brew",
  "Cheesecake",
  "Kruvasan",
  "Demle",
  "Ankara",
];

export function KafeMarquee() {
  const row = [...items, ...items, ...items];

  return (
    <div className="overflow-hidden border-y border-[var(--kafe-border)] bg-[var(--kafe-espresso)] py-4">
      <div className="flex w-max kafe-animate-marquee gap-12">
        {row.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="kafe-display shrink-0 text-lg font-medium tracking-wide text-[var(--kafe-accent-soft)] md:text-xl"
          >
            {item}
            <span className="mx-8 text-[var(--kafe-accent)]">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
