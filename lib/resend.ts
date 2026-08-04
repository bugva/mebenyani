import { Resend } from "resend";
import { formatTeklifEmail, type TeklifInput } from "./teklif-schema";

let resend: Resend | null = null;

function getResend() {
  if (!resend) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error("RESEND_API_KEY tanımlı değil");
    }
    resend = new Resend(apiKey);
  }
  return resend;
}

export async function sendTeklifEmail(data: TeklifInput) {
  const to = process.env.TEKLIF_TO_EMAIL;
  const from = process.env.TEKLIF_FROM_EMAIL;

  if (!to || !from) {
    throw new Error("TEKLIF_TO_EMAIL ve TEKLIF_FROM_EMAIL tanımlı olmalı");
  }

  const { subject, html } = formatTeklifEmail(data);

  const { error } = await getResend().emails.send({
    from,
    to,
    replyTo: data.email,
    subject,
    html,
  });

  if (error) {
    throw new Error(error.message);
  }
}
