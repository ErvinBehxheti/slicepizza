import Link from "next/link";
import type { Locale } from "@/lib/i18n/locales";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { Logo } from "@/components/ui/Logo";
import { LanguageToggle } from "@/components/language/LanguageToggle";
import { CartBadge } from "@/components/cart/CartBadge";

export function Header({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const navLinks = [
    { href: `/${lang}#menu`, label: dict.nav.menu },
    { href: `/${lang}#offers`, label: dict.nav.offers },
    { href: `/${lang}#game`, label: dict.nav.game },
    { href: `/${lang}#contact`, label: dict.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-slice-ink/10 bg-slice-paper/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href={`/${lang}`} aria-label="Slice House">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-7 text-[13px] font-semibold text-slice-ink/60 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-slice-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageToggle locale={lang} label={dict.common.languageToggle} />
          <CartBadge lang={lang} label={dict.nav.cart} />
        </div>
      </div>
    </header>
  );
}
