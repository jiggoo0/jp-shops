import { siteConfig } from "@/lib/site-config";
import { IBotStrategy, BotResponse } from "./types";

export class LoanStrategy implements IBotStrategy {
  private keywords = ["1", "สินเชื่อ", "กู้", "เงิน", "INTENT_LOAN"];

  canHandle(input: string): boolean {
    const lowInput = input.toLowerCase();
    return this.keywords.some((key) => lowInput.includes(key.toLowerCase()));
  }

  handle(input: string): BotResponse {
    const fromWeb = input === "INTENT_LOAN";
    const header = fromWeb
      ? "🦁 ยินดีต้อนรับจากหน้าเว็บไซต์ครับ!"
      : "🦁 สนใจโปรโตคอล [สินเชื่อ]";

    return {
      type: "text",
      content: `${header}\nเพื่อให้เจ้าป่าประเมินวงเงินได้แม่นยำ กรุณาแจ้ง:\n\n1.อาชีพ:\n2.รายได้:\n3.กู้ซื้อ:\n4.ปัญหา:\n\nหรือประเมินละเอียดที่: ${siteConfig.url}/register`,
    };
  }
}
