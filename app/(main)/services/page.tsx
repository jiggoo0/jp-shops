/* @identity เจ้าป่า */
import { SERVICES } from "@/constants";
import { Card, CardContent, CardFooter } from "@/components/ui/Card";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { MoveRight } from "lucide-react";

export const metadata = {
  title: "บริการทั้งหมด",
  description:
    "รวมบริการดูแลและจัดเตรียมเอกสารระดับมืออาชีพ ทั้งสินเชื่อ วีซ่า และการสร้างภาพลักษณ์บุคคล",
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-4xl font-extrabold md:text-5xl">
            บริการระดับมืออาชีพ
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            เรามุ่งเน้นการแก้ปัญหาและสร้างโอกาสให้คุณผ่านการจัดการเอกสารที่มีประสิทธิภาพสูงสุด
            โดยทีมงานผู้เชี่ยวชาญนำโดย &quot;เจ้าป่า&quot;
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => (
              <Card
                key={service.id}
                className="group flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl"
              >
                <CardContent className="flex-grow pt-8">
                  <div className="mb-6 inline-block rounded-xl bg-primary/5 p-4 transition-colors group-hover:bg-primary/10">
                    <service.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold transition-colors group-hover:text-primary">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
                <CardFooter className="flex flex-col gap-4 border-t border-slate-50 bg-slate-50/50 p-6 dark:bg-zinc-800/30">
                  <div className="flex w-full items-center justify-between text-sm font-medium">
                    <span className="text-primary">{service.price}</span>
                    <span className="text-muted-foreground italic">
                      {service.duration}
                    </span>
                  </div>
                  <Link href={`/services/${service.id}`} className="w-full">
                    <Button
                      variant="outline"
                      className="w-full gap-2 transition-all group-hover:bg-primary group-hover:text-white"
                    >
                      ดูรายละเอียด <MoveRight size={16} />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 text-3xl font-bold">
            ไม่พบรายละเอียดที่ต้องการ?
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-primary-foreground/80">
            หากคุณมีเคสที่ซับซ้อน หรือต้องการบริการจัดทำเอกสารประเภทอื่นๆ
            นอกเหนือจากที่ระบุไว้ สามารถติดต่อเพื่อรับคำปรึกษาเบื้องต้นได้ทันที
          </p>
          <Link href="/contact">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-slate-100"
            >
              ติดต่อปรึกษาเจ้าหน้าที่
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
