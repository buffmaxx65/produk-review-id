import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Star, TrendingUp } from "lucide-react";
import type { Review } from "@/lib/reviews";
import { StarRating } from "./StarRating";

export function Hero({ featured }: { featured: Review }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-white to-white">
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-brand-200/40 blur-3xl"
        aria-hidden
      />
      <div className="container relative grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-2 lg:py-24">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="badge badge-brand">
              <ShieldCheck className="h-3.5 w-3.5" /> 100% Independen
            </span>
            <span className="badge">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />{" "}
              Diuji editor
            </span>
            <span className="badge">
              <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />{" "}
              Update setiap minggu
            </span>
          </div>
          <h1 className="mt-4 font-serif text-4xl font-bold leading-tight tracking-tight text-ink-900 sm:text-5xl lg:text-6xl">
            Review jujur untuk produk yang benar-benar layak dibeli
          </h1>
          <p className="mt-5 max-w-xl text-base text-ink-600 sm:text-lg">
            Editor kami menguji ratusan produk teknologi, kecantikan, kesehatan,
            rumah tangga, dan fashion. Hanya yang terbaik yang lolos
            rekomendasi.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/kategori/teknologi" className="btn btn-primary btn-lg">
              Jelajahi Review <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="#editor-pick" className="btn btn-outline">
              Pilihan Editor
            </Link>
          </div>
          <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-ink-200 pt-6 text-sm">
            <div>
              <dt className="text-ink-500">Produk diuji</dt>
              <dd className="text-2xl font-bold text-ink-900">500+</dd>
            </div>
            <div>
              <dt className="text-ink-500">Pembaca/bulan</dt>
              <dd className="text-2xl font-bold text-ink-900">1.2 jt</dd>
            </div>
            <div>
              <dt className="text-ink-500">Rating editor</dt>
              <dd className="flex items-center gap-1 text-2xl font-bold text-ink-900">
                4.8
                <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
              </dd>
            </div>
          </dl>
        </div>

        <Link
          href={`/review/${featured.slug}`}
          className="group relative block overflow-hidden rounded-3xl border border-ink-200 bg-white shadow-card transition hover:shadow-cardHover"
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink-100">
            <Image
              src={featured.cover}
              alt={featured.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
            <div className="absolute left-4 top-4 flex items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-amber-400 px-3 py-1 text-xs font-bold text-ink-900">
                EDITOR'S CHOICE
              </span>
            </div>
            <div className="absolute inset-x-0 bottom-0 p-6 text-white">
              <p className="text-xs uppercase tracking-wider text-white/80">
                {featured.brand}
              </p>
              <h2 className="mt-1 text-2xl font-bold leading-tight sm:text-3xl">
                {featured.title}
              </h2>
              <div className="mt-3 flex items-center gap-3">
                <StarRating value={featured.rating} size="md" />
                <span className="text-sm font-semibold">
                  {featured.rating.toFixed(1)} / 5
                </span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
