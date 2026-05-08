import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Review } from "@/lib/reviews";
import { StarRating } from "./StarRating";

export function Hero({ featured }: { featured: Review }) {
  return (
    <section className="relative border-b border-ink-200 bg-paper-100">
      <div className="container py-12 sm:py-16 lg:py-24">
        <div className="grid items-end gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 text-ink-500">
              <span className="kicker-accent">Edisi mingguan</span>
              <span className="h-px w-8 bg-ink-300" aria-hidden />
              <span className="kicker">Independen · Diuji editor</span>
            </div>
            <h1 className="mt-6 font-serif text-[2.5rem] font-medium leading-[1.05] tracking-tight text-ink-900 sm:text-[3.25rem] lg:text-[4.25rem]">
              Review jujur untuk produk yang{" "}
              <em className="font-serif font-medium italic text-accent">
                benar-benar
              </em>{" "}
              layak dibeli.
            </h1>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-ink-600 sm:text-lg">
              Editor kami menguji ratusan produk teknologi, kecantikan,
              kesehatan, rumah tangga, dan fashion. Hanya yang terbaik yang
              lolos rekomendasi.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
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

            <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-ink-200 pt-8 sm:gap-10">
              <div>
                <dt className="kicker">Produk diuji</dt>
                <dd className="mt-1 font-serif text-3xl font-medium text-ink-900 sm:text-[2rem]">
                  500
                  <span className="text-accent">+</span>
                </dd>
              </div>
              <div>
                <dt className="kicker">Pembaca / bln</dt>
                <dd className="mt-1 font-serif text-3xl font-medium text-ink-900 sm:text-[2rem]">
                  1,2 jt
                </dd>
              </div>
              <div>
                <dt className="kicker">Rating editor</dt>
                <dd className="mt-1 font-serif text-3xl font-medium text-ink-900 sm:text-[2rem]">
                  4,8<span className="text-accent">/5</span>
                </dd>
              </div>
            </dl>
          </div>

          <Link
            href={`/review/${featured.slug}`}
            className="group relative block lg:col-span-5"
          >
            <p className="kicker-accent">Pilihan editor</p>
            <div className="relative mt-3 aspect-[4/5] w-full overflow-hidden bg-ink-100">
              <Image
                src={featured.cover}
                alt={featured.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover transition duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink-950/70 via-ink-950/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-paper-50">
                <p className="kicker text-paper-200/80">{featured.brand}</p>
                <h2 className="mt-2 font-serif text-2xl font-medium leading-tight sm:text-[1.75rem]">
                  {featured.title}
                </h2>
                <div className="mt-4 flex items-center gap-3 text-paper-50">
                  <StarRating value={featured.rating} size="md" />
                  <span className="text-sm font-medium">
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
    </section>
  );
}
