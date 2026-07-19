"use client";

import { useState } from "react";
import type { MenuCategory, MenuCategoryId, MenuItem } from "@/lib/types";
import type { Locale } from "@/lib/i18n/locales";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { formatPrice } from "@/lib/cart/pricing";
import { useCart } from "@/context/CartContext";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { artForMenuItem } from "@/components/ui/FoodArt";
import { ItemSheet } from "@/components/menu/ItemSheet";

/**
 * Kiosk-style ordering: segmented category control, a grid of product
 * tiles, and an iOS bottom sheet for items that take extras.
 */
export function MenuKiosk({
  categories,
  lang,
  dict,
}: {
  categories: MenuCategory[];
  lang: Locale;
  dict: Dictionary;
}) {
  const { addItem } = useCart();
  const [activeId, setActiveId] = useState<MenuCategoryId>(categories[0].id);
  const [sheetItem, setSheetItem] = useState<MenuItem | null>(null);
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const active = categories.find((c) => c.id === activeId) ?? categories[0];

  function handleTileTap(item: MenuItem) {
    if (item.allowedExtraIds?.length) {
      setSheetItem(item);
      return;
    }
    addItem(item.id, 1, []);
    setJustAddedId(item.id);
    window.setTimeout(
      () => setJustAddedId((prev) => (prev === item.id ? null : prev)),
      1200
    );
  }

  return (
    <div>
      <div
        role="tablist"
        aria-label={dict.menu.heading}
        className="mx-auto flex w-full max-w-sm rounded-xl bg-slice-ink/[0.06] p-1"
      >
        {categories.map((category) => {
          const selected = category.id === active.id;
          return (
            <button
              key={category.id}
              role="tab"
              aria-selected={selected}
              onClick={() => setActiveId(category.id)}
              className={`flex-1 rounded-[10px] py-1.5 text-sm font-semibold transition-all duration-200 ${
                selected
                  ? "bg-slice-card text-slice-ink shadow-sm"
                  : "text-slice-ink/50 hover:text-slice-ink/80"
              }`}
            >
              {category.label[lang]}
            </button>
          );
        })}
      </div>

      <div
        key={active.id}
        className="animate-grid-in mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
      >
        {active.items.map((item) => {
          const art = artForMenuItem(item);
          const added = justAddedId === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleTileTap(item)}
              className="hairline group flex flex-col items-center gap-2.5 rounded-2xl bg-slice-card p-4 text-center shadow-card transition duration-200 hover:-translate-y-0.5 hover:shadow-float active:scale-[0.97]"
            >
              <span className="flex h-24 w-24 items-center justify-center rounded-full bg-slice-paper transition-transform duration-300 group-hover:scale-105">
                <ImageSlot
                  src={item.image}
                  alt=""
                  art={art.kind}
                  accent={art.accent}
                  sizes="96px"
                  className="h-20 w-20 rounded-full"
                />
              </span>
              <span className="min-h-10 text-sm font-semibold leading-tight text-slice-ink">
                {item.name[lang]}
              </span>
              <span className="flex w-full items-center justify-between">
                <span className="text-sm font-bold text-slice-ink/70">
                  {formatPrice(item.price)}
                </span>
                <span
                  aria-hidden="true"
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-slice-paper transition-colors ${
                    added ? "bg-green-600" : "bg-slice-red group-hover:bg-slice-red-deep"
                  }`}
                >
                  {added ? (
                    <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 10.5l4 4 8-8" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M10 4v12M4 10h12" />
                    </svg>
                  )}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {sheetItem && (
        <ItemSheet
          item={sheetItem}
          lang={lang}
          dict={dict}
          onClose={() => setSheetItem(null)}
        />
      )}
    </div>
  );
}
