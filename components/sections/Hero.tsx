"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, SearchCode, Lock, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui";

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-40 px-6 overflow-hidden bg-white">
      {/* Ultra-Modern Background Accents */}
      <div className="absolute top-0 right-0 w-[60%] h-screen bg-gradient-to-b from-green-50/30 to-transparent -z-10 blur-[120px]"></div>
      <div className="absolute -bottom-20 -left-20 w-[40%] h-[40%] bg-blue-50/20 rounded-full blur-[100px] -z-10"></div>

      {/* Decorative Grid Pattern */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02] -z-10"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left Column: Typography & Content */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 bg-gray-100 border border-gray-200 px-4 py-2 rounded-full mb-8 shadow-sm"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-700">
                JP-VISUAL&DOCS Exclusive Protocol
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-5xl md:text-8xl lg:text-[7.5rem] font-black tracking-tight leading-[0.85] mb-8 text-gray-900 uppercase">
                JP-VISUAL
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-700 to-green-600">
                  &DOCS.
                </span>
              </h1>

              <div className="flex items-center space-x-4 mb-12">
                <div className="h-[3px] w-16 bg-green-500 rounded-full"></div>
                <span className="text-2xl md:text-4xl font-black tracking-[0.1em] text-gray-900 uppercase italic">
                  BY. เจ้าป่า
                </span>
              </div>

              <div className="max-w-2xl space-y-6 mb-16">
                <p className="text-xl md:text-2xl text-gray-800 leading-relaxed font-bold border-l-4 border-green-500 pl-6 bg-gray-50/50 py-2 rounded-r-xl">
                  &quot;ยินดีร่วมงานทุกสายวงการ พร้อมให้คำปรึกษาอย่างถูกต้อง
                  <span className="text-gray-900 font-black ml-2 underline decoration-green-500 decoration-4">
                    คุณไม่ต้องกังวลเรื่องความลับ
                  </span>
                  &quot;
                </p>
                <p className="text-lg text-gray-700 leading-relaxed italic font-bold">
                  &quot;เพราะเมื่อเกิดการจ้างงาน{" "}
                  <span className="text-gray-900 font-black underline decoration-gray-300">
                    ผมคือลูกจ้างและคุณคือนายจ้าง
                  </span>{" "}
                  เมื่อจบงานทุกอย่างถือเป็นที่สิ้นสุด
                  ผมทำหน้าที่ส่งมอบบริการส่วนสิทธิ์ในการนำไปใช้งานคือของคุณ 100%
                  โดยไม่มีข้อผูกมัดย้อนหลัง&quot;
                </p>

                {/* Team Confidence Note */}
                <div className="pt-4 flex items-center space-x-4">
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden shadow-md"
                      >
                        <Image
                          src={`https://i.pravatar.cc/100?img=${i + 10}`}
                          alt="Team Expert"
                          width={40}
                          height={40}
                        />
                      </div>
                    ))}
                    <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-900 flex items-center justify-center text-[10px] text-white font-black shadow-lg">
                      +12
                    </div>
                  </div>
                  <p className="text-sm md:text-lg text-gray-600 font-bold italic">
                    &quot;ผมไม่ใช่คนเก่ง แต่ผมมั่นใจว่า
                    <span className="text-gray-900 font-black ml-1 text-xl underline decoration-green-500/30">
                      ทีมงานผมเก่งมาก
                    </span>
                    &quot;
                  </p>
                </div>
              </div>

              {/* Action Suite */}
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <Link href="/register" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="group w-full sm:w-[280px] h-20 rounded-2xl bg-gray-900 text-white hover:bg-green-600 transition-all duration-500 flex items-center justify-between px-8 border-none shadow-2xl shadow-gray-900/20"
                  >
                    <div className="flex flex-col items-start">
                      <span className="font-bold uppercase tracking-widest text-sm">
                        เริ่มงานโปรโตคอล
                      </span>
                      <span className="text-[9px] text-white/40 uppercase tracking-tighter">
                        Initiate Contract
                      </span>
                    </div>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </Button>
                </Link>

                <button
                  onClick={() => scrollToSection("vifily")}
                  className="w-full sm:w-auto flex items-center justify-center space-x-4 px-8 py-6 rounded-2xl border-2 border-gray-100 bg-white hover:border-green-200 hover:bg-green-50/30 transition-all group shadow-sm"
                >
                  <SearchCode className="w-5 h-5 text-gray-900 group-hover:text-green-600" />
                  <span className="text-xs font-black uppercase tracking-widest text-gray-900">
                    ตรวจสอบเอกสาร (Vifily)
                  </span>
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Visual Trust & Profile (Compact Digital Business Card) */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="relative perspective-1000 w-full max-w-[380px]"
            >
              {/* Main Profile Card - Digital ID Style */}
              <div className="bg-white border border-gray-100 p-2 rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.12)] relative z-10 overflow-hidden group hover:shadow-[0_80px_150px_-30px_rgba(0,0,0,0.2)] transition-all duration-1000">
                {/* Internal Card Structure */}
                <div className="bg-gray-50/50 rounded-[2rem] p-6 md:p-8 border border-white relative overflow-hidden">
                  {/* Security Pattern Overlay */}
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/micro-carbon.png')] opacity-[0.03] pointer-events-none"></div>

                  {/* Card Header: Logo & Status */}
                  <div className="flex justify-between items-start mb-8 relative z-10">
                    <div className="bg-gray-900 p-2.5 rounded-xl shadow-lg">
                      <ShieldCheck className="w-4 h-4 text-green-400" />
                    </div>
                    <div className="text-right">
                      <div className="flex items-center justify-end space-x-1.5 mb-1">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"></span>
                        <p className="text-[8px] font-black text-gray-900 uppercase tracking-widest">
                          Verified Elite
                        </p>
                      </div>
                      <p className="text-[7px] font-black text-gray-400 uppercase tracking-tighter">
                        ID: #เจ้าป่า-2026
                      </p>
                    </div>
                  </div>

                  {/* Profile Image with Ring Effect */}
                  <div className="relative w-32 h-32 mx-auto mb-8 group">
                    <div className="absolute inset-0 bg-green-500 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-1000"></div>
                    <div className="relative w-full h-full rounded-full overflow-hidden border-[6px] border-white shadow-xl z-10 transition-transform duration-1000 group-hover:scale-105">
                      <Image
                        src="/hero-image.webp"
                        alt="เจ้าป่า-The-Architect"
                        fill
                        priority
                        className="object-cover"
                      />
                    </div>
                    {/* Security Ring */}
                    <div className="absolute -inset-1.5 border border-dashed border-gray-200 rounded-full animate-[spin_20s_linear_infinite]"></div>
                  </div>

                  {/* Information Grid */}
                  <div className="text-center mb-6 relative z-10">
                    <h3 className="text-2xl font-black text-gray-900 tracking-tight mb-1 uppercase italic">
                      เจ้าป่า
                    </h3>
                    <p className="text-[9px] font-black text-green-600 uppercase tracking-[0.4em] mb-4">
                      Service Architect
                    </p>

                    <div className="flex items-center justify-center space-x-2 bg-white py-2.5 px-4 rounded-xl border border-gray-200 shadow-sm">
                      <Lock className="w-2.5 h-2.5 text-green-600" />
                      <span className="text-[8px] font-black text-gray-900 uppercase tracking-widest leading-none">
                        Privacy Protocol Active
                      </span>
                    </div>
                  </div>

                  {/* Card Footer: Metadata */}
                  <div className="grid grid-cols-2 gap-4 pt-5 border-t border-gray-200 relative z-10">
                    <div className="space-y-0.5">
                      <p className="text-[7px] font-black text-gray-400 uppercase">
                        Privacy Class
                      </p>
                      <p className="text-[9px] font-black text-gray-900 uppercase tracking-wider">
                        Tier-1 / Secure
                      </p>
                    </div>
                    <div className="space-y-0.5 text-right">
                      <p className="text-[7px] font-black text-gray-400 uppercase">
                        Integrity
                      </p>
                      <p className="text-[9px] font-black text-green-600 uppercase tracking-wider">
                        99.9% Reliable
                      </p>
                    </div>
                  </div>
                </div>

                {/* Holographic Reflection Layer */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1500ms] ease-in-out pointer-events-none"></div>
              </div>

              {/* Decorative Elements around the Card */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-green-500/10 rounded-full blur-3xl -z-10"></div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-blue-500/10 rounded-full blur-3xl -z-10"></div>
            </motion.div>
          </div>
        </div>

        {/* Footer Protocol Stack: Redesigned for Digital Trust */}
        <div className="mt-32 pt-16 border-t border-gray-100">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            {/* Live Verified Partners (From Extracted Data) */}
            <div className="flex flex-col space-y-6">
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] mb-2">
                Verified Partners Protocol
              </p>
              <div className="flex items-center space-x-10">
                <div className="flex -space-x-4">
                  {[
                    { name: "สุภาพบุรุษ รองเท้าแตะ", img: 50 },
                    { name: "Baimon Kandarat", img: 51 },
                    { name: "วรสรดา ตรีเมฆ", img: 52 },
                    { name: "James Ktown", img: 53 },
                  ].map((partner, i) => (
                    <div
                      key={i}
                      className="group relative w-16 h-16 rounded-2xl border-4 border-white overflow-hidden bg-gray-100 shadow-xl transition-all hover:-translate-y-2 hover:z-20 duration-500"
                    >
                      <Image
                        src={`https://i.pravatar.cc/200?img=${partner.img}`}
                        alt={partner.name}
                        fill
                        className="object-cover"
                      />
                      {/* Hover Name Badge */}
                      <div className="absolute inset-0 bg-gray-900/80 opacity-0 group-hover:opacity-100 flex items-center justify-center p-2 transition-opacity">
                        <span className="text-[6px] text-white font-black uppercase text-center">
                          {partner.name}
                        </span>
                      </div>
                    </div>
                  ))}
                  <div className="w-16 h-16 rounded-2xl border-4 border-white bg-gray-900 flex items-center justify-center shadow-xl relative z-10">
                    <span className="text-xs font-black text-white">+2.8K</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center space-x-1 mb-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className="w-3 h-3 bg-yellow-400 rounded-sm rotate-45 shadow-[0_0_10px_rgba(250,204,21,0.5)]"
                      ></div>
                    ))}
                  </div>
                  <p className="text-2xl font-black text-gray-900 tracking-tighter italic leading-none mb-1">
                    Elite Reputation
                  </p>
                  <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">
                    Global Assets Secured
                  </p>
                </div>
              </div>
            </div>

            {/* System Integrity Monitor */}
            <div className="flex items-center space-x-8 bg-gray-900 px-8 py-6 rounded-[2rem] border border-gray-800 shadow-2xl">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center shadow-inner border border-white/5">
                <Zap className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest leading-none">
                    Status:
                  </span>
                  <span className="text-[9px] font-black text-green-400 uppercase tracking-widest leading-none">
                    Protocol Secure
                  </span>
                </div>
                <p className="text-xs font-black text-white uppercase tracking-[0.2em] flex items-center">
                  <span className="w-2.5 h-2.5 bg-green-500 rounded-full mr-3 animate-ping"></span>
                  Vifily Real-time Node
                </p>
              </div>
            </div>

            {/* Service Status Hash */}
            <div className="hidden lg:flex flex-col items-end">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] mb-2 text-right">
                Service Hash ID
              </p>
              <div className="font-mono text-[9px] font-bold text-gray-500 bg-gray-50 px-4 py-2 rounded-xl border border-gray-200 shadow-inner">
                SYSTEM_ACTIVE::PRIVACY_ENFORCED
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
