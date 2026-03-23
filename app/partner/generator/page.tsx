"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type DocumentInput, supabase } from "@/lib";
import { createDocument } from "@/app/actions/document";
import Link from "next/link";
import { ShieldCheck, FileText, User } from "lucide-react";
import { z } from "zod";

type FormValues = {
  ownerName: string;
  documentType: string;
  issuedDate: string;
  expiryDate: string;
  status: string;
  issuer: string;
};

const uiSchema = z.object({
  ownerName: z.string().min(2, "Owner name is required"),
  documentType: z.string().min(2, "Document type is required"),
  issuedDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  expiryDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  status: z.string().min(2, "Status is required"),
  issuer: z.string().min(2, "Issuer is required"),
});

export default function DocumentGeneratorPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedId, setGeneratedId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

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
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(uiSchema),
    defaultValues: {
      ownerName: "",
      documentType: "Premium Visa Package",
      issuedDate: new Date().toISOString().split("T")[0],
      expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
        .toISOString()
        .split("T")[0],
      status: "Verified",
      issuer: "JP-Visual&Docs Intelligence",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    setErrorMsg(null);

    const finalData: DocumentInput = {
      ownerName: values.ownerName,
      documentType: values.documentType,
      issuedDate: values.issuedDate,
      expiryDate: values.expiryDate,
      status: values.status,
      issuer: values.issuer,
    };

    try {
      const result = await createDocument(finalData);
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
          <p className="text-gray-500 mb-8 leading-relaxed">
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
            <p className="text-gray-500 mt-1 flex items-center">
              <ShieldCheck className="w-4 h-4 mr-1 text-green-500" />
              <span>
                สร้างเอกสารความน่าเชื่อถือสูง มาตรฐาน Vifily International
              </span>
            </p>
          </div>
          <div className="hidden sm:flex items-center space-x-3">
            <div className="bg-white px-4 py-2 rounded-lg border border-gray-100 shadow-sm flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                <User className="w-4 h-4 text-gray-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 leading-none mb-1">
                  Signed in as
                </span>
                <span className="text-xs font-bold text-gray-900 leading-none">
                  {userEmail || "Guest Partner"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-8 py-5 border-b border-gray-100 bg-gray-50/50 flex items-center space-x-3">
              <FileText className="w-5 h-5 text-gray-400" />
              <h2 className="text-sm font-black uppercase tracking-widest text-gray-900">
                Vifily Document Details
              </h2>
            </div>

            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="col-span-2">
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">
                  ชื่อเจ้าของเอกสาร (Owner Name)
                </label>
                <input
                  type="text"
                  {...register("ownerName")}
                  className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-gray-900/5 focus:border-gray-900 outline-none transition-all font-medium"
                  placeholder="e.g. Somchai S."
                />
                {errors.ownerName && (
                  <p className="text-red-500 text-xs mt-2 font-bold">
                    {errors.ownerName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">
                  ประเภทเอกสาร (Document Type)
                </label>
                <input
                  type="text"
                  {...register("documentType")}
                  className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-gray-900/5 focus:border-gray-900 outline-none transition-all font-medium"
                  placeholder="e.g. Premium Visa Package"
                />
                {errors.documentType && (
                  <p className="text-red-500 text-xs mt-2 font-bold">
                    {errors.documentType.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">
                  สถานะเอกสาร (Status)
                </label>
                <input
                  type="text"
                  {...register("status")}
                  className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-gray-900/5 focus:border-gray-900 outline-none transition-all font-medium"
                  placeholder="e.g. Verified"
                />
                {errors.status && (
                  <p className="text-red-500 text-xs mt-2 font-bold">
                    {errors.status.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">
                  วันที่ออกเอกสาร (Issued Date)
                </label>
                <input
                  type="date"
                  {...register("issuedDate")}
                  className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-gray-900/5 focus:border-gray-900 outline-none transition-all font-medium"
                />
                {errors.issuedDate && (
                  <p className="text-red-500 text-xs mt-2 font-bold">
                    {errors.issuedDate.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">
                  วันหมดอายุ (Expiry Date)
                </label>
                <input
                  type="date"
                  {...register("expiryDate")}
                  className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-gray-900/5 focus:border-gray-900 outline-none transition-all font-medium"
                />
                {errors.expiryDate && (
                  <p className="text-red-500 text-xs mt-2 font-bold">
                    {errors.expiryDate.message}
                  </p>
                )}
              </div>

              <div className="col-span-2">
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">
                  ผู้ออกเอกสาร (Issuer)
                </label>
                <input
                  type="text"
                  {...register("issuer")}
                  className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-gray-900/5 focus:border-gray-900 outline-none transition-all font-medium"
                  placeholder="e.g. JP-Visual&Docs Intelligence"
                />
                {errors.issuer && (
                  <p className="text-red-500 text-xs mt-2 font-bold">
                    {errors.issuer.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="pt-6">
            {errorMsg && (
              <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-700 rounded-xl text-sm font-bold flex items-center space-x-2">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                <span>{errorMsg}</span>
              </div>
            )}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-5 px-6 bg-gray-900 text-white rounded-2xl hover:bg-gray-800 transition font-black text-xl flex justify-center items-center shadow-2xl disabled:bg-gray-400 transform hover:-translate-y-1 active:scale-[0.98]"
            >
              {isLoading ? (
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>กำลังสร้างเอกสารด้วย AI...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-6 h-6" />
                  <span>ยืนยันข้อมูลและสร้างเอกสาร Vifily</span>
                </div>
              )}
            </button>
            <p className="text-center text-[10px] text-gray-400 mt-4 uppercase tracking-[0.2em] font-bold">
              Secure Cloud Processing • Zero Human Touch • ISO Certified
              Standard
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
