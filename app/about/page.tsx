"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  ShieldCheck,
  Target,
  Zap,
  Cpu,
  Award,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Button, Section } from "@/components/ui";
import Link from "next/link";

export default function AboutPage() {
  const values = [
    {
      title: "ความแม่นยำสูงสุด (Precision)",
      description:
        "ใช้ระบบ AI วิเคราะห์และตรวจสอบข้อมูลเอกสารแบบ 10 ขั้นตอน เพื่อความถูกต้องแม่นยำ 100%",
      icon: <Target className="w-6 h-6 text-red-500" />,
    },
    {
      title: "ความปลอดภัยระดับสากล (Security)",
      description:
        "ข้อมูลพาร์ทเนอร์และลูกค้าจะถูกเข้ารหัสและทำลายทิ้งทันทีเมื่อจบกระบวนการ ไร้รอยเท้าดิจิทัล",
      icon: <ShieldCheck className="w-6 h-6 text-green-600" />,
    },
    {
      title: "นวัตกรรม Vifily (Innovation)",
      description:
        "ระบบ QR Code เฉพาะตัวที่ตรวจสอบสิทธิ์ได้จากทั่วโลก สร้าง Trust ในระดับที่ไม่มีใครเลียนแบบได้",
      icon: <Zap className="w-6 h-6 text-yellow-500" />,
    },
  ];

  return (
    <div className="bg-[#FDFDFD] font-sans">
      {/* Hero Section */}
      <header className="pt-48 pb-20 px-6 bg-gradient-to-b from-gray-50 to-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-green-500/5 blur-[120px] rounded-full -mr-20 -mt-20"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-3 bg-white px-6 py-2.5 rounded-full mb-10 shadow-sm border border-gray-100"
          >
            <Sparkles className="w-4 h-4 text-green-600" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600">
              The Legend Behind the Docs
            </span>
          </motion.div>
          <h1 className="text-6xl md:text-8xl font-black mb-10 tracking-tighter uppercase leading-[0.85]">
            ความเชื่อมั่น <br />
            <span className="text-gray-300 italic">
              คือสินทรัพย์ที่แพงที่สุด.
            </span>
          </h1>
          <p className="text-gray-400 text-xl md:text-2xl font-medium max-w-3xl mx-auto leading-relaxed italic">
            &quot;JP Visual Docs ไม่ได้ถือกำเนิดขึ้นเพียงเพื่อสร้างเอกสาร
            แต่เราสร้างขึ้นเพื่อทลายทุกกำแพงแห่งโอกาส ด้วยพลังแห่ง AI
            และความโปร่งใสทางเทคโนโลยี&quot;
          </p>
        </div>
      </header>

      {/* Philosophy Section */}
      <Section className="py-32">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black mb-8 uppercase tracking-tight">
              ปรัชญาของ <span className="text-green-600">เจ้าป่า.</span>
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-10 font-medium italic">
              ในโลกที่เอกสารเป็นเพียงกระดาษหรือไฟล์ดิจิทัล เรามองเห็นมันในฐานะ
              &quot;กุญแจสำคัญ&quot; ที่จะเปลี่ยนชีวิตผู้คน
              ไม่ว่าจะเป็นการยื่นวีซ่าเพื่อเริ่มต้นชีวิตใหม่ในต่างแดน
              หรือการขอสินเชื่อเพื่อสร้างธุรกิจ
            </p>
            <p className="text-gray-500 text-lg leading-relaxed mb-12 font-medium">
              เราจึงทุ่มเทพัฒนาเทคโนโลยี **Vifily Verification**
              เพื่อให้พาร์ทเนอร์ของเรามีอาวุธที่เหนือกว่า มั่นใจกว่า
              และทำงานได้อย่างเป็นมืออาชีพที่สุด ภายใต้มาตรฐานที่ Google AI
              และสถาบันทั่วโลกยอมรับ
            </p>
            <div className="flex items-center space-x-10">
              <div>
                <p className="text-4xl font-black text-gray-900 mb-1">2,500+</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                  Success Cases
                </p>
              </div>
              <div className="w-px h-12 bg-gray-100"></div>
              <div>
                <p className="text-4xl font-black text-gray-900 mb-1">100%</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                  AI Accuracy
                </p>
              </div>
            </div>
          </motion.div>

          <div className="relative">
            <div className="aspect-square bg-gray-900 rounded-[4rem] overflow-hidden shadow-2xl relative group">
              <Image
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000"
                alt="AI Infrastructure"
                fill
                className="object-cover opacity-40 group-hover:scale-110 transition-transform duration-[2s]"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-10">
                  <Cpu className="w-20 h-20 text-white mx-auto mb-8 animate-pulse" />
                  <p className="text-white font-black uppercase tracking-[0.4em] text-xs">
                    Vifily Intelligence Core
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-[3rem] shadow-2xl border border-gray-100 flex items-center space-x-5">
              <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center text-green-600">
                <Award className="w-8 h-8" />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">
                  Certified By
                </p>
                <p className="text-sm font-black text-gray-900 uppercase">
                  JP Visual Global
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Core Values Grid */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-4xl font-black uppercase tracking-tight mb-4">
              ค่านิยมหลักของเรา
            </h2>
            <div className="w-20 h-1.5 bg-gray-900 mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-12 rounded-[3rem] shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 group"
              >
                <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-10 group-hover:bg-gray-900 group-hover:text-white transition-all duration-500">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-black mb-6 uppercase tracking-tight">
                  {value.title}
                </h3>
                <p className="text-gray-500 leading-relaxed font-medium">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <Section className="py-40">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-black mb-12 tracking-tighter uppercase leading-none">
            พร้อมร่วมงานกับ <br />
            <span className="text-gray-300 italic">ตัวจริงหรือยัง?</span>
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <Link href="/register">
              <Button
                size="lg"
                className="h-20 px-12 rounded-[2rem] bg-gray-900 text-white font-black uppercase tracking-widest text-sm shadow-2xl hover:bg-green-600 transition-all flex items-center space-x-4"
              >
                <span>สมัครเป็นพาร์ทเนอร์</span>
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/#contact">
              <Button
                variant="outline"
                size="lg"
                className="h-20 px-12 rounded-[2rem] font-black uppercase tracking-widest text-sm"
              >
                ปรึกษาเราโดยตรง
              </Button>
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
}
