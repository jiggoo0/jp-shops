/* @identity เจ้าป่า */
import React from "react";
import Image from "next/image";

const ROOMS = [
  {
    name: "Deluxe Double Room",
    size: "45 sqm",
    price: "350,000",
    image:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2074",
  },
  {
    name: "Premier Suite",
    size: "85 sqm",
    price: "720,000",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070",
  },
  {
    name: "Executive Grand",
    size: "60 sqm",
    price: "480,000",
    image:
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070",
  },
];

const RoomList = () => {
  return (
    <section className="bg-white px-[10%] py-24">
      <div className="mb-16 text-center">
        <span className="mb-4 block text-xs uppercase tracking-[4px] text-[#c5a059]">
          Exquisite Living
        </span>
        <h2 className="text-3xl font-light tracking-[2px] text-slate-800">
          Accommodations
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
        {ROOMS.map((room, i) => (
          <div key={i} className="group cursor-pointer">
            <div className="relative mb-6 h-[400px] w-full overflow-hidden">
              <Image
                src={room.image}
                alt={room.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <h3 className="mb-2 text-xl font-light tracking-[1px]">
              {room.name}
            </h3>
            <div className="flex items-center justify-between border-t border-slate-100 pt-4 text-sm text-slate-500">
              <span>{room.size}</span>
              <span className="font-medium text-[#c5a059]">
                From KRW {room.price}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RoomList;
