import { IBotStrategy, BotResponse } from "./types";
import { flexTemplates } from "../templates";

export class VisaStrategy implements IBotStrategy {
  private textKeywords = ["วีซ่า", "visa", "INTENT_VISA"];

  canHandle(input: string): boolean {
    const cleanInput = input.trim().toLowerCase();

    // Exact match for numbers 2, 2.1, 2.2, 2.3
    if (/^2(\.[1-3])?$/.test(cleanInput)) return true;

    return this.textKeywords.some((key) =>
      cleanInput.includes(key.toLowerCase()),
    );
  }

  handle(input: string): BotResponse {
    const cleanInput = input.trim();

    if (cleanInput === "2.1") {
      return {
        type: "text",
        content:
          "🦁 [เอกสารที่ต้องใช้เบื้องต้น]\n\n1. พาสปอร์ตตัวจริง (อายุเหลือ > 6 เดือน)\n2. รูปถ่ายพื้นขาว 2 นิ้ว\n3. หนังสือรับรองการทำงาน/การเงิน\n4. แผนการเดินทาง (ถ้ามี)\n\nกด '2.2' เพื่อให้เจ้าหน้าที่ประเมินโอกาสผ่านครับ\n\n(พิมพ์ '0' กลับเมนูหลัก)",
      };
    }

    if (cleanInput === "2.2") {
      return {
        type: "text",
        content:
          "🦁 กรุณาแจ้งข้อมูลเพื่อประเมินโอกาสผ่านวีซ่า:\n\n1.ประเทศเป้าหมาย:\n2.ประเภท (ท่องเที่ยว/นักเรียน/ทำงาน):\n3.อาชีพปัจจุบัน:\n4.เคยโดนปฏิเสธวีซ่าหรือไม่:\n\n(พิมพ์ '0' กลับเมนูหลัก)",
      };
    }

    if (cleanInput === "2.3") {
      return {
        type: "text",
        content:
          "🦁 กรุณาทิ้งเบอร์ติดต่อไว้ ผู้เชี่ยวชาญด้านวีซ่าจะติดต่อกลับโดยเร็วที่สุดครับ\n\n(พิมพ์ '0' กลับเมนูหลัก)",
      };
    }

    return {
      type: "flex",
      content: flexTemplates.serviceSubMenu("visa", "บริการจัดเตรียมวีซ่า", [
        { label: "เช็คเอกสารที่ต้องใช้", text: "2.1" },
        { label: "ประเมินโอกาสผ่าน", text: "2.2" },
        { label: "ติดต่อ จนท. วีซ่า", text: "2.3" },
      ]) as Record<string, unknown>,
    };
  }
}
