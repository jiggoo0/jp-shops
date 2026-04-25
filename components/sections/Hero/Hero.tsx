/* @identity เจ้าป่า */
import { MoveRight, FileText, Globe, UserCheck } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-white py-24 lg:py-40 dark:bg-slate-950">
      <div className="container relative mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <div className="mb-8 flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-6 py-2 text-xs font-bold uppercase tracking-widest text-primary dark:border-primary/20 dark:bg-primary/10 dark:text-secondary">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-secondary"></span>
            </span>
            Professional Document Strategy
          </div>
          <h1 className="max-w-5xl font-heading text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl lg:text-8xl dark:text-white">
            จัดการทุกเรื่อง{" "}
            <span className="text-primary dark:text-secondary">เอกสาร</span>{" "}
            <br className="hidden sm:block" />
            ให้เป็นเรื่องง่ายและ{" "}
            <span className="italic text-primary/80 dark:text-secondary/80">
              มืออาชีพ
            </span>
          </h1>
          <p className="mt-8 max-w-2xl font-body text-lg leading-relaxed text-slate-600 sm:text-xl dark:text-slate-400">
            บริการดูแลและจัดเตรียมเอกสารสำหรับการยื่นสินเชื่อและวีซ่า
            ครบวงจรโดยผู้เชี่ยวชาญ เราเปลี่ยนความซับซ้อนให้เป็นความสำเร็จ
            ด้วยมาตรฐานที่ทั่วโลกยอมรับ
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-6">
            <Link href="#services">
              <Button className="h-14 rounded-full px-8 text-lg font-bold shadow-xl shadow-primary/20 transition-transform hover:-translate-y-1">
                ดูบริการของเรา <MoveRight className="ml-2" size={20} />
              </Button>
            </Link>
            <Link href="/templates">
              <Button
                variant="outline"
                className="h-14 rounded-full px-8 text-lg font-bold transition-transform hover:-translate-y-1"
              >
                ตัวอย่างเทมเพลต
              </Button>
            </Link>
          </div>

          <div className="mt-24 grid grid-cols-2 gap-8 md:grid-cols-4 lg:gap-16">
            <div className="flex flex-col items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/5 text-primary shadow-inner dark:bg-primary/20 dark:text-secondary">
                <FileText size={28} strokeWidth={1.5} />
              </div>
              <span className="font-heading text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                เอกสารแม่นยำ
              </span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/5 text-primary shadow-inner dark:bg-primary/20 dark:text-secondary">
                <UserCheck size={28} strokeWidth={1.5} />
              </div>
              <span className="font-heading text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                สร้างภาพลักษณ์
              </span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/5 text-primary shadow-inner dark:bg-primary/20 dark:text-secondary">
                <Globe size={28} strokeWidth={1.5} />
              </div>
              <span className="font-heading text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                มาตรฐานสากล
              </span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/10 text-secondary shadow-inner dark:bg-secondary/20">
                <span className="text-xl font-black italic">JP</span>
              </div>
              <span className="font-heading text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                ความมั่นใจ 100%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decor - ปรับให้ดูซอฟต์และแพงขึ้น */}
      <div className="absolute -left-24 -top-24 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px] dark:bg-primary/10"></div>
      <div className="absolute -bottom-24 -right-24 h-[500px] w-[500px] rounded-full bg-secondary/5 blur-[120px] dark:bg-secondary/10"></div>
    </section>
  );
};

export default Hero;
