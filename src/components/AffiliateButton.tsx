import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { affiliateLinks } from "@/data/affiliate.config";
import { cn } from "@/lib/utils";

type Props = {
  id: string;
  label?: string;
  variant?: "primary" | "cta" | "outline" | "secondary";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  showPrice?: boolean;
  source?: string;
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
      <span className="inline-flex items-center gap-2 rounded-md bg-ink-100 px-4 py-2 text-sm text-ink-500">
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
    sm: "btn-sm",
    md: "",
    lg: "btn-lg",
  }[size];

  const trackUrl = `/api/track/${encodeURIComponent(link.id)}${
    source ? `?source=${encodeURIComponent(source)}` : ""
  }`;

  const hasPrice = showPrice && Boolean(link.price);
  const stacked = fullWidth && hasPrice;

  const priceBadgeClass = cn(
    "inline-block whitespace-nowrap rounded px-1.5 py-0.5 text-xs font-semibold tracking-tight",
    variant === "outline" || variant === "secondary"
      ? "bg-ink-900/10 text-ink-900"
      : "bg-white/15 text-white",
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
          <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden />
        </>
      )}
    </Link>
  );
}
