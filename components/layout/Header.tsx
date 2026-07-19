import Link from "next/link";
import type { Locale } from "@/lib/i18n/locales";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { LanguageToggle } from "@/components/language/LanguageToggle";
import { CartBadge } from "@/components/cart/CartBadge";

export function Header({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const navLinks = [
    { href: `/${lang}#offers`, label: dict.nav.offers },
    { href: `/${lang}#menu`, label: dict.nav.menu },
    { href: `/${lang}#game`, label: dict.nav.game },
    { href: `/${lang}#contact`, label: dict.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-slice-ink/10 bg-slice-cream/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href={`/${lang}`} className="flex flex-col leading-none">
          <span className="font-brand text-2xl italic text-slice-red">
            slice
          </span>
          <span className="text-[10px] font-semibold tracking-[0.35em] text-slice-ink">
            HOUSE
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-slice-ink md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-slice-red"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageToggle locale={lang} label={dict.common.languageToggle} />
          <CartBadge lang={lang} label={dict.nav.cart} />
        </div>
      </div>
    </header>
  );
}
