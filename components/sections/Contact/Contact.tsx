/* @identity เจ้าป่า */
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { MessageCircle, Mail, Phone, Send } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="bg-white py-24 dark:bg-zinc-950">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          <div>
            <h2 className="mb-6 text-3xl font-bold">ปรึกษาเราวันนี้</h2>
            <p className="mb-10 text-muted-foreground">
              ไม่ต้องกังวลเรื่องเอกสารอีกต่อไป ให้ &quot;เจ้าป่า&quot;
              และทีมงานมืออาชีพดูแลคุณ ติดต่อเราเพื่อประเมินเคสเบื้องต้นฟรี
            </p>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">โทรศัพท์</p>
                  <p className="font-bold">{siteConfig.links.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Line ID</p>
                  <p className="font-bold">{siteConfig.links.lineId}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">อีเมล</p>
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
                    className="w-full rounded-lg border border-slate-200 bg-white p-3 text-slate-900 outline-none focus:ring-2 focus:ring-primary/20 dark:border-zinc-800 dark:bg-zinc-900 dark:text-slate-100"
                    placeholder="สมชาย ใจดี"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">เบอร์โทรศัพท์</label>
                  <input
                    type="tel"
                    className="w-full rounded-lg border border-slate-200 bg-white p-3 text-slate-900 outline-none focus:ring-2 focus:ring-primary/20 dark:border-zinc-800 dark:bg-zinc-900 dark:text-slate-100"
                    placeholder="081-234-5678"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">บริการที่สนใจ</label>
                <select className="w-full rounded-lg border border-slate-200 bg-white p-3 text-slate-900 outline-none focus:ring-2 focus:ring-primary/20 dark:border-zinc-800 dark:bg-zinc-900 dark:text-slate-100">
                  <option className="text-slate-900 dark:text-slate-100">
                    ยื่นสินเชื่อ
                  </option>
                  <option className="text-slate-900 dark:text-slate-100">
                    ยื่นวีซ่า
                  </option>
                  <option className="text-slate-900 dark:text-slate-100">
                    จัดทำเอกสารอื่นๆ
                  </option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  รายละเอียดเพิ่มเติม
                </label>
                <textarea
                  className="h-32 w-full rounded-lg border border-slate-200 bg-white p-3 text-slate-900 outline-none focus:ring-2 focus:ring-primary/20 dark:border-zinc-800 dark:bg-zinc-900 dark:text-slate-100"
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
};

export default ContactSection;
