"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  CreditCard,
  Plane,
  Briefcase,
  FileText,
  MessageSquare,
  Zap,
} from "lucide-react";
import { serviceConfig, type ServiceId } from "@/lib";

interface CheckoutModalProps {
  onClose: () => void;
  initialServiceId?: ServiceId;
  initialServiceData?: Record<string, unknown>;
}

interface CheckoutFormData {
  caseName: string;
  description: string;
  email: string;
  deliveryMethod: "email" | "line";
  lineId: string;
}

const getServiceIcon = (id: string) => {
  switch (id) {
    case "flight_ticket":
      return <Plane className="w-5 h-5" />;
    case "loan":
      return <Briefcase className="w-5 h-5" />;
    case "travel":
      return <Plane className="w-5 h-5" />;
    case "visa":
      return <CheckCircle2 className="w-5 h-5" />;
    case "specialist":
      return <FileText className="w-5 h-5" />;
    case "vifily":
      return <ShieldCheck className="w-5 h-5" />;
    case "premium-card":
      return <CreditCard className="w-5 h-5" />;
    case "doc_verification":
      return <FileText className="w-5 h-5" />;
    case "ai_assistant":
      return <MessageSquare className="w-5 h-5" />;
    default:
      return <Zap className="w-5 h-5" />;
  }
};

export function CheckoutModal({
  onClose,
  initialServiceId,
  initialServiceData,
}: CheckoutModalProps) {
  const [step, setStep] = useState(initialServiceId ? 2 : 1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceId>(
    initialServiceId || "loan",
  );
  const [formData, setFormData] = useState<CheckoutFormData>({
    caseName: (initialServiceData?.passengerName as string) || "",
    description: "",
    email: "",
    deliveryMethod: "email",
    lineId: "",
  });

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: "service",
          serviceId: selectedService,
          returnUrl: window.location.origin,
          metadata: {
            caseName: formData.caseName,
            caseDescription: formData.description,
            guestEmail: formData.email,
            deliveryMethod: formData.deliveryMethod,
            lineId: formData.lineId,
            isTemplateContent: "true",
            ...initialServiceData, // Pass the flight data through Stripe
          },
        }),
      });

      const data = await res.json();
      if (data.status === "success" && data.data?.url) {
        window.location.href = data.data.url;
      } else {
        throw new Error(data.message || "No checkout URL");
      }
    } catch (error) {
      console.error("Checkout failed:", error);
      alert("เกิดข้อผิดพลาดในการเชื่อมต่อระบบชำระเงิน กรุณาลองใหม่อีกครั้ง");
    } finally {
      setIsLoading(false);
    }
  };

  const service = serviceConfig[selectedService];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-gray-900/80 backdrop-blur-md"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100"
      >
        <div className="p-10 border-b border-gray-50 flex justify-between items-center">
          <div>
            <h3 className="text-3xl font-black text-gray-900 tracking-tight uppercase leading-none">
              {step === 1 ? (
                <>
                  เลือกบริการ<span className="text-gray-300 italic">.</span>
                </>
              ) : (
                <>
                  ยืนยันรายการ<span className="text-gray-300 italic">.</span>
                </>
              )}
            </h3>
            <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.3em] mt-2">
              {step === 1
                ? "Select Premium Service"
                : "Confirm details & Instructions"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors shadow-inner"
          >
            ✕
          </button>
        </div>

        <div className="p-8 max-h-[60vh] overflow-y-auto space-y-4 scrollbar-hide">
          {step === 1 ? (
            (Object.keys(serviceConfig) as ServiceId[]).map((id) => {
              const item = serviceConfig[id];
              if (id === "doc_verification" || id === "ai_assistant")
                return null;
              return (
                <div
                  key={id}
                  onClick={() => setSelectedService(id)}
                  className={`p-6 rounded-[1.5rem] border-2 cursor-pointer transition-all duration-300 flex items-center space-x-5 ${selectedService === id ? "border-gray-900 bg-gray-50 shadow-xl shadow-gray-100 scale-[1.02]" : "border-gray-50 hover:border-gray-200"}`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${selectedService === id ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-400"}`}
                  >
                    {getServiceIcon(id)}
                  </div>
                  <div className="flex-grow">
                    <p
                      className={`font-black text-sm uppercase tracking-tight ${selectedService === id ? "text-gray-900" : "text-gray-500"}`}
                    >
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-400 font-bold tracking-widest mt-0.5 italic">
                      {item.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-black text-lg text-gray-900">
                      ฿{item.price.toLocaleString()}
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div className="p-8 bg-gray-900 text-white rounded-[2rem] border border-gray-800 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/10">
                      {getServiceIcon(selectedService)}
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                        Total Amount
                      </p>
                      <p className="text-3xl font-black text-white">
                        ฿{service.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <h4 className="text-xl font-black uppercase tracking-tight mb-2">
                    {service.name}
                  </h4>
                  <p className="text-gray-400 text-sm italic leading-relaxed">
                    {service.longDescription}
                  </p>
                </div>
              </div>

              <div>
                <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-6 flex items-center">
                  <Zap className="w-3.5 h-3.5 mr-2 text-yellow-500" />{" "}
                  ขั้นตอนการรับบริการ (How it works)
                </h5>
                <div className="space-y-4">
                  {service.steps.map((step, idx) => (
                    <div key={idx} className="flex items-start space-x-4 group">
                      <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-black text-gray-400 group-hover:bg-gray-900 group-hover:text-white transition-colors flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <p className="text-sm font-bold text-gray-700">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 border-t border-gray-100 space-y-6">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3 ml-2">
                    ช่องทางการรับเอกสาร (Delivery Method)
                  </label>
                  <div className="flex space-x-4 mb-4">
                    <button
                      onClick={() =>
                        setFormData({ ...formData, deliveryMethod: "email" })
                      }
                      className={`flex-1 py-3 rounded-xl border-2 font-bold text-sm transition-all ${
                        formData.deliveryMethod === "email"
                          ? "border-gray-900 bg-gray-900 text-white"
                          : "border-gray-100 bg-white text-gray-500 hover:border-gray-300"
                      }`}
                    >
                      Email
                    </button>
                    <button
                      onClick={() =>
                        setFormData({ ...formData, deliveryMethod: "line" })
                      }
                      className={`flex-1 py-3 rounded-xl border-2 font-bold text-sm transition-all ${
                        formData.deliveryMethod === "line"
                          ? "border-green-500 bg-green-500 text-white"
                          : "border-gray-100 bg-white text-gray-500 hover:border-gray-300"
                      }`}
                    >
                      LINE
                    </button>
                  </div>

                  {formData.deliveryMethod === "email" ? (
                    <input
                      type="email"
                      value={(formData.email || "") as string}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="เช่น partner@example.com"
                      className="w-full h-14 px-6 bg-gray-50 border-2 border-transparent focus:border-gray-900 rounded-xl outline-none font-bold text-gray-900 transition-all"
                      required={formData.deliveryMethod === "email"}
                    />
                  ) : (
                    <input
                      type="text"
                      value={(formData.lineId || "") as string}
                      onChange={(e) =>
                        setFormData({ ...formData, lineId: e.target.value })
                      }
                      placeholder="LINE ID สำหรับจัดส่งเอกสาร"
                      className="w-full h-14 px-6 bg-gray-50 border-2 border-transparent focus:border-green-500 rounded-xl outline-none font-bold text-gray-900 transition-all"
                      required={formData.deliveryMethod === "line"}
                    />
                  )}
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3 ml-2">
                    ชื่อเคส / ชื่อผู้เดินทาง (Reference Name)
                  </label>
                  <input
                    type="text"
                    value={formData.caseName}
                    onChange={(e) =>
                      setFormData({ ...formData, caseName: e.target.value })
                    }
                    placeholder="ระบุเพื่อบันทึกประวัติ"
                    className="w-full h-14 px-6 bg-gray-50 border-2 border-transparent focus:border-gray-900 rounded-xl outline-none font-bold text-gray-900 transition-all"
                    required
                  />
                </div>
              </div>
            </motion.div>
          )}
        </div>

        <div className="p-10 bg-gray-50 border-t border-gray-100">
          <div className="flex space-x-4">
            {step === 2 && !initialServiceId && (
              <button
                onClick={() => setStep(1)}
                className="w-20 h-20 bg-white border-2 border-gray-100 text-gray-400 rounded-[1.5rem] flex items-center justify-center hover:bg-gray-100 transition-all"
              >
                ←
              </button>
            )}
            <button
              onClick={step === 1 ? () => setStep(2) : handleCheckout}
              disabled={
                isLoading ||
                (step === 2 && (!formData.caseName || !formData.email))
              }
              className="flex-grow h-20 bg-gray-900 text-white rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-sm hover:bg-green-600 transition-all duration-500 shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed group flex items-center justify-center space-x-4"
            >
              <span>
                {isLoading
                  ? "Processing..."
                  : step === 1
                    ? "Next: View Steps"
                    : "Proceed to Checkout"}
              </span>
              {!isLoading && (
                <ShieldCheck className="w-5 h-5 group-hover:scale-110 transition-transform" />
              )}
            </button>
          </div>

          <div className="mt-8 flex items-center justify-between text-gray-400">
            <div className="flex items-center space-x-2">
              <Lock className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">
                Secured by Stripe
              </span>
            </div>
            <div className="text-[10px] font-black uppercase tracking-widest">
              Global Support
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
