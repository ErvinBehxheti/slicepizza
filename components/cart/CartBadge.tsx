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
      className="relative flex h-9 w-9 items-center justify-center rounded-full bg-slice-ink/[0.06] text-slice-ink transition-colors hover:bg-slice-ink/10"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-[18px] w-[18px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M6 8h12l1.2 12.2a1.5 1.5 0 0 1-1.5 1.8H6.3a1.5 1.5 0 0 1-1.5-1.8Z" />
        <path d="M9 10V6a3 3 0 0 1 6 0v4" />
      </svg>
      {showCount && (
        <span className="animate-pop absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-slice-red px-1 text-[10px] font-bold text-slice-paper">
          {itemCount}
        </span>
      )}
    </Link>
  );
}
