type PizzaPlaceholderArtProps = {
  shape?: "whole" | "slice";
  className?: string;
};

/**
 * Branded placeholder art standing in for real food photography. Drop a real
 * photo into the relevant `image` field in lib/menu.ts / lib/offers.ts and
 * <ImageSlot> will render it instead automatically.
 */
export function PizzaPlaceholderArt({
  shape = "whole",
  className,
}: PizzaPlaceholderArtProps) {
  if (shape === "slice") {
    return (
      <svg
        viewBox="0 0 100 100"
        className={className}
        role="img"
        aria-label=""
        aria-hidden="true"
      >
        <path
          d="M50 8 L92 88 A46 46 0 0 1 8 88 Z"
          fill="var(--color-slice-red)"
        />
        <path
          d="M50 8 L92 88 A46 46 0 0 1 8 88 Z"
          fill="none"
          stroke="var(--color-slice-cream)"
          strokeWidth="6"
        />
        <circle cx="42" cy="52" r="6" fill="var(--color-slice-red-deep)" />
        <circle cx="60" cy="62" r="6" fill="var(--color-slice-red-deep)" />
        <circle cx="50" cy="76" r="6" fill="var(--color-slice-red-deep)" />
        <circle cx="34" cy="70" r="4" fill="var(--color-slice-paper)" />
        <circle cx="66" cy="46" r="4" fill="var(--color-slice-paper)" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label=""
      aria-hidden="true"
    >
      <circle cx="50" cy="50" r="46" fill="var(--color-slice-cream)" />
      <circle cx="50" cy="50" r="40" fill="var(--color-slice-red)" />
      <circle
        cx="50"
        cy="50"
        r="40"
        fill="none"
        stroke="var(--color-slice-red-deep)"
        strokeWidth="1"
        opacity="0.4"
      />
      {[
        [50, 28],
        [68, 38],
        [70, 58],
        [55, 70],
        [34, 66],
        [28, 46],
        [44, 50],
      ].map(([cx, cy], i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r={i % 2 === 0 ? 5 : 4}
          fill="var(--color-slice-red-deep)"
        />
      ))}
      {[
        [40, 40],
        [60, 50],
        [45, 62],
      ].map(([cx, cy], i) => (
        <circle key={`c-${i}`} cx={cx} cy={cy} r={3.5} fill="var(--color-slice-paper)" />
      ))}
    </svg>
  );
}
