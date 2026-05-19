/* @identity เจ้าป่า */

/**
 * Interface สำหรับข้อมูลบริการ (Service)
 */
export interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  duration: string;
  icon: string;
  image?: string;
}

/**
 * Interface สำหรับข้อมูลเทมเพลต (Template)
 */
export interface Template {
  slug: string;
  name: string;
  description: string;
  category: "Airline" | "Hotel";
  icon: string;
}

/**
 * Interface สำหรับข้อมูลคำถามพบบ่อย (FAQ)
 */
export interface FAQ {
  q: string;
  a: string;
}

/**
 * Interface สำหรับข้อมูลบทความ (BlogPost)
 */
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  image?: string;
}
