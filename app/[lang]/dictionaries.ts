import "server-only";
import type { Locale } from "@/lib/i18n/locales";
import { SUPPORTED_LOCALES } from "@/lib/i18n/locales";

const dictionaries = {
  sq: () => import("@/dictionaries/sq.json").then((m) => m.default),
  en: () => import("@/dictionaries/en.json").then((m) => m.default),
} as const;

export const hasLocale = (locale: string): locale is Locale =>
  (SUPPORTED_LOCALES as readonly string[]).includes(locale);

export const getDictionary = async (locale: Locale) => dictionaries[locale]();

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;
