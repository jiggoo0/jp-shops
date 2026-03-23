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
} from "lucide-react";

interface CheckoutModalProps {
  onClose: () => void;
}

const services = [
  {
    id: "loan",
    name: "ที่ปรึกษาสินเชื่อ (ประเมินโปรไฟล์)",
    price: 2000,
    icon: <Briefcase className="w-5 h-5" />,
  },
  {
    id: "travel",
    name: "ชุดตั๋วเครื่องบิน & โรงแรม (E-booking)",
    price: 2500,
    icon: <Plane className="w-5 h-5" />,
  },
  {
    id: "visa",
    name: "ชุดเอกสารยื่นวีซ่า (Full Set)",
    price: 3500,
    icon: <CheckCircle2 className="w-5 h-5" />,
  },
  {
    id: "specialist",
    name: "เอกสารเฉพาะทาง (งานด่วน)",
    price: 1800,
    icon: <FileText className="w-5 h-5" />,
  },
  {
    id: "vifily",
    name: "Vifily Certification (Digital Trust)",
    price: 1500,
    icon: <ShieldCheck className="w-5 h-5" />,
  },
  {
    id: "premium-card",
    name: "ผลิตบัตรจริงเกรดพรีเมียม",
    price: 4500,
    icon: <CreditCard className="w-5 h-5" />,
  },
];

export function CheckoutModal({ onClose }: CheckoutModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedService, setSelectedService] = useState("loan");

  const handleCheckout = async () => {
    setIsLoading(true);
    const service = services.find((s) => s.id === selectedService);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceName: service?.name,
          amount: service?.price,
          returnUrl: window.location.origin,
        }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL");
      }
    } catch (error) {
      console.error("Checkout failed:", error);
      alert("เกิดข้อผิดพลาดในการเชื่อมต่อระบบชำระเงิน กรุณาลองใหม่อีกครั้ง");
    } finally {
      setIsLoading(false);
    }
  };

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
        className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100"
      >
        <div className="p-10 border-b border-gray-50 flex justify-between items-center">
          <div>
            <h3 className="text-3xl font-black text-gray-900 tracking-tight uppercase">
              เลือกบริการ<span className="text-gray-300 italic">.</span>
            </h3>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">
              Select Premium Service
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors shadow-inner"
          >
            ✕
          </button>
        </div>

        <div className="p-8 max-h-[50vh] overflow-y-auto space-y-4 scrollbar-hide">
          {services.map((service) => (
            <div
              key={service.id}
              onClick={() => setSelectedService(service.id)}
              className={`p-6 rounded-[1.5rem] border-2 cursor-pointer transition-all duration-300 flex items-center space-x-5 ${
                selectedService === service.id
                  ? "border-gray-900 bg-gray-50 shadow-xl shadow-gray-100 scale-[1.02]"
                  : "border-gray-50 hover:border-gray-200"
              }`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${selectedService === service.id ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-400"}`}
              >
                {service.icon}
              </div>
              <div className="flex-grow">
                <p
                  className={`font-black text-sm uppercase tracking-tight ${selectedService === service.id ? "text-gray-900" : "text-gray-500"}`}
                >
                  {service.name}
                </p>
                <p className="text-xs text-gray-400 font-bold tracking-widest mt-0.5 italic">
                  Verified Guarantee
                </p>
              </div>
              <div className="text-right">
                <span className="font-black text-lg text-gray-900">
                  ฿{service.price.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="p-10 bg-gray-50 border-t border-gray-100">
          <button
            onClick={handleCheckout}
            disabled={isLoading}
            className="w-full h-20 bg-gray-900 text-white rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-sm hover:bg-green-600 transition-all duration-500 shadow-2xl shadow-gray-300 disabled:opacity-50 disabled:cursor-not-allowed group flex items-center justify-center space-x-4"
          >
            <span>{isLoading ? "Processing..." : "Proceed to Checkout"}</span>
            {!isLoading && (
              <ShieldCheck className="w-5 h-5 group-hover:scale-110 transition-transform" />
            )}
          </button>

          <div className="mt-8 flex items-center justify-between text-gray-400">
            <div className="flex items-center space-x-2">
              <Lock className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">
                End-to-End Encrypted
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex -space-x-1">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-4 h-4 rounded-full bg-gray-200 border border-white"
                  ></div>
                ))}
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest">
                Global Support
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
