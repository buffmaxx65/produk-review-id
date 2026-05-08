import { ShieldCheck } from "lucide-react";
import { AffiliateButton } from "../AffiliateButton";
import type { Review } from "@/lib/reviews";

export function InArticleCTA({ review }: { review: Review }) {
  return (
    <aside
      className="my-12 border-y border-ink-900 bg-paper-200 px-6 py-8 sm:px-8 sm:py-10"
      aria-label="Penawaran terbaik"
    >
      <div className="grid items-center gap-6 sm:grid-cols-5">
        <div className="sm:col-span-3">
          <p className="kicker-accent">Penawaran hari ini</p>
          <h3 className="mt-3 font-serif text-2xl font-medium leading-tight tracking-tight text-ink-900 sm:text-3xl">
            {review.productName}
          </h3>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-700 sm:text-base">
            Cek harga dari beberapa marketplace dan dapatkan deal terbaik. Kami
            update harga secara berkala.
          </p>
          <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-ink-500">
            <ShieldCheck className="h-3.5 w-3.5 text-accent" />
            Garansi resmi dari penjual official.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:col-span-2">
          <AffiliateButton
            id={review.pricing.primaryAffiliateId}
            variant="cta"
            size="lg"
            fullWidth
            showPrice
            source={`in-article:${review.slug}`}
            label="Beli Sekarang"
          />
          {review.pricing.secondaryAffiliateIds?.[0] ? (
            <AffiliateButton
              id={review.pricing.secondaryAffiliateIds[0]}
              variant="outline"
              fullWidth
              source={`in-article:${review.slug}`}
            />
          ) : null}
        </div>
      </div>
    </aside>
  );
}
