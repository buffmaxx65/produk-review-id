import { Award, Tag } from "lucide-react";
import { StarRating } from "../StarRating";
import { AffiliateButton } from "../AffiliateButton";
import type { Review } from "@/lib/reviews";

export function VerdictBox({ review }: { review: Review }) {
  return (
    <div className="my-8 overflow-hidden rounded-2xl border-2 border-brand-200 bg-gradient-to-br from-brand-50 to-white shadow-card">
      <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-3 lg:items-center">
        <div className="lg:col-span-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="badge badge-brand">
              <Award className="h-3.5 w-3.5" /> Verdict editor
            </span>
            <span className="badge">
              <Tag className="h-3.5 w-3.5" />
              {review.brand}
            </span>
          </div>
          <h2 className="mt-3 text-xl font-bold text-ink-900 sm:text-2xl">
            Ringkasan Review {review.productName}
          </h2>
          <p className="mt-2 text-ink-700">{review.excerpt}</p>
          <div className="mt-4 flex items-center gap-3">
            <StarRating value={review.rating} size="lg" />
            <span className="text-2xl font-bold text-ink-900">
              {review.rating.toFixed(1)}
              <span className="text-base font-medium text-ink-500"> / 5</span>
            </span>
          </div>
        </div>

        <div className="rounded-xl bg-white p-5 shadow-card">
          {review.pricing.rangeText ? (
            <p className="text-sm text-ink-500">{review.pricing.rangeText}</p>
          ) : null}
          <div className="mt-2 flex flex-col gap-2">
            <AffiliateButton
              id={review.pricing.primaryAffiliateId}
              variant="cta"
              size="lg"
              fullWidth
              showPrice
              source={`verdict:${review.slug}`}
              label="Cek Harga Terbaru"
            />
            {review.pricing.secondaryAffiliateIds?.slice(0, 2).map((id) => (
              <AffiliateButton
                key={id}
                id={id}
                variant="outline"
                fullWidth
                source={`verdict:${review.slug}`}
              />
            ))}
          </div>
          <p className="mt-3 text-[11px] leading-relaxed text-ink-500">
            Harga dapat berubah sewaktu-waktu. Kami mendapatkan komisi tanpa
            biaya tambahan untukmu.
          </p>
        </div>
      </div>
    </div>
  );
}
