export const siteConfig = {
  name: "JP Visual Docs",
  shortName: "เจ้าป่า",
  title:
    "JP Visual Docs | เจ้าป่า - ที่ปรึกษาสินเชื่อ วีซ่า และเอกสารรับรอง Vifily",
  description:
    "บริการที่ปรึกษาสินเชื่อ วีซ่า และเอกสารรับรองดิจิทัลมาตรฐาน Vifily แม่นยำ 100% ตรวจสอบได้ทั่วโลก โดยทีมงาน 'เจ้าป่า' ผู้เชี่ยวชาญด้านเอกสารยุคใหม่",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.jpvisouldocs.shop",
  ogImage: "https://www.jpvisouldocs.shop/og-main.png",
  contact: {
    email: "contact@jpvisouldocs.shop",
    tel: "+66 00 000 0000", // Update with actual business number
    line: "https://line.me/ti/p/@462fqtfc",
    lineId: "@462fqtfc",
    address: {
      street: "Bangkok, Thailand",
      city: "Bangkok",
      country: "TH",
    },
  },
  social: {
    facebook: "https://facebook.com/jpvisouldocs",
    twitter: "@jpvisouldocs",
  },
  keywords: [
    "ที่ปรึกษาสินเชื่อ",
    "ยื่นวีซ่า",
    "เอกสารรับรองดิจิทัล",
    "Vifily Certification",
    "รับทำสเตทเม้นท์",
    "ใบรับรองเงินเดือน",
    "จองตั๋วเครื่องบินด่วน",
    "ตรวจสอบเอกสารปลอม",
    "เจ้าป่าเอกสาร",
    "JP Visual Docs",
    "AI Lending 2026",
    "Digital Trust Thailand",
  ],
  author: {
    name: "เจ้าป่า (JP)",
    url: "https://www.jpvisouldocs.shop/about",
  },
};

export type SiteConfig = typeof siteConfig;

export const getJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  alternateName: siteConfig.shortName,
  url: siteConfig.url,
  logo: `${siteConfig.url}/logo.svg`,
  image: siteConfig.ogImage,
  description: siteConfig.description,
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.contact.address.street,
    addressLocality: siteConfig.contact.address.city,
    addressCountry: siteConfig.contact.address.country,
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    url: siteConfig.contact.line,
    availableLanguage: ["Thai", "English"],
  },
  sameAs: [siteConfig.contact.line, siteConfig.social.facebook].filter(Boolean),
});

export const getServiceSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Service",
  provider: {
    "@id": `${siteConfig.url}/#organization`,
  },
  areaServed: {
    "@type": "Country",
    name: "Thailand",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "JP Visual Docs Services",
    itemListElement: [
      {
        "@type": "OfferCatalog",
        name: "Financial & Visa Consultation",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "ที่ปรึกษาสินเชื่อ",
              description:
                "วิเคราะห์โปรไฟล์และเตรียมเอกสารเพื่อการอนุมัติสินเชื่อ",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "ที่ปรึกษาวีซ่า",
              description: "บริการเตรียมเอกสารยื่นวีซ่าทั่วโลก",
            },
          },
        ],
      },
      {
        "@type": "OfferCatalog",
        name: "Digital Certification",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Vifily Digital Trust",
              description: "ระบบรับรองความถูกต้องของเอกสารด้วย QR Code ดิจิทัล",
            },
          },
        ],
      },
    ],
  },
});
