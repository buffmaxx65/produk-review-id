import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { categories } from "@/data/categories";
import { getAllReviews } from "@/lib/reviews";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");
  const now = new Date();

  const staticPaths: MetadataRoute.Sitemap = [
    "/",
    "/kategori",
    "/tentang",
    "/kontak",
    "/disclosure",
    "/privacy",
    "/newsletter",
  ].map((p) => ({
    url: `${base}${p}`,
    lastModified: now,
    changeFrequency: p === "/" ? "daily" : "weekly",
    priority: p === "/" ? 1 : 0.6,
  }));

  const cats = categories.map((c) => ({
    url: `${base}/kategori/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const reviews = getAllReviews().map((r) => ({
    url: `${base}/review/${r.slug}`,
    lastModified: new Date(r.updated ?? r.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPaths, ...cats, ...reviews];
}
