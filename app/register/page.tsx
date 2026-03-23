"use client";

import { useState } from "react";
import { supabase } from "@/lib";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShieldCheck, UserPlus, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) {
      setErrorMsg("ระบบลงทะเบียนขัดข้อง (Missing API Config)");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg("รหัสผ่านไม่ตรงกัน");
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message || "เกิดข้อผิดพลาดในการสมัครสมาชิก");
      setIsLoading(false);
    } else {
      // เมื่อสมัครสำเร็จ ให้ส่งไปหน้าแจ้งเตือนหรือหน้าหลัก
      router.push("/login?msg=สมัครสมาชิกสำเร็จ กรุณาตรวจสอบอีเมลของคุณ");
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex items-center justify-center px-6 font-sans py-20">
      <div className="max-w-md w-full">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-black tracking-tight text-gray-900 uppercase">
            Join Our Network
          </h1>
          <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.25em] mt-3 flex items-center justify-center space-x-2">
            <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
            <span>Become an Elite Vifily Partner</span>
          </p>
        </div>

        <div className="bg-white p-10 rounded-[2.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)] border border-gray-100">
          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">
                อีเมลติดต่อ (Contact Email)
              </label>
              <div className="relative">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">
                  <Mail className="w-4 h-4" />
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
                กำหนดรหัสผ่าน (Create Password)
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

            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">
                ยืนยันรหัสผ่าน (Confirm Password)
              </label>
              <div className="relative">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
              className="w-full h-16 rounded-2xl bg-gray-900 text-white font-black uppercase tracking-widest text-sm shadow-xl hover:bg-gray-800 transition-all transform active:scale-95"
            >
              {isLoading ? (
                <span>กำลังสมัครสมาชิก...</span>
              ) : (
                <div className="flex items-center space-x-2">
                  <span>ลงทะเบียนพาร์ทเนอร์</span>
                  <UserPlus className="w-4 h-4" />
                </div>
              )}
            </Button>
          </form>

          <div className="mt-10 text-center">
            <Link
              href="/login"
              className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors"
            >
              เป็นสมาชิกอยู่แล้ว?{" "}
              <span className="text-gray-900 underline underline-offset-4">
                เข้าสู่ระบบที่นี่
              </span>
            </Link>
          </div>
        </div>

        <div className="mt-12 p-8 bg-gray-50 rounded-3xl border border-gray-100">
          <p className="text-[10px] text-gray-400 leading-relaxed font-medium">
            * การสมัครสมาชิกหมายความว่าคุณยอมรับข้อตกลงการใช้งานระบบ AI
            Verification และนโยบายความเป็นส่วนตัวตามมาตรฐานสากล
          </p>
        </div>
      </div>
    </div>
  );
}
