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
  ArrowRight,
  Cpu,
} from "lucide-react";
import { Button } from "@/components/ui";

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
        className="fixed bottom-8 right-8 z-[60] w-16 h-16 bg-gray-900 text-white rounded-full shadow-[0_20px_50px_-10px_rgba(0,0,0,0.4)] flex items-center justify-center hover:scale-110 transition-transform active:scale-95 group border-2 border-white/10"
      >
        <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20 group-hover:hidden"></div>
        <MessageSquare className="w-7 h-7" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-end p-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm pointer-events-auto sm:hidden"
            />

            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              className="relative w-full max-w-[420px] bg-white rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border border-gray-200 pointer-events-auto overflow-hidden flex flex-col h-[650px]"
            >
              {/* Header: ULTRA-HIGH CONTRAST */}
              <div className="bg-gray-900 p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                <div className="flex justify-between items-start mb-6 relative z-10">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-2xl bg-green-600 flex items-center justify-center shadow-lg shadow-green-600/40">
                      <Cpu className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-[11px] font-black uppercase tracking-[0.3em] text-green-500">
                        JAOPRA Assistant
                      </p>
                      <p className="text-2xl font-black tracking-tighter uppercase italic leading-none mt-1">
                        Digital Protocol
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 bg-white/10 rounded-xl hover:bg-white/20 transition-colors border border-white/10"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>
                <div className="flex items-center space-x-3 text-[10px] font-black text-white uppercase tracking-widest relative z-10">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-ping shadow-[0_0_10px_rgba(34,197,94,1)]"></div>
                  <span className="opacity-90">
                    System Active: Standby for Command
                  </span>
                </div>
              </div>

              {/* Chat Content */}
              <div className="flex-grow overflow-y-auto p-8 space-y-8 scrollbar-hide bg-gray-50/30">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-2xl bg-gray-900 text-white flex items-center justify-center flex-shrink-0 text-[10px] font-black italic border border-white/10 shadow-lg">
                    JP
                  </div>
                  <div className="bg-white p-5 rounded-3xl rounded-tl-none shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] border border-gray-100 text-sm font-bold text-gray-800 leading-relaxed italic">
                    สวัสดีครับ ผมคือผู้ช่วยอัจฉริยะของ{" "}
                    <span className="text-green-600 underline font-black">
                      เจ้าป่า
                    </span>{" "}
                    เพื่อผลลัพธ์ที่รวดเร็ว กรุณาระบุบริการที่คุณต้องการครับ
                  </div>
                </div>

                {step === "category" && (
                  <div className="space-y-4 pl-14">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          setSelectedCategory(cat.label);
                          setStep("details");
                        }}
                        className="w-full text-left p-5 bg-white hover:bg-gray-900 hover:text-white rounded-[2rem] border-2 border-gray-100 hover:border-gray-900 shadow-sm hover:shadow-xl transition-all group flex items-center justify-between"
                      >
                        <div>
                          <p className="font-black text-[13px] uppercase tracking-tight mb-1 group-hover:text-green-400 text-gray-900">
                            {cat.label}
                          </p>
                          <p className="text-[10px] font-black text-gray-500 group-hover:text-gray-400 italic">
                            {cat.info}
                          </p>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-gray-100 group-hover:bg-white/10 flex items-center justify-center transition-colors">
                          <ChevronRight className="w-4 h-4 text-gray-900 group-hover:text-white" />
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {(step === "details" || step === "finish") &&
                  selectedCategory && (
                    <>
                      <div className="flex justify-end pl-14">
                        <div className="bg-gray-900 text-white p-5 rounded-3xl rounded-tr-none text-xs font-black uppercase tracking-widest shadow-xl border border-white/10 flex items-center space-x-3">
                          <Zap className="w-4 h-4 text-green-400" />
                          <span>{selectedCategory}</span>
                        </div>
                      </div>

                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 rounded-2xl bg-gray-900 text-white flex items-center justify-center flex-shrink-0 text-[10px] font-black italic border border-white/10 shadow-lg">
                          JP
                        </div>
                        <div className="bg-white p-6 rounded-[2.5rem] rounded-tl-none shadow-[0_20px_50px_-10px_rgba(0,0,0,0.05)] border border-gray-100 space-y-6 w-full">
                          <p className="text-xs font-black text-gray-900 uppercase tracking-[0.2em] border-b-2 border-gray-100 pb-3 flex items-center">
                            <ShieldCheck className="w-4 h-4 mr-2 text-green-600" />
                            ข้อมูลโปรโตคอล:
                          </p>
                          <div className="space-y-5">
                            <div className="flex items-start space-x-4">
                              <div className="w-9 h-9 rounded-xl bg-gray-900 flex items-center justify-center flex-shrink-0 shadow-lg">
                                <Clock className="w-4.5 h-4.5 text-green-400" />
                              </div>
                              <div>
                                <p className="text-[10px] font-black text-gray-900 uppercase tracking-widest mb-0.5">
                                  Timeframe
                                </p>
                                <p className="text-xs font-bold text-gray-700 italic">
                                  {
                                    getAnswers(
                                      selectedCategory ===
                                        "ที่ปรึกษาสินเชื่อ / เดินสเตทเม้นท์"
                                        ? "loan"
                                        : "visa",
                                    ).time
                                  }
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start space-x-4">
                              <div className="w-9 h-9 rounded-xl bg-gray-900 flex items-center justify-center flex-shrink-0 shadow-lg">
                                <ShieldCheck className="w-4.5 h-4.5 text-blue-400" />
                              </div>
                              <div>
                                <p className="text-[10px] font-black text-gray-900 uppercase tracking-widest mb-0.5">
                                  Security Level
                                </p>
                                <p className="text-xs font-bold text-gray-700 italic">
                                  {
                                    getAnswers(
                                      selectedCategory ===
                                        "ที่ปรึกษาสินเชื่อ / เดินสเตทเม้นท์"
                                        ? "loan"
                                        : "visa",
                                    ).safety
                                  }
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start space-x-4">
                              <div className="w-9 h-9 rounded-xl bg-gray-900 flex items-center justify-center flex-shrink-0 shadow-lg">
                                <Zap className="w-4.5 h-4.5 text-amber-400" />
                              </div>
                              <div>
                                <p className="text-[10px] font-black text-gray-900 uppercase tracking-widest mb-0.5">
                                  Process Node
                                </p>
                                <p className="text-xs font-bold text-gray-700 leading-relaxed italic">
                                  {
                                    getAnswers(
                                      selectedCategory ===
                                        "ที่ปรึกษาสินเชื่อ / เดินสเตทเม้นท์"
                                        ? "loan"
                                        : "visa",
                                    ).process
                                  }
                                </p>
                              </div>
                            </div>
                          </div>

                          {step === "details" && (
                            <button
                              onClick={() => setStep("screening")}
                              className="w-full py-4 bg-gray-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] hover:bg-green-600 transition-all shadow-2xl flex items-center justify-center space-x-3 border-b-4 border-gray-800 active:border-b-0"
                            >
                              <span>ทราบแล้ว ประเมินงานของฉัน</span>
                              <ArrowRight className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    </>
                  )}

                {step === "screening" && (
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-2xl bg-gray-900 text-white flex items-center justify-center flex-shrink-0 text-[10px] font-black italic shadow-lg">
                      JP
                    </div>
                    <div className="bg-white p-6 rounded-[2.5rem] rounded-tl-none shadow-[0_20px_50px_-10px_rgba(0,0,0,0.05)] border border-gray-100 space-y-6 w-full">
                      <p className="text-sm font-black text-gray-900 uppercase tracking-tight italic">
                        คุณพร้อมเริ่มงาน{" "}
                        <span className="text-green-600 underline">ทันที</span>{" "}
                        หรือไม่?
                      </p>
                      <p className="text-xs font-black text-gray-700 leading-relaxed italic bg-gray-50 p-4 rounded-2xl border border-gray-100">
                        &quot;เราให้ความสำคัญสูงสุดกับพาร์ทเนอร์ที่พร้อมดำเนินการเท่านั้น
                        เพื่อความรัดกุมของข้อมูล&quot;
                      </p>
                      <div className="grid grid-cols-1 gap-3">
                        <button
                          onClick={() => {
                            setIsSerious(true);
                            setStep("finish");
                          }}
                          className="py-4 bg-green-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-green-500 shadow-xl transition-all"
                        >
                          พร้อมดำเนินการ 100%
                        </button>
                        <button
                          onClick={() => {
                            setIsSerious(false);
                            setStep("finish");
                          }}
                          className="py-4 bg-gray-100 text-gray-900 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-gray-200 transition-all border border-gray-200"
                        >
                          สอบถามข้อมูลเบื้องต้น
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {step === "finish" && (
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-2xl bg-gray-900 text-white flex items-center justify-center flex-shrink-0 text-[10px] font-black italic shadow-lg">
                      JP
                    </div>
                    <div className="bg-white p-8 rounded-[3rem] rounded-tl-none shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100 space-y-6 w-full text-center">
                      {isSerious ? (
                        <>
                          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-xl">
                            <CheckCircle2 className="w-8 h-8" />
                          </div>
                          <p className="text-base font-black text-gray-900 leading-tight uppercase italic underline decoration-green-500 decoration-4">
                            Priority A Filtered
                          </p>
                          <p className="text-xs font-black text-gray-700 leading-relaxed mb-6">
                            งานของคุณเข้าเกณฑ์ลำดับความสำคัญสูงสุด
                            ทีมผู้เชี่ยวชาญพร้อมสแตนบายดูแลคุณแล้ว
                          </p>
                          <button
                            onClick={handleContactLine}
                            className="w-full h-16 bg-[#06C755] text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center space-x-4 shadow-[0_20px_40px_-10px_rgba(6,199,85,0.4)] hover:brightness-110 transition-all border-b-4 border-[#05a34a]"
                          >
                            <MessageCircle className="w-6 h-6" />
                            <span>คุยผู้เชี่ยวชาญ VIP</span>
                          </button>
                        </>
                      ) : (
                        <>
                          <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-xl">
                            <AlertCircle className="w-8 h-8" />
                          </div>
                          <p className="text-base font-black text-gray-900 uppercase">
                            Automated Path
                          </p>
                          <p className="text-xs font-black text-gray-700 mb-8 italic">
                            เพื่อความรวดเร็วและประหยัดค่าธรรมเนียม
                            แนะนำพาร์ทเนอร์เลือกใช้บริการผ่านระบบอัตโนมัติบนหน้าเว็บได้ทันที
                          </p>
                          <Button
                            onClick={() =>
                              (window.location.href = "/partner/pricing")
                            }
                            className="w-full h-16 bg-gray-900 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] shadow-2xl"
                          >
                            ดูแพ็กเกจระบบอัตโนมัติ
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="p-6 bg-white border-t border-gray-100 text-center relative">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-900 italic">
                  End-to-End <span className="text-green-600">Encrypted</span>{" "}
                  Access
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
