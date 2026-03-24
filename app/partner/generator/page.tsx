"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { type DocumentInput } from "@/lib";
import { type PayrollInput } from "@/lib/config/payroll";
import { createClient } from "@/lib/supabase/client";
import { createDocument } from "@/actions/document";
import { createPayrollCertificate } from "@/actions/payroll";
import Link from "next/link";
import {
  ShieldCheck,
  User,
  FileText,
  Landmark,
  ChevronRight,
  Globe,
  Lock,
} from "lucide-react";

// 🚀 Dynamic Imports for better performance
const DocumentForm = dynamic(
  () => import("@/components/sections/DocumentForm"),
  {
    loading: () => <FormLoader />,
    ssr: false,
  },
);

const PayrollForm = dynamic(() => import("@/components/sections/PayrollForm"), {
  loading: () => <FormLoader />,
  ssr: false,
});

function FormLoader() {
  return (
    <div className="w-full h-96 bg-gray-50 animate-pulse rounded-[2.5rem] flex flex-col items-center justify-center space-y-4">
      <div className="w-12 h-12 border-4 border-gray-200 border-t-gray-400 rounded-full animate-spin"></div>
      <p className="text-gray-400 font-black uppercase tracking-widest text-[10px]">
        Loading Vifily Protocol...
      </p>
    </div>
  );
}

type GeneratorType = "standard" | "payroll";

export default function DocumentGeneratorPage() {
  const supabase = createClient();
  const [generatorType, setGeneratorType] = useState<GeneratorType>("standard");
  const [generatedId, setGeneratedId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const checkUser = async () => {
      if (!supabase) return;
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user) {
        setUserEmail(session.user.email ?? "Partner");
      }
    };
    checkUser();
  }, [supabase]);

  const handleStandardSubmit = async (values: DocumentInput) => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const result = await createDocument(values);
      if (result.success && "id" in result && result.id) {
        setGeneratedId(result.id);
      } else {
        setErrorMsg(result.error || "Failed to create document.");
      }
    } catch {
      setErrorMsg("Connection error.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePayrollSubmit = async (values: PayrollInput) => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const result = await createPayrollCertificate(values);
      if (result.success && "id" in result && result.id) {
        setGeneratedId(result.id);
      } else {
        setErrorMsg(result.error || "Failed to create payroll certificate.");
      }
    } catch {
      setErrorMsg("Connection error.");
    } finally {
      setIsLoading(false);
    }
  };

  if (generatedId) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-6">
        <div className="bg-white p-12 rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] border border-gray-100 max-w-md w-full text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-green-500"></div>
          <div className="w-24 h-24 bg-green-50 text-green-600 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-inner">
            <ShieldCheck className="w-12 h-12" />
          </div>
          <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tighter uppercase">
            Success!
          </h2>
          <p className="text-gray-500 mb-10 font-medium leading-relaxed">
            เอกสารระดับสากลของคุณถูกสร้างและลงทะเบียนในระบบ Vifily เรียบร้อยแล้ว
            พร้อมสำหรับการตรวจสอบ
          </p>
          <div className="space-y-4">
            <Link
              href={`/verify/doc/${generatedId}`}
              className="group flex items-center justify-between w-full py-5 px-8 bg-gray-950 text-white rounded-2xl hover:bg-gray-800 transition-all font-black uppercase tracking-widest text-xs shadow-xl shadow-gray-200"
            >
              <span>View & Download</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button
              onClick={() => setGeneratedId(null)}
              className="w-full py-5 px-8 bg-white text-gray-400 border-2 border-gray-50 rounded-2xl hover:border-gray-900 hover:text-gray-900 transition-all font-black uppercase tracking-widest text-xs"
            >
              Create Another Document
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-24 md:py-32 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-950 tracking-tighter uppercase mb-2">
              AI Generator
            </h1>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">
                Vifily International Protocol v2.2
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4 bg-white p-3 rounded-[1.5rem] border border-gray-100 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center">
              <User className="w-5 h-5 text-gray-400" />
            </div>
            <div>
              <p className="text-[8px] font-black uppercase tracking-widest text-gray-400 leading-none mb-1">
                Authorized Partner
              </p>
              <p className="text-xs font-black text-gray-900 leading-none">
                {userEmail || "Loading..."}
              </p>
            </div>
          </div>
        </div>

        {/* Generator Type Selector */}
        <div className="grid grid-cols-2 gap-4 mb-12 p-2 bg-gray-100/50 rounded-[2rem] border border-gray-100">
          <button
            onClick={() => setGeneratorType("standard")}
            className={`flex items-center justify-center space-x-3 py-5 rounded-[1.5rem] transition-all font-black uppercase tracking-widest text-[10px] ${
              generatorType === "standard"
                ? "bg-white text-gray-900 shadow-xl"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Standard Document</span>
          </button>
          <button
            onClick={() => setGeneratorType("payroll")}
            className={`flex items-center justify-center space-x-3 py-5 rounded-[1.5rem] transition-all font-black uppercase tracking-widest text-[10px] ${
              generatorType === "payroll"
                ? "bg-blue-600 text-white shadow-xl shadow-blue-100"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <Landmark className="w-4 h-4" />
            <span>Thai Payroll Cert</span>
          </button>
        </div>

        {/* Active Form */}
        <motion.div
          key={generatorType}
          initial={{ opacity: 0, x: generatorType === "standard" ? -20 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {generatorType === "standard" ? (
            <DocumentForm
              onSubmit={handleStandardSubmit}
              isLoading={isLoading}
              errorMsg={errorMsg}
            />
          ) : (
            <PayrollForm
              onSubmit={handlePayrollSubmit}
              isLoading={isLoading}
              errorMsg={errorMsg}
            />
          )}
        </motion.div>

        {/* Footer Info */}
        <div className="mt-16 pt-12 border-t border-gray-100 flex flex-col items-center space-y-6">
          <div className="flex items-center space-x-8 opacity-30 grayscale">
            <ShieldCheck className="w-6 h-6" />
            <Globe className="w-6 h-6" />
            <Lock className="w-6 h-6" />
          </div>
          <p className="text-[9px] text-gray-300 font-black uppercase tracking-[0.5em] text-center">
            Blockchain Secured • 256-bit Encryption • Vifily Standard
          </p>
        </div>
      </div>
    </div>
  );
}
