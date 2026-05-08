import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container py-24 text-center">
      <p className="text-sm font-semibold text-brand-700">404</p>
      <h1 className="mt-2 font-serif text-4xl font-bold sm:text-5xl">
        Halaman tidak ditemukan
      </h1>
      <p className="mt-3 text-ink-600">
        Sepertinya halaman yang kamu cari sudah tidak ada atau pindah.
      </p>
      <Link href="/" className="btn btn-primary mt-6 inline-flex">
        Kembali ke beranda
      </Link>
    </div>
  );
}
