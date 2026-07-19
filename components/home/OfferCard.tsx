"use client";

import type { Locale } from "@/lib/i18n/locales";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import type { Offer } from "@/lib/types";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { formatDayMonth, formatTemplate } from "@/lib/i18n/format";
import { useCart } from "@/context/CartContext";

export function OfferCard({
  offer,
  lang,
  dict,
}: {
  offer: Offer;
  lang: Locale;
  dict: Dictionary;
}) {
  const { addItem } = useCart();
  const untilLabel = formatTemplate(dict.offers.until, {
    date: formatDayMonth(offer.endDate, lang),
  });

  return (
    <article className="flex flex-col overflow-hidden rounded-3xl border border-slice-ink/10 bg-slice-paper shadow-sm">
      <ImageSlot
        src={offer.image}
        alt={offer.title[lang]}
        shape="slice"
        sizes="(min-width: 768px) 33vw, 90vw"
        className="aspect-4/3 w-full"
      />
      <div className="flex flex-1 flex-col gap-2 p-5">
        {offer.badge && (
          <span className="w-fit rounded-full bg-slice-red/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-slice-red">
            {offer.badge[lang]}
          </span>
        )}
        <h3 className="text-lg font-semibold text-slice-ink">
          {offer.title[lang]}
        </h3>
        <p className="flex-1 text-sm text-slice-ink/70">
          {offer.description[lang]}
        </p>
        <p className="text-xs font-medium text-slice-ink/50">{untilLabel}</p>
        {offer.linkedItemId && (
          <button
            type="button"
            onClick={() => addItem(offer.linkedItemId!, 1, [])}
            className="mt-2 rounded-full bg-slice-red px-4 py-2 text-sm font-bold text-slice-paper transition-colors hover:bg-slice-red-deep"
          >
            {dict.offers.addToOrder}
          </button>
        )}
      </div>
    </article>
  );
}
