import "server-only";
import sq from "@/dictionaries/sq.json";
import en from "@/dictionaries/en.json";
import type { Locale } from "@/lib/i18n/locales";

export const EMAIL_DICTS: Record<Locale, typeof sq> = { sq, en };
