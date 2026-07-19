import type { MenuCategory, ExtraOption } from "@/lib/types";

const PIZZA_EXTRA_IDS = [
  "extra-djath",
  "extra-proshute",
  "extra-peperoni",
  "extra-kerpudha",
];

export const MENU_CATEGORIES: MenuCategory[] = [
  {
    id: "pica",
    label: { sq: "Pica", en: "Pizza" },
    items: [
      {
        id: "pica-margarita",
        category: "pica",
        name: { sq: "Pizza Margarita", en: "Margherita Pizza" },
        description: {
          sq: "Salcë domatesh, mocarella e freskët, borzilok.",
          en: "Tomato sauce, fresh mozzarella, basil.",
        },
        price: 4.5,
        allowedExtraIds: PIZZA_EXTRA_IDS,
      },
      {
        id: "pica-fungi",
        category: "pica",
        name: { sq: "Pizza Fungi", en: "Mushroom Pizza" },
        description: {
          sq: "Salcë domatesh, mocarella, kërpudha të freskëta.",
          en: "Tomato sauce, mozzarella, fresh mushrooms.",
        },
        price: 4.5,
        allowedExtraIds: PIZZA_EXTRA_IDS,
      },
      {
        id: "pica-pershute",
        category: "pica",
        name: { sq: "Pizza Përshutë", en: "Ham Pizza" },
        description: {
          sq: "Salcë domatesh, mocarella, proshutë e zgjedhur.",
          en: "Tomato sauce, mozzarella, premium ham.",
        },
        price: 5,
        allowedExtraIds: PIZZA_EXTRA_IDS,
      },
      {
        id: "pica-napoli",
        category: "pica",
        name: { sq: "Pizza Napoli", en: "Napoli Pizza" },
        description: {
          sq: "Salcë domatesh, mocarella, erëza mesdhetare.",
          en: "Tomato sauce, mozzarella, Mediterranean herbs.",
        },
        price: 5,
        allowedExtraIds: PIZZA_EXTRA_IDS,
      },
      {
        id: "pica-suxhuk",
        category: "pica",
        name: { sq: "Pizza Suxhuk", en: "Sausage Pizza" },
        description: {
          sq: "Salcë domatesh, mocarella, suxhuk pikant.",
          en: "Tomato sauce, mozzarella, spiced sausage.",
        },
        price: 5,
        allowedExtraIds: PIZZA_EXTRA_IDS,
      },
      {
        id: "pica-mocarella",
        category: "pica",
        name: { sq: "Pizza Mocarella", en: "Mozzarella Pizza" },
        description: {
          sq: "Salcë domatesh, dyfish mocarella e freskët.",
          en: "Tomato sauce, double fresh mozzarella.",
        },
        price: 5,
        allowedExtraIds: PIZZA_EXTRA_IDS,
      },
      {
        id: "pica-4djathera",
        category: "pica",
        name: { sq: "Pizza 4 Djathëra", en: "4 Cheese Pizza" },
        description: {
          sq: "Katër lloje djathi, shkrirë në perfeksion.",
          en: "Four kinds of cheese, melted to perfection.",
        },
        price: 5.5,
        allowedExtraIds: PIZZA_EXTRA_IDS,
      },
    ],
  },
  {
    id: "pije",
    label: { sq: "Pije", en: "Drinks" },
    items: [
      {
        id: "pije-coca-cola",
        category: "pije",
        name: { sq: "Coca Cola 0.33L", en: "Coca Cola 0.33L" },
        price: 1.5,
      },
      {
        id: "pije-coca-cola-zero",
        category: "pije",
        name: { sq: "Coca Cola Zero 0.33L", en: "Coca Cola Zero 0.33L" },
        price: 1.5,
      },
      {
        id: "pije-fanta",
        category: "pije",
        name: { sq: "Fanta 0.33L", en: "Fanta 0.33L" },
        price: 1.5,
      },
      {
        id: "pije-sprite",
        category: "pije",
        name: { sq: "Sprite 0.33L", en: "Sprite 0.33L" },
        price: 1.5,
      },
      {
        id: "pije-uje-vogel",
        category: "pije",
        name: { sq: "Ujë (i vogël) 0.5L", en: "Water (small) 0.5L" },
        price: 0.6,
      },
      {
        id: "pije-uje-madh",
        category: "pije",
        name: { sq: "Ujë (i madh) 1.5L", en: "Water (large) 1.5L" },
        price: 0.6,
      },
    ],
  },
  {
    id: "shtesa",
    label: { sq: "Shtesa", en: "Extras" },
    items: [
      {
        id: "extra-djath",
        category: "shtesa",
        name: { sq: "Djath Ekstra", en: "Extra Cheese" },
        price: 0.7,
      },
      {
        id: "extra-proshute",
        category: "shtesa",
        name: { sq: "Proshutë", en: "Ham" },
        price: 0.7,
      },
      {
        id: "extra-peperoni",
        category: "shtesa",
        name: { sq: "Peperoni", en: "Pepperoni" },
        price: 0.7,
      },
      {
        id: "extra-kerpudha",
        category: "shtesa",
        name: { sq: "Kërpudha", en: "Mushrooms" },
        price: 0.6,
      },
    ],
  },
];

export const EXTRAS: ExtraOption[] = MENU_CATEGORIES.find(
  (c) => c.id === "shtesa"
)!.items.map((item) => ({
  id: item.id,
  name: item.name,
  price: item.price,
}));

export const PIZZA_ITEMS = MENU_CATEGORIES.find((c) => c.id === "pica")!.items;

export function findMenuItem(itemId: string) {
  for (const category of MENU_CATEGORIES) {
    const item = category.items.find((i) => i.id === itemId);
    if (item) return item;
  }
  return undefined;
}

export function findExtra(extraId: string) {
  return EXTRAS.find((e) => e.id === extraId);
}
