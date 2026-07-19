/**
 * Raw hex literals mirroring app/globals.css's @theme tokens, for the two
 * contexts Tailwind's stylesheet can't reach: Resend email HTML and the
 * standalone confirm-route response.
 */
export const BRAND = {
  red: "#AB1A18",
  redDeep: "#B0080C",
  cream: "#F2DCCB",
  ink: "#352215",
  paper: "#FCF4EE",
} as const;

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
