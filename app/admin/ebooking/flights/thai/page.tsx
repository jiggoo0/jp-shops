"use client";

import { motion } from "framer-motion";
import {
  Plane,
  Calendar,
  ShieldCheck,
  Globe,
  MapPin,
  Award,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function ThaiFlightPage() {
  const [tripType, setTripType] = useState("round-trip");

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-[#004D40] selection:text-white">
      {/* 🇹🇭 Thai Style Navbar - Emerald & Gold Theme */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-[100] py-4 px-6 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-10">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 bg-[#004D40] rounded-full flex items-center justify-center text-white shadow-xl group-hover:rotate-12 transition-transform duration-500">
                <Plane className="w-7 h-7 fill-current" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tighter text-[#004D40] leading-none">
                  SAIRKARNBIN <span className="italic text-[#827717]">TAI</span>
                </span>
                <span className="text-[8px] font-black uppercase tracking-[0.4em] text-gray-400">
                  Vifily Thai Palace Standard
                </span>
              </div>
            </Link>
            <div className="hidden lg:flex items-center space-x-8 text-[11px] font-black uppercase tracking-widest text-gray-500">
              <Link
                href="#"
                className="text-[#004D40] border-b-2 border-[#004D40] pb-1"
              >
                จองเที่ยวบิน
              </Link>
              <Link href="#" className="hover:text-[#004D40] transition-colors">
                จัดการการเดินทาง
              </Link>
              <Link href="#" className="hover:text-[#004D40] transition-colors">
                รอยัล เอมเมอรัลด์ คลับ
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-gray-400">
              <Globe className="w-4 h-4" />
              <span>ภาษาไทย | THB</span>
            </div>
            <button className="bg-[#004D40] text-white px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-[#00332C] transition-all shadow-lg shadow-emerald-900/20">
              เข้าสู่ระบบ
            </button>
          </div>
        </div>
      </nav>

      {/* Hero & Search Widget - Inspired by Thai Airways */}
      <div className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=2000"
            alt="Thailand Travel"
            fill
            className="object-cover brightness-75 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-white"></div>
        </div>

        <div className="relative z-10 max-w-7xl w-full px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-tight drop-shadow-2xl">
              สัมผัสความอบอุ่น <br />
              <span className="text-[#C0CA33] italic">
                เหนือระดับในทุกเที่ยวบิน.
              </span>
            </h1>
          </motion.div>

          {/* Deconstructed Booking Widget */}
          <div className="bg-white p-3 rounded-[2.5rem] shadow-[0_40px_100px_-15px_rgba(0,0,0,0.3)] border border-white">
            <div className="flex space-x-6 px-8 py-4 border-b border-gray-100">
              {["ไป-กลับ", "เที่ยวเดียว", "หลายเมือง"].map((t, i) => (
                <button
                  key={i}
                  onClick={() => setTripType(t)}
                  className={`text-[11px] font-black uppercase tracking-widest transition-all ${tripType === t ? "text-[#004D40] border-b-2 border-[#004D40] pb-1" : "text-gray-400 hover:text-gray-600"}`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 p-3 mt-2">
              <div className="lg:col-span-5 grid grid-cols-2 gap-3">
                <div className="bg-gray-50 p-6 rounded-3xl flex items-center space-x-4 group hover:bg-white hover:shadow-inner border border-transparent hover:border-gray-100 transition-all cursor-pointer">
                  <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center text-[#004D40]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">
                      ต้นทาง
                    </p>
                    <p className="font-black text-gray-900 text-lg uppercase tracking-tight">
                      กรุงเทพฯ (BKK)
                    </p>
                  </div>
                </div>
                <div className="bg-gray-50 p-6 rounded-3xl flex items-center space-x-4 group hover:bg-white hover:shadow-inner border border-transparent hover:border-gray-100 transition-all cursor-pointer">
                  <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center text-[#004D40]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">
                      ปลายทาง
                    </p>
                    <p className="font-black text-gray-400 text-lg uppercase tracking-tight">
                      คุณจะไปไหน?
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 bg-gray-50 p-6 rounded-3xl flex items-center space-x-4">
                <Calendar className="w-6 h-6 text-gray-400" />
                <div className="flex-1 text-left">
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">
                    วันที่เดินทาง
                  </p>
                  <span className="font-black text-sm text-gray-900">
                    24 เม.ย. 2026 — 01 พ.ค. 2026
                  </span>
                </div>
              </div>

              <button className="lg:col-span-3 bg-[#004D40] text-white rounded-3xl font-black uppercase tracking-widest text-lg hover:bg-[#00332C] transition-all shadow-xl flex items-center justify-center group py-6 lg:py-0">
                <span>ค้นหาเที่ยวบิน</span>
                <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Special Offers Section */}
      <section className="py-32 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 px-4">
          <div>
            <span className="text-[#004D40] text-[10px] font-black uppercase tracking-[0.4em]">
              Special Offers
            </span>
            <h2 className="text-4xl font-black tracking-tighter uppercase text-gray-900 mt-2">
              ข้อเสนอสุดพิเศษ.
            </h2>
          </div>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-xs underline decoration-[#004D40] underline-offset-8 cursor-pointer">
            ดูทั้งหมด
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              city: "London",
              price: "25,900",
              img: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=800",
            },
            {
              city: "Paris",
              price: "28,400",
              img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=800",
            },
            {
              city: "Tokyo",
              price: "18,200",
              img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -15 }}
              className="bg-white rounded-[3rem] overflow-hidden shadow-2xl shadow-emerald-900/5 border border-gray-100 group"
            >
              <div className="relative h-64">
                <Image
                  src={item.img}
                  alt={item.city}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full shadow-xl">
                  <span className="text-[10px] font-black uppercase text-[#004D40]">
                    Best Offer
                  </span>
                </div>
              </div>

              <div className="p-10">
                <h3 className="text-2xl font-black uppercase tracking-tight text-gray-900 mb-2">
                  {item.city}
                </h3>
                <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-8">
                  สัมผัสประสบการณ์เหนือระดับ
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-none">
                      เริ่มต้นที่
                    </p>
                    <p className="text-2xl font-black text-[#004D40] tracking-tighter">
                      ฿{item.price}
                    </p>
                  </div>
                  <button className="w-12 h-12 bg-gray-900 text-white rounded-2xl flex items-center justify-center hover:bg-[#004D40] transition-colors">
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Mock Search Results (To make it look like a real system) */}
      <section className="bg-gray-50 py-24 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-3xl font-black uppercase tracking-tight text-[#004D40]">
              เที่ยวบินที่ค้นหา (Mock Results)
            </h2>
            <p className="text-gray-500 font-medium mt-2">
              ผลการค้นหาเที่ยวบินเส้นทางหลัก เพื่อความสมจริงในการใช้งานระบบ
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                airline: "SAIRKARNBIN TAI",
                flight: "TG 930",
                route: "BKK - CDG",
                time: "00:05 - 07:10",
                duration: "12h 05m",
                type: "บินตรง (Direct)",
                price: "฿ 42,500",
                class: "Economy",
                logo: "✈️",
              },
              {
                airline: "KLM Royal Dutch",
                flight: "KL 876",
                route: "BKK - AMS",
                time: "12:15 - 18:30",
                duration: "11h 15m",
                type: "บินตรง (Direct)",
                price: "฿ 38,750",
                class: "Economy",
                logo: "🌐",
              },
              {
                airline: "Emirates",
                flight: "EK 385",
                route: "BKK - DXB",
                time: "01:35 - 04:45",
                duration: "6h 10m",
                type: "แวะพัก 1 จุด (1 Stop)",
                price: "฿ 28,900",
                class: "Economy",
                logo: "🦅",
              },
            ].map((flight, idx) => (
              <div
                key={idx}
                className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center space-x-6 w-full md:w-auto">
                  <div className="w-16 h-16 bg-[#004D40]/5 rounded-2xl flex items-center justify-center text-2xl">
                    {flight.logo}
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-gray-900 uppercase tracking-tight">
                      {flight.airline}
                    </h4>
                    <p className="text-sm font-bold text-gray-500">
                      {flight.flight} | {flight.class}
                    </p>
                  </div>
                </div>

                <div className="flex-1 flex items-center justify-center space-x-8 w-full md:w-auto border-y md:border-y-0 md:border-x border-gray-100 py-6 md:py-0 md:px-8">
                  <div className="text-center">
                    <p className="text-xl font-black">
                      {flight.time.split(" - ")[0]}
                    </p>
                    <p className="text-xs font-bold text-gray-400">
                      {flight.route.split(" - ")[0]}
                    </p>
                  </div>
                  <div className="flex flex-col items-center w-32">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                      {flight.duration}
                    </span>
                    <div className="w-full h-0.5 bg-gray-200 relative">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[#004D40] rounded-full"></div>
                    </div>
                    <span className="text-[10px] font-bold text-[#004D40] mt-1">
                      {flight.type}
                    </span>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-black">
                      {flight.time.split(" - ")[1]}
                    </p>
                    <p className="text-xs font-bold text-gray-400">
                      {flight.route.split(" - ")[1]}
                    </p>
                  </div>
                </div>

                <div className="w-full md:w-48 text-right flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center">
                  <p className="text-2xl font-black text-[#004D40]">
                    {flight.price}
                  </p>
                  <button className="bg-[#004D40] text-white px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-[#00332C] transition-colors md:mt-3">
                    เลือก
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 👑 National Standard Footer */}
      <footer className="bg-gray-50 pt-24 pb-12 px-6 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-20">
            <div className="max-w-md">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-10 h-10 bg-[#004D40] rounded-full flex items-center justify-center text-white">
                  <Plane className="w-6 h-6 fill-current" />
                </div>
                <span className="text-2xl font-black tracking-tighter text-[#004D40] uppercase">
                  SAIRKARNBIN <span className="italic text-[#827717]">TAI</span>
                </span>
              </div>
              <p className="text-gray-500 text-sm font-medium leading-relaxed italic">
                มาตรฐานสายการบินพรีเมียมระดับสากล ภายใต้การรับรองความถูกต้อง
                Vifily Protocol
                พร้อมส่งมอบการเดินทางที่ปลอดภัยและน่าเชื่อถือที่สุดให้กับคุณ
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
              <div className="space-y-6">
                <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#004D40]">
                  เมนูแนะนำ
                </h5>
                <ul className="space-y-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                  <li className="hover:text-[#004D40] cursor-pointer">
                    เส้นทางในประเทศ
                  </li>
                  <li className="hover:text-[#004D40] cursor-pointer">
                    เส้นทางยุโรป
                  </li>
                  <li className="hover:text-[#004D40] cursor-pointer">
                    เส้นทางเอเชีย
                  </li>
                </ul>
              </div>
              <div className="space-y-6">
                <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#004D40]">
                  ช่วยเหลือ
                </h5>
                <ul className="space-y-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                  <li className="hover:text-[#004D40] cursor-pointer">
                    เงื่อนไขบัตรโดยสาร
                  </li>
                  <li className="hover:text-[#004D40] cursor-pointer">
                    ความปลอดภัย
                  </li>
                  <li className="hover:text-[#004D40] cursor-pointer">
                    ติดต่อเรา
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="pt-12 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
              © 2026 SAIRKARNBIN TAI • VIFILY GLOBAL ALLIANCE MEMBER
            </p>
            <div className="flex items-center space-x-10 grayscale opacity-30">
              <ShieldCheck className="w-10 h-10 text-gray-900" />
              <Award className="w-10 h-10 text-gray-900" />
              <Globe className="w-10 h-10 text-gray-900" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
