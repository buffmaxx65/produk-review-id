import { StarRating } from "../StarRating";
import { AffiliateButton } from "../AffiliateButton";
import type { Review } from "@/lib/reviews";

export function VerdictBox({ review }: { review: Review }) {
  return (
    <aside className="my-10 border-y-2 border-ink-900 bg-paper-200">
      <div className="grid gap-8 px-6 py-8 sm:px-8 sm:py-10 lg:grid-cols-3 lg:items-start lg:gap-10">
        <div className="lg:col-span-2">
          <p className="kicker-accent">Verdict editor</p>
          <h2 className="mt-3 font-serif text-2xl font-medium leading-tight tracking-tight text-ink-900 sm:text-3xl">
            Ringkasan {review.productName}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-700 sm:text-lg">
            {review.excerpt}
          </p>
          <div className="mt-6 flex items-center gap-4">
            <StarRating value={review.rating} size="lg" />
            <span className="font-serif text-3xl font-medium text-ink-900">
              {review.rating.toFixed(1)}
              <span className="text-base font-medium text-ink-500"> / 5</span>
            </span>
          </div>
        </div>

        <div className="border-t border-ink-200 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <p className="kicker">Beli {review.brand}</p>
          {review.pricing.rangeText ? (
            <p className="mt-2 font-serif text-lg text-ink-900">
              {review.pricing.rangeText}
            </p>
          ) : null}
          <div className="mt-4 flex flex-col gap-2">
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
          <p className="mt-3 text-xs leading-relaxed text-ink-500">
            Harga dapat berubah sewaktu-waktu. Kami mendapatkan komisi tanpa
            biaya tambahan untukmu.
          </p>
        </div>
      </div>
    </aside>
  );
}
