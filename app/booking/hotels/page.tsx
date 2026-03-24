"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Star,
  MapPin,
  Wifi,
  Coffee,
  ShieldCheck,
  ChevronRight,
  ArrowLeft,
  Search,
} from "lucide-react";
import { Button, Card } from "@/components/ui";

const hotels = [
  {
    id: 1,
    name: "Grand Palais Paris",
    location: "8th Arr., Paris, France",
    price: "฿12,400",
    rating: 4.9,
    reviews: 1240,
    image:
      "https://images.unsplash.com/photo-1502602898657-3e917247a183?q=80&w=800&auto=format&fit=crop",
    tags: ["Luxury", "City Center"],
  },
  {
    id: 2,
    name: "The Ritz London",
    location: "Mayfair, London, UK",
    price: "฿18,900",
    rating: 4.8,
    reviews: 850,
    image:
      "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=800&auto=format&fit=crop",
    tags: ["Iconic", "Royal Service"],
  },
  {
    id: 3,
    name: "Amstel Amsterdam",
    location: "Amsterdam, Netherlands",
    price: "฿9,800",
    rating: 4.7,
    reviews: 2100,
    image:
      "https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?q=80&w=800&auto=format&fit=crop",
    tags: ["Canal View", "Boutique"],
  },
];

export default function PublicHotelPortal() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans pb-24">
      {/* Search Header */}
      <div className="bg-white border-b border-gray-200 pt-32 pb-12 px-6">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/booking"
            className="inline-flex items-center text-xs font-black uppercase tracking-widest text-gray-400 hover:text-gray-900 mb-8 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Hub
          </Link>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-gray-950 tracking-tighter uppercase italic leading-none mb-4">
                European <br />
                <span className="text-blue-600">Hotel Portal.</span>
              </h1>
              <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] flex items-center">
                <ShieldCheck className="w-4 h-4 mr-2 text-blue-600" />
                Verified by UNLINK Global Trust Protocol
              </p>
            </div>

            <div className="flex-grow max-w-xl">
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Search destinations, hotels..."
                  className="w-full h-16 bg-gray-50 border-2 border-gray-100 rounded-2xl px-14 font-bold text-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 outline-none transition-all"
                  defaultValue="Paris, France"
                />
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-sm font-black uppercase tracking-[0.3em] text-gray-400">
            Featured Properties (3)
          </h2>
          <div className="flex items-center space-x-2 text-[10px] font-black uppercase text-gray-900 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">
            <span>Filter: Luxury</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hotels.map((hotel) => (
            <Card
              key={hotel.id}
              className="group overflow-hidden !p-0 border-none shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.2)] transition-all duration-700 rounded-[2.5rem] bg-white cursor-pointer"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={hotel.image}
                  alt={hotel.name}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-xl">
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                    <span className="text-[10px] font-black text-gray-900">
                      {hotel.rating}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  {hotel.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[8px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-2 uppercase tracking-tight leading-none group-hover:text-blue-600 transition-colors">
                  {hotel.name}
                </h3>
                <div className="flex items-center text-gray-400 mb-6">
                  <MapPin className="w-3 h-3 mr-1" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    {hotel.location}
                  </span>
                </div>

                <div className="flex items-center space-x-6 mb-8 py-4 border-y border-gray-50">
                  <div className="flex flex-col">
                    <span className="text-[8px] font-black text-gray-400 uppercase mb-1">
                      Amenities
                    </span>
                    <div className="flex space-x-3 text-gray-900">
                      <Wifi className="w-4 h-4" />
                      <Coffee className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="flex flex-col ml-auto text-right">
                    <span className="text-[8px] font-black text-gray-400 uppercase mb-1">
                      Starts From
                    </span>
                    <span className="text-xl font-black text-blue-600 leading-none">
                      {hotel.price}
                    </span>
                  </div>
                </div>

                <Link href="/partner/generator/hotel">
                  <Button className="w-full h-14 rounded-2xl bg-gray-900 text-white font-black uppercase tracking-widest text-[10px] group-hover:bg-blue-600 transition-all shadow-xl shadow-gray-200 flex items-center justify-center">
                    <span>Book this property</span>
                    <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>

        {/* Info Footer */}
        <div className="mt-24 p-12 bg-white rounded-[3rem] border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center space-x-6">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center border border-blue-100 shadow-inner">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-lg font-black text-gray-900 uppercase tracking-tight">
                Secure Booking Protocol
              </h4>
              <p className="text-gray-500 text-xs font-bold leading-relaxed italic">
                ทุกการจองในระบบจำลองจะถูกบันทึกและตรวจสอบสถานะผ่าน UNLINK Global
                Network <br className="hidden md:block" />
                เพื่อความน่าเชื่อถือสูงสุดในการทำธุรกรรมสากล
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            className="h-16 rounded-2xl px-10 border-gray-200 font-black uppercase tracking-widest text-[10px] hover:border-blue-600 hover:text-blue-600"
          >
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
}
