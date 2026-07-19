import Link from "next/link";

export default function NotFound() {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#F2DCCB] px-6 text-center text-[#352215]">
        <p className="text-sm font-semibold uppercase tracking-widest text-[#AB1A18]">
          404
        </p>
        <h1 className="text-2xl font-semibold">Page not found / Faqja nuk u gjet</h1>
        <div className="flex gap-4 text-sm font-medium">
          <Link href="/sq" className="underline hover:text-[#AB1A18]">
            Shqip
          </Link>
          <Link href="/en" className="underline hover:text-[#AB1A18]">
            English
          </Link>
        </div>
      </body>
    </html>
  );
}
