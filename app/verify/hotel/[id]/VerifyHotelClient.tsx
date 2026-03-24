"use client";

import React from "react";
import {
  HotelTemplate,
  HotelBookingProps,
} from "@/components/tickets/HotelTemplate";
import {
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Globe,
  Clock,
  Building,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

interface VerifyHotelClientProps {
  booking: {
    id: string;
    hotel_name: string;
    guest_name: string;
    confirmation_no: string;
    check_in_date: string;
    check_out_date: string;
    room_type: string;
    address: string;
  };
  isExpired: boolean;
  daysLeft: number;
}

export default function VerifyHotelClient({
  booking,
  isExpired,
  daysLeft,
}: VerifyHotelClientProps) {
  const templateProps: HotelBookingProps = {
    hotelName: booking.hotel_name,
    guestName: booking.guest_name,
    confirmationNo: booking.confirmation_no,
    checkInDate: booking.check_in_date,
    checkOutDate: booking.check_out_date,
    roomType: booking.room_type,
    address: booking.address,
    isPreview: false,
    ticketId: booking.id,
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] pb-24 font-serif">
      {/* Verification Header */}
      <div
        className={`py-12 md:py-20 text-white relative overflow-hidden ${isExpired ? "bg-red-600" : "bg-[#1A1A1A]"}`}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-[100px] -mr-48 -mt-48"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-md px-5 py-2 rounded-full mb-8 border border-white/5"
              >
                <ShieldCheck
                  className={`w-4 h-4 ${isExpired ? "text-white" : "text-blue-400"}`}
                />
                <span className="text-[10px] font-sans font-black uppercase tracking-[0.4em]">
                  Hospitality Verification Portal
                </span>
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-sans font-black mb-6 tracking-tighter uppercase leading-none italic">
                {isExpired ? (
                  <>
                    Booking <span className="text-white/40">Expired.</span>
                  </>
                ) : (
                  <>
                    Stay <span className="text-blue-500">Confirmed.</span>
                  </>
                )}
              </h1>
              <p className="text-xl md:text-2xl font-bold italic text-white/70 max-w-2xl">
                {isExpired
                  ? "การตรวจสอบข้อมูลการจองที่พักชุดนี้สิ้นสุดอายุการรับรองแล้ว (เกิน 7 วันนับจากวันออกระบบ)"
                  : "ข้อมูลการสำรองห้องพักได้รับการตรวจสอบและยืนยันสถานะการจอง (Guaranteed Booking) ในระบบสากลเรียบร้อยแล้ว"}
              </p>
            </div>

            {/* UNLINK-GLOBAL VERIFICATION SEAL */}
            {!isExpired && (
              <div
                id="unlink-trust-seal"
                className="text-center font-sans hidden md:block"
              >
                <a
                  href="https://www.unlink-th.com/verify/c/c-001"
                  target="_blank"
                  rel="noopener follow"
                  title="JP Visual Docs Verified by UNLINK-GLOBAL"
                  className="flex flex-col items-center group bg-white/5 backdrop-blur-md p-6 rounded-[2.5rem] border border-white/10"
                >
                  <Image
                    src="https://www.unlink-th.com/branding/verify-badge.webp"
                    alt="Verified by UNLINK-GLOBAL"
                    width={100}
                    height={100}
                    className="block mb-2 filter drop-shadow-2xl group-hover:scale-110 transition-transform duration-500"
                  />
                  <span className="text-[10px] text-white font-bold uppercase tracking-[1px] opacity-60">
                    Verified Entity
                  </span>
                </a>
              </div>
            )}

            {!isExpired && (
              <div className="bg-white/5 backdrop-blur-xl p-8 rounded-[3rem] border border-white/10 flex flex-col items-center text-center min-w-[280px]">
                <Clock className="w-10 h-10 text-blue-400 mb-4" />
                <p className="text-[10px] font-sans font-black uppercase tracking-widest text-gray-400 mb-1">
                  Status Active For
                </p>
                <p className="text-5xl font-sans font-black mb-1 tracking-tighter">
                  {daysLeft}
                </p>
                <p className="text-xs font-sans font-bold text-gray-500 uppercase tracking-[0.2em]">
                  Days Remaining
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-12 relative z-20">
        {isExpired ? (
          <div className="bg-white rounded-[3.5rem] p-12 md:p-24 shadow-2xl border border-red-100 text-center space-y-8">
            <div className="w-24 h-24 bg-red-50 text-red-600 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-inner">
              <AlertTriangle className="w-12 h-12" />
            </div>
            <div className="max-w-xl mx-auto space-y-4">
              <h2 className="text-3xl font-sans font-black uppercase tracking-tight text-gray-900">
                ข้อมูลการจองหมดอายุการตรวจสอบ
              </h2>
              <p className="text-gray-500 font-medium leading-relaxed italic">
                &quot;ระบบจะเก็บข้อมูลการตรวจสอบสถานะการจองโรงแรมไว้เป็นเวลา 7
                วันเพื่อรักษาความลับของพาร์ทเนอร์และลูกค้า
                หากคุณต้องการข้อมูลการรับรองใหม่
                กรุณาติดต่อตัวแทนที่ออกเอกสารให้คุณ&quot;
              </p>
            </div>
            <div className="pt-8 border-t border-gray-50">
              <Link href="/">
                <button className="h-16 px-12 bg-gray-950 text-white rounded-2xl font-sans font-black uppercase tracking-widest text-[10px] hover:bg-gray-800 transition-all">
                  Return to Portal
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Verification Stats/Badge */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 font-sans">
              <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-50 flex items-center space-x-6">
                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">
                    Security Status
                  </p>
                  <p className="text-lg font-black uppercase tracking-tight text-[#1A1A1A]">
                    Official & Valid
                  </p>
                </div>
              </div>
              <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-50 flex items-center space-x-6">
                <div className="w-14 h-14 bg-gray-50 text-gray-900 rounded-2xl flex items-center justify-center">
                  <Building className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">
                    Entity
                  </p>
                  <p className="text-lg font-black uppercase tracking-tight text-[#1A1A1A]">
                    Hospitality Trust
                  </p>
                </div>
              </div>
              <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-50 flex items-center space-x-6">
                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                  <Globe className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">
                    Node
                  </p>
                  <p className="text-lg font-black uppercase tracking-tight text-[#1A1A1A]">
                    Global Server
                  </p>
                </div>
              </div>
            </div>

            {/* The Hotel Confirmation Itself */}
            <div className="bg-gray-100 p-4 md:p-12 rounded-[4rem] shadow-inner">
              <HotelTemplate {...templateProps} />
            </div>

            {/* Institutional Footer */}
            <div className="text-center space-y-4 pt-12">
              <p className="text-[10px] text-gray-400 font-sans font-black uppercase tracking-[0.4em]">
                Secure Hospitality Record • End of Official Verification
              </p>
              <div className="h-px w-24 bg-gray-200 mx-auto"></div>
              <p className="text-[8px] text-gray-300 font-mono font-bold uppercase tracking-[0.6em]">
                UNLINK-GLOBAL-HOTEL-PROTOCOL-V4.0
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
