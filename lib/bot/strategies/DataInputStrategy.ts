import { IBotStrategy, BotResponse } from "./types";

export class DataInputStrategy implements IBotStrategy {
  canHandle(input: string): boolean {
    return input.includes(":") || input.includes(".");
  }

  handle(): BotResponse {
    return {
      type: "text",
      content:
        "🦁 เจ้าป่าได้รับข้อมูลเบื้องต้นแล้วครับ!\n\nระบบกำลังประมวลผลและแจ้งทีมงานเพื่อตรวจสอบความถูกต้องของเอกสาร\n\n*กรุณารอการตอบกลับสักครู่ครับ*",
    };
  }
}
