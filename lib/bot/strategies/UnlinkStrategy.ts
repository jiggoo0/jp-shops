import { IBotStrategy, BotResponse } from "./types";
import { flexTemplates } from "../templates";

export class UnlinkStrategy implements IBotStrategy {
  private textKeywords = ["unlink", "qr", "รับรอง", "INTENT_UNLINK", "vifily"];

  canHandle(input: string): boolean {
    const cleanInput = input.trim().toLowerCase();

    // Exact match for numbers 3, 3.1, 3.2
    if (/^3(\.[1-2])?$/.test(cleanInput)) return true;

    return this.textKeywords.some((key) =>
      cleanInput.includes(key.toLowerCase()),
    );
  }

  handle(input: string): BotResponse {
    const cleanInput = input.trim();

    if (cleanInput === "3.1") {
      return {
        type: "text",
        content:
          "🦁 [UNLINK-GLOBAL คืออะไร?]\n\nระบบรับรองเอกสารดิจิทัลมาตรฐานสากล พร้อม QR Code เพื่อให้คู่ค้าสแกนตรวจสอบความถูกต้องผ่านเครือข่าย UNLINK-GLOBAL โดยตรง\n\n(พิมพ์ '0' กลับเมนูหลัก)",
      };
    }

    if (cleanInput === "3.2") {
      return {
        type: "text",
        content:
          "🦁 สนใจสร้างเอกสาร UNLINK-GLOBAL กรุณาแจ้ง:\n\n1.ประเภทเอกสาร (เช่น สลิปเงินเดือน, สเตทเมนท์):\n2.หน่วยงานที่นำไปยื่น:\n\n(พิมพ์ '0' กลับเมนูหลัก)",
      };
    }

    return {
      type: "flex",
      content: flexTemplates.serviceSubMenu("vifily", "ระบบ UNLINK QR", [
        { label: "UNLINK คืออะไร?", text: "3.1" },
        { label: "ขอรับรองเอกสาร", text: "3.2" },
      ]) as Record<string, unknown>,
    };
  }
}
