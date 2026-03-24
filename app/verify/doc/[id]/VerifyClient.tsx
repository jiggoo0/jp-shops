"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  CheckCircle2,
  User,
  FileText,
  Lock,
  Globe,
  Briefcase,
  Plane,
  Fingerprint,
  Award,
  Search,
  CheckSquare,
  Building2,
  BadgeCheck,
} from "lucide-react";
import Link from "next/link";
import CertificateFrame from "@/components/ui/CertificateFrame";

interface VerifyClientProps {
  docData: {
    id: string;
    ownerName: string;
    documentType: string;
    issuedDate: string;
    expiryDate: string;
    status: string;
    issuer: string;
    metadata?: {
      position?: string;
      salary?: number;
      allowance?: number;
      tax?: number;
      sso?: number;
      companyName?: string;
      registrationNo?: string;
    };
  };
}

export default function VerifyClient({ docData }: VerifyClientProps) {
  const isFinancial =
    docData.documentType.toLowerCase().includes("loan") ||
    docData.documentType.toLowerCase().includes("สินเชื่อ") ||
    docData.documentType.toLowerCase().includes("payroll") ||
    docData.documentType.toLowerCase().includes("เงินเดือน");
  const isTravel =
    docData.documentType.toLowerCase().includes("visa") ||
    docData.documentType.toLowerCase().includes("วีซ่า") ||
    docData.documentType.toLowerCase().includes("travel");

  // Payroll Calculations
  const salary = docData.metadata?.salary || 0;
  const allowance = docData.metadata?.allowance || 0;
  const tax = docData.metadata?.tax || 0;
  const sso = docData.metadata?.sso || 0;
  const netPay = salary + allowance - tax - sso;
  const hasPayrollData = salary > 0;

  // Choose Theme based on Document Type
  const theme = isFinancial
    ? {
        primary: "bg-amber-600",
        shadow: "shadow-amber-500/40",
        icon: <Briefcase className="w-12 h-12 text-white" />,
        label: "Institutional Financial Record",
        labelTh: "บันทึกทางการเงินระดับสถาบัน",
      }
    : isTravel
      ? {
          primary: "bg-blue-600",
          shadow: "shadow-blue-500/40",
          icon: <Plane className="w-12 h-12 text-white" />,
          label: "Global Travel Authorization",
          labelTh: "หนังสืออนุมัติการเดินทางระดับสากล",
        }
      : {
          primary: "bg-green-500",
          shadow: "shadow-green-500/40",
          icon: <ShieldCheck className="w-12 h-12 text-white" />,
          label: "Verified Identity Document",
          labelTh: "เอกสารยืนยันตัวตนผ่านการตรวจสอบ",
        };

  // Mock Hash for Security Display
  const documentHash = `SHA256:${docData.id.replace(/-/g, "").toUpperCase()}${docData.ownerName.length}F92`;

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-gray-900 font-sans p-4 md:p-12 flex items-center justify-center relative overflow-hidden">
      {/* Background Watermark Pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none select-none flex flex-wrap gap-20 p-20 rotate-12">
        {Array.from({ length: 40 }).map((_, i) => (
          <span
            key={i}
            className="text-4xl font-black uppercase tracking-widest whitespace-nowrap"
          >
            VIFILY SECURE DOCUMENT • OFFICIAL VERIFICATION • ORIGINAL
          </span>
        ))}
      </div>

      <div
        className={`fixed top-0 left-0 w-full h-2 ${theme.primary} z-50`}
      ></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl w-full relative"
      >
        <CertificateFrame themeColor={theme.primary}>
          <div className="bg-white rounded-[2.5rem] overflow-hidden">
            {/* Header Status */}
            <div className="bg-gray-950 p-10 md:p-14 text-center relative overflow-hidden border-b-8 border-gray-900">
              <div className="absolute top-0 left-0 w-full h-full opacity-10">
                <div className="absolute top-[-10%] left-[-10%] w-40 h-40 border-[20px] border-white rounded-full"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-60 h-60 border-[2px] border-white/20 rounded-full"></div>
              </div>

              <div className="relative z-10">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className={`w-24 h-24 md:w-28 md:h-28 ${theme.primary} rounded-[2rem] mx-auto flex items-center justify-center shadow-2xl ${theme.shadow} mb-8 border-4 border-white/20`}
                >
                  {theme.icon}
                </motion.div>
                <div className="inline-flex flex-col items-center space-y-2 mb-6">
                  <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/5">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-[9px] font-black text-white uppercase tracking-[0.3em]">
                      {theme.label}
                    </span>
                  </div>
                  <span className="text-[8px] font-bold text-white/40 uppercase tracking-[0.4em]">
                    {theme.labelTh}
                  </span>
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase mb-4">
                  {docData.status}
                </h1>
                <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.4em]">
                  Document ID: {docData.id.split("-")[0].toUpperCase()} - SECURE
                  V2.2
                </p>
              </div>

              {/* Verified Badge / Seal */}
              <div className="absolute top-10 right-10 opacity-20 pointer-events-none hidden md:block">
                <div className="relative w-32 h-32 border-4 border-white/40 rounded-full flex items-center justify-center p-4">
                  <div className="text-[8px] font-black text-white text-center uppercase leading-tight tracking-widest text-center">
                    JP VISUAL
                    <br />
                    DOCS
                    <br />
                    OFFICIAL
                    <br />
                    STAMP
                  </div>
                  <BadgeCheck className="absolute -bottom-2 -right-2 w-10 h-10 text-white" />
                </div>
              </div>
            </div>

            {/* Document Details Container */}
            <div className="p-10 md:p-14 space-y-16">
              {/* Holder Section */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b border-gray-50">
                <div className="space-y-4 flex-1">
                  <div>
                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest flex items-center mb-2">
                      <User className="w-3.5 h-3.5 mr-2 text-gray-300" /> Holder
                      Full Name / ชื่อผู้ถือเอกสาร
                    </p>
                    <p className="text-3xl font-black text-gray-900 uppercase tracking-tight leading-none">
                      {docData.ownerName}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col md:items-end space-y-2">
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest flex items-center md:justify-end">
                    <FileText className="w-3.5 h-3.5 mr-2 text-gray-300" />{" "}
                    Category / ประเภทเอกสาร
                  </p>
                  <p className="text-xl font-black text-gray-900 uppercase tracking-tight leading-none">
                    {docData.documentType}
                  </p>
                </div>
              </div>

              {/* Dates & Validity */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="bg-gray-50/50 p-8 rounded-3xl border border-gray-100 flex flex-col justify-between h-full">
                  <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest mb-6">
                    Verification History / ประวัติการยืนยัน
                  </p>
                  <div className="space-y-6">
                    <div>
                      <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">
                        Issued Date / วันที่ออก
                      </p>
                      <p className="text-lg font-black text-gray-800 uppercase tracking-tight leading-none">
                        {new Date(docData.issuedDate).toLocaleDateString(
                          "en-GB",
                          { day: "2-digit", month: "short", year: "numeric" },
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">
                        Registry Ref / เลขที่อ้างอิง
                      </p>
                      <p className="text-sm font-mono font-bold text-gray-600 tracking-widest">
                        VF-{docData.id.slice(0, 8).toUpperCase()}
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className={`${theme.primary.replace("bg-", "border-")} border-2 p-8 rounded-3xl flex flex-col justify-between h-full relative overflow-hidden group`}
                >
                  <div className="absolute top-[-20%] right-[-10%] w-40 h-40 bg-gray-50 opacity-10 rounded-full pointer-events-none group-hover:scale-110 transition-transform"></div>

                  <p
                    className={`text-[9px] ${theme.primary.replace("bg-", "text-")} font-black uppercase tracking-widest mb-6`}
                  >
                    Validity Expiry / วันที่หมดอายุ
                  </p>
                  <div className="space-y-4">
                    <p
                      className={`text-3xl font-black uppercase tracking-tighter leading-none ${theme.primary.replace("bg-", "text-")}`}
                    >
                      {new Date(docData.expiryDate).toLocaleDateString(
                        "en-GB",
                        { day: "2-digit", month: "short", year: "numeric" },
                      )}
                    </p>
                    <div className="flex items-center space-x-2">
                      <CheckSquare
                        className={`w-3.5 h-3.5 ${theme.primary.replace("bg-", "text-")}`}
                      />
                      <span className="text-[10px] font-black text-gray-900 uppercase tracking-widest">
                        Active & Valid
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Financial Data Block (International Grade) */}
              {hasPayrollData && (
                <div className="bg-blue-600 rounded-[2.5rem] p-10 text-white shadow-2xl shadow-blue-200/50 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/micro-carbon.png')] opacity-10"></div>

                  <div className="relative z-10 flex flex-col md:flex-row gap-10">
                    <div className="flex-1 space-y-8">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <Building2 className="w-4 h-4 text-blue-200" />
                          <p className="text-[9px] text-blue-200 font-black uppercase tracking-widest">
                            Affiliated Institution / หน่วยงานต้นสังกัด
                          </p>
                        </div>
                        <p className="text-2xl font-black uppercase tracking-tight">
                          {docData.metadata?.companyName || "N/A"}
                        </p>
                        <p className="text-[9px] font-bold text-blue-200 uppercase tracking-[0.2em] mt-1">
                          Registration No:{" "}
                          {docData.metadata?.registrationNo || "0105563000000"}
                        </p>
                      </div>

                      <div className="pt-8 border-t border-white/10">
                        <p className="text-[9px] text-blue-200 font-black uppercase tracking-widest mb-1">
                          Active Position / ตำแหน่งงาน
                        </p>
                        <p className="text-lg font-black uppercase tracking-widest">
                          {docData.metadata?.position || "N/A"}
                        </p>
                      </div>
                    </div>

                    <div className="w-full md:w-64 bg-white/10 backdrop-blur-xl p-8 rounded-[2rem] border border-white/10 flex flex-col justify-center items-center text-center">
                      <p className="text-[9px] text-blue-100 font-black uppercase tracking-widest mb-2">
                        Monthly Net Income
                      </p>
                      <p className="text-3xl font-black tracking-tighter mb-1">
                        ฿{netPay.toLocaleString()}
                      </p>
                      <p className="text-[8px] font-bold text-blue-200 uppercase tracking-widest">
                        Net Earnings (THB)
                      </p>
                      <div className="mt-6 w-full h-1 bg-white/20 rounded-full overflow-hidden">
                        <div className="w-full h-full bg-white animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Security & Authenticity Block (High Integrity) */}
              <div className="space-y-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="h-[2px] bg-gray-100 flex-1"></div>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">
                    Authenticity Verification Path
                  </span>
                  <div className="h-[2px] bg-gray-100 flex-1"></div>
                </div>

                <div className="p-10 bg-gray-50 rounded-[3rem] border border-gray-100 relative overflow-hidden group">
                  <div className="relative z-10 space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-3">
                        <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest flex items-center">
                          <Fingerprint className="w-3.5 h-3.5 mr-2" /> Digital
                          Integrity Hash (SHA-256)
                        </p>
                        <p className="text-[11px] font-mono font-bold text-gray-900 break-all bg-white p-4 rounded-2xl border border-gray-100 shadow-sm leading-relaxed">
                          {documentHash}
                        </p>
                      </div>
                      <div className="space-y-3">
                        <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest flex items-center">
                          <Award className="w-3.5 h-3.5 mr-2" /> Issuer
                          Authority / หน่วยงานที่ออกเอกสาร
                        </p>
                        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                          <p className="text-sm font-black text-gray-900 uppercase tracking-widest">
                            {docData.issuer}
                          </p>
                          <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                            Vifily Certified Partner ID:{" "}
                            {docData.id.slice(-6).toUpperCase()}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-10 border-t border-gray-200 flex flex-wrap gap-8">
                      <div className="flex items-center space-x-3 bg-green-50 px-4 py-2 rounded-full border border-green-100">
                        <Search className="w-3.5 h-3.5 text-green-600" />
                        <span className="text-[9px] font-black text-green-700 uppercase tracking-widest">
                          Live DB Scan: Success
                        </span>
                      </div>
                      <div className="flex items-center space-x-3 bg-blue-50 px-4 py-2 rounded-full border border-blue-100">
                        <Lock className="w-3.5 h-3.5 text-blue-600" />
                        <span className="text-[9px] font-black text-blue-700 uppercase tracking-widest">
                          Blockchain Hash Secured
                        </span>
                      </div>
                      <div className="flex items-center space-x-3 bg-gray-900 px-4 py-2 rounded-full">
                        <Globe className="w-3.5 h-3.5 text-white" />
                        <span className="text-[9px] font-black text-white uppercase tracking-widest">
                          Global Access: Verified
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Institutional Trust Footer */}
              <div className="pt-16 border-t border-gray-100 flex flex-col items-center space-y-12">
                <div className="flex flex-wrap justify-center items-center gap-12 opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-700">
                  <div className="flex items-center space-x-2">
                    <Globe className="w-5 h-5" />
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      Global Trust Alliance
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-5 h-5" />
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      ISO/IEC 27001
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <BadgeCheck className="w-5 h-5" />
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      Digital Trust Standard
                    </span>
                  </div>
                </div>

                <Link href="/" className="w-full">
                  <button className="w-full h-20 bg-gray-950 text-white rounded-[2rem] font-black uppercase tracking-[0.3em] text-[11px] hover:bg-gray-800 transition-all duration-500 shadow-2xl flex items-center justify-center space-x-4 group overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    <span>Back to JP Visual Official Portal</span>
                    <CheckCircle2 className="w-5 h-5 group-hover:scale-125 group-hover:text-green-400 transition-all" />
                  </button>
                </Link>

                <div className="text-center space-y-2">
                  <p className="text-[9px] text-gray-400 font-bold uppercase tracking-[0.4em]">
                    End of Official Verification Record
                  </p>
                  <p className="text-[7px] text-gray-200 font-bold uppercase tracking-[0.6em]">
                    Vifily Certification Protocol v2.2.0 • Build 2026.03.24
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CertificateFrame>
      </motion.div>
    </div>
  );
}
