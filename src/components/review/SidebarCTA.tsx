import Link from "next/link";
import Image from "next/image";
import { Newsletter } from "../Newsletter";
import { AffiliateButton } from "../AffiliateButton";
import { StarRating } from "../StarRating";
import type { Review } from "@/lib/reviews";

type Props = {
  review: Review;
  related: Review[];
};

export function SidebarCTA({ review, related }: Props) {
  return (
    <aside className="space-y-6">
      <div className="rounded-2xl border border-ink-200 bg-white p-5 shadow-card">
        <p className="text-xs font-bold uppercase tracking-wider text-brand-700">
          Beli {review.productName}
        </p>
        <p className="mt-1 text-2xl font-bold text-ink-900">
          {review.brand}
        </p>
        <div className="mt-2 flex items-center gap-2">
          <StarRating value={review.rating} size="sm" showValue />
          <span className="text-xs text-ink-500">verdict editor</span>
        </div>
        <div className="mt-4 flex flex-col gap-2">
          <AffiliateButton
            id={review.pricing.primaryAffiliateId}
            variant="cta"
            size="lg"
            fullWidth
            showPrice
            source={`sidebar:${review.slug}`}
            label="Cek Harga Terbaru"
          />
          {review.pricing.secondaryAffiliateIds?.map((id) => (
            <AffiliateButton
              key={id}
              id={id}
              variant="outline"
              fullWidth
              source={`sidebar:${review.slug}`}
            />
          ))}
        </div>
      </div>

      {related.length > 0 ? (
        <div className="rounded-2xl border border-ink-200 bg-white p-5">
          <p className="text-xs font-bold uppercase tracking-wider text-ink-500">
            Rekomendasi terkait
          </p>
          <ul className="mt-4 space-y-4">
            {related.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/review/${r.slug}`}
                  className="group flex gap-3"
                >
                  <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-lg bg-ink-100">
                    <Image
                      src={r.cover}
                      alt={r.title}
                      fill
                      sizes="80px"
                      className="object-cover transition group-hover:scale-105"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="line-clamp-2 text-sm font-semibold text-ink-900 group-hover:text-brand-700">
                      {r.title}
                    </p>
                    <div className="mt-1">
                      <StarRating value={r.rating} size="sm" />
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <Newsletter variant="compact" />
    </aside>
  );
}
