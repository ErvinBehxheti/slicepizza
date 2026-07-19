import Link from "next/link";
import type { Locale } from "@/lib/i18n/locales";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { Reveal } from "@/components/ui/Reveal";
import { HeroPizza } from "@/components/home/HeroPizza";

export function HeroSection({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  return (
    <section className="relative overflow-hidden">
      {/* warm backdrop glow behind the pizza */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-64 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-slice-cream/70 blur-3xl"
      />

      <div className="relative mx-auto max-w-3xl px-4 pt-12 text-center sm:px-6 md:pt-16">
        <Reveal>
          <span className="hairline inline-flex items-center gap-2 rounded-full bg-slice-card px-3.5 py-1.5 text-xs font-semibold text-slice-ink/70">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-600 opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-600" />
            </span>
            {dict.hero.open}
          </span>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="text-balance mt-5 text-[42px] font-bold leading-[1.04] tracking-tighter text-slice-ink sm:text-6xl">
            {dict.hero.title}
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="mx-auto mt-4 max-w-md text-[17px] text-slice-ink/60 sm:text-lg">
            {dict.hero.subtitle}
          </p>
        </Reveal>

        <Reveal delay={240}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={`/${lang}#menu`}
              className="flex h-12 items-center rounded-full bg-slice-red px-7 text-[15px] font-semibold text-slice-paper shadow-lg shadow-slice-red/25 transition hover:bg-slice-red-deep active:scale-[0.97]"
            >
              {dict.hero.ctaPrimary}
            </Link>
            <Link
              href={`/${lang}#menu`}
              className="flex h-12 items-center rounded-full bg-slice-ink/[0.06] px-7 text-[15px] font-semibold text-slice-ink transition hover:bg-slice-ink/10 active:scale-[0.97]"
            >
              {dict.hero.ctaSecondary}
            </Link>
          </div>
        </Reveal>
      </div>

      <Reveal delay={200} className="relative">
        <HeroPizza />
      </Reveal>
    </section>
  );
}
