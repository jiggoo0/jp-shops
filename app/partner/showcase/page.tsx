"use client";

import { useState } from "react";
import { GoogleSearchReplica } from "@/components/showcase/GoogleSearchReplica";
import { BankReplica } from "@/components/showcase/BankReplica";
import { VisaPortalReplica } from "@/components/showcase/VisaPortalReplica";
import {
  ChevronLeft,
  Monitor,
  Smartphone,
  Globe,
  Landmark,
  ShieldCheck,
  Eye,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui";

type ShowcaseView = "google" | "bank" | "visa" | null;

export default function ShowcasePage() {
  const [activeView, setActiveView] = useState<ShowcaseView>(null);

  if (activeView === "google") {
    return (
      <div className="relative">
        <button
          onClick={() => setActiveView(null)}
          className="fixed bottom-8 right-8 z-[100] bg-black text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all flex items-center space-x-2 font-black uppercase tracking-widest text-[10px]"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Exit Showcase</span>
        </button>
        <GoogleSearchReplica />
      </div>
    );
  }

  if (activeView === "bank") {
    return (
      <div className="relative">
        <button
          onClick={() => setActiveView(null)}
          className="fixed bottom-8 right-8 z-[100] bg-black text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all flex items-center space-x-2 font-black uppercase tracking-widest text-[10px]"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Exit Showcase</span>
        </button>
        <BankReplica />
      </div>
    );
  }

  if (activeView === "visa") {
    return (
      <div className="relative">
        <button
          onClick={() => setActiveView(null)}
          className="fixed bottom-8 right-8 z-[100] bg-black text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all flex items-center space-x-2 font-black uppercase tracking-widest text-[10px]"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Exit Showcase</span>
        </button>
        <VisaPortalReplica />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-24 px-6 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="mb-20">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-1 bg-green-500 rounded-full"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">
              Capability Demonstration
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-gray-900 leading-[0.85] mb-8">
            High-Fidelity <br />
            <span className="text-gray-300 italic text-5xl md:text-7xl">
              Capability Showcase.
            </span>
          </h1>
          <p className="text-xl font-bold italic text-gray-600 max-w-2xl border-l-4 border-gray-200 pl-8 leading-relaxed">
            &quot;ความเชื่อถือไม่ได้สร้างด้วยคำพูด
            แต่สร้างด้วยหลักฐานเชิงประจักษ์&quot;
            สำรวจขีดความสามารถในการจำลองระบบสากลที่มีความซับซ้อนสูง
            เพื่อผลทางจิตวิทยาและความน่าเชื่อถือระดับสูงสุด
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Google Showcase */}
          <div
            onClick={() => setActiveView("google")}
            className="group cursor-pointer bg-white p-10 rounded-[3.5rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-700 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 group-hover:bg-blue-100 transition-colors"></div>
            <div className="w-16 h-16 bg-gray-900 text-white rounded-2xl flex items-center justify-center mb-10 group-hover:bg-blue-600 transition-all shadow-xl">
              <Globe className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black uppercase tracking-tight text-gray-900 mb-4 italic">
              Identity Presence
            </h3>
            <p className="text-gray-500 font-medium mb-10 text-sm leading-relaxed">
              จำลองหน้าผลการค้นหา Google พร้อม Knowledge Panel ระดับ Verified
              เพื่อโชว์พลังของการทำ Identity Farming และ SEO ขั้นสูง
            </p>
            <div className="flex items-center text-[10px] font-black uppercase tracking-widest text-gray-900 group-hover:text-blue-600 transition-colors">
              <span>Launch Mockup</span>
              <Monitor className="w-4 h-4 ml-2" />
            </div>
          </div>

          {/* Bank Showcase */}
          <div
            onClick={() => setActiveView("bank")}
            className="group cursor-pointer bg-white p-10 rounded-[3.5rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-700 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full -mr-16 -mt-16 group-hover:bg-green-100 transition-colors"></div>
            <div className="w-16 h-16 bg-gray-900 text-white rounded-2xl flex items-center justify-center mb-10 group-hover:bg-[#006b54] transition-all shadow-xl">
              <Landmark className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black uppercase tracking-tight text-gray-900 mb-4 italic">
              Financial Integrity
            </h3>
            <p className="text-gray-500 font-medium mb-10 text-sm leading-relaxed">
              จำลองหน้า Mobile Banking สำหรับการแสดงผลสินทรัพย์ (Asset View)
              ที่มีความเนียนระดับแอปพลิเคชันต้นฉบับ
            </p>
            <div className="flex items-center text-[10px] font-black uppercase tracking-widest text-gray-900 group-hover:text-[#006b54] transition-colors">
              <span>Launch Mockup</span>
              <Smartphone className="w-4 h-4 ml-2" />
            </div>
          </div>

          {/* Visa Showcase */}
          <div
            onClick={() => setActiveView("visa")}
            className="group cursor-pointer bg-white p-10 rounded-[3.5rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-700 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-full -mr-16 -mt-16 group-hover:bg-purple-100 transition-colors"></div>
            <div className="w-16 h-16 bg-gray-900 text-white rounded-2xl flex items-center justify-center mb-10 group-hover:bg-[#002d62] transition-all shadow-xl">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black uppercase tracking-tight text-gray-900 mb-4 italic">
              Visa Verification
            </h3>
            <p className="text-gray-500 font-medium mb-10 text-sm leading-relaxed">
              จำลองหน้า E-Service Tracking ของหน่วยงานระดับสากล แสดงสถานะ
              Approved/Active เพื่อการปิดงานขายเอกสารยื่นวีซ่า
            </p>
            <div className="flex items-center text-[10px] font-black uppercase tracking-widest text-gray-900 group-hover:text-[#002d62] transition-colors">
              <span>Launch Mockup</span>
              <Eye className="w-4 h-4 ml-2" />
            </div>
          </div>
        </div>

        <div className="mt-24 bg-gray-900 rounded-[4rem] p-12 md:p-20 text-white relative overflow-hidden shadow-2xl border-4 border-gray-800">
          <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/10 rounded-full blur-[100px] -mr-48 -mt-48"></div>
          <div className="relative z-10 max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-8">
              Need more <br />
              <span className="text-green-500 italic">Custom Protocol?</span>
            </h2>
            <p className="text-gray-400 text-xl font-bold italic mb-12 leading-relaxed border-l-4 border-green-500 pl-8">
              หากหน้าเว็บไซต์เป้าหมายที่คุณต้องการไม่มีในรายการนี้
              เราสามารถจำลองระบบใดๆ ในโลกนี้ให้คุณได้ 100%
              เพื่อตอบโจทย์กลยุทธ์เฉพาะด้านของคุณ
            </p>
            <Link href="https://line.me/ti/p/@462fqtfc" target="_blank">
              <Button className="h-20 px-12 bg-white text-gray-900 font-black uppercase tracking-[0.2em] text-xs hover:bg-green-500 hover:text-white transition-all rounded-[2rem] shadow-2xl flex items-center space-x-4">
                <span>Request Custom Replica</span>
                <MessageSquare className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-20 text-center">
          <Link
            href="/partner/dashboard"
            className="text-gray-400 font-black uppercase tracking-widest text-[10px] hover:text-gray-900 transition-colors flex items-center justify-center"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            <span>Return to Dashboard</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
