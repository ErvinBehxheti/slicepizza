import type { Locale } from "@/lib/i18n/locales";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { MENU_CATEGORIES } from "@/lib/menu";
import { MenuKiosk } from "@/components/menu/MenuKiosk";
import { Reveal } from "@/components/ui/Reveal";

export function MenuSection({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  return (
    <section id="menu" className="mx-auto max-w-6xl px-4 pt-20 sm:px-6">
      <Reveal>
        <h2 className="mb-6 text-center text-3xl font-bold tracking-tight text-slice-ink">
          {dict.menu.heading}
        </h2>
      </Reveal>
      <Reveal delay={100}>
        <MenuKiosk categories={MENU_CATEGORIES} lang={lang} dict={dict} />
      </Reveal>
    </section>
  );
}
