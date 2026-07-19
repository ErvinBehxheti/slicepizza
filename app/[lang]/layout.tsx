import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import { notFound } from "next/navigation";
import "@/app/globals.css";
import { hasLocale, getDictionary } from "@/app/[lang]/dictionaries";
import { SUPPORTED_LOCALES } from "@/lib/i18n/locales";
import { CartProvider } from "@/context/CartContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyOrderBar } from "@/components/layout/StickyOrderBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-brand-serif",
  subsets: ["latin", "latin-ext"],
  style: ["italic", "normal"],
});

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.meta.title,
    description: dict.meta.description,
  };
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <html lang={lang}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} flex min-h-screen flex-col bg-slice-cream font-sans text-slice-ink antialiased`}
      >
        <CartProvider>
          <Header lang={lang} dict={dict} />
          <main className="flex-1">{children}</main>
          <Footer dict={dict} />
          <StickyOrderBar lang={lang} label={dict.cart.checkout} />
        </CartProvider>
      </body>
    </html>
  );
}
