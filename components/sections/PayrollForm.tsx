"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { payrollSchema, type PayrollInput } from "@/lib/config/payroll";
import {
  ShieldCheck,
  Building2,
  User,
  Landmark,
  Banknote,
  Briefcase,
} from "lucide-react";

interface PayrollFormProps {
  onSubmit: (values: PayrollInput) => Promise<void>;
  isLoading: boolean;
  errorMsg: string | null;
}

export default function PayrollForm({
  onSubmit,
  isLoading,
  errorMsg,
}: PayrollFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PayrollInput>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(payrollSchema) as any,
    defaultValues: {
      ownerName: "",
      position: "Manager",
      companyName: "JP Visual Docs Co., Ltd.",
      registrationNo: "0105563000000",
      salary: 35000,
      allowance: 5000,
      tax: 500,
      sso: 750,
      issuedDate: new Date().toISOString().split("T")[0],
      expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
        .toISOString()
        .split("T")[0],
      issuer: "JP-Visual&Docs Intelligence Authority",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
      <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden">
        {/* Form Header */}
        <div className="px-10 py-6 border-b border-gray-100 bg-blue-600 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Landmark className="w-6 h-6 text-white" />
            <h2 className="text-sm font-black uppercase tracking-widest text-white">
              Thai Standard Payroll Input
            </h2>
          </div>
          <span className="text-[10px] font-black text-blue-100 uppercase tracking-widest bg-blue-700/50 px-3 py-1 rounded-full border border-white/10">
            Bank Ready v2.2
          </span>
        </div>

        <div className="p-10 space-y-12">
          {/* Section 1: Organization & Issuer */}
          <div className="space-y-8">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 border-l-4 border-blue-600 pl-4">
              Issuer & Organization / ผู้ออกเอกสารและหน่วยงาน
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="col-span-1 md:col-span-2">
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">
                  ชื่อบริษัท (Company Name)
                </label>
                <div className="relative">
                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                  <input
                    type="text"
                    {...register("companyName")}
                    className="w-full pl-12 pr-5 py-4 border border-gray-100 bg-gray-50/50 rounded-2xl focus:ring-4 focus:ring-blue-500/5 focus:border-blue-600 outline-none transition-all font-bold text-gray-900"
                    placeholder="Company Full Name"
                  />
                </div>
                {errors.companyName && (
                  <p className="text-red-500 text-[10px] mt-2 font-black uppercase">
                    {errors.companyName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">
                  เลขทะเบียนนิติบุคคล (Registration No.)
                </label>
                <input
                  type="text"
                  {...register("registrationNo")}
                  className="w-full px-6 py-4 border border-gray-100 bg-gray-50/50 rounded-2xl focus:ring-4 focus:ring-blue-500/5 focus:border-blue-600 outline-none transition-all font-bold text-gray-900"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">
                  ชื่อผู้ออกเอกสาร (Authorized Issuer)
                </label>
                <input
                  type="text"
                  {...register("issuer")}
                  className="w-full px-6 py-4 border border-gray-100 bg-gray-50/50 rounded-2xl focus:ring-4 focus:ring-blue-500/5 focus:border-blue-600 outline-none transition-all font-bold text-gray-900"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Employee Details */}
          <div className="space-y-8">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 border-l-4 border-blue-600 pl-4">
              Employee Credentials / ข้อมูลพนักงาน
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="col-span-1 md:col-span-2">
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">
                  ชื่อ-นามสกุล พนักงาน (Full Name)
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                  <input
                    type="text"
                    {...register("ownerName")}
                    className="w-full pl-12 pr-5 py-4 border border-gray-100 bg-gray-50/50 rounded-2xl focus:ring-4 focus:ring-blue-500/5 focus:border-blue-600 outline-none transition-all font-bold text-gray-900 uppercase tracking-tighter"
                    placeholder="e.g. MR. SOMCHAI SUCCESS"
                  />
                </div>
                {errors.ownerName && (
                  <p className="text-red-500 text-[10px] mt-2 font-black uppercase">
                    {errors.ownerName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">
                  ตำแหน่ง (Job Position)
                </label>
                <div className="relative">
                  <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                  <input
                    type="text"
                    {...register("position")}
                    className="w-full pl-12 pr-5 py-4 border border-gray-100 bg-gray-50/50 rounded-2xl focus:ring-4 focus:ring-blue-500/5 focus:border-blue-600 outline-none transition-all font-bold text-gray-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">
                    วันที่ออก (Issued)
                  </label>
                  <input
                    type="date"
                    {...register("issuedDate")}
                    className="w-full px-4 py-4 border border-gray-100 bg-gray-50/50 rounded-2xl focus:ring-4 focus:ring-blue-500/5 focus:border-blue-600 outline-none transition-all font-bold text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">
                    วันหมดอายุ (Expiry)
                  </label>
                  <input
                    type="date"
                    {...register("expiryDate")}
                    className="w-full px-4 py-4 border border-gray-100 bg-gray-50/50 rounded-2xl focus:ring-4 focus:ring-blue-500/5 focus:border-blue-600 outline-none transition-all font-bold text-xs"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Financial Figures */}
          <div className="space-y-8 bg-blue-50/30 p-8 rounded-[2rem] border border-blue-50">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 flex items-center">
              <Banknote className="w-4 h-4 mr-2" /> Financial Figures /
              รายละเอียดรายได้และรายการหัก
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">
                  เงินเดือนพื้นฐาน (Basic Salary)
                </label>
                <input
                  type="number"
                  {...register("salary", { valueAsNumber: true })}
                  className="w-full px-6 py-4 border border-blue-100 bg-white rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 outline-none transition-all font-black text-gray-900 text-xl"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">
                  เบี้ยเลี้ยง/อื่นๆ (Allowance)
                </label>
                <input
                  type="number"
                  {...register("allowance", { valueAsNumber: true })}
                  className="w-full px-6 py-4 border border-blue-100 bg-white rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 outline-none transition-all font-black text-gray-900 text-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-red-400 mb-2">
                    ภาษีหัก (Tax)
                  </label>
                  <input
                    type="number"
                    {...register("tax", { valueAsNumber: true })}
                    className="w-full px-4 py-3 border border-red-50 bg-red-50/10 rounded-xl focus:ring-4 focus:ring-red-500/5 focus:border-red-400 outline-none transition-all font-bold text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-red-400 mb-2">
                    ประกันสังคม (SSO)
                  </label>
                  <input
                    type="number"
                    {...register("sso", { valueAsNumber: true })}
                    className="w-full px-4 py-3 border border-red-50 bg-red-50/10 rounded-xl focus:ring-4 focus:ring-red-500/5 focus:border-red-400 outline-none transition-all font-bold text-gray-900"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-6">
        {errorMsg && (
          <div className="mb-8 p-6 bg-red-50 border border-red-100 text-red-700 rounded-3xl text-sm font-black uppercase tracking-widest flex items-center space-x-3">
            <div className="w-2 h-2 bg-red-600 rounded-full animate-ping"></div>
            <span>{errorMsg}</span>
          </div>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-6 px-10 bg-blue-600 text-white rounded-[2rem] hover:bg-blue-700 transition-all font-black text-xl flex justify-center items-center shadow-2xl shadow-blue-200 disabled:bg-gray-300 transform hover:-translate-y-2 active:scale-[0.98]"
        >
          {isLoading ? (
            <div className="flex items-center space-x-4">
              <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span className="uppercase tracking-[0.2em]">
                Processing with Vifily AI...
              </span>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <ShieldCheck className="w-6 h-6" />
              <span className="uppercase tracking-[0.2em]">
                Generate Official Certificate
              </span>
            </div>
          )}
        </button>
      </div>
    </form>
  );
}
