"use client";

import { useEffect, useState } from "react";
import type { MenuItem } from "@/lib/types";
import type { Locale } from "@/lib/i18n/locales";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { findExtra } from "@/lib/menu";
import { formatPrice } from "@/lib/cart/pricing";
import { formatTemplate } from "@/lib/i18n/format";
import { useCart } from "@/context/CartContext";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { artForMenuItem } from "@/components/ui/FoodArt";

/**
 * iOS-style sheet for configuring an item: bottom sheet on mobile,
 * centered card on larger screens.
 */
export function ItemSheet({
  item,
  lang,
  dict,
  onClose,
}: {
  item: MenuItem;
  lang: Locale;
  dict: Dictionary;
  onClose: () => void;
}) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);

  const extras = (item.allowedExtraIds ?? [])
    .map((id) => findExtra(id))
    .filter((e): e is NonNullable<typeof e> => Boolean(e));

  const extrasPrice = selectedExtras.reduce(
    (sum, id) => sum + (findExtra(id)?.price ?? 0),
    0
  );
  const total = Math.round((item.price + extrasPrice) * quantity * 100) / 100;
  const art = artForMenuItem(item);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  function toggleExtra(id: string) {
    setSelectedExtras((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  }

  function handleAdd() {
    addItem(item.id, quantity, selectedExtras);
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-label={item.name[lang]}
    >
      <button
        type="button"
        aria-label={dict.menu.close}
        onClick={onClose}
        className="animate-backdrop absolute inset-0 bg-slice-ink/40 backdrop-blur-[2px]"
      />

      <div className="animate-sheet-up sm:animate-sheet-pop pb-safe relative w-full rounded-t-[28px] bg-slice-card shadow-float sm:w-[420px] sm:rounded-[28px]">
        <div className="mx-auto mt-2.5 h-1 w-9 rounded-full bg-slice-ink/15 sm:hidden" />

        <button
          type="button"
          aria-label={dict.menu.close}
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-slice-ink/[0.06] text-slice-ink/60 transition hover:bg-slice-ink/10"
        >
          <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
            <path d="M5 5l10 10M15 5L5 15" />
          </svg>
        </button>

        <div className="max-h-[80dvh] overflow-y-auto px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
          <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-slice-paper">
            <ImageSlot
              src={item.image}
              alt=""
              art={art.kind}
              accent={art.accent}
              sizes="112px"
              className="h-24 w-24 rounded-full"
            />
          </div>

          <h3 className="mt-3 text-center text-xl font-bold tracking-tight text-slice-ink">
            {item.name[lang]}
          </h3>
          {item.description && (
            <p className="mt-1 text-center text-sm text-slice-ink/60">
              {item.description[lang]}
            </p>
          )}

          {extras.length > 0 && (
            <div className="mt-5">
              <p className="text-[13px] font-semibold uppercase tracking-wide text-slice-ink/40">
                {dict.menu.extrasLabel}
              </p>
              <div className="mt-2 divide-y divide-slice-ink/[0.06] rounded-2xl bg-slice-paper">
                {extras.map((extra) => {
                  const checked = selectedExtras.includes(extra.id);
                  return (
                    <button
                      key={extra.id}
                      type="button"
                      role="checkbox"
                      aria-checked={checked}
                      onClick={() => toggleExtra(extra.id)}
                      className="flex w-full items-center justify-between px-4 py-3 text-left"
                    >
                      <span className="text-[15px] font-medium text-slice-ink">
                        {extra.name[lang]}
                      </span>
                      <span className="flex items-center gap-3">
                        <span className="text-[13px] font-medium text-slice-ink/50">
                          +{formatPrice(extra.price)}
                        </span>
                        <span
                          aria-hidden="true"
                          className={`flex h-6 w-6 items-center justify-center rounded-full transition-colors ${
                            checked
                              ? "bg-slice-red text-slice-paper"
                              : "bg-slice-ink/10"
                          }`}
                        >
                          {checked && (
                            <svg viewBox="0 0 20 20" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M4 10.5l4 4 8-8" />
                            </svg>
                          )}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="mt-5 flex items-center justify-between rounded-2xl bg-slice-paper px-4 py-3">
            <span className="text-[15px] font-medium text-slice-ink">
              {dict.menu.quantity}
            </span>
            <div className="flex items-center gap-4">
              <button
                type="button"
                aria-label="−"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-slice-ink/[0.06] text-slice-ink transition active:scale-90"
              >
                <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                  <path d="M4 10h12" />
                </svg>
              </button>
              <span className="w-5 text-center text-[17px] font-bold tabular-nums text-slice-ink">
                {quantity}
              </span>
              <button
                type="button"
                aria-label="+"
                onClick={() => setQuantity((q) => q + 1)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-slice-ink/[0.06] text-slice-ink transition active:scale-90"
              >
                <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                  <path d="M10 4v12M4 10h12" />
                </svg>
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className="mt-5 flex h-12 w-full items-center justify-center rounded-2xl bg-slice-red text-[15px] font-semibold text-slice-paper shadow-lg shadow-slice-red/25 transition hover:bg-slice-red-deep active:scale-[0.98]"
          >
            {formatTemplate(dict.menu.addForPrice, { price: formatPrice(total) })}
          </button>
        </div>
      </div>
    </div>
  );
}
