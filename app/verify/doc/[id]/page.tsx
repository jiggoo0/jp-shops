"use client";

import { use } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  CheckCircle2,
  Calendar,
  User,
  FileText,
  Lock,
  Globe,
} from "lucide-react";
import Link from "next/link";

interface VerifyPageProps {
  params: Promise<{ id: string }>;
}

export default function VerifyPage({ params }: VerifyPageProps) {
  const { id } = use(params);

  // Mock data - In a real app, you would fetch this from Supabase using the ID
  const docData = {
    id: id,
    ownerName: "Jirayu W.",
    documentType: "Premium Visa Package",
    issuedDate: "2024-03-23",
    expiryDate: "2025-03-23",
    status: "Verified",
    issuer: "JP-Visual&Docs Intelligence",
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-gray-900 font-sans p-6 md:p-12 flex items-center justify-center">
      <div className="absolute top-0 left-0 w-full h-1.5 bg-green-500"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full bg-white rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] border border-gray-50 overflow-hidden"
      >
        {/* Header Status */}
        <div className="bg-gray-900 p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-24 h-24 bg-green-500 rounded-3xl mx-auto flex items-center justify-center shadow-2xl shadow-green-500/40 mb-8"
            >
              <ShieldCheck className="w-12 h-12 text-white" />
            </motion.div>
            <h1 className="text-4xl font-black text-white tracking-tighter uppercase mb-2">
              Document Verified
            </h1>
            <p className="text-green-400 text-[10px] font-black uppercase tracking-[0.4em]">
              Authentic & Certified
            </p>
          </div>
        </div>

        {/* Document Details */}
        <div className="p-12 space-y-10">
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-1">
              <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest flex items-center">
                <User className="w-3 h-3 mr-2" /> Owner Name
              </p>
              <p className="text-lg font-black text-gray-900 uppercase tracking-tight">
                {docData.ownerName}
              </p>
            </div>
            <div className="space-y-1 text-right">
              <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest flex items-center justify-end">
                <FileText className="w-3 h-3 mr-2" /> Doc Type
              </p>
              <p className="text-lg font-black text-gray-900 uppercase tracking-tight">
                {docData.documentType}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest flex items-center">
                <Calendar className="w-3 h-3 mr-2" /> Issued Date
              </p>
              <p className="text-lg font-black text-gray-900 uppercase tracking-tight">
                {docData.issuedDate}
              </p>
            </div>
            <div className="space-y-1 text-right">
              <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest flex items-center justify-end">
                <Calendar className="w-3 h-3 mr-2" /> Expiry Date
              </p>
              <p className="text-lg font-black text-gray-900 uppercase tracking-tight text-green-600">
                {docData.expiryDate}
              </p>
            </div>
          </div>

          <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100 relative overflow-hidden">
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">
                  Document ID
                </p>
                <p className="text-xs font-mono font-bold text-gray-900">
                  {docData.id}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">
                  Issuer
                </p>
                <p className="text-xs font-bold text-gray-900 uppercase tracking-tight">
                  {docData.issuer}
                </p>
              </div>
            </div>
            <div className="absolute top-0 right-0 opacity-[0.03] transform translate-x-10 translate-y-[-10%]">
              <ShieldCheck className="w-48 h-48 text-gray-900" />
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
