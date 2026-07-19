import type { Locale } from "@/lib/i18n/locales";
import { findExtra, findMenuItem } from "@/lib/menu";
import type { CartLineItem, ResolvedOrderItem } from "@/lib/types";

/**
 * The single source of truth for order pricing. Used by the cart/checkout UI
 * (client, for display) and the orders Route Handler (server, authoritative) —
 * the server never trusts a client-sent total.
 */
export function resolveOrderItems(
  lines: Pick<CartLineItem, "itemId" | "quantity" | "extraIds">[],
  locale: Locale
): ResolvedOrderItem[] {
  const resolved: ResolvedOrderItem[] = [];

  for (const line of lines) {
    const item = findMenuItem(line.itemId);
    if (!item || line.quantity < 1) continue;

    const extras = line.extraIds
      .map((id) => findExtra(id))
      .filter((e): e is NonNullable<typeof e> => Boolean(e));
    const extrasPrice = extras.reduce((sum, e) => sum + e.price, 0);
    const unitPrice = item.price + extrasPrice;

    resolved.push({
      itemId: item.id,
      name: item.name[locale],
      unitPrice: item.price,
      quantity: line.quantity,
      extraIds: extras.map((e) => e.id),
      extraNames: extras.map((e) => e.name[locale]),
      extrasPrice,
      lineTotal: Math.round(unitPrice * line.quantity * 100) / 100,
    });
  }

  return resolved;
}

export function computeCartTotal(resolved: ResolvedOrderItem[]): number {
  const total = resolved.reduce((sum, item) => sum + item.lineTotal, 0);
  return Math.round(total * 100) / 100;
}

export function formatPrice(amount: number): string {
  return `€${amount.toFixed(2)}`;
}
