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
        className,
      )}
      data-affiliate-id={id}
    >
      <span>{label ?? link.label}</span>
      {showPrice && link.price ? (
        <span className="rounded-md bg-white/15 px-1.5 py-0.5 text-[11px] font-semibold">
          {link.price}
        </span>
      ) : null}
      <ExternalLink className="h-4 w-4" />
    </Link>
  );
}
