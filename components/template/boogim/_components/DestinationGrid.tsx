/* @identity เจ้าป่า */
import React from "react";
import Image from "next/image";

const DESTINATIONS = [
  {
    name: "กรุงเทพมหานคร",
    properties: "3,452",
    image:
      "https://images.unsplash.com/photo-1563492065599-3520f775eeed?q=80&w=2070",
  },
  {
    name: "ภูเก็ต",
    properties: "2,108",
    image:
      "https://images.unsplash.com/photo-1589394815804-964ed9be2eb3?q=80&w=2070",
  },
  {
    name: "โตเกียว",
    properties: "4,821",
    image:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=2094",
  },
  {
    name: "โซล",
    properties: "2,930",
    image:
      "https://images.unsplash.com/photo-1517154421773-0529f29ea451?q=80&w=2070",
  },
  {
    name: "โอซาก้า",
    properties: "1,754",
    image:
      "https://images.unsplash.com/photo-1590559899731-a382839e5549?q=80&w=2070",
  },
  {
    name: "เชียงใหม่",
    properties: "1,240",
    image:
      "https://images.unsplash.com/photo-1524491989242-af57bbfe4df3?q=80&w=2070",
  },
];

const DestinationGrid = () => {
  return (
    <section className="mt-12">
      <h3 className="mb-2 text-2xl font-bold">จุดหมายปลายทางยอดนิยม</h3>
      <p className="mb-6 text-slate-500">
        ตัวเลือกยอดนิยมสำหรับผู้เดินทางจากไทย
      </p>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {DESTINATIONS.map((dest, i) => (
          <div key={i} className="group cursor-pointer">
            <div className="relative mb-2 h-32 w-full overflow-hidden rounded-lg">
              <Image
                src={dest.image}
                alt={dest.name}
                fill
                className="object-cover transition-transform group-hover:scale-110"
              />
            </div>
            <h4 className="text-sm font-bold">{dest.name}</h4>
            <p className="text-xs text-slate-500">{dest.properties} ที่พัก</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DestinationGrid;
