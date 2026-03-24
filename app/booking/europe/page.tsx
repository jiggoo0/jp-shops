"use client";

import {
  Search,
  Calendar,
  Users,
  Star,
  MapPin,
  ChevronRight,
  Heart,
  ArrowUpDown,
  Check,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function EuropeBookingPage() {
  return (
    <div className="min-h-screen bg-[#F5F5F5] font-sans text-gray-900 selection:bg-[#003580] selection:text-white pb-20">
      {/* 🇪🇺 European Style Navbar - e-Vifily Booking */}
      <nav className="bg-[#003580] text-white py-4 px-6 sticky top-0 z-[100] shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-10">
            <Link
              href="/"
              className="text-2xl font-black tracking-tighter uppercase flex items-center"
            >
              e-Vifily<span className="text-[#febb02]">Booking</span>
            </Link>
            <div className="hidden lg:flex items-center space-x-6 text-[11px] font-bold">
              <Link
                href="#"
                className="bg-white/10 px-4 py-2 rounded-full border border-white/20"
              >
                Stays
              </Link>
              <Link
                href="#"
                className="hover:bg-white/5 px-4 py-2 rounded-full transition-all"
              >
                Flights
              </Link>
              <Link
                href="#"
                className="hover:bg-white/5 px-4 py-2 rounded-full transition-all"
              >
                Car rentals
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-xs font-bold hover:bg-white/10 px-4 py-2 rounded transition-all">
              THB
            </button>
            <div className="w-6 h-4 bg-white rounded-sm overflow-hidden relative border border-white/20">
              <div className="absolute inset-0 flex flex-col">
                <div className="flex-1 bg-[#003399]"></div>
                <div className="flex-1 bg-[#FFCC00]"></div>
              </div>
            </div>
            <button className="bg-white text-[#003580] px-4 py-1.5 rounded-sm font-bold text-xs hover:bg-gray-100 transition-all">
              Sign in
            </button>
          </div>
        </div>
      </nav>

      {/* Global Search Header */}
      <div className="bg-[#003580] pb-16 pt-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-[#febb02] p-1 rounded-sm flex flex-col md:flex-row shadow-xl">
            <div className="flex-1 bg-white p-3 rounded-sm m-0.5 flex items-center space-x-3 border-2 border-transparent focus-within:border-orange-400">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Where are you going?"
                className="w-full font-bold outline-none text-sm"
                defaultValue="Paris, France"
              />
            </div>
            <div className="md:w-64 bg-white p-3 rounded-sm m-0.5 flex items-center space-x-3 border-2 border-transparent">
              <Calendar className="w-5 h-5 text-gray-400" />
              <span className="font-bold text-xs">Tue 24 Mar — Tue 31 Mar</span>
            </div>
            <div className="md:w-64 bg-white p-3 rounded-sm m-0.5 flex items-center space-x-3 border-2 border-transparent">
              <Users className="w-5 h-5 text-gray-400" />
              <span className="font-bold text-xs">
                2 adults · 0 children · 1 room
              </span>
            </div>
            <button className="bg-[#006ce4] text-white px-10 py-3 m-0.5 rounded-sm font-bold text-lg hover:bg-[#005bb8] transition-all">
              Search
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 mt-8 flex gap-6">
        {/* Filters Sidebar - Deconstructed from ebooking */}
        <aside className="hidden lg:block w-64 space-y-4">
          <div className="bg-white p-4 border border-gray-200 rounded-sm">
            <h3 className="font-bold text-sm mb-4">Filter by:</h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs font-bold mb-2">
                  Your budget (per night)
                </p>
                {[
                  "฿0 – ฿1,700",
                  "฿1,700 – ฿3,500",
                  "฿3,500 – ฿5,200",
                  "฿5,200+",
                ].map((p, i) => (
                  <label
                    key={i}
                    className="flex items-center space-x-2 text-xs mb-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded-sm border-gray-300"
                    />
                    <span>{p}</span>
                  </label>
                ))}
              </div>
              <div className="pt-4 border-t border-gray-100">
                <p className="text-xs font-bold mb-2">Star rating</p>
                {[5, 4, 3].map((s) => (
                  <label
                    key={s}
                    className="flex items-center space-x-2 text-xs mb-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded-sm border-gray-300"
                    />
                    <span className="flex items-center">
                      {s} stars{" "}
                      <Star className="w-3 h-3 ml-1 fill-yellow-400 text-yellow-400" />
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Results List */}
        <div className="flex-1 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold italic">
              Paris: 1,420 properties found
            </h2>
            <button className="flex items-center space-x-2 border border-blue-600 text-blue-600 px-4 py-2 rounded-full text-xs font-bold hover:bg-blue-50 transition-all">
              <ArrowUpDown className="w-4 h-4" />
              <span>Sort by: Top reviewed</span>
            </button>
          </div>

          {[
            {
              name: "Hôtel de Crillon",
              area: "8th arr., Paris",
              price: "32,400",
              score: "9.6",
              reviews: "2,410",
              img: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&q=80&w=800",
            },
            {
              name: "Pullman Paris Tour Eiffel",
              area: "15th arr., Paris",
              price: "14,200",
              score: "8.9",
              reviews: "8,120",
              img: "https://images.unsplash.com/photo-1549463591-24c1882ba398?auto=format&fit=crop&q=80&w=800",
            },
          ].map((hotel, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-sm overflow-hidden flex flex-col md:flex-row group hover:border-orange-300 transition-all shadow-sm"
            >
              <div className="relative w-full md:w-72 h-64 md:h-auto overflow-hidden">
                <Image
                  src={hotel.img}
                  alt={hotel.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />

                <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur rounded-full text-gray-400 hover:text-red-500 transition-all shadow-md">
                  <Heart className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 p-4 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-[#006ce4] hover:text-[#003580] cursor-pointer tracking-tight">
                        {hotel.name}
                      </h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              className="w-3 h-3 fill-[#febb02] text-[#febb02]"
                            />
                          ))}
                        </div>
                        <span className="text-[10px] bg-[#febb02] px-1 rounded-sm font-bold uppercase">
                          Palace
                        </span>
                      </div>
                      <div className="flex items-center text-xs text-blue-600 font-bold mt-2 underline cursor-pointer">
                        <MapPin className="w-3 h-3 mr-1" /> {hotel.area}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <div className="text-right leading-none">
                          <p className="text-sm font-bold">Exceptional</p>
                          <p className="text-[10px] text-gray-500">
                            {hotel.reviews} reviews
                          </p>
                        </div>
                        <div className="w-8 h-8 bg-[#003580] text-white rounded-sm flex items-center justify-center font-bold text-sm">
                          {hotel.score}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 border-l-2 border-gray-100 pl-4 space-y-1">
                    <p className="text-xs font-bold text-gray-900">
                      King Room with Eiffel Tower View
                    </p>
                    <p className="text-xs text-gray-500">
                      1 extra-large double bed
                    </p>
                    <p className="text-xs text-green-600 font-bold flex items-center">
                      <Check className="w-3 h-3 mr-1" /> Free cancellation
                    </p>
                    <p className="text-xs text-green-600 flex items-center">
                      <Check className="w-3 h-3 mr-1" /> No prepayment needed –
                      pay at the property
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex justify-between items-end">
                  <div className="space-y-1">
                    <p className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded-sm inline-block font-bold">
                      Vifily Protected
                    </p>
                    <p className="text-xs text-gray-500 italic">
                      Limited-time deal
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-gray-500">
                      7 nights, 2 adults
                    </p>
                    <p className="text-2xl font-bold leading-none">
                      ฿{hotel.price}
                    </p>
                    <p className="text-[10px] text-gray-500 mb-3 italic">
                      +฿2,400 taxes and charges
                    </p>
                    <button className="bg-[#006ce4] text-white px-6 py-2 rounded-sm font-bold text-sm hover:bg-[#005bb8] transition-all flex items-center">
                      See availability <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
