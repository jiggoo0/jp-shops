/* @identity เจ้าป่า */
import React from "react";
import Image from "next/image";

const HOTELS = [
  {
    name: "The Landmark Bangkok",
    location: "สุขุมวิท, กรุงเทพฯ",
    rating: "8.9",
    reviews: "2,450",
    price: "4,200",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070",
  },
  {
    name: "Siam Kempinski Hotel",
    location: "ปทุมวัน, กรุงเทพฯ",
    rating: "9.5",
    reviews: "1,820",
    price: "12,500",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070",
  },
  {
    name: "Keemala Phuket",
    location: "กมลา, ภูเก็ต",
    rating: "9.2",
    reviews: "980",
    price: "18,900",
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2080",
  },
  {
    name: "Park Hyatt Seoul",
    location: "กังนัม, โซล",
    rating: "9.0",
    reviews: "1,200",
    price: "15,400",
    image:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2074",
  },
];

const TrendingProperties = () => {
  return (
    <section className="mt-16">
      <h3 className="mb-6 text-2xl font-bold">ที่พักที่ผู้เดินทางชื่นชอบ</h3>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {HOTELS.map((hotel, i) => (
          <div
            key={i}
            className="group cursor-pointer overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="relative h-48 w-full">
              <Image
                src={hotel.image}
                alt={hotel.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h4 className="truncate text-base font-bold">{hotel.name}</h4>
              <p className="mb-2 text-sm text-slate-500">{hotel.location}</p>
              <div className="mb-4 flex items-center gap-2">
                <div className="rounded-sm bg-[#003580] px-1.5 py-1 text-xs font-bold text-white">
                  {hotel.rating}
                </div>
                <span className="text-xs font-medium text-slate-600">
                  ดีเยี่ยม · {hotel.reviews} ความคิดเห็น
                </span>
              </div>
              <div className="text-right">
                <p className="text-xs uppercase text-slate-500">ราคาเริ่มต้น</p>
                <p className="text-lg font-bold text-[#1a1a1a]">
                  ฿{hotel.price}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrendingProperties;
