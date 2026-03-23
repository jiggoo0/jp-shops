import * as z from "zod";

export type PlanType = "1_day" | "7_days" | "15_days" | "30_days" | "365_days";
export type ServiceId =
  | "doc_verification"
  | "ai_assistant"
  | "loan"
  | "travel"
  | "visa"
  | "specialist"
  | "vifily"
  | "premium-card";
export type PaymentCategory = "subscription" | "service";

export const planConfig: Record<
  PlanType,
  {
    name: string;
    label: string;
    price: number;
    days: number;
    description: string;
  }
> = {
  "1_day": {
    name: "Elite 24-Hour Access",
    label: "รายวัน (Standard)",
    price: 199,
    days: 1,
    description: "สิทธิ์การเข้าถึงระบบวิเคราะห์เอกสารระดับมืออาชีพ 24 ชั่วโมง",
  },
  "7_days": {
    name: "Professional Weekly",
    label: "รายสัปดาห์",
    price: 890,
    days: 7,
    description:
      "แพ็กเกจสำหรับผู้เชี่ยวชาญอิสระ จัดการเคสได้ไม่จำกัดตลอดสัปดาห์",
  },
  "15_days": {
    name: "Business Strategy Plus",
    label: "ครึ่งเดือน (Popular)",
    price: 1500,
    days: 15,
    description:
      "ระบบสนับสนุนการทำงานต่อเนื่อง พร้อม Priority Line สำหรับเคสสำคัญ",
  },
  "30_days": {
    name: "Ultimate Partner Protocol",
    label: "รายเดือน (Expert Choice)",
    price: 2500,
    days: 30,
    description:
      "มาตรฐานสูงสุดสำหรับพาร์ทเนอร์มืออาชีพ ปลดล็อกทุกเครื่องมือขั้นสูง",
  },
  "365_days": {
    name: "VIP Executive Elite",
    label: "รายปี (Global Partner)",
    price: 19900,
    days: 365,
    description:
      "ความร่วมมือระดับสูงสุด พร้อมสิทธิ์เข้าถึงทีมที่ปรึกษาเฉพาะทาง 24/7",
  },
};

export const serviceConfig: Record<
  ServiceId,
  {
    name: string;
    price: number;
    description: string;
    longDescription: string;
    steps: string[];
  }
> = {
  doc_verification: {
    name: "Precision Data Integrity Check",
    price: 150,
    description: "ตรวจสอบความสมบูรณ์และถูกต้องของข้อมูลผ่านระบบ Intelligence",
    longDescription:
      "วิเคราะห์ความถูกต้องของข้อมูล ลายเซ็น และตราประทับ ผ่าน Protocol ตรวจสอบ 10 ขั้นตอน เพื่อความแม่นยำ 100% ป้องกันข้อผิดพลาดที่ส่งผลต่อการพิจารณา",
    steps: [
      "ส่งไฟล์เอกสารเข้าสู่ระบบตรวจสอบ",
      "วิเคราะห์โครงสร้างข้อมูลผ่าน Integrity Engine",
      "รับรายงานการรับรองความถูกต้อง",
    ],
  },
  ai_assistant: {
    name: "Intelligence Case Consultant",
    price: 50,
    description: "วิเคราะห์และวางกลยุทธ์เคสเอกสารแบบเฉพาะบุคคล",
    longDescription:
      "ประเมินโอกาสสำเร็จของแต่ละเคสด้วยฐานข้อมูลสถิติโลก วางแผนขั้นตอนการเตรียมเอกสารให้มีประสิทธิภาพสูงสุด",
    steps: [
      "ระบุเป้าหมายหรือรายละเอียดเคส",
      "วิเคราะห์จุดเสี่ยงและโอกาสสำเร็จ",
      "รับแผนผังขั้นตอนการดำเนินงาน",
    ],
  },
  loan: {
    name: "Elite Credit Profile Solution",
    price: 2500,
    description: "วิเคราะห์โครงสร้างการเงินและโซลูชันเอกสารสินเชื่อ",
    longDescription:
      "เจาะลึกโปรไฟล์ทางการเงินเพื่อจัดชุดเอกสารให้สอดคล้องกับมาตรฐานธนาคารระดับสากล แก้ไขปัญหาโปรไฟล์ติดขัดอย่างเป็นระบบ",
    steps: [
      "ระบุข้อมูลโครงสร้างการเงิน",
      "ผู้เชี่ยวชาญเข้าสู่กระบวนการวิเคราะห์โปรไฟล์",
      "จัดทำโซลูชันเอกสารที่ผ่านการรับรอง",
    ],
  },
  travel: {
    name: "Global Certified E-Booking",
    price: 2900,
    description: "จัดการเอกสารยืนยันสิทธิ์การเดินทางระดับสากล",
    longDescription:
      "จัดเตรียมชุดเอกสารการจองที่สามารถตรวจสอบสถานะ (Status Check) ได้จริงผ่านระบบค้นหาสากลทั่วโลก สร้างความน่าเชื่อถือสูงสุด",
    steps: [
      "ระบุข้อมูลและเส้นทางการเดินทาง",
      "ระบบจองและออกเอกสารยืนยันสถานะจริง",
      "รับชุดเอกสารพร้อมรหัสตรวจสอบสากล",
    ],
  },
  visa: {
    name: "High-End Visa Protocol",
    price: 4500,
    description: "ชุดเอกสารยื่นวีซ่าระดับพรีเมียม (Full Scale)",
    longDescription:
      "Protocol การจัดเตรียมเอกสารที่ถูกออกแบบมาตามเกณฑ์มาตรฐานสถานทูตอย่างเคร่งครัด พร้อมระบบ Vifily Trust ตรวจสอบความจริงใจของข้อมูล",
    steps: [
      "เลือกประเภทและประเทศปลายทาง",
      "ดำเนินการเตรียมชุดข้อมูลตาม Protocol",
      "รับชุดเอกสารที่ผ่านการ QC 100%",
    ],
  },
  specialist: {
    name: "Expert Specialist Credentials",
    price: 2500,
    description: "จัดทำเอกสารเชิงเทคนิคเฉพาะทางระดับสูง",
    longDescription:
      "บริการสำหรับงานเอกสารที่ต้องการทักษะเชิงเทคนิคพิเศษหรืองานด่วนที่ต้องการคุณภาพงานในระดับไร้ที่ติ (Flawless Quality)",
    steps: [
      "แจ้งรายละเอียดงานเชิงเทคนิค",
      "ออกแบบโครงสร้างข้อมูลเอกสารระดับสูง",
      "ตรวจสอบความเรียบร้อยและรับไฟล์ต้นฉบับ",
    ],
  },
  vifily: {
    name: "Vifily Digital Trust Engine",
    price: 1900,
    description: "การรับรองความน่าเชื่อถือดิจิทัลระดับสากล",
    longDescription:
      "สร้างตัวตนดิจิทัลที่มีความน่าเชื่อถือระดับ Global ผ่านระบบ Vifily พร้อมรหัส QR เฉพาะบุคคลที่ตรวจสอบได้ทั่วโลก",
    steps: [
      "ลงทะเบียนข้อมูลพาร์ทเนอร์",
      "สร้าง Protocol ความเชื่อมั่นเฉพาะบุคคล",
      "รับสิทธิ์การตรวจสอบผ่าน Vifily Portal",
    ],
  },
  "premium-card": {
    name: "Physical Luxury Identity",
    price: 5500,
    description: "ผลิตบัตรรับรองและบัตรสิทธิ์เกรดพรีเมียม",
    longDescription:
      "ยกระดับภาพลักษณ์ด้วยงานพิมพ์คุณภาพสูงสุดบนวัสดุเกรดพรีเมียม พร้อมระบบจัดส่งที่ปลอดภัยและเป็นความลับ",
    steps: [
      "เลือกวัสดุและยืนยันดีไซน์",
      "ตรวจสอบความถูกต้องของข้อมูลสิทธิ์",
      "ผลิตและจัดส่งผ่าน Secure Logistics",
    ],
  },
};

export const documentSchema = z.object({
  ownerName: z.string(),
  documentType: z.string(),
  issuedDate: z.string(),
  expiryDate: z.string(),
  status: z.string().default("Verified"),
  issuer: z.string(),
});

export type DocumentInput = z.infer<typeof documentSchema>;
