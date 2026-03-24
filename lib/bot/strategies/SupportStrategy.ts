import { IBotStrategy, BotResponse } from "./types";

export class SupportStrategy implements IBotStrategy {
  private textKeywords = ["คน", "คุย", "เจ้าหน้าที่", "แอดมิน"];

  canHandle(input: string): boolean {
    const cleanInput = input.trim().toLowerCase();

    if (/^5(\.1)?$/.test(cleanInput)) return true;

    return this.textKeywords.some((key) =>
      cleanInput.includes(key.toLowerCase()),
    );
  }

  handle(): BotResponse {
    return {
      type: "text",
      content:
        "🦁 [JP ASSISTANT - ติดต่อเจ้าหน้าที่]\n\nรับทราบครับ! ผมกำลังแจ้งทีมงานผู้เชี่ยวชาญเข้าดูแลคุณโดยเฉพาะ\n\nกรุณาแจ้ง:\n1.เรื่องที่ปรึกษา:\n2.เบอร์ติดต่อ:\n\n(เจ้าหน้าที่จะตอบกลับตามคิวโดยเร็วที่สุดครับ)\n\n(พิมพ์ '0' กลับเมนูหลัก)",
    };
  }
}
