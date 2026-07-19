"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n/locales";

function swapLocale(pathname: string, target: Locale): string {
  const segments = pathname.split("/");
  segments[1] = target;
  return segments.join("/") || "/";
}

export function LanguageToggle({
  locale,
  label,
}: {
  locale: Locale;
  label: string;
}) {
  const pathname = usePathname();
  const target: Locale = locale === "sq" ? "en" : "sq";
  const href = swapLocale(pathname, target);

  return (
    <Link
      href={href}
      onClick={() => {
        document.cookie = `NEXT_LOCALE=${target}; path=/; max-age=31536000`;
      }}
      className="rounded-full border border-slice-ink/20 px-3 py-1.5 text-sm font-medium text-slice-ink transition-colors hover:border-slice-red hover:text-slice-red"
    >
      {label}
    </Link>
  );
}
