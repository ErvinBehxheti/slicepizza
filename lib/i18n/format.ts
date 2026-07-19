import type { Locale } from "@/lib/i18n/locales";

/** Replaces `{key}` tokens in a template string with values from `vars`. */
export function formatTemplate(
  template: string,
  vars: Record<string, string | number>
): string {
  return template.replace(/\{(\w+)\}/g, (match, key) =>
    key in vars ? String(vars[key]) : match
  );
}

const MONTH_NAMES: Record<Locale, string[]> = {
  sq: [
    "janar", "shkurt", "mars", "prill", "maj", "qershor",
    "korrik", "gusht", "shtator", "tetor", "nëntor", "dhjetor",
  ],
  en: [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ],
};

/**
 * Formats an ISO date (e.g. "2026-07-31") as "31 korrik" / "31 July" using a
 * static lookup table rather than Intl.DateTimeFormat — Node's bundled ICU
 * data doesn't reliably include Albanian locale names, which caused server
 * and client to render different month names and break hydration.
 */
export function formatDayMonth(isoDate: string, locale: Locale): string {
  const date = new Date(`${isoDate}T00:00:00`);
  return `${date.getDate()} ${MONTH_NAMES[locale][date.getMonth()]}`;
}
