import Link from "next/link";
import { ShieldCheck, FileText, Clock, ArrowRight } from "lucide-react";

export default function PartnerDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-8 md:p-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tight text-gray-900 mb-2">
              Partner Dashboard
            </h1>
            <p className="text-gray-500 font-medium text-sm">
              ศูนย์ควบคุมระบบเอกสารความเชื่อมั่น (Vifily)
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-3 bg-white px-5 py-3 rounded-xl border border-gray-200 shadow-sm">
            <ShieldCheck className="w-5 h-5 text-green-500" />
            <span className="text-xs font-bold text-gray-700 uppercase tracking-widest">
              Status: Active
            </span>
          </div>
        </div>

        {/* Quick Actions */}
        <h2 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-6">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Link href="/partner/generator" className="group block">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-300">
              <div className="w-14 h-14 bg-gray-900 text-white rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-600 transition-colors">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-3 uppercase">
                สร้างเอกสารใหม่
              </h3>
              <p className="text-gray-500 text-sm font-medium mb-6">
                เริ่มระบบ AI ออกสลิปเงินเดือนหรือหนังสือรับรอง พร้อม Vifily QR
                Code
              </p>
              <div className="flex items-center text-xs font-black uppercase tracking-widest text-gray-400 group-hover:text-gray-900 transition-colors">
                <span>Start Generator</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          <Link
            href="/partner/dashboard"
            className="group block opacity-60 hover:opacity-100 transition-opacity"
          >
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] transition-all duration-300 h-full">
              <div className="w-14 h-14 bg-gray-100 text-gray-600 rounded-2xl flex items-center justify-center mb-6">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-3 uppercase">
                ประวัติเอกสาร (เร็วๆ นี้)
              </h3>
              <p className="text-gray-500 text-sm font-medium">
                ดูประวัติการสร้างเอกสาร คัดลอกลิงก์ตรวจสอบ Vifily
                หรือจัดการข้อมูล
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
