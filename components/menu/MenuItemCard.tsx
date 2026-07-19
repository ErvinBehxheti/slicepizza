import { ImageSlot } from "@/components/ui/ImageSlot";
import { AddToCartControl } from "@/components/menu/AddToCartControl";
import { formatPrice } from "@/lib/cart/pricing";
import type { MenuItem } from "@/lib/types";
import type { Locale } from "@/lib/i18n/locales";
import type { Dictionary } from "@/app/[lang]/dictionaries";

export function MenuItemCard({
  item,
  lang,
  dict,
}: {
  item: MenuItem;
  lang: Locale;
  dict: Dictionary;
}) {
  return (
    <div className="flex gap-4 rounded-2xl border border-slice-ink/10 bg-slice-paper p-4">
      <ImageSlot
        src={item.image}
        alt={item.name[lang]}
        shape="slice"
        sizes="80px"
        className="h-20 w-20 shrink-0 rounded-xl"
      />
      <div className="flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-slice-ink">{item.name[lang]}</h3>
          <span className="whitespace-nowrap font-bold text-slice-red">
            {formatPrice(item.price)}
          </span>
        </div>
        {item.description && (
          <p className="mt-1 text-sm text-slice-ink/60">
            {item.description[lang]}
          </p>
        )}
        <AddToCartControl item={item} lang={lang} dict={dict} />
      </div>
    </div>
  );
}
