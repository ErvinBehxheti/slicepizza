import Link from "next/link";

export default function NotFound() {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#FCF4EE] px-6 text-center text-[#352215]">
        <p className="text-sm font-bold uppercase tracking-widest text-[#AB1A18]">
          404
        </p>
        <h1 className="text-2xl font-bold tracking-tight">
          Page not found / Faqja nuk u gjet
        </h1>
        <div className="mt-2 flex gap-3 text-sm font-semibold">
          <Link
            href="/sq"
            className="rounded-full bg-[#AB1A18] px-5 py-2.5 text-[#FCF4EE]"
          >
            Shqip
          </Link>
          <Link
            href="/en"
            className="rounded-full bg-[#352215]/[0.06] px-5 py-2.5"
          >
            English
          </Link>
        </div>
      </body>
    </html>
  );
}
