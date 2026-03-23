"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  X,
  ChevronRight,
  ShieldCheck,
  Zap,
  MessageCircle,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@jp-visual-docs/ui";

type Step = "category" | "details" | "pricing" | "screening" | "finish";

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<Step>("category");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isSerious, setIsSerious] = useState<boolean | null>(null);

  const categories = [
    {
      id: "loan",
      label: "ที่ปรึกษาสินเชื่อ / เดินสเตทเม้นท์",
      info: "เน้นความเนียน 100% สำหรับยื่นธนาคาร",
    },
    {
      id: "visa",
      label: "เอกสารวีซ่า / ทำงานต่างประเทศ",
      info: "จัดชุดเอกสารตามมาตรฐานสถานทูต",
    },
    {
      id: "vifily",
      label: "ระบบรับรองดิจิทัล Vifily QR",
      info: "สร้างความน่าเชื่อถือระดับสากล",
    },
    {
      id: "other",
      label: "แก้ไขเอกสารเฉพาะทาง (งานด่วน)",
      info: "งานสั่งทำพิเศษระดับ VIP",
    },
  ];

  const getAnswers = (cat: string) => {
    switch (cat) {
      case "loan":
        return {
          process:
            "วิเคราะห์โปรไฟล์ -> วางแผนตัวเลข -> ผลิตเอกสาร -> ตรวจสอบผ่าน Vifily",
          time: "จบงานภายใน 24-48 ชั่วโมง",
          safety: "ข้อมูลถูกลบทำลายทันทีหลังส่งมอบ ไร้รอยเท้าดิจิทัล",
        };
      case "visa":
        return {
          process:
            "ตรวจเกณฑ์ประเทศปลายทาง -> ปรับชุดเอกสารให้สอดคล้อง -> ประทับตรา Vifily",
          time: "ด่วนที่สุดภายใน 1 วัน",
          safety: "เนียนระดับสากล ผ่านระบบตรวจสอบสถานทูตได้",
        };
      default:
        return {
          process:
            "แจ้งรายละเอียดผ่าน Line OA -> ทีมงานประเมิน -> ดำเนินการทันที",
          time: "ขึ้นอยู่กับความซับซ้อน",
          safety: "ความลับระดับสูงสุด (Top Secret)",
        };
    }
  };

  const handleContactLine = () => {
    const message = encodeURIComponent(
      `สวัสดีครับ สนใจบริการ ${selectedCategory} (ผ่านการกรองระบบ AI แล้ว)`,
    );
    window.open(`https://line.me/R/ti/p/@462fqtfc?text=${message}`, "_blank");
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-[60] w-16 h-16 bg-gray-900 text-white rounded-full shadow-[0_20px_50px_-10px_rgba(0,0,0,0.3)] flex items-center justify-center hover:scale-110 transition-transform active:scale-95 group"
      >
        <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20 group-hover:hidden"></div>
        <MessageSquare className="w-7 h-7" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-end p-6 pointer-events-none">
            {/* Backdrop for mobile */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm pointer-events-auto sm:hidden"
            />

            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              className="relative w-full max-w-[420px] bg-white rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)] border border-gray-100 pointer-events-auto overflow-hidden flex flex-col h-[600px]"
            >
              {/* Header */}
              <div className="bg-gray-900 p-8 text-white">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-green-400">
                        JP-VISOUL Assistant
                      </p>
                      <p className="text-lg font-black tracking-tight">
                        ระบบตอบกลับอัตโนมัติ
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <div className="flex items-center space-x-2 text-[10px] font-bold text-gray-400">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                  <span>เจ้าป่ากำลังประมวลผลคำถามของคุณ...</span>
                </div>
              </div>

              {/* Chat Content */}
              <div className="flex-grow overflow-y-auto p-8 space-y-6 scrollbar-hide bg-gray-50/50">
                {/* Assistant Message 1 */}
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 text-xs font-black">
                    JP
                  </div>
                  <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 text-sm font-medium text-gray-700 leading-relaxed">
                    สวัสดีครับ ผมคือผู้ช่วย AI ของ JP-VISOUL เพื่อความรวดเร็ว
                    กรุณาระบุบริการที่ต้องการปรึกษาครับ
                  </div>
                </div>

                {/* Categories Step */}
                {step === "category" && (
                  <div className="space-y-3 pl-11">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          setSelectedCategory(cat.label);
                          setStep("details");
                        }}
                        className="w-full text-left p-4 bg-white hover:bg-gray-900 hover:text-white rounded-2xl border border-gray-100 shadow-sm transition-all group flex items-center justify-between"
                      >
                        <div>
                          <p className="font-black text-xs uppercase tracking-tight">
                            {cat.label}
                          </p>
                          <p className="text-[10px] opacity-60 group-hover:opacity-80 mt-0.5">
                            {cat.info}
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 opacity-30" />
                      </button>
                    ))}
                  </div>
                )}

                {/* Details Step */}
                {(step === "details" ||
                  step === "pricing" ||
                  step === "screening" ||
                  step === "finish") &&
                  selectedCategory && (
                    <>
                      <div className="flex justify-end">
                        <div className="bg-gray-900 text-white p-4 rounded-2xl rounded-tr-none text-sm font-bold shadow-lg">
                          {selectedCategory}
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 text-xs font-black">
                          JP
                        </div>
                        <div className="bg-white p-5 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 space-y-4">
                          <p className="text-sm font-black text-gray-900 uppercase">
                            ข้อมูลเบื้องต้น:
                          </p>
                          <div className="space-y-3">
                            <div className="flex items-center space-x-3 text-xs text-gray-500">
                              <Clock className="w-4 h-4 text-green-600" />
                              <span>
                                {
                                  getAnswers(
                                    selectedCategory ===
                                      "ที่ปรึกษาสินเชื่อ / เดินสเตทเม้นท์"
                                      ? "loan"
                                      : "visa",
                                  ).time
                                }
                              </span>
                            </div>
                            <div className="flex items-center space-x-3 text-xs text-gray-500">
                              <ShieldCheck className="w-4 h-4 text-green-600" />
                              <span>
                                {
                                  getAnswers(
                                    selectedCategory ===
                                      "ที่ปรึกษาสินเชื่อ / เดินสเตทเม้นท์"
                                      ? "loan"
                                      : "visa",
                                  ).safety
                                }
                              </span>
                            </div>
                            <div className="flex items-start space-x-3 text-xs text-gray-500">
                              <Zap className="w-4 h-4 text-green-600 mt-0.5" />
                              <span>
                                ขั้นตอน:{" "}
                                {
                                  getAnswers(
                                    selectedCategory ===
                                      "ที่ปรึกษาสินเชื่อ / เดินสเตทเม้นท์"
                                      ? "loan"
                                      : "visa",
                                  ).process
                                }
                              </span>
                            </div>
                          </div>
                          {step === "details" && (
                            <button
                              onClick={() => setStep("screening")}
                              className="w-full py-3 bg-gray-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-green-600 transition-colors"
                            >
                              ทราบแล้ว ประเมินงานของฉัน
                            </button>
                          )}
                        </div>
                      </div>
                    </>
                  )}

                {/* Screening Step (The 90% Filter) */}
                {step === "screening" && (
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 text-xs font-black">
                      JP
                    </div>
                    <div className="bg-white p-5 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 space-y-4 w-full">
                      <p className="text-sm font-black text-gray-900 uppercase italic">
                        คุณพร้อมเริ่มงานทันทีหรือไม่?
                      </p>
                      <p className="text-[10px] text-gray-400 font-medium">
                        เราให้ความสำคัญกับพาร์ทเนอร์ที่ต้องการความรวดเร็วและพร้อมดำเนินการเท่านั้น
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => {
                            setIsSerious(true);
                            setStep("finish");
                          }}
                          className="py-3 bg-green-50 text-green-700 border border-green-100 rounded-xl text-[10px] font-black uppercase hover:bg-green-100"
                        >
                          พร้อม 100%
                        </button>
                        <button
                          onClick={() => {
                            setIsSerious(false);
                            setStep("finish");
                          }}
                          className="py-3 bg-gray-50 text-gray-400 border border-gray-100 rounded-xl text-[10px] font-black uppercase"
                        >
                          แค่สอบถามราคา
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Finish Step */}
                {step === "finish" && (
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 text-xs font-black">
                      JP
                    </div>
                    <div className="bg-white p-5 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 space-y-5 w-full text-center">
                      {isSerious ? (
                        <>
                          <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                            <CheckCircle2 className="w-6 h-6" />
                          </div>
                          <p className="text-sm font-bold text-gray-900 leading-tight">
                            ยินดีด้วย! งานของคุณอยู่ในเกณฑ์ลำดับความสำคัญสูง
                            (Priority A)
                          </p>
                          <button
                            onClick={handleContactLine}
                            className="w-full h-14 bg-[#06C755] text-white rounded-xl font-black uppercase tracking-widest text-xs flex items-center justify-center space-x-3 shadow-xl shadow-green-100 hover:brightness-110 transition-all"
                          >
                            <span>คุยผู้เชี่ยวชาญ VIP</span>
                            <MessageCircle className="w-5 h-5" />
                          </button>
                        </>
                      ) : (
                        <>
                          <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto">
                            <AlertCircle className="w-6 h-6" />
                          </div>
                          <p className="text-sm font-bold text-gray-900 leading-tight">
                            แนะนำพาร์ทเนอร์เลือกใช้บริการผ่านระบบอัตโนมัติ
                          </p>
                          <p className="text-[10px] text-gray-400">
                            คุณสามารถซื้อแพ็กเกจได้ทันทีที่หน้าเว็บไซต์
                            เพื่อประหยัดเวลาและค่าธรรมเนียม
                          </p>
                          <Button
                            onClick={() =>
                              (window.location.href = "/partner/pricing")
                            }
                            className="w-full bg-gray-900 text-white rounded-xl font-black uppercase tracking-widest text-[10px]"
                          >
                            ดูราคาแพ็กเกจ
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer Note */}
              <div className="p-6 bg-white border-t border-gray-50 text-center">
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-300 italic">
                  End-to-End Encrypted Compliance System
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
