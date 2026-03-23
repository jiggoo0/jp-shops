import { Metadata } from "next";

export const siteConfig = {
  name: "JP Visual Docs | เจ้าป่า",
  description:
    "บริการที่ปรึกษาสินเชื่อ วีซ่า และเอกสารรับรองดิจิทัลมาตรฐาน Vifily แม่นยำ 100% ตรวจสอบได้ทั่วโลก",
  url: "https://www.jpvisouldocs.shop",
  ogImage: "https://www.jpvisouldocs.shop/og-main.png",
  links: {
    line: "https://line.me/ti/p/@462fqtfc",
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
  ],
};

export const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/favicon.ico`,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "",
    contactType: "customer service",
    areaServed: "TH",
    availableLanguage: "Thai",
  },
  sameAs: ["https://line.me/ti/p/@462fqtfc"],
  description: siteConfig.description,
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "บริการเอกสารและที่ปรึกษา",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "ที่ปรึกษาสินเชื่อส่วนบุคคลและธุรกิจ",
          description: "วิเคราะห์โปรไฟล์และจัดชุดเอกสารเพื่อการอนุมัติสินเชื่อ",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Vifily Digital Certification",
          description: "ระบบตรวจสอบความน่าเชื่อถือเอกสารผ่าน QR Code",
        },
      },
    ],
  },
};
