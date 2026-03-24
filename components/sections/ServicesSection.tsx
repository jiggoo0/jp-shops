"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Briefcase,
  FileSignature,
  ShieldCheck,
  CreditCard,
  ChevronRight,
  ArrowRight,
  Plane,
} from "lucide-react";

import { Button, Card, Section } from "@/components/ui";
import { ClientMotionDiv } from "@/components/ui/ClientMotion";

const services = [
  {
    id: "specialist",
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "บุคคลคุณภาพพร้อมใช้ (Expertise Profile)",
    description:
      "Identity Farming: บริการสร้างตัวตนที่มีความเชี่ยวชาญสูง (High-Authority) พร้อมประวัติการทำงานย้อนหลังสูงสุด 9 ปี บนระบบค้นหา Google Search ภายใต้มาตรฐานการรับรอง UNLINK-GLOBAL Verified Entity เพื่อสร้างความน่าเชื่อถือสูงสุดในการทำธุรกรรมหรือยื่นเอกสารสำคัญระดับสากล",
    image: "/unlink-verification.webp",
    priceHint: "เริ่มต้น 15,900.-",
    showSeal: true,
  },
  {
    id: "vifily",
    icon: <Briefcase className="w-6 h-6" />,
    title: "นิติบุคคลพรีเมียม (Corporate Assets)",
    description:
      "Enterprise Asset: จัดหาและบริหารจัดการโครงสร้างบริษัทที่มีความสมบูรณ์ทางกฎหมาย มีประวัติผลงาน (Portfolio) ที่จับต้องได้ และได้รับตราสัญลักษณ์ UNLINK Trust Level 3 เพื่อยืนยันความมั่นคงของสถานะนิติบุคคลสำหรับการร่วมทุนหรือขยายธุรกิจในระดับ Global Market",
    image: "/service-loan.webp",
    priceHint: "เริ่มต้น 55,000.-",
  },
  {
    id: "premium-card",
    icon: <FileSignature className="w-6 h-6" />,
    title: "อาณาจักรธุรกิจสำเร็จรูป (Identity Matching)",
    description:
      "Business Combo Protocol: บริการเชื่อมโยง 'บุคคลคุณภาพ' เข้ากับ 'นิติบุคคลพรีเมียม' เพื่อสร้างโครงข่ายธุรกิจ (UNLINK Network) ที่มีความน่าเชื่อถือระดับสูงสุด พร้อมการันตีการขึ้นสถานะ Verified Entity บน Google Knowledge Panel อย่างเป็นทางการ เพื่อการเข้าถึงโอกาสทางธุรกิจที่เหนือกว่า",
    image: "/blog-unlink.webp",
    priceHint: "เริ่มต้น 85,000.-",
    showSeal: true,
  },
  {
    id: "flight_ticket",
    icon: <Plane className="w-6 h-6" />,
    title: "ตั๋วและที่พัก (Global Travel Protocol)",
    description:
      "Travel Verification System: ระบบสร้างเอกสารจำลองตั๋วเครื่องบินและบุ๊กกิ้งโรงแรม 100% จากสายการบินและโรงแรมชั้นนำทั่วโลก พร้อมระบบ QR Code สำหรับสแกนตรวจสอบสถานะแบบ Real-time ผ่าน UNLINK-GLOBAL เหมาะสำหรับการใช้ประกอบการวางแผนการเดินทางหรือการยืนยันสถานะที่พักอย่างมืออาชีพ",
    image: "/service-visa.webp",
    priceHint: "เริ่มต้น 500.-",
  },
];
export function ServicesSection() {
  const handleOpenCheckout = (serviceId: string) => {
    // บริการขายปลีก -> ใช้ระบบชำระเงินอัตโนมัติ
    if (serviceId === "individual") {
      const event = new CustomEvent("open-checkout", { detail: { serviceId } });
      window.dispatchEvent(event);
    }
    // บริการมูลค่าสูง (บริษัท / จับคู่ / งานเทคนิค) -> ติดต่อไลน์เพื่อจบงานขายเอง
    else {
      window.open("https://line.me/ti/p/@462fqtfc", "_blank");
    }
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-32">
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
                    <div className="absolute top-6 right-6 bg-gray-900/90 backdrop-blur-md px-6 py-2 rounded-full shadow-2xl">
                      <span className="text-white text-[10px] font-black uppercase tracking-widest leading-none">
                        {service.priceHint}
                      </span>
                    </div>
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

                    {/* UNLINK-GLOBAL VERIFICATION SEAL (If applicable) */}
                    {service.showSeal && (
                      <div className="mb-10 p-6 bg-gray-50 rounded-[2.5rem] border border-gray-100 flex items-center space-x-6 group-hover:bg-white transition-all">
                        <a
                          href="https://www.unlink-th.com/verify/c/c-001"
                          target="_blank"
                          rel="noopener follow"
                          title="JP Visual Docs Verified by UNLINK-GLOBAL"
                          className="flex items-center space-x-4"
                        >
                          <Image
                            src="https://www.unlink-th.com/branding/verify-badge.webp"
                            alt="Verified Entity"
                            width={120}
                            height={120}
                            className="w-16 h-auto filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.1)]"
                          />
                          <div className="flex flex-col">
                            <span className="text-[11px] font-black uppercase tracking-[1px] text-gray-900 leading-none">
                              Verified Entity
                            </span>
                            <span className="text-[9px] font-bold uppercase tracking-widest text-[#64748b] mt-1">
                              Unlink-Global Protocol
                            </span>
                          </div>
                        </a>
                      </div>
                    )}

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

        {/* Takeover Section */}
        <ClientMotionDiv
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative bg-gray-900 rounded-[4rem] p-12 md:p-24 overflow-hidden shadow-[0_100px_150px_-30px_rgba(0,0,0,0.5)] border-4 border-gray-800"
        >
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"></div>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="flex items-center space-x-4 mb-10">
                <div className="w-12 h-1 bg-green-500 rounded-full"></div>
                <span className="text-green-500 text-[10px] font-black uppercase tracking-[0.4em]">
                  Exclusive Investment Opportunity
                </span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black text-white mb-10 leading-[0.85] uppercase tracking-tighter">
                Takeover <br />
                <span className="text-gray-500 italic">This System.</span>
              </h2>
              <p className="text-gray-300 text-xl font-bold leading-relaxed mb-12 italic border-l-4 border-green-500 pl-8">
                &quot;คุณหาไอเดีย... เราเป็นโรงงานผลิตให้เอง&quot;
                โมเดลธุรกิจที่ออกแบบมาเพื่อส่งมอบอาณาจักรเจ้าป่าให้คุณบริหารจัดการ
                100% พร้อมทีมซัพพอร์ตเบื้องหลังที่ไร้ขีดจำกัด
              </p>

              <div className="space-y-6 mb-16">
                <div className="flex items-start space-x-6 bg-white/5 p-6 rounded-3xl border border-white/10">
                  <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center text-gray-900 shrink-0 shadow-[0_0_20px_rgba(34,197,94,0.5)]">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-white font-black text-lg uppercase tracking-tight mb-2">
                      Exclusive Support 100%
                    </h4>
                    <p className="text-gray-400 text-sm font-bold italic">
                      เราจะไม่เปิดแข่งกับคุณ ไม่รับงานเจ้าอื่น
                      ซัพพอร์ตคุณเพียงผู้เดียวแบบ Win-Win
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-6 bg-white/5 p-6 rounded-3xl border border-white/10">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gray-900 shrink-0">
                    <CreditCard className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-white font-black text-lg uppercase tracking-tight mb-2">
                      Buy-Back Guarantee
                    </h4>
                    <p className="text-gray-400 text-sm font-bold italic">
                      มีทางลงที่ปลอดภัย หากไปต่อไม่ได้ตามระยะเวลาที่กำหนด
                      เรายินดีรับซื้อระบบคืน
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border-2 border-red-500/20 p-8 rounded-[2rem] mb-12">
                <p className="text-red-400 text-xs font-black uppercase tracking-widest leading-relaxed">
                  ⚠️ [WARNING] ข้อมูลเชิงลึกมีมูลค่ามหาศาล หากไม่มีเงินทุน...
                  ไม่ต้องพยายามติดต่อมา
                  เราไม่มีการให้ข้อมูลฟรีสำหรับผู้ที่ต้องการแค่ความอยากรู้อยากเห็น
                  จำไว้.
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-white p-12 rounded-[4rem] shadow-2xl w-full text-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-green-500 translate-y-[110%] group-hover:translate-y-0 transition-transform duration-700"></div>
                <div className="relative z-10">
                  <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em] mb-4 group-hover:text-white transition-colors">
                    Starting Takeover From
                  </p>
                  <p className="text-7xl font-black text-gray-900 mb-2 group-hover:text-white transition-colors">
                    250K
                  </p>
                  <p className="text-xl font-black text-gray-900 uppercase tracking-tighter group-hover:text-white transition-colors mb-12">
                    Thai Baht
                  </p>
                  <Link href="https://line.me/ti/p/@462fqtfc">
                    <Button className="w-full h-24 rounded-[2rem] bg-gray-900 text-white font-black uppercase tracking-[0.2em] group-hover:bg-white group-hover:text-gray-900 transition-all shadow-2xl">
                      Access Investment Protocol
                    </Button>
                  </Link>
                </div>
              </div>
              <p className="mt-8 text-gray-500 text-[10px] font-black uppercase tracking-widest italic">
                *จำกัดจำนวนพาร์ทเนอร์ต่อเดือนเพื่อคุณภาพสูงสุด
              </p>
            </div>
          </div>
        </ClientMotionDiv>
      </div>
    </Section>
  );
}
