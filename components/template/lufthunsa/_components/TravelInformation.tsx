/* @identity เจ้าป่า */
import React from "react";
import { Info, Luggage, Plane, ShieldCheck, HelpCircle } from "lucide-react";

const INFO_LINKS = [
  {
    icon: Info,
    title: "Entry Regulations",
    desc: "Current requirements for your destination",
  },
  {
    icon: Luggage,
    title: "Baggage",
    desc: "Everything about carry-on and checked luggage",
  },
  {
    icon: Plane,
    title: "Flight Status",
    desc: "Real-time updates on all departures",
  },
  {
    icon: ShieldCheck,
    title: "Travel Insurance",
    desc: "Secured travel with our partners",
  },
  {
    icon: HelpCircle,
    title: "Help & Contact",
    desc: "We are here to support you",
  },
];

const TravelInformation = () => {
  return (
    <section className="bg-slate-50 px-[10%] py-20">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
        {INFO_LINKS.map((link, i) => (
          <div
            key={i}
            className="group cursor-pointer rounded-lg border border-slate-100 bg-white p-6 shadow-sm transition-colors hover:border-[#001b48]"
          >
            <div className="mb-4 text-[#001b48] transition-transform duration-300 group-hover:scale-110">
              <link.icon size={28} strokeWidth={1.5} />
            </div>
            <h4 className="mb-1 font-bold text-[#001b48]">{link.title}</h4>
            <p className="text-xs leading-relaxed text-slate-400">
              {link.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TravelInformation;
