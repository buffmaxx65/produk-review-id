import Link from "next/link";
import { categories } from "@/data/categories";
import { ChevronRight } from "lucide-react";

export function CategoryGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {categories.map((c) => {
        const Icon = c.icon;
        return (
          <Link
            key={c.slug}
            href={`/kategori/${c.slug}`}
            className="group relative overflow-hidden rounded-2xl border border-ink-200 bg-white p-5 transition hover:border-brand-300 hover:shadow-card"
          >
            <div
              className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${c.color} text-white shadow-sm`}
            >
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="text-base font-semibold text-ink-900">{c.name}</h3>
            <p className="mt-1 line-clamp-2 text-xs text-ink-500">
              {c.description}
            </p>
            <span className="mt-3 inline-flex items-center text-xs font-medium text-brand-700 opacity-0 transition group-hover:opacity-100">
              Lihat review
              <ChevronRight className="ml-0.5 h-3.5 w-3.5" />
            </span>
          </Link>
        );
      })}
    </div>
  );
}
