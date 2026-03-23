"use client";

import Image from "next/image";
import { Section } from "@/components/ui";
import { ClientMotionDiv } from "@/components/ui/ClientMotion";
import { MessageCircle, ShieldCheck, Zap, ArrowUpRight } from "lucide-react";

export function ContactSection() {
  return (
    <Section
      id="contact"
      className="bg-white py-48 border-t border-gray-100 relative overflow-hidden"
    >
      {/* Background Decorative Accents */}
      <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-green-500/[0.03] rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <div className="flex flex-col items-center mb-24">
          <div className="w-20 h-2 bg-green-500 mb-12 rounded-full shadow-[0_0_15px_rgba(34,197,94,0.3)]"></div>
          <h2 className="text-6xl md:text-9xl font-black mb-10 tracking-tighter uppercase leading-[0.85] text-gray-900">
            ปรึกษา <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 italic">
              ผู้เชี่ยวชาญ.
            </span>
          </h2>
          <p className="text-gray-700 text-xl md:text-2xl mb-20 font-bold max-w-3xl mx-auto leading-relaxed italic bg-gray-50 px-8 py-4 rounded-[2rem] border border-gray-100">
            &quot;ทีมงานผู้เชี่ยวชาญพร้อมให้คำปรึกษาแบบส่วนตัวตลอด 24 ชั่วโมง
            เพื่อให้คุณได้รับบริการที่ดีที่สุดและปลอดภัยสูงสุด&quot;
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-16 items-center">
          {/* Left Column: Trust Signals */}
          <div className="lg:col-span-5 text-left hidden lg:block">
            <div className="space-y-12">
              {[
                {
                  icon: <ShieldCheck className="w-6 h-6" />,
                  title: "Confidentiality",
                  desc: "ข้อมูลของคุณจะถูกเก็บรักษาเป็นความลับสูงสุด",
                },
                {
                  icon: <Zap className="w-6 h-6" />,
                  title: "Real-time Support",
                  desc: "ทีมงานพร้อมตอบกลับและช่วยเหลือในทันที",
                },
                {
                  icon: <MessageCircle className="w-6 h-6" />,
                  title: "Expert Advice",
                  desc: "ปรึกษาฟรีด้วยประสบการณ์ในวงการกว่า 9 ปี",
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start space-x-6 group">
                  <div className="w-14 h-14 bg-gray-900 text-white rounded-2xl flex items-center justify-center shadow-lg group-hover:bg-green-600 transition-all duration-500">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-black uppercase tracking-widest text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm font-bold text-gray-500 italic leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: QR Card */}
          <div className="lg:col-span-7 flex justify-center lg:justify-end">
            <ClientMotionDiv
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative w-full max-w-[500px]"
            >
              {/* Card Decoration */}
              <div className="absolute -inset-10 bg-green-500/[0.07] rounded-full blur-[100px] animate-pulse"></div>

              <div className="flex flex-col items-center justify-center p-12 md:p-20 bg-white rounded-[4rem] border border-gray-100 shadow-[0_50px_150px_-30px_rgba(0,0,0,0.12)] relative z-10 group hover:shadow-[0_80px_200px_-30px_rgba(0,0,0,0.2)] transition-all duration-1000 border-b-[16px] border-b-gray-900 overflow-hidden">
                {/* Holographic light effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-gray-900/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1500ms] ease-in-out pointer-events-none"></div>

                <div className="w-64 h-64 md:w-80 md:h-80 mb-12 relative p-6 bg-gray-50 rounded-[4rem] border-2 border-white shadow-inner overflow-hidden group">
                  <Image
                    src="https://qr-official.line.me/gs/M_462fqtfc_GW.png?oat_content=qr"
                    alt="Line OA JP Visual Docs"
                    fill
                    className="relative z-10 rounded-[2.5rem] shadow-sm group-hover:scale-105 transition-transform duration-700 p-4"
                  />
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>

                <div className="inline-flex items-center bg-green-50 text-green-700 px-10 py-4 rounded-2xl text-[12px] font-black uppercase tracking-[0.3em] mb-10 border border-green-100 shadow-sm shadow-green-100/50">
                  ID: @462fqtfc
                </div>

                <div className="text-center">
                  <p className="font-black text-gray-900 text-4xl mb-4 tracking-tighter uppercase leading-none italic">
                    Line Official
                  </p>
                  <div className="flex items-center justify-center space-x-3 text-gray-400 group-hover:text-green-600 transition-colors">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em]">
                      Private Consultant 24/7
                    </p>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </ClientMotionDiv>
          </div>
        </div>
      </div>
    </Section>
  );
}
