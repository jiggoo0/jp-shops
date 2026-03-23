import Link from "next/link";
import Image from "next/image";
import {
  Briefcase,
  Plane,
  FileSignature,
  FileText,
  ShieldCheck,
  CreditCard,
  ChevronRight,
  CheckCircle2,
  Lock,
  ArrowRight,
} from "lucide-react";
import { Button, Card, Section } from "@/components/ui";
import BlogSection from "@/components/sections/BlogSection";
import Hero from "@/components/sections/Hero";
import { ClientMotionDiv } from "@/components/ui/ClientMotion";

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
  return (
    <div className="bg-[#FDFDFD] text-gray-900 font-sans selection:bg-gray-900 selection:text-white">
      {/* Hero Section */}
      <Hero />

      {/* Services Grid */}
      <Section id="services" className="bg-[#F8F8F8] py-32">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-10">
            <div className="max-w-2xl">
              <div className="w-12 h-1.5 bg-gray-900 mb-8 rounded-full"></div>
              <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-none uppercase text-gray-900">
                บริการจาก{" "}
                <span className="text-gray-300 italic">JP VISUAL DOCS</span>
              </h2>
              <p className="text-gray-500 text-xl font-medium leading-relaxed italic">
                เราจัดการทุกความยุ่งยากของเอกสาร
                เพื่อให้คุณได้รับโอกาสที่ควรจะเป็น ภายใต้มาตรฐานสากล
              </p>
            </div>
            <Link href="/register">
              <Button
                variant="outline"
                size="lg"
                className="group h-16 rounded-2xl border-gray-200 px-10 bg-white shadow-sm hover:border-gray-900 transition-all"
              >
                <span className="font-black uppercase tracking-[0.2em] text-[10px]">
                  ดูบริการทั้งหมด
                </span>
                <ArrowRight className="w-4 h-4 ml-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {services.map((service, index) => (
              <ClientMotionDiv
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href="/register">
                  <Card className="group overflow-hidden !p-0 border-none shadow-[0_30px_60px_-15px_rgba(0,0,0,0.03)] hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.08)] transition-all duration-700 rounded-[3rem] bg-white cursor-pointer h-full flex flex-col">
                    <div className="h-64 w-full overflow-hidden relative">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent"></div>
                    </div>
                    <div className="p-12 relative flex-grow flex flex-col">
                      <div className="w-16 h-16 bg-gray-900 text-white rounded-2xl flex items-center justify-center mb-10 shadow-2xl -mt-20 relative z-10 border-[8px] border-white group-hover:bg-green-600 transition-all duration-500 group-hover:scale-110">
                        {service.icon}
                      </div>
                      <h3 className="text-3xl font-black mb-5 tracking-tight text-gray-900 group-hover:text-gray-900 transition-colors uppercase">
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
                </Link>
              </ClientMotionDiv>
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
          <ClientMotionDiv
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
              <Link href="/register" className="w-full sm:w-auto">
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-white text-gray-900 border-none hover:bg-gray-100 h-20 px-12 rounded-[2rem] font-black uppercase tracking-widest text-sm shadow-2xl w-full"
                >
                  ทดลองใช้ระบบ Vifily
                </Button>
              </Link>
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
          </ClientMotionDiv>

          <ClientMotionDiv
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-950 rounded-[4rem] p-2 shadow-[0_60px_120px_-20px_rgba(0,0,0,0.6)] relative group overflow-hidden border border-gray-800">
              <Image
                src="/vifily-verification.webp"
                alt="Vifily Scan Portal"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-1000"
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
          </ClientMotionDiv>
        </div>
      </section>

      {/* Blog Section */}
      <BlogSection />

      {/* Contact Section */}
      <Section id="contact" className="bg-white py-40">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-20 h-1.5 bg-gray-50 mx-auto mb-12 rounded-full"></div>
          <h2 className="text-6xl md:text-8xl font-black mb-10 tracking-tighter uppercase leading-none text-gray-900">
            ปรึกษา <span className="text-gray-200 italic">ผู้เชี่ยวชาญ.</span>
          </h2>
          <p className="text-gray-400 text-xl mb-20 font-medium max-w-2xl mx-auto leading-relaxed">
            ทีมงานผู้เชี่ยวชาญพร้อมให้คำปรึกษาแบบส่วนตัวตลอด 24 ชั่วโมง
            เพื่อให้คุณได้รับบริการที่ดีที่สุดและปลอดภัยสูงสุด
          </p>

          <ClientMotionDiv
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative inline-block"
          >
            <div className="absolute -inset-10 bg-green-500/5 rounded-full blur-[100px] animate-pulse"></div>
            <div className="flex flex-col items-center justify-center p-16 bg-white rounded-[4rem] border border-gray-50 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)] relative z-10 group hover:shadow-[0_60px_120px_-20px_rgba(0,0,0,0.15)] transition-all duration-700 border-b-[12px] border-b-gray-900">
              <div className="w-64 h-64 mb-12 relative p-4 bg-gray-50 rounded-[3rem]">
                <Image
                  src="https://qr-official.line.me/gs/M_462fqtfc_GW.png?oat_content=qr"
                  alt="Line OA JP Visual Docs"
                  fill
                  className="relative z-10 rounded-[2rem] shadow-sm group-hover:scale-105 transition-transform duration-500 p-4"
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
          </ClientMotionDiv>
        </div>
      </Section>
    </div>
  );
}
