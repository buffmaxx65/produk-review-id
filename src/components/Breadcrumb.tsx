import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export type Crumb = {
  name: string;
  href?: string;
};

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-ink-500">
      <ol className="flex items-center gap-1.5">
        <li>
          <Link href="/" className="inline-flex items-center hover:text-brand-700">
            <Home className="h-3.5 w-3.5" />
            <span className="sr-only">Beranda</span>
          </Link>
        </li>
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <ChevronRight className="h-3.5 w-3.5 text-ink-400" />
            {it.href ? (
              <Link href={it.href} className="hover:text-brand-700">
                {it.name}
              </Link>
            ) : (
              <span className="font-medium text-ink-700">{it.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
