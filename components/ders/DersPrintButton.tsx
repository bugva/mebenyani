"use client";

export function DersPrintButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={className}
      title="Afişi A4 olarak yazdır / PDF kaydet"
    >
      Yazdır
    </button>
  );
}
