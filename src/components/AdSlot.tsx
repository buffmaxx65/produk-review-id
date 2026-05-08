"use client";

import { useEffect } from "react";
import { cn } from "@/lib/utils";

type Props = {
  slot: string;
  format?: "auto" | "fluid" | "rectangle" | "horizontal" | "vertical";
  className?: string;
  layout?: string;
  layoutKey?: string;
  responsive?: boolean;
};

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

/**
 * Komponen placeholder Google AdSense.
 * Set NEXT_PUBLIC_ADSENSE_CLIENT untuk mengaktifkan iklan.
 * Saat env tidak diset, akan menampilkan placeholder netral.
 */
export function AdSlot({
  slot,
  format = "auto",
  className,
  layout,
  layoutKey,
  responsive = true,
}: Props) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

  useEffect(() => {
    if (!client) return;
    try {
      (window.adsbygoogle = window.adsbygoogle ?? []).push({});
    } catch {
      // ignore
    }
  }, [client]);

  if (!client) {
    return (
      <div
        className={cn(
          "flex h-24 items-center justify-center border border-dashed border-ink-300 bg-paper-200 text-[11px] uppercase tracking-kicker text-ink-500",
          className,
        )}
      >
        Slot Iklan ({slot})
      </div>
    );
  }

  return (
    <ins
      className={cn("adsbygoogle block", className)}
      style={{ display: "block" }}
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-format={format}
      data-ad-layout={layout}
      data-ad-layout-key={layoutKey}
      data-full-width-responsive={responsive ? "true" : "false"}
    />
  );
}
