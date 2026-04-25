/* @identity เจ้าป่า */
import { notFound } from "next/navigation";
import { SERVICES } from "@/constants";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { CheckCircle2, Clock, BadgeDollarSign, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Metadata } from "next";
import { getBreadcrumbSchema } from "@/lib/schema";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.id,
  }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.id === slug);

  if (!service) return {};

  return {
    title: service.title,
    description: service.description,
    openGraph: {
      title: `${service.title} | ${siteConfig.name}`,
      description: service.description,
    },
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.id === slug);

  if (!service) {
    notFound();
  }

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "หน้าแรก", url: siteConfig.url },
    { name: "บริการทั้งหมด", url: `${siteConfig.url}/services` },
    { name: service.title, url: `${siteConfig.url}/services/${slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* Hero Section */}
      <section className="border-b bg-slate-50 py-24 dark:bg-zinc-900/50">
        <div className="container mx-auto px-4">
          <Link
            href="/services"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            <ArrowLeft size={16} /> ดูบริการทั้งหมด
          </Link>
          <div className="max-w-4xl">
            <div className="mb-8 inline-block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
              <service.icon className="h-12 w-12 text-primary" />
            </div>
            <h1 className="mb-6 text-4xl font-extrabold leading-tight text-slate-900 md:text-5xl lg:text-6xl dark:text-white">
              {service.title}
            </h1>
            <p className="max-w-2xl text-xl leading-relaxed text-slate-600 dark:text-slate-400">
              {service.description}
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div className="space-y-12 lg:col-span-2">
              <div>
                <h2 className="mb-6 text-2xl font-bold">รายละเอียดบริการ</h2>
                <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                  ทีมงานมืออาชีพของเราพร้อมดูแลเคสของคุณอย่างใกล้ชิด
                  โดยเน้นความถูกต้อง แม่นยำ และความรวดเร็ว
                  เราเข้าใจถึงความเร่งด่วนและความกังวลใจของลูกค้า
                  จึงมีกระบวนการทำงานที่ชัดเจนและตรวจสอบได้
                </p>
                <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                  {[
                    "วิเคราะห์เคสรายบุคคลอย่างละเอียด",
                    "จัดเตรียมเอกสารที่ครบถ้วนและถูกต้อง",
                    "ให้คำปรึกษาตลอดขั้นตอนการดำเนินงาน",
                    "ตรวจสอบความถูกต้องก่อนยื่นจริง 100%",
                    "รักษาความลับลูกค้าระดับสูงสุด",
                    "ทีมงานมีประสบการณ์เคสยากโดยเฉพาะ",
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4"
                    >
                      <CheckCircle2
                        className="shrink-0 text-primary"
                        size={20}
                      />
                      <span className="font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="mb-6 text-2xl font-bold">ขั้นตอนการดำเนินงาน</h2>
                <div className="space-y-6">
                  {[
                    {
                      step: "01",
                      title: "รับคำปรึกษาและประเมินเคส",
                      desc: "ลูกค้าแจ้งปัญหาและส่งข้อมูลเบื้องต้นเพื่อให้ทีมงานวิเคราะห์ความเป็นไปได้",
                    },
                    {
                      step: "02",
                      title: "แจ้งเอกสารที่จำเป็นและชำระค่าบริการ",
                      desc: "ทีมงานแจ้งรายการเอกสารที่ต้องใช้ และตกลงเงื่อนไขการชำระเงิน",
                    },
                    {
                      step: "03",
                      title: "เริ่มกระบวนการจัดทำเอกสาร",
                      desc: "ทีมงานดำเนินการจัดเตรียมและตรวจสอบเอกสารทั้งหมดให้เรียบร้อย",
                    },
                    {
                      step: "04",
                      title: "ส่งมอบงานและตรวจสอบความถูกต้อง",
                      desc: "ลูกค้าตรวจสอบความเรียบร้อยของเอกสารก่อนนำไปยื่นจริง",
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-6">
                      <div className="select-none text-4xl font-black text-primary/10">
                        {item.step}
                      </div>
                      <div>
                        <h4 className="mb-1 text-lg font-bold">{item.title}</h4>
                        <p className="text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <Card className="sticky top-24 overflow-hidden border-primary/20 shadow-lg">
                <div className="bg-primary p-6 text-white">
                  <h3 className="text-xl font-bold">ข้อมูลการบริการ</h3>
                </div>
                <CardContent className="space-y-6 p-6">
                  <div className="flex items-center justify-between border-b border-slate-100 py-3">
                    <div className="text-muted-foreground flex items-center gap-2">
                      <BadgeDollarSign size={18} />
                      <span>ราคาบริการ</span>
                    </div>
                    <span className="font-bold text-primary">
                      {service.price}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-100 py-3">
                    <div className="text-muted-foreground flex items-center gap-2">
                      <Clock size={18} />
                      <span>ระยะเวลา</span>
                    </div>
                    <span className="font-bold">{service.duration}</span>
                  </div>

                  <div className="pt-4">
                    <p className="text-muted-foreground mb-4 text-center text-xs italic">
                      &quot;ปรึกษาเราวันนี้ เพื่อโอกาสความสำเร็จที่มากกว่า&quot;
                    </p>
                    <Link href="/contact" className="block w-full">
                      <Button className="w-full py-6 text-lg">
                        ติดต่อสอบถามข้อมูล
                      </Button>
                    </Link>
                    <div className="mt-6 flex justify-center gap-4">
                      <Link
                        href={siteConfig.links.line}
                        target="_blank"
                        className="rounded-full bg-green-50 p-3 text-green-600 transition-colors hover:bg-green-100"
                      >
                        <CheckCircle2 size={24} />
                      </Link>
                      <Link
                        href={`tel:${siteConfig.links.phone}`}
                        className="rounded-full bg-blue-50 p-3 text-blue-600 transition-colors hover:bg-blue-100"
                      >
                        <ArrowLeft size={24} className="rotate-90" />
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
