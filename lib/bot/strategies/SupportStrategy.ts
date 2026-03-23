import { IBotStrategy, BotResponse } from "./types";

export class SupportStrategy implements IBotStrategy {
  private keywords = ["5", "คน", "คุย", "เจ้าหน้าที่", "แอดมิน"];

  canHandle(input: string): boolean {
    const lowInput = input.toLowerCase();
    return this.keywords.some((key) => lowInput.includes(key.toLowerCase()));
  }

  handle(): BotResponse {
    return {
      type: "text",
      content:
        "🦁 [JP ASSISTANT - ติดต่อเจ้าหน้าที่]\n\nรับทราบครับ! ผมกำลังแจ้งทีมงานผู้เชี่ยวชาญเข้าดูแลคุณโดยเฉพาะ\n\nกรุณาแจ้ง:\n1.เรื่องที่ปรึกษา:\n2.เบอร์ติดต่อ:\n\n(เจ้าหน้าที่จะตอบกลับตามคิวโดยเร็วที่สุดครับ)",
    };
  }
}
