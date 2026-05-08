import {
  Smartphone,
  Sparkles,
  Home,
  HeartPulse,
  Shirt,
  type LucideIcon,
} from "lucide-react";

export type Category = {
  slug: string;
  name: string;
  description: string;
  icon: LucideIcon;
  color: string;
};

export const categories: Category[] = [
  {
    slug: "teknologi",
    name: "Teknologi",
    description:
      "Smartphone, laptop, gadget, dan perangkat pintar yang sudah kami uji langsung.",
    icon: Smartphone,
    color: "from-sky-500 to-indigo-600",
  },
  {
    slug: "kecantikan",
    name: "Kecantikan",
    description:
      "Skincare, makeup, dan perawatan rambut hasil review jujur dari editor.",
    icon: Sparkles,
    color: "from-pink-500 to-rose-600",
  },
  {
    slug: "rumah-tangga",
    name: "Rumah Tangga",
    description:
      "Peralatan dapur, pembersih, dan smart home untuk hunian yang lebih nyaman.",
    icon: Home,
    color: "from-amber-500 to-orange-600",
  },
  {
    slug: "kesehatan",
    name: "Kesehatan",
    description:
      "Suplemen, alat kesehatan, dan produk wellness yang terbukti.",
    icon: HeartPulse,
    color: "from-emerald-500 to-teal-600",
  },
  {
    slug: "fashion",
    name: "Fashion",
    description:
      "Sepatu, pakaian, tas, dan aksesoris dengan kualitas dan harga terbaik.",
    icon: Shirt,
    color: "from-violet-500 to-purple-600",
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
