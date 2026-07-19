import Link from "next/link";
import type { Locale } from "@/lib/i18n/locales";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { ImageSlot } from "@/components/ui/ImageSlot";

export function HeroSection({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  const badges = [
    dict.hero.badgeIngredients,
    dict.hero.badgeDough,
    dict.hero.badgeOil,
  ];

  return (
    <section className="mx-auto grid max-w-6xl gap-10 px-4 pt-10 pb-16 sm:px-6 md:grid-cols-2 md:items-center md:pt-16">
      <div>
        <p className="text-sm font-semibold uppercase tracking-widest text-slice-red">
          {dict.hero.eyebrow}
        </p>
        <h1 className="mt-3 font-brand text-4xl italic leading-tight text-slice-ink sm:text-5xl">
          {dict.hero.title}
        </h1>
        <p className="mt-5 max-w-md text-base text-slice-ink/80 sm:text-lg">
          {dict.hero.subtitle}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href={`/${lang}#menu`}
            className="rounded-full bg-slice-red px-6 py-3 text-sm font-bold text-slice-paper shadow-lg shadow-slice-red/20 transition-colors hover:bg-slice-red-deep"
          >
            {dict.hero.ctaPrimary}
          </Link>
          <Link
            href={`/${lang}#menu`}
            className="rounded-full border border-slice-ink/20 px-6 py-3 text-sm font-bold text-slice-ink transition-colors hover:border-slice-red hover:text-slice-red"
          >
            {dict.hero.ctaSecondary}
          </Link>
        </div>

        <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs font-medium text-slice-ink/70 sm:text-sm">
          {badges.map((badge) => (
            <li key={badge} className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-slice-red" />
              {badge}
            </li>
          ))}
        </ul>
      </div>

      <ImageSlot
        src={undefined}
        alt=""
        shape="whole"
        priority
        sizes="(min-width: 768px) 40vw, 90vw"
        className="aspect-square w-full rounded-[2.5rem] border border-slice-ink/10 shadow-xl shadow-slice-ink/10"
      />
    </section>
  );
}
