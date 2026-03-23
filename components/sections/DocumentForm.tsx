"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type DocumentInput } from "@/lib";
import { ShieldCheck, FileText } from "lucide-react";
import { z } from "zod";

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

type FormValues = z.infer<typeof uiSchema>;

interface DocumentFormProps {
  onSubmit: (values: DocumentInput) => Promise<void>;
  isLoading: boolean;
  errorMsg: string | null;
}

export default function DocumentForm({
  onSubmit,
  isLoading,
  errorMsg,
}: DocumentFormProps) {
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

  return (
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
      </div>
    </form>
  );
}
