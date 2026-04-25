/* @identity เจ้าป่า */
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import {
  FAQSection,
  ContactSection,
} from "@/components/sections/AdditionalSections";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />

      {/* Templates Quick Link */}
      <section className="relative overflow-hidden bg-primary py-24 text-white">
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h2 className="mb-6 text-4xl font-bold">
            สำรวจระบบเว็บไซต์จำลองของเรา
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-lg text-primary-foreground/80">
            เรามีระบบจำลองเว็บไซต์สายการบินและโรงแรมระดับสากล
            เพื่อใช้ในการสร้างภาพลักษณ์และการจัดการข้อมูลที่มีประสิทธิภาพสูงสุด
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="group w-72 rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-md transition-all hover:bg-white/20">
              <h3 className="mb-2 text-2xl font-bold">การบินไตย</h3>
              <p className="mb-6 text-sm opacity-80">Airline Simulator</p>
              <Link href="/template/kbt">
                <Button
                  variant="outline"
                  className="w-full border-none bg-white text-primary hover:bg-slate-100"
                >
                  เข้าชม
                </Button>
              </Link>
            </div>
            <div className="group w-72 rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-md transition-all hover:bg-white/20">
              <h3 className="mb-2 text-2xl font-bold">Boogim.com</h3>
              <p className="mb-6 text-sm opacity-80">Hotel Booking Simulator</p>
              <Link href="/template/boogim">
                <Button
                  variant="outline"
                  className="w-full border-none bg-white text-primary hover:bg-slate-100"
                >
                  เข้าชม
                </Button>
              </Link>
            </div>
          </div>
          <div className="mt-12">
            <Link
              href="/templates"
              className="font-medium text-white underline underline-offset-4 transition-colors hover:text-secondary"
            >
              ดูเทมเพลตทั้งหมด
            </Link>
          </div>
        </div>

        {/* Background Decor */}
        <div className="absolute left-0 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-secondary/20 blur-[100px]"></div>
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-white/5 blur-[120px]"></div>
      </section>

      <FAQSection />
      <ContactSection />
    </>
  );
}
