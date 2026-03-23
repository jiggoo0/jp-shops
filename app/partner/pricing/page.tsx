"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  CreditCard,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui";
import { planConfig, type PlanType } from "@/lib";

export default function PricingPage() {
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleCheckout = async (planKey: PlanType) => {
    setIsLoading(planKey);
    const plan = planConfig[planKey];

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceName: `Subscription: ${plan.name}`,
          amount: plan.price,
          returnUrl: window.location.origin,
          planId: planKey,
        }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("ระบบชำระเงินขัดข้อง กรุณาลองใหม่อีกครั้ง");
      }
    } catch (error) {
      console.error("Checkout failed:", error);
      alert("เกิดข้อผิดพลาดในการเชื่อมต่อระบบ");
    } finally {
      setIsLoading(null);
    }
  };

  const getPlanDetails = (key: PlanType) => {
    switch (key) {
      case "1_day":
        return {
          desc: "เหมาะสำหรับทดสอบระบบ หรือมีงานด่วน 1 เคส",
          features: ["สร้างเอกสารได้ไม่จำกัดใน 24 ชม.", "ระบบ QR Code พื้นฐาน"],
          popular: false,
        };
      case "7_days":
        return {
          desc: "สำหรับพาร์ทเนอร์รายย่อย ที่รับงานเป็นสัปดาห์",
          features: ["ใช้งานได้ 7 วัน", "Vifily Verification พื้นฐาน"],
          popular: false,
        };
      case "15_days":
        return {
          desc: "ยอดนิยมสำหรับผู้ที่ต้องการความต่อเนื่อง",
          features: [
            "ใช้งานได้ 15 วัน",
            "Vifily Verification เต็มรูปแบบ",
            "Priority Support",
          ],
          popular: false,
        };
      case "30_days":
        return {
          desc: "คุ้มค่าที่สุดสำหรับพาร์ทเนอร์มืออาชีพ",
          features: [
            "ใช้งานได้ 30 วัน",
            "ระบบ AI เต็มรูปแบบ",
            "ไม่มีลายน้ำระบบ",
          ],
          popular: true,
        };
      case "365_days":
        return {
          desc: "ระดับสูงสุด พร้อมการดูแลส่วนตัวตลอดปี",
          features: [
            "ใช้งานได้ 365 วัน",
            "Private Consultant 24/7",
            "ปรับแต่งเทมเพลตส่วนตัว",
          ],
          popular: false,
        };
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] py-32 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-3 bg-gray-100 px-6 py-2.5 rounded-full mb-8 border border-gray-200"
          >
            <ShieldCheck className="w-4 h-4 text-green-600" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600">
              Verification Access Plans
            </span>
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black mb-10 tracking-tighter uppercase leading-[0.9]">
            เปิดระบบใช้งาน <br />{" "}
            <span className="text-gray-300 italic">Vifily.</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed italic">
            &quot;กรุณาชำระเงินเพื่อเปิดใช้งานระบบ หรือต่ออายุการใช้งานของคุณ
            เพื่อเข้าถึงระบบตรวจสอบเอกสารที่ดีที่สุดในโลก&quot;
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {(Object.keys(planConfig) as PlanType[]).map((key, index) => {
            const plan = planConfig[key];
            const details = getPlanDetails(key);

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex flex-col p-8 rounded-[2.5rem] border transition-all duration-500 hover:-translate-y-2 bg-white ${details.popular ? "border-gray-900 shadow-2xl ring-4 ring-gray-900/5" : "border-gray-100 shadow-sm hover:shadow-xl"}`}
              >
                {details.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-xl">
                    Most Popular
                  </div>
                )}

                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 border border-gray-100">
                  <Clock className="w-5 h-5 text-gray-900" />
                </div>

                <h3 className="text-xl font-black mb-1 uppercase tracking-tight text-gray-900">
                  {plan.name}
                </h3>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6">
                  {plan.label}
                </p>

                <div className="mb-6">
                  <span className="text-3xl font-black tracking-tighter text-gray-900">
                    ฿{plan.price.toLocaleString()}
                  </span>
                </div>

                <p className="text-gray-500 text-[11px] font-medium leading-relaxed mb-8 flex-grow italic">
                  {details.desc}
                </p>

                <ul className="space-y-4 mb-8">
                  {details.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-start text-[10px] font-bold text-gray-700 leading-tight"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-500 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handleCheckout(key)}
                  disabled={isLoading === key}
                  className={`w-full h-14 rounded-xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center space-x-2 transition-all ${details.popular ? "bg-gray-900 text-white hover:bg-green-600" : "bg-gray-100 text-gray-900 hover:bg-gray-200"}`}
                >
                  {isLoading === key ? (
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span>เลือกแพ็กเกจนี้</span>
                      <CreditCard className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-20 flex justify-center text-gray-400">
          <div className="flex items-center space-x-2 bg-gray-50 px-6 py-3 rounded-full border border-gray-100">
            <Lock className="w-4 h-4 text-green-600" />
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">
              Secured & Encrypted Payment via Stripe
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
