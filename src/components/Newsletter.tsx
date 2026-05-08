"use client";

import { useState } from "react";
import { Mail, CheckCircle2, AlertCircle } from "lucide-react";
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
    // Varian sempit untuk sidebar/area kecil. Single-column, label mengecil,
    // tidak ada decorative blur agar tidak overflow di lebar 280-320px.
    return (
      <div
        className={cn(
          "rounded-2xl bg-gradient-to-br from-brand-700 to-brand-900 p-5 text-white",
          className,
        )}
      >
        <p className="badge badge-brand">
          <Mail className="h-3.5 w-3.5" /> Newsletter
        </p>
        <h3 className="mt-2 text-lg font-bold leading-snug">
          Rekomendasi produk terbaik tiap minggu
        </h3>
        <p className="mt-1 text-sm text-brand-100">
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
            className="rounded-lg border border-white/30 bg-white/10 px-3 py-2 text-sm text-white placeholder-brand-100/80 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/40"
          />
          <button
            type="submit"
            disabled={state === "loading"}
            className="btn btn-cta justify-center"
          >
            {state === "loading" ? "Mengirim..." : "Subscribe"}
          </button>
          {message ? (
            <p
              className={cn(
                "inline-flex items-start gap-1.5 text-xs",
                state === "success" ? "text-emerald-200" : "text-rose-200",
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
          className="flex-1 rounded-lg border border-ink-200 bg-white px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
        />
        <button
          type="submit"
          disabled={state === "loading"}
          className="btn btn-primary"
        >
          {state === "loading" ? "Mengirim..." : "Subscribe"}
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
        "relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-700 to-brand-900 p-6 text-white sm:p-10",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-400/30 blur-3xl"
        aria-hidden
      />
      <div className="relative grid gap-6 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="badge badge-brand">
            <Mail className="h-3.5 w-3.5" /> Newsletter Mingguan
          </p>
          <h3 className="mt-3 text-2xl font-bold sm:text-3xl">
            Dapatkan rekomendasi produk terbaik tiap minggu
          </h3>
          <p className="mt-2 text-brand-100">
            Tips, deal terbaik, dan review eksklusif. Tanpa spam, bisa
            unsubscribe kapan saja.
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3"
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
            className="rounded-lg border border-white/30 bg-white/10 px-4 py-3 text-base text-white placeholder-brand-100/80 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/40"
          />
          <button
            type="submit"
            disabled={state === "loading"}
            className="btn btn-cta justify-center"
          >
            {state === "loading" ? "Mengirim..." : "Subscribe Gratis"}
          </button>
          {message ? (
            <p
              className={cn(
                "inline-flex items-center gap-1.5 text-sm",
                state === "success" ? "text-emerald-200" : "text-rose-200",
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
