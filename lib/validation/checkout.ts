import "server-only";
import { z } from "zod";
import { SUPPORTED_LOCALES } from "@/lib/i18n/locales";

export const checkoutSchema = z.object({
  locale: z.enum(SUPPORTED_LOCALES),
  name: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(6).max(30),
  email: z.string().trim().email().max(200),
  address: z.string().trim().min(4).max(300),
  notes: z.string().trim().max(500).optional(),
  lat: z.number().min(-90).max(90).optional(),
  lng: z.number().min(-180).max(180).optional(),
  // Honeypot — real users never fill this in. Non-empty means a bot.
  companyWebsite: z.string().max(200).optional(),
  items: z
    .array(
      z.object({
        itemId: z.string().min(1).max(100),
        quantity: z.number().int().min(1).max(50),
        extraIds: z.array(z.string().min(1).max(100)).max(10),
      })
    )
    .min(1)
    .max(50),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;
