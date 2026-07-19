import "server-only";
import { BRAND, escapeHtml } from "@/lib/email/brand";
import { EMAIL_DICTS } from "@/lib/email/dictionaries";
import { formatTemplate } from "@/lib/i18n/format";
import { formatPrice } from "@/lib/cart/pricing";
import type { OrderTokenPayload } from "@/lib/types";

// The owner always reads Albanian, regardless of which language the
// customer browsed the site in.
const t = EMAIL_DICTS.sq.email.owner;

export function buildOwnerOrderNotification(
  payload: OrderTokenPayload,
  confirmUrl: string
): { subject: string; html: string } {
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
        <h1 style="color:${BRAND.red};font-size:20px;margin:0 0 20px;">${t.heading}</h1>
        <p style="margin:4px 0;color:${BRAND.ink};"><strong>${t.customer}:</strong> ${escapeHtml(payload.name)}</p>
        <p style="margin:4px 0;color:${BRAND.ink};"><strong>${t.phone}:</strong> ${escapeHtml(payload.phone)}</p>
        <p style="margin:4px 0;color:${BRAND.ink};"><strong>${t.email}:</strong> ${escapeHtml(payload.email)}</p>
        <p style="margin:4px 0;color:${BRAND.ink};"><strong>${t.address}:</strong> ${escapeHtml(payload.address)}</p>
        ${
          payload.lat && payload.lng
            ? `<p style="margin:4px 0;color:${BRAND.ink};opacity:0.7;font-size:13px;">GPS: ${payload.lat.toFixed(5)}, ${payload.lng.toFixed(5)}</p>`
            : ""
        }
        ${
          payload.notes
            ? `<p style="margin:4px 0;color:${BRAND.ink};"><strong>${t.notes}:</strong> ${escapeHtml(payload.notes)}</p>`
            : ""
        }
        <h2 style="color:${BRAND.ink};font-size:15px;margin:20px 0 8px;">${t.items}</h2>
        <ul style="margin:0;padding-left:20px;color:${BRAND.ink};">${itemsHtml}</ul>
        <p style="margin:16px 0 0;font-weight:bold;color:${BRAND.red};font-size:16px;">${t.total}: ${formatPrice(payload.total)}</p>
        <a href="${confirmUrl}" style="display:inline-block;margin-top:24px;background:${BRAND.red};color:${BRAND.paper};text-decoration:none;padding:12px 28px;border-radius:999px;font-weight:bold;font-size:14px;">${t.confirmButton}</a>
        <p style="margin-top:14px;font-size:12px;color:${BRAND.ink};opacity:0.65;">${t.confirmHint}</p>
      </div>
    </div>
  `;

  return {
    subject: formatTemplate(t.subject, { name: payload.name }),
    html,
  };
}
