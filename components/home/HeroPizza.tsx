"use client";

import { useEffect, useRef } from "react";

const CX = 200;
const CY = 200;
const R = 185;

function polar(angleDeg: number, radius: number): [number, number] {
  const rad = (angleDeg * Math.PI) / 180;
  return [CX + radius * Math.cos(rad), CY + radius * Math.sin(rad)];
}

// The slice is cut out between these two angles and nudged outward.
const GAP_START = -63;
const GAP_END = -27;
const [gx1, gy1] = polar(GAP_START, R);
const [gx2, gy2] = polar(GAP_END, R);
const BODY_PATH = `M${CX} ${CY} L${gx2} ${gy2} A${R} ${R} 0 1 1 ${gx1} ${gy1} Z`;
const SLICE_PATH = `M${CX} ${CY} L${gx1} ${gy1} A${R} ${R} 0 0 1 ${gx2} ${gy2} Z`;
const SLICE_OFFSET = polar(-45, 22).map((v, i) => v - [CX, CY][i]) as [
  number,
  number,
];

const PEPPERONI: Array<[number, number]> = [
  [10, 105],
  [55, 80],
  [100, 110],
  [145, 85],
  [190, 105],
  [235, 88],
  [272, 112],
  [-45, 90], // lands on the pulled slice
].map(([a, r]) => polar(a, r));

const BASIL: Array<{ pos: [number, number]; rot: number }> = [
  { pos: polar(170, 130), rot: 30 },
  { pos: polar(65, 138), rot: -15 },
  { pos: polar(290, 62), rot: 80 },
  { pos: polar(220, 145), rot: 130 },
];

const BLISTERS: Array<[number, number]> = [
  [30, 120],
  [80, 60],
  [130, 135],
  [205, 60],
  [250, 130],
  [-50, 140],
].map(([a, r]) => polar(a, r));

function Leaf({ pos, rot }: { pos: [number, number]; rot: number }) {
  return (
    <g transform={`translate(${pos[0]} ${pos[1]}) rotate(${rot})`}>
      <path
        d="M0 0 C 9 -13, 24 -13, 30 0 C 24 11, 9 11, 0 0 Z"
        fill="#4c7a3f"
      />
      <path
        d="M3 0 H 26"
        stroke="#3a6130"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </g>
  );
}

function PizzaLayers() {
  return (
    <>
      <circle cx={CX} cy={CY} r={R} fill="url(#hero-crust)" />
      <circle cx={CX} cy={CY} r={160} fill="#c9432f" />
      <circle cx={CX} cy={CY} r={150} fill="url(#hero-cheese)" />
      {BLISTERS.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 2 === 0 ? 6 : 4.5} fill="#e8b95d" opacity="0.8" />
      ))}
      {PEPPERONI.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="18" fill="#bf332e" />
          <circle cx={x} cy={y} r="14" fill="#a92320" />
          <circle cx={x - 5} cy={y - 4} r="2.2" fill="#d9695f" />
          <circle cx={x + 4} cy={y + 5} r="1.8" fill="#d9695f" />
        </g>
      ))}
      {BASIL.map((leaf, i) => (
        <Leaf key={i} {...leaf} />
      ))}
    </>
  );
}

/**
 * Hand-drawn hero pizza with one slice pulled out. The whole plate rotates
 * very slightly with scroll (disabled under prefers-reduced-motion).
 */
export function HeroPizza() {
  const plateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (plateRef.current) {
          plateRef.current.style.transform = `rotate(${window.scrollY * 0.045}deg)`;
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="relative mx-auto mt-12 w-[min(82vw,480px)] sm:mt-14">
      {/* floating garnish */}
      <svg
        viewBox="0 0 40 24"
        className="drift absolute -left-8 top-6 w-14 opacity-90 sm:-left-16 sm:w-20"
        aria-hidden="true"
      >
        <path d="M2 12 C 12 -4, 30 -4, 38 12 C 30 24, 12 24, 2 12 Z" fill="#4c7a3f" />
        <path d="M6 12 H 33" stroke="#3a6130" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <svg
        viewBox="0 0 40 40"
        className="drift absolute -right-6 top-1/3 w-12 opacity-90 sm:-right-14 sm:w-16"
        style={{ animationDelay: "-2s" }}
        aria-hidden="true"
      >
        <circle cx="20" cy="20" r="18" fill="#d0432c" />
        <circle cx="20" cy="20" r="13" fill="#e5654a" />
        <circle cx="20" cy="20" r="4" fill="#f3cf7f" />
        <g fill="#f9e3b0">
          <ellipse cx="20" cy="10.5" rx="2.2" ry="3.4" />
          <ellipse cx="28.3" cy="15.2" rx="2.2" ry="3.4" transform="rotate(60 28.3 15.2)" />
          <ellipse cx="28.3" cy="24.8" rx="2.2" ry="3.4" transform="rotate(120 28.3 24.8)" />
          <ellipse cx="20" cy="29.5" rx="2.2" ry="3.4" />
          <ellipse cx="11.7" cy="24.8" rx="2.2" ry="3.4" transform="rotate(60 11.7 24.8)" />
          <ellipse cx="11.7" cy="15.2" rx="2.2" ry="3.4" transform="rotate(120 11.7 15.2)" />
        </g>
      </svg>
      <svg
        viewBox="0 0 30 30"
        className="drift absolute -left-4 bottom-8 w-9 opacity-90 sm:-left-10 sm:w-11"
        style={{ animationDelay: "-3.5s" }}
        aria-hidden="true"
      >
        <circle cx="15" cy="15" r="13" fill="#bf332e" />
        <circle cx="15" cy="15" r="10" fill="#a92320" />
        <circle cx="11" cy="12" r="1.6" fill="#d9695f" />
        <circle cx="18" cy="18" r="1.8" fill="#d9695f" />
      </svg>

      <div
        ref={plateRef}
        className="will-change-transform"
        style={{ filter: "drop-shadow(0 30px 45px rgb(53 34 21 / 0.22))" }}
      >
        <svg viewBox="-10 -10 420 420" className="w-full" role="img" aria-label="">
          <defs>
            <radialGradient id="hero-crust" cx="50%" cy="46%" r="55%">
              <stop offset="72%" stopColor="#e8b15c" />
              <stop offset="100%" stopColor="#c9883a" />
            </radialGradient>
            <radialGradient id="hero-cheese" cx="50%" cy="45%" r="60%">
              <stop offset="0%" stopColor="#f7dc95" />
              <stop offset="100%" stopColor="#efc468" />
            </radialGradient>
            <clipPath id="hero-body">
              <path d={BODY_PATH} />
            </clipPath>
            <clipPath id="hero-slice">
              <path d={SLICE_PATH} />
            </clipPath>
          </defs>
          <g clipPath="url(#hero-body)">
            <PizzaLayers />
          </g>
          <g transform={`translate(${SLICE_OFFSET[0]} ${SLICE_OFFSET[1]})`}>
            <g clipPath="url(#hero-slice)">
              <PizzaLayers />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}
