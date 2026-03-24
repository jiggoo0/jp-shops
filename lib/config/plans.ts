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
  | "premium-card"
  | "flight_ticket"
  | "hotel_booking";
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
    name: "Elite Specialist Credentials",
    price: 2500,
    description: "บุคคลคุณภาพพร้อมใช้ (Expertise Profile)",
    longDescription:
      "จัดทำและปั้นโปรไฟล์บุคคลที่มีความเชี่ยวชาญสูง (9 ปี+) ในระบบ Google Search เพื่อสร้างความน่าเชื่อถือในระดับสูงสุด พร้อมประวัติ SEO ที่แข็งแกร่ง",
    steps: [
      "ระบุทักษะหรือหมวดหมู่ที่ต้องการปั้น",
      "ระบบ AI และทีมผู้เชี่ยวชาญเข้าสู่กระบวนการจัดทำตัวตนดิจิทัล",
      "รับมอบสิทธิ์ (Identity Swap) และเอกสารรับรอง Vifily",
    ],
  },
  vifily: {
    name: "Vifily Digital Trust Engine",
    price: 1900,
    description: "สินทรัพย์นิติบุคคลพรีเมียม (Corporate Assets)",
    longDescription:
      "สร้างหรือจัดทำนิติบุคคลที่มีโครงสร้างสมบูรณ์ พอร์ตผลงานแน่น และได้รับตราประทับ UNLINK Trust Level 3 เพื่อการันตีความมั่นคงระดับองค์กรในสายตาผู้ตรวจสอบสากล",
    steps: [
      "ระบุอุตสาหกรรมและพอร์ตโฟลิโอเป้าหมาย",
      "ตรวจสอบประวัติและการฝังตัวตนดิจิทัลเข้าระบบ Google Trust",
      "รับมอบทรัพย์สินทางดิจิทัลและรหัสตรวจสอบสถานะสถานประกอบการ",
    ],
  },
  "premium-card": {
    name: "Physical Luxury Identity",
    price: 5500,
    description: "อาณาจักรธุรกิจสำเร็จรูป (Identity Matching)",
    longDescription:
      "โซลูชันแบบ Combo จับคู่บุคคลคุณภาพ (CEO) เข้ากับนิติบุคคลพรีเมียม เพื่อสร้างเครือข่ายความเชื่อถือ (UNLINK Network) ระดับสูงสุดที่สอดรับกัน 100%",
    steps: [
      "วางโครงสร้างสายสัมพันธ์ทางธุรกิจ (Entity Relationship)",
      "Sync ข้อมูลตัวตนบุคคลเข้ากับตัวตนองค์กร",
      "รับมอบสิทธิ์การบริหารจัดการและประวัติการทำงานที่สมบูรณ์",
    ],
  },
  flight_ticket: {
    name: "Automatic Flight Ticket Generator",
    price: 500,
    description: "ตั๋วเครื่องบินจำลอง (Global Flight Protocol)",
    longDescription:
      "ระบบจำลอง E-ticket แบบ 100% จากสายการบินชั้นนำ (KLM, ANA, Etihad) พร้อม QR Code ตรวจสอบความถูกต้องภายใต้มาตรฐาน UNLINK-GLOBAL",
    steps: [
      "เลือกสายการบินและกรอกข้อมูลการเดินทาง",
      "ตรวจสอบความถูกต้องจาก Preview 70%",
      "ชำระเงินและรับเอกสารพร้อม QR Code สแกนตรวจสอบได้ 7 วัน",
    ],
  },
  hotel_booking: {
    name: "Automatic Hotel Confirmation Generator",
    price: 500,
    description: "ใบยืนยันที่พักจำลอง (Premium Hotel Protocol)",
    longDescription:
      "จำลองใบยืนยันการจองโรงแรมที่อยู่จริงทั่วโลก (Amsterdam, Tokyo, Abu Dhabi) ในรูปแบบ Official Confirmation 100% พร้อมระบบสแกน QR Code (UNLINK Auth)",
    steps: [
      "เลือกโรงแรมเป้าหมายและกรอกข้อมูลผู้พัก",
      "ตรวจสอบความสมบูรณ์จากระบบ Preview 70%",
      "ชำระเงินเพื่อรับใบยืนยันตัวจริงที่สแกนตรวจสอบได้",
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
  metadata: z.any().optional().default({}),
});

export type DocumentInput = z.infer<typeof documentSchema>;
