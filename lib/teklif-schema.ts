import { z } from "zod";

export const teklifSchema = z.object({
  name: z.string().min(2, "Ad en az 2 karakter olmalı"),
  email: z.string().email("Geçerli bir e-posta girin"),
  phone: z.string().optional(),
  service: z.enum(["web", "foto", "both", "other"], {
    message: "Hizmet türü seçin",
  }),
  budget: z.enum(["", "under5k", "5-15k", "15k+"]).optional(),
  message: z.string().min(10, "Mesaj en az 10 karakter olmalı"),
  referrer: z.string().optional(),
  website: z.string().max(0, "Spam algılandı").optional(),
});

export type TeklifInput = z.infer<typeof teklifSchema>;

const serviceLabels: Record<TeklifInput["service"], string> = {
  web: "Web sitesi",
  foto: "Fotoğraf",
  both: "İkisi",
  other: "Diğer",
};

const budgetLabels: Record<string, string> = {
  "": "Belirtilmedi",
  under5k: "5.000 ₺ altı",
  "5-15k": "5.000 – 15.000 ₺",
  "15k+": "15.000 ₺ üzeri",
};

export function formatTeklifEmail(data: TeklifInput) {
  return {
    subject: `[Teklif] ${data.name} — ${serviceLabels[data.service]}`,
    html: `
      <h2>Yeni teklif / mesaj</h2>
      <p><strong>Ad:</strong> ${escapeHtml(data.name)}</p>
      <p><strong>E-posta:</strong> ${escapeHtml(data.email)}</p>
      ${data.phone ? `<p><strong>Telefon:</strong> ${escapeHtml(data.phone)}</p>` : ""}
      <p><strong>Hizmet:</strong> ${serviceLabels[data.service]}</p>
      <p><strong>Bütçe:</strong> ${budgetLabels[data.budget ?? ""] ?? "Belirtilmedi"}</p>
      ${data.referrer ? `<p><strong>Kaynak:</strong> ${escapeHtml(data.referrer)}</p>` : ""}
      <p><strong>Mesaj:</strong></p>
      <p>${escapeHtml(data.message).replace(/\n/g, "<br>")}</p>
    `,
  };
}

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
