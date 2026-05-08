/**
 * Konfigurasi link affiliate.
 *
 * Setiap link punya ID unik. Frontend hanya merujuk ID via komponen
 * <AffiliateButton id="..."/>. Klik akan masuk ke /api/track/[id] yang
 * mencatat klik (Supabase) lalu meredirect ke URL aslinya.
 *
 * Best practice:
 *  - Jangan pernah mengekspos URL affiliate mentah di HTML statis.
 *  - Pakai rel="nofollow sponsored" + target="_blank" (sudah di komponen).
 *  - Update URL kapan saja tanpa perlu mengubah artikel MDX.
 */
export type AffiliateLink = {
  id: string;
  label: string;
  /** Marketplace utama: shopee, tokopedia, lazada, amazon, dll. */
  network:
    | "shopee"
    | "tokopedia"
    | "lazada"
    | "blibli"
    | "tiktok-shop"
    | "amazon"
    | "official-store"
    | "other";
  url: string;
  /** Optional: harga terakhir yang diketahui untuk ditampilkan. */
  price?: string;
};

export const affiliateLinks: Record<string, AffiliateLink> = {
  // ====== Smartphone Samsung Galaxy A55 ======
  "samsung-a55-shopee": {
    id: "samsung-a55-shopee",
    label: "Cek Harga di Shopee",
    network: "shopee",
    url: "https://shopee.co.id/samsung-galaxy-a55",
    price: "Rp 5.999.000",
  },
  "samsung-a55-tokopedia": {
    id: "samsung-a55-tokopedia",
    label: "Cek Harga di Tokopedia",
    network: "tokopedia",
    url: "https://tokopedia.com/samsung-official",
    price: "Rp 6.099.000",
  },
  "samsung-a55-lazada": {
    id: "samsung-a55-lazada",
    label: "Cek Harga di Lazada",
    network: "lazada",
    url: "https://www.lazada.co.id/samsung-galaxy-a55",
    price: "Rp 6.149.000",
  },

  // ====== The Ordinary Niacinamide ======
  "ordinary-niacinamide-shopee": {
    id: "ordinary-niacinamide-shopee",
    label: "Cek Harga di Shopee",
    network: "shopee",
    url: "https://shopee.co.id/the-ordinary-niacinamide",
    price: "Rp 109.000",
  },
  "ordinary-niacinamide-sociolla": {
    id: "ordinary-niacinamide-sociolla",
    label: "Beli di Sociolla",
    network: "official-store",
    url: "https://www.sociolla.com/the-ordinary-niacinamide",
    price: "Rp 119.000",
  },

  // ====== Philips Air Fryer HD9252 ======
  "philips-airfryer-shopee": {
    id: "philips-airfryer-shopee",
    label: "Cek Harga di Shopee",
    network: "shopee",
    url: "https://shopee.co.id/philips-airfryer-hd9252",
    price: "Rp 1.799.000",
  },
  "philips-airfryer-tokopedia": {
    id: "philips-airfryer-tokopedia",
    label: "Beli di Tokopedia",
    network: "tokopedia",
    url: "https://tokopedia.com/philips-official-store",
    price: "Rp 1.829.000",
  },
  "philips-airfryer-blibli": {
    id: "philips-airfryer-blibli",
    label: "Beli di Blibli",
    network: "blibli",
    url: "https://www.blibli.com/philips-airfryer",
    price: "Rp 1.899.000",
  },

  // ====== Blackmores Bio C ======
  "blackmores-bioc-shopee": {
    id: "blackmores-bioc-shopee",
    label: "Cek Harga di Shopee",
    network: "shopee",
    url: "https://shopee.co.id/blackmores-bioc",
    price: "Rp 215.000",
  },
  "blackmores-bioc-tokopedia": {
    id: "blackmores-bioc-tokopedia",
    label: "Beli di Tokopedia",
    network: "tokopedia",
    url: "https://tokopedia.com/blackmores-official",
    price: "Rp 225.000",
  },

  // ====== MacBook Air M3 ======
  "macbook-air-m3-shopee": {
    id: "macbook-air-m3-shopee",
    label: "Cek Harga di Shopee",
    network: "shopee",
    url: "https://shopee.co.id/macbook-air-m3",
    price: "Rp 17.999.000",
  },
  "macbook-air-m3-tokopedia": {
    id: "macbook-air-m3-tokopedia",
    label: "Beli di Tokopedia",
    network: "tokopedia",
    url: "https://tokopedia.com/apple-official",
    price: "Rp 18.499.000",
  },
  "macbook-air-m3-iboxstore": {
    id: "macbook-air-m3-iboxstore",
    label: "Beli di iBox",
    network: "official-store",
    url: "https://www.ibox.co.id/macbook-air-m3",
    price: "Rp 19.299.000",
  },

  // ====== Adidas Ultraboost ======
  "adidas-ultraboost-shopee": {
    id: "adidas-ultraboost-shopee",
    label: "Cek Harga di Shopee",
    network: "shopee",
    url: "https://shopee.co.id/adidas-ultraboost",
    price: "Rp 2.799.000",
  },
  "adidas-ultraboost-tokopedia": {
    id: "adidas-ultraboost-tokopedia",
    label: "Beli di Tokopedia",
    network: "tokopedia",
    url: "https://tokopedia.com/adidas-official",
    price: "Rp 2.899.000",
  },
  "adidas-ultraboost-official": {
    id: "adidas-ultraboost-official",
    label: "Beli di Adidas Official",
    network: "official-store",
    url: "https://www.adidas.co.id/ultraboost",
    price: "Rp 3.300.000",
  },
};

export function getAffiliate(id: string): AffiliateLink | undefined {
  return affiliateLinks[id];
}
