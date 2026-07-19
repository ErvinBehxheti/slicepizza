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
        <h1 className="text-3xl font-bold tracking-tight text-slice-ink">
          {dict.cart.heading}
        </h1>
        <p className="mt-3 text-slice-ink/60">{dict.cart.empty}</p>
        <Link
          href={`/${lang}#menu`}
          className="mt-6 inline-flex h-12 items-center rounded-full bg-slice-red px-7 text-[15px] font-semibold text-slice-paper shadow-lg shadow-slice-red/25 transition hover:bg-slice-red-deep"
        >
          {dict.cart.browseMenu}
        </Link>
      </div>
    );
  }

  const resolved = resolveOrderItems(items, lang);
  const total = computeCartTotal(resolved);

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-slice-ink">
        {dict.cart.heading}
      </h1>

      <ul className="hairline mt-6 divide-y divide-slice-ink/[0.06] rounded-[28px] bg-slice-card shadow-card">
        {items.map((line, idx) => {
          const info = resolved[idx];
          if (!info) return null;
          return (
            <li key={line.lineId} className="flex items-center gap-4 p-4 sm:px-5">
              <div className="min-w-0 flex-1">
                <p className="text-[15px] font-semibold text-slice-ink">
                  {info.name}
                </p>
                {info.extraNames.length > 0 && (
                  <p className="mt-0.5 text-xs text-slice-ink/50">
                    + {info.extraNames.join(", ")}
                  </p>
                )}
                <p className="mt-1 text-sm font-bold tabular-nums text-slice-ink/70">
                  {formatPrice(info.lineTotal)}
                </p>
              </div>

              <div className="flex items-center gap-2.5 rounded-full bg-slice-ink/[0.05] px-1 py-1">
                <button
                  type="button"
                  aria-label="−"
                  onClick={() => updateQuantity(line.lineId, line.quantity - 1)}
                  className="flex h-7 w-7 items-center justify-center rounded-full text-slice-ink transition hover:bg-slice-card active:scale-90"
                >
                  <svg viewBox="0 0 20 20" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                    <path d="M4 10h12" />
                  </svg>
                </button>
                <span className="w-4 text-center text-sm font-bold tabular-nums text-slice-ink">
                  {line.quantity}
                </span>
                <button
                  type="button"
                  aria-label="+"
                  onClick={() => updateQuantity(line.lineId, line.quantity + 1)}
                  className="flex h-7 w-7 items-center justify-center rounded-full text-slice-ink transition hover:bg-slice-card active:scale-90"
                >
                  <svg viewBox="0 0 20 20" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                    <path d="M10 4v12M4 10h12" />
                  </svg>
                </button>
              </div>

              <button
                type="button"
                aria-label={dict.cart.remove}
                onClick={() => removeItem(line.lineId)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-slice-ink/40 transition hover:bg-slice-red/10 hover:text-slice-red"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
                </svg>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-6 flex items-center justify-between px-1">
        <span className="text-[15px] font-semibold text-slice-ink">
          {dict.cart.subtotal}
        </span>
        <span className="text-xl font-bold tabular-nums text-slice-ink">
          {formatPrice(total)}
        </span>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row-reverse">
        <Link
          href={`/${lang}/checkout`}
          className="flex h-12 flex-1 items-center justify-center rounded-2xl bg-slice-red text-[15px] font-semibold text-slice-paper shadow-lg shadow-slice-red/25 transition hover:bg-slice-red-deep active:scale-[0.98]"
        >
          {dict.cart.checkout}
        </Link>
        <Link
          href={`/${lang}#menu`}
          className="flex h-12 flex-1 items-center justify-center rounded-2xl bg-slice-ink/[0.06] text-[15px] font-semibold text-slice-ink transition hover:bg-slice-ink/10 active:scale-[0.98]"
        >
          {dict.cart.continueShopping}
        </Link>
      </div>
    </div>
  );
}
