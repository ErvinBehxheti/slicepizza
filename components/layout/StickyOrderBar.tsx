"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();

  // The bar is a shortcut into the order flow — once there, it's just noise.
  const inOrderFlow =
    pathname.includes("/cart") || pathname.includes("/checkout");

  if (!hydrated || items.length === 0 || inOrderFlow) return null;

  const total = computeCartTotal(resolveOrderItems(items, lang));

  return (
    <div className="pb-safe fixed inset-x-0 bottom-0 z-40 px-3 pb-3 md:hidden">
      <Link
        href={`/${lang}/cart`}
        className="animate-bar-up flex items-center justify-between rounded-2xl bg-slice-red px-4 py-3.5 text-slice-paper shadow-float transition-transform active:scale-[0.98]"
      >
        <span className="flex items-center gap-2.5 text-[15px] font-semibold">
          <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-white/20 px-1.5 text-[13px] font-bold">
            {itemCount}
          </span>
          {formatPrice(total)}
        </span>
        <span className="flex items-center gap-1 text-[15px] font-bold">
          {label}
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M7 4l6 6-6 6" />
          </svg>
        </span>
      </Link>
    </div>
  );
}
