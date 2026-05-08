import Link from "next/link";
import { Star } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { categories } from "@/data/categories";

export function Footer() {
  return (
    <footer className="border-t border-ink-200 bg-ink-50">
      <div className="container py-12 sm:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 font-bold">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-sm">
                <Star className="h-5 w-5 fill-white" />
              </span>
              <span className="text-lg text-ink-900">{siteConfig.name}</span>
            </Link>
            <p className="mt-3 max-w-md text-sm text-ink-600">
              {siteConfig.description}
            </p>
            <p className="mt-4 text-xs text-ink-500">
              Sebagai bagian dari berbagai program afiliasi, kami mendapatkan komisi
              dari pembelian yang memenuhi syarat. Hal ini tidak mempengaruhi
              objektivitas review kami.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-ink-900">Kategori</h4>
            <ul className="mt-3 space-y-2">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/kategori/${c.slug}`}
                    className="text-sm text-ink-600 hover:text-brand-700"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-ink-900">Perusahaan</h4>
            <ul className="mt-3 space-y-2">
              {siteConfig.footerLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-ink-600 hover:text-brand-700"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-ink-200 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-ink-500">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-xs text-ink-500">
            Dibangun dengan Next.js, Tailwind CSS, dan Supabase.
          </p>
        </div>
      </div>
    </footer>
  );
}
