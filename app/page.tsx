import BlogSection from "@/components/sections/BlogSection";
import Hero from "@/components/sections/Hero";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { VerificationSection } from "@/components/sections/VerificationSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function LandingPage() {
  return (
    <div className="bg-[#FDFDFD] text-gray-900 font-sans selection:bg-gray-900 selection:text-white">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute top-40 left-1/2 -translate-x-1/2 z-20 w-full max-w-4xl px-6">
          <div className="bg-red-600 text-white px-8 py-3 rounded-full text-[11px] font-black uppercase tracking-[0.2em] flex items-center justify-center space-x-4 shadow-[0_20px_50px_-10px_rgba(220,38,38,0.5)] border-2 border-white/30 backdrop-blur-md">
            <span className="w-2.5 h-2.5 bg-white rounded-full animate-ping"></span>
            <span className="drop-shadow-sm uppercase">
              นี่คือระบบใช้งานจริง -
              ข้อมูลธุรกิจอยู่ระหว่างการปรับปรุงโดยผู้บริหาร
            </span>
            <span className="w-2.5 h-2.5 bg-white rounded-full animate-ping"></span>
          </div>
        </div>
        <Hero />
      </div>

      {/* Services Grid */}
      <ServicesSection />

      {/* Operational Protocol */}
      <ProcessSection />

      {/* Vifily Verification Section */}
      <VerificationSection />

      {/* Blog Section */}
      <BlogSection />

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
}
