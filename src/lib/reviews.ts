import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

const REVIEWS_DIR = path.join(process.cwd(), "content", "reviews");

export type ReviewMeta = {
  slug: string;
  title: string;
  excerpt: string;
  category: string; // slug kategori
  author: string;
  authorTitle?: string;
  date: string;
  updated?: string;
  cover: string;
  productName: string;
  brand: string;
  rating: number; // 0-5
  ratingsBreakdown?: { label: string; value: number }[];
  pros: string[];
  cons: string[];
  bestFor: string[];
  notFor?: string[];
  specs: { label: string; value: string }[];
  pricing: {
    primaryAffiliateId: string; // dari affiliate.config
    secondaryAffiliateIds?: string[];
    rangeText?: string; // "Mulai dari Rp 5.999.000"
  };
  comparison?: {
    headers: string[];
    rows: string[][];
  };
  faq: { q: string; a: string }[];
  tags?: string[];
  featured?: boolean;
  trending?: boolean;
};

export type Review = ReviewMeta & {
  body: string;
  readingTimeMinutes: number;
};

function readReviewFile(filename: string): Review {
  const fullPath = path.join(REVIEWS_DIR, filename);
  const raw = fs.readFileSync(fullPath, "utf-8");
  const { data, content } = matter(raw);
  const slug = filename.replace(/\.mdx?$/, "");
  const stats = readingTime(content);
  return {
    ...(data as Omit<ReviewMeta, "slug">),
    slug,
    body: content,
    readingTimeMinutes: Math.max(1, Math.round(stats.minutes)),
  } as Review;
}

let _allReviews: Review[] | null = null;

export function getAllReviews(): Review[] {
  if (_allReviews) return _allReviews;
  if (!fs.existsSync(REVIEWS_DIR)) return [];
  const files = fs
    .readdirSync(REVIEWS_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));
  const reviews = files.map(readReviewFile);
  reviews.sort((a, b) => +new Date(b.date) - +new Date(a.date));
  _allReviews = reviews;
  return reviews;
}

export function getReviewBySlug(slug: string): Review | undefined {
  return getAllReviews().find((r) => r.slug === slug);
}

export function getReviewsByCategory(categorySlug: string): Review[] {
  return getAllReviews().filter((r) => r.category === categorySlug);
}

export function getRelatedReviews(slug: string, limit = 3): Review[] {
  const current = getReviewBySlug(slug);
  if (!current) return getAllReviews().slice(0, limit);
  const sameCat = getAllReviews().filter(
    (r) => r.slug !== slug && r.category === current.category,
  );
  if (sameCat.length >= limit) return sameCat.slice(0, limit);
  const others = getAllReviews().filter(
    (r) => r.slug !== slug && r.category !== current.category,
  );
  return [...sameCat, ...others].slice(0, limit);
}

export function getFeaturedReviews(limit = 4): Review[] {
  const featured = getAllReviews().filter((r) => r.featured);
  if (featured.length >= limit) return featured.slice(0, limit);
  return [...featured, ...getAllReviews().filter((r) => !r.featured)].slice(
    0,
    limit,
  );
}

export function getTrendingReviews(limit = 6): Review[] {
  const trending = getAllReviews().filter((r) => r.trending);
  if (trending.length >= limit) return trending.slice(0, limit);
  return [...trending, ...getAllReviews().filter((r) => !r.trending)].slice(
    0,
    limit,
  );
}
