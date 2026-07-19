import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { CONFIRM_LINK_TTL_MS } from "@/lib/config";
import type { OrderTokenPayload } from "@/lib/types";

function getSecret(): string {
  const secret = process.env.ORDER_TOKEN_SECRET;
  if (!secret) {
    throw new Error("ORDER_TOKEN_SECRET environment variable is not set");
  }
  return secret;
}

function sign(payloadB64: string): string {
  return createHmac("sha256", getSecret()).update(payloadB64).digest("base64url");
}

export function signOrderToken(
  payload: Omit<OrderTokenPayload, "v" | "issuedAt" | "expiresAt">
): { token: string; payload: OrderTokenPayload } {
  const now = Date.now();
  const fullPayload: OrderTokenPayload = {
    ...payload,
    v: 1,
    issuedAt: now,
    expiresAt: now + CONFIRM_LINK_TTL_MS,
  };
  const payloadB64 = Buffer.from(JSON.stringify(fullPayload), "utf8").toString(
    "base64url"
  );
  return { token: `${payloadB64}.${sign(payloadB64)}`, payload: fullPayload };
}

export type VerifyOrderTokenResult =
  | { ok: true; payload: OrderTokenPayload }
  | { ok: false; reason: "invalid" | "expired" };

export function verifyOrderToken(token: string): VerifyOrderTokenResult {
  const parts = token.split(".");
  if (parts.length !== 2) return { ok: false, reason: "invalid" };
  const [payloadB64, signature] = parts;

  const expected = sign(payloadB64);
  const actualBuf = Buffer.from(signature);
  const expectedBuf = Buffer.from(expected);
  if (
    actualBuf.length !== expectedBuf.length ||
    !timingSafeEqual(actualBuf, expectedBuf)
  ) {
    return { ok: false, reason: "invalid" };
  }

  let payload: OrderTokenPayload;
  try {
    payload = JSON.parse(
      Buffer.from(payloadB64, "base64url").toString("utf8")
    );
  } catch {
    return { ok: false, reason: "invalid" };
  }

  if (typeof payload.expiresAt !== "number" || Date.now() > payload.expiresAt) {
    return { ok: false, reason: "expired" };
  }

  return { ok: true, payload };
}
