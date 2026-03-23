"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Briefcase,
  Plane,
  FileSignature,
  FileText,
  ShieldCheck,
  CreditCard,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { Button, Card, Section } from "@/components/ui";
import { ClientMotionDiv } from "@/components/ui/ClientMotion";

const services = [
  {
    id: "loan",
    icon: <Briefcase className="w-6 h-6" />,
    title: "วิเคราะห์โปรไฟล์สินเชื่อ",
    description:
      "เจาะลึกโครงสร้างการเงินส่วนบุคคล จัดชุดเอกสารตามมาตรฐานธนาคารเพื่อโอกาสสำเร็จสูงสุด ดำเนินการโดย Protocol เฉพาะทางระดับมืออาชีพ",
    image: "/service-loan.webp",
  },
  {
    id: "travel",
    icon: <Plane className="w-6 h-6" />,
    title: "เอกสารสิทธิ์การเดินทางสากล",
    description:
      "จัดการเอกสารการจองระดับพรีเมียมที่ตรวจสอบสถานะจริงได้ทั่วโลก รองรับการยื่นวีซ่าและธุรกรรมสากลด้วยความถูกต้อง 100%",
    image: "/blog-evisa.webp",
  },
  {
    id: "visa",
    icon: <FileSignature className="w-6 h-6" />,
    title: "ยื่นวีซ่ามาตรฐานพรีเมียม",
    description:
      "Protocol การจัดเตรียมเอกสารที่แม่นยำตามเกณฑ์สถานทูต ตรวจสอบความสมบูรณ์ของชุดข้อมูลแบบ 10 ขั้นตอนก่อนส่งมอบงาน",
    image: "/service-visa.webp",
  },
  {
    id: "specialist",
    icon: <FileText className="w-6 h-6" />,
    title: "โซลูชันเอกสารเฉพาะทาง",
    description:
      "สร้างสรรค์และปรับปรุงเอกสารเชิงเทคนิคระดับสูงสำหรับงานด่วนพิเศษที่ต้องการคุณภาพไร้ที่ติ และความถูกต้องตามหลักสากล",
    image: "/blog-lending.webp",
  },
  {
    id: "vifily",
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "การรับรองสิทธิ์ดิจิทัล Vifily",
    description:
      "ยกระดับความเชื่อมั่นระดับ Global ด้วยรหัสยืนยันตัวตนดิจิทัล ตรวจสอบประวัติและความถูกต้องของสิทธิ์ได้จากทุกมุมโลก",
    image: "/vifily-verification.webp",
  },
  {
    id: "premium-card",
    icon: <CreditCard className="w-6 h-6" />,
    title: "บัตรรับรองเกรดพรีเมียม",
    description:
      "ผลิต Physical Credentials คุณภาพสูงบนวัสดุเกรดพรีเมียม พร้อมระบบความปลอดภัยและการจัดส่งที่รัดกุมที่สุด",
    image: "/blog-vifily.webp",
  },
];

export function ServicesSection() {
  const handleOpenCheckout = (serviceId: string) => {
    const event = new CustomEvent("open-checkout", { detail: { serviceId } });
    window.dispatchEvent(event);
  };

  return (
    <Section
      id="services"
      className="bg-gray-100/80 py-32 border-y border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-10">
          <div className="max-w-2xl">
            <div className="w-16 h-1.5 bg-green-500 mb-8 rounded-full"></div>
            <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-none uppercase text-gray-900">
              บริการระดับ <br />
              <span className="text-gray-600 italic">EXECUTIVE PROTOCOL</span>
            </h2>
            <p className="text-gray-900 text-xl font-bold leading-relaxed italic bg-white/80 inline-block px-4 py-2 rounded-xl shadow-sm">
              &quot;เราจัดการทุกความยุ่งยากของเอกสาร
              เพื่อให้คุณได้รับโอกาสที่ควรจะเป็น&quot;
            </p>
          </div>
          <Link href="/register">
            <Button
              variant="outline"
              size="lg"
              className="group h-20 rounded-[2rem] border-gray-400 px-12 bg-white shadow-xl hover:border-gray-900 transition-all duration-500"
            >
              <span className="font-black uppercase tracking-[0.2em] text-[11px] text-gray-900">
                ดูบริการทั้งหมด
              </span>
              <ArrowRight className="w-5 h-5 ml-4 group-hover:translate-x-2 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {services.map((service, index) => (
            <ClientMotionDiv
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div onClick={() => handleOpenCheckout(service.id)}>
                <Card className="group overflow-hidden !p-0 border-none shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] hover:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.25)] transition-all duration-1000 rounded-[3.5rem] bg-white cursor-pointer h-full flex flex-col relative">
                  {/* Decorative corner accent */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/10 rounded-full -mr-12 -mt-12 transition-colors group-hover:bg-green-500/20"></div>

                  <div className="h-64 w-full overflow-hidden relative">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[0.2] group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent"></div>
                  </div>
                  <div className="p-12 relative flex-grow flex flex-col">
                    <div className="w-16 h-16 bg-gray-900 text-white rounded-2xl flex items-center justify-center mb-10 shadow-2xl -mt-20 relative z-10 border-[8px] border-white group-hover:bg-green-600 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                      {service.icon}
                    </div>
                    <h3 className="text-3xl font-black mb-6 tracking-tight text-gray-900 group-hover:text-green-600 transition-colors uppercase italic leading-none">
                      {service.title}
                    </h3>
                    <p className="text-gray-800 text-base leading-relaxed mb-10 font-bold italic group-hover:opacity-100 transition-opacity">
                      {service.description}
                    </p>
                    <div className="flex items-center text-[10px] font-black uppercase tracking-[0.25em] text-gray-900 pt-8 border-t border-gray-200 group-hover:border-green-200 transition-all">
                      <span className="flex-grow">Initiate Protocol</span>
                      <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center text-white group-hover:bg-green-600 transition-all shadow-lg">
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </ClientMotionDiv>
          ))}
        </div>
      </div>
    </Section>
  );
}
