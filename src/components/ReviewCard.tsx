import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import type { Review } from "@/lib/reviews";
import { StarRating } from "./StarRating";
import { getCategory } from "@/data/categories";
import { formatDate } from "@/lib/utils";

export function ReviewCard({ review }: { review: Review }) {
  const cat = getCategory(review.category);
  return (
    <Link
      href={`/review/${review.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-card transition hover:shadow-cardHover"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-ink-100">
        <Image
          src={review.cover}
          alt={review.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        {cat ? (
          <span className="absolute left-3 top-3 inline-flex items-center rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-ink-900 shadow-sm">
            {cat.name}
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center gap-3">
          <StarRating value={review.rating} size="sm" showValue />
          <span className="text-xs text-ink-500">·</span>
          <span className="inline-flex items-center gap-1 text-xs text-ink-500">
            <Clock className="h-3.5 w-3.5" />
            {review.readingTimeMinutes} menit baca
          </span>
        </div>
        <h3 className="text-lg font-semibold leading-snug text-ink-900 group-hover:text-brand-700">
          {review.title}
        </h3>
        <p className="line-clamp-2 text-sm text-ink-600">{review.excerpt}</p>
        <div className="mt-auto flex items-center justify-between pt-2 text-xs text-ink-500">
          <span>{review.author}</span>
          <span>{formatDate(review.date)}</span>
        </div>
      </div>
    </Link>
  );
}
