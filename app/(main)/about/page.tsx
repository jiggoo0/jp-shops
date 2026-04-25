/* @identity เจ้าป่า */
import { UserCheck, Shield, Award } from "lucide-react";

export default function AboutPage() {
  return (
    <>
      <section className="bg-slate-50 py-24 dark:bg-zinc-900/50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
            เกี่ยวกับ JP-VISUAL&DOCS
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-400">
            เบื้องหลังความสำเร็จในการยื่นเอกสารและสร้างภาพลักษณ์ระดับสากล
            เราดูแลทุกรายละเอียดเพื่อให้คุณก้าวไปข้างหน้าได้อย่างมั่นใจ
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-bold italic text-primary">
                &quot;เจ้าป่า&quot;
              </h2>
              <p className="mb-6 text-lg leading-relaxed">
                เราคือทีมงานมืออาชีพที่นำโดยคุณ **&quot;เจ้าป่า&quot;** (Chief
                Strategic Architect)
                ผู้มีประสบการณ์และความเชี่ยวชาญในการแก้ปัญหาเคสยากๆ
                ไม่ว่าจะเป็นการกู้บ้านไม่ผ่าน การถูกปฏิเสธวีซ่า
                หรือการต้องการสร้างภาพลักษณ์ที่น่าเชื่อถือในโลกธุรกิจ
              </p>
              <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                เราเชื่อว่า &quot;เอกสารที่ถูกต้องและถูกจุด&quot;
                คือกุญแจสำคัญที่เปิดประตูสู่โอกาสใหม่ๆ
                งานของเราไม่ใช่แค่การจัดทำกระดาษ
                แต่เป็นการวางกลยุทธ์เพื่อให้คุณได้รับผลลัพธ์ที่ต้องการ
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-primary/10 p-2 text-primary">
                    <UserCheck size={24} />
                  </div>
                  <span className="text-lg font-semibold">
                    วิเคราะห์เคสรายบุคคลอย่างละเอียด
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-primary/10 p-2 text-primary">
                    <Shield size={24} />
                  </div>
                  <span className="text-lg font-semibold">
                    รักษาความลับลูกค้าสูงสุด
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-primary/10 p-2 text-primary">
                    <Award size={24} />
                  </div>
                  <span className="text-lg font-semibold">
                    ผลงานเป็นที่ประจักษ์และได้รับการยอมรับ
                  </span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square overflow-hidden rounded-2xl bg-slate-200 shadow-2xl">
                <div className="flex h-full w-full items-center justify-center bg-primary text-5xl font-bold italic text-white">
                  JP-VISUAL
                </div>
              </div>
              <div className="absolute -bottom-8 -right-8 hidden rounded-2xl border border-slate-100 bg-white p-8 shadow-xl lg:block">
                <p className="text-3xl font-bold italic text-primary">100%</p>
                <p className="text-muted-foreground text-sm">
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
