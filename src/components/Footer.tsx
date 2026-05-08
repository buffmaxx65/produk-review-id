import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { categories } from "@/data/categories";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="mt-12 border-t border-ink-200 bg-paper-200">
      <div className="container py-14 sm:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo />
            <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-600">
              {siteConfig.description}
            </p>
            <p className="mt-6 max-w-md text-xs leading-relaxed text-ink-500">
              Sebagai bagian dari berbagai program afiliasi, kami mendapatkan
              komisi dari pembelian yang memenuhi syarat. Komisi tersebut
              tidak mempengaruhi objektivitas review kami.
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="kicker">Kategori</p>
            <ul className="mt-4 space-y-2">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/kategori/${c.slug}`}
                    className="text-sm text-ink-700 underline-offset-4 hover:text-ink-900 hover:underline"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="kicker">Perusahaan</p>
            <ul className="mt-4 space-y-2">
              {siteConfig.footerLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-ink-700 underline-offset-4 hover:text-ink-900 hover:underline"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-ink-200 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-ink-500">
            © {new Date().getFullYear()} {siteConfig.name}. Hak cipta dilindungi.
          </p>
          <p className="text-xs text-ink-500">
            Editorial sejak 2024 · Jakarta, Indonesia
          </p>
        </div>
      </div>
    </footer>
  );
}
