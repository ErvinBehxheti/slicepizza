"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { findExtra } from "@/lib/menu";
import { formatPrice } from "@/lib/cart/pricing";
import type { MenuItem } from "@/lib/types";
import type { Locale } from "@/lib/i18n/locales";
import type { Dictionary } from "@/app/[lang]/dictionaries";

export function AddToCartControl({
  item,
  lang,
  dict,
}: {
  item: MenuItem;
  lang: Locale;
  dict: Dictionary;
}) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [justAdded, setJustAdded] = useState(false);

  const extras = (item.allowedExtraIds ?? [])
    .map((id) => findExtra(id))
    .filter((e): e is NonNullable<typeof e> => Boolean(e));

  function toggleExtra(id: string) {
    setSelectedExtras((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  }

  function handleAdd() {
    addItem(item.id, quantity, selectedExtras);
    setJustAdded(true);
    setQuantity(1);
    setSelectedExtras([]);
    window.setTimeout(() => setJustAdded(false), 1500);
  }

  return (
    <div className="mt-3 space-y-3">
      {extras.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {extras.map((extra) => {
            const active = selectedExtras.includes(extra.id);
            return (
              <label
                key={extra.id}
                className={`cursor-pointer rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                  active
                    ? "border-slice-red bg-slice-red/10 text-slice-red"
                    : "border-slice-ink/15 text-slice-ink/70 hover:border-slice-ink/30"
                }`}
              >
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={active}
                  onChange={() => toggleExtra(extra.id)}
                />
                {extra.name[lang]} (+{formatPrice(extra.price)})
              </label>
            );
          })}
        </div>
      )}

      <div className="flex items-center gap-3">
        <div className="flex items-center rounded-full border border-slice-ink/15">
          <button
            type="button"
            aria-label="-"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="px-3 py-1.5 text-slice-ink"
          >
            −
          </button>
          <span className="w-6 text-center text-sm font-semibold">
            {quantity}
          </span>
          <button
            type="button"
            aria-label="+"
            onClick={() => setQuantity((q) => q + 1)}
            className="px-3 py-1.5 text-slice-ink"
          >
            +
          </button>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="flex-1 rounded-full bg-slice-red px-4 py-2 text-sm font-bold text-slice-paper transition-colors hover:bg-slice-red-deep"
        >
          {justAdded ? dict.menu.added : dict.menu.addToCart}
        </button>
      </div>
    </div>
  );
}
