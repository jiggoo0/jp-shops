"use client";

import { Section } from "@/components/ui";
import { ClientMotionDiv } from "@/components/ui/ClientMotion";
import { Search, ShieldAlert, Cpu, CheckCircle2 } from "lucide-react";

const steps = [
  {
    icon: <Search className="w-8 h-8" />,
    title: "1. คัดกรองตัวตน (Selection)",
    description:
      "เลือกบุคคลหรือบริษัทที่คุณต้องการจากคลังข้อมูล 'เจ้าป่า' ทุกตัวตนถูกฟาร์มมาจน Google เชื่อถือระดับสูงสุด",
  },
  {
    icon: <ShieldAlert className="w-8 h-8" />,
    title: "2. ยืนยันสิทธิ์ (Authentication)",
    description:
      "ชำระเงินอัตโนมัติ (สำหรับขายปลีก) หรือคุยตรงกับเจ้าป่า (สำหรับงานใหญ่) เพื่อเตรียมการสวมสิทธิ์แบบเนียนกริบ",
  },
  {
    icon: <Cpu className="w-8 h-8" />,
    title: "3. ระบบสวมสิทธิ์ (Identity Swap)",
    description:
      "ทีมงานเบื้องหลังใช้เทคโนโลยี Vifily OS เปลี่ยนข้อมูลเดิมเป็นชื่อคุณ พร้อมยิง API สั่งให้ Google อัปเดตทันที",
  },
  {
    icon: <CheckCircle2 className="w-8 h-8" />,
    title: "4. การส่งมอบ (Final Delivery)",
    description:
      "รับลิงก์ยืนยันตัวตนดิจิทัลและไฟล์เอกสารเฉพาะทาง พร้อมใช้งานจริงใน 24 ชม. ตรวจสอบที่ไหนก็เจอความถูกต้อง",
  },
];

export function ProcessSection() {
  return (
    <Section className="bg-white py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <div className="inline-flex items-center space-x-3 mb-6">
            <div className="w-12 h-1 bg-gray-900 rounded-full"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">
              Operational Protocol
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-gray-900 leading-none">
            ขั้นตอนการทำงาน <br />
            <span className="text-gray-300 italic text-4xl md:text-6xl">
              THE CHAO PA PROCESS
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connector Line for Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 z-0"></div>

          {steps.map((step, index) => (
            <ClientMotionDiv
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative z-10"
            >
              <div className="bg-gray-50 p-10 rounded-[3rem] border border-gray-100 hover:border-green-500 transition-all duration-500 group h-full">
                <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mb-8 shadow-xl group-hover:bg-gray-900 group-hover:text-white transition-all group-hover:scale-110 group-hover:-rotate-6">
                  {step.icon}
                </div>
                <h3 className="text-xl font-black mb-4 uppercase tracking-tight text-gray-900">
                  {step.title}
                </h3>
                <p className="text-gray-600 font-bold italic text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </ClientMotionDiv>
          ))}
        </div>

        <div className="mt-24 bg-gray-900 p-12 rounded-[3.5rem] flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl">
          <div className="max-w-xl">
            <h4 className="text-2xl font-black text-white mb-4 uppercase tracking-tight">
              ทำไมต้องรอ? เริ่มต้นอาณาจักรของคุณวันนี้
            </h4>
            <p className="text-gray-400 font-bold italic text-sm">
              ทุกขั้นตอนถูกออกแบบมาเพื่อความปลอดภัยและความลับสูงสุด
              ข้อมูลของคุณจะถูกปกปิดเป็นความลับในระดับ Technical Layer
            </p>
          </div>
          <div className="flex space-x-4">
            <div className="bg-white/10 px-6 py-4 rounded-2xl border border-white/5 backdrop-blur-md">
              <span className="block text-green-500 text-xs font-black uppercase tracking-widest mb-1">
                Status
              </span>
              <span className="text-white text-lg font-black uppercase italic tracking-tighter">
                System Active
              </span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
