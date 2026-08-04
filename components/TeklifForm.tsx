"use client";

import { useSearchParams } from "next/navigation";
import { FormEvent, useState, Suspense } from "react";

/** Yerel sabitler — site.teklif kaldırıldı; form yalnızca geriye dönük API uyumu için duruyor. */
const SERVICES = [
  { value: "web", label: "Web sitesi" },
  { value: "foto", label: "Fotoğraf çekimi" },
  { value: "video", label: "Video çekimi" },
  { value: "editing", label: "Editing / post-prodüksiyon" },
  { value: "other", label: "Diğer" },
] as const;

const BUDGETS = [
  { value: "", label: "Belirtmek istemiyorum" },
  { value: "under5k", label: "5.000 ₺ altı" },
  { value: "5-15k", label: "5.000 – 15.000 ₺" },
  { value: "15k+", label: "15.000 ₺ üzeri" },
] as const;

type FormState = "idle" | "loading" | "success" | "error";
type ServiceValue = (typeof SERVICES)[number]["value"];

function TeklifFormInner({ compact = false }: { compact?: boolean }) {
  const searchParams = useSearchParams();
  const refFromUrl = searchParams.get("ref") ?? "";
  const serviceFromUrl = searchParams.get("service") ?? "";
  const defaultService: ServiceValue | "" = SERVICES.some(
    (s) => s.value === serviceFromUrl,
  )
    ? (serviceFromUrl as ServiceValue)
    : "";

  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const fd = new FormData(form);

    const payload = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? "") || undefined,
      service: String(fd.get("service") ?? ""),
      budget: String(fd.get("budget") ?? "") || undefined,
      message: String(fd.get("message") ?? ""),
      referrer: String(fd.get("referrer") ?? "") || undefined,
      website: String(fd.get("website") ?? ""),
    };

    try {
      const res = await fetch("/api/teklif", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error ?? "Gönderilemedi");
      }
      setState("success");
      form.reset();
    } catch (err) {
      setState("error");
      setErrorMsg(err instanceof Error ? err.message : "Bir hata oluştu");
    }
  }

  if (state === "success") {
    return (
      <p className="rounded-2xl border border-border bg-surface p-6 text-sm text-muted">
        Mesajın iletildi. En kısa sürede dönüş yapacağım.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="hidden" name="referrer" value={refFromUrl} />
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
        aria-hidden
      />
      <div className={compact ? "space-y-3" : "grid gap-4 sm:grid-cols-2"}>
        <label className="block text-sm">
          <span className="mb-1.5 block text-muted">Ad</span>
          <input
            name="name"
            required
            minLength={2}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-accent/50"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block text-muted">E-posta</span>
          <input
            name="email"
            type="email"
            required
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-accent/50"
          />
        </label>
      </div>
      <label className="block text-sm">
        <span className="mb-1.5 block text-muted">Konu</span>
        <select
          name="service"
          required
          defaultValue={defaultService}
          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-accent/50"
        >
          <option value="" disabled>
            Seç…
          </option>
          {SERVICES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </label>
      {!compact && (
        <label className="block text-sm">
          <span className="mb-1.5 block text-muted">Bütçe (isteğe bağlı)</span>
          <select
            name="budget"
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-accent/50"
          >
            {BUDGETS.map((b) => (
              <option key={b.value || "none"} value={b.value}>
                {b.label}
              </option>
            ))}
          </select>
        </label>
      )}
      <label className="block text-sm">
        <span className="mb-1.5 block text-muted">Mesaj</span>
        <textarea
          name="message"
          required
          minLength={10}
          rows={compact ? 3 : 5}
          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-accent/50"
        />
      </label>
      {state === "error" && (
        <p className="text-sm text-red-400">{errorMsg}</p>
      )}
      <button
        type="submit"
        disabled={state === "loading"}
        className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-background disabled:opacity-60"
      >
        {state === "loading" ? "Gönderiliyor…" : "Gönder"}
      </button>
    </form>
  );
}

export function TeklifForm({ compact = false }: { compact?: boolean }) {
  return (
    <Suspense fallback={<p className="text-sm text-muted">Yükleniyor…</p>}>
      <TeklifFormInner compact={compact} />
    </Suspense>
  );
}
