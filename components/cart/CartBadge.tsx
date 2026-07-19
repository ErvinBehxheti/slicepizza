"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export function CartBadge({ lang, label }: { lang: string; label: string }) {
  const { itemCount, hydrated } = useCart();
  const showCount = hydrated && itemCount > 0;

  return (
    <Link
      href={`/${lang}/cart`}
      aria-label={label}
      className="relative flex items-center gap-2 rounded-full bg-slice-red px-4 py-2 text-sm font-semibold text-slice-paper transition-colors hover:bg-slice-red-deep"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
      <span className="hidden sm:inline">{label}</span>
      {showCount && (
        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-slice-cream px-1 text-xs font-bold text-slice-ink">
          {itemCount}
        </span>
      )}
    </Link>
  );
}
