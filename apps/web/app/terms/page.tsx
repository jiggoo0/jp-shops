import React from "react";
import {
  ShieldAlert,
  Scale,
  Edit3,
  AlertTriangle,
  FileCheck,
} from "lucide-react";

export default function TermsOfServicePage() {
  const rules = [
    {
      title: "1. การยอมรับข้อกำหนด (Acceptance)",
      content:
        "โดยการเข้าถึงหรือใช้งานระบบ JP Visual Docs คุณยอมรับว่าได้อ่าน ทำความเข้าใจ และตกลงที่จะผูกพันตามข้อกำหนดเหล่านี้ บริการของเราสงวนไว้สำหรับพาร์ทเนอร์ที่จดทะเบียนและได้รับอนุญาตเท่านั้น",
      icon: <FileCheck className="w-5 h-5 text-gray-900" />,
    },
    {
      title: "2. ความรับผิดชอบต่อข้อมูล (User Responsibility)",
      content:
        "JP Visual Docs ให้บริการเครื่องมือ (Tooling) และเทมเพลตสำหรับจัดการเอกสารดิจิทัลเท่านั้น ผู้ใช้งานเป็นผู้กรอกข้อมูลและตรวจสอบความถูกต้องด้วยตนเอง 100% เราจะไม่รับผิดชอบต่อความเสียหายใดๆ ที่เกิดจากการนำเอกสารไปใช้งานที่ผิดวัตถุประสงค์หรือผิดกฎหมาย",
      icon: <Edit3 className="w-5 h-5 text-gray-900" />,
    },
    {
      title: "3. ขอบเขตบริการ 50/50 (Service Boundary)",
      content:
        "ระบบอัตโนมัติของเรามีหน้าที่ช่วยเตรียมความพร้อมเบื้องต้นของเอกสาร การดัดแปลงขั้นสูงหรือการปรึกษาเคสพิเศษอยู่นอกขอบเขตของระบบ และต้องดำเนินการผ่านที่ปรึกษาเฉพาะทาง (Line OA) เท่านั้น",
      icon: <Scale className="w-5 h-5 text-gray-900" />,
    },
    {
      title: "4. การระงับการใช้งาน (Termination)",
      content:
        "เราสงวนสิทธิ์ในการระงับบัญชีผู้ใช้งานทันทีโดยไม่ต้องแจ้งให้ทราบล่วงหน้า หากพบว่ามีการละเมิดข้อตกลง หรือใช้ระบบเพื่อวัตถุประสงค์ในการฉ้อโกงที่เป็นอันตรายต่อแบรนด์และชื่อเสียงของ JP Visual Docs",
      icon: <ShieldAlert className="w-5 h-5 text-gray-900" />,
    },
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFD] py-32 px-6 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="mb-20">
          <div className="inline-flex items-center space-x-3 bg-red-50 px-5 py-2 rounded-full mb-6 border border-red-100">
            <AlertTriangle className="w-4 h-4 text-red-600" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-600">
              Legal Compliance Protocol
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-8 tracking-tighter uppercase leading-none">
            ข้อกำหนดการใช้บริการ <br />
            <span className="text-gray-300 italic">(Terms of Service)</span>
          </h1>
          <p className="text-gray-400 text-lg font-medium leading-relaxed italic">
            &quot;เครื่องมือของเราสร้างขึ้นเพื่อเพิ่มความน่าเชื่อถือให้กับเอกสาร
            ความรับผิดชอบของคุณคือการใช้งานมันอย่างมีคุณธรรม&quot;
          </p>
        </div>

        <div className="space-y-16">
          {rules.map((rule, index) => (
            <div key={index} className="group">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 bg-gray-50 rounded-2xl group-hover:bg-gray-900 group-hover:text-white transition-all duration-500 shadow-sm border border-gray-100">
                  {rule.icon}
                </div>
                <h2 className="text-xl font-black uppercase tracking-tight text-gray-900">
                  {rule.title}
                </h2>
              </div>
              <p className="text-gray-500 text-base leading-relaxed font-medium pl-16">
                {rule.content}
              </p>
            </div>
          ))}

          <div className="mt-20 p-12 bg-gray-50 rounded-[3rem] border border-gray-100 italic">
            <p className="text-xs text-gray-400 leading-relaxed font-bold uppercase tracking-widest text-center">
              &quot;JP Visual Docs ดำเนินธุรกิจภายใต้หลักความโปร่งใสทางเทคโนโลยี{" "}
              <br />
              เราขอปฏิเสธความรับผิดชอบในการใช้งานที่ขัดต่อกฎหมายท้องถิ่นในทุกกรณี&quot;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
