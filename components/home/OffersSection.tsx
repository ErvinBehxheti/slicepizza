import type { Locale } from "@/lib/i18n/locales";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { getActiveOffers } from "@/lib/offers";
import { OfferCard } from "@/components/home/OfferCard";

export function OffersSection({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  const offers = getActiveOffers();

  return (
    <section id="offers" className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="mb-8 max-w-xl">
        <h2 className="font-brand text-3xl italic text-slice-ink">
          {dict.offers.heading}
        </h2>
        <p className="mt-2 text-slice-ink/70">{dict.offers.subheading}</p>
      </div>

      {offers.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-slice-ink/20 p-8 text-center text-slice-ink/60">
          {dict.offers.empty}
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {offers.map((offer) => (
            <OfferCard key={offer.id} offer={offer} lang={lang} dict={dict} />
          ))}
        </div>
      )}
    </section>
  );
}
