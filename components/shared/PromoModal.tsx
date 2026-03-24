"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Plane,
  ShieldCheck,
  Award,
  Globe,
  ArrowRight,
  Check,
  Hotel,
} from "lucide-react";
import Link from "next/link";

export function PromoModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // แสดง Pop-up หลังจากโหลดหน้าเว็บ 2 วินาที
    const timer = setTimeout(() => {
      const hasSeenPromo = sessionStorage.getItem("hasSeenPromo");
      if (!hasSeenPromo) {
        setIsOpen(true);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("hasSeenPromo", "true");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-gray-950/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-4xl bg-white rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-15px_rgba(0,0,0,0.5)] flex flex-col md:flex-row"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 z-10 p-2 bg-black/10 hover:bg-black/20 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-800" />
            </button>

            {/* Left Side: Image & Brand (The "Tai" Airline Identity) */}
            <div className="relative w-full md:w-1/2 h-64 md:h-auto bg-[#004D40]">
              {" "}
              {/* Emerald Green Base */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#004D40] to-[#002B24] opacity-90" />
              {/* Decorative Silk Pattern (Mockup) */}
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="w-full h-full border-[40px] border-white/20 rounded-full translate-x-1/2 translate-y-1/2" />
              </div>
              <div className="relative h-full p-12 flex flex-col justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20">
                    <Plane className="w-6 h-6 text-white rotate-45" />
                  </div>
                  <span className="text-2xl font-black tracking-tighter text-white uppercase italic">
                    SAIRKARNBIN <span className="text-emerald-400">TAI</span>
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="inline-flex items-center px-3 py-1 bg-white/10 rounded-full border border-white/10">
                    <span className="text-[8px] font-black uppercase tracking-[0.3em] text-emerald-300">
                      Platinum Class Experience
                    </span>
                  </div>
                  <h3 className="text-4xl md:text-5xl font-black text-white leading-none tracking-tighter uppercase italic">
                    European <br />
                    <span className="text-emerald-400 not-italic">
                      Grand Tour.
                    </span>
                  </h3>
                  <p className="text-white/60 text-xs font-bold uppercase tracking-widest leading-relaxed">
                    สัมผัสประสบการณ์การเดินทางระดับ 5 ดาว <br />
                    ด้วยมาตรฐานความปลอดภัย Unlink Global.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side: Details & CTA */}
            <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center">
              <div className="space-y-8">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
                    <Award className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                      Exclusive Offer
                    </p>
                    <p className="text-sm font-black text-gray-900">
                      Elite Booking Protocol v2.1
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-black text-gray-900 uppercase tracking-tight">
                    ทำไมต้องเลือก สายการบินไต?
                  </h4>
                  <ul className="space-y-3">
                    {[
                      "ระบบออกตั๋วเครื่องบินที่ตรวจสอบได้จริง (Verified)",
                      "เชื่อมต่อโรงแรมหรูในยุโรปแบบครบวงจร",
                      "การันตีความเป็นส่วนตัวระดับสถาบันการเงิน",
                      "Concierge ส่วนตัวดูแลตลอด 24 ชั่วโมง",
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="flex items-center space-x-3 text-xs font-bold text-gray-600"
                      >
                        <Check className="w-4 h-4 text-emerald-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-gray-100 flex flex-col gap-4">
                  <Link href="/booking/flights" onClick={handleClose}>
                    <button className="w-full py-5 bg-[#004D40] text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#00695C] transition-all shadow-2xl shadow-emerald-900/20 flex items-center justify-center group">
                      <span>ชมระบบจองสายการบิน</span>
                      <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-2 transition-transform" />
                    </button>
                  </Link>
                  <Link href="/booking/hotels" onClick={handleClose}>
                    <button className="w-full py-5 bg-white border-2 border-gray-900 text-gray-900 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-gray-900 hover:text-white transition-all flex items-center justify-center group">
                      <span>จองโรงแรม Grand Palais Paris</span>
                      <Hotel className="w-4 h-4 ml-3 group-hover:translate-x-2 transition-transform" />
                    </button>
                  </Link>
                </div>

                <div className="flex items-center justify-center space-x-6 grayscale opacity-30 mt-4">
                  <ShieldCheck className="w-8 h-8" />
                  <Globe className="w-8 h-8" />
                  <div className="text-[8px] font-black uppercase tracking-widest text-gray-900">
                    Unlink Verified
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
