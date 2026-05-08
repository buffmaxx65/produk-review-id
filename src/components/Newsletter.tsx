"use client";

import { useState } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  variant?: "card" | "inline" | "compact";
  className?: string;
};

export function Newsletter({ variant = "card", className }: Props) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setState("loading");
    setMessage(null);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Gagal subscribe");
      setState("success");
      setMessage(data.message ?? "Berhasil! Cek inbox kamu ya.");
      setEmail("");
    } catch (err: unknown) {
      setState("error");
      setMessage(err instanceof Error ? err.message : "Terjadi kesalahan");
    }
  }

  if (variant === "compact") {
    // Sidebar-friendly: paper bg, accent rule.
    return (
      <div
        className={cn(
          "border border-ink-200 bg-paper-200 p-5",
          className,
        )}
      >
        <span className="block h-1 w-10 bg-accent" aria-hidden />
        <p className="kicker mt-3">Newsletter</p>
        <h3 className="mt-2 font-serif text-xl font-medium leading-snug text-ink-900">
          Rekomendasi produk terbaik tiap minggu.
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-600">
          Tips, deal terbaik, dan review eksklusif. Tanpa spam.
        </p>
        <form
          onSubmit={handleSubmit}
          className="mt-4 flex flex-col gap-2"
          aria-label="Newsletter subscription"
        >
          <label className="sr-only" htmlFor="newsletter-email-compact">
            Email
          </label>
          <input
            id="newsletter-email-compact"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="kamu@email.com"
            className="rounded-md border border-ink-300 bg-white px-3 py-2 text-sm text-ink-900 placeholder-ink-400 focus:border-ink-900 focus:outline-none focus:ring-2 focus:ring-ink-900/10"
          />
          <button
            type="submit"
            disabled={state === "loading"}
            className="btn btn-cta justify-center"
          >
            {state === "loading" ? "Mengirim..." : "Berlangganan"}
          </button>
          {message ? (
            <p
              className={cn(
                "inline-flex items-start gap-1.5 text-xs",
                state === "success" ? "text-emerald-700" : "text-rose-700",
              )}
            >
              {state === "success" ? (
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              ) : (
                <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              )}
              <span>{message}</span>
            </p>
          ) : null}
        </form>
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <form
        onSubmit={handleSubmit}
        className={cn("flex flex-col gap-2 sm:flex-row", className)}
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email kamu"
          className="flex-1 rounded-md border border-ink-300 bg-white px-4 py-2.5 text-sm focus:border-ink-900 focus:outline-none focus:ring-2 focus:ring-ink-900/10"
        />
        <button
          type="submit"
          disabled={state === "loading"}
          className="btn btn-primary"
        >
          {state === "loading" ? "Mengirim..." : "Berlangganan"}
        </button>
        {message ? (
          <p
            className={cn(
              "mt-1 inline-flex items-center gap-1.5 text-sm",
              state === "success" ? "text-emerald-700" : "text-rose-700",
            )}
          >
            {state === "success" ? (
              <CheckCircle2 className="h-4 w-4" />
            ) : (
              <AlertCircle className="h-4 w-4" />
            )}
            {message}
          </p>
        ) : null}
      </form>
    );
  }

  return (
    <div
      className={cn(
        "border-y border-ink-200 bg-paper-200 py-12 sm:py-16",
        className,
      )}
    >
      <div className="container grid items-end gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <p className="kicker-accent">Newsletter mingguan</p>
          <h3 className="mt-3 font-serif text-3xl font-medium leading-tight tracking-tight text-ink-900 sm:text-[2.25rem] lg:text-[2.75rem]">
            Dapatkan rekomendasi produk{" "}
            <em className="italic text-accent">terbaik</em> tiap minggu.
          </h3>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-600">
            Editor kami merangkum review baru, deal terbaik, dan tips beli yang
            jarang dibagikan. Tanpa spam, bisa berhenti kapan saja.
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 lg:col-span-5"
          aria-label="Newsletter subscription"
        >
          <label className="sr-only" htmlFor="newsletter-email">
            Email
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="kamu@email.com"
            className="rounded-md border border-ink-300 bg-white px-4 py-3 text-base text-ink-900 placeholder-ink-400 focus:border-ink-900 focus:outline-none focus:ring-2 focus:ring-ink-900/10"
          />
          <button
            type="submit"
            disabled={state === "loading"}
            className="btn btn-primary btn-lg justify-center"
          >
            {state === "loading" ? "Mengirim..." : "Berlangganan gratis"}
          </button>
          <p className="text-xs text-ink-500">
            Dengan berlangganan, kamu menyetujui{" "}
            <a
              href="/privacy"
              className="underline decoration-accent underline-offset-4 hover:text-ink-900"
            >
              kebijakan privasi
            </a>{" "}
            kami.
          </p>
          {message ? (
            <p
              className={cn(
                "inline-flex items-center gap-1.5 text-sm",
                state === "success" ? "text-emerald-700" : "text-rose-700",
              )}
            >
              {state === "success" ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : (
                <AlertCircle className="h-4 w-4" />
              )}
              {message}
            </p>
          ) : null}
        </form>
      </div>
    </div>
  );
}
