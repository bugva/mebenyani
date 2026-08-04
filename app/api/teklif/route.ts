import { sendTeklifEmail } from "@/lib/resend";
import { teklifSchema } from "@/lib/teklif-schema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = teklifSchema.safeParse(body);

    if (!parsed.success) {
      const first = parsed.error.issues[0]?.message ?? "Geçersiz veri";
      return NextResponse.json({ error: first }, { status: 400 });
    }

    if (parsed.data.website) {
      return NextResponse.json({ ok: true });
    }

    await sendTeklifEmail(parsed.data);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Sunucu hatası";
    console.error("[teklif]", message);
    return NextResponse.json(
      { error: "Mesaj gönderilemedi. Lütfen daha sonra tekrar dene." },
      { status: 500 },
    );
  }
}
