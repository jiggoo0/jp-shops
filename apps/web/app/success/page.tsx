"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle2,
  ShieldCheck,
  Mail,
  MessageSquare,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@jp-visual-docs/ui";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex flex-col items-center justify-center px-6 py-20 font-sans">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden"
      >
        <div className="bg-gray-900 p-12 text-center relative overflow-hidden">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12"></div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-6 shadow-xl shadow-green-500/20"
          >
            <CheckCircle2 className="w-10 h-10 text-white" />
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-black text-white mb-4 tracking-tight"
          >
            การชำระเงินสำเร็จ
          </motion.h1>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="inline-flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full border border-white/10"
          >
            <ShieldCheck className="w-4 h-4 text-green-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-gray-300">
              Transaction ID: {sessionId?.slice(-8).toUpperCase() || "VERIFIED"}
            </span>
          </motion.div>
        </div>

        <div className="p-10 md:p-16 space-y-10">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              ขอบคุณที่ไว้วางใจ JP Visual Docs
            </h2>
            <p className="text-gray-500 leading-relaxed max-w-md mx-auto">
              ระบบ AI ของเราได้รับคำขอของคุณแล้ว
              ทีมงานผู้เชี่ยวชาญจะเริ่มดำเนินการตรวจสอบและจัดเตรียมเอกสารทันที
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 group hover:border-gray-900 transition-colors">
              <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center mb-4 group-hover:bg-gray-900 group-hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">ตรวจสอบอีเมล</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                เราได้ส่งรายละเอียดการสั่งซื้อและขั้นตอนการรับงานไปยังอีเมลของคุณแล้ว
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 group hover:border-gray-900 transition-colors">
              <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center mb-4 group-hover:bg-gray-900 group-hover:text-white transition-colors">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">ฝ่ายบริการลูกค้า</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                หากมีข้อสงสัย สามารถติดต่อทีมงานผ่าน Line Official ได้ตลอด 24
                ชม.
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 flex flex-col items-center">
            <Link href="/" className="w-full">
              <Button size="lg" className="w-full py-4 rounded-xl group">
                <span>กลับไปที่หน้าหลัก</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <p className="mt-6 text-[10px] text-gray-400 font-bold uppercase tracking-widest flex items-center space-x-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>Our AI is processing your request with 100% precision</span>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
