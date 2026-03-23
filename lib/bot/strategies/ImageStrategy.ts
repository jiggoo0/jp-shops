import { IBotStrategy, BotResponse } from "./types";

export class ImageStrategy implements IBotStrategy {
  canHandle(input: string): boolean {
    // ในระบบของเรา เราจะส่ง "EVENT_IMAGE" มาจาก Webhook เมื่อตรวจพบรูปภาพ
    return input === "EVENT_IMAGE";
  }

  handle(): BotResponse {
    return {
      type: "text",
      content:
        "🦁 [JP PROTOCOL - รับไฟล์ภาพสำเร็จ]\n\nเจ้าป่าได้รับไฟล์งานด่วน/เอกสารแก้ไขเรียบร้อยแล้วครับ!\n\nระบบกำลังดำเนินการ:\n1. ตรวจสอบความละเอียดของไฟล์\n2. ส่งเข้าคิว AI Specialist เพื่อตรวจสอบทันที\n\n*แอดมินจะแจ้งผลการตรวจสอบและสรุปงานให้ทราบทางนี้โดยเร็วที่สุดครับ*",
    };
  }
}
