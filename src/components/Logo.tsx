import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  size?: "sm" | "md";
  href?: string;
  className?: string;
};

export function Logo({ size = "md", href = "/", className }: Props) {
  const wordSize = size === "sm" ? "text-lg" : "text-xl sm:text-[1.375rem]";
  const subSize = size === "sm" ? "text-[9px]" : "text-[10px]";

  const inner = (
    <span className={cn("inline-flex items-baseline gap-1.5", className)}>
      <span
        className={cn(
          "font-serif font-medium italic leading-none tracking-tight text-ink-900",
          wordSize,
        )}
      >
        Produk
        <span className="text-accent">.</span>
        Review
      </span>
      <span
        className={cn(
          "hidden font-sans font-semibold uppercase tracking-kicker text-ink-500 sm:inline",
          subSize,
        )}
      >
        ID
      </span>
    </span>
  );

  if (!href) return inner;
  return (
    <Link href={href} aria-label="Produk Review ID — Beranda">
      {inner}
    </Link>
  );
}
