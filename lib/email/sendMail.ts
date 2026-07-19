import "server-only";
import { getResendClient } from "@/lib/email/resend";
import { EMAIL_FROM } from "@/lib/config";

/**
 * The one file to touch to swap email providers later — every caller in
 * this project sends mail through this function, never the Resend client
 * directly.
 */
export async function sendMail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}): Promise<void> {
  const resend = getResendClient();
  const { error } = await resend.emails.send({
    from: EMAIL_FROM,
    to,
    subject,
    html,
  });

  if (error) {
    throw new Error(`Failed to send email: ${error.message}`);
  }
}
