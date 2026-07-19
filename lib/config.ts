export const SHOP = {
  name: "Slice House",
  phone: "+383 49 123 456",
  phoneHref: "tel:+38349123456",
  hoursFrom: "17:00",
  hoursTo: "23:00",
  address:
    process.env.NEXT_PUBLIC_SHOP_ADDRESS ??
    "37-5 Mosine Kokalari, Mitrovica e Veriut 40000",
  lat: Number(process.env.NEXT_PUBLIC_SHOP_LAT ?? 42.874094),
  lng: Number(process.env.NEXT_PUBLIC_SHOP_LNG ?? 20.858669),
} as const;

export const OWNER_EMAIL =
  process.env.OWNER_EMAIL ?? "REPLACE_ME_owner@example.com";

export const EMAIL_FROM =
  process.env.EMAIL_FROM ?? "Slice House <orders@REPLACE_ME.example>";

export const CONFIRM_LINK_TTL_MS = 48 * 60 * 60 * 1000; // 48 hours

export const CART_STORAGE_KEY = "slicehouse:cart:v1";
