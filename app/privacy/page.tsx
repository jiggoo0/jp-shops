import React from "react";
import { ShieldCheck, Lock, Eye, Database, Globe } from "lucide-react";

export default function PrivacyPolicyPage() {
  const sections = [
    {
      title: "1. การจัดเก็บข้อมูล (Data Collection)",
      content:
        "JP Visual Docs จัดเก็บข้อมูลเฉพาะที่จำเป็นต่อการให้บริการตรวจสอบเอกสารดิจิทัล ได้แก่ ข้อมูลบัญชีผู้ใช้ (อีเมล), ประวัติการใช้บริการ และข้อมูลทางเทคนิค (IP Address) เพื่อความปลอดภัยและเสถียรภาพของระบบ",
      icon: <Database className="w-5 h-5 text-gray-900" />,
    },
    {
      title: "2. การรักษาความปลอดภัย (Data Security)",
      content:
        "เราใช้ระบบการเข้ารหัสข้อมูลระดับสูง (Advanced Encryption Standard) และเทคโนโลยี AI ในการตรวจสอบความปลอดภัย เพื่อป้องกันการเข้าถึงข้อมูลโดยไม่ได้รับอนุญาต ข้อมูลพาร์ทเนอร์จะถูกเก็บรักษาเป็นความลับสูงสุด",
      icon: <Lock className="w-5 h-5 text-gray-900" />,
    },
    {
      title: "3. นโยบายคุกกี้ (Cookie Policy)",
      content:
        "เว็บไซต์ของเรามีการใช้คุกกี้เพื่อปรับปรุงประสบการณ์การใช้งาน (User Experience) และเพื่อวิเคราะห์ประสิทธิภาพของระบบ โดยจะไม่มีการเก็บข้อมูลส่วนบุคคลที่ระบุตัวตนได้เกินความจำเป็น",
      icon: <Eye className="w-5 h-5 text-gray-900" />,
    },
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFD] py-32 px-6 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="mb-20">
          <div className="inline-flex items-center space-x-3 bg-gray-100 px-5 py-2 rounded-full mb-6 border border-gray-200">
            <ShieldCheck className="w-4 h-4 text-green-600" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600">
              Secure Protocol v.15.1
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-8 tracking-tighter uppercase leading-none">
            นโยบายความเป็นส่วนตัว <br />
            <span className="text-gray-300 italic">(Privacy Policy)</span>
          </h1>
          <p className="text-gray-500 text-lg font-medium leading-relaxed italic">
            &quot;ความเชื่อมั่นคือรากฐานของความสำเร็จ
            เราจึงให้ความสำคัญกับการคุ้มครองข้อมูลของพาร์ทเนอร์อย่างเข้มงวดที่สุด&quot;
          </p>
        </div>

        <div className="space-y-16">
          {sections.map((section, index) => (
            <div key={index} className="group">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 bg-gray-50 rounded-2xl group-hover:bg-gray-900 group-hover:text-white transition-all duration-500 shadow-sm border border-gray-100">
                  {section.icon}
                </div>
                <h2 className="text-xl font-black uppercase tracking-tight text-gray-900">
                  {section.title}
                </h2>
              </div>
              <p className="text-gray-600 text-base leading-relaxed font-medium pl-16">
                {section.content}
              </p>
            </div>
          ))}

          <div className="pt-16 border-t border-gray-100 mt-20">
            <div className="flex items-center space-x-3 mb-6">
              <Globe className="w-4 h-4 text-gray-300" />
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">
                อัปเดตล่าสุด: 24 มีนาคม 2026
              </p>
            </div>
            <p className="text-[10px] text-gray-300 leading-relaxed uppercase tracking-widest font-bold">
              JP VISUAL DOCS &bull; COMPLIANCE & DATA PROTECTION DIVISION
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
