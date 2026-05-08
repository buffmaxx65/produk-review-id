import Image from "next/image";
import Link from "next/link";
import type { Review } from "@/lib/reviews";
import { StarRating } from "./StarRating";
import { getCategory } from "@/data/categories";
import { formatDate } from "@/lib/utils";

export function ReviewCard({ review }: { review: Review }) {
  const cat = getCategory(review.category);
  return (
    <Link
      href={`/review/${review.slug}`}
      className="group flex flex-col bg-transparent"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink-100">
        <Image
          src={review.cover}
          alt={review.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 pt-5">
        <div className="flex items-center gap-3">
          {cat ? (
            <span className="kicker-accent">{cat.name}</span>
          ) : null}
          <span className="h-px w-6 bg-ink-300" aria-hidden />
          <span className="text-xs text-ink-500">
            {review.readingTimeMinutes} min baca
          </span>
        </div>
        <h3 className="font-serif text-xl font-medium leading-snug text-ink-900 underline-offset-4 transition-colors group-hover:underline group-hover:decoration-accent sm:text-[1.4rem]">
          {review.title}
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-ink-600">
          {review.excerpt}
        </p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-3 text-xs text-ink-500">
          <StarRating value={review.rating} size="sm" showValue />
          <span className="truncate">
            {review.author} · {formatDate(review.date)}
          </span>
        </div>
      </div>
    </Link>
  );
}
