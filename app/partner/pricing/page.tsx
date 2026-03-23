"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  CreditCard,
  Lock,
  Zap,
  FileText,
  MessageSquare,
  ArrowRight,
  Briefcase,
  Plane,
} from "lucide-react";
import { Button } from "@/components/ui";
import {
  planConfig,
  serviceConfig,
  type PlanType,
  type ServiceId,
} from "@/lib";

type PricingType = "membership" | "services";

function PricingContent() {
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get("tab") as PricingType) || "membership";

  const [activeTab, setActiveTab] = useState<PricingType>(initialTab);
  const [isLoading, setIsLoading] = useState<string | null>(null);

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "membership" || tab === "services") {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const handleSubscriptionCheckout = async (planId: PlanType) => {
    setIsLoading(planId);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: "subscription",
          planId: planId,
          returnUrl: window.location.origin + "/partner/dashboard",
        }),
      });
      const data = await res.json();
      if (data.status === "success" && data.data?.url) {
        window.location.href = data.data.url;
      } else {
        alert(data.message || "ระบบชำระเงินขัดข้อง");
      }
    } catch {
      alert("เกิดข้อผิดพลาดในการเชื่อมต่อระบบ");
    } finally {
      setIsLoading(null);
    }
  };

  const handleServiceCheckout = async (serviceId: ServiceId) => {
    setIsLoading(serviceId);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: "service",
          serviceId: serviceId,
          returnUrl: window.location.origin + "/partner/dashboard",
        }),
      });
      const data = await res.json();
      if (data.status === "success" && data.data?.url) {
        window.location.href = data.data.url;
      } else {
        alert(data.message || "ระบบชำระเงินขัดข้อง");
      }
    } catch {
      alert("เกิดข้อผิดพลาดในการเชื่อมต่อระบบ");
    } finally {
      setIsLoading(null);
    }
  };

  const getPlanDetails = (key: PlanType) => {
    switch (key) {
      case "1_day":
        return {
          desc: "สิทธิ์การเข้าใช้งานมาตรฐาน สำหรับเคสเร่งด่วนรายชิ้น",
          features: [
            "วิเคราะห์เอกสารผ่าน Protocol พื้นฐาน",
            "ตรวจสอบสิทธิ์ผ่าน Vifily QR",
          ],
          popular: false,
        };
      case "7_days":
        return {
          desc: "เหมาะสำหรับผู้เชี่ยวชาญอิสระที่ต้องการความคล่องตัว",
          features: [
            "จัดการเคสได้ต่อเนื่อง 7 วัน",
            "Vifily Verification เต็มรูปแบบ",
          ],
          popular: false,
        };
      case "15_days":
        return {
          desc: "ระบบสนับสนุนการทำงานระดับธุรกิจ ยอดนิยมสำหรับพาร์ทเนอร์",
          features: [
            "Priority Support จากทีมผู้เชี่ยวชาญ",
            "Protocol วิเคราะห์เชิงลึก",
          ],
          popular: false,
        };
      case "30_days":
        return {
          desc: "มาตรฐานสูงสุดสำหรับการดำเนินงานระดับมืออาชีพ",
          features: [
            "ปลดล็อกเครื่องมือ Intelligence ทั้งหมด",
            "ไม่มีลายน้ำระบบบนเอกสาร",
          ],
          popular: true,
        };
      case "365_days":
        return {
          desc: "ความร่วมมือระดับสูงสุดเพื่อการเติบโตอย่างยั่งยืน",
          features: [
            "Private Consultant ส่วนตัว 24/7",
            "Protocol ปรับแต่งเฉพาะองค์กร",
          ],
          popular: false,
        };
    }
  };

  const getServiceIcon = (key: ServiceId) => {
    switch (key) {
      case "loan":
        return <Briefcase className="w-6 h-6 text-blue-500" />;
      case "travel":
        return <Plane className="w-6 h-6 text-sky-500" />;
      case "visa":
        return <CheckCircle2 className="w-6 h-6 text-emerald-500" />;
      case "specialist":
        return <FileText className="w-6 h-6 text-orange-500" />;
      case "vifily":
        return <ShieldCheck className="w-6 h-6 text-indigo-500" />;
      case "premium-card":
        return <CreditCard className="w-6 h-6 text-rose-500" />;
      case "doc_verification":
        return <FileText className="w-6 h-6 text-emerald-500" />;
      case "ai_assistant":
        return <MessageSquare className="w-6 h-6 text-blue-500" />;
      default:
        return <Zap className="w-6 h-6 text-gray-600" />;
    }
  };

  return (
    <div className="bg-[#FDFDFD] py-32 md:py-40 px-6 font-sans min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-3 bg-gray-100 px-6 py-2.5 rounded-full mb-8 border border-gray-200"
          >
            <ShieldCheck className="w-4 h-4 text-green-600" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600">
              Vifily Access & Elite Services
            </span>
          </motion.div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-10 tracking-tighter uppercase leading-[0.9] text-gray-900">
            ระบบชำระเงิน <br />{" "}
            <span className="text-gray-300 italic">Expert Portal.</span>
          </h1>

          <div className="flex justify-center mt-12">
            <div className="bg-gray-100 p-1.5 rounded-2xl flex items-center space-x-1 border border-gray-200 shadow-inner">
              <button
                onClick={() => setActiveTab("membership")}
                className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === "membership" ? "bg-white text-gray-900 shadow-md" : "text-gray-500 hover:text-gray-600"}`}
              >
                Expert Membership
              </button>
              <button
                onClick={() => setActiveTab("services")}
                className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === "services" ? "bg-white text-gray-900 shadow-md" : "text-gray-500 hover:text-gray-600"}`}
              >
                Specialized Solutions
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "membership" ? (
            <motion.div
              key="membership"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
            >
              {(Object.keys(planConfig) as PlanType[]).map((key) => {
                const plan = planConfig[key];
                const details = getPlanDetails(key);
                return (
                  <div
                    key={key}
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
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-6">
                      {plan.label}
                    </p>
                    <div className="mb-6">
                      <span className="text-3xl font-black tracking-tighter text-gray-900">
                        ฿{plan.price.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-gray-600 text-[11px] font-medium leading-relaxed mb-8 flex-grow italic">
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
                      onClick={() => handleSubscriptionCheckout(key)}
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
                  </div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              key="services"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {(Object.keys(serviceConfig) as ServiceId[]).map((key) => {
                const service = serviceConfig[key];
                return (
                  <div
                    key={key}
                    className="relative flex flex-col p-10 rounded-[3rem] border border-gray-100 bg-white shadow-sm hover:shadow-2xl transition-all duration-500 group"
                  >
                    <div className="w-16 h-16 bg-gray-50 rounded-3xl flex items-center justify-center mb-8 border border-gray-100 group-hover:bg-emerald-50 group-hover:border-emerald-100 transition-colors duration-500">
                      {getServiceIcon(key)}
                    </div>
                    <h3 className="text-2xl font-black mb-2 uppercase tracking-tight text-gray-900">
                      {service.name}
                    </h3>
                    <p className="text-gray-500 text-[11px] font-bold uppercase tracking-[0.2em] mb-8">
                      Specialized Solution
                    </p>
                    <div className="mb-8">
                      <span className="text-4xl font-black tracking-tighter text-emerald-600">
                        ฿{service.price.toLocaleString()}
                      </span>
                      <span className="text-gray-500 text-xs font-bold uppercase ml-2">
                        / Case Reference
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm font-medium leading-relaxed mb-10 italic">
                      {service.description}
                    </p>
                    <Button
                      onClick={() => handleServiceCheckout(key)}
                      disabled={isLoading === key}
                      className="w-full h-16 rounded-2xl bg-gray-900 text-white font-black uppercase tracking-widest text-xs flex items-center justify-center space-x-3 transition-all hover:bg-emerald-600 shadow-xl"
                    >
                      {isLoading === key ? (
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <>
                          <span>ชำระเงินทันที</span>
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </Button>
                  </div>
                );
              })}
              <div className="md:col-span-2 bg-gray-50 p-8 rounded-[2rem] border border-dashed border-gray-200 flex flex-col md:flex-row items-center justify-between mt-8">
                <div className="mb-6 md:mb-0 text-center md:text-left">
                  <h4 className="text-gray-900 font-black uppercase tracking-tight text-lg">
                    ต้องการโซลูชันเฉพาะทาง?
                  </h4>
                  <p className="text-gray-600 text-xs font-medium italic mt-1">
                    สำหรับการจัดการเอกสารปริมาณมาก หรือเคสที่มีความซับซ้อนสูง
                    ติดต่อทีมที่ปรึกษา
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="rounded-xl font-black uppercase tracking-widest text-[10px] border-gray-900 text-gray-900"
                >
                  Contact Support
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-20 flex flex-col items-center space-y-8">
          <div className="flex items-center space-x-2 bg-white px-8 py-4 rounded-full border border-gray-100 shadow-sm">
            <Lock className="w-5 h-5 text-green-600" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600">
              Secured & Encrypted Payment Gateway (Stripe Official)
            </span>
          </div>
          <div className="flex items-center space-x-6 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            <div className="text-[10px] font-black uppercase tracking-widest text-gray-500">
              Accepted Payments:
            </div>
            <div className="bg-gray-100 px-3 py-1 rounded-md text-[9px] font-black text-gray-600 border border-gray-200">
              VISA
            </div>
            <div className="bg-gray-100 px-3 py-1 rounded-md text-[9px] font-black text-gray-600 border border-gray-200">
              MASTERCARD
            </div>
            <div className="bg-gray-100 px-3 py-1 rounded-md text-[9px] font-black text-gray-600 border border-gray-200">
              PROMPTPAY
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PricingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <PricingContent />
    </Suspense>
  );
}
