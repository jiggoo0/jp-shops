/* @identity เจ้าป่า */
import React from "react";
import {
  CheckCircle,
  Briefcase,
  Coffee,
  ShieldCheck,
  Heart,
} from "lucide-react";

const SERVICES = [
  {
    icon: CheckCircle,
    label: "เช็คอินออนไลน์",
    desc: "สะดวก รวดเร็ว ไม่ต้องรอคิว",
  },
  {
    icon: Briefcase,
    label: "จัดการสัมภาระ",
    desc: "ซื้อน้ำหนักเพิ่มในราคาพิเศษ",
  },
  { icon: Coffee, label: "บริการอาหารบนเครื่อง", desc: "เลือกเมนูโปรดของคุณ" },
  {
    icon: ShieldCheck,
    label: "ประกันการเดินทาง",
    desc: "คุ้มครองทุกการเดินทาง",
  },
  {
    icon: Heart,
    label: "ความช่วยเหลือพิเศษ",
    desc: "ดูแลคุณเป็นพิเศษในทุกขั้นตอน",
  },
];

const QuickServices = () => {
  return (
    <section className="bg-slate-50 px-[10%] py-16">
      <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5">
        {SERVICES.map((service, i) => (
          <div
            key={i}
            className="group flex cursor-pointer flex-col items-center text-center"
          >
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm transition-all group-hover:-translate-y-1 group-hover:bg-[#4b2382] group-hover:text-white">
              <service.icon size={32} strokeWidth={1.5} />
            </div>
            <h4 className="mb-1 text-sm font-bold text-[#4b2382]">
              {service.label}
            </h4>
            <p className="text-xs text-slate-500">{service.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default QuickServices;
