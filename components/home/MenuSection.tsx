import type { Locale } from "@/lib/i18n/locales";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { MENU_CATEGORIES } from "@/lib/menu";
import { MenuCategoryBlock } from "@/components/menu/MenuCategoryBlock";

export function MenuSection({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  return (
    <section id="menu" className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="mb-8 max-w-xl">
        <h2 className="font-brand text-3xl italic text-slice-ink">
          {dict.menu.heading}
        </h2>
        <p className="mt-2 text-slice-ink/70">{dict.menu.subheading}</p>
      </div>
      <div className="space-y-10">
        {MENU_CATEGORIES.map((category) => (
          <MenuCategoryBlock
            key={category.id}
            category={category}
            lang={lang}
            dict={dict}
          />
        ))}
      </div>
    </section>
  );
}
