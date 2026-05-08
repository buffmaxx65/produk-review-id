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
      className="mb-8 flex flex-col gap-4 border-t border-ink-200 pt-6 sm:mb-10 sm:flex-row sm:items-end sm:justify-between"
    >
      <div className="max-w-2xl">
        {eyebrow ? <p className="kicker-accent">{eyebrow}</p> : null}
        <h2 className="mt-2 font-serif text-3xl font-medium leading-tight tracking-tight text-ink-900 sm:text-[2.25rem] lg:text-[2.75rem]">
          {title}
        </h2>
        {description ? (
          <p className="mt-3 max-w-prose text-ink-600">{description}</p>
        ) : null}
      </div>
      {ctaHref ? (
        <Link
          href={ctaHref}
          className="group inline-flex shrink-0 items-center gap-1 self-start text-sm font-medium text-ink-900 underline-offset-4 hover:underline hover:decoration-accent sm:self-end"
        >
          {ctaLabel}{" "}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      ) : null}
    </div>
  );
}
