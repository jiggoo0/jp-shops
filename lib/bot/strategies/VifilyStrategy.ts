import { IBotStrategy, BotResponse } from "./types";

export class VifilyStrategy implements IBotStrategy {
  private keywords = ["3", "vifily", "qr", "รับรอง", "INTENT_VIFILY"];

  canHandle(input: string): boolean {
    const lowInput = input.toLowerCase();
    return this.keywords.some((key) => lowInput.includes(key.toLowerCase()));
  }

  handle(input: string): BotResponse {
    const fromWeb = input === "INTENT_VIFILY";
    const header = fromWeb
      ? "🦁 ยินดีต้อนรับจากหน้าเว็บไซต์ครับ!"
      : "🦁 สนใจโปรโตคอล [Vifily QR]";

    return {
      type: "text",
      content: `${header}\nระบบความเชื่อมั่นระดับสากล พร้อมให้บริการครับ:\n\n1.ชื่อเอกสาร:\n2.จำนวนชุด:\n3.ยื่นที่ไหน:\n\n*ความปลอดภัยของเอกสารคือหัวใจของเรา*`,
    };
  }
}
