/* @identity เจ้าป่า */
import {
  Plane,
  Hotel,
  ShieldCheck,
  CreditCard,
  FileSearch,
  Ticket,
  Users,
} from "lucide-react";

export const SERVICES = [
  {
    id: "loan-docs",
    title: "ดูแลและจัดเตรียมเอกสารยื่นสินเชื่อ",
    description:
      "สำหรับกรณีที่เคยถูกปฏิเสธ เราช่วยวิเคราะห์และจัดเตรียมเอกสารใหม่ให้มีความน่าเชื่อถือ",
    price: "เริ่มต้น 3,xxx บาท",
    duration: "3-7 วันทำการ",
    icon: CreditCard,
  },
  {
    id: "visa-docs",
    title: "ดูแลเอกสารสำหรับการยื่นวีซ่าเดินทาง",
    description:
      "เน้นบริการสำหรับสุภาพสตรีที่เคยถูกปฏิเสธวีซ่า จัดทำเอกสารสนับสนุนเพื่อสร้างความเชื่อมั่น",
    price: "เริ่มต้น 5,xxx บาท",
    duration: "5-10 วันทำการ",
    icon: Plane,
  },
  {
    id: "general-docs",
    title: "บริการจัดทำหรือจัดหาเอกสารทุกประเภท",
    description:
      "รับจัดทำเอกสารประกอบการทำธุรกรรมต่างๆ หรือจัดหาเอกสารตามความต้องการ",
    price: "ตามประเภทเอกสาร",
    duration: "1-3 วันทำการ",
    icon: FileSearch,
  },
  {
    id: "booking-docs",
    title: "บริการออกตั๋ว / ใบจอง เพื่อยื่นเอกสาร",
    description:
      "ออกใบจองตั๋วเครื่องบิน ที่พัก และรถโดยสาร เพื่อใช้ประกอบการยื่นวีซ่า",
    price: "เริ่มต้น 5xx บาท",
    duration: "ภายใน 24 ชม.",
    icon: Ticket,
  },
  {
    id: "branding-docs",
    title: "สร้างภาพลักษณ์บุคคลและคู่แข่ง",
    description:
      "บริการให้คำปรึกษาและจัดทำโปรไฟล์เพื่อสร้างภาพลักษณ์ที่ดูดี มีความน่าเชื่อถือ",
    price: "ประเมินตามเนื้องาน",
    duration: "7-14 วันทำการ",
    icon: Users,
  },
];

export const TEMPLATES = [
  {
    slug: "kbt",
    name: "การบินไตย (KBT)",
    description:
      "ระบบจำลองสายการบินพรีเมียม เลียนแบบโครงสร้างและโทนสีมาตรฐานสากล",
    category: "Airline",
    icon: Plane,
  },
  {
    slug: "boogim",
    name: "Boogim.com",
    description: "ระบบจองที่พักและโรงแรมจำลอง ฟังก์ชันครบถ้วนสำหรับการทำใบจอง",
    category: "Hotel",
    icon: Hotel,
  },
  {
    slug: "eu-airline",
    name: "EU Premium Airline",
    description:
      "ตัวอย่างหน้าเว็บสายการบินในยุโรป เน้นความน่าเชื่อถือและภาพลักษณ์สากล",
    category: "Airline",
    icon: ShieldCheck,
  },
  {
    slug: "kr-hotel",
    name: "Seoul Grand Hotel",
    description:
      "ระบบจำลองหน้าเว็บโรงแรมในเกาหลีใต้ ดีไซน์ทันสมัยสไตล์ Minimal",
    category: "Hotel",
    icon: Hotel,
  },
];

export const BLOG_POSTS = [
  {
    slug: "visa-service-tips",
    title: "บริการยื่นวีซ่าสำหรับสุภาพสตรีที่ถูกปฏิเสธ",
    excerpt:
      "เทคนิคการวิเคราะห์สาเหตุและแนวทางการเตรียมเอกสารให้ผ่านฉลุยในรอบถัดไป",
    date: "2026-04-25",
    author: "เจ้าป่า",
  },
];
