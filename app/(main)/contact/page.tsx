/* @identity เจ้าป่า */
import { ContactSection } from "@/components/sections/AdditionalSections";

export default function ContactPage() {
  return (
    <>
      <section className="border-b bg-slate-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-4xl font-extrabold">ติดต่อเรา</h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
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
