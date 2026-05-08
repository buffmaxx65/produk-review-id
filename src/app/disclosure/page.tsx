import { Breadcrumb } from "@/components/Breadcrumb";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Affiliate Disclosure",
  description:
    "Disclosure mengenai program afiliasi dan komisi yang diterima Produk Review ID.",
  path: "/disclosure",
});

export default function DisclosurePage() {
  return (
    <section className="section">
      <div className="container-prose">
        <Breadcrumb items={[{ name: "Disclosure" }]} />
        <h1 className="mt-6 font-serif text-3xl font-bold sm:text-4xl">
          Affiliate Disclosure
        </h1>
        <div className="article-prose mt-6">
          <p>
            Produk Review ID adalah peserta program afiliasi dari berbagai
            marketplace seperti Shopee, Tokopedia, Lazada, Blibli, dan lainnya.
            Program-program ini dirancang untuk memungkinkan situs web
            mendapatkan komisi dengan menautkan ke marketplace tersebut.
          </p>
          <p>
            Artinya, jika kamu mengklik tautan afiliasi di situs ini dan
            kemudian membeli produk, kami akan menerima komisi kecil dari
            penjualan tersebut — tanpa biaya tambahan untukmu. Pendapatan ini
            membantu kami terus menyediakan konten review yang independen.
          </p>
          <p>
            <strong>Apakah ini mempengaruhi rekomendasi kami?</strong>{" "}
            Tidak. Editor kami menguji produk dan menulis review tanpa pengaruh
            dari mitra afiliasi. Jika produk tidak layak direkomendasikan,
            kami akan menyebutkannya secara terbuka di artikel.
          </p>
          <p>
            Tautan afiliasi pada situs ini diberi atribut{" "}
            <code>rel="nofollow sponsored"</code> sesuai pedoman Google.
            Pertanyaan? Kunjungi halaman <a href="/kontak">Kontak</a>.
          </p>
        </div>
      </div>
    </section>
  );
}
