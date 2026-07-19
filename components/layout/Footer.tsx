import type { Dictionary } from "@/app/[lang]/dictionaries";
import { SHOP } from "@/lib/config";

export function Footer({ dict }: { dict: Dictionary }) {
  return (
    <footer
      id="contact"
      className="mt-16 border-t border-slice-ink/10 bg-slice-paper pb-24 md:pb-0"
    >
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <div className="flex flex-col leading-none">
            <span className="font-brand text-2xl italic text-slice-red">
              slice
            </span>
            <span className="text-[10px] font-semibold tracking-[0.35em] text-slice-ink">
              HOUSE
            </span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-slice-ink/70">
            {dict.hero.eyebrow}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slice-ink/60">
            {dict.footer.hours}
          </h3>
          <p className="mt-2 text-slice-ink">{dict.footer.hoursValue}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slice-ink/60">
            {dict.footer.callUs}
          </h3>
          <a
            href={SHOP.phoneHref}
            className="mt-2 block font-medium text-slice-red hover:text-slice-red-deep"
          >
            {SHOP.phone}
          </a>
          <h3 className="mt-4 text-sm font-semibold uppercase tracking-wide text-slice-ink/60">
            {dict.footer.address}
          </h3>
          <p className="mt-2 text-slice-ink">{SHOP.address}</p>
        </div>
      </div>

      <div className="border-t border-slice-ink/10 px-4 py-4 text-center text-xs text-slice-ink/50 sm:px-6">
        © {new Date().getFullYear()} Slice House. {dict.footer.rights}
      </div>
    </footer>
  );
}
