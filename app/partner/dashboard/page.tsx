import { createClient } from "@/lib/supabase/server";
import { getSubscriptionStatus } from "@/lib/services/subscription";
import { planConfig, type PlanType } from "@/lib/config/plans";
import Link from "next/link";
import { ShieldCheck, FileText, Clock, ArrowRight, Globe } from "lucide-react";
import { redirect } from "next/navigation";
import { SubscriptionBooster } from "@/components/ui/SubscriptionBooster";

export default async function PartnerDashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // 🚀 Parallel Fetching (ดึงข้อมูลทั้งหมดที่จำเป็นในครั้งเดียว)
  const [sub, { data: recentDocs }, { data: profile }] = await Promise.all([
    getSubscriptionStatus(user.id),
    supabase
      .from("documents")
      .select("id, owner_name, document_type, created_at")
      .eq("partner_id", user.id)
      .order("created_at", { ascending: false })
      .limit(3),
    supabase.from("users").select("role").eq("id", user.id).maybeSingle(),
  ]);

  // 1. ถ้าเป็น Admin ให้ Redirect ไปหน้า Admin Dashboard ทันทีที่เข้าหน้านี้
  if (profile?.role === "admin") {
    redirect("/admin/dashboard");
  }

  // 2. ถ้าเป็น Partner ทั่วไป และ Subscription ไม่ Active ให้ไปหน้า Pricing
  if (!sub.isActive) {
    redirect("/partner/pricing");
  }

  const planName = sub.planId
    ? planConfig[sub.planId as PlanType]?.name
    : "Starter";

  return (
    <div className="bg-gray-50/30 p-6 md:p-12 font-sans pt-32 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-1.5 bg-gray-900 rounded-full"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">
                UNLINK Global Command Center
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-gray-900 leading-[0.85]">
              ยินดีต้อนรับ, <br />
              <span className="text-gray-300 italic">พาร์ทเนอร์ของเรา</span>
            </h1>
          </div>
          <div className="hidden lg:block text-right">
            <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-1">
              ระบบตรวจสอบสิทธิ์
            </p>
            <p className="text-gray-900 text-xs font-black">
              UNLINK Secure v4.2.1
            </p>
          </div>
        </div>

        {/* New Premium Booster Card */}
        <div className="mb-16">
          <SubscriptionBooster
            status={sub.isActive ? "active" : "inactive"}
            planName={planName}
            expiryDate={sub.expiry}
          />
        </div>

        {/* Floating Booster for mobile/scroll */}
        <SubscriptionBooster
          status={sub.isActive ? "active" : "inactive"}
          planName={planName}
          variant="floating"
        />

        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-8 px-2">
          บริการหลักและการสาธิตระบบ
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Link href="/partner/generator" className="group block">
            <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-full -mr-16 -mt-16 opacity-50 group-hover:bg-green-500/10 transition-colors"></div>
              <div className="w-16 h-16 bg-gray-900 text-white rounded-2xl flex items-center justify-center mb-8 group-hover:bg-green-600 transition-colors relative z-10 shadow-xl">
                <FileText className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-4 uppercase tracking-tight leading-none">
                ระบบสร้างเอกสารอัจฉริยะ
              </h3>
              <p className="text-gray-600 font-medium mb-10 leading-relaxed italic text-sm">
                สร้างเอกสารสลิปเงินเดือน ตั๋วเครื่องบิน หรือบุ๊กกิ้งที่พัก
                ตามมาตรฐาน UNLINK-GLOBAL
              </p>
              <div className="flex items-center text-[10px] font-black uppercase tracking-widest text-gray-900 group-hover:text-green-600 transition-colors">
                <span>เข้าสู่ระบบสร้างเอกสาร</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          <Link href="/partner/showcase" className="group block">
            <div className="bg-gray-900 p-10 rounded-[3rem] shadow-2xl hover:shadow-green-500/20 transition-all duration-500 h-full relative overflow-hidden border-4 border-gray-800">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full -mr-16 -mt-16 group-hover:bg-green-500/20 transition-colors"></div>
              <div className="w-16 h-16 bg-green-50 text-gray-900 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-all relative z-10 shadow-xl shadow-green-500/20">
                <Globe className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tight leading-none">
                ตัวอย่างหน้าเว็บไซต์
              </h3>
              <p className="text-gray-400 font-medium mb-10 leading-relaxed italic text-sm">
                สำรวจตัวอย่างหน้าเว็บไซต์จำลอง (ธนาคาร, วีซ่า, Google)
                ระดับพรีเมียม
              </p>
              <div className="flex items-center text-[10px] font-black uppercase tracking-widest text-green-500 transition-colors">
                <span>ดูหน้าเว็บไซต์ตัวอย่าง</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          <Link href="/partner/documents" className="group block">
            <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-full -mr-16 -mt-16 opacity-50 transition-colors"></div>
              <div className="w-16 h-16 bg-white text-gray-900 border-2 border-gray-900 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-gray-900 group-hover:text-white transition-all relative z-10 shadow-lg">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-4 uppercase tracking-tight leading-none">
                คลังเอกสารของคุณ
              </h3>
              <p className="text-gray-600 font-medium mb-10 leading-relaxed italic text-sm">
                เรียกดูประวัติเอกสาร คัดลอกลิงก์ตรวจสอบ หรือจัดการสถานะ
              </p>
              <div className="flex items-center text-[10px] font-black uppercase tracking-widest text-gray-900 group-hover:text-green-600 transition-colors">
                <span>ดูคลังเอกสารทั้งหมด</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        </div>

        {/* Recent Activity */}
        {recentDocs && recentDocs.length > 0 && (
          <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden mb-16">
            <div className="p-10 border-b border-gray-50 flex justify-between items-center">
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-gray-500">
                รายการเอกสารล่าสุด
              </h2>
              <Link
                href="/partner/documents"
                className="text-[10px] font-black uppercase tracking-widest text-gray-900 hover:text-green-600"
              >
                ดูทั้งหมด
              </Link>
            </div>
            <div className="divide-y divide-gray-50">
              {recentDocs.map((doc) => (
                <Link
                  key={doc.id}
                  href={`/verify/doc/${doc.id}`}
                  className="flex items-center justify-between p-8 hover:bg-gray-50 transition-colors group"
                >
                  <div className="flex items-center space-x-6">
                    <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center group-hover:bg-white transition-colors">
                      <ShieldCheck className="w-6 h-6 text-gray-500 group-hover:text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-black text-gray-900 uppercase tracking-tight">
                        {doc.owner_name}
                      </p>
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                        {doc.document_type}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-gray-500 uppercase mb-1">
                      {new Date(doc.created_at).toLocaleDateString("th-TH")}
                    </p>
                    <ArrowRight className="w-4 h-4 text-gray-200 group-hover:text-gray-900 ml-auto" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
