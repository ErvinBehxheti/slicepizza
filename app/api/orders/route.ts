import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { checkoutSchema } from "@/lib/validation/checkout";
import { resolveOrderItems, computeCartTotal } from "@/lib/cart/pricing";
import { signOrderToken } from "@/lib/orderToken";
import { sendMail } from "@/lib/email/sendMail";
import { buildOwnerOrderNotification } from "@/lib/email/templates/ownerOrderNotification";
import { OWNER_EMAIL } from "@/lib/config";

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const parsed = checkoutSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_payload" }, { status: 400 });
  }
  const data = parsed.data;

  // Honeypot: bots fill hidden fields real users never see. Pretend success, do nothing.
  if (data.companyWebsite) {
    return NextResponse.json({ success: true });
  }

  const resolvedItems = resolveOrderItems(data.items, data.locale);
  if (resolvedItems.length === 0) {
    return NextResponse.json({ error: "empty_order" }, { status: 400 });
  }
  const total = computeCartTotal(resolvedItems);

  const { token, payload } = signOrderToken({
    name: data.name,
    email: data.email,
    phone: data.phone,
    address: data.address,
    lat: data.lat,
    lng: data.lng,
    notes: data.notes,
    locale: data.locale,
    items: resolvedItems,
    total,
  });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const confirmUrl = new URL("/api/orders/confirm", siteUrl || request.url);
  confirmUrl.searchParams.set("token", token);

  const { subject, html } = buildOwnerOrderNotification(
    payload,
    confirmUrl.toString()
  );

  try {
    await sendMail({ to: OWNER_EMAIL, subject, html });
  } catch (error) {
    console.error("[orders] failed to notify owner:", error);
    return NextResponse.json({ error: "email_failed" }, { status: 502 });
  }

  return NextResponse.json({ success: true });
}
