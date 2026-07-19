import type { MenuItem } from "@/lib/types";

export type FoodArtKind =
  | "pizza"
  | "soda"
  | "water"
  | "cheese"
  | "ham"
  | "pepperoni"
  | "mushroom";

const SODA_COLORS: Record<string, string> = {
  "pije-coca-cola": "#4a2c1a",
  "pije-coca-cola-zero": "#2b2422",
  "pije-fanta": "#f28c28",
  "pije-sprite": "#b7d96a",
};

/** Picks the right illustration for a menu item based on its id/category. */
export function artForMenuItem(item: MenuItem): {
  kind: FoodArtKind;
  accent?: string;
} {
  if (item.category === "pica") return { kind: "pizza" };
  if (item.category === "pije") {
    if (item.id.includes("uje")) return { kind: "water" };
    return { kind: "soda", accent: SODA_COLORS[item.id] ?? "#4a2c1a" };
  }
  switch (item.id) {
    case "extra-proshute":
      return { kind: "ham" };
    case "extra-peperoni":
      return { kind: "pepperoni" };
    case "extra-kerpudha":
      return { kind: "mushroom" };
    default:
      return { kind: "cheese" };
  }
}

function PizzaTop() {
  return (
    <>
      <circle cx="50" cy="50" r="46" fill="#e2a84f" />
      <circle cx="50" cy="50" r="46" fill="none" stroke="#c9883a" strokeWidth="2" opacity="0.5" />
      <circle cx="50" cy="50" r="38" fill="#d0432c" />
      <circle cx="50" cy="50" r="35" fill="#f3cf7f" />
      <circle cx="38" cy="40" r="7.5" fill="#bf332e" />
      <circle cx="38" cy="40" r="5.7" fill="#a92320" />
      <circle cx="62" cy="44" r="7.5" fill="#bf332e" />
      <circle cx="62" cy="44" r="5.7" fill="#a92320" />
      <circle cx="48" cy="64" r="7.5" fill="#bf332e" />
      <circle cx="48" cy="64" r="5.7" fill="#a92320" />
      <path
        d="M60 60 q5 -6 12 -4 q-2 8 -10 8 q-2 0 -2 -4z"
        fill="#4c7a3f"
      />
      <path
        d="M33 55 q-6 3 -6 9 q7 1 10 -5 q1 -3 -4 -4z"
        fill="#4c7a3f"
      />
      <circle cx="52" cy="32" r="2.4" fill="#e8b95d" />
      <circle cx="30" cy="47" r="2" fill="#e8b95d" />
      <circle cx="66" cy="58" r="2" fill="#e8b95d" />
    </>
  );
}

function Soda({ accent }: { accent: string }) {
  return (
    <>
      {/* straw */}
      <rect x="56" y="6" width="5.5" height="26" rx="2.7" transform="rotate(14 58 18)" fill="#ab1a18" />
      {/* glass */}
      <path d="M30 24 L36 84 a7 7 0 0 0 7 6 h14 a7 7 0 0 0 7 -6 L70 24 Z" fill="#ffffff" opacity="0.55" />
      {/* liquid */}
      <path d="M33.5 34 L38.6 82.5 a5.5 5.5 0 0 0 5.4 4.5 h12 a5.5 5.5 0 0 0 5.4 -4.5 L66.5 34 Z" fill={accent} />
      {/* bubbles + shine */}
      <circle cx="45" cy="52" r="2" fill="#ffffff" opacity="0.5" />
      <circle cx="55" cy="64" r="1.6" fill="#ffffff" opacity="0.5" />
      <circle cx="50" cy="42" r="1.4" fill="#ffffff" opacity="0.5" />
      <path d="M37 30 L41.5 80" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" opacity="0.35" />
      {/* rim */}
      <path d="M30 24 h40" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
    </>
  );
}

function Water() {
  return (
    <>
      <rect x="43" y="8" width="14" height="9" rx="2.5" fill="#5f9fd8" />
      <path d="M44 17 h12 l3 10 v4 h-18 v-4 Z" fill="#cfe6f7" />
      <rect x="33" y="30" width="34" height="60" rx="11" fill="#dbedfa" />
      <rect x="33" y="48" width="34" height="16" fill="#ffffff" opacity="0.85" />
      <rect x="38" y="51.5" width="16" height="3" rx="1.5" fill="#5f9fd8" />
      <rect x="38" y="57" width="10" height="3" rx="1.5" fill="#a9cbe8" />
      <path d="M39 34 q-2 22 0 50" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" opacity="0.7" />
    </>
  );
}

function Cheese() {
  return (
    <>
      <path d="M10 68 L88 42 a10 10 0 0 1 2 8 L90 74 a4 4 0 0 1 -4 4 L16 78 a6 6 0 0 1 -6 -10 Z" fill="#f2c14e" />
      <path d="M10 68 L88 42 a10 10 0 0 1 2 8 L12 76 a6 6 0 0 1 -2 -8 Z" fill="#f7d475" />
      <circle cx="38" cy="66" r="4.5" fill="#e0a93c" />
      <circle cx="58" cy="60" r="3.4" fill="#e0a93c" />
      <circle cx="74" cy="64" r="2.6" fill="#e0a93c" />
      <circle cx="24" cy="72" r="2.6" fill="#e0a93c" />
    </>
  );
}

function Ham() {
  return (
    <>
      <ellipse cx="50" cy="54" rx="38" ry="28" fill="#f0a9b6" />
      <ellipse cx="50" cy="54" rx="38" ry="28" fill="none" stroke="#e58ea0" strokeWidth="4" />
      <ellipse cx="46" cy="51" rx="26" ry="18" fill="#f6c3cd" />
      <ellipse cx="60" cy="60" rx="7" ry="5" fill="#fbdde3" />
      <ellipse cx="36" cy="60" rx="4.5" ry="3.2" fill="#fbdde3" />
    </>
  );
}

function Pepperoni() {
  return (
    <>
      <circle cx="36" cy="40" r="21" fill="#bf332e" />
      <circle cx="36" cy="40" r="16.5" fill="#a92320" />
      <circle cx="64" cy="58" r="24" fill="#cb423a" />
      <circle cx="64" cy="58" r="19" fill="#b12d26" />
      <circle cx="58" cy="52" r="2.2" fill="#d9695f" />
      <circle cx="70" cy="62" r="2.6" fill="#d9695f" />
      <circle cx="63" cy="66" r="1.8" fill="#d9695f" />
      <circle cx="31" cy="35" r="2" fill="#d9695f" />
      <circle cx="41" cy="44" r="2.3" fill="#d9695f" />
    </>
  );
}

function Mushroom() {
  return (
    <>
      <path d="M50 18 c-20 0 -32 13 -32 26 a6 6 0 0 0 6 6 h52 a6 6 0 0 0 6 -6 c0 -13 -12 -26 -32 -26 Z" fill="#c89a6b" />
      <circle cx="34" cy="34" r="3.4" fill="#e9cfa9" />
      <circle cx="56" cy="28" r="2.8" fill="#e9cfa9" />
      <circle cx="66" cy="38" r="3" fill="#e9cfa9" />
      <path d="M42 50 h16 l-2.5 26 a6 6 0 0 1 -6 5 a6 6 0 0 1 -6 -5 Z" fill="#f5e4cd" />
      <path d="M42 50 h16" stroke="#e2c9a4" strokeWidth="3" strokeLinecap="round" />
    </>
  );
}

/**
 * Flat food illustrations used in menu tiles, sheets and offers until real
 * photography is dropped into lib/menu.ts `image` fields.
 */
export function FoodArt({
  kind,
  accent = "#4a2c1a",
  className,
}: {
  kind: FoodArtKind;
  accent?: string;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      {kind === "pizza" && <PizzaTop />}
      {kind === "soda" && <Soda accent={accent} />}
      {kind === "water" && <Water />}
      {kind === "cheese" && <Cheese />}
      {kind === "ham" && <Ham />}
      {kind === "pepperoni" && <Pepperoni />}
      {kind === "mushroom" && <Mushroom />}
    </svg>
  );
}
