import type { NextRequest } from "next/server";
import { verifyOrderToken } from "@/lib/orderToken";
import { sendMail } from "@/lib/email/sendMail";
import { buildCustomerOrderConfirmation } from "@/lib/email/templates/customerOrderConfirmation";
import {
  renderErrorHtml,
  renderSendFailedHtml,
  renderSuccessHtml,
} from "@/lib/email/templates/confirmScreen";

function html(body: string, status = 200) {
  return new Response(body, {
    status,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

/**
 * Owner-only utility endpoint, reached by clicking "Confirm & Notify Customer"
 * in the order-notification email after calling the customer by phone.
 * No database: the order is fully re-derived from the signed token.
 *
 * Known limitation (by design, no persistence): clicking this link twice
 * sends the customer two confirmation emails. Acceptable for v1.
 */
export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");
  if (!token) return html(renderErrorHtml("invalid"), 400);

  const result = verifyOrderToken(token);
  if (!result.ok) return html(renderErrorHtml(result.reason), 400);

  const { payload } = result;
  const { subject, html: emailHtml } = buildCustomerOrderConfirmation(payload);

  try {
    await sendMail({ to: payload.email, subject, html: emailHtml });
  } catch (error) {
    console.error("[orders/confirm] failed to notify customer:", error);
    return html(renderSendFailedHtml(), 502);
  }

  return html(renderSuccessHtml(payload.name, payload.email, payload.locale));
}
