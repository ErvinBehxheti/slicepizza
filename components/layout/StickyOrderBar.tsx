"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { computeCartTotal, formatPrice, resolveOrderItems } from "@/lib/cart/pricing";
import type { Locale } from "@/lib/i18n/locales";

export function StickyOrderBar({
  lang,
  label,
}: {
  lang: Locale;
  label: string;
}) {
  const { items, hydrated, itemCount } = useCart();

  if (!hydrated || items.length === 0) return null;

  const total = computeCartTotal(resolveOrderItems(items, lang));

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 p-3 md:hidden">
      <Link
        href={`/${lang}/cart`}
        className="flex items-center justify-between rounded-full bg-slice-red px-5 py-3 text-slice-paper shadow-xl shadow-slice-ink/20 transition-colors hover:bg-slice-red-deep"
      >
        <span className="text-sm font-semibold">
          {itemCount} · {formatPrice(total)}
        </span>
        <span className="text-sm font-bold">{label} →</span>
      </Link>
    </div>
  );
}
