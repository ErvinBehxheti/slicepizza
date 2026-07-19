import type { Locale } from "@/lib/i18n/locales";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { SHOP } from "@/lib/config";
import { Reveal } from "@/components/ui/Reveal";

function InfoRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3.5 px-4 py-3.5">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-slice-red/10 text-slice-red">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-[11px] font-semibold uppercase tracking-wide text-slice-ink/40">
          {label}
        </span>
        <span className="block text-[15px] font-medium text-slice-ink">
          {children}
        </span>
      </span>
    </div>
  );
}

export function ContactSection({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  const mapSrc = `https://www.google.com/maps?q=${SHOP.lat},${SHOP.lng}&z=16&hl=${lang}&output=embed`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${SHOP.lat},${SHOP.lng}&travelmode=driving`;

  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 pt-20 sm:px-6">
      <Reveal>
        <h2 className="text-3xl font-bold tracking-tight text-slice-ink">
          {dict.contact.heading}
        </h2>
      </Reveal>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        <Reveal>
          <iframe
            src={mapSrc}
            title={dict.contact.mapTitle}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="hairline h-[300px] w-full rounded-[28px] bg-slice-card shadow-card lg:h-full lg:min-h-[360px]"
          />
        </Reveal>

        <Reveal delay={120}>
          <div className="flex h-full flex-col gap-4">
            <div className="hairline divide-y divide-slice-ink/[0.06] rounded-[28px] bg-slice-card py-1 shadow-card">
              <InfoRow
                label={dict.contact.addressLabel}
                icon={
                  <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                }
              >
                {SHOP.address}
              </InfoRow>
              <InfoRow
                label={dict.contact.phoneLabel}
                icon={
                  <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.4 2.1L8.1 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.6 2Z" />
                  </svg>
                }
              >
                <a href={SHOP.phoneHref} className="text-slice-red transition-colors hover:text-slice-red-deep">
                  {SHOP.phone}
                </a>
              </InfoRow>
              <InfoRow
                label={dict.contact.hoursLabel}
                icon={
                  <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                  </svg>
                }
              >
                {dict.contact.hoursValue}
              </InfoRow>
            </div>

            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-slice-red text-[15px] font-semibold text-slice-paper shadow-lg shadow-slice-red/25 transition hover:bg-slice-red-deep active:scale-[0.98]"
            >
              <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 2 2 12l10 10 10-10L12 2Z" />
                <path d="M9 13v-2a1 1 0 0 1 1-1h4M12 8l2 2-2 2" />
              </svg>
              {dict.contact.directions}
            </a>

            <a
              href={SHOP.phoneHref}
              className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-slice-ink/[0.06] text-[15px] font-semibold text-slice-ink transition hover:bg-slice-ink/10 active:scale-[0.98] lg:hidden"
            >
              {dict.contact.phoneLabel}: {SHOP.phone}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
