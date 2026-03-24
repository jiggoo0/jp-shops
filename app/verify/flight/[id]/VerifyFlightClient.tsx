"use client";

import React from "react";
import {
  KLMTemplate,
  TicketProps,
  FlightSegment,
} from "@/components/tickets/KLMTemplate";
import { ANATemplate } from "@/components/tickets/ANATemplate";
import { EtihadTemplate } from "@/components/tickets/EtihadTemplate";
import {
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Globe,
  Clock,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

interface VerifyFlightClientProps {
  ticket: {
    id: string;
    passenger_name: string;
    pnr: string;
    eticket: string;
    airline: string;
    flight_data: Record<string, unknown>;
  };
  isExpired: boolean;
  daysLeft: number;
}

export default function VerifyFlightClient({
  ticket,
  isExpired,
  daysLeft,
}: VerifyFlightClientProps) {
  const rawFlightData = ticket.flight_data as Record<string, unknown>;
  const flight = ticket.flight_data as unknown as FlightSegment;

  const templateProps: TicketProps = {
    passengerName: ticket.passenger_name,
    pnr: ticket.pnr,
    eTicket: ticket.eticket,
    issueDate: (rawFlightData.issueDate || "") as string,
    flights: [flight],
    isPreview: false,
    ticketId: ticket.id,
  };
  const renderTemplate = () => {
    switch (ticket.airline) {
      case "KLM":
        return <KLMTemplate {...templateProps} />;
      case "ANA":
        return <ANATemplate {...templateProps} />;
      case "ETIHAD":
        return <EtihadTemplate {...templateProps} />;
      default:
        return <KLMTemplate {...templateProps} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-24 font-sans">
      {/* Verification Header */}
      <div
        className={`py-12 md:py-20 text-white relative overflow-hidden ${isExpired ? "bg-red-600" : "bg-gray-950"}`}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-[100px] -mr-48 -mt-48"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-500 rounded-full blur-[80px] -ml-32 -mb-32"></div>
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
                  className={`w-4 h-4 ${isExpired ? "text-white" : "text-green-400"}`}
                />
                <span className="text-[10px] font-black uppercase tracking-[0.4em]">
                  Official Verification Portal
                </span>
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter uppercase leading-none italic">
                {isExpired ? (
                  <>
                    Verification <span className="text-white/40">Expired.</span>
                  </>
                ) : (
                  <>
                    Document <span className="text-green-500">Verified.</span>
                  </>
                )}
              </h1>
              <p className="text-xl md:text-2xl font-bold italic text-white/70 max-w-2xl">
                {isExpired
                  ? "การตรวจสอบข้อมูลตั๋วเครื่องบินชุดนี้สิ้นสุดอายุการรับรองแล้ว (เกิน 7 วันนับจากวันออกระบบ)"
                  : "ระบบตรวจสอบความถูกต้องสมบูรณ์ (Integrity Check) ยืนยันว่าข้อมูลชุดนี้ตรงกับบันทึกในฐานข้อมูลสากล"}
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
                <Clock className="w-10 h-10 text-green-400 mb-4" />
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">
                  Status Active For
                </p>
                <p className="text-5xl font-black mb-1 tracking-tighter">
                  {daysLeft}
                </p>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em]">
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
              <h2 className="text-3xl font-black uppercase tracking-tight text-gray-900">
                เอกสารชุดนี้หมดอายุการตรวจสอบ
              </h2>
              <p className="text-gray-500 font-medium leading-relaxed italic">
                &quot;เนื่องจากเหตุผลด้านความปลอดภัยและนโยบายความเป็นส่วนตัว
                ข้อมูลการตรวจสอบจะถูกเก็บไว้ในระบบเพียง 7 วันเท่านั้น
                หากคุณต้องการเอกสารชุดใหม่หรือต้องการการรับรองใหม่
                กรุณาติดต่อพาร์ทเนอร์หรือสร้างรายการใหม่ผ่านระบบ&quot;
              </p>
            </div>
            <div className="pt-8 border-t border-gray-50">
              <Link href="/">
                <button className="h-16 px-12 bg-gray-950 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-gray-800 transition-all">
                  Back to Official Portal
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Verification Stats/Badge */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-50 flex items-center space-x-6">
                <div className="w-14 h-14 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">
                    Status
                  </p>
                  <p className="text-lg font-black uppercase tracking-tight">
                    Active & Valid
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
                  <p className="text-lg font-black uppercase tracking-tight">
                    Global Registry
                  </p>
                </div>
              </div>
              <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-50 flex items-center space-x-6">
                <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center">
                  <MessageSquare className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">
                    Protocol
                  </p>
                  <p className="text-lg font-black uppercase tracking-tight">
                    UNLINK Secure Protocol
                  </p>
                </div>
              </div>
            </div>

            {/* The Ticket Itself */}
            <div className="bg-gray-200 p-4 md:p-12 rounded-[4rem] shadow-inner">
              {renderTemplate()}
            </div>

            {/* Institutional Footer */}
            <div className="text-center space-y-4 pt-12">
              <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.4em]">
                Verified Digital Asset • End of Record
              </p>
              <div className="h-px w-24 bg-gray-200 mx-auto"></div>
              <p className="text-[8px] text-gray-300 font-mono font-bold uppercase tracking-[0.6em]">
                UNLINK-GLOBAL-SYSTEM-INTEGRITY-PROTOCOL-2026.04.08
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
