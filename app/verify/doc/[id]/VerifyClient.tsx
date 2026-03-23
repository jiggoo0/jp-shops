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
  };
}

export default function VerifyClient({ docData }: VerifyClientProps) {
  const isFinancial =
    docData.documentType.toLowerCase().includes("loan") ||
    docData.documentType.toLowerCase().includes("สินเชื่อ");
  const isTravel =
    docData.documentType.toLowerCase().includes("visa") ||
    docData.documentType.toLowerCase().includes("วีซ่า") ||
    docData.documentType.toLowerCase().includes("travel");

  // Choose Theme based on Document Type
  const theme = isFinancial
    ? {
        primary: "bg-amber-600",
        shadow: "shadow-amber-500/40",
        icon: <Briefcase className="w-12 h-12 text-white" />,
      }
    : isTravel
      ? {
          primary: "bg-blue-600",
          shadow: "shadow-blue-500/40",
          icon: <Plane className="w-12 h-12 text-white" />,
        }
      : {
          primary: "bg-green-500",
          shadow: "shadow-green-500/40",
          icon: <ShieldCheck className="w-12 h-12 text-white" />,
        };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-gray-900 font-sans p-4 md:p-12 flex items-center justify-center">
      <div
        className={`absolute top-0 left-0 w-full h-1.5 ${theme.primary}`}
      ></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full bg-white rounded-[2rem] md:rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] border border-gray-50 overflow-hidden"
      >
        {/* Header Status */}
        <div className="bg-gray-900 p-8 md:p-12 text-center relative overflow-hidden">
          <div
            className={`absolute top-0 right-0 w-32 h-32 ${theme.primary}/10 rounded-full blur-3xl`}
          ></div>
          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className={`w-20 h-20 md:w-24 md:h-24 ${theme.primary} rounded-3xl mx-auto flex items-center justify-center shadow-2xl ${theme.shadow} mb-6 md:mb-8`}
            >
              {theme.icon}
            </motion.div>
            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tighter uppercase mb-2">
              Document {docData.status}
            </h1>
            <p className="text-gray-300 text-[9px] font-black uppercase tracking-[0.4em]">
              Authentic & Certified Portal
            </p>
          </div>
        </div>

        {/* Document Details */}
        <div className="p-12 space-y-10">
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-1">
              <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest flex items-center">
                <User className="w-3 h-3 mr-2" /> Owner Name
              </p>
              <p className="text-lg font-black text-gray-900 uppercase tracking-tight">
                {docData.ownerName}
              </p>
            </div>
            <div className="space-y-1 text-right">
              <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest flex items-center justify-end">
                <FileText className="w-3 h-3 mr-2" /> Doc Type
              </p>
              <p className="text-lg font-black text-gray-900 uppercase tracking-tight">
                {docData.documentType}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest flex items-center">
                <Calendar className="w-3 h-3 mr-2" /> Issued Date
              </p>
              <p className="text-lg font-black text-gray-900 uppercase tracking-tight">
                {docData.issuedDate}
              </p>
            </div>
            <div className="space-y-1 text-right">
              <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest flex items-center justify-end">
                <Calendar className="w-3 h-3 mr-2" /> Expiry Date
              </p>
              <p
                className={`text-lg font-black uppercase tracking-tight ${theme.primary.replace("bg-", "text-")}`}
              >
                {docData.expiryDate}
              </p>
            </div>
          </div>

          <div className="p-8 bg-gray-50 rounded-2xl md:rounded-[2rem] border border-gray-100 relative overflow-hidden group">
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">
                  System Protocol ID
                </p>
                <p className="text-[10px] font-mono font-bold text-gray-900 break-all md:break-normal">
                  {docData.id}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">
                  Auth Issuer
                </p>
                <p className="text-[10px] font-bold text-gray-900 uppercase tracking-tight">
                  {docData.issuer}
                </p>
              </div>
            </div>
            <div
              className={`absolute top-0 right-0 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700 transform translate-x-10 translate-y-[-10%] ${theme.primary.replace("bg-", "text-")}`}
            >
              {theme.icon}
            </div>
          </div>

          <div className="pt-8 border-t border-gray-50 flex flex-col items-center space-y-6">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2 grayscale opacity-50">
                <Lock className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">
                  Encrypted Data
                </span>
              </div>
              <div className="flex items-center space-x-2 grayscale opacity-50">
                <Globe className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">
                  Global Access
                </span>
              </div>
            </div>

            <Link href="/" className="w-full">
              <button className="w-full h-16 bg-white border-2 border-gray-900 text-gray-900 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-gray-900 hover:text-white transition-all duration-500 shadow-xl shadow-gray-100 flex items-center justify-center space-x-2 group">
                <span>Back to Home Portal</span>
                <CheckCircle2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
