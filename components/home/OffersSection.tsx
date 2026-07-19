import type { Locale } from "@/lib/i18n/locales";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { getActiveOffers } from "@/lib/offers";
import { OfferCard } from "@/components/home/OfferCard";
import { Reveal } from "@/components/ui/Reveal";

export function OffersSection({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  const offers = getActiveOffers();
  if (offers.length === 0) return null;

  return (
    <section id="offers" className="mx-auto max-w-6xl px-4 pt-20 sm:px-6">
      <Reveal>
        <h2 className="text-2xl font-bold tracking-tight text-slice-ink">
          {dict.offers.heading}
        </h2>
      </Reveal>
      <div className="no-scrollbar -mx-4 mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
        {offers.map((offer, i) => (
          <Reveal key={offer.id} delay={i * 80} className="snap-start">
            <OfferCard offer={offer} lang={lang} dict={dict} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
