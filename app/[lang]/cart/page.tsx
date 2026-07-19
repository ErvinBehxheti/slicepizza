import { notFound } from "next/navigation";
import { hasLocale, getDictionary } from "@/app/[lang]/dictionaries";
import { CartView } from "@/components/cart/CartView";

export default async function CartPage({ params }: PageProps<"/[lang]/cart">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return <CartView lang={lang} dict={dict} />;
}
