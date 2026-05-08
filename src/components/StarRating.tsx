import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  value: number; // 0-5
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  className?: string;
};

export function StarRating({
  value,
  size = "md",
  showValue = false,
  className,
}: Props) {
  const sizes = {
    sm: "h-3.5 w-3.5",
    md: "h-5 w-5",
    lg: "h-7 w-7",
  } as const;
  const sz = sizes[size];
  const stars = Array.from({ length: 5 }, (_, i) => {
    const fill = Math.max(0, Math.min(1, value - i));
    return fill;
  });

  return (
    <div className={cn("inline-flex items-center gap-1", className)}>
      <div className="relative inline-flex">
        <div className="inline-flex">
          {stars.map((_, i) => (
            <Star key={i} className={cn(sz, "text-ink-200")} />
          ))}
        </div>
        <div
          className="pointer-events-none absolute inset-0 inline-flex overflow-hidden"
          style={{ width: `${(value / 5) * 100}%` }}
        >
          {stars.map((_, i) => (
            <Star
              key={i}
              className={cn(sz, "fill-amber-400 text-amber-400")}
            />
          ))}
        </div>
      </div>
      {showValue ? (
        <span
          className={cn(
            "font-semibold text-ink-900 tabular-nums",
            size === "sm" ? "text-xs" : size === "lg" ? "text-lg" : "text-sm",
          )}
        >
          {value.toFixed(1)}
        </span>
      ) : null}
    </div>
  );
}
