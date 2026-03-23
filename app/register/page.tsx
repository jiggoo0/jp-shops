"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ShieldCheck,
  UserPlus,
  Mail,
  Lock,
  User,
  Phone,
  Crown,
} from "lucide-react";
import { Button } from "@/components/ui";
import { registerUser } from "@/app/actions/auth";
import { supabase, planConfig, type PlanType } from "@/lib";

export default function RegisterPage() {
  const router = useRouter();
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

    // 1. Server-side registration
    const result = await registerUser(formData);

    if (!result.success) {
      setErrorMsg(result.error || "เกิดข้อผิดพลาดในการสมัครสมาชิก");
      setIsLoading(false);
      return;
    }

    // 2. Login the user automatically
    if (supabase) {
      await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });
    }

    // 3. Redirect to Checkout
    const plan = planConfig[selectedPlan];
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceName: `Subscription: ${plan.name}`,
          amount: plan.price,
          returnUrl: window.location.origin,
          planId: selectedPlan,
        }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url; // Redirect to Stripe
      } else {
        router.push("/partner/dashboard");
      }
    } catch (error) {
      console.error("Checkout redirect failed:", error);
      router.push("/partner/pricing");
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex items-center justify-center px-6 font-sans py-20">
      <div className="max-w-4xl w-full grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Side: Info */}
        <div className="hidden lg:block">
          <div className="inline-flex items-center space-x-3 bg-gray-100 px-5 py-2.5 rounded-full mb-8 border border-gray-200">
            <ShieldCheck className="w-4 h-4 text-green-600" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600">
              Elite Partner Access
            </span>
          </div>
          <h1 className="text-5xl font-black tracking-tighter text-gray-900 uppercase leading-[0.9] mb-8">
            เข้าร่วมเป็น <br />
            <span className="text-gray-300 italic">พาร์ทเนอร์ของเรา.</span>
          </h1>
          <p className="text-gray-500 font-medium leading-relaxed mb-10">
            สมัครสมาชิกเพื่อเข้าถึงระบบ AI สร้างและตรวจสอบเอกสาร (Vifily)
            เพิ่มความน่าเชื่อถือระดับสากลให้ลูกค้าของคุณ <br className="mb-2" />
            <span className="font-bold text-gray-900">
              * ระบบจำกัดการใช้งานเฉพาะผู้ที่ชำระค่าบริการแล้วเท่านั้น
            </span>
          </p>

          <div className="space-y-6">
            <div className="flex items-center space-x-4 bg-gray-50 p-6 rounded-3xl border border-gray-100">
              <Crown className="w-8 h-8 text-yellow-500" />
              <div>
                <p className="font-black text-gray-900 uppercase">
                  Zero Error Protocol
                </p>
                <p className="text-xs text-gray-500 font-medium">
                  เอกสารแม่นยำ 100% ด้วยระบบ AI ตรวจสอบ
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="bg-white p-10 rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)] border border-gray-100">
          <div className="text-center mb-10 lg:hidden">
            <h1 className="text-3xl font-black tracking-tight text-gray-900 uppercase mb-2">
              Register
            </h1>
            <p className="text-gray-400 text-xs font-medium">
              * ต้องชำระเงินเพื่อเปิดใช้งานระบบ
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">
                  ชื่อ-นามสกุล
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-4 focus:ring-gray-900/5 focus:bg-white outline-none transition-all font-medium text-gray-900 text-sm"
                    placeholder="Full Name"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">
                  เบอร์โทรศัพท์
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, phoneNumber: e.target.value })
                    }
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-4 focus:ring-gray-900/5 focus:bg-white outline-none transition-all font-medium text-gray-900 text-sm"
                    placeholder="08X-XXX-XXXX"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">
                อีเมล (ใช้เข้าสู่ระบบ)
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-4 focus:ring-gray-900/5 focus:bg-white outline-none transition-all font-medium text-gray-900 text-sm"
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">
                รหัสผ่าน
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-4 focus:ring-gray-900/5 focus:bg-white outline-none transition-all font-medium text-gray-900 text-sm"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-900 mb-4">
                เลือกแพ็กเกจ (ชำระเงินทันที)
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
                          ? "border-gray-900 bg-gray-900 text-white"
                          : "border-gray-100 bg-white hover:border-gray-300 text-gray-500"
                      }`}
                    >
                      <p className="text-[10px] font-black uppercase tracking-widest mb-1">
                        {plan.name}
                      </p>
                      <p
                        className={`text-sm font-black ${selectedPlan === key ? "text-white" : "text-gray-900"}`}
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
              className="w-full h-16 mt-4 rounded-2xl bg-gray-900 text-white font-black uppercase tracking-widest text-sm shadow-xl hover:bg-green-600 transition-all transform active:scale-95"
            >
              {isLoading ? (
                <span>กำลังนำไปหน้าชำระเงิน...</span>
              ) : (
                <div className="flex items-center space-x-2">
                  <span>
                    สมัครและชำระเงิน ฿{planConfig[selectedPlan].price}
                  </span>
                  <UserPlus className="w-4 h-4" />
                </div>
              )}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <Link
              href="/login"
              className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors"
            >
              มีบัญชีอยู่แล้ว?{" "}
              <span className="text-gray-900 underline underline-offset-4">
                เข้าสู่ระบบ
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
