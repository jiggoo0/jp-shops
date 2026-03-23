"use client";

import { useState } from "react";
import { grantSubscription } from "@/app/actions/admin";
import { type PlanType, planConfig } from "@/lib";
import {
  UserPlus,
  Search,
  ShieldCheck,
  Clock,
  CheckCircle2,
  AlertCircle,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui";

export default function AdminUsersPage() {
  const [email, setEmail] = useState("");
  const [plan, setPlan] = useState<PlanType>("30_days");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    const result = await grantSubscription(email, plan);

    if (result.success) {
      setMessage({ type: "success", text: result.message! });
      setEmail("");
    } else {
      setMessage({ type: "error", text: result.error! });
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50/50 py-20 px-6 font-sans">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight uppercase italic">
              Partner Management
            </h1>
            <p className="text-gray-400 text-xs font-black uppercase tracking-widest mt-2 flex items-center">
              <ShieldCheck className="w-4 h-4 mr-2 text-green-600" />
              <span>Admin Manual Grant Terminal</span>
            </p>
          </div>
          <div className="bg-white px-4 py-2 rounded-xl border border-gray-100 shadow-sm flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-gray-400">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>System Online</span>
          </div>
        </div>

        <div className="bg-white rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden">
          <div className="px-10 py-8 bg-gray-900 text-white flex items-center space-x-4">
            <UserPlus className="w-6 h-6 text-green-400" />
            <h2 className="text-lg font-black uppercase tracking-widest">
              ต่ออายุสมาชิกพาร์ทเนอร์
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="p-10 space-y-8">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3">
                ค้นหาด้วยอีเมลพาร์ทเนอร์ (Search Partner Email)
              </label>
              <div className="relative">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400">
                  <Search className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-14 pr-8 py-5 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-gray-900/5 focus:bg-white outline-none transition-all font-bold text-gray-900"
                  placeholder="partner@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-5">
                เลือกแพ็กเกจที่จะเติม (Select Subscription Plan)
              </label>
              <div className="grid grid-cols-2 gap-4">
                {(Object.keys(planConfig) as PlanType[]).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPlan(p)}
                    className={`p-6 rounded-2xl border-2 transition-all flex items-center space-x-4 ${plan === p ? "border-gray-900 bg-gray-900 text-white shadow-xl" : "border-gray-100 bg-white text-gray-400 hover:border-gray-200"}`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${plan === p ? "bg-white/10" : "bg-gray-50"}`}
                    >
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-black uppercase tracking-widest leading-none mb-1">
                        {planConfig[p].label}
                      </p>
                      <p
                        className={`text-[10px] font-bold ${plan === p ? "text-gray-400" : "text-gray-300"}`}
                      >
                        + {planConfig[p].days} Days
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {message && (
              <div
                className={`p-6 rounded-2xl flex items-start space-x-4 border ${message.type === "success" ? "bg-green-50 border-green-100 text-green-800" : "bg-red-50 border-red-100 text-red-800"}`}
              >
                {message.type === "success" ? (
                  <CheckCircle2 className="w-5 h-5 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 mt-0.5" />
                )}
                <p className="text-sm font-bold">{message.text}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-20 rounded-2xl bg-gray-900 text-white font-black uppercase tracking-widest text-sm shadow-2xl hover:bg-gray-800 transition-all transform active:scale-95 disabled:bg-gray-300"
            >
              {isLoading ? (
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>กำลังประมวลผลการต่ออายุ...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5" />
                  <span>ยืนยันการต่ออายุพาร์ทเนอร์</span>
                </div>
              )}
            </Button>
          </form>
        </div>

        <div className="mt-12 text-center">
          <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.3em]">
            Authorized Access Only • Security Protocol v.15.1.4
          </p>
        </div>
      </div>
    </div>
  );
}
