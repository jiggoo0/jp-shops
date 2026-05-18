/* @identity เจ้าป่า */
import ContactSection from "@/components/sections/Contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ติดต่อเรา",
  description:
    "ติดต่อสอบถามและรับคำปรึกษาด้านเอกสาร สินเชื่อ และวีซ่า กับทีมงานมืออาชีพ",
};

export default function ContactPage() {
  return (
    <>
      <section className="border-b bg-slate-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-4xl font-extrabold">ติดต่อเรา</h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            เราพร้อมให้คำปรึกษาและช่วยเหลือทุกปัญหาด้านเอกสาร
          </p>
        </div>
      </section>

      <div>
        <ContactSection />
      </div>
    </>
  );
}
