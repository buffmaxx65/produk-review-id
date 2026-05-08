export const siteConfig = {
  name: "Produk Review ID",
  tagline: "Review jujur, rekomendasi terbaik",
  description:
    "Review produk teknologi, kecantikan, kesehatan, rumah tangga, dan fashion yang jujur, mendalam, dan dapat dipercaya. Temukan produk terbaik yang sesuai untuk Anda.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://produk-review-id.vercel.app",
  locale: "id-ID",
  ogImage: "/og-default.svg",
  twitter: "@produkreviewid",
  organization: {
    name: "Produk Review ID",
    logo: "/logo.svg",
    sameAs: [
      "https://twitter.com/produkreviewid",
      "https://instagram.com/produkreviewid",
      "https://www.youtube.com/@produkreviewid",
    ],
  },
  nav: [
    { label: "Teknologi", href: "/kategori/teknologi" },
    { label: "Kecantikan", href: "/kategori/kecantikan" },
    { label: "Rumah Tangga", href: "/kategori/rumah-tangga" },
    { label: "Kesehatan", href: "/kategori/kesehatan" },
    { label: "Fashion", href: "/kategori/fashion" },
    { label: "Tentang", href: "/tentang" },
  ],
  footerLinks: [
    { label: "Tentang Kami", href: "/tentang" },
    { label: "Kontak", href: "/kontak" },
    { label: "Disclosure", href: "/disclosure" },
    { label: "Kebijakan Privasi", href: "/privacy" },
  ],
};

export type SiteConfig = typeof siteConfig;
