import Link from "next/link";
import { Plane, Hotel, Globe, ArrowRight, ShieldCheck } from "lucide-react";

export default function EBookingHub() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 md:p-12 font-sans selection:bg-white selection:text-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <div className="inline-flex items-center space-x-3 bg-green-500/10 px-4 py-2 rounded-full mb-6 border border-green-500/20">
            <ShieldCheck className="w-4 h-4 text-green-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-green-400">
              Admin Protected Area
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 italic">
            E-Booking <br className="md:hidden" />{" "}
            <span className="text-gray-500">Simulators</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl font-medium italic border-l-4 border-gray-700 pl-6">
            ระบบจำลองการจอง (High-Fidelity Mocks) ที่เชื่อมโยงข้อมูลโปรโมชั่น
            โรงแรม และสายการบินเสมือนจริง
            สำหรับใช้ประกอบการนำเสนองานให้สมบูรณ์แบบ
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link href="/admin/ebooking/hotels/europe" className="group block">
            <div className="bg-white/5 p-10 rounded-[3rem] border border-white/10 hover:bg-white/10 transition-all duration-500 h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Hotel className="w-32 h-32" />
              </div>
              <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-blue-900/50">
                <Globe className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-black mb-2 uppercase tracking-tight">
                Europe Hotel Portal
              </h2>
              <p className="text-gray-400 font-medium mb-8 text-sm">
                หน้าค้นหาโรงแรมสไตล์ OTA ชื่อดัง (ธีมยุโรป)
                พร้อมรายการห้องพักหรูในปารีส และระบบคัดกรองที่ดูสมจริง
              </p>
              <div className="flex items-center text-xs font-black uppercase tracking-[0.2em] text-blue-400 group-hover:text-white transition-colors">
                <span>Launch Mockup</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          <Link href="/admin/ebooking/flights/thai" className="group block">
            <div className="bg-white/5 p-10 rounded-[3rem] border border-white/10 hover:bg-white/10 transition-all duration-500 h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Plane className="w-32 h-32" />
              </div>
              <div className="w-16 h-16 bg-emerald-600 text-white rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-emerald-900/50">
                <Plane className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-black mb-2 uppercase tracking-tight">
                Thai Airways Replica
              </h2>
              <p className="text-gray-400 font-medium mb-8 text-sm">
                หน้าระบบจองตั๋วเครื่องบินสายการบินแห่งชาติ
                พร้อมแบนเนอร์โปรโมชั่นเส้นทางยุโรปและเอเชียที่ถูกออกแบบมาเป็นพิเศษ
              </p>
              <div className="flex items-center text-xs font-black uppercase tracking-[0.2em] text-emerald-400 group-hover:text-white transition-colors">
                <span>Launch Mockup</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          <Link href="/admin/ebooking/hotels" className="group block">
            <div className="bg-white/5 p-10 rounded-[3rem] border border-white/10 hover:bg-white/10 transition-all duration-500 h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Hotel className="w-32 h-32" />
              </div>
              <div className="w-16 h-16 bg-white text-gray-900 rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-white/10">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-black mb-2 uppercase tracking-tight">
                Vifily Luxury Hotel
              </h2>
              <p className="text-gray-400 font-medium mb-8 text-sm">
                หน้าชำระเงินและดูรายละเอียดโรงแรมเดี่ยวสุดหรู (Single Property
                View) สไตล์ Vifily Protocol
              </p>
              <div className="flex items-center text-xs font-black uppercase tracking-[0.2em] text-gray-300 group-hover:text-white transition-colors">
                <span>Launch Mockup</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
