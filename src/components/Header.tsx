"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Search, X } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 w-full border-b border-ink-200 bg-paper-100/85 backdrop-blur supports-[backdrop-filter]:bg-paper-100/70">
      <div className="container flex h-16 items-center justify-between gap-6">
        <Logo />

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Utama">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative text-[13px] font-medium text-ink-700 transition-colors hover:text-ink-900"
            >
              {item.label}
              <span className="pointer-events-none absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 bg-accent transition-transform duration-200 group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <Link
            href="/cari"
            className="hidden h-10 w-10 items-center justify-center rounded-md text-ink-700 hover:bg-ink-100 sm:flex"
            aria-label="Cari"
          >
            <Search className="h-[18px] w-[18px]" />
          </Link>
          <Link
            href="/newsletter"
            className="hidden btn btn-primary btn-sm md:inline-flex"
          >
            Subscribe
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-md text-ink-700 hover:bg-ink-100 lg:hidden"
            aria-label="Buka menu"
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "border-t border-ink-200 bg-paper-100 lg:hidden",
          open ? "block" : "hidden",
        )}
      >
        <div className="container flex flex-col gap-1 py-4">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2 text-sm font-medium text-ink-800 hover:bg-ink-100"
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
