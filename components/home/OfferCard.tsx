"use client";

import type { Locale } from "@/lib/i18n/locales";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import type { Offer } from "@/lib/types";
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
    <article className="hairline flex h-full w-[268px] flex-col gap-1.5 rounded-2xl bg-slice-card p-4 shadow-card">
      {offer.badge && (
        <span className="w-fit rounded-full bg-slice-red/10 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-slice-red">
          {offer.badge[lang]}
        </span>
      )}
      <h3 className="text-[15px] font-semibold text-slice-ink">
        {offer.title[lang]}
      </h3>
      <p className="line-clamp-2 flex-1 text-[13px] leading-snug text-slice-ink/60">
        {offer.description[lang]}
      </p>
      <div className="mt-1 flex items-center justify-between">
        <span className="text-[11px] font-medium text-slice-ink/40">
          {untilLabel}
        </span>
        {offer.linkedItemId && (
          <button
            type="button"
            onClick={() => addItem(offer.linkedItemId!, 1, [])}
            className="flex h-7 items-center rounded-full bg-slice-red px-3.5 text-xs font-bold text-slice-paper transition hover:bg-slice-red-deep active:scale-95"
          >
            {dict.offers.addToOrder}
          </button>
        )}
      </div>
    </article>
  );
}
