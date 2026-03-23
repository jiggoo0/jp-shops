export interface ReplyStrategy {
  match(text: string): boolean;
  execute(): string;
}

export const RESPONSES = {
  loan: `สวัสดีครับ เจ้าป่ารับทราบว่าคุณสนใจบริการที่ปรึกษาสินเชื่อ / เดินสเตทเม้นท์ (Priority A) 🦁

เพื่อความรวดเร็วในการประมวลผล กรุณาส่งข้อมูลเบื้องต้น:
1. อาชีพปัจจุบัน
2. รายได้เฉลี่ยต่อเดือน
3. วัตถุประสงค์ (เช่น กู้บ้าน, รถ, ธุรกิจ)

เดี๋ยวผมประเมินความเป็นไปได้และวางแผนตัวเลขให้ทันทีครับ`,

  visa: `สวัสดีครับ เจ้าป่ารับทราบว่าคุณสนใจงานเอกสารวีซ่า / ทำงานต่างประเทศ 🦁

กรุณาแจ้งข้อมูลเพื่อให้ทีมงานจัดชุดเอกสารมาตรฐานสูงสุด:
1. ประเทศปลายทาง
2. ประเภทวีซ่า (เช่น ท่องเที่ยว, ทำงาน)
3. กำหนดการยื่น (ถ้ามี)

ผมจะช่วยดูแลให้ผ่านฉลุยตามเกณฑ์สถานทูตครับ`,

  vifily: `ระบบ Vifily Digital Trust พร้อมให้บริการครับ 🛡️

เจ้าป่าจะช่วยสร้างความน่าเชื่อถือระดับสากลให้เอกสารของคุณ
โปรดแจ้ง "ประเภทเอกสาร" ที่ต้องการประทับตรา QR Code ครับ
(เช่น ใบรับรองเงินเดือน, สัญญาจ้าง, เอกสารเฉพาะทาง)`,

  urgent: `สวัสดีครับ เจ้าป่ารับทราบว่าเป็นงานแก้ไขเอกสารด่วนพิเศษ (VIP) ⚡

กรุณาส่งไฟล์รูปภาพหรือรายละเอียดจุดที่ต้องการแก้ไขมาได้เลยครับ
ทีมงาน AI ของผมพร้อมดำเนินการให้เนียนที่สุดและรวดเร็วที่สุดครับ`,

  default: `สวัสดีครับ ผม "เจ้าป่า" แห่ง JP Visual Docs ยินดีที่ได้ดูแลครับ 🦁

มีเรื่องด่วนหรือต้องการปรึกษาด้านเอกสารความน่าเชื่อถือสูง (Vifily Standard)
สามารถพิมพ์รายละเอียดทิ้งไว้ได้เลยครับ ผมจะรีบประมวลผลและตอบกลับโดยเร็วที่สุด`,
};

class LoanStrategy implements ReplyStrategy {
  match(text: string) {
    return text.includes("ที่ปรึกษาสินเชื่อ");
  }
  execute() {
    return RESPONSES.loan;
  }
}

class VisaStrategy implements ReplyStrategy {
  match(text: string) {
    return text.includes("เอกสารวีซ่า");
  }
  execute() {
    return RESPONSES.visa;
  }
}

class VifilyStrategy implements ReplyStrategy {
  match(text: string) {
    return text.includes("Vifily QR");
  }
  execute() {
    return RESPONSES.vifily;
  }
}

class UrgentStrategy implements ReplyStrategy {
  match(text: string) {
    return text.includes("แก้ไขเอกสารเฉพาะทาง");
  }
  execute() {
    return RESPONSES.urgent;
  }
}

export class BotHandler {
  private strategies: ReplyStrategy[] = [
    new LoanStrategy(),
    new VisaStrategy(),
    new VifilyStrategy(),
    new UrgentStrategy(),
  ];

  handle(text: string): string {
    const strategy = this.strategies.find((s) => s.match(text));
    return strategy ? strategy.execute() : RESPONSES.default;
  }
}
