"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { computeCartTotal, formatPrice, resolveOrderItems } from "@/lib/cart/pricing";
import type { Locale } from "@/lib/i18n/locales";
import type { Dictionary } from "@/app/[lang]/dictionaries";

export function CartView({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const { items, hydrated, updateQuantity, removeItem } = useCart();

  if (!hydrated) return null;

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
        <h1 className="font-brand text-3xl italic text-slice-ink">
          {dict.cart.heading}
        </h1>
        <p className="mt-3 text-slice-ink/60">{dict.cart.empty}</p>
        <Link
          href={`/${lang}#menu`}
          className="mt-6 inline-block rounded-full bg-slice-red px-6 py-3 text-sm font-bold text-slice-paper transition-colors hover:bg-slice-red-deep"
        >
          {dict.cart.browseMenu}
        </Link>
      </div>
    );
  }

  const resolved = resolveOrderItems(items, lang);
  const total = computeCartTotal(resolved);

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <h1 className="font-brand text-3xl italic text-slice-ink">
        {dict.cart.heading}
      </h1>

      <ul className="mt-8 space-y-4">
        {items.map((line, idx) => {
          const info = resolved[idx];
          if (!info) return null;
          return (
            <li
              key={line.lineId}
              className="flex items-start justify-between gap-4 rounded-2xl border border-slice-ink/10 bg-slice-paper p-4"
            >
              <div>
                <p className="font-semibold text-slice-ink">{info.name}</p>
                {info.extraNames.length > 0 && (
                  <p className="mt-0.5 text-xs text-slice-ink/60">
                    {dict.cart.extras}: {info.extraNames.join(", ")}
                  </p>
                )}
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex items-center rounded-full border border-slice-ink/15">
                    <button
                      type="button"
                      aria-label="-"
                      onClick={() =>
                        updateQuantity(line.lineId, line.quantity - 1)
                      }
                      className="px-2.5 py-1 text-slice-ink"
                    >
                      −
                    </button>
                    <span className="w-6 text-center text-sm font-semibold">
                      {line.quantity}
                    </span>
                    <button
                      type="button"
                      aria-label="+"
                      onClick={() =>
                        updateQuantity(line.lineId, line.quantity + 1)
                      }
                      className="px-2.5 py-1 text-slice-ink"
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(line.lineId)}
                    className="text-xs font-medium text-slice-ink/50 underline hover:text-slice-red"
                  >
                    {dict.cart.remove}
                  </button>
                </div>
              </div>
              <span className="whitespace-nowrap font-bold text-slice-red">
                {formatPrice(info.lineTotal)}
              </span>
            </li>
          );
        })}
      </ul>

      <div className="mt-8 flex items-center justify-between border-t border-slice-ink/10 pt-4">
        <span className="font-semibold text-slice-ink">
          {dict.cart.subtotal}
        </span>
        <span className="text-xl font-bold text-slice-red">
          {formatPrice(total)}
        </span>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row-reverse">
        <Link
          href={`/${lang}/checkout`}
          className="flex-1 rounded-full bg-slice-red px-6 py-3 text-center text-sm font-bold text-slice-paper transition-colors hover:bg-slice-red-deep"
        >
          {dict.cart.checkout}
        </Link>
        <Link
          href={`/${lang}#menu`}
          className="flex-1 rounded-full border border-slice-ink/20 px-6 py-3 text-center text-sm font-bold text-slice-ink transition-colors hover:border-slice-red hover:text-slice-red"
        >
          {dict.cart.continueShopping}
        </Link>
      </div>
    </div>
  );
}
