import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  ctaHref?: string;
  ctaLabel?: string;
  id?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  ctaHref,
  ctaLabel = "Lihat semua",
  id,
}: Props) {
  return (
    <div
      id={id}
      className="mb-8 flex flex-col gap-3 sm:mb-10 sm:flex-row sm:items-end sm:justify-between"
    >
      <div className="max-w-2xl">
        {eyebrow ? (
          <p className="text-xs font-bold uppercase tracking-wider text-brand-700">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="mt-1 font-serif text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl lg:text-4xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-2 text-ink-600">{description}</p>
        ) : null}
      </div>
      {ctaHref ? (
        <Link
          href={ctaHref}
          className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:text-brand-800"
        >
          {ctaLabel} <ArrowRight className="h-4 w-4" />
        </Link>
      ) : null}
    </div>
  );
}
