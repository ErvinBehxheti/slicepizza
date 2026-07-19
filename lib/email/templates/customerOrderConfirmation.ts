import "server-only";
import { BRAND, escapeHtml } from "@/lib/email/brand";
import { EMAIL_DICTS } from "@/lib/email/dictionaries";
import { formatTemplate } from "@/lib/i18n/format";
import { formatPrice } from "@/lib/cart/pricing";
import { SHOP } from "@/lib/config";
import type { OrderTokenPayload } from "@/lib/types";

export function buildCustomerOrderConfirmation(
  payload: OrderTokenPayload
): { subject: string; html: string } {
  const t = EMAIL_DICTS[payload.locale].email.customer;

  const itemsHtml = payload.items
    .map((item) => {
      const extras = item.extraNames.length
        ? ` <span style="color:${BRAND.ink};opacity:0.6;">(${item.extraNames
            .map(escapeHtml)
            .join(", ")})</span>`
        : "";
      return `<li style="margin-bottom:4px;">${item.quantity}× ${escapeHtml(
        item.name
      )}${extras} — ${formatPrice(item.lineTotal)}</li>`;
    })
    .join("");

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;background:${BRAND.cream};padding:24px;">
      <div style="max-width:480px;margin:0 auto;background:${BRAND.paper};border-radius:16px;padding:28px;">
        <p style="font-family:Georgia,serif;font-style:italic;color:${BRAND.red};font-size:22px;margin:0;">slice</p>
        <p style="letter-spacing:0.3em;color:${BRAND.ink};font-size:10px;font-weight:bold;margin:0 0 20px;">HOUSE</p>
        <h1 style="color:${BRAND.red};font-size:20px;margin:0 0 12px;">${t.heading}</h1>
        <p style="color:${BRAND.ink};margin:0 0 4px;">${formatTemplate(t.greeting, { name: payload.name })}</p>
        <p style="color:${BRAND.ink};opacity:0.8;margin:0 0 20px;">${t.message}</p>
        <h2 style="color:${BRAND.ink};font-size:15px;margin:0 0 8px;">${t.items}</h2>
        <ul style="margin:0;padding-left:20px;color:${BRAND.ink};">${itemsHtml}</ul>
        <p style="margin:16px 0 0;font-weight:bold;color:${BRAND.red};font-size:16px;">${t.total}: ${formatPrice(payload.total)}</p>
        <p style="margin:16px 0 0;color:${BRAND.ink};"><strong>${t.address}:</strong> ${escapeHtml(payload.address)}</p>
        <p style="margin:20px 0 0;color:${BRAND.ink};opacity:0.8;">${t.callUs} <a href="tel:${SHOP.phoneHref.replace("tel:", "")}" style="color:${BRAND.red};font-weight:bold;text-decoration:none;">${SHOP.phone}</a></p>
        <p style="margin:24px 0 0;font-family:Georgia,serif;font-style:italic;color:${BRAND.ink};opacity:0.6;">${t.signature}</p>
      </div>
    </div>
  `;

  return {
    subject: t.subject,
    html,
  };
}
