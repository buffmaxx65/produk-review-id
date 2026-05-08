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
    <aside className="space-y-8">
      <div className="border border-ink-200 bg-white p-5">
        <span className="block h-1 w-10 bg-accent" aria-hidden />
        <p className="kicker mt-3">Beli {review.productName}</p>
        <p className="mt-2 font-serif text-xl font-medium tracking-tight text-ink-900">
          {review.brand}
        </p>
        <div className="mt-2 flex items-center gap-2">
          <StarRating value={review.rating} size="sm" showValue />
          <span className="text-xs text-ink-500">verdict editor</span>
        </div>
        <div className="mt-5 flex flex-col gap-2">
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
        <div className="border-t border-ink-200 pt-6">
          <p className="kicker">Rekomendasi terkait</p>
          <ul className="mt-4 divide-y divide-ink-200">
            {related.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/review/${r.slug}`}
                  className="group flex gap-3 py-3"
                >
                  <div className="relative h-16 w-20 shrink-0 overflow-hidden bg-ink-100">
                    <Image
                      src={r.cover}
                      alt={r.title}
                      fill
                      sizes="80px"
                      className="object-cover transition group-hover:scale-105"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 font-serif text-sm font-medium leading-snug text-ink-900 underline-offset-4 group-hover:underline group-hover:decoration-accent">
                      {r.title}
                    </p>
                    <div className="mt-1.5">
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
