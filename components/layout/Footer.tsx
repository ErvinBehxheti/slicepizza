import Link from "next/link";
import type { Locale } from "@/lib/i18n/locales";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { Logo } from "@/components/ui/Logo";

export function Footer({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const navLinks = [
    { href: `/${lang}#menu`, label: dict.nav.menu },
    { href: `/${lang}#offers`, label: dict.nav.offers },
    { href: `/${lang}#contact`, label: dict.nav.contact },
  ];

  return (
    <footer className="mt-20 border-t border-slice-ink/10 pb-28 md:pb-0">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-10 sm:flex-row sm:justify-between sm:px-6">
        <Logo />
        <nav className="flex items-center gap-6 text-[13px] font-semibold text-slice-ink/60">
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
        <p className="text-xs text-slice-ink/40">
          © {new Date().getFullYear()} Slice House. {dict.footer.rights}
        </p>
      </div>
    </footer>
  );
}
