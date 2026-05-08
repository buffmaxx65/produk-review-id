import { Breadcrumb } from "@/components/Breadcrumb";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Kebijakan Privasi",
  description: "Kebijakan privasi Produk Review ID.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <section className="section">
      <div className="container-prose">
        <Breadcrumb items={[{ name: "Kebijakan Privasi" }]} />
        <h1 className="mt-6 font-serif text-3xl font-bold sm:text-4xl">
          Kebijakan Privasi
        </h1>
        <div className="article-prose mt-6">
          <p>Terakhir diperbarui: {new Date().toLocaleDateString("id-ID")}.</p>
          <h2>Data yang kami kumpulkan</h2>
          <ul>
            <li>Email yang kamu daftarkan ke newsletter (opsional).</li>
            <li>
              Data klik anonim untuk tautan afiliasi (User-Agent, referer,
              tanggal) untuk analitik internal.
            </li>
            <li>
              Cookie analitik (Google Analytics) jika diaktifkan — kamu bisa
              menonaktifkan via browser.
            </li>
          </ul>
          <h2>Bagaimana data digunakan</h2>
          <p>
            Hanya untuk meningkatkan kualitas konten dan personalisasi
            rekomendasi. Kami tidak menjual data pengguna kepada pihak ketiga.
          </p>
          <h2>Iklan</h2>
          <p>
            Kami menggunakan Google AdSense yang dapat menampilkan iklan
            berbasis minat. Kamu bisa mengelola preferensi iklan di{" "}
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener"
            >
              Google Ad Settings
            </a>
            .
          </p>
          <h2>Hak kamu</h2>
          <p>
            Kamu berhak meminta penghapusan email dari daftar dengan klik{" "}
            <em>unsubscribe</em> di newsletter, atau email kami di{" "}
            <a href="mailto:hello@produk-review-id.com">hello@produk-review-id.com</a>.
          </p>
        </div>
      </div>
    </section>
  );
}
