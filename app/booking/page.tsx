"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Calendar,
  Star,
  ShieldCheck,
  MapPin,
  Wifi,
  ChevronRight,
  Heart,
  Share2,
  Info,
  Check,
  Globe,
  Utensils,
  Wind,
  PhoneCall,
  HelpCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function BookingPage() {
  const [mainImage, setMainImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleBooking = () => {
    setIsBooking(true);
    setTimeout(() => {
      setIsBooking(false);
      setShowSuccess(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 2000);
  };

  const images = [
    "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1549463591-24c1882ba398?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=800",
  ];

  const amenities = [
    { icon: <Wifi className="w-5 h-5" />, label: "Ultra Fast Wi-Fi" },
    { icon: <Utensils className="w-5 h-5" />, label: "Michelin Star Dining" },
    { icon: <Wind className="w-5 h-5" />, label: "Air Conditioning" },
    { icon: <ShieldCheck className="w-5 h-5" />, label: "Vifily Certified" },
  ];

  const roomTypes = [
    {
      name: "Superior King Room",
      price: 14200,
      features: ["1 Extra-large double bed", "32 m²", "City view"],
    },
    {
      name: "Deluxe Suite with Balcony",
      price: 22500,
      features: [
        "1 Living room",
        "1 Separate bedroom",
        "55 m²",
        "Eiffel Tower view",
      ],
    },
    {
      name: "Presidential Royal Suite",
      price: 48900,
      features: [
        "Personal Butler",
        "Private Terrace",
        "120 m²",
        "VIP Airport Transfer",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FB] font-sans text-gray-900 pb-0">
      {/* 🚀 Standalone Booking Navbar - European Executive Standard */}
      <nav className="bg-[#003580] text-white p-5 sticky top-0 z-[60] shadow-2xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link
              href="/"
              className="text-2xl font-black tracking-tighter uppercase flex items-center"
            >
              VIFILY<span className="text-blue-400">HOTELS</span>
            </Link>
            <div className="hidden lg:flex items-center space-x-6 text-[10px] font-black uppercase tracking-widest text-white/60 border-l border-white/10 pl-8">
              <span className="flex items-center">
                <HelpCircle className="w-3.5 h-3.5 mr-2" /> 24/7 Global
                Concierge
              </span>
              <span className="flex items-center">
                <PhoneCall className="w-3.5 h-3.5 mr-2" /> +33 (0) 1 44 05 81 81
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full border border-white/10 cursor-pointer hover:bg-white/20 transition-all">
              <Globe className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">
                EN-GB | EUR
              </span>
            </div>
            <button className="bg-white text-[#003580] px-6 py-2.5 rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-blue-50 transition-all shadow-xl">
              Partner Access
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Search Block */}
      <div className="bg-[#003580] pb-28 pt-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-400/5 blur-[120px] rounded-full"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="inline-flex items-center space-x-3 bg-blue-500/20 backdrop-blur-md px-4 py-1.5 rounded-full mb-6 border border-white/5">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-[9px] font-black text-white uppercase tracking-[0.3em]">
                Verified Premium Residence
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tighter leading-tight">
              Grand Palais Luxury & Spa
            </h1>
            <p className="text-blue-100/60 font-bold uppercase tracking-widest text-xs">
              Exclusive Partner Portal • Secure European Booking Protocol
            </p>
          </motion.div>

          <div className="bg-[#febb02] p-1.5 rounded-3xl flex flex-col md:flex-row shadow-[0_40px_80px_-15px_rgba(0,0,0,0.4)]">
            <div className="flex-1 bg-white p-6 rounded-2xl m-1 flex items-center space-x-4">
              <Search className="w-6 h-6 text-gray-400" />
              <div className="text-left">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
                  Location
                </p>
                <input
                  type="text"
                  className="w-full font-black outline-none text-gray-900 text-lg"
                  defaultValue="Champs-Élysées, Paris"
                />
              </div>
            </div>
            <div className="md:w-72 bg-white p-6 rounded-2xl m-1 flex items-center space-x-4">
              <Calendar className="w-6 h-6 text-gray-400" />
              <div className="text-left">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
                  Timeline
                </p>
                <span className="font-black text-sm whitespace-nowrap">
                  24 Apr — 01 May 2026
                </span>
              </div>
            </div>
            <button className="bg-[#006ce4] text-white px-14 py-6 m-1 rounded-2xl font-black text-xl hover:bg-[#005bb8] transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-2xl">
              Check Availability
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 -mt-16 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-10">
            {/* Gallery Section */}
            <div className="bg-white p-6 rounded-[3.5rem] shadow-2xl shadow-blue-900/5 border border-white overflow-hidden">
              <div className="grid grid-cols-4 grid-rows-2 gap-5 h-[600px]">
                <div className="col-span-3 row-span-2 relative rounded-[2.5rem] overflow-hidden group">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={mainImage}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6 }}
                      className="w-full h-full relative"
                    >
                      <Image
                        src={images[mainImage]}
                        alt="Paris Luxury View"
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                  </AnimatePresence>

                  <div className="absolute top-8 left-8 bg-white/95 backdrop-blur-xl px-6 py-3 rounded-full flex items-center space-x-3 shadow-2xl border border-white/20">
                    <ShieldCheck className="w-5 h-5 text-blue-600" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-900">
                      Vifily Protected Business
                    </span>
                  </div>

                  <div className="absolute top-8 right-8 flex space-x-4">
                    <button className="p-4 bg-white/20 backdrop-blur-md rounded-full text-white border border-white/20 hover:bg-white hover:text-blue-600 transition-all">
                      <Share2 className="w-6 h-6" />
                    </button>
                    <button
                      onClick={() => setIsLiked(!isLiked)}
                      className={`p-4 backdrop-blur-md rounded-full transition-all border ${isLiked ? "bg-white text-red-500 border-white shadow-xl" : "bg-white/20 text-white border-white/20 hover:bg-white hover:text-red-500"}`}
                    >
                      <Heart
                        className={`w-6 h-6 ${isLiked ? "fill-red-500" : ""}`}
                      />
                    </button>
                  </div>
                </div>

                {images.map((img, i) => (
                  <div
                    key={i}
                    onClick={() => setMainImage(i)}
                    className={`relative rounded-[2rem] overflow-hidden cursor-pointer transition-all duration-500 border-[6px] ${mainImage === i ? "border-[#003580] scale-95 shadow-xl" : "border-transparent opacity-60 hover:opacity-100"}`}
                  >
                    <Image
                      src={img}
                      alt={`View ${i}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Content Details */}
            <div className="bg-white p-16 rounded-[4rem] shadow-sm border border-gray-100">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-10 mb-16">
                <div className="space-y-6 text-left">
                  <div className="flex items-center space-x-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-6 h-6 text-[#febb02] fill-[#febb02]"
                      />
                    ))}
                    <span className="ml-4 px-4 py-1.5 bg-blue-50 text-[#003580] text-[10px] font-black uppercase tracking-widest rounded-full border border-blue-100">
                      Palace Distinction
                    </span>
                  </div>
                  <h2 className="text-5xl font-black text-gray-900 tracking-tighter uppercase leading-none italic">
                    The Grand Sanctuary
                  </h2>
                  <div className="flex items-center text-sm font-bold text-blue-600">
                    <MapPin className="w-5 h-5 mr-3" />
                    <span className="underline decoration-blue-200 underline-offset-8">
                      8th Arr., Champs-Élysées, 75008 Paris, France
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-6 bg-gray-50/80 p-8 rounded-[2.5rem] border border-gray-100 shadow-inner">
                  <div className="text-right">
                    <p className="text-xl font-black text-gray-900 leading-none">
                      Superb
                    </p>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-2">
                      4,120 Global Reviews
                    </p>
                  </div>
                  <div className="w-20 h-20 bg-[#003580] text-white rounded-3xl flex items-center justify-center font-black text-3xl shadow-2xl shadow-blue-900/30">
                    9.6
                  </div>
                </div>
              </div>

              {/* Amenities */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                {amenities.map((item, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center justify-center p-10 bg-gray-50/50 rounded-[3rem] border border-gray-100 hover:bg-white hover:shadow-2xl hover:border-blue-100 transition-all duration-700 group"
                  >
                    <div className="text-blue-600 mb-5 group-hover:scale-110 transition-transform duration-500">
                      {item.icon}
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 text-center">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div className="prose prose-blue max-w-none mb-20">
                <h3 className="text-2xl font-black uppercase tracking-tight text-gray-900 mb-8 border-l-8 border-blue-600 pl-8">
                  Redefining Parisian Luxury
                </h3>
                <p className="text-gray-600 text-xl leading-relaxed font-medium">
                  Grand Palais Luxury & Spa is an icon of French hospitality,
                  situated in the prestigious 8th arrondissement. Our property
                  seamlessly blends 18th-century architecture with contemporary
                  European design, offering guests a refined sanctuary in the
                  heart of the City of Light.
                </p>
              </div>

              {/* Room Selection */}
              <div className="space-y-10">
                <h3 className="text-2xl font-black uppercase tracking-tight text-gray-900 flex items-center">
                  <Info className="w-8 h-8 mr-4 text-blue-600" /> Executive
                  Suites
                </h3>
                <div className="space-y-6">
                  {roomTypes.map((room, i) => (
                    <div
                      key={i}
                      className="p-10 border border-gray-100 rounded-[3rem] hover:shadow-2xl transition-all flex flex-col md:flex-row justify-between items-center gap-10 group bg-gray-50/30 hover:bg-white"
                    >
                      <div className="space-y-4 flex-1">
                        <h4 className="text-2xl font-black text-blue-600 uppercase tracking-tight">
                          {room.name}
                        </h4>
                        <div className="flex flex-wrap gap-4">
                          {room.features.map((f, j) => (
                            <span
                              key={j}
                              className="text-[10px] font-black uppercase tracking-widest px-4 py-2 bg-white text-gray-500 rounded-full flex items-center shadow-sm"
                            >
                              <Check className="w-4 h-4 mr-2 text-green-500" />{" "}
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="text-right flex flex-col items-end">
                        <p className="text-4xl font-black text-gray-900 tracking-tighter mb-6">
                          ฿{room.price.toLocaleString()}
                        </p>
                        <button className="px-10 py-4 bg-[#003580] text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-600 transition-all shadow-xl">
                          Reserve Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Floating Booking Card */}
          <div className="lg:col-span-4 relative">
            <div className="sticky top-32 space-y-8">
              <div className="bg-white rounded-[4rem] shadow-[0_80px_120px_-30px_rgba(0,53,128,0.15)] border border-white overflow-hidden">
                <div className="p-14 bg-gray-950 text-white relative">
                  <p className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-4">
                    Secured Rate
                  </p>
                  <div className="flex items-baseline space-x-4">
                    <span className="text-6xl font-black tracking-tighter">
                      ฿14,200
                    </span>
                    <span className="text-sm font-bold text-gray-600 line-through">
                      ฿22,500
                    </span>
                  </div>
                </div>

                <div className="p-14 space-y-10 text-left">
                  <div className="space-y-6">
                    <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100 flex items-center justify-between">
                      <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                          Check-In
                        </p>
                        <p className="text-lg font-black text-gray-900">
                          24 Apr 2026
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-300" />
                      <div className="text-right">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                          Check-Out
                        </p>
                        <p className="text-lg font-black text-gray-900">
                          01 May 2026
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleBooking}
                    disabled={isBooking}
                    className="w-full h-24 bg-[#006ce4] text-white rounded-[2rem] font-black uppercase tracking-widest text-lg hover:bg-[#005bb8] transition-all shadow-2xl disabled:bg-gray-400 flex items-center justify-center"
                  >
                    {isBooking ? (
                      <div className="flex items-center space-x-4">
                        <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Processing...</span>
                      </div>
                    ) : (
                      "Complete Booking"
                    )}
                  </button>

                  <div className="pt-10 border-t border-gray-50 flex justify-between items-center text-xl font-black">
                    <span className="uppercase tracking-tighter text-gray-400">
                      Total
                    </span>
                    <span className="text-3xl text-[#003580]">฿99,400</span>
                  </div>
                </div>
              </div>

              <div className="p-10 bg-white rounded-[3rem] border border-gray-100 flex items-center space-x-6">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center">
                  <ShieldCheck className="w-10 h-10 text-blue-600" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-1">
                    Vifily Secured
                  </p>
                  <p className="text-xs font-black text-gray-900">
                    International Payment Protocol
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 🚀 Standalone Booking Footer */}
      <footer className="bg-gray-950 text-white mt-32 py-24 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div className="col-span-2">
              <h4 className="text-3xl font-black uppercase tracking-tighter mb-8">
                VIFILY<span className="text-blue-500">HOTELS</span>
              </h4>
              <p className="text-gray-500 max-w-sm leading-relaxed font-medium">
                The global standard for verified luxury accommodations. Our
                platform ensures 100% authenticity for every partner stay across
                Europe and beyond.
              </p>
            </div>
            <div>
              <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 mb-8">
                Navigation
              </h5>
              <ul className="space-y-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
                <li className="hover:text-white cursor-pointer transition-colors">
                  Managed Stays
                </li>
                <li className="hover:text-white cursor-pointer transition-colors">
                  Business Protocol
                </li>
                <li className="hover:text-white cursor-pointer transition-colors">
                  Partner Dashboard
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 mb-8">
                Legal
              </h5>
              <ul className="space-y-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
                <li className="hover:text-white cursor-pointer transition-colors">
                  Privacy Policy
                </li>
                <li className="hover:text-white cursor-pointer transition-colors">
                  Booking Terms
                </li>
                <li className="hover:text-white cursor-pointer transition-colors">
                  Cookie Policy
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-600">
              © 2026 VIFILY HOTELS GROUP • ALL RIGHTS RESERVED
            </p>
            <div className="flex space-x-8 grayscale opacity-30">
              <div className="w-12 h-8 bg-gray-800 rounded"></div>
              <div className="w-12 h-8 bg-gray-800 rounded"></div>
              <div className="w-12 h-8 bg-gray-800 rounded"></div>
            </div>
          </div>
        </div>
      </footer>

      {/* Success Modal Overlay */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-gray-950/90 backdrop-blur-md flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white rounded-[4rem] max-w-xl w-full p-16 relative overflow-hidden text-center shadow-2xl border border-white"
            >
              <div className="absolute top-0 left-0 w-full h-3 bg-green-500"></div>
              <div className="w-32 h-32 bg-green-50 text-green-500 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-inner">
                <Check className="w-16 h-16" />
              </div>
              <h2 className="text-4xl font-black uppercase tracking-tighter mb-6 text-gray-900">
                Reservation Confirmed
              </h2>
              <p className="text-gray-500 text-lg font-medium mb-12">
                Your luxury stay in Paris is fully secured under the Vifily
                Protocol.
              </p>

              <div className="bg-gray-50 p-10 rounded-[2.5rem] mb-12 text-left border border-gray-100 shadow-inner">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">
                      Confirmation Number
                    </p>
                    <p className="text-2xl font-mono font-black text-gray-900">
                      BKG-2026-001
                    </p>
                  </div>
                  <div className="bg-[#003580] text-white p-3 rounded-2xl shadow-lg">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                </div>
                <div className="pt-6 border-t border-gray-200">
                  <div className="flex justify-between items-center text-sm font-black uppercase tracking-widest text-blue-600">
                    <span>Verified Total</span>
                    <span>฿99,400</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowSuccess(false)}
                className="w-full h-20 bg-gray-900 text-white rounded-[1.5rem] font-black uppercase tracking-widest text-sm hover:bg-green-600 transition-all shadow-2xl shadow-gray-200"
              >
                Download Itinerary PDF
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
