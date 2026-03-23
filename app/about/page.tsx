"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  ShieldCheck,
  Lock,
  UserCheck,
  Zap,
  Award,
  ArrowRight,
  Fingerprint,
  History,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui";
import Link from "next/link";

export default function AboutPage() {
  const corePrinciples = [
    {
      title: "ความลับคือที่สุด (Absolute Privacy)",
      description:
        "เรายึดถือความลับของลูกค้าเป็นอันดับหนึ่ง ข้อมูลทุกอย่างจะถูกจัดการภายใต้ระบบปิด และทำลายทิ้งทันทีเมื่อส่งมอบงานจบสิ้น",
      icon: <Lock className="w-6 h-6 text-green-600" />,
    },
    {
      title: "ลำดับชั้นการทำงาน (Professional Hierarchy)",
      description:
        "เมื่อเกิดการจ้างงาน เราคือลูกจ้างและคุณคือนายจ้าง เราทำงานตามคำสั่งและส่งมอบผลลัพธ์อย่างซื่อสัตย์ที่สุด",
      icon: <UserCheck className="w-6 h-6 text-blue-600" />,
    },
    {
      title: "ทีมงานระดับมืออาชีพ (Expert Team)",
      description:
        "เบื้องหลังการทำงานไม่ใช่คนเพียงคนเดียว แต่คือทีมงานผู้เชี่ยวชาญเฉพาะทางที่ผมมั่นใจว่าเก่งที่สุดในสายงานนี้",
      icon: <Users className="w-6 h-6 text-purple-600" />,
    },
  ];

  return (
    <div className="bg-white font-sans selection:bg-gray-900 selection:text-white">
      {/* Dynamic Background Accents - Subtly enhanced contrast */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-green-500/[0.07] rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[30%] bg-blue-500/[0.05] rounded-full blur-[100px]"></div>
      </div>

      {/* Hero Section: The Identity */}
      <header className="pt-48 pb-32 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center space-x-3 bg-gray-100 border border-gray-200 px-5 py-2.5 rounded-full mb-12 shadow-sm"
          >
            <History className="w-4 h-4 text-green-600" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-700">
              ESTABLISHED 2017 • 9TH YEAR EDITION
            </span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-end">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-6xl md:text-9xl font-black mb-12 tracking-tighter uppercase leading-[0.85] text-gray-900">
                JP-VISUAL <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-green-600">
                  & THE LEGACY.
                </span>
              </h1>
              <p className="text-2xl md:text-4xl font-black text-gray-900 uppercase italic tracking-widest mb-12 flex items-center">
                <span className="w-12 h-[3px] bg-green-500 mr-4"></span>
                BY. เจ้าป่า
              </p>
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed max-w-2xl font-semibold italic border-l-4 border-green-500 pl-8 bg-gray-50/50 py-4 rounded-r-2xl">
                &quot;ผมไม่ใช่คนเก่งที่สุด
                แต่ผมมั่นใจว่าทีมงานของผมทำงานได้ละเอียดและปลอดภัยที่สุดในวงการ
                ประสบการณ์ 9 ปีคือเครื่องยืนยัน&quot;
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="bg-gray-100 aspect-[4/3] rounded-[4rem] overflow-hidden relative shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] border border-gray-200">
                <Image
                  src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200"
                  alt="Security Infrastructure"
                  fill
                  className="object-cover opacity-80 grayscale-0 transition-all duration-[2s]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent"></div>
                <div className="absolute bottom-12 left-12 flex items-center space-x-6">
                  <div className="bg-gray-900 p-5 rounded-3xl shadow-xl border border-white/10">
                    <Fingerprint className="w-8 h-8 text-green-400" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                      System Integrity
                    </p>
                    <p className="text-sm font-black text-gray-900 uppercase tracking-tight">
                      JAOPRA-PROTOCOL-001
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      {/* The Pact: Employer-Employee Relationship */}
      <section className="py-32 bg-gray-100/50 border-y border-gray-200 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl">
            <h2 className="text-4xl md:text-6xl font-black mb-12 uppercase tracking-tight text-gray-900">
              สัญญาใจ{" "}
              <span className="text-green-600 italic font-black">
                และการร่วมงาน.
              </span>
            </h2>
            <div className="grid md:grid-cols-2 gap-16">
              <div className="space-y-10">
                <p className="text-xl text-gray-800 leading-relaxed font-bold">
                  &quot;ยินดีร่วมงานทุกสายวงการ ยินดีให้คำปรึกษาอย่างถูกต้อง
                  และคุณไม่ต้องกังวลว่าความลับของคุณจะรั่วไหล&quot;
                </p>
                <div className="h-[4px] w-24 bg-green-600 rounded-full"></div>
                <p className="text-lg text-gray-600 leading-relaxed italic font-medium">
                  &quot;เพราะเมื่อเกิดการจ้างงาน{" "}
                  <span className="text-gray-900 font-black underline decoration-green-500 decoration-4">
                    ผมเป็นลูกจ้างและคุณคือนายจ้าง
                  </span>{" "}
                  เมื่อจบงานทุกอย่างก็ไม่มีผลต่อกัน
                  ผมทำงานตามที่บริการส่วนคุณจะนำไปใช้อะไรต่อคือสิทธิ์ของคุณโดยสมบูรณ์&quot;
                </p>
              </div>
              <div className="relative p-12 bg-white rounded-[3.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-200 flex flex-col justify-center overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full -mr-16 -mt-16 transition-colors group-hover:bg-green-100"></div>
                <ShieldCheck className="w-16 h-16 text-green-600 mb-8 relative z-10" />
                <h3 className="text-2xl font-black mb-4 uppercase tracking-tight relative z-10 text-gray-900">
                  Zero-Trace Protocol
                </h3>
                <p className="text-gray-600 leading-relaxed font-semibold relative z-10">
                  ระบบการทำงานของเราถูกออกแบบมาเพื่อทำลายข้อมูลทันทีหลังส่งมอบ
                  เพื่อให้มั่นใจว่าไม่มีรอยเท้าดิจิทัลใดๆ
                  หลงเหลืออยู่ในระบบของเราหลังจบงาน
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Principles Grid */}
      <section className="py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-24">
            <div>
              <p className="text-[10px] font-black text-green-600 uppercase tracking-[0.4em] mb-4">
                Core Principles
              </p>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-gray-900">
                ค่านิยม <span className="text-gray-400">ที่เรายึดถือ.</span>
              </h2>
            </div>
            <div className="flex -space-x-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-12 h-12 rounded-full border-4 border-white bg-gray-200 overflow-hidden shadow-lg"
                >
                  <Image
                    src={`https://i.pravatar.cc/100?img=${i + 20}`}
                    alt="Team Expert"
                    width={48}
                    height={48}
                  />
                </div>
              ))}
              <div className="w-12 h-12 rounded-full border-4 border-white bg-gray-900 flex items-center justify-center text-[10px] text-white font-black shadow-xl">
                +12
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {corePrinciples.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-12 rounded-[3.5rem] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] transition-all duration-700 border border-gray-100 group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-full -mr-16 -mt-16 group-hover:bg-green-50 transition-colors duration-500"></div>
                <div className="w-16 h-16 bg-gray-900 text-white rounded-[1.5rem] flex items-center justify-center mb-10 group-hover:scale-110 transition-all duration-500 relative z-10 shadow-lg">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-black mb-6 uppercase tracking-tight relative z-10 text-gray-900">
                  {item.title}
                </h3>
                <p className="text-gray-700 leading-relaxed font-bold relative z-10">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* History & Stats */}
      <section className="pb-40 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gray-900 rounded-[5rem] p-12 md:p-24 text-white relative overflow-hidden shadow-[0_60px_120px_-30px_rgba(0,0,0,0.4)]">
            <div className="absolute top-0 right-0 w-[50%] h-full bg-green-500/20 blur-[100px] rounded-full -mr-20"></div>
            <div className="relative z-10 grid lg:grid-cols-2 gap-24 items-center">
              <div>
                <h2 className="text-5xl md:text-7xl font-black mb-10 tracking-tighter uppercase leading-none italic">
                  ยืนหยัดเข้าสู่ <br />
                  <span className="text-green-500 italic font-black">
                    ปีที่ 9.
                  </span>
                </h2>
                <p className="text-xl text-gray-300 leading-relaxed font-medium mb-12">
                  กาลเวลาพิสูจน์ความจริงใจ ชื่อของ &quot;เจ้าป่า&quot;
                  ยังคงยืนอยู่ที่เดิมไม่เปลี่ยนแปลง
                  ขณะที่เจ้าอื่นอาจล่วงหายตามกาลเวลา
                  เพราะความลับลูกค้าคือลมหายใจของเรา
                </p>
                <div className="flex flex-wrap gap-12">
                  <div>
                    <p className="text-5xl font-black mb-2 tracking-tighter text-white">
                      2.8K+
                    </p>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
                      Managed Assets
                    </p>
                  </div>
                  <div>
                    <p className="text-5xl font-black mb-2 tracking-tighter text-white">
                      100%
                    </p>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
                      Security Rate
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div className="aspect-square bg-white/10 rounded-[3.5rem] border border-white/20 flex flex-col items-center justify-center p-8 text-center group hover:bg-green-600 transition-all duration-500 shadow-2xl">
                  <Zap className="w-14 h-14 text-white mb-6 group-hover:scale-125 transition-transform" />
                  <p className="text-[10px] font-black uppercase tracking-[0.2em]">
                    Fast Track
                  </p>
                </div>
                <div className="aspect-square bg-white/10 rounded-[3.5rem] border border-white/20 flex flex-col items-center justify-center p-8 text-center mt-12 group hover:bg-blue-600 transition-all duration-500 shadow-2xl">
                  <Award className="w-14 h-14 text-white mb-6 group-hover:scale-125 transition-transform" />
                  <p className="text-[10px] font-black uppercase tracking-[0.2em]">
                    Certified
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="pb-40 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-8xl font-black mb-12 tracking-tighter uppercase leading-none text-gray-900">
            พร้อมเริ่มงาน <br />
            <span className="text-gray-300 italic">กับเราแล้วหรือยัง?</span>
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <Link href="/register" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto h-20 px-12 rounded-[2.5rem] bg-gray-900 text-white font-black uppercase tracking-widest text-sm shadow-[0_40px_80px_-15px_rgba(0,0,0,0.3)] hover:bg-green-600 transition-all duration-500 flex items-center space-x-4 border-none"
              >
                <span className="text-lg">ลงทะเบียนโปรโตคอล</span>
                <ArrowRight className="w-6 h-6" />
              </Button>
            </Link>
            <Link href="/#contact" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto h-20 px-12 rounded-[2.5rem] font-black uppercase tracking-widest text-sm border-2 border-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-500"
              >
                ปรึกษาความลับ
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
