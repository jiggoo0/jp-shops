"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Plane,
  Briefcase,
  FileSignature,
  FileText,
  ShieldCheck,
  CreditCard,
  ChevronRight,
  CheckCircle2,
  Scan,
  Lock,
  Award,
  ArrowRight,
  LogOut,
  User as UserIcon,
} from "lucide-react";
import { Button, Card, Section } from "@/components/ui";
import { supabase } from "@/lib";
import { CheckoutModal } from "@/components/CheckoutModal";
import { AIAssistant } from "@/components/AIAssistant";

const services = [
  {
    id: "loan",
    icon: <Briefcase className="w-6 h-6" />,
    title: "ที่ปรึกษาสินเชื่อ",
    description:
      "วิเคราะห์โปรไฟล์และเลือกแผนที่เหมาะสมที่สุด จัดชุดเอกสารให้ครบตามเงื่อนไขแบงก์ ดูแลการยื่นกู้ให้แบบมืออาชีพโดยที่คุณไม่ต้องจัดการเอง",
    image: "/service-loan.webp",
  },
  {
    id: "travel",
    icon: <Plane className="w-6 h-6" />,
    title: "ตั๋วเครื่องบิน & โรงแรม",
    description:
      "จัดการจองตั๋วและที่พักทั่วโลก พร้อม E-booking และ Google ค้นหาสถานะจริง การันตีงานด่วนจบไวภายใน 1 วัน",
    image:
      "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "visa",
    icon: <FileSignature className="w-6 h-6" />,
    title: "ดูแลเอกสารยื่นวีซ่า",
    description:
      "จัดชุดเอกสารครบและเนี้ยบที่สุด ปรับข้อมูลให้สอดคล้องเกณฑ์ประเทศปลายทางอย่างแม่นยำ ผลลัพธ์ผ่านฉลุยไม่มีสะดุด",
    image: "/service-visa.webp",
  },
  {
    id: "specialist",
    icon: <FileText className="w-6 h-6" />,
    title: "แก้ไขและจัดหาเอกสารเฉพาะทาง",
    description:
      "ปรับแก้หรือสร้างเอกสารใหม่ตามโจทย์ จัดหาเอกสารแม่นยำ งานเนียนและรวดเร็ว สำหรับงานด่วนพิเศษ",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "vifily",
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "เอกสารรับรองดิจิทัล (Vifily)",
    description:
      "สร้างความมั่นใจระดับสากลด้วย Vifily ออกเอกสารรับรองพร้อม QR Code ตรวจสอบโปรไฟล์ได้ทั่วโลก",
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "premium-card",
    icon: <CreditCard className="w-6 h-6" />,
    title: "ผลิตบัตรจริงเกรดพรีเมียม",
    description:
      "งานพิมพ์คุณภาพสูง พร้อมระบบจัดส่งรัดกุมและเป็นส่วนตัว เพื่อความปลอดภัยและเป็นความลับสูงสุด",
    image:
      "https://images.unsplash.com/photo-1613243555988-441166d4d6fd?auto=format&fit=crop&q=80&w=800",
  },
];

export default function LandingPage() {
  const router = useRouter();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      // ✅ Strict Guard for Supabase Client
      if (!supabase || !supabase.auth) return;

      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (session?.user) {
          setUserEmail(session.user.email ?? "Partner");
        }
      } catch (error) {
        console.warn("Auth session check failed:", error);
      }
    };
    checkUser();

    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    // ✅ Strict Guard for Supabase Client
    if (!supabase || !supabase.auth) return;

    setIsLoggingOut(true);
    try {
      await supabase.auth.signOut();
      setUserEmail(null);
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-gray-900 font-sans selection:bg-gray-900 selection:text-white">
      <AnimatePresence>
        {isCheckoutOpen && (
          <CheckoutModal onClose={() => setIsCheckoutOpen(false)} />
        )}
      </AnimatePresence>

      {/* Navigation Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur-xl border-b border-gray-100 py-4 shadow-sm" : "bg-transparent py-6"}`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="relative w-12 h-12">
              <img
                src="/logo.svg"
                alt="JP Visual Docs Logo"
                className="w-full h-full drop-shadow-xl group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tighter leading-none uppercase">
                JP-VISOUL<span className="text-gray-300">&DOCS</span>
              </span>
              <span className="text-[8px] font-black tracking-[0.2em] text-green-600 leading-none mt-1 uppercase">
                By.เจ้าป่า
              </span>
            </div>
          </div>

          <nav className="hidden lg:flex items-center space-x-10 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
            <button
              onClick={() => scrollToSection("services")}
              className="hover:text-gray-900 transition-colors"
            >
              บริการ
            </button>
            <button
              onClick={() => scrollToSection("vifily")}
              className="hover:text-gray-900 transition-colors"
            >
              ระบบ Vifily
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="hover:text-gray-900 transition-colors"
            >
              ติดต่อเรา
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            {userEmail ? (
              <div className="flex items-center space-x-3 bg-gray-50 px-4 py-2 rounded-full border border-gray-100 shadow-inner">
                <div className="hidden sm:flex flex-col text-right">
                  <span className="text-[8px] font-black uppercase tracking-widest text-gray-400">
                    Partner
                  </span>
                  <span className="text-[10px] font-bold text-gray-900">
                    {userEmail}
                  </span>
                </div>
                <Link
                  href="/partner/dashboard"
                  className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center hover:bg-green-600 transition-colors"
                >
                  <UserIcon className="w-4 h-4" />
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  disabled={isLoggingOut}
                >
                  <LogOut
                    className={`w-4 h-4 ${isLoggingOut ? "animate-pulse" : ""}`}
                  />
                </button>
              </div>
            ) : (
              <Link href="/login" className="hidden sm:block">
                <Button
                  variant="ghost"
                  size="sm"
                  className="font-black uppercase tracking-widest text-[10px]"
                >
                  พาร์ทเนอร์
                </Button>
              </Link>
            )}
            <Button
              size="sm"
              onClick={() => setIsCheckoutOpen(true)}
              className="rounded-full px-6 bg-gray-900 text-white font-black uppercase tracking-widest text-[10px] h-10 shadow-xl shadow-gray-200"
            >
              ประเมินด่วน
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative pt-32 pb-16 md:pt-56 md:pb-32 px-6 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-green-500/5 rounded-full blur-[150px] pointer-events-none"></div>
        <div className="absolute bottom-[0%] right-[-10%] w-[50%] h-[50%] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center space-x-3 bg-gray-100/80 backdrop-blur-sm px-5 py-2.5 rounded-full mb-10 border border-gray-200/50 shadow-sm">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-600">
                AI-Powered Global Trust
              </span>
            </div>

            <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-black tracking-tighter leading-[0.85] mb-10">
              ยื่นที่ไหน <br />
              ก็ผ่านฉลุย <br />
              <span className="text-green-600 italic">มั่นใจ 100%.</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-500 mb-12 leading-relaxed max-w-lg font-medium">
              ไม่ต้องปวดหัวกับเอกสารอีกต่อไป! JP Visual Docs ช่วยคุณจัดชุดเอกสาร
              วีซ่า สินเชื่อ และใบรับรองดิจิทัล ด้วยระบบ AI และผู้เชี่ยวชาญ
              งานด่วน งานเนียน ตรวจสอบได้จริงทั่วโลก
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Button
                size="lg"
                onClick={() => setIsCheckoutOpen(true)}
                className="group w-full sm:w-auto h-20 px-12 rounded-2xl bg-gray-900 text-white shadow-[0_25px_50px_-12px_rgba(0,0,0,0.3)] hover:bg-green-600 transition-all duration-500 flex items-center justify-center space-x-4"
              >
                <div className="flex flex-col items-start">
                  <span className="font-black uppercase tracking-widest text-sm">
                    เริ่มประเมินงานฟรี
                  </span>
                  <span className="text-[9px] opacity-60 font-medium">
                    รู้ผลเบื้องต้นใน 5 นาที
                  </span>
                </div>
                <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Button>
              <button
                onClick={() => scrollToSection("vifily")}
                className="flex items-center space-x-4 text-[10px] font-black uppercase tracking-[0.2em] hover:text-green-600 transition-colors py-4 group"
              >
                <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-green-600 group-hover:bg-green-50 transition-all">
                  <Scan className="w-4 h-4" />
                </div>
                <span>วิธีตรวจสอบเอกสาร</span>
              </button>
            </div>

            <div className="mt-20 flex items-center space-x-12">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-14 h-14 rounded-full border-4 border-white overflow-hidden bg-gray-200 shadow-xl relative z-10"
                  >
                    <img
                      src={`https://i.pravatar.cc/150?img=${i + 30}`}
                      alt="Successful User"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="text-sm">
                <div className="flex items-center space-x-1 mb-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Award
                      key={i}
                      className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500"
                    />
                  ))}
                </div>
                <p className="font-black text-gray-900 uppercase tracking-[0.15em] text-xs">
                  Trusted by 2,500+ Clients
                </p>
                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mt-1">
                  Verified Satisfaction
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative rounded-[3.5rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border-[16px] border-white">
              <img
                src="/hero-image.webp"
                alt="Elite Document Consultant"
                className="w-full aspect-[4/5] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent"></div>

              <div className="absolute bottom-12 left-12 right-12 bg-white/95 backdrop-blur-2xl p-10 rounded-[2.5rem] shadow-2xl border border-white/50">
                <div className="flex items-center space-x-3 text-green-600 font-black text-[10px] uppercase tracking-[0.3em] mb-4">
                  <ShieldCheck className="w-5 h-5" />
                  <span>Elite Vifily Partner</span>
                </div>
                <p className="text-gray-900 text-xl font-black leading-tight mb-4 italic">
                  &quot;ลดความเสี่ยงจากการถูกปฏิเสธเอกสารด้วยระบบตรวจสอบ AI 10
                  ขั้นตอน&quot;
                </p>
                <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                      System Online
                    </span>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-900">
                    v.16.2.1
                  </span>
                </div>
              </div>
            </div>

            {/* Floating UI Badges */}
            <div className="absolute -top-12 -right-12 bg-white p-8 rounded-[3rem] shadow-2xl border border-gray-50 flex items-center space-x-5 animate-bounce-slow">
              <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 shadow-inner">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mb-1">
                  Success Rate
                </p>
                <p className="text-3xl font-black text-gray-900 tracking-tighter">
                  99.9%
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Services Grid */}
      <Section id="services" className="bg-[#F8F8F8] py-32">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-10">
            <div className="max-w-2xl">
              <div className="w-12 h-1.5 bg-gray-900 mb-8 rounded-full"></div>
              <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-none uppercase">
                บริการจาก{" "}
                <span className="text-gray-300 italic">JP VISUAL DOCS</span>
              </h2>
              <p className="text-gray-500 text-xl font-medium leading-relaxed italic">
                เราจัดการทุกความยุ่งยากของเอกสาร
                เพื่อให้คุณได้รับโอกาสที่ควรจะเป็น ภายใต้มาตรฐานสากล
              </p>
            </div>
            <Button
              variant="outline"
              size="lg"
              onClick={() => setIsCheckoutOpen(true)}
              className="group h-16 rounded-2xl border-gray-200 px-10 bg-white shadow-sm hover:border-gray-900 transition-all"
            >
              <span className="font-black uppercase tracking-[0.2em] text-[10px]">
                ดูบริการทั้งหมด
              </span>
              <ArrowRight className="w-4 h-4 ml-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  onClick={() => setIsCheckoutOpen(true)}
                  className="group overflow-hidden !p-0 border-none shadow-[0_30px_60px_-15px_rgba(0,0,0,0.03)] hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.08)] transition-all duration-700 rounded-[3rem] bg-white cursor-pointer h-full flex flex-col"
                >
                  <div className="h-64 w-full overflow-hidden relative">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent"></div>
                  </div>
                  <div className="p-12 relative flex-grow flex flex-col">
                    <div className="w-16 h-16 bg-gray-900 text-white rounded-2xl flex items-center justify-center mb-10 shadow-2xl -mt-20 relative z-10 border-[8px] border-white group-hover:bg-green-600 transition-all duration-500 group-hover:scale-110">
                      {service.icon}
                    </div>
                    <h3 className="text-3xl font-black mb-5 tracking-tight group-hover:text-gray-900 transition-colors uppercase">
                      {service.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-10 font-medium flex-grow">
                      {service.description}
                    </p>
                    <div className="flex items-center text-[10px] font-black uppercase tracking-[0.25em] text-gray-900 pt-8 border-t border-gray-50 opacity-40 group-hover:opacity-100 transition-opacity">
                      <span>เริ่มดำเนินการ</span>
                      <ChevronRight className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Vifily Verification Section */}
      <section
        id="vifily"
        className="py-40 bg-gray-900 text-white overflow-hidden relative"
      >
        <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-green-500/5 via-transparent to-blue-500/5"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-32 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center space-x-3 bg-gray-800/80 backdrop-blur-xl px-6 py-3 rounded-2xl mb-12 border border-gray-700 shadow-2xl">
              <ShieldCheck className="w-5 h-5 text-green-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300">
                Global Verification Engine
              </span>
            </div>
            <h2 className="text-6xl md:text-8xl font-black mb-10 leading-[0.85] tracking-tighter italic">
              บอกลาเอกสาร <br />{" "}
              <span className="text-green-500">ที่ปลอมแปลงได้.</span>
            </h2>
            <p className="text-gray-400 text-xl mb-16 leading-relaxed font-medium max-w-xl italic">
              &quot;เอกสารทุกฉบับจาก JP Visual Docs จะมาพร้อมกับระบบ Vifily QR
              Code เฉพาะตัว
              สร้างความน่าเชื่อถือในระดับสากลที่ไม่มีใครปฏิเสธได้&quot;
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-8">
              <Button
                variant="secondary"
                size="lg"
                className="bg-white text-gray-900 border-none hover:bg-gray-100 h-20 px-12 rounded-[2rem] font-black uppercase tracking-widest text-sm shadow-2xl"
                onClick={() => setIsCheckoutOpen(true)}
              >
                ทดลองใช้ระบบ Vifily
              </Button>
              <div className="flex items-center space-x-5">
                <div className="w-14 h-14 rounded-full border border-gray-700 flex items-center justify-center bg-gray-800/30">
                  <Lock className="w-6 h-6 text-gray-500" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">
                    Secured By
                  </p>
                  <p className="text-xs font-black uppercase tracking-[0.15em] text-gray-300">
                    Vifily Intelligence
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-950 rounded-[4rem] p-2 shadow-[0_60px_120px_-20px_rgba(0,0,0,0.6)] relative group overflow-hidden border border-gray-800">
              <img
                src="/vifily-verification.webp"
                alt="Vifily Scan Portal"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-72 h-72 bg-white p-10 rounded-[3.5rem] shadow-2xl transform -rotate-12 group-hover:rotate-0 transition-all duration-1000 ease-out">
                  <div className="w-full h-full bg-gray-50 rounded-3xl flex items-center justify-center border-2 border-dashed border-gray-200">
                    <div className="text-center">
                      <ShieldCheck className="w-20 h-20 text-gray-900 mx-auto mb-6 group-hover:scale-110 transition-transform" />
                      <div className="w-32 h-2.5 bg-gray-200 rounded-full mx-auto mb-3"></div>
                      <div className="w-20 h-2 bg-gray-100 rounded-full mx-auto"></div>
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-300 text-center mt-6 font-black uppercase tracking-[0.3em]">
                    Scan to Verify
                  </p>
                </div>
              </div>

              {/* Status HUD elements */}
              <div className="absolute top-12 left-12 flex space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-green-500/30 rounded-full"></div>
              </div>
            </div>

            <div className="absolute -bottom-10 -right-10 bg-green-600 text-white px-10 py-6 rounded-[2.5rem] shadow-2xl flex items-center space-x-4 border-[10px] border-gray-900">
              <CheckCircle2 className="w-6 h-6" />
              <span className="font-black uppercase tracking-[0.2em] text-xs">
                Authentic Doc
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <Section id="contact" className="bg-white py-40">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-20 h-1.5 bg-gray-50 mx-auto mb-12 rounded-full"></div>
          <h2 className="text-6xl md:text-8xl font-black mb-10 tracking-tighter uppercase leading-none">
            ปรึกษา <span className="text-gray-200 italic">ผู้เชี่ยวชาญ.</span>
          </h2>
          <p className="text-gray-400 text-xl mb-20 font-medium max-w-2xl mx-auto leading-relaxed">
            ทีมงานผู้เชี่ยวชาญพร้อมให้คำปรึกษาแบบส่วนตัวตลอด 24 ชั่วโมง
            เพื่อให้คุณได้รับบริการที่ดีที่สุดและปลอดภัยสูงสุด
          </p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative inline-block"
          >
            <div className="absolute -inset-10 bg-green-500/5 rounded-full blur-[100px] animate-pulse"></div>
            <div className="flex flex-col items-center justify-center p-16 bg-white rounded-[4rem] border border-gray-50 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)] relative z-10 group hover:shadow-[0_60px_120px_-20px_rgba(0,0,0,0.15)] transition-all duration-700 border-b-[12px] border-b-gray-900">
              <div className="w-64 h-64 mb-12 relative p-4 bg-gray-50 rounded-[3rem]">
                <img
                  src="https://qr-official.line.me/gs/M_462fqtfc_GW.png?oat_content=qr"
                  alt="Line OA JP Visual Docs"
                  className="w-full h-full relative z-10 rounded-[2rem] shadow-sm group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="bg-green-50 text-green-700 px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.25em] mb-6 border border-green-100">
                @462fqtfc
              </div>

              <p className="font-black text-gray-900 text-3xl mb-3 tracking-tighter uppercase">
                Line Official
              </p>
              <p className="text-gray-400 text-xs font-black uppercase tracking-[0.2em]">
                Private Consultant 24/7
              </p>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-[#F9F9F9] border-t border-gray-100 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-5 gap-20 mb-32">
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-10">
                <div className="relative w-12 h-12">
                  <img
                    src="/logo.svg"
                    alt="JP Visual Docs Logo"
                    className="w-full h-full drop-shadow-xl opacity-80 hover:opacity-100 transition-opacity"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-black tracking-tighter uppercase leading-none">
                    JP-VISOUL<span className="text-gray-300">&DOCS</span>
                  </span>
                  <span className="text-[7px] font-black tracking-[0.2em] text-green-600 leading-none mt-1 uppercase">
                    By.เจ้าป่า
                  </span>
                </div>
              </div>
              <p className="text-gray-400 text-xl max-w-sm mb-12 font-medium italic leading-relaxed">
                &quot;เราช่วยวิเคราะห์และจัดชุดเอกสารให้ครบตามเงื่อนไข
                แบงก์และสถานทูต ดูแลระดับมืออาชีพที่คุณไม่ต้องจัดการเอง&quot;
              </p>
            </div>

            <div className="col-span-1">
              <p className="font-black uppercase tracking-[0.3em] text-[10px] text-gray-900 mb-10">
                ระบบจัดการ
              </p>
              <ul className="space-y-5 text-xs font-black uppercase tracking-[0.15em] text-gray-400">
                <li
                  onClick={() => scrollToSection("services")}
                  className="hover:text-gray-900 cursor-pointer transition-colors"
                >
                  ยื่นวีซ่าครบวงจร
                </li>
                <li
                  onClick={() => scrollToSection("services")}
                  className="hover:text-gray-900 cursor-pointer transition-colors"
                >
                  ที่ปรึกษาสินเชื่อ
                </li>
                <li
                  onClick={() => scrollToSection("vifily")}
                  className="hover:text-gray-900 cursor-pointer transition-colors"
                >
                  ระบบ Vifily Check
                </li>
              </ul>
            </div>

            <div className="col-span-1">
              <p className="font-black uppercase tracking-[0.3em] text-[10px] text-gray-900 mb-10">
                เอกสารสำคัญ
              </p>
              <ul className="space-y-5 text-xs font-black uppercase tracking-[0.15em] text-gray-400">
                <li>
                  <Link
                    href="/privacy"
                    className="hover:text-gray-900 cursor-pointer transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="hover:text-gray-900 cursor-pointer transition-colors"
                  >
                    Terms of Use
                  </Link>
                </li>
                <li
                  onClick={() => scrollToSection("contact")}
                  className="hover:text-gray-900 cursor-pointer transition-colors"
                >
                  ติดต่อเจ้าหน้าที่
                </li>
              </ul>
            </div>

            <div className="col-span-1">
              <p className="font-black uppercase tracking-[0.3em] text-[10px] text-gray-900 mb-10">
                สำหรับพาร์ทเนอร์
              </p>
              <ul className="space-y-5 text-xs font-black uppercase tracking-[0.15em] text-gray-400">
                <li>
                  <Link
                    href="/login"
                    className="hover:text-gray-900 cursor-pointer transition-colors"
                  >
                    Partner Login
                  </Link>
                </li>
                <li>
                  <Link
                    href="/register"
                    className="hover:text-gray-900 cursor-pointer transition-colors"
                  >
                    ร่วมเป็นส่วนหนึ่ง
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-16 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="flex items-center space-x-3 opacity-30">
              <div className="w-1.5 h-1.5 bg-gray-900 rounded-full"></div>
              <p className="text-[10px] font-black uppercase tracking-[0.4em]">
                JP-Visual&Docs &copy; {new Date().getFullYear()}
              </p>
            </div>
            <div className="flex items-center space-x-4 grayscale opacity-40">
              <div className="flex items-center space-x-2">
                <Lock className="w-3.5 h-3.5" />
                <span className="text-[9px] font-black uppercase tracking-[0.2em]">
                  SSL Secured
                </span>
              </div>
              <div className="w-px h-4 bg-gray-200"></div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span className="text-[9px] font-black uppercase tracking-[0.2em]">
                  AI Verified
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <AIAssistant />
    </div>
  );
}
