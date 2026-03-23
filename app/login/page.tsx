"use client";

import { useState } from "react";
import { supabase } from "@/lib";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShieldCheck, Lock, ArrowRight, User } from "lucide-react";
import { Button } from "@/components/ui";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) {
      setErrorMsg("ระบบตรวจสอบสิทธิ์ขัดข้อง (Missing API Config)");
      return;
    }
    setIsLoading(true);
    setErrorMsg(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message || "อีเมลหรือรหัสผ่านไม่ถูกต้อง");
      setIsLoading(false);
    } else {
      router.push("/partner/dashboard");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex items-center justify-center px-6 font-sans">
      <div className="max-w-md w-full">
        {/* Brand Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-3 mb-6">
            <div className="relative w-14 h-14">
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full drop-shadow-xl"
              >
                <path
                  d="M50 5 L90 25 L90 75 L50 95 L10 75 L10 25 Z"
                  fill="#111827"
                />
                <text
                  x="50"
                  y="62"
                  textAnchor="middle"
                  fill="white"
                  fontSize="32"
                  fontWeight="900"
                >
                  JP
                </text>
              </svg>
            </div>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-gray-900 uppercase">
            Partner Login
          </h1>
          <p className="text-gray-400 text-xs font-black uppercase tracking-[0.2em] mt-3 flex items-center justify-center space-x-2">
            <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
            <span>AI Document Compliance System</span>
          </p>
        </div>

        <div className="bg-white p-10 rounded-[2.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)] border border-gray-100">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">
                อีเมลผู้เชี่ยวชาญ (Partner Email)
              </label>
              <div className="relative">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-gray-900/5 focus:bg-white outline-none transition-all font-medium text-gray-900"
                  placeholder="name@company.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">
                รหัสผ่านลับ (Security Key)
              </label>
              <div className="relative">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-gray-900/5 focus:bg-white outline-none transition-all font-medium text-gray-900"
                  placeholder="••••••••"
                  required
                />
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
              className="w-full h-16 rounded-2xl bg-gray-900 text-white font-black uppercase tracking-widest text-sm shadow-xl hover:bg-gray-800 transition-all transform active:scale-95 disabled:bg-gray-300"
            >
              {isLoading ? (
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>กำลังตรวจสอบ...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <span>เข้าสู่ระบบพาร์ทเนอร์</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </Button>
          </form>

          <div className="mt-10 text-center">
            <Link
              href="/register"
              className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors"
            >
              ยังไม่มีบัญชีพาร์ทเนอร์?{" "}
              <span className="text-gray-900 underline underline-offset-4">
                สมัครใหม่ที่นี่
              </span>
            </Link>
          </div>
        </div>

        <p className="mt-12 text-center text-[10px] text-gray-400 font-black uppercase tracking-[0.25em]">
          Powered by JP Visual & Docs Group.
        </p>
      </div>
    </div>
  );
}
