"use client";

import { useState } from "react";
import { supabase } from "@/lib";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Lock, ArrowRight, User, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui";
import { motion } from "framer-motion";

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

    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message || "อีเมลหรือรหัสผ่านไม่ถูกต้อง");
      setIsLoading(false);
    } else {
      // ดึงข้อมูล Profile ล่าสุด
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role, subscription_status, subscription_end_date")
        .eq("id", authData.user.id)
        .single();

      if (profileError) {
        console.error("Profile fetch error:", profileError);
      }

      // รีเฟรชสถานะฝั่ง Server ก่อนเปลี่ยนหน้า
      router.refresh();

      if (profile?.role === "admin") {
        router.push("/admin/dashboard");
      } else {
        const now = new Date();
        const expiry = profile?.subscription_end_date 
          ? new Date(profile.subscription_end_date) 
          : null;

        const isNotActive = !expiry || expiry < now || profile?.subscription_status !== "active";

        if (isNotActive) {
          router.push("/partner/pricing");
        } else {
          router.push("/partner/dashboard");
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex items-center justify-center px-6 font-sans relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gray-900"></div>
      <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-gray-50 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-md w-full relative z-10">
        <Link
          href="/"
          className="inline-flex items-center text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors mb-12 group"
        >
          <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
          Back to Portal
        </Link>

        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center space-x-3 mb-8"
          >
            <div className="relative w-16 h-16">
              <Image
                src="/logo.svg"
                alt="JP Visual Docs"
                width={64}
                height={64}
                className="drop-shadow-2xl"
              />
            </div>
          </motion.div>
          <h1 className="text-4xl font-black tracking-tighter text-gray-900 uppercase italic">
            Elite <span className="text-gray-300">Login.</span>
          </h1>
          <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.3em] mt-4 flex items-center justify-center space-x-2">
            <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
            <span>Secure Access Protocol</span>
          </p>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-10 md:p-12 rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] border border-gray-100"
        >
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3">
                Partner Email
              </label>
              <div className="relative">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-gray-900/5 focus:bg-white outline-none transition-all font-bold text-gray-900 text-sm"
                  placeholder="name@company.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3">
                Security Key
              </label>
              <div className="relative">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-gray-900/5 focus:bg-white outline-none transition-all font-bold text-gray-900 text-sm"
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
              className="w-full h-20 rounded-2xl bg-gray-900 text-white font-black uppercase tracking-widest text-xs shadow-2xl hover:bg-green-600 transition-all transform active:scale-95 disabled:bg-gray-300"
            >
              {isLoading ? (
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Authenticating...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <span>Enter Dashboard</span>
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
              Need a partner account?{" "}
              <span className="text-gray-900 underline underline-offset-4">
                Register here
              </span>
            </Link>
          </div>
        </motion.div>

        <p className="mt-12 text-center text-[10px] text-gray-300 font-black uppercase tracking-[0.4em]">
          JP Visual & Docs &copy; {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
