import type { MenuCategory } from "@/lib/types";
import type { Locale } from "@/lib/i18n/locales";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { MenuItemCard } from "@/components/menu/MenuItemCard";

export function MenuCategoryBlock({
  category,
  lang,
  dict,
}: {
  category: MenuCategory;
  lang: Locale;
  dict: Dictionary;
}) {
  return (
    <div>
      <h3 className="mb-4 text-xl font-semibold text-slice-ink">
        {category.label[lang]}
      </h3>
      <div className="grid gap-4 sm:grid-cols-2">
        {category.items.map((item) => (
          <MenuItemCard key={item.id} item={item} lang={lang} dict={dict} />
        ))}
      </div>
    </div>
  );
}
