import type { Metadata } from "next";
import { siteConfig } from "./site";
import type { Review } from "./reviews";

type BuildMetaArgs = {
  title: string;
  description?: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
};

export function buildMetadata(args: BuildMetaArgs): Metadata {
  const url = new URL(args.path ?? "/", siteConfig.url).toString();
  const description = args.description ?? siteConfig.description;
  const image = args.image ?? siteConfig.ogImage;
  return {
    metadataBase: new URL(siteConfig.url),
    title: args.title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: args.title,
      description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: args.type ?? "website",
      images: [{ url: image, width: 1200, height: 630, alt: args.title }],
      ...(args.publishedTime ? { publishedTime: args.publishedTime } : {}),
      ...(args.modifiedTime ? { modifiedTime: args.modifiedTime } : {}),
      ...(args.authors ? { authors: args.authors } : {}),
    },
    twitter: {
      card: "summary_large_image",
      site: siteConfig.twitter,
      title: args.title,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.organization.name,
    url: siteConfig.url,
    logo: new URL(siteConfig.organization.logo, siteConfig.url).toString(),
    sameAs: siteConfig.organization.sameAs,
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/cari?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function reviewJsonLd(review: Review) {
  const url = `${siteConfig.url}/review/${review.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": "Product",
      name: review.productName,
      brand: { "@type": "Brand", name: review.brand },
      image: new URL(review.cover, siteConfig.url).toString(),
    },
    author: { "@type": "Person", name: review.author },
    reviewRating: {
      "@type": "Rating",
      ratingValue: review.rating,
      bestRating: 5,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.organization.name,
      logo: {
        "@type": "ImageObject",
        url: new URL(siteConfig.organization.logo, siteConfig.url).toString(),
      },
    },
    datePublished: review.date,
    dateModified: review.updated ?? review.date,
    url,
    reviewBody: review.excerpt,
    name: review.title,
  };
}

export function articleJsonLd(review: Review) {
  const url = `${siteConfig.url}/review/${review.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: review.title,
    description: review.excerpt,
    image: [new URL(review.cover, siteConfig.url).toString()],
    author: [{ "@type": "Person", name: review.author }],
    datePublished: review.date,
    dateModified: review.updated ?? review.date,
    publisher: {
      "@type": "Organization",
      name: siteConfig.organization.name,
      logo: {
        "@type": "ImageObject",
        url: new URL(siteConfig.organization.logo, siteConfig.url).toString(),
      },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
}

export function breadcrumbJsonLd(
  items: { name: string; href?: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: it.name,
      ...(it.href
        ? { item: new URL(it.href, siteConfig.url).toString() }
        : {}),
    })),
  };
}

export function faqJsonLd(faq: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
