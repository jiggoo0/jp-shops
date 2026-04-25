/* @identity เจ้าป่า */
import React from "react";
import Image from "next/image";

const DEALS = [
  {
    city: "โตเกียว (นาริตะ)",
    price: "18,900",
    image:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=2094",
  },
  {
    city: "โซล (อินชอน)",
    price: "12,500",
    image:
      "https://images.unsplash.com/photo-1517154421773-0529f29ea451?q=80&w=2070",
  },
  {
    city: "ลอนดอน (ฮีทโธรว์)",
    price: "32,400",
    image:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2070",
  },
  {
    city: "ปารีส (ชาร์ล เดอ โกล)",
    price: "29,800",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073",
  },
];

const FlightDeals = () => {
  return (
    <section className="bg-white px-[10%] py-16">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#4b2382]">ข้อเสนอสุดพิเศษ</h2>
          <p className="text-slate-500">
            เดินทางไปกับเราในราคาที่คุ้มค่าที่สุด
          </p>
        </div>
        <button className="font-semibold text-[#4b2382] hover:underline">
          ดูทั้งหมด
        </button>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {DEALS.map((deal, i) => (
          <div
            key={i}
            className="group cursor-pointer overflow-hidden rounded-xl border border-slate-100 shadow-sm transition-all hover:shadow-md"
          >
            <div className="relative h-48 w-full overflow-hidden">
              <Image
                src={deal.image}
                alt={deal.city}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-[#4b2382]">
                แนะนำ
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-slate-800">{deal.city}</h3>
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-slate-500">
                    ไป-กลับ เริ่มต้นที่
                  </p>
                  <p className="text-xl font-bold text-[#f9a825]">
                    ฿{deal.price}
                  </p>
                </div>
                <button className="rounded-lg bg-[#4b2382] px-3 py-2 text-xs font-bold text-white">
                  จองเลย
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FlightDeals;
