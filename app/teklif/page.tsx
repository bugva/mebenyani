import { redirect } from "next/navigation";

/** Eski teklif formu — kişisel site için kaldırıldı; iletişim bölümüne yönlendirilir. */
export default function TeklifPage() {
  redirect("/#iletisim");
}
