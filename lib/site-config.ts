export const siteConfig = {
  name: "JP Visual Docs",
  shortName: "เจ้าป่า (Chao Pa)",
  title:
    "JP Visual Docs | เจ้าป่า - วิศวกรรมเอกสารและที่ปรึกษาตัวตนดิจิทัลระดับสูง",
  description:
    "ผู้นำด้านวิศวกรรมเอกสารเฉพาะทางและการสร้างตัวตนดิจิทัลสำเร็จรูปที่ Google เชื่อถือ บริหารงานโดย 'เจ้าป่า' พร้อมระบบตรวจสอบความถูกต้อง Vifily OS ที่เนียนและแม่นยำที่สุด",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.jpvisouldocs.shop",
  ogImage: "https://www.jpvisouldocs.shop/og-main.png",
  contact: {
    email: "contact@jpvisouldocs.shop",
    tel: "+66 XX XXX XXXX", // User will update this
    line: "https://line.me/ti/p/@462fqtfc",
    lineId: "@462fqtfc",
    address: {
      street: "Bangkok Business District",
      city: "Bangkok",
      country: "TH",
    },
  },
  social: {
    facebook: "https://facebook.com/jpvisouldocs",
    twitter: "@jpvisouldocs",
  },
  keywords: [
    "เจ้าป่าเอกสาร",
    "วิศวกรรมเอกสารเฉพาะทาง",
    "ตัวตนสำเร็จรูปพร้อมใช้",
    "บริษัทสำเร็จรูปติด SEO",
    "ที่ปรึกษาตัวตนดิจิทัล",
    "Vifily Digital Signature",
    "Identity Swap Tech",
    "ทางลัดอนุมัติเอกสาร",
    "ปั้นโปรไฟล์ Google",
    "JP Visual Docs",
    "Digital Trust Expert",
  ],
  author: {
    name: "เจ้าป่า (Chao Pa)",
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
    name: "Chao Pa Exclusive Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "วิศวกรรมเอกสารเฉพาะทาง (Document Engineering)",
          description:
            "จัดทำและปรับปรุงเอกสารเชิงเทคนิคระดับสูงเพื่อความถูกต้องแม่นยำ 100%",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "บุคคลสำเร็จรูปพร้อมใช้ (Trusted Individual Profiles)",
          description:
            "โอนสิทธิ์ครอบครองตัวตนดิจิทัลที่ Google เชื่อถือและมีประวัติ SEO",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "นิติบุคคลสำเร็จรูปพรีเมียม (Corporate Identity Assets)",
          description:
            "ส่งมอบบริษัทจำลองที่มีโครงสร้างสมบูรณ์และประวัติความน่าเชื่อถือระดับสูง",
        },
      },
    ],
  },
});
