/**
 * Brand mark: an iOS-app-icon style tile with a pizza slice glyph, plus an
 * optional wordmark. Pure SVG so it stays crisp at any size.
 */
export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 44 44" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="logo-tile" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c22320" />
          <stop offset="1" stopColor="#961412" />
        </linearGradient>
      </defs>
      <rect width="44" height="44" rx="11.5" fill="url(#logo-tile)" />
      {/* slice: crust arc + body pointing down */}
      <path
        d="M22 37 L9.5 15.5 A 24.4 24.4 0 0 1 34.5 15.5 Z"
        fill="var(--color-slice-paper)"
      />
      <path
        d="M8.4 13.6 a 26.8 26.8 0 0 1 27.2 0 l -1.9 3.3 a 24.4 24.4 0 0 0 -23.4 0 Z"
        fill="var(--color-slice-cream)"
      />
      <circle cx="22" cy="22" r="2.6" fill="#b0080c" />
      <circle cx="16.5" cy="18.5" r="2.1" fill="#b0080c" />
      <circle cx="27.5" cy="18.5" r="2.1" fill="#b0080c" />
      <circle cx="22" cy="29.5" r="1.9" fill="#b0080c" />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <LogoMark />
      <span className="text-[17px] font-bold leading-none tracking-tight text-slice-ink">
        Slice House
      </span>
    </span>
  );
}
