import type { Offer } from "@/lib/types";

/**
 * Monthly offers. Add or remove entries here — the homepage filters to
 * whatever falls inside [startDate, endDate] automatically, so nothing
 * else needs to change when a promotion starts or ends.
 */
export const OFFERS: Offer[] = [
  {
    id: "monthly-4djathera",
    title: { sq: "E Veçanta e Muajit", en: "This Month's Feature" },
    description: {
      sq: "Pizza 4 Djathëra — katër lloje djathi të shkrira në perfeksion. Provoje këtë muaj.",
      en: "The 4 Cheese Pizza — four kinds of cheese melted to perfection. Try it this month.",
    },
    badge: { sq: "E VEÇANTË", en: "FEATURED" },
    startDate: "2026-07-01",
    endDate: "2026-07-31",
    linkedItemId: "pica-4djathera",
  },
  {
    id: "friends-night",
    title: { sq: "Nata e Miqve", en: "Friends' Night" },
    description: {
      sq: "Thirr shokët, zgjidhni picat tuaja të preferuara dhe shtoni pije për të gjithë.",
      en: "Call your friends, pick your favorite pizzas, and add drinks for everyone.",
    },
    badge: { sq: "POPULLORE", en: "POPULAR" },
    startDate: "2026-07-10",
    endDate: "2026-08-10",
    linkedItemId: "pica-margarita",
  },
];

export function getActiveOffers(now: Date = new Date()): Offer[] {
  const nowTime = now.getTime();
  return OFFERS.filter((offer) => {
    const start = new Date(offer.startDate).getTime();
    const end = new Date(`${offer.endDate}T23:59:59`).getTime();
    return nowTime >= start && nowTime <= end;
  });
}
