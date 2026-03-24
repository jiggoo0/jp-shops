"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  CheckCircle2,
  Calendar,
  User,
  FileText,
  Lock,
  Globe,
  Briefcase,
  Plane,
  Fingerprint,
  Award,
  Search,
} from "lucide-react";
import Link from "next/link";

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
      }
    : isTravel
      ? {
          primary: "bg-blue-600",
          shadow: "shadow-blue-500/40",
          icon: <Plane className="w-12 h-12 text-white" />,
          label: "Global Travel Authorization",
        }
      : {
          primary: "bg-green-500",
          shadow: "shadow-green-500/40",
          icon: <ShieldCheck className="w-12 h-12 text-white" />,
          label: "Verified Identity Document",
        };

  // Mock Hash for Security Display
  const documentHash = `SHA256:${docData.id.replace(/-/g, "").toUpperCase()}${docData.ownerName.length}F92`;

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-gray-900 font-sans p-4 md:p-12 flex items-center justify-center relative overflow-hidden">
      {/* Background Watermark Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none flex flex-wrap gap-20 p-20 rotate-12">
        {Array.from({ length: 20 }).map((_, i) => (
          <span
            key={i}
            className="text-4xl font-black uppercase tracking-widest whitespace-nowrap"
          >
            JP VISUAL DOCS • VIFILY SECURE • AUTHENTIC
          </span>
        ))}
      </div>

      <div
        className={`absolute top-0 left-0 w-full h-2 ${theme.primary}`}
      ></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full bg-white rounded-[2.5rem] md:rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.12)] border border-gray-100 overflow-hidden relative"
      >
        {/* Header Status */}
        <div className="bg-gray-950 p-10 md:p-14 text-center relative overflow-hidden">
          {/* Decorative Elements */}
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
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full mb-4 border border-white/5">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-[9px] font-black text-white uppercase tracking-[0.3em]">
                {theme.label}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase mb-2">
              {docData.status}
            </h1>
            <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.4em]">
              Vifily Certification Standard v2.1
            </p>
          </div>
        </div>

        {/* Document Details */}
        <div className="p-10 md:p-14 space-y-12">
          {/* Main Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-2 group">
              <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest flex items-center group-hover:text-gray-900 transition-colors">
                <User className="w-3.5 h-3.5 mr-2" /> Holder Full Name
              </p>
              <p className="text-xl font-black text-gray-900 uppercase tracking-tight leading-none">
                {docData.ownerName}
              </p>
            </div>
            <div className="space-y-2 md:text-right group">
              <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest flex items-center md:justify-end group-hover:text-gray-900 transition-colors">
                <FileText className="w-3.5 h-3.5 mr-2" /> Document Category
              </p>
              <p className="text-xl font-black text-gray-900 uppercase tracking-tight leading-none">
                {docData.documentType}
              </p>
            </div>
            <div className="space-y-2 group">
              <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest flex items-center group-hover:text-gray-900 transition-colors">
                <Calendar className="w-3.5 h-3.5 mr-2" /> Verification Date
              </p>
              <p className="text-xl font-black text-gray-900 uppercase tracking-tight leading-none">
                {docData.issuedDate}
              </p>
            </div>
            <div className="space-y-2 md:text-right group">
              <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest flex items-center md:justify-end group-hover:text-gray-900 transition-colors">
                <Calendar className="w-3.5 h-3.5 mr-2" /> Validity Expiry
              </p>
              <p
                className={`text-xl font-black uppercase tracking-tight leading-none ${theme.primary.replace("bg-", "text-")}`}
              >
                {docData.expiryDate}
              </p>
            </div>
          </div>

          {/* Institutional Payroll Record Block */}
          {hasPayrollData && (
            <div className="bg-blue-50/50 rounded-[2rem] p-8 border border-blue-100/50 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Award className="w-16 h-16 text-blue-600" />
              </div>

              <div className="relative z-10 space-y-6">
                <div>
                  <p className="text-[9px] text-blue-500 font-black uppercase tracking-widest mb-1">
                    Affiliated Organization
                  </p>
                  <p className="text-lg font-black text-gray-900 uppercase tracking-tight">
                    {docData.metadata?.companyName || "N/A"}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6 pt-4 border-t border-blue-100/50">
                  <div>
                    <p className="text-[9px] text-blue-500 font-black uppercase tracking-widest mb-1">
                      Active Position
                    </p>
                    <p className="text-sm font-black text-gray-800 uppercase tracking-widest">
                      {docData.metadata?.position || "N/A"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] text-blue-500 font-black uppercase tracking-widest mb-1">
                      Monthly Net Income
                    </p>
                    <p className="text-2xl font-black text-blue-600 tracking-tighter">
                      ฿{netPay.toLocaleString()}
                    </p>
                    <p className="text-[8px] font-bold text-blue-400 uppercase tracking-widest">
                      After Deductions (Tax/SSO)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security & Authenticity Block */}
          <div className="relative">
            <div className="absolute -top-4 left-6 px-3 bg-white z-10">
              <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">
                Security Protocol
              </span>
            </div>
            <div className="p-10 bg-gray-50/50 rounded-[2.5rem] border border-gray-100 relative overflow-hidden group">
              <div className="relative z-10 space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-1.5">
                    <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest">
                      Digital Integrity Hash (SHA-256)
                    </p>
                    <div className="flex items-center space-x-2">
                      <Fingerprint className="w-4 h-4 text-gray-400" />
                      <p className="text-[10px] font-mono font-bold text-gray-900 break-all bg-gray-100 px-3 py-1 rounded-md">
                        {documentHash}
                      </p>
                    </div>
                  </div>
                  <div className="md:text-right space-y-1.5">
                    <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest">
                      Issuer Authority
                    </p>
                    <div className="flex items-center md:justify-end space-x-2">
                      <Award className="w-4 h-4 text-gray-900" />
                      <p className="text-[11px] font-black text-gray-900 uppercase tracking-widest">
                        {docData.issuer}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-100 flex flex-wrap gap-6">
                  <div className="flex items-center space-x-2">
                    <Search className="w-3 h-3 text-green-600" />
                    <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">
                      Live DB Scan: Success
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Lock className="w-3 h-3 text-blue-600" />
                    <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">
                      SSL Encrypted Path
                    </span>
                  </div>
                </div>
              </div>

              {/* Decorative Large Background Icon */}
              <div
                className={`absolute top-0 right-0 opacity-[0.04] group-hover:opacity-[0.08] transition-all duration-1000 transform translate-x-10 translate-y-[-10%] scale-150 ${theme.primary.replace("bg-", "text-")}`}
              >
                {theme.icon}
              </div>
            </div>
          </div>

          {/* Institutional Trust Footer */}
          <div className="pt-10 border-t border-gray-50 flex flex-col items-center space-y-10">
            <div className="flex items-center space-x-12">
              <div className="flex items-center space-x-2 opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all cursor-default">
                <Globe className="w-5 h-5" />
                <span className="text-[9px] font-black uppercase tracking-widest">
                  Global Trust
                </span>
              </div>
              <div className="flex items-center space-x-2 opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all cursor-default">
                <ShieldCheck className="w-5 h-5" />
                <span className="text-[9px] font-black uppercase tracking-widest">
                  ISO Certified
                </span>
              </div>
            </div>

            <div className="w-full flex flex-col md:flex-row gap-4">
              <Link href="/" className="flex-1">
                <button className="w-full h-16 bg-white border-2 border-gray-900 text-gray-900 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-gray-900 hover:text-white transition-all duration-500 shadow-xl shadow-gray-50 flex items-center justify-center space-x-3 group">
                  <span>Back to Official Portal</span>
                  <CheckCircle2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </button>
              </Link>
            </div>

            <p className="text-[8px] text-gray-300 font-bold uppercase tracking-[0.5em] text-center">
              Protected by Vifily Blockchain Verification Protocol
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
