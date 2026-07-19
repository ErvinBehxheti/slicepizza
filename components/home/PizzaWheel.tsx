"use client";

import { useMemo, useState } from "react";
import { PIZZA_ITEMS } from "@/lib/menu";
import { formatPrice } from "@/lib/cart/pricing";
import { useCart } from "@/context/CartContext";
import type { Locale } from "@/lib/i18n/locales";
import type { Dictionary } from "@/app/[lang]/dictionaries";

const SPIN_DURATION_MS = 3200;
const EXTRA_SPINS = 5;

export function PizzaWheel({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  const { addItem } = useCart();
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [resultIndex, setResultIndex] = useState<number | null>(null);

  const count = PIZZA_ITEMS.length;
  const segment = 360 / count;

  const wheelBackground = useMemo(() => {
    const stops = PIZZA_ITEMS.map((_, i) => {
      const color =
        i % 2 === 0 ? "var(--color-slice-red)" : "var(--color-slice-red-deep)";
      return `${color} ${i * segment}deg ${(i + 1) * segment}deg`;
    }).join(", ");
    return `conic-gradient(${stops})`;
  }, [segment]);

  function spin() {
    if (spinning) return;
    const randomIndex = Math.floor(Math.random() * count);
    const segmentCenter = randomIndex * segment + segment / 2;
    const targetMod = (360 - segmentCenter) % 360;

    setRotation((prev) => {
      const prevMod = ((prev % 360) + 360) % 360;
      let delta = targetMod - prevMod;
      if (delta <= 0) delta += 360;
      return prev + delta + EXTRA_SPINS * 360;
    });
    setSpinning(true);
    setResultIndex(null);
    window.setTimeout(() => {
      setSpinning(false);
      setResultIndex(randomIndex);
    }, SPIN_DURATION_MS);
  }

  const result = resultIndex !== null ? PIZZA_ITEMS[resultIndex] : null;

  return (
    <section
      id="game"
      className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6"
    >
      <h2 className="font-brand text-3xl italic text-slice-ink">
        {dict.wheel.heading}
      </h2>
      <p className="mx-auto mt-2 max-w-md text-slice-ink/70">
        {dict.wheel.subheading}
      </p>

      <div className="relative mx-auto mt-10 h-72 w-72 sm:h-80 sm:w-80">
        <div
          className="absolute left-1/2 top-0 z-10 h-0 w-0 -translate-x-1/2 -translate-y-1"
          style={{
            borderLeft: "12px solid transparent",
            borderRight: "12px solid transparent",
            borderTop: "20px solid var(--color-slice-ink)",
          }}
          aria-hidden="true"
        />

        <div
          className="relative h-full w-full overflow-hidden rounded-full border-[10px] border-slice-cream shadow-xl shadow-slice-ink/20"
          style={{
            background: wheelBackground,
            transform: `rotate(${rotation}deg)`,
            transition: `transform ${SPIN_DURATION_MS}ms cubic-bezier(0.17, 0.67, 0.16, 0.99)`,
            backgroundImage: `${wheelBackground}, radial-gradient(circle, var(--color-slice-paper) 0 6px, transparent 7px)`,
            backgroundSize: "100% 100%, 22px 22px",
          }}
        >
          {PIZZA_ITEMS.map((item, i) => {
            const midAngle = i * segment + segment / 2;
            const label = item.name[lang].replace(/^Pizza\s+/i, "");
            return (
              <span
                key={item.id}
                className="absolute left-1/2 top-1/2 w-24 origin-left text-left text-[11px] font-bold uppercase tracking-wide text-slice-paper"
                style={{
                  transform: `rotate(${midAngle}deg) translateX(14px)`,
                }}
              >
                {label}
              </span>
            );
          })}

          <div className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-slice-cream bg-slice-ink font-brand text-xs italic text-slice-paper">
            slice
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={spin}
        disabled={spinning}
        className="mt-8 rounded-full bg-slice-red px-8 py-3 text-sm font-bold text-slice-paper shadow-lg shadow-slice-red/20 transition-colors hover:bg-slice-red-deep disabled:opacity-60"
      >
        {spinning ? dict.wheel.spinning : dict.wheel.spinButton}
      </button>

      {result && !spinning && (
        <div className="mx-auto mt-8 max-w-sm rounded-3xl border border-slice-ink/10 bg-slice-paper p-6">
          <p className="text-sm font-medium text-slice-ink/60">
            {dict.wheel.resultPrefix}
          </p>
          <p className="mt-1 font-brand text-2xl italic text-slice-red">
            {result.name[lang]}
          </p>
          <p className="mt-1 text-sm text-slice-ink/60">
            {formatPrice(result.price)}
          </p>
          <div className="mt-4 flex justify-center gap-3">
            <button
              type="button"
              onClick={() => addItem(result.id, 1, [])}
              className="rounded-full bg-slice-red px-5 py-2 text-sm font-bold text-slice-paper transition-colors hover:bg-slice-red-deep"
            >
              {dict.wheel.addToOrder}
            </button>
            <button
              type="button"
              onClick={spin}
              className="rounded-full border border-slice-ink/20 px-5 py-2 text-sm font-bold text-slice-ink transition-colors hover:border-slice-red hover:text-slice-red"
            >
              {dict.wheel.spinAgain}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
