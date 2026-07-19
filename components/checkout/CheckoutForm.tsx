"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { computeCartTotal, formatPrice, resolveOrderItems } from "@/lib/cart/pricing";
import { SHOP } from "@/lib/config";
import type { Locale } from "@/lib/i18n/locales";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { GeolocationButton } from "@/components/checkout/GeolocationButton";
import { DirectionsLink } from "@/components/checkout/DirectionsLink";

type FieldErrors = Partial<
  Record<"fullName" | "phone" | "email" | "address", string>
>;

export function CheckoutForm({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  const { items, hydrated, clearCart } = useCart();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState(""); // honeypot — real users never see this field
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [success, setSuccess] = useState<{ name: string } | null>(null);

  if (!hydrated) return null;

  if (success) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center sm:px-6">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slice-red text-slice-paper">
          <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="mt-6 font-brand text-3xl italic text-slice-ink">
          {dict.checkout.success.title}
        </h1>
        <p className="mt-3 text-slice-ink/70">{dict.checkout.success.message}</p>
        <p className="mt-6 text-sm text-slice-ink/60">
          {dict.checkout.success.callUs}{" "}
          <a href={SHOP.phoneHref} className="font-semibold text-slice-red">
            {SHOP.phone}
          </a>
        </p>
        <Link
          href={`/${lang}`}
          className="mt-8 inline-block rounded-full border border-slice-ink/20 px-6 py-3 text-sm font-bold text-slice-ink transition-colors hover:border-slice-red hover:text-slice-red"
        >
          {dict.common.orderNow}
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center sm:px-6">
        <h1 className="font-brand text-3xl italic text-slice-ink">
          {dict.cart.heading}
        </h1>
        <p className="mt-3 text-slice-ink/60">{dict.cart.empty}</p>
        <Link
          href={`/${lang}#menu`}
          className="mt-6 inline-block rounded-full bg-slice-red px-6 py-3 text-sm font-bold text-slice-paper transition-colors hover:bg-slice-red-deep"
        >
          {dict.cart.browseMenu}
        </Link>
      </div>
    );
  }

  const resolved = resolveOrderItems(items, lang);
  const total = computeCartTotal(resolved);

  function validate(): boolean {
    const next: FieldErrors = {};
    if (fullName.trim().length < 2) next.fullName = dict.checkout.errors.fullName;
    if (phone.trim().length < 6) next.phone = dict.checkout.errors.phone;
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) next.email = dict.checkout.errors.email;
    if (address.trim().length < 4) next.address = dict.checkout.errors.address;
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitError(false);
    if (!validate()) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          locale: lang,
          name: fullName.trim(),
          phone: phone.trim(),
          email: email.trim(),
          address: address.trim(),
          notes: notes.trim() || undefined,
          lat: coords?.lat,
          lng: coords?.lng,
          companyWebsite,
          items: items.map((line) => ({
            itemId: line.itemId,
            quantity: line.quantity,
            extraIds: line.extraIds,
          })),
        }),
      });

      if (!res.ok) throw new Error("order failed");

      clearCart();
      setSuccess({ name: fullName.trim() });
    } catch {
      setSubmitError(true);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <h1 className="font-brand text-3xl italic text-slice-ink">
        {dict.checkout.heading}
      </h1>
      <p className="mt-2 text-slice-ink/70">{dict.checkout.subheading}</p>

      <div className="mt-8 grid gap-10 md:grid-cols-[1fr_320px]">
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <input
            type="text"
            name="companyWebsite"
            value={companyWebsite}
            onChange={(e) => setCompanyWebsite(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute -left-[9999px] h-0 w-0 opacity-0"
          />

          <div>
            <label className="block text-sm font-semibold text-slice-ink">
              {dict.checkout.fields.fullName}
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder={dict.checkout.placeholders.fullName}
              className="mt-1.5 w-full rounded-xl border border-slice-ink/15 bg-slice-paper px-4 py-2.5 text-slice-ink outline-none focus:border-slice-red"
            />
            {errors.fullName && (
              <p className="mt-1 text-xs text-slice-red">{errors.fullName}</p>
            )}
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-slice-ink">
                {dict.checkout.fields.phone}
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={dict.checkout.placeholders.phone}
                className="mt-1.5 w-full rounded-xl border border-slice-ink/15 bg-slice-paper px-4 py-2.5 text-slice-ink outline-none focus:border-slice-red"
              />
              {errors.phone && (
                <p className="mt-1 text-xs text-slice-red">{errors.phone}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold text-slice-ink">
                {dict.checkout.fields.email}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={dict.checkout.placeholders.email}
                className="mt-1.5 w-full rounded-xl border border-slice-ink/15 bg-slice-paper px-4 py-2.5 text-slice-ink outline-none focus:border-slice-red"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-slice-red">{errors.email}</p>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between gap-2">
              <label className="block text-sm font-semibold text-slice-ink">
                {dict.checkout.fields.address}
              </label>
              <GeolocationButton
                dict={dict}
                onLocated={(lat, lng) => setCoords({ lat, lng })}
              />
            </div>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder={dict.checkout.placeholders.address}
              className="mt-1.5 w-full rounded-xl border border-slice-ink/15 bg-slice-paper px-4 py-2.5 text-slice-ink outline-none focus:border-slice-red"
            />
            {errors.address && (
              <p className="mt-1 text-xs text-slice-red">{errors.address}</p>
            )}
            <div className="mt-2">
              <DirectionsLink
                dict={dict}
                destination={coords ?? (address.trim() || null)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slice-ink">
              {dict.checkout.fields.notes}
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={dict.checkout.placeholders.notes}
              rows={3}
              className="mt-1.5 w-full rounded-xl border border-slice-ink/15 bg-slice-paper px-4 py-2.5 text-slice-ink outline-none focus:border-slice-red"
            />
          </div>

          {submitError && (
            <p className="rounded-xl bg-slice-red/10 px-4 py-3 text-sm text-slice-red">
              {dict.checkout.submitError}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-full bg-slice-red px-6 py-3.5 text-sm font-bold text-slice-paper shadow-lg shadow-slice-red/20 transition-colors hover:bg-slice-red-deep disabled:opacity-60"
          >
            {submitting ? dict.checkout.submitting : dict.checkout.submit}
          </button>
        </form>

        <aside className="h-fit rounded-2xl border border-slice-ink/10 bg-slice-paper p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slice-ink/60">
            {dict.checkout.orderSummary}
          </h2>
          <ul className="mt-4 space-y-3">
            {resolved.map((info, i) => (
              <li key={i} className="flex justify-between gap-3 text-sm">
                <span className="text-slice-ink">
                  {info.quantity}× {info.name}
                  {info.extraNames.length > 0 && (
                    <span className="block text-xs text-slice-ink/50">
                      {info.extraNames.join(", ")}
                    </span>
                  )}
                </span>
                <span className="whitespace-nowrap font-semibold text-slice-ink">
                  {formatPrice(info.lineTotal)}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between border-t border-slice-ink/10 pt-4 font-bold text-slice-red">
            <span>{dict.cart.subtotal}</span>
            <span>{formatPrice(total)}</span>
          </div>
        </aside>
      </div>
    </div>
  );
}
