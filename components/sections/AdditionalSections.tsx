/* @identity เจ้าป่า */
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { MessageCircle, Mail, Phone, Send } from "lucide-react";

const FAQ_DATA = [
  {
    q: "กรณีถูกปฏิเสธวีซ่ามาหลายครั้ง ยังมีโอกาสผ่านไหม?",
    a: "มีโอกาสสูงครับ ทีมงานจะวิเคราะห์จดหมายปฏิเสธ (Refusal Letter) อย่างละเอียด เพื่อแก้จุดบกพร่องและเตรียมหลักฐานสนับสนุนใหม่ที่แน่นหนากว่าเดิม",
  },
  {
    q: "การจัดเตรียมเอกสารสินเชื่อใช้เวลานานเท่าไหร่?",
    a: "โดยปกติจะใช้เวลา 5-10 วันทำการ ขึ้นอยู่กับความซับซ้อนของเคสและประเภทของอาชีพครับ",
  },
  {
    q: "บริการจองตั๋วเครื่องบินและที่พัก เป็นของจริงไหม?",
    a: "เราออกใบจองที่มีรหัส PNR จริง ซึ่งสามารถตรวจสอบกับสายการบินได้ เพื่อใช้ประกอบการยื่นวีซ่าโดยเฉพาะ",
  },
];

const ContactSection = () => (
  <section id="contact" className="bg-white py-24 dark:bg-zinc-950">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
        <div>
          <h2 className="mb-6 text-3xl font-bold">ปรึกษาเราวันนี้</h2>
          <p className="text-muted-foreground mb-10">
            ไม่ต้องกังวลเรื่องเอกสารอีกต่อไป ให้ &quot;เจ้าป่า&quot;
            และทีมงานมืออาชีพดูแลคุณ ติดต่อเราเพื่อประเมินเคสเบื้องต้นฟรี
          </p>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Phone size={20} />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">โทรศัพท์</p>
                <p className="font-bold">{siteConfig.links.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <MessageCircle size={20} />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Line ID</p>
                <p className="font-bold">{siteConfig.links.lineId}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">อีเมล</p>
                <p className="font-bold">{siteConfig.links.email}</p>
              </div>
            </div>
          </div>
        </div>

        <Card className="p-8">
          <form className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">ชื่อ-นามสกุล</label>
                <input
                  type="text"
                  className="w-full rounded-lg border p-3 outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="สมชาย ใจดี"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">เบอร์โทรศัพท์</label>
                <input
                  type="tel"
                  className="w-full rounded-lg border p-3 outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="081-234-5678"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">บริการที่สนใจ</label>
              <select className="w-full rounded-lg border p-3 outline-none focus:ring-2 focus:ring-primary/20">
                <option>ยื่นสินเชื่อ</option>
                <option>ยื่นวีซ่า</option>
                <option>จัดทำเอกสารอื่นๆ</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">รายละเอียดเพิ่มเติม</label>
              <textarea
                className="h-32 w-full rounded-lg border p-3 outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="อธิบายปัญหาของคุณเบื้องต้น..."
              ></textarea>
            </div>
            <Button className="w-full gap-2 py-6 text-lg">
              ส่งข้อความหาเรา <Send size={18} />
            </Button>
          </form>
        </Card>
      </div>
    </div>
  </section>
);

const FAQSection = () => (
  <section id="faq" className="bg-slate-50 py-24 dark:bg-zinc-900/30">
    <div className="container mx-auto px-4">
      <h2 className="mb-16 text-center text-3xl font-bold">
        คำถามที่พบบ่อย (FAQ)
      </h2>
      <div className="mx-auto max-w-3xl space-y-4">
        {FAQ_DATA.map((item, i) => (
          <Card
            key={i}
            className="border-none shadow-sm transition-shadow hover:shadow-md"
          >
            <CardContent className="p-6">
              <h3 className="mb-3 flex gap-2 text-lg font-bold">
                <span className="text-primary">Q:</span> {item.q}
              </h3>
              <p className="text-muted-foreground flex gap-2">
                <span className="font-bold text-secondary">A:</span> {item.a}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

export { FAQSection, ContactSection };
