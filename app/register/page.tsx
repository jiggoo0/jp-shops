"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  UserPlus,
  Mail,
  Lock,
  User,
  Phone,
  Crown,
  ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui";
import { registerUser } from "@/actions/auth";
import { planConfig, type PlanType } from "@/lib";
import { createClient } from "@/lib/supabase/client";
import { motion } from "framer-motion";

export default function RegisterPage() {
  const router = useRouter();
  const supabase = createClient();
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
  });
  const [selectedPlan, setSelectedPlan] = useState<PlanType>("30_days");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    const result = await registerUser({ ...formData, planId: selectedPlan });

    if (!result.success) {
      setErrorMsg(result.error || "เกิดข้อผิดพลาดในการสมัครสมาชิก");
      setIsLoading(false);
      return;
    }

    const userId = result.userId;

    if (supabase) {
      await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });
    }

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId: selectedPlan,
          category: "subscription",
          userId: userId,
          returnUrl: window.location.origin,
        }),
      });

      const data = await res.json();
      const checkoutUrl = data.data?.url || data.url;
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      } else {
        router.push("/partner/pricing");
      }
    } catch (error) {
      console.error("Checkout redirect failed:", error);
      router.push("/partner/pricing");
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex items-center justify-center px-6 font-sans py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gray-900"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-green-50/30 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-5xl w-full grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <div className="hidden lg:block">
          <Link
            href="/"
            className="inline-flex items-center text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-gray-900 transition-colors mb-12 group"
          >
            <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
            Back to Portal
          </Link>

          <div className="inline-flex items-center space-x-3 bg-gray-100 px-5 py-2.5 rounded-full mb-8 border border-gray-200">
            <ShieldCheck className="w-4 h-4 text-green-600" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600">
              Elite Partner Access
            </span>
          </div>
          <h1 className="text-6xl font-black tracking-tighter text-gray-900 uppercase leading-[0.9] mb-8">
            เข้าร่วมเป็น <br />
            <span className="text-gray-300 italic">พาร์ทเนอร์ของเรา.</span>
          </h1>
          <p className="text-gray-600 font-medium leading-relaxed mb-12 max-w-md">
            สมัครสมาชิกเพื่อเข้าถึงระบบ AI สร้างและตรวจสอบเอกสาร (Vifily)
            เพิ่มความน่าเชื่อถือระดับสากลให้ลูกค้าของคุณ <br className="mb-4" />
            <span className="font-bold text-gray-900 flex items-center">
              <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
              ระบบจำกัดการใช้งานเฉพาะผู้ที่ชำระค่าบริการแล้วเท่านั้น
            </span>
          </p>

          <div className="space-y-6">
            <div className="flex items-center space-x-5 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-50">
              <div className="w-14 h-14 bg-gray-900 rounded-2xl flex items-center justify-center text-white">
                <Crown className="w-7 h-7 text-yellow-400" />
              </div>
              <div>
                <p className="font-black text-gray-900 uppercase tracking-tight">
                  Zero Error Protocol
                </p>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">
                  AI Validation Engine
                </p>
              </div>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="bg-white p-10 md:p-12 rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] border border-gray-100"
        >
          <div className="text-center mb-10 lg:hidden">
            <h1 className="text-3xl font-black tracking-tight text-gray-900 uppercase mb-2">
              Register
            </h1>
            <p className="text-gray-500 text-xs font-black uppercase tracking-widest">
              Elite Partner Enrollment
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2">
                  ชื่อ-นามสกุล
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-gray-900/5 focus:bg-white outline-none transition-all font-bold text-gray-900 text-sm"
                    placeholder="Full Name"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2">
                  เบอร์โทรศัพท์
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, phoneNumber: e.target.value })
                    }
                    className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-gray-900/5 focus:bg-white outline-none transition-all font-bold text-gray-900 text-sm"
                    placeholder="08X-XXX-XXXX"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2">
                อีเมล (Account ID)
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-gray-900/5 focus:bg-white outline-none transition-all font-bold text-gray-900 text-sm"
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2">
                รหัสผ่าน (Security Key)
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-gray-900/5 focus:bg-white outline-none transition-all font-bold text-gray-900 text-sm"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100">
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-900 mb-4">
                เลือกแพ็กเกจเปิดระบบ
              </label>
              <div className="grid grid-cols-2 gap-3">
                {(Object.keys(planConfig) as PlanType[]).map((key) => {
                  const plan = planConfig[key];
                  return (
                    <div
                      key={key}
                      onClick={() => setSelectedPlan(key)}
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                        selectedPlan === key
                          ? "border-gray-900 bg-gray-900 text-white shadow-lg"
                          : "border-gray-50 bg-gray-50/50 hover:border-gray-200 text-gray-500"
                      }`}
                    >
                      <p className="text-[9px] font-black uppercase tracking-widest mb-1 opacity-60">
                        {plan.name}
                      </p>
                      <p
                        className={`text-xs font-black ${selectedPlan === key ? "text-white" : "text-gray-900"}`}
                      >
                        ฿{plan.price.toLocaleString()}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {errorMsg && (
              <div className="p-4 bg-red-50 border border-red-100 text-red-700 rounded-xl text-xs font-bold flex items-center space-x-2">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                <span>{errorMsg}</span>
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-20 mt-4 rounded-2xl bg-gray-900 text-white font-black uppercase tracking-widest text-xs shadow-2xl hover:bg-green-600 transition-all transform active:scale-95"
            >
              {isLoading ? (
                <span>Redirecting to payment...</span>
              ) : (
                <div className="flex items-center space-x-3">
                  <span>
                    Pay & Activate Account ฿
                    {planConfig[selectedPlan].price.toLocaleString()}
                  </span>
                  <UserPlus className="w-4 h-4" />
                </div>
              )}
            </Button>
          </form>

          <div className="mt-10 text-center">
            <Link
              href="/login"
              className="text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-gray-900 transition-colors"
            >
              Already a partner?{" "}
              <span className="text-gray-900 underline underline-offset-4">
                Login here
              </span>
            </Link>
          </div>
        </motion.div>

        {/* UNLINK-GLOBAL TRUST SEAL (Mobile) */}
        <div className="lg:hidden flex flex-col items-center mt-12 space-y-4">
          <a
            href="https://www.unlink-th.com"
            target="_blank"
            rel="noopener"
            title="Verified by UNLINK-GLOBAL"
            className="hover:scale-105 transition-transform duration-300 block bg-white p-2 rounded-2xl border border-gray-100 shadow-sm"
          >
            <Image
              src="https://www.unlink-th.com/branding/verify-badge.webp"
              alt="Verified by UNLINK-GLOBAL Digital Reputation Management"
              width={80}
              height={80}
              className="w-16 h-auto grayscale hover:grayscale-0 transition-all duration-500"
            />
          </a>
          <p className="text-[10px] text-gray-300 font-black uppercase tracking-[0.4em]">
            JP Visual & Docs &copy; {new Date().getFullYear()}
          </p>
        </div>
      </div>

      {/* UNLINK-GLOBAL TRUST SEAL (Desktop) */}
      <div className="hidden lg:flex absolute bottom-12 left-1/2 -translate-x-1/2 flex-col items-center space-y-4">
        <a
          href="https://www.unlink-th.com"
          target="_blank"
          rel="noopener"
          title="Verified by UNLINK-GLOBAL"
          className="hover:scale-105 transition-transform duration-300 block bg-white p-2 rounded-2xl border border-gray-100 shadow-sm"
        >
          <Image
            src="https://www.unlink-th.com/branding/verify-badge.webp"
            alt="Verified by UNLINK-GLOBAL Digital Reputation Management"
            width={80}
            height={80}
            className="w-16 h-auto grayscale hover:grayscale-0 transition-all duration-500"
          />
        </a>
        <p className="text-[10px] text-gray-300 font-black uppercase tracking-[0.4em]">
          JP Visual & Docs &copy; {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
