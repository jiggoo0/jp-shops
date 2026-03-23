import { IBotStrategy, BotResponse } from "./types";

export class VisaStrategy implements IBotStrategy {
  private keywords = ["2", "วีซ่า", "visa", "INTENT_VISA"];

  canHandle(input: string): boolean {
    const lowInput = input.toLowerCase();
    return this.keywords.some((key) => lowInput.includes(key.toLowerCase()));
  }

  handle(input: string): BotResponse {
    const fromWeb = input === "INTENT_VISA";
    const header = fromWeb
      ? "🦁 ยินดีต้อนรับจากหน้าเว็บไซต์ครับ!"
      : "🦁 สนใจโปรโตคอล [วีซ่า]";

    return {
      type: "text",
      content: `${header}\nกรุณาแจ้งข้อมูลเพื่อจัดชุดเอกสารครับ:\n\n1.ประเทศ:\n2.ประเภท:\n3.งานปัจจุบัน:\n4.วันเดินทาง:\n\n*เจ้าป่าจะช่วยให้คุณผ่านฉลุยครับ*`,
    };
  }
}
