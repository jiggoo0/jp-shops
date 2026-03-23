"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  CheckCircle2,
  Zap,
  Crown,
  Clock,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import { Button } from "@jp-visual-docs/ui";

const plans = [
  {
    id: "daily",
    name: "Starter Pass",
    duration: "24 Hours",
    price: "990",
    description: "เหมาะสำหรับงานด่วนชิ้นเดียว หรือการทดสอบระบบระดับพรีเมียม",
    features: [
      "สร้างเอกสารได้ไม่จำกัดใน 24 ชม.",
      "ระบบ Vifily QR Code พื้นฐาน",
      "AI Enhancement 50%",
      "Support ผ่านระบบ Ticket",
    ],
    icon: <Clock className="w-6 h-6 text-gray-400" />,
    color: "bg-gray-50",
  },
  {
    id: "15days",
    name: "Runner Pack",
    duration: "15 Days",
    price: "4,900",
    description:
      "ยอดนิยมสำหรับพาร์ทเนอร์ที่รับเคสเป็นรอบ หรือต้องการความต่อเนื่อง",
    features: [
      "สร้างเอกสารได้ไม่จำกัด 15 วัน",
      "Vifily Verification เต็มรูปแบบ",
      "AI Enhancement 70%",
      "Priority Support",
      "สิทธิ์เข้าถึงเทมเพลตพิเศษ",
    ],
    icon: <Zap className="w-6 h-6 text-yellow-500" />,
    color: "bg-yellow-50/50",
    popular: true,
  },
  {
    id: "monthly",
    name: "Professional",
    duration: "30 Days",
    price: "8,500",
    description:
      "คุ้มค่าที่สุดสำหรับพาร์ทเนอร์มืออาชีพที่ต้องการความมั่นคงระดับสูง",
    features: [
      "ทุกอย่างใน Runner Pack",
      "AI Enhancement 100% (Full Logic)",
      "ปลดล็อก API สำหรับแก้ไขเอง",
      "Private Consultant 24/7",
      "ไม่มีลายน้ำระบบในเอกสาร",
    ],
    icon: <Crown className="w-6 h-6 text-green-600" />,
    color: "bg-green-50/30",
  },
  {
    id: "yearly",
    name: "VIP Elite",
    duration: "1 Year",
    price: "79,000",
    description: "สิทธิ์การใช้งานระดับสูงสุด พร้อมการดูแลส่วนตัวแบบ VIP ตลอดปี",
    features: [
      "สิทธิ์การใช้งานถาวร 1 ปี",
      "ปรับแต่งเทมเพลตส่วนตัวได้",
      "White-label Solution",
      "สิทธิ์เข้าถึงฟีเจอร์ใหม่ก่อนใคร",
      "การันตีการซ่อมบำรุงระบบด่วน",
    ],
    icon: <ShieldCheck className="w-6 h-6 text-blue-600" />,
    color: "bg-blue-50/30",
  },
];

export default function PricingPage() {
  const handleContactAdmin = (planName: string) => {
    // ลิงก์ไปยัง Line OA พร้อมข้อความที่กำหนด
    const message = encodeURIComponent(
      `สวัสดีครับ สนใจสมัครแพ็กเกจ ${planName} ครับ`,
    );
    window.open(
      `https://line.me/R/ti/p/@jpvisualdocs?text=${message}`,
      "_blank",
    );
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] py-32 px-6 font-sans">
      {/* Schema.org JSON-LD for Google AI */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: "JP Visual Docs Partner Subscription",
            description:
              "Premium document verification and enhancement system for international partners.",
            brand: {
              "@type": "Brand",
              name: "JP Visual Docs",
            },
            offers: plans.map((plan) => ({
              "@type": "Offer",
              name: plan.name,
              price: plan.price.replace(",", ""),
              priceCurrency: "THB",
              description: plan.description,
            })),
          }),
        }}
      />

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
            ปลดล็อกพลัง AI <br />{" "}
            <span className="text-gray-300 italic">ในมือคุณ.</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed italic">
            &quot;เลือกแพ็กเกจที่เหมาะสมกับธุรกิจของคุณ
            เพื่อเข้าถึงระบบตรวจสอบเอกสารมาตรฐาน Vifily ที่ดีที่สุดในโลก&quot;
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative flex flex-col p-10 rounded-[3rem] border border-gray-100 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group ${plan.color} ${plan.popular ? "ring-2 ring-gray-900 ring-offset-8" : ""}`}
            >
              {plan.popular && (
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
                  Most Popular
                </div>
              )}

              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-10 shadow-sm border border-gray-50 group-hover:scale-110 transition-transform duration-500">
                {plan.icon}
              </div>

              <h3 className="text-2xl font-black mb-2 uppercase tracking-tight">
                {plan.name}
              </h3>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6 flex items-center">
                <Clock className="w-3 h-3 mr-2" />
                {plan.duration}
              </p>

              <div className="mb-8">
                <span className="text-4xl font-black tracking-tighter">
                  ฿{plan.price}
                </span>
                <span className="text-gray-400 text-xs font-bold ml-2">
                  / Pack
                </span>
              </div>

              <p className="text-gray-500 text-xs font-medium leading-relaxed mb-10 flex-grow italic">
                {plan.description}
              </p>

              <ul className="space-y-5 mb-12">
                {plan.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-start text-[11px] font-bold text-gray-700 leading-tight"
                  >
                    <CheckCircle2 className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => handleContactAdmin(plan.name)}
                variant={plan.popular ? "primary" : "outline"}
                className={`w-full h-16 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center space-x-2 transition-all ${plan.popular ? "bg-gray-900 text-white hover:bg-green-600" : "bg-white text-gray-900 hover:border-gray-900"}`}
              >
                <span>ติดต่อแอดมิน</span>
                <MessageCircle className="w-4 h-4" />
              </Button>
            </motion.div>
          ))}
        </div>

        <div className="mt-32 text-center p-16 bg-gray-50 rounded-[4rem] border border-gray-100">
          <h2 className="text-3xl font-black mb-6 uppercase tracking-tight">
            ต้องการโซลูชันเฉพาะทาง?
          </h2>
          <p className="text-gray-400 text-sm font-medium mb-10 max-w-xl mx-auto italic">
            สำหรับพาร์ทเนอร์ระดับองค์กรที่ต้องการปรับแต่งระบบ API
            หรือต้องการเทมเพลตเฉพาะประเทศ
            กรุณาติดต่อทีมที่ปรึกษาเพื่อรับใบเสนอราคาพิเศษ
          </p>
          <Button
            variant="ghost"
            onClick={() => handleContactAdmin("Custom Solutions")}
            className="group font-black uppercase tracking-widest text-[10px] space-x-3"
          >
            <span>ปรึกษาเคสพิเศษ (50% Advanced)</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  );
}
