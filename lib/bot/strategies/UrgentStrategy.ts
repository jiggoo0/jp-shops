import { IBotStrategy, BotResponse } from "./types";

export class UrgentStrategy implements IBotStrategy {
  private keywords = ["4", "ด่วน", "แก้", "urgent"];

  canHandle(input: string): boolean {
    const lowInput = input.toLowerCase();
    return this.keywords.some((key) => lowInput.includes(key.toLowerCase()));
  }

  handle(): BotResponse {
    return {
      type: "text",
      content:
        "🦁 [JP PROTOCOL - งานด่วนพิเศษ]\n\nเจ้าป่าพร้อมดำเนินการให้ทันทีครับ!\nกรุณาส่งรายละเอียด:\n1.ทำอะไร:\n2.ส่งรูป/ไฟล์:\n3.เวลาใช้:\n\n*แอดมินจะแจ้งราคาประเมินภายใน 15 นาทีครับ*",
    };
  }
}
