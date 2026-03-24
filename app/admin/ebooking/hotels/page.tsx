"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Calendar,
  Star,
  ShieldCheck,
  MapPin,
  ChevronRight,
  Heart,
  Share2,
  Info,
  Check,
  Globe,
  HelpCircle,
  Map as MapIcon,
  CreditCard,
  BadgeCheck,
  User,
  CheckCircle2,
  CheckSquare,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function BookingPage() {
  const [mainImage, setMainImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const roomTypes = [
    {
      name: "Superior King Room",
      price: 14200,
      features: ["1 Extra-large double bed", "32 m²", "City view"],
      available: 2,
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
      available: 1,
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
      available: 1,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FB] font-sans text-gray-900 pb-20 md:pb-0 relative">
      {/* 🚀 International Standard Navbar */}
      <nav className="bg-[#003580] text-white p-5 sticky top-0 z-[60] shadow-2xl border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-10">
            <Link
              href="/"
              className="text-2xl font-black tracking-tighter uppercase flex items-center group"
            >
              <span className="bg-white text-[#003580] px-2 py-0.5 rounded mr-1 group-hover:bg-blue-400 transition-colors">
                V
              </span>
              <span>IFILY</span>
              <span className="text-blue-400">HOTELS</span>
            </Link>
            <div className="hidden lg:flex items-center space-x-8 text-[10px] font-black uppercase tracking-widest text-white/50 border-l border-white/10 pl-10">
              <span className="flex items-center hover:text-white transition-colors cursor-pointer">
                <HelpCircle className="w-3.5 h-3.5 mr-2" /> Global Concierge
              </span>
              <span className="flex items-center hover:text-white transition-colors cursor-pointer">
                <ShieldCheck className="w-3.5 h-3.5 mr-2" /> Security Protocol
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="hidden sm:flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full border border-white/10 cursor-pointer hover:bg-white/20 transition-all">
              <Globe className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">
                EN | EUR
              </span>
            </div>
            <button className="bg-[#006ce4] text-white px-6 py-2.5 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-white hover:text-[#006ce4] transition-all shadow-xl">
              Sign In
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section with Search Integration */}
      <div className="bg-[#003580] pb-32 pt-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-400/10 blur-[150px] rounded-full"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-14 text-center md:text-left"
          >
            <div className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-xl px-4 py-2 rounded-full mb-8 border border-white/10 shadow-2xl">
              <BadgeCheck className="w-4 h-4 text-blue-400" />
              <span className="text-[9px] font-black text-white uppercase tracking-[0.3em]">
                Vifily Verified Luxury Property
              </span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter leading-none italic">
              Grand Palais <br /> Luxury & Spa
            </h1>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-blue-100/60 font-black uppercase tracking-widest text-[10px]">
              <span className="flex items-center">
                <MapPin className="w-3.5 h-3.5 mr-2" /> 8th Arr., Paris
              </span>
              <span className="flex items-center">
                <Star className="w-3.5 h-3.5 mr-2 fill-yellow-500 text-yellow-500" />{" "}
                5-Star Hotel
              </span>
              <span className="flex items-center text-blue-400">
                <ShieldCheck className="w-3.5 h-3.5 mr-2" /> Officially
                Certified
              </span>
            </div>
          </motion.div>

          {/* Search Bar (Booking Style) */}
          <div className="bg-[#febb02] p-2 rounded-3xl flex flex-col lg:flex-row shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]">
            <div className="flex-[2] bg-white p-6 rounded-2xl m-1 flex items-center space-x-4 border border-transparent hover:border-blue-400 transition-all cursor-pointer">
              <Search className="w-6 h-6 text-gray-400" />
              <div className="text-left">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
                  Destination
                </p>
                <input
                  type="text"
                  className="w-full font-black outline-none text-gray-900 text-lg"
                  defaultValue="Champs-Élysées, Paris"
                />
              </div>
            </div>
            <div className="flex-1 bg-white p-6 rounded-2xl m-1 flex items-center space-x-4 border border-transparent hover:border-blue-400 transition-all cursor-pointer">
              <Calendar className="w-6 h-6 text-gray-400" />
              <div className="text-left">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
                  Check-in — Out
                </p>
                <span className="font-black text-sm whitespace-nowrap">
                  24 Apr — 01 May 2026
                </span>
              </div>
            </div>
            <div className="flex-1 bg-white p-6 rounded-2xl m-1 flex items-center space-x-4 border border-transparent hover:border-blue-400 transition-all cursor-pointer">
              <User className="w-6 h-6 text-gray-400" />
              <div className="text-left">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
                  Occupancy
                </p>
                <span className="font-black text-sm whitespace-nowrap">
                  2 Adults · 1 Room
                </span>
              </div>
            </div>
            <button className="bg-[#006ce4] text-white px-16 py-6 m-1 rounded-2xl font-black text-xl hover:bg-[#005bb8] transition-all transform hover:scale-[1.02] shadow-2xl">
              Search
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 -mt-16 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-12">
            {/* Gallery Section */}
            <div className="bg-white p-4 md:p-6 rounded-[3rem] md:rounded-[4rem] shadow-2xl shadow-blue-900/10 border border-white">
              <div className="grid grid-cols-4 grid-rows-2 gap-4 md:gap-6 h-[400px] md:h-[650px]">
                <div className="col-span-4 md:col-span-3 row-span-1 md:row-span-2 relative rounded-[2rem] md:rounded-[3rem] overflow-hidden group">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={mainImage}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8 }}
                      className="w-full h-full relative"
                    >
                      <Image
                        src={images[mainImage]}
                        alt="Palace Interior"
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                    </motion.div>
                  </AnimatePresence>

                  <div className="absolute top-8 left-8 bg-gray-950/80 backdrop-blur-xl px-6 py-3 rounded-full flex items-center space-x-3 shadow-2xl border border-white/10">
                    <ShieldCheck className="w-5 h-5 text-green-400" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">
                      Vifily Secure Link
                    </span>
                  </div>

                  <div className="absolute bottom-8 right-8 flex space-x-4">
                    <button className="p-4 bg-white/20 backdrop-blur-md rounded-2xl text-white border border-white/20 hover:bg-white hover:text-blue-600 transition-all shadow-2xl">
                      <Share2 className="w-6 h-6" />
                    </button>
                    <button
                      onClick={() => setIsLiked(!isLiked)}
                      className={`p-4 backdrop-blur-md rounded-2xl transition-all border shadow-2xl ${isLiked ? "bg-white text-red-500 border-white" : "bg-white/20 text-white border-white/20 hover:bg-white hover:text-red-500"}`}
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
                    className={`relative rounded-[1.5rem] md:rounded-[2rem] overflow-hidden cursor-pointer transition-all duration-500 hidden md:block ${mainImage === i ? "ring-8 ring-blue-600/20 scale-95 shadow-2xl" : "opacity-60 hover:opacity-100"}`}
                  >
                    <Image
                      src={img}
                      alt={`Preview ${i}`}
                      fill
                      className="object-cover"
                    />
                    {mainImage === i && (
                      <div className="absolute inset-0 bg-blue-600/10 flex items-center justify-center">
                        <Check className="text-white w-10 h-10" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Property Content */}
            <div className="bg-white p-10 md:p-20 rounded-[4rem] shadow-sm border border-gray-50 text-left">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-12 mb-20">
                <div className="space-y-6">
                  <div className="flex items-center space-x-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-[#febb02] fill-[#febb02]"
                      />
                    ))}
                    <span className="ml-4 px-4 py-1 bg-blue-50 text-[#003580] text-[9px] font-black uppercase tracking-widest rounded-full border border-blue-100">
                      Top Choice Paris
                    </span>
                  </div>
                  <h2 className="text-5xl md:text-7xl font-black text-gray-950 tracking-tighter uppercase leading-none italic">
                    The Grand Sanctuary
                  </h2>
                  <div className="flex items-center text-sm font-bold text-blue-600">
                    <MapPin className="w-5 h-5 mr-3 text-red-500" />
                    <span className="underline decoration-blue-100 underline-offset-8">
                      8th Arr., Champs-Élysées, 75008 Paris, France
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-6 bg-blue-50/50 p-8 rounded-[3rem] border border-blue-100/50">
                  <div className="text-right">
                    <p className="text-2xl font-black text-[#003580] leading-none uppercase tracking-tighter">
                      Superb
                    </p>
                    <p className="text-[10px] text-blue-400 font-black uppercase tracking-widest mt-2">
                      4.1k Reviews
                    </p>
                  </div>
                  <div className="w-20 h-20 bg-[#003580] text-white rounded-[1.5rem] flex items-center justify-center font-black text-3xl shadow-xl">
                    9.6
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-24">
                <h3 className="text-2xl font-black uppercase tracking-tight text-gray-900 mb-8 border-l-8 border-blue-600 pl-8 italic">
                  The Essence of Hospitality
                </h3>
                <p className="text-gray-600 text-2xl leading-relaxed font-medium">
                  Experience Parisian elegance at its finest. Our property, a
                  masterpiece of 18th-century architecture, offers an
                  unparalleled sanctuary with Michelin-starred dining and
                  world-class spa facilities.
                </p>
              </div>

              {/* Map Section Prototype */}
              <div className="mb-24 space-y-8">
                <h3 className="text-2xl font-black uppercase tracking-tight text-gray-900 flex items-center">
                  <MapIcon className="w-8 h-8 mr-4 text-red-500" /> Strategic
                  Location
                </h3>
                <div className="h-96 w-full bg-gray-100 rounded-[3rem] relative overflow-hidden group border-8 border-white shadow-xl">
                  {/* Stylized Map Mockup */}
                  <div className="absolute inset-0 bg-[#E5E3DF]">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="relative">
                        <div className="w-20 h-20 bg-blue-600/20 rounded-full animate-ping absolute -top-5 -left-5"></div>
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-2xl relative z-10 border-4 border-white">
                          <ShieldCheck className="w-6 h-6" />
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-gray-400 rounded-full"></div>
                    <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-gray-400 rounded-full"></div>
                    <div className="absolute top-1/2 right-1/3 w-32 h-1 bg-white/50 rotate-45"></div>
                  </div>
                  <div className="absolute bottom-8 left-8 bg-white p-6 rounded-2xl shadow-2xl border border-gray-100 max-w-xs transition-transform group-hover:-translate-y-2">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                      Walking Distance
                    </p>
                    <p className="text-sm font-black text-gray-900">
                      2 mins to Eiffel Tower Express Path
                    </p>
                  </div>
                </div>
              </div>

              {/* Room Selection Grid */}
              <div className="space-y-10">
                <h3 className="text-2xl font-black uppercase tracking-tight text-gray-900 flex items-center">
                  <CheckSquare className="w-8 h-8 mr-4 text-green-500" />{" "}
                  Premium Accommodation
                </h3>
                <div className="space-y-6">
                  {roomTypes.map((room, i) => (
                    <div
                      key={i}
                      className="p-10 border border-gray-100 rounded-[3rem] hover:shadow-2xl hover:border-blue-100 transition-all flex flex-col md:flex-row justify-between items-center gap-10 group bg-gray-50/20 hover:bg-white"
                    >
                      <div className="space-y-4 flex-1 text-left">
                        <h4 className="text-3xl font-black text-gray-950 uppercase tracking-tighter italic">
                          {room.name}
                        </h4>
                        <div className="flex flex-wrap gap-3">
                          {room.features.map((f, j) => (
                            <span
                              key={j}
                              className="text-[9px] font-black uppercase tracking-widest px-4 py-2 bg-white text-gray-500 rounded-full flex items-center shadow-sm border border-gray-50"
                            >
                              <Check className="w-3.5 h-3.5 mr-2 text-green-500" />{" "}
                              {f}
                            </span>
                          ))}
                        </div>
                        <p className="text-[9px] font-black text-red-500 uppercase tracking-widest flex items-center">
                          <Info className="w-3.5 h-3.5 mr-1.5" /> Only{" "}
                          {room.available} rooms left at this price
                        </p>
                      </div>
                      <div className="text-right flex flex-col items-end min-w-[200px]">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                          Starting from
                        </p>
                        <p className="text-5xl font-black text-[#003580] tracking-tighter mb-8">
                          ฿{room.price.toLocaleString()}
                        </p>
                        <button
                          onClick={handleBooking}
                          className="w-full py-5 bg-[#003580] text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#006ce4] transition-all shadow-xl active:scale-95"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar: Booking Calculator */}
          <div className="lg:col-span-4 relative hidden lg:block">
            <div className="sticky top-32 space-y-8">
              <div className="bg-white rounded-[4rem] shadow-[0_100px_150px_-50px_rgba(0,53,128,0.2)] border border-white overflow-hidden">
                <div className="p-14 bg-gray-950 text-white relative">
                  <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12">
                    <BadgeCheck className="w-24 h-24" />
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400 mb-6 relative z-10">
                    Best Price Guarantee
                  </p>
                  <div className="flex items-baseline space-x-4 relative z-10">
                    <span className="text-7xl font-black tracking-tighter italic">
                      ฿14,200
                    </span>
                  </div>
                </div>

                <div className="p-14 space-y-12">
                  <div className="bg-gray-50 p-8 rounded-[2rem] border border-gray-100 flex flex-col space-y-8">
                    <div className="flex justify-between items-center pb-8 border-b border-gray-200">
                      <div>
                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">
                          Check-in
                        </p>
                        <p className="text-sm font-black text-gray-900">
                          Fri, 24 Apr 2026
                        </p>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-300">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                      <div className="text-right">
                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">
                          Check-out
                        </p>
                        <p className="text-sm font-black text-gray-900">
                          Fri, 01 May 2026
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">
                        Selected Occupancy
                      </p>
                      <p className="text-sm font-black text-gray-900 flex items-center">
                        <User className="w-4 h-4 mr-2 text-blue-600" /> 2 Adults
                        · 1 King Room
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleBooking}
                    disabled={isBooking}
                    className="w-full h-24 bg-[#006ce4] text-white rounded-[2rem] font-black uppercase tracking-widest text-lg hover:bg-[#003580] transition-all shadow-2xl disabled:bg-gray-400 flex items-center justify-center group"
                  >
                    {isBooking ? (
                      <div className="flex items-center space-x-4">
                        <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Processing...</span>
                      </div>
                    ) : (
                      <span className="group-hover:scale-105 transition-transform">
                        Complete Secure Booking
                      </span>
                    )}
                  </button>

                  <div className="pt-10 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">
                      Net Estimated Total
                    </span>
                    <span className="text-4xl font-black tracking-tighter text-[#003580] italic">
                      ฿99,400
                    </span>
                  </div>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="p-10 bg-white rounded-[3rem] border-2 border-green-500 shadow-xl flex items-center space-x-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-all">
                  <ShieldCheck className="w-20 h-20 text-green-600" />
                </div>
                <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center relative z-10 shadow-inner">
                  <ShieldCheck className="w-10 h-10 text-green-600" />
                </div>
                <div className="text-left relative z-10">
                  <p className="text-[10px] font-black uppercase tracking-widest text-green-600 mb-1">
                    Verified Security
                  </p>
                  <p className="text-xs font-black text-gray-900 uppercase tracking-tighter leading-tight">
                    ISO/IEC Certified <br />
                    Payment Protocol
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 📱 Mobile Sticky Booking Bar */}
      <AnimatePresence>
        {isScrolled && !showSuccess && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 p-6 z-50 md:hidden flex items-center justify-between shadow-[0_-20px_50px_rgba(0,0,0,0.1)]"
          >
            <div>
              <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">
                Starting from
              </p>
              <p className="text-2xl font-black text-[#003580] tracking-tighter leading-none italic">
                ฿14,200
              </p>
            </div>
            <button
              onClick={handleBooking}
              className="px-10 py-4 bg-[#006ce4] text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl active:scale-95"
            >
              Book Now
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Footer */}
      <footer className="bg-gray-950 text-white mt-32 py-32 px-6 border-t border-white/5 relative overflow-hidden">
        <div className="absolute bottom-0 right-0 opacity-5 w-1/2 h-full bg-blue-500 blur-[200px] rounded-full"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-left">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-32">
            <div className="col-span-2 space-y-10">
              <h4 className="text-4xl font-black uppercase tracking-tighter group cursor-pointer">
                VIFILY
                <span className="text-blue-500 group-hover:text-blue-400 transition-colors">
                  HOTELS
                </span>
              </h4>
              <p className="text-gray-500 max-w-md leading-relaxed font-medium text-lg italic">
                Setting the global standard for verified luxury accommodations.
                Every stay is 100% authentic and secured under our proprietary
                trust protocol.
              </p>
              <div className="flex space-x-6">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all cursor-pointer">
                  <Globe className="w-5 h-5 text-blue-400" />
                </div>
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all cursor-pointer">
                  <CreditCard className="w-5 h-5 text-blue-400" />
                </div>
              </div>
            </div>
            <div className="space-y-10">
              <h5 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500">
                Corporate Protocol
              </h5>
              <ul className="space-y-6 text-xs font-black text-gray-500 uppercase tracking-[0.2em]">
                <li className="hover:text-white cursor-pointer transition-colors">
                  Partner Dashboard
                </li>
                <li className="hover:text-white cursor-pointer transition-colors">
                  Business Ethics
                </li>
                <li className="hover:text-white cursor-pointer transition-colors">
                  Verification API
                </li>
              </ul>
            </div>
            <div className="space-y-10">
              <h5 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500">
                Trust Center
              </h5>
              <ul className="space-y-6 text-xs font-black text-gray-500 uppercase tracking-[0.2em]">
                <li className="hover:text-white cursor-pointer transition-colors">
                  Privacy Shield
                </li>
                <li className="hover:text-white cursor-pointer transition-colors">
                  Verified Reviews
                </li>
                <li className="hover:text-white cursor-pointer transition-colors">
                  Booking Terms
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
            <p className="text-[9px] font-black uppercase tracking-[0.5em] text-gray-700">
              © 2026 VIFILY HOTELS GROUP • POWERED BY JP VISUAL DOCS
              INTELLIGENCE
            </p>
            <div className="flex items-center space-x-10 grayscale opacity-20">
              <div className="flex items-center space-x-3">
                <Star className="w-4 h-4" />
                <span className="text-[8px] font-black uppercase tracking-widest">
                  Global 500
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-[8px] font-black uppercase tracking-widest">
                  ISO 9001
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Success Animation Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-gray-950/95 backdrop-blur-2xl flex items-center justify-center p-6 text-left"
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white rounded-[4rem] max-w-2xl w-full p-16 relative overflow-hidden shadow-2xl border-t-[12px] border-green-500"
            >
              <div className="w-32 h-32 bg-green-50 text-green-500 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-inner">
                <Check className="w-16 h-16" />
              </div>
              <h2 className="text-5xl font-black uppercase tracking-tighter mb-6 text-gray-900 leading-none text-center">
                Reservation <br />
                Fully Secured
              </h2>
              <p className="text-gray-500 text-xl font-medium mb-12 text-center">
                Your luxury experience in Paris has been registered under the
                Vifily International Protocol.
              </p>

              <div className="bg-gray-50 p-10 rounded-[3rem] mb-12 border border-gray-100 shadow-inner">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">
                      Confirmation Registry Ref
                    </p>
                    <p className="text-3xl font-mono font-black text-gray-950 tracking-tighter">
                      VF-BKG-2026-0424
                    </p>
                  </div>
                  <div className="bg-[#003580] text-white p-4 rounded-3xl shadow-2xl rotate-3">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                </div>
                <div className="pt-8 border-t border-gray-200">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">
                    <span>Verified Payment Status</span>
                    <span className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 mr-2" /> Authorized
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <button
                  onClick={() => setShowSuccess(false)}
                  className="h-20 bg-gray-50 text-gray-400 rounded-3xl font-black uppercase tracking-widest text-xs hover:text-gray-900 transition-all"
                >
                  Close Window
                </button>
                <button className="h-20 bg-gray-900 text-white rounded-3xl font-black uppercase tracking-widest text-xs hover:bg-[#006ce4] transition-all shadow-2xl flex items-center justify-center space-x-3">
                  <span>Download PDF</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
