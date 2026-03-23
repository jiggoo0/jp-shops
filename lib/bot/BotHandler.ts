import { flexTemplates } from "./templates";
import { siteConfig } from "@/lib/site-config";

export interface BotResponse {
  type: "text" | "flex";
  content: string | Record<string, unknown>;
}

export class BotHandler {
  handle(text: string): BotResponse {
    const input = text.trim();

    // --- มุมที่ 2: Triggers จากหน้าเว็บ (Web-to-LINE) ---
    if (input === "INTENT_LOAN") return this.getLoanPrompt(true);
    if (input === "INTENT_VISA") return this.getVisaPrompt(true);
    if (input === "INTENT_VIFILY") return this.getVifilyPrompt(true);

    // --- มุมที่ 1: การตอบโต้ทั่วไป ---

    // กด 0 หรือเรียกเมนู
    if (input === "0" || input.includes("เมนู")) {
      return {
        type: "flex",
        content: flexTemplates.mainMenu.contents as Record<string, unknown>,
      };
    }

    // [1] สินเชื่อ
    if (
      input === "1" ||
      this.matchKeywords(input, ["สินเชื่อ", "กู้", "เงิน"])
    ) {
      return this.getLoanPrompt();
    }

    // [2] วีซ่า
    if (input === "2" || this.matchKeywords(input, ["วีซ่า", "visa"])) {
      return this.getVisaPrompt();
    }

    // [3] Vifily
    if (
      input === "3" ||
      this.matchKeywords(input, ["vifily", "qr", "รับรอง"])
    ) {
      return this.getVifilyPrompt();
    }

    // [4] งานด่วน
    if (input === "4" || this.matchKeywords(input, ["ด่วน", "แก้", "urgent"])) {
      return {
        type: "text",
        content:
          "🦁 [JP PROTOCOL - งานด่วนพิเศษ]\n\nเจ้าป่าพร้อมดำเนินการให้ทันทีครับ!\nกรุณาส่งรายละเอียด:\n1.ทำอะไร:\n2.ส่งรูป/ไฟล์:\n3.เวลาใช้:\n\n*แอดมินจะแจ้งราคาประเมินภายใน 15 นาทีครับ*",
      };
    }

    // [5] เจ้าหน้าที่
    if (
      input === "5" ||
      this.matchKeywords(input, ["คน", "คุย", "เจ้าหน้าที่"])
    ) {
      return {
        type: "text",
        content:
          "🦁 [JP ASSISTANT - ติดต่อเจ้าหน้าที่]\n\nรับทราบครับ! ผมกำลังแจ้งทีมงานผู้เชี่ยวชาญเข้าดูแลคุณโดยเฉพาะ\n\nกรุณาแจ้ง:\n1.เรื่องที่ปรึกษา:\n2.เบอร์ติดต่อ:\n\n(เจ้าหน้าที่จะตอบกลับตามคิวโดยเร็วที่สุดครับ)",
      };
    }

    // ตรวจสอบกรณีลูกค้าส่งข้อมูลกลับมา (แบบสั้นๆ)
    if (input.includes(":") || input.includes(".")) {
      return {
        type: "text",
        content:
          "🦁 เจ้าป่าได้รับข้อมูลเบื้องต้นแล้วครับ!\n\nระบบกำลังประมวลผลและแจ้งทีมงานเพื่อตรวจสอบความถูกต้องของเอกสาร\n\n*กรุณารอการตอบกลับสักครู่ครับ*",
      };
    }

    // Default: ส่ง Main Menu
    return {
      type: "flex",
      content: flexTemplates.mainMenu.contents as Record<string, unknown>,
    };
  }

  private getLoanPrompt(fromWeb = false): BotResponse {
    const header = fromWeb
      ? "🦁 ยินดีต้อนรับจากหน้าเว็บไซต์ครับ!"
      : "🦁 สนใจโปรโตคอล [สินเชื่อ]";
    return {
      type: "text",
      content: `${header}\nเพื่อให้เจ้าป่าประเมินวงเงินได้แม่นยำ กรุณาแจ้ง:\n\n1.อาชีพ:\n2.รายได้:\n3.กู้ซื้อ:\n4.ปัญหา:\n\nหรือประเมินละเอียดที่: ${siteConfig.url}/register`,
    };
  }

  private getVisaPrompt(fromWeb = false): BotResponse {
    const header = fromWeb
      ? "🦁 ยินดีต้อนรับจากหน้าเว็บไซต์ครับ!"
      : "🦁 สนใจโปรโตคอล [วีซ่า]";
    return {
      type: "text",
      content: `${header}\nกรุณาแจ้งข้อมูลเพื่อจัดชุดเอกสารครับ:\n\n1.ประเทศ:\n2.ประเภท:\n3.งานปัจจุบัน:\n4.วันเดินทาง:\n\n*เจ้าป่าจะช่วยให้คุณผ่านฉลุยครับ*`,
    };
  }

  private getVifilyPrompt(fromWeb = false): BotResponse {
    const header = fromWeb
      ? "🦁 ยินดีต้อนรับจากหน้าเว็บไซต์ครับ!"
      : "🦁 สนใจโปรโตคอล [Vifily QR]";
    return {
      type: "text",
      content: `${header}\nระบบความเชื่อมั่นระดับสากล พร้อมให้บริการครับ:\n\n1.ชื่อเอกสาร:\n2.จำนวนชุด:\n3.ยื่นที่ไหน:\n\n*ความปลอดภัยของเอกสารคือหัวใจของเรา*`,
    };
  }

  private matchKeywords(input: string, keywords: string[]): boolean {
    const lowInput = input.toLowerCase();
    return keywords.some((key) => lowInput.includes(key));
  }
}
