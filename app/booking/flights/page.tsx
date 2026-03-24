"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Plane,
  ArrowLeft,
  ShieldCheck,
  ChevronRight,
  Globe,
  Clock,
  Navigation,
} from "lucide-react";
import { Button } from "@/components/ui";

const flightPromos = [
  {
    id: 1,
    route: "Bangkok ✈ London",
    airline: "Thai Airways (Simulated)",
    price: "฿28,500",
    class: "Royal Silk",
    time: "12h 45m",
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109c0f3?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    route: "Bangkok ✈ Paris",
    airline: "Air France (Simulated)",
    price: "฿32,400",
    class: "Business Class",
    time: "13h 20m",
    image:
      "https://images.unsplash.com/photo-1542296332-2e4473faf563?q=80&w=800&auto=format&fit=crop",
  },
];

export default function PublicFlightPortal() {
  return (
    <div className="min-h-screen bg-white font-sans pb-24">
      {/* Premium Airline Header */}
      <div className="bg-[#5C2D91] text-white pt-32 pb-20 px-6 relative overflow-hidden">
        {/* Silk Pattern Decorative */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="w-full h-full border-[60px] border-white/20 rounded-full translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <Link
            href="/booking"
            className="inline-flex items-center text-xs font-black uppercase tracking-widest text-white/60 hover:text-white mb-8 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Hub
          </Link>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20">
                  <Plane className="w-6 h-6 text-white rotate-45" />
                </div>
                <span className="text-2xl font-black tracking-tighter uppercase italic">
                  SAIRKARNBIN <span className="text-yellow-400">TAI</span>
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic leading-[0.85] mb-6">
                Fly with <br />
                <span className="text-yellow-400">Confidence.</span>
              </h1>
              <div className="flex items-center space-x-4">
                <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 flex items-center">
                  <ShieldCheck className="w-4 h-4 mr-2 text-yellow-400" />
                  <span className="text-[10px] font-black uppercase tracking-widest">
                    Verified by UNLINK
                  </span>
                </div>
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-[#5C2D91] bg-gray-200 overflow-hidden"
                    >
                      <Image
                        src={`https://i.pravatar.cc/100?img=${i + 10}`}
                        alt="User"
                        width={32}
                        height={32}
                      />
                    </div>
                  ))}
                  <div className="w-8 h-8 rounded-full border-2 border-[#5C2D91] bg-yellow-400 flex items-center justify-center text-[8px] font-black text-gray-900">
                    +2k
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl p-8 rounded-[3rem] border border-white/10 max-w-sm">
              <p className="text-white/60 text-xs font-bold leading-relaxed italic mb-6">
                &quot;สัมผัสประสบการณ์การเดินทางระดับพรีเมียม
                พร้อมระบบจัดการตั๋วเครื่องบินที่ได้รับมาตรฐานการรับรองจาก UNLINK
                Global Network ทั่วโลก&quot;
              </p>
              <Link href="/partner/generator/flight">
                <Button className="w-full h-16 bg-yellow-400 text-gray-900 font-black uppercase tracking-widest text-xs hover:bg-yellow-300 rounded-2xl shadow-2xl shadow-yellow-900/20">
                  Book A Flight Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {flightPromos.map((promo) => (
            <div
              key={promo.id}
              className="bg-white p-4 rounded-[3rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] flex flex-col md:flex-row gap-6 border border-gray-50 group hover:shadow-2xl transition-all duration-700"
            >
              <div className="relative w-full md:w-48 h-48 rounded-[2rem] overflow-hidden shrink-0">
                <Image
                  src={promo.image}
                  alt={promo.route}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <p className="text-[10px] font-black text-white/60 uppercase">
                    Duration
                  </p>
                  <p className="text-xs font-black text-white">{promo.time}</p>
                </div>
              </div>

              <div className="flex-grow py-4 pr-4">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter leading-none italic group-hover:text-[#5C2D91] transition-colors">
                    {promo.route}
                  </h3>
                  <div className="bg-emerald-50 text-emerald-600 p-2 rounded-lg">
                    <Navigation className="w-4 h-4" />
                  </div>
                </div>

                <div className="space-y-2 mb-8">
                  <p className="text-xs font-bold text-gray-500 italic">
                    {promo.airline}
                  </p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#5C2D91]">
                    {promo.class}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                  <div className="flex flex-col">
                    <span className="text-[8px] font-black text-gray-400 uppercase">
                      One-way from
                    </span>
                    <span className="text-2xl font-black text-gray-900">
                      {promo.price}
                    </span>
                  </div>
                  <Link href="/partner/generator/flight">
                    <div className="w-12 h-12 bg-gray-900 text-white rounded-2xl flex items-center justify-center hover:bg-[#5C2D91] transition-all shadow-xl group-hover:scale-110">
                      <ChevronRight className="w-6 h-6" />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Global Network Section */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            {
              icon: <Globe />,
              label: "Global Coverage",
              value: "190+ Countries",
            },
            {
              icon: <Clock />,
              label: "Real-time Verification",
              value: "24/7 Support",
            },
            {
              icon: <ShieldCheck />,
              label: "Security Protocol",
              value: "Verified Hash",
            },
            {
              icon: <Plane />,
              label: "Airline Partners",
              value: "500+ Worldwide",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="text-center p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100"
            >
              <div className="w-12 h-12 bg-white text-gray-900 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                {item.icon}
              </div>
              <p className="text-[8px] font-black uppercase tracking-widest text-gray-400 mb-1">
                {item.label}
              </p>
              <p className="text-sm font-black text-gray-900">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
