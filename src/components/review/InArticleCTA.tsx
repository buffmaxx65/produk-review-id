import { ShieldCheck, TrendingDown } from "lucide-react";
import { AffiliateButton } from "../AffiliateButton";
import type { Review } from "@/lib/reviews";

export function InArticleCTA({ review }: { review: Review }) {
  return (
    <aside
      className="my-10 grid gap-4 rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 p-6 sm:grid-cols-3 sm:items-center sm:p-8"
      aria-label="Penawaran terbaik"
    >
      <div className="sm:col-span-2">
        <p className="inline-flex items-center gap-1 rounded-full bg-orange-200/70 px-2.5 py-1 text-xs font-bold text-orange-900">
          <TrendingDown className="h-3.5 w-3.5" /> Penawaran terbaik hari ini
        </p>
        <h3 className="mt-2 text-xl font-bold text-ink-900 sm:text-2xl">
          {review.productName}
        </h3>
        <p className="mt-1 text-sm text-ink-700">
          Cek harga dari beberapa marketplace dan dapatkan deal terbaik. Kami
          update harga secara berkala.
        </p>
        <p className="mt-2 inline-flex items-center gap-1 text-xs text-ink-600">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" /> Garansi resmi
          dari penjual official.
        </p>
      </div>
      <div className="flex flex-col gap-2 sm:items-end">
        <AffiliateButton
          id={review.pricing.primaryAffiliateId}
          variant="cta"
          size="lg"
          showPrice
          source={`in-article:${review.slug}`}
          label="Beli Sekarang"
        />
        {review.pricing.secondaryAffiliateIds?.[0] ? (
          <AffiliateButton
            id={review.pricing.secondaryAffiliateIds[0]}
            variant="outline"
            source={`in-article:${review.slug}`}
          />
        ) : null}
      </div>
    </aside>
  );
}
