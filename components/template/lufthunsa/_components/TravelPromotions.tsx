/* @identity เจ้าป่า */
import React from "react";
import Image from "next/image";

const OFFERS = [
  {
    city: "Berlin",
    price: "499",
    country: "Germany",
    image:
      "https://images.unsplash.com/photo-1560969184-10fe8719e047?q=80&w=2070",
  },
  {
    city: "Paris",
    price: "550",
    country: "France",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073",
  },
  {
    city: "Rome",
    price: "520",
    country: "Italy",
    image:
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1996",
  },
  {
    city: "Barcelona",
    price: "480",
    country: "Spain",
    image:
      "https://images.unsplash.com/photo-1583997051654-af6caac0f418?q=80&w=2071",
  },
];

const TravelPromotions = () => {
  return (
    <section className="bg-white px-[10%] py-20">
      <div className="mb-12">
        <h2 className="mb-2 text-3xl font-light tracking-tight text-[#001b48]">
          Discover the world
        </h2>
        <p className="text-slate-500">
          Explore our best offers for your next adventure
        </p>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        {OFFERS.map((offer, i) => (
          <div
            key={i}
            className="group cursor-pointer overflow-hidden rounded-lg border border-slate-100 bg-slate-50 transition-all hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="relative h-48 w-full">
              <Image
                src={offer.image}
                alt={offer.city}
                fill
                className="object-cover"
              />
              <div className="absolute left-4 top-4 bg-[#001b48] px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                Best Price
              </div>
            </div>
            <div className="p-6">
              <p className="mb-1 text-xs font-bold uppercase tracking-widest text-slate-400">
                {offer.country}
              </p>
              <h3 className="mb-4 text-xl font-bold text-[#001b48]">
                {offer.city}
              </h3>
              <div className="flex items-end justify-between border-t border-slate-200 pt-4">
                <div>
                  <p className="text-[10px] uppercase text-slate-400">From</p>
                  <p className="text-2xl font-black text-[#001b48]">
                    €{offer.price}
                  </p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-[#001b48] transition-colors group-hover:bg-[#001b48] group-hover:text-white">
                  →
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TravelPromotions;
