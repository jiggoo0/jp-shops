import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  Users,
  FileText,
  Activity,
  ArrowRight,
  Hotel,
  CalendarCheck,
} from "lucide-react";

export default async function AdminDashboard() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // ตรวจสอบสิทธิ์ Admin จากตาราง users
  const { data: profile } = await supabase
    .from("users")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (profile?.role !== "admin") {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 md:p-12 selection:bg-white selection:text-gray-900">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-16">
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tighter mb-2 italic">
              Control Center
            </h1>
            <p className="text-gray-400 font-medium text-sm">
              ศูนย์บัญชาการหลัก JP Visual Docs (Admin Only)
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-3 bg-gray-800 px-5 py-3 rounded-xl border border-gray-700 shadow-inner">
            <Activity className="w-5 h-5 text-green-400" />
            <span className="text-xs font-black text-gray-300 uppercase tracking-widest">
              System Online
            </span>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Partner Management */}
          <Link href="/admin/users" className="group block">
            <div className="bg-gray-800/50 p-8 rounded-3xl border border-gray-700 hover:bg-gray-800 hover:border-gray-600 transition-all duration-300 h-full">
              <div className="w-12 h-12 bg-white text-gray-900 rounded-xl flex items-center justify-center mb-6 shadow-xl shadow-white/5">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black mb-3 uppercase tracking-tight">
                จัดการพาร์ทเนอร์
              </h3>
              <p className="text-gray-400 text-sm font-medium mb-8">
                ดูแลรายชื่อพาร์ทเนอร์ อนุมัติสิทธิ์ (Activate)
                หรือตรวจสอบการต่ออายุ
              </p>
              <div className="flex items-center text-xs font-black uppercase tracking-[0.2em] text-gray-500 group-hover:text-white transition-colors">
                <span>Manage Users</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Hotel & Booking Management (NEW) */}
          <Link href="/admin/bookings" className="group block">
            <div className="bg-blue-600/10 p-8 rounded-3xl border border-blue-500/30 hover:bg-blue-600/20 hover:border-blue-500/60 transition-all duration-300 h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Hotel className="w-24 h-24" />
              </div>
              <div className="w-12 h-12 bg-blue-500 text-white rounded-xl flex items-center justify-center mb-6 shadow-xl shadow-blue-500/20">
                <CalendarCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black mb-3 uppercase tracking-tight text-blue-100">
                จัดการ Booking & โรงแรม
              </h3>
              <p className="text-blue-200/50 text-sm font-medium mb-8">
                ควบคุมข้อมูลการจอง รายการโรงแรมยุโรป และสถานะการจองทั้งหมด
              </p>
              <div className="flex items-center text-xs font-black uppercase tracking-[0.2em] text-blue-400 group-hover:text-white transition-colors">
                <span>Manage Bookings</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Document QC */}
          <Link
            href="/admin/dashboard"
            className="group block opacity-50 hover:opacity-100 transition-opacity"
          >
            <div className="bg-gray-800/30 p-8 rounded-3xl border border-gray-800 transition-all duration-300 h-full">
              <div className="w-12 h-12 bg-gray-700 text-gray-400 rounded-xl flex items-center justify-center mb-6">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black mb-3 uppercase tracking-tight">
                ตรวจสอบเอกสาร (QC)
              </h3>
              <p className="text-gray-500 text-sm font-medium mb-8">
                สุ่มตรวจเอกสารความเชื่อมั่นที่ถูกสร้างขึ้นทั้งหมดในระบบ
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
