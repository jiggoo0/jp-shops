import Link from "next/link";
import { Plane, Hotel, Globe, ArrowRight, ShieldCheck } from "lucide-react";

export default function PublicBookingHub() {
  return (
    <div className="min-h-screen bg-gray-950 text-white p-8 md:p-12 font-sans selection:bg-white selection:text-gray-900 pt-32">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <div className="inline-flex items-center space-x-3 bg-blue-500/10 px-4 py-2 rounded-full mb-6 border border-blue-500/20">
            <Globe className="w-4 h-4 text-blue-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">
              Global E-Booking Protocol
            </span>
          </div>
          <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-6 leading-none italic">
            E-Booking <br className="md:hidden" />{" "}
            <span className="text-gray-600">Simulators.</span>
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl font-bold italic border-l-4 border-blue-500 pl-8 bg-white/5 py-8 rounded-r-3xl shadow-2xl">
            &quot;ระบบจำลองการจอง (High-Fidelity Mocks)
            ที่แสดงให้เห็นถึงศักยภาพการจัดการเอกสารและความน่าเชื่อถือระดับสากล
            โดย UNLINK Global Network&quot;
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <Link href="/booking/hotels" className="group block">
            <div className="bg-white/5 p-12 rounded-[4rem] border border-white/10 hover:bg-white/10 transition-all duration-700 h-full relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
                <Hotel className="w-48 h-48" />
              </div>
              <div className="w-20 h-20 bg-blue-600 text-white rounded-3xl flex items-center justify-center mb-10 shadow-2xl shadow-blue-900/50 group-hover:scale-110 transition-transform">
                <Globe className="w-10 h-10" />
              </div>
              <h2 className="text-3xl font-black mb-4 uppercase tracking-tighter italic">
                Europe Hotel Portal
              </h2>
              <p className="text-gray-400 font-bold mb-10 text-base leading-relaxed italic">
                หน้าค้นหาโรงแรมสไตล์ OTA ระดับสากล (ธีมยุโรป)
                พร้อมรายการห้องพักหรูในปารีส และระบบคัดกรองที่ดูสมจริง 100%
              </p>
              <div className="flex items-center text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 group-hover:text-white transition-colors pt-8 border-t border-white/10">
                <span>Launch Mockup</span>
                <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          </Link>

          <Link href="/booking/flights" className="group block">
            <div className="bg-white/5 p-12 rounded-[4rem] border border-white/10 hover:bg-white/10 transition-all duration-700 h-full relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
                <Plane className="w-48 h-48" />
              </div>
              <div className="w-20 h-20 bg-emerald-600 text-white rounded-3xl flex items-center justify-center mb-10 shadow-2xl shadow-emerald-900/50 group-hover:scale-110 transition-transform">
                <Plane className="w-10 h-10" />
              </div>
              <h2 className="text-3xl font-black mb-4 uppercase tracking-tighter italic">
                Thai Airways Replica
              </h2>
              <p className="text-gray-400 font-bold mb-10 text-base leading-relaxed italic">
                หน้าระบบจองตั๋วเครื่องบินสายการบินแห่งชาติ (จำลอง)
                พร้อมแบนเนอร์โปรโมชั่นเส้นทางทั่วโลกที่ออกแบบมาเพื่อความเนียนระดับสูง
              </p>
              <div className="flex items-center text-[10px] font-black uppercase tracking-[0.25em] text-emerald-400 group-hover:text-white transition-colors pt-8 border-t border-white/10">
                <span>Launch Mockup</span>
                <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          </Link>
        </div>

        {/* Brand Seal */}
        <div className="mt-32 flex flex-col items-center">
          <div className="grayscale opacity-20 hover:grayscale-0 hover:opacity-100 transition-all duration-1000 mb-8 cursor-pointer">
            <ShieldCheck className="w-16 h-16" />
          </div>
          <p className="text-gray-600 text-[10px] font-black uppercase tracking-[0.5em] text-center">
            Powered by UNLINK Global Protocol
          </p>
        </div>
      </div>
    </div>
  );
}
