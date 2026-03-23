"use client";

import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type DocumentInput, supabase } from "@/lib";
import { createDocument } from "@/app/actions/document";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Plus,
  Trash2,
  ShieldCheck,
  Briefcase,
  FileText,
  LogOut,
  User,
} from "lucide-react";
import { z } from "zod";

type FormValues = {
  type: "payslip" | "salary_certificate";
  companyName: string;
  employeeName: string;
  position: string;
  yearsOfService: number;
  baseSalary: number;
  issueDate: string;
  otherEarningsList: { label: string; amount: number }[];
  deductionsList: { label: string; amount: number }[];
};

const uiSchema = z.object({
  type: z.enum(["payslip", "salary_certificate"]),
  companyName: z.string().min(2, "Company name is required"),
  employeeName: z.string().min(2, "Employee name is required"),
  position: z.string().min(2, "Position is required"),
  yearsOfService: z.number().min(0),
  baseSalary: z.number().positive("Base salary is required"),
  issueDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  otherEarningsList: z.array(
    z.object({
      label: z.string(),
      amount: z.number(),
    }),
  ),
  deductionsList: z.array(
    z.object({
      label: z.string(),
      amount: z.number(),
    }),
  ),
});

export default function DocumentGeneratorPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
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

  const handleLogout = async () => {
    if (!supabase) return;
    setIsLoggingOut(true);
    try {
      await supabase.auth.signOut();
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Error logging out:", error);
      setIsLoggingOut(false);
    }
  };

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(uiSchema),
    defaultValues: {
      type: "payslip",
      companyName: "",
      employeeName: "",
      position: "",
      yearsOfService: 1,
      baseSalary: 0,
      issueDate: new Date().toISOString().split("T")[0],
      otherEarningsList: [{ label: "OT / Allowance", amount: 0 }],
      deductionsList: [{ label: "Social Security", amount: 0 }],
    },
  });

  const {
    fields: earningFields,
    append: appendEarning,
    remove: removeEarning,
  } = useFieldArray({
    control,
    name: "otherEarningsList",
  });

  const {
    fields: deductionFields,
    append: appendDeduction,
    remove: removeDeduction,
  } = useFieldArray({
    control,
    name: "deductionsList",
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    setErrorMsg(null);

    // Transform List back to Record<string, number> for the Server Action
    const otherEarnings: Record<string, number> = {};
    values.otherEarningsList.forEach((item) => {
      if (item.label && item.amount > 0)
        otherEarnings[item.label] = item.amount;
    });

    const deductions: Record<string, number> = {};
    values.deductionsList.forEach((item) => {
      if (item.label && item.amount > 0) deductions[item.label] = item.amount;
    });

    const finalData: DocumentInput = {
      type: values.type,
      companyName: values.companyName,
      employeeName: values.employeeName,
      position: values.position,
      yearsOfService: values.yearsOfService,
      baseSalary: values.baseSalary,
      issueDate: values.issueDate,
      otherEarnings,
      deductions,
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

  const docType = watch("type");

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
    <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
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
          <div className="flex items-center space-x-3">
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
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="p-3 bg-white text-gray-400 hover:text-red-500 rounded-xl border border-gray-100 shadow-sm transition-all active:scale-95 disabled:opacity-50"
              title="Logout from System"
            >
              <LogOut
                className={`w-5 h-5 ${isLoggingOut ? "animate-pulse" : ""}`}
              />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-8 py-5 border-b border-gray-100 bg-gray-50/50 flex items-center space-x-3">
              <FileText className="w-5 h-5 text-gray-400" />
              <h2 className="text-sm font-black uppercase tracking-widest text-gray-900">
                General Information
              </h2>
            </div>

            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="col-span-2">
                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">
                  ประเภทเอกสาร (Document Type)
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() =>
                      register("type").onChange({
                        target: { value: "payslip", name: "type" },
                      })
                    }
                    className={`py-4 px-6 rounded-xl border-2 font-bold transition-all flex items-center justify-center space-x-2 ${docType === "payslip" ? "border-gray-900 bg-gray-900 text-white shadow-lg" : "border-gray-100 bg-white text-gray-400 hover:border-gray-200"}`}
                  >
                    <span>สลิปเงินเดือน (Payslip)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      register("type").onChange({
                        target: { value: "salary_certificate", name: "type" },
                      })
                    }
                    className={`py-4 px-6 rounded-xl border-2 font-bold transition-all flex items-center justify-center space-x-2 ${docType === "salary_certificate" ? "border-gray-900 bg-gray-900 text-white shadow-lg" : "border-gray-100 bg-white text-gray-400 hover:border-gray-200"}`}
                  >
                    <span>ใบรับรองเงินเดือน (Certificate)</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">
                  ชื่อบริษัท (Company Name)
                </label>
                <input
                  type="text"
                  {...register("companyName")}
                  className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-gray-900/5 focus:border-gray-900 outline-none transition-all font-medium"
                  placeholder="e.g. JP Visual Docs Co., Ltd."
                />
                {errors.companyName && (
                  <p className="text-red-500 text-xs mt-2 font-bold">
                    {errors.companyName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">
                  วันที่ออกเอกสาร (Issue Date)
                </label>
                <input
                  type="date"
                  {...register("issueDate")}
                  className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-gray-900/5 focus:border-gray-900 outline-none transition-all font-medium"
                />
                {errors.issueDate && (
                  <p className="text-red-500 text-xs mt-2 font-bold">
                    {errors.issueDate.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-8 py-5 border-b border-gray-100 bg-gray-50/50 flex items-center space-x-3">
              <Briefcase className="w-5 h-5 text-gray-400" />
              <h2 className="text-sm font-black uppercase tracking-widest text-gray-900">
                Employee & Financial Profile
              </h2>
            </div>

            <div className="p-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">
                    ชื่อพนักงาน (Employee Name)
                  </label>
                  <input
                    type="text"
                    {...register("employeeName")}
                    className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-gray-900/5 focus:border-gray-900 outline-none transition-all font-medium"
                  />
                  {errors.employeeName && (
                    <p className="text-red-500 text-xs mt-2 font-bold">
                      {errors.employeeName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">
                    ตำแหน่งงาน (Position)
                  </label>
                  <input
                    type="text"
                    {...register("position")}
                    className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-gray-900/5 focus:border-gray-900 outline-none transition-all font-medium"
                  />
                  {errors.position && (
                    <p className="text-red-500 text-xs mt-2 font-bold">
                      {errors.position.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">
                    อายุงาน / ปี (Years of Service)
                  </label>
                  <input
                    type="number"
                    {...register("yearsOfService", { valueAsNumber: true })}
                    className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-gray-900/5 focus:border-gray-900 outline-none transition-all font-medium"
                  />
                  {errors.yearsOfService && (
                    <p className="text-red-500 text-xs mt-2 font-bold">
                      {errors.yearsOfService.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">
                    เงินเดือนพื้นฐาน (Base Salary)
                  </label>
                  <div className="relative">
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 font-bold">
                      ฿
                    </span>
                    <input
                      type="number"
                      {...register("baseSalary", { valueAsNumber: true })}
                      className="w-full pl-10 pr-5 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-gray-900/5 focus:border-gray-900 outline-none transition-all font-bold text-lg"
                    />
                  </div>
                  {errors.baseSalary && (
                    <p className="text-red-500 text-xs mt-2 font-bold">
                      {errors.baseSalary.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Dynamic Earnings Section */}
              <div className="pt-6 border-t border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-sm font-black uppercase tracking-widest text-gray-900">
                    รายรับอื่นๆ (Other Earnings)
                  </h3>
                  <button
                    type="button"
                    onClick={() => appendEarning({ label: "", amount: 0 })}
                    className="flex items-center space-x-2 text-xs font-bold text-gray-900 bg-gray-100 px-4 py-2 rounded-full hover:bg-gray-200 transition"
                  >
                    <Plus className="w-3 h-3" />
                    <span>เพิ่มรายการรายรับ</span>
                  </button>
                </div>
                <div className="space-y-4">
                  {earningFields.map((field, index) => (
                    <div key={field.id} className="flex space-x-4 items-start">
                      <div className="flex-1">
                        <input
                          {...register(
                            `otherEarningsList.${index}.label` as const,
                          )}
                          placeholder="e.g. Bonus, OT"
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-gray-900 outline-none text-sm"
                        />
                      </div>
                      <div className="w-32">
                        <input
                          type="number"
                          {...register(
                            `otherEarningsList.${index}.amount` as const,
                            { valueAsNumber: true },
                          )}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-gray-900 outline-none text-sm font-bold"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeEarning(index)}
                        className="p-2 text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dynamic Deductions Section */}
              <div className="pt-6 border-t border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 text-red-600">
                    รายการหัก (Deductions)
                  </h3>
                  <button
                    type="button"
                    onClick={() => appendDeduction({ label: "", amount: 0 })}
                    className="flex items-center space-x-2 text-xs font-bold text-red-600 bg-red-50 px-4 py-2 rounded-full hover:bg-red-100 transition"
                  >
                    <Plus className="w-3 h-3" />
                    <span>เพิ่มรายการหัก</span>
                  </button>
                </div>
                <div className="space-y-4">
                  {deductionFields.map((field, index) => (
                    <div key={field.id} className="flex space-x-4 items-start">
                      <div className="flex-1">
                        <input
                          {...register(
                            `deductionsList.${index}.label` as const,
                          )}
                          placeholder="e.g. Social Security"
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-gray-900 outline-none text-sm"
                        />
                      </div>
                      <div className="w-32">
                        <input
                          type="number"
                          {...register(
                            `deductionsList.${index}.amount` as const,
                            { valueAsNumber: true },
                          )}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-gray-900 outline-none text-sm font-bold text-red-600"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeDeduction(index)}
                        className="p-2 text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
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
