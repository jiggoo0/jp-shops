"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { type DocumentInput } from "@/lib";
import { createClient } from "@/lib/supabase/client";
import { createDocument } from "@/actions/document";
import Link from "next/link";
import { ShieldCheck, User } from "lucide-react";

// 🚀 Dynamic Import for heavy form component (bundle-dynamic-imports)
const DocumentForm = dynamic(
  () => import("@/components/sections/DocumentForm"),
  {
    loading: () => (
      <div className="w-full h-96 bg-gray-50 animate-pulse rounded-2xl flex items-center justify-center">
        <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">
          Loading Generator Form...
        </p>
      </div>
    ),
    ssr: false, // Client-side only for form state
  },
);

export default function DocumentGeneratorPage() {
  const supabase = createClient();
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

  const handleFormSubmit = async (values: DocumentInput) => {
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const result = await createDocument(values);
      if (result.success && result.id) {
        setGeneratedId(result.id);
      } else {
        setErrorMsg(result.error || "Unknown error occurred.");
      }
    } catch {
      setErrorMsg("Failed to connect to server.");
    } finally {
      setIsLoading(false);
    }
  };

  if (generatedId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-10 rounded-2xl shadow-xl border border-gray-100 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldCheck className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-3 tracking-tight">
            สำเร็จ!
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            เอกสารระดับมืออาชีพของคุณถูกสร้างและบันทึกลงฐานข้อมูล Vifily
            เรียบร้อยแล้ว พร้อมตรวจสอบผ่าน QR Code
          </p>
          <div className="space-y-4">
            <Link
              href={`/verify/doc/${generatedId}`}
              className="block w-full py-4 px-6 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition font-bold shadow-lg"
            >
              ดูและดาวน์โหลดเอกสาร
            </Link>
            <button
              onClick={() => setGeneratedId(null)}
              className="block w-full py-4 px-6 bg-white text-gray-700 border-2 border-gray-100 rounded-xl hover:bg-gray-50 transition font-bold"
            >
              สร้างเอกสารเพิ่ม
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 py-32 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">
              AI Document Generator
            </h1>
            <p className="text-gray-600 mt-1 flex items-center">
              <ShieldCheck className="w-4 h-4 mr-1 text-green-500" />
              <span>
                สร้างเอกสารความน่าเชื่อถือสูง มาตรฐาน Vifily International
              </span>
            </p>
          </div>
          <div className="hidden sm:flex items-center space-x-3">
            <div className="bg-white px-4 py-2 rounded-lg border border-gray-100 shadow-sm flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                <User className="w-4 h-4 text-gray-500" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 leading-none mb-1">
                  Signed in as
                </span>
                <span className="text-xs font-bold text-gray-900 leading-none">
                  {userEmail || "Guest Partner"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <DocumentForm
          onSubmit={handleFormSubmit}
          isLoading={isLoading}
          errorMsg={errorMsg}
        />

        <p className="text-center text-[10px] text-gray-500 mt-8 uppercase tracking-[0.2em] font-bold">
          Secure Cloud Processing • Zero Human Touch • ISO Certified Standard
        </p>
      </div>
    </div>
  );
}
