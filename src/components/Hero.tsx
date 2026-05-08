import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Review } from "@/lib/reviews";
import { StarRating } from "./StarRating";

export function Hero({ featured }: { featured: Review }) {
  return (
    <section className="relative border-b border-ink-200 bg-paper-100">
      <div className="container py-12 sm:py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-ink-500">
              <span className="kicker-accent">Edisi mingguan</span>
              <span className="hidden h-px w-8 bg-ink-300 sm:block" aria-hidden />
              <span className="kicker">Independen · Diuji editor</span>
            </div>
            <h1 className="mt-5 font-serif text-[2.25rem] font-medium leading-[1.05] tracking-tight text-ink-900 sm:mt-6 sm:text-[3rem] lg:text-[3.75rem] xl:text-[4.25rem]">
              Review jujur untuk produk yang{" "}
              <em className="font-serif font-medium italic text-accent">
                benar-benar
              </em>{" "}
              layak dibeli.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-600 sm:mt-7 sm:text-lg">
              Editor kami menguji ratusan produk teknologi, kecantikan,
              kesehatan, rumah tangga, dan fashion. Hanya yang terbaik yang
              lolos rekomendasi.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/kategori/teknologi"
                className="btn btn-primary btn-lg"
              >
                Jelajahi review <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="#editor-pick" className="btn btn-outline btn-lg">
                Pilihan editor
              </Link>
            </div>

            <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-ink-200 pt-7 sm:gap-10 sm:pt-8">
              <div>
                <dt className="kicker">Produk diuji</dt>
                <dd className="mt-1.5 font-serif text-[1.5rem] font-medium leading-none text-ink-900 sm:text-3xl lg:text-[2rem]">
                  500
                  <span className="text-accent">+</span>
                </dd>
              </div>
              <div>
                <dt className="kicker">Pembaca / bln</dt>
                <dd className="mt-1.5 font-serif text-[1.5rem] font-medium leading-none text-ink-900 sm:text-3xl lg:text-[2rem]">
                  1,2 jt
                </dd>
              </div>
              <div>
                <dt className="kicker">Rating editor</dt>
                <dd className="mt-1.5 font-serif text-[1.5rem] font-medium leading-none text-ink-900 sm:text-3xl lg:text-[2rem]">
                  4,8<span className="text-accent">/5</span>
                </dd>
              </div>
            </dl>
          </div>

          <div className="lg:col-span-5">
            <Link
              href={`/review/${featured.slug}`}
              className="group relative block"
            >
              <p className="kicker-accent">Pilihan editor</p>
              <div className="relative mt-3 aspect-[5/6] w-full overflow-hidden bg-ink-100 sm:aspect-[4/5]">
                <Image
                  src={featured.cover}
                  alt={featured.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-ink-950/90 via-ink-950/55 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-paper-50 sm:p-6">
                  <p className="text-[10px] font-semibold uppercase tracking-kicker text-paper-200/80">
                    {featured.brand}
                  </p>
                  <h2 className="mt-2 line-clamp-3 font-serif text-[1.35rem] font-medium leading-snug sm:text-2xl">
                    {featured.title}
                  </h2>
                  <div className="mt-3 flex items-center gap-2.5 text-paper-50">
                    <StarRating value={featured.rating} size="sm" />
                    <span className="text-xs font-medium tabular-nums">
                      {featured.rating.toFixed(1)} / 5
                    </span>
                  </div>
                </div>
              </div>
              <p className="mt-3 inline-flex items-center gap-1 text-sm text-ink-700 underline-offset-4 group-hover:text-ink-900 group-hover:underline group-hover:decoration-accent">
                Baca review lengkap{" "}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
