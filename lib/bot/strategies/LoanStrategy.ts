import { siteConfig } from "@/lib/site-config";
import { IBotStrategy, BotResponse } from "./types";
import { flexTemplates } from "../templates";

export class LoanStrategy implements IBotStrategy {
  private textKeywords = ["สินเชื่อ", "กู้", "เงิน", "INTENT_LOAN"];

  canHandle(input: string): boolean {
    const cleanInput = input.trim().toLowerCase();

    // Exact match for numbers 1, 1.1, 1.2, 1.3
    if (/^1(\.[1-3])?$/.test(cleanInput)) return true;

    return this.textKeywords.some((key) =>
      cleanInput.includes(key.toLowerCase()),
    );
  }

  handle(input: string): BotResponse {
    const cleanInput = input.trim();

    if (cleanInput === "1.1") {
      return {
        type: "text",
        content:
          "🦁 [เงื่อนไขคุณสมบัติสินเชื่อเบื้องต้น]\n\n1. อายุ 20 - 60 ปี\n2. มีรายได้ประจำ 15,000 บาทขึ้นไป\n3. อายุงานปัจจุบัน 6 เดือนขึ้นไป\n\nหากคุณสมบัติตรงตามนี้ สามารถกด '1.2' หรือพิมพ์ '1.2' เพื่อประเมินวงเงินได้เลยครับ\n\n(พิมพ์ '0' กลับเมนูหลัก)",
      };
    }

    if (cleanInput === "1.2") {
      return {
        type: "text",
        content: `🦁 เพื่อให้เจ้าป่าประเมินวงเงินได้แม่นยำ กรุณาแจ้ง:\n\n1.อาชีพ:\n2.รายได้รวมต่อเดือน:\n3.ภาระหนี้ต่อเดือน:\n4.วัตถุประสงค์การกู้:\n\nหรือประเมินละเอียดที่: ${siteConfig.url}/register\n\n(พิมพ์ '0' กลับเมนูหลัก)`,
      };
    }

    if (cleanInput === "1.3") {
      return {
        type: "text",
        content:
          "🦁 รับทราบครับ! กรุณาทิ้งเบอร์ติดต่อไว้ เจ้าหน้าที่ฝ่ายสินเชื่อจะรีบติดต่อกลับโดยเร็วที่สุดครับ\n\n(พิมพ์ '0' กลับเมนูหลัก)",
      };
    }

    // Default for "1" or text matches
    return {
      type: "flex",
      content: flexTemplates.serviceSubMenu("loan", "บริการสินเชื่อ", [
        { label: "เช็คคุณสมบัติเบื้องต้น", text: "1.1" },
        { label: "ประเมินวงเงิน", text: "1.2" },
        { label: "ติดต่อ จนท. สินเชื่อ", text: "1.3" },
      ]) as Record<string, unknown>,
    };
  }
}
