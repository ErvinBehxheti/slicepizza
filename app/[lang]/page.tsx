import { notFound } from "next/navigation";
import { hasLocale, getDictionary } from "@/app/[lang]/dictionaries";
import { HeroSection } from "@/components/home/HeroSection";
import { OffersSection } from "@/components/home/OffersSection";
import { MenuSection } from "@/components/home/MenuSection";
import { PizzaWheel } from "@/components/home/PizzaWheel";
import { ContactSection } from "@/components/home/ContactSection";

export const revalidate = 3600;

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      <HeroSection lang={lang} dict={dict} />
      <MenuSection lang={lang} dict={dict} />
      <OffersSection lang={lang} dict={dict} />
      <PizzaWheel lang={lang} dict={dict} />
      <ContactSection lang={lang} dict={dict} />
    </>
  );
}
