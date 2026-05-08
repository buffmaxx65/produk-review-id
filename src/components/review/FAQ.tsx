"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type Item = { q: string; a: string };

export function FAQ({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="my-10 divide-y divide-ink-200 rounded-2xl border border-ink-200 bg-white">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              aria-expanded={isOpen}
            >
              <span className="text-base font-semibold text-ink-900">
                {it.q}
              </span>
              <ChevronDown
                className={cn(
                  "h-5 w-5 shrink-0 text-ink-500 transition",
                  isOpen && "rotate-180 text-brand-700",
                )}
              />
            </button>
            <div
              className={cn(
                "overflow-hidden px-5 text-ink-700 transition-all",
                isOpen ? "max-h-96 pb-5" : "max-h-0",
              )}
            >
              <p>{it.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
