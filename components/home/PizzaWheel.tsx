"use client";

import { useRef, useState } from "react";
import { PIZZA_ITEMS } from "@/lib/menu";
import { formatPrice } from "@/lib/cart/pricing";
import { useCart } from "@/context/CartContext";
import type { Locale } from "@/lib/i18n/locales";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { LogoMark } from "@/components/ui/Logo";
import { Reveal } from "@/components/ui/Reveal";

const SPIN_DURATION_MS = 3600;
const EXTRA_SPINS = 5;
const SIZE = 320;
const C = SIZE / 2;
const R = C - 6;

// Warm red ramp — adjacent segments always differ, including at the wrap.
const SEGMENT_COLORS = [
  "#cd3a32",
  "#b92a26",
  "#a51f1c",
  "#911512",
  "#7d0d0b",
  "#a51f1c",
  "#b92a26",
];

function polar(angleDeg: number, radius: number): [number, number] {
  const rad = (angleDeg * Math.PI) / 180;
  return [C + radius * Math.cos(rad), C + radius * Math.sin(rad)];
}

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
  const pendingIndex = useRef<number | null>(null);

  const count = PIZZA_ITEMS.length;
  const segment = 360 / count;

  function spin() {
    if (spinning) return;
    const randomIndex = Math.floor(Math.random() * count);
    // Rotate so the chosen segment's center lands under the top pointer.
    const target = (360 - (randomIndex * segment + segment / 2)) % 360;
    setRotation((prev) => {
      const prevMod = ((prev % 360) + 360) % 360;
      let delta = target - prevMod;
      if (delta <= 0) delta += 360;
      return prev + delta + EXTRA_SPINS * 360;
    });
    pendingIndex.current = randomIndex;
    setSpinning(true);
    setResultIndex(null);
  }

  function handleSpinEnd() {
    if (pendingIndex.current === null) return;
    setResultIndex(pendingIndex.current);
    pendingIndex.current = null;
    setSpinning(false);
  }

  const result = resultIndex !== null ? PIZZA_ITEMS[resultIndex] : null;

  return (
    <section id="game" className="mx-auto max-w-6xl px-4 pt-20 sm:px-6">
      <Reveal>
        <div className="hairline grid items-center gap-8 rounded-[32px] bg-slice-card p-6 shadow-card sm:p-10 md:grid-cols-[auto_1fr] md:gap-14">
          <div className="relative mx-auto w-[min(78vw,320px)]">
            {/* pointer */}
            <svg
              viewBox="0 0 24 18"
              className="absolute left-1/2 top-0 z-10 w-7 -translate-x-1/2 -translate-y-2 drop-shadow-sm"
              aria-hidden="true"
            >
              <path d="M2 2 h20 l-10 15 Z" fill="var(--color-slice-ink)" />
            </svg>

            <div
              onTransitionEnd={handleSpinEnd}
              className="w-full"
              style={{
                transform: `rotate(${rotation}deg)`,
                transition: `transform ${SPIN_DURATION_MS}ms cubic-bezier(0.12, 0.68, 0.08, 1)`,
              }}
            >
              <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="w-full" aria-hidden="true">
                <circle cx={C} cy={C} r={C} fill="var(--color-slice-paper)" />
                {PIZZA_ITEMS.map((item, i) => {
                  const start = i * segment - 90;
                  const end = start + segment;
                  const [x1, y1] = polar(start, R);
                  const [x2, y2] = polar(end, R);
                  const mid = start + segment / 2;
                  const label = item.name[lang].replace(/^Pizza\s+/i, "");
                  return (
                    <g key={item.id}>
                      <path
                        d={`M${C} ${C} L${x1} ${y1} A${R} ${R} 0 0 1 ${x2} ${y2} Z`}
                        fill={SEGMENT_COLORS[i % SEGMENT_COLORS.length]}
                        stroke="var(--color-slice-paper)"
                        strokeWidth="2.5"
                      />
                      <g transform={`translate(${C} ${C}) rotate(${mid})`}>
                        <text
                          x={54}
                          y={0}
                          dominantBaseline="middle"
                          textAnchor="start"
                          fill="var(--color-slice-paper)"
                          fontSize="12.5"
                          fontWeight="700"
                          letterSpacing="0.06em"
                        >
                          {label.toUpperCase()}
                        </text>
                      </g>
                    </g>
                  );
                })}
                <circle cx={C} cy={C} r={40} fill="var(--color-slice-paper)" />
              </svg>
            </div>

            {/* stationary hub */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <LogoMark className="h-14 w-14 drop-shadow-md" />
            </div>
          </div>

          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-slice-ink">
              {dict.wheel.heading}
            </h2>
            <p className="mt-2 text-[15px] text-slice-ink/60">
              {dict.wheel.subheading}
            </p>

            <button
              type="button"
              onClick={spin}
              disabled={spinning}
              className="mt-6 h-12 rounded-full bg-slice-red px-8 text-[15px] font-semibold text-slice-paper shadow-lg shadow-slice-red/25 transition hover:bg-slice-red-deep active:scale-[0.97] disabled:opacity-50"
            >
              {spinning ? dict.wheel.spinning : dict.wheel.spinButton}
            </button>

            {result && (
              <div className="animate-pop mt-6 rounded-2xl bg-slice-paper p-5 md:max-w-sm">
                <p className="text-[13px] font-semibold uppercase tracking-wide text-slice-ink/40">
                  {dict.wheel.resultPrefix}
                </p>
                <p className="mt-1 flex items-baseline justify-center gap-2.5 text-xl font-bold tracking-tight text-slice-ink md:justify-start">
                  {result.name[lang]}
                  <span className="text-[15px] font-semibold text-slice-ink/50">
                    {formatPrice(result.price)}
                  </span>
                </p>
                <div className="mt-4 flex justify-center gap-2.5 md:justify-start">
                  <button
                    type="button"
                    onClick={() => addItem(result.id, 1, [])}
                    className="h-10 rounded-full bg-slice-red px-5 text-sm font-semibold text-slice-paper transition hover:bg-slice-red-deep active:scale-[0.97]"
                  >
                    {dict.wheel.addToOrder}
                  </button>
                  <button
                    type="button"
                    onClick={spin}
                    className="h-10 rounded-full bg-slice-ink/[0.06] px-5 text-sm font-semibold text-slice-ink transition hover:bg-slice-ink/10 active:scale-[0.97]"
                  >
                    {dict.wheel.spinAgain}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
