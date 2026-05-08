"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type Item = { q: string; a: string };

export function FAQ({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="my-10 divide-y divide-ink-200 border-y border-ink-200">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-ink-900"
              aria-expanded={isOpen}
            >
              <span className="font-serif text-lg font-medium text-ink-900">
                {it.q}
              </span>
              <ChevronDown
                className={cn(
                  "h-5 w-5 shrink-0 text-ink-500 transition",
                  isOpen && "rotate-180 text-accent",
                )}
              />
            </button>
            <div
              className={cn(
                "overflow-hidden text-ink-700 transition-all",
                isOpen ? "max-h-96 pb-5" : "max-h-0",
              )}
            >
              <p className="text-[15px] leading-relaxed">{it.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
