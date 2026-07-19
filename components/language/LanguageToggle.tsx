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
      aria-label={label}
      onClick={() => {
        document.cookie = `NEXT_LOCALE=${target}; path=/; max-age=31536000`;
      }}
      className="flex h-9 items-center rounded-full bg-slice-ink/[0.06] px-3.5 text-[13px] font-bold text-slice-ink transition-colors hover:bg-slice-ink/10"
    >
      {target.toUpperCase()}
    </Link>
  );
}
