import "server-only";
import { BRAND, escapeHtml } from "@/lib/email/brand";
import { EMAIL_DICTS } from "@/lib/email/dictionaries";
import { formatTemplate } from "@/lib/i18n/format";
import type { Locale } from "@/lib/i18n/locales";

function shell(title: string, body: string): string {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${title}</title>
</head>
<body style="margin:0;background:${BRAND.cream};font-family:Arial,Helvetica,sans-serif;display:flex;min-height:100vh;align-items:center;justify-content:center;padding:24px;">
  <div style="max-width:420px;width:100%;background:${BRAND.paper};border-radius:20px;padding:32px;text-align:center;box-shadow:0 10px 30px rgba(53,34,21,0.15);">
    ${body}
  </div>
</body>
</html>`;
}

/** Standalone owner-only success screen — not a full Next page, just an HTML Response. */
export function renderSuccessHtml(
  name: string,
  email: string,
  locale: Locale
): string {
  const t = EMAIL_DICTS[locale].email.confirmScreen;
  const body = `
    <div style="width:56px;height:56px;border-radius:999px;background:${BRAND.red};color:${BRAND.paper};display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:28px;">&#10003;</div>
    <h1 style="color:${BRAND.ink};font-size:20px;margin:0 0 8px;">${t.successTitle}</h1>
    <p style="color:${BRAND.ink};opacity:0.75;margin:0;">${formatTemplate(
      t.successBody,
      { name: escapeHtml(name), email: escapeHtml(email) }
    )}</p>
  `;
  return shell(t.successTitle, body);
}

/** Locale is unknown when the token can't be trusted — show both languages. */
export function renderErrorHtml(reason: "invalid" | "expired"): string {
  const sq = EMAIL_DICTS.sq.email.confirmScreen;
  const en = EMAIL_DICTS.en.email.confirmScreen;
  const sqMsg = reason === "expired" ? sq.errorExpired : sq.errorInvalid;
  const enMsg = reason === "expired" ? en.errorExpired : en.errorInvalid;
  const title = `${sq.errorTitle} / ${en.errorTitle}`;
  const body = `
    <div style="width:56px;height:56px;border-radius:999px;background:${BRAND.redDeep};color:${BRAND.paper};display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:28px;">!</div>
    <h1 style="color:${BRAND.ink};font-size:20px;margin:0 0 8px;">${title}</h1>
    <p style="color:${BRAND.ink};opacity:0.75;margin:0 0 4px;">${sqMsg}</p>
    <p style="color:${BRAND.ink};opacity:0.75;margin:0;">${enMsg}</p>
  `;
  return shell(title, body);
}

/** The customer email failed to send (Resend/network error) — distinct from an invalid/expired link. */
export function renderSendFailedHtml(): string {
  const title = "Dërgimi dështoi / Sending failed";
  const body = `
    <div style="width:56px;height:56px;border-radius:999px;background:${BRAND.redDeep};color:${BRAND.paper};display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:28px;">!</div>
    <h1 style="color:${BRAND.ink};font-size:20px;margin:0 0 8px;">${title}</h1>
    <p style="color:${BRAND.ink};opacity:0.75;margin:0 0 4px;">Dërgimi i email-it te klienti dështoi. Provo përsëri duke klikuar lidhjen edhe një herë.</p>
    <p style="color:${BRAND.ink};opacity:0.75;margin:0;">Sending the email to the customer failed. Try clicking the link again.</p>
  `;
  return shell(title, body);
}
