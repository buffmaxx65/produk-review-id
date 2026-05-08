"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Search, X, Star } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 w-full border-b border-ink-200/70 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-bold tracking-tight">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-sm">
            <Star className="h-5 w-5 fill-white" />
          </span>
          <span className="text-lg sm:text-xl text-ink-900">
            {siteConfig.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-ink-700 hover:text-brand-700 transition"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/cari"
            className="hidden h-10 w-10 items-center justify-center rounded-lg text-ink-700 hover:bg-ink-100 sm:flex"
            aria-label="Cari"
          >
            <Search className="h-5 w-5" />
          </Link>
          <Link href="/newsletter" className="hidden btn btn-primary md:inline-flex">
            Subscribe
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden grid h-10 w-10 place-items-center rounded-lg text-ink-700 hover:bg-ink-100"
            aria-label="Buka menu"
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "lg:hidden border-t border-ink-200/70 bg-white",
          open ? "block" : "hidden",
        )}
      >
        <div className="container py-4 flex flex-col gap-1">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 text-base font-medium text-ink-800 hover:bg-ink-100"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/newsletter"
            onClick={() => setOpen(false)}
            className="btn btn-primary mt-2"
          >
            Subscribe
          </Link>
        </div>
      </div>
    </header>
  );
}
