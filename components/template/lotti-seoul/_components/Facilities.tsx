/* @identity เจ้าป่า */
import React from "react";
import {
  Waves,
  Dumbbell,
  Coffee,
  UtensilsCrossed,
  Sparkles,
} from "lucide-react";

const FACILITIES = [
  {
    icon: Waves,
    label: "Indoor Pool",
    desc: "Temperature controlled infinity pool",
  },
  {
    icon: Dumbbell,
    label: "Fitness Center",
    desc: "State-of-the-art TechnoGym equipment",
  },
  {
    icon: Sparkles,
    label: "Luxury Spa",
    desc: "Traditional Korean wellness treatments",
  },
  {
    icon: UtensilsCrossed,
    label: "Fine Dining",
    desc: "Michelin-starred culinary experiences",
  },
  {
    icon: Coffee,
    label: "Executive Lounge",
    desc: "Exclusive space for business and relaxation",
  },
];

const Facilities = () => {
  return (
    <section className="bg-[#fcfaf7] px-[10%] py-24">
      <div className="mb-16 text-center">
        <span className="mb-4 block text-xs uppercase tracking-[4px] text-[#c5a059]">
          World Class
        </span>
        <h2 className="text-3xl font-light tracking-[2px] text-slate-800">
          Amenities & Facilities
        </h2>
      </div>
      <div className="grid grid-cols-2 gap-12 md:grid-cols-3 lg:grid-cols-5">
        {FACILITIES.map((item, i) => (
          <div
            key={i}
            className="group flex cursor-pointer flex-col items-center text-center"
          >
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-[#c5a059]/30 bg-white transition-all duration-500 group-hover:bg-[#c5a059] group-hover:text-white group-hover:shadow-xl group-hover:shadow-[#c5a059]/20">
              <item.icon size={32} strokeWidth={1} />
            </div>
            <h4 className="mb-2 text-sm font-medium uppercase tracking-[1px] text-slate-800">
              {item.label}
            </h4>
            <p className="max-w-[150px] text-[11px] leading-relaxed text-slate-400">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Facilities;
