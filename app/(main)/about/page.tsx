/* @identity เจ้าป่า */
import { UserCheck, Shield, Award } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "เกี่ยวกับเรา",
  description:
    "ทำความรู้จักกับ JP-VISUAL&DOCS ทีมงานมืออาชีพผู้เชี่ยวชาญด้านกลยุทธ์เอกสารและภาพลักษณ์ระดับสากล",
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-slate-50 py-24 dark:bg-zinc-900/50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
            เกี่ยวกับ JP-VISUAL&DOCS
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-800 dark:text-slate-400">
            ร่วมขับเคลื่อนทุกเป้าหมายด้วยกลยุทธ์การจัดการเอกสารและภาพลักษณ์ระดับสากล
            เราพร้อมดูแลทุกรายละเอียดด้วยความใส่ใจ
            เพื่อให้คุณบรรลุความสำเร็จอย่างราบรื่นและมั่นใจ
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-bold text-primary">
                วิสัยทัศน์และการทำงานของเรา
              </h2>
              <p className="mb-6 text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                **JP-VISUAL&DOCS**
                คือทีมที่ปรึกษาเชิงกลยุทธ์ที่มุ่งเน้นความสำเร็จของลูกค้าเป็นสำคัญ
                นำทีมโดยคุณ **&quot;เจ้าป่า&quot;** (Chief Strategic Architect)
                ผู้มีความเชี่ยวชาญและประสบการณ์ในการแก้ปัญหาที่ซับซ้อน
                ไม่ว่าจะเป็นการวางแผนเอกสารเพื่อขอสินเชื่อ
                การวิเคราะห์เคสวีซ่าที่ผ่านยาก
                หรือการเสริมสร้างภาพลักษณ์ธุรกิจให้น่าเชื่อถือในระดับสากล
              </p>
              <p className="mb-8 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                เพราะเราเชื่อมั่นว่า
                &quot;ความถูกต้องแม่นยำและการวางแผนที่ตรงจุด&quot;
                คือกุญแจสำคัญสู่การเปิดประตูแห่งโอกาสใหม่ๆ
                บริการของเราจึงไม่ใช่เพียงการจัดทำเอกสาร
                แต่คือการวางแผนกลยุทธ์แบบองค์รวมเพื่อให้มั่นใจว่าลูกค้าทุกท่านจะได้รับผลลัพธ์ที่คุ้มค่าและดีที่สุด
              </p>

              <div className="space-y-4">
                <div className="group flex items-center gap-4">
                  <div className="rounded-lg bg-primary/10 p-2 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    <UserCheck size={24} />
                  </div>
                  <span className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                    การวิเคราะห์และประเมินเคสรายบุคคลเชิงลึก
                  </span>
                </div>
                <div className="group flex items-center gap-4">
                  <div className="rounded-lg bg-primary/10 p-2 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    <Shield size={24} />
                  </div>
                  <span className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                    มาตรฐานการรักษาความลับและความเป็นส่วนตัวสูงสุด
                  </span>
                </div>
                <div className="group flex items-center gap-4">
                  <div className="rounded-lg bg-primary/10 p-2 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    <Award size={24} />
                  </div>
                  <span className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                    ความสำเร็จที่พิสูจน์ได้และได้รับการยอมรับในระดับสากล
                  </span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square overflow-hidden rounded-2xl bg-slate-200 shadow-2xl dark:bg-zinc-800">
                <Image
                  src="/images/about/profile.webp"
                  alt="เจ้าป่า - Chief Strategic Architect"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 hidden rounded-2xl border border-slate-100 bg-white p-8 shadow-xl lg:block dark:border-zinc-800 dark:bg-zinc-950">
                <p className="text-3xl font-bold italic text-primary">100%</p>
                <p className="text-sm text-muted-foreground">
                  Professional Standard
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
