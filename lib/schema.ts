/* @identity เจ้าป่า */
import { siteConfig } from "@/config/site";
import { SERVICES } from "@/constants";

/**
 * มาตรฐาน Schema.org สำหรับ Google (Structured Data)
 * ช่วยให้ Google เข้าใจเนื้อหาและแสดงผลแบบ Rich Results (ดาว, คำถามพบบ่อย, รายละเอียดบริการ)
 */

export const getOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/logo.svg`,
  image: `${siteConfig.url}/og-main.png`,
  description: siteConfig.description,
  address: {
    "@type": "PostalAddress",
    addressCountry: "TH",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "13.7563",
    longitude: "100.5018",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: siteConfig.links.phone,
    contactType: "customer service",
    email: siteConfig.links.email,
    availableLanguage: ["Thai", "English"],
  },
  sameAs: [
    siteConfig.links.facebook,
    siteConfig.links.line,
    siteConfig.links.twitter,
  ],
  priceRange: "$$$",
});

export const getWebsiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  publisher: {
    "@type": "Organization",
    name: siteConfig.name,
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
});

export const getServicesSchema = () => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: SERVICES.map((service, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Service",
      name: service.title,
      description: service.description,
      provider: {
        "@type": "ProfessionalService",
        name: siteConfig.name,
      },
      url: `${siteConfig.url}/services/${service.id}`,
    },
  })),
});

export const getFAQSchema = (faqs: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
});

export const getBreadcrumbSchema = (
  items: { name: string; url: string }[]
) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});
