import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { affiliateLinks } from "@/data/affiliate.config";
import { cn } from "@/lib/utils";

type Props = {
  id: string;
  label?: string;
  variant?: "primary" | "cta" | "outline" | "secondary";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  showPrice?: boolean;
  source?: string; // article slug / placement (e.g. "hero", "compare", "sidebar")
  className?: string;
};

export function AffiliateButton({
  id,
  label,
  variant = "cta",
  size = "md",
  fullWidth = false,
  showPrice = false,
  source,
  className,
}: Props) {
  const link = affiliateLinks[id];
  if (!link) {
    return (
      <span className="inline-flex items-center gap-2 rounded-lg bg-ink-100 px-4 py-2 text-sm text-ink-500">
        Link tidak ditemukan: {id}
      </span>
    );
  }
  const variantClass = {
    primary: "btn-primary",
    cta: "btn-cta",
    outline: "btn-outline",
    secondary: "btn-secondary",
  }[variant];
  const sizeClass = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
  }[size];

  const trackUrl = `/api/track/${encodeURIComponent(link.id)}${
    source ? `?source=${encodeURIComponent(source)}` : ""
  }`;

  const hasPrice = showPrice && Boolean(link.price);
  // Untuk tombol full-width dengan harga, gunakan layout 2-baris (label di atas,
  // harga di bawah) supaya tidak terpotong di sidebar sempit (≤320px).
  const stacked = fullWidth && hasPrice;

  const priceBadgeClass = cn(
    "inline-block whitespace-nowrap rounded-md px-1.5 py-0.5 text-xs font-semibold",
    variant === "outline" || variant === "secondary"
      ? "bg-ink-900/10 text-ink-900"
      : "bg-white/20 text-white",
  );

  return (
    <Link
      href={trackUrl}
      target="_blank"
      rel="nofollow sponsored noopener"
      className={cn(
        "btn",
        variantClass,
        sizeClass,
        fullWidth && "w-full",
        stacked && "flex-col gap-1",
        className,
      )}
      data-affiliate-id={id}
    >
      {stacked ? (
        <>
          <span className="text-center">{label ?? link.label}</span>
          <span className={priceBadgeClass}>{link.price}</span>
        </>
      ) : (
        <>
          <span>{label ?? link.label}</span>
          {hasPrice ? (
            <span className={priceBadgeClass}>{link.price}</span>
          ) : null}
          <ExternalLink className="h-4 w-4 shrink-0" aria-hidden />
        </>
      )}
    </Link>
  );
}
