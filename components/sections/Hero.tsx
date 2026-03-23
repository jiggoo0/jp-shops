"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronRight,
  Scan,
  ShieldCheck,
  Award,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui";

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative pt-32 pb-16 md:pt-56 md:pb-32 px-6 overflow-hidden bg-[#FDFDFD]">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-green-500/5 rounded-full blur-[150px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-[0%] right-[-10%] w-[50%] h-[50%] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
        {/* Left Content Stack */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-20"
        >
          <div className="inline-flex items-center space-x-3 bg-gray-100/80 backdrop-blur-md px-5 py-2.5 rounded-full mb-10 border border-gray-200/50 shadow-sm">
            <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-600">
              AI-Powered Global Trust Protocol
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-[7.5rem] font-black tracking-tighter leading-[0.82] mb-10 text-gray-900 uppercase">
            ยื่นที่ไหน <br />
            ก็ผ่านฉลุย <br />
            <span className="text-green-600 italic">มั่นใจ 100%.</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-500 mb-12 leading-relaxed max-w-lg font-medium italic">
            &quot;ปฏิวัติการจัดการเอกสารด้วยระบบ AI อัจฉริยะ
            ให้ทุกการยื่นสินเชื่อ วีซ่า และเอกสารสำคัญของคุณเป็นเรื่องง่าย
            งานเนียน ตรวจสอบได้จริงทั่วโลก&quot;
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <Link href="/register" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="group w-full h-24 px-12 rounded-[2rem] bg-gray-900 text-white shadow-[0_30px_60px_-12px_rgba(0,0,0,0.3)] hover:bg-green-600 transition-all duration-700 flex items-center justify-center space-x-6 border-none"
              >
                <div className="flex flex-col items-start">
                  <span className="font-black uppercase tracking-widest text-base">
                    เริ่มประเมินงานฟรี
                  </span>
                  <span className="text-[10px] opacity-60 font-medium">
                    AI Analysis Result in 5 Mins
                  </span>
                </div>
                <ChevronRight className="w-7 h-7 group-hover:translate-x-2 transition-transform duration-500" />
              </Button>
            </Link>

            <button
              onClick={() => scrollToSection("vifily")}
              className="flex items-center space-x-5 text-[10px] font-black uppercase tracking-[0.3em] hover:text-green-600 transition-all py-4 group"
            >
              <div className="w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-green-600 group-hover:bg-green-50 transition-all duration-500 shadow-sm">
                <Scan className="w-5 h-5" />
              </div>
              <span className="border-b border-transparent group-hover:border-green-600">
                วิธีตรวจสอบเอกสาร
              </span>
            </button>
          </div>

          {/* Social Proof Stack */}
          <div className="mt-20 flex flex-wrap items-center gap-12">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-16 h-16 rounded-full border-[6px] border-[#FDFDFD] overflow-hidden bg-gray-100 shadow-2xl relative z-10 transition-transform hover:scale-110 hover:z-20 duration-300"
                >
                  <Image
                    src={`https://i.pravatar.cc/150?img=${i + 35}`}
                    alt="Successful User"
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-center space-x-1.5 mb-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Award
                    key={i}
                    className="w-4 h-4 text-yellow-500 fill-yellow-500"
                  />
                ))}
              </div>
              <p className="font-black text-gray-900 uppercase tracking-[0.2em] text-[11px]">
                Trusted by 2,500+ Elite Clients
              </p>
              <p className="text-gray-400 text-[9px] font-bold uppercase tracking-[0.4em] mt-1">
                Verified Success Protocol
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right Stacked Image Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
          className="relative hidden lg:block"
        >
          {/* Main Card Frame */}
          <div className="relative rounded-[4rem] overflow-hidden shadow-[0_80px_150px_-30px_rgba(0,0,0,0.2)] border-[20px] border-white aspect-[4/5] z-10">
            <Image
              src="/hero-image.webp"
              alt="Elite Document Consultant"
              fill
              priority
              className="object-cover scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent"></div>

            {/* Content Overlay */}
            <div className="absolute bottom-12 left-12 right-12 bg-white/90 backdrop-blur-3xl p-12 rounded-[3.5rem] shadow-2xl border border-white/50 transform hover:-translate-y-2 transition-transform duration-700">
              <div className="flex items-center space-x-4 text-green-600 font-black text-[11px] uppercase tracking-[0.4em] mb-5">
                <ShieldCheck className="w-6 h-6" />
                <span>Elite Vifily Partner</span>
              </div>
              <h3 className="text-gray-900 text-2xl font-black leading-tight mb-6 italic uppercase tracking-tighter">
                &quot;ลดความเสี่ยงจากการถูกปฏิเสธ <br />
                ด้วยระบบตรวจสอบ AI 10 ขั้นตอน&quot;
              </h3>
              <div className="flex items-center justify-between pt-8 border-t border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                    System Protocol Online
                  </span>
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-900 bg-gray-50 px-3 py-1 rounded-lg">
                  v.16.2.1
                </span>
              </div>
            </div>
          </div>

          {/* Floating Element - Achievement */}
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-16 -right-16 bg-white p-10 rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border border-gray-50 flex items-center space-x-6 z-20"
          >
            <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center text-white shadow-xl rotate-3">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <p className="text-[11px] text-gray-400 font-black uppercase tracking-[0.3em] mb-1">
                Success Rate
              </p>
              <p className="text-4xl font-black text-gray-900 tracking-tighter italic">
                99.9%
              </p>
            </div>
          </motion.div>

          {/* Floating Element - Trust Badge */}
          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-10 -left-16 bg-gray-900 text-white p-8 rounded-[3rem] shadow-2xl flex items-center space-x-5 z-20 border-4 border-white"
          >
            <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-400">
                Verified By
              </p>
              <p className="text-sm font-black uppercase tracking-[0.1em]">
                Global Standards
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
