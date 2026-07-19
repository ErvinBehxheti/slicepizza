import type { Locale } from "@/lib/i18n/locales";

export type LocalizedString = Record<Locale, string>;

export type MenuCategoryId = "pica" | "pije" | "shtesa";

export type ExtraOption = {
  id: string;
  name: LocalizedString;
  price: number;
};

export type MenuItem = {
  id: string;
  category: MenuCategoryId;
  name: LocalizedString;
  description?: LocalizedString;
  price: number;
  image?: string;
  /** Which SHTESA extra ids this item can take (pizzas only). */
  allowedExtraIds?: string[];
};

export type MenuCategory = {
  id: MenuCategoryId;
  label: LocalizedString;
  items: MenuItem[];
};

export type Offer = {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  image?: string;
  badge?: LocalizedString;
  /** ISO date strings, inclusive. */
  startDate: string;
  endDate: string;
  linkedItemId?: string;
};

export type CartLineItem = {
  lineId: string;
  itemId: string;
  quantity: number;
  extraIds: string[];
  note?: string;
};

export type ResolvedOrderItem = {
  itemId: string;
  name: string;
  unitPrice: number;
  quantity: number;
  extraIds: string[];
  extraNames: string[];
  extrasPrice: number;
  lineTotal: number;
};

export type OrderTokenPayload = {
  v: 1;
  name: string;
  email: string;
  phone: string;
  address: string;
  lat?: number;
  lng?: number;
  notes?: string;
  locale: Locale;
  items: ResolvedOrderItem[];
  total: number;
  issuedAt: number;
  expiresAt: number;
};
