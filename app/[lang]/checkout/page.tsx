import { notFound } from "next/navigation";
import { hasLocale, getDictionary } from "@/app/[lang]/dictionaries";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";

export default async function CheckoutPage({
  params,
}: PageProps<"/[lang]/checkout">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return <CheckoutForm lang={lang} dict={dict} />;
}
