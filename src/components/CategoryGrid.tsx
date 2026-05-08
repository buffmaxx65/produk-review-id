import Link from "next/link";
import { categories } from "@/data/categories";
import { ArrowUpRight } from "lucide-react";

export function CategoryGrid() {
  return (
    <div className="grid divide-y divide-ink-200 border-y border-ink-200 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-5">
      {categories.map((c, i) => {
        const Icon = c.icon;
        return (
          <Link
            key={c.slug}
            href={`/kategori/${c.slug}`}
            className="group relative flex flex-col gap-3 p-6 transition-colors hover:bg-paper-200 sm:p-7"
          >
            <div className="flex items-center justify-between">
              <span className="kicker text-ink-500">
                {String(i + 1).padStart(2, "0")}
              </span>
              <Icon className="h-5 w-5 text-ink-700 transition-colors group-hover:text-accent" />
            </div>
            <h3 className="font-serif text-xl font-medium tracking-tight text-ink-900">
              {c.name}
            </h3>
            <p className="line-clamp-3 text-xs leading-relaxed text-ink-600">
              {c.description}
            </p>
            <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-ink-900 underline-offset-4 group-hover:underline group-hover:decoration-accent">
              Lihat review
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </Link>
        );
      })}
    </div>
  );
}
