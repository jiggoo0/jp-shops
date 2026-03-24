"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Calendar,
  Users,
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
    // Simulate API Call
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
    <div className="min-h-screen bg-gray-50/50 font-sans text-gray-900 pb-24">
      {/* Global Navigation - European Business Standard */}
      <nav className="bg-[#003580] text-white p-4 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-black tracking-tighter uppercase flex items-center"
          >
            VIFILY<span className="text-blue-400">HOTELS</span>
            <span className="ml-2 bg-blue-500 text-[8px] px-2 py-0.5 rounded uppercase tracking-widest">
              EU Standard
            </span>
          </Link>
          <div className="hidden md:flex items-center space-x-8 text-[10px] font-black uppercase tracking-widest">
            <Link href="#" className="hover:text-blue-300 transition-colors">
              Destinations
            </Link>
            <Link href="#" className="hover:text-blue-300 transition-colors">
              Business Rewards
            </Link>
            <Link href="#" className="hover:text-blue-300 transition-colors">
              Verified Stays
            </Link>
          </div>
          <div className="flex items-center space-x-6">
            <Share2 className="w-5 h-5 cursor-pointer hover:text-blue-300 transition-colors" />
            <div className="flex items-center space-x-2 bg-white/10 px-3 py-1.5 rounded-full border border-white/10 cursor-pointer">
              <Globe className="w-3.5 h-3.5" />
              <span className="text-[10px] font-black uppercase tracking-widest">
                EN-GB
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Search Block - Global Conversion Pattern */}
      <div className="bg-[#003580] pb-24 pt-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-400/5 blur-[120px] rounded-full"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <h1 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tighter">
              Discover Parisian Elegance
            </h1>
            <p className="text-blue-100/60 font-bold uppercase tracking-widest text-xs">
              Experience 5-star luxury at the heart of Champs-Élysées
            </p>
          </motion.div>

          <div className="bg-[#febb02] p-1.5 rounded-2xl flex flex-col md:flex-row shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)]">
            <div className="flex-1 bg-white p-5 rounded-xl m-1 flex items-center space-x-4 border border-transparent focus-within:border-blue-500 transition-all">
              <Search className="w-6 h-6 text-gray-400" />
              <input
                type="text"
                placeholder="Where are you going?"
                className="w-full font-bold outline-none text-gray-900 text-lg"
                defaultValue="Hôtel de Crillon, Champs-Élysées, Paris"
              />
            </div>
            <div className="md:w-64 bg-white p-5 rounded-xl m-1 flex items-center space-x-4 border border-transparent">
              <Calendar className="w-6 h-6 text-gray-400" />
              <div>
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
                  Check-in — Check-out
                </p>
                <span className="font-bold text-sm whitespace-nowrap">
                  24 Apr — 01 May
                </span>
              </div>
            </div>
            <div className="md:w-64 bg-white p-5 rounded-xl m-1 flex items-center space-x-4">
              <Users className="w-6 h-6 text-gray-400" />
              <div>
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
                  Occupancy
                </p>
                <span className="font-bold text-sm whitespace-nowrap">
                  2 adults · 1 room
                </span>
              </div>
            </div>
            <button className="bg-[#006ce4] text-white px-12 py-5 m-1 rounded-xl font-black text-xl hover:bg-[#005bb8] transition-all transform hover:scale-[1.02] active:scale-[0.98]">
              Search
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 -mt-12 relative z-20">
        {/* Breadcrumbs - EU Standard Navigation */}
        <div className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-white/70 mb-8 drop-shadow-sm">
          <span>Europe</span> <ChevronRight className="w-3 h-3" />
          <span>France</span> <ChevronRight className="w-3 h-3" />
          <span>Paris Hotels</span> <ChevronRight className="w-3 h-3" />
          <span className="text-white border-b border-white/30">
            Grand Palais Luxury & Spa
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-10">
            {/* Professional Gallery Widget */}
            <div className="bg-white p-5 rounded-[3rem] shadow-2xl shadow-blue-900/5 border border-white overflow-hidden">
              <div className="grid grid-cols-4 grid-rows-2 gap-4 h-[550px]">
                <div className="col-span-3 row-span-2 relative rounded-[2rem] overflow-hidden group">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={mainImage}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
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

                  <div className="absolute top-8 left-8 bg-white/95 backdrop-blur-xl px-5 py-2.5 rounded-full flex items-center space-x-3 shadow-2xl">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                      <ShieldCheck className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-900">
                      Vifily Verified Business
                    </span>
                  </div>

                  <div className="absolute top-8 right-8">
                    <button
                      onClick={() => setIsLiked(!isLiked)}
                      className={`p-4 backdrop-blur-md rounded-full transition-all border ${isLiked ? "bg-white text-red-500 border-white" : "bg-white/20 text-white border-white/20 hover:bg-white hover:text-red-500"}`}
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
                    className={`relative rounded-[1.5rem] overflow-hidden cursor-pointer transition-all duration-300 border-4 ${mainImage === i ? "border-blue-500 scale-95" : "border-transparent opacity-70 hover:opacity-100"}`}
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

            {/* Property Overview */}
            <div className="bg-white p-14 rounded-[3.5rem] shadow-sm border border-gray-100">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-12">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-[#febb02] fill-[#febb02]"
                      />
                    ))}
                    <span className="ml-4 px-3 py-1 bg-blue-50 text-[#003580] text-[9px] font-black uppercase tracking-widest rounded-md border border-blue-100">
                      Palace Distinction
                    </span>
                  </div>
                  <h2 className="text-4xl font-black text-gray-900 tracking-tighter uppercase leading-none">
                    Grand Palais Luxury & Spa
                  </h2>
                  <div className="flex items-center text-sm font-bold text-blue-600">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span className="underline decoration-blue-200 underline-offset-4">
                      8th Arrondissement, Champs-Élysées, 75008 Paris, France
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-4 bg-gray-50 p-6 rounded-[2rem] border border-gray-100">
                  <div className="text-right">
                    <p className="text-lg font-black text-gray-900 leading-none">
                      Superb
                    </p>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">
                      4,120 Verified Reviews
                    </p>
                  </div>
                  <div className="w-16 h-16 bg-[#003580] text-white rounded-2xl flex items-center justify-center font-black text-2xl shadow-xl shadow-blue-900/20">
                    9.6
                  </div>
                </div>
              </div>

              {/* High-End Amenities Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                {amenities.map((item, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center justify-center p-8 bg-gray-50/50 rounded-[2.5rem] border border-gray-100 hover:bg-white hover:shadow-2xl hover:border-blue-100 transition-all duration-700 group"
                  >
                    <div className="text-blue-600 mb-4 group-hover:scale-110 transition-transform duration-500">
                      {item.icon}
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 text-center">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Professional Description */}
              <div className="prose prose-blue max-w-none mb-16">
                <h3 className="text-xl font-black uppercase tracking-tight text-gray-900 mb-6">
                  Experience Ultimate Parisian Luxury
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed font-medium">
                  Grand Palais Luxury & Spa is an icon of French hospitality,
                  situated in the prestigious 8th arrondissement. Our property
                  seamlessly blends 18th-century architecture with contemporary
                  European design, offering guests a refined sanctuary in the
                  heart of the City of Light.
                </p>
                <p className="text-gray-600 text-lg leading-relaxed font-medium mt-6">
                  Indulge in culinary excellence at our Michelin-starred
                  restaurant, led by world-renowned chefs, or rejuvenate at the
                  holistic Vifily Spa, featuring an indoor pool bathed in
                  natural light. Every detail, from the Egyptian cotton linens
                  to the dedicated butler service, is curated to ensure a
                  flawless stay for our global partners.
                </p>
              </div>

              {/* Room Selection Table - Real Business Logic */}
              <div className="space-y-6">
                <h3 className="text-xl font-black uppercase tracking-tight text-gray-900 mb-8 flex items-center">
                  <Info className="w-6 h-6 mr-3 text-blue-600" /> Available
                  Accommodations
                </h3>
                <div className="space-y-4">
                  {roomTypes.map((room, i) => (
                    <div
                      key={i}
                      className="p-8 border border-gray-100 rounded-[2rem] hover:shadow-xl transition-all flex flex-col md:flex-row justify-between items-center gap-8 group"
                    >
                      <div className="space-y-3 flex-1">
                        <h4 className="text-lg font-black text-blue-600 uppercase tracking-tight group-hover:text-blue-700 transition-colors">
                          {room.name}
                        </h4>
                        <div className="flex flex-wrap gap-3">
                          {room.features.map((f, j) => (
                            <span
                              key={j}
                              className="text-[9px] font-black uppercase tracking-widest px-3 py-1 bg-gray-100 text-gray-500 rounded-full flex items-center"
                            >
                              <Check className="w-3 h-3 mr-1.5 text-green-500" />{" "}
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="text-right flex flex-col items-end">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                          Price per night
                        </p>
                        <p className="text-3xl font-black text-gray-900 tracking-tighter mb-4">
                          ฿{room.price.toLocaleString()}
                        </p>
                        <button className="px-8 py-3 bg-blue-50 text-blue-600 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-blue-600 hover:text-white transition-all">
                          Select Room
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Booking Card */}
          <div className="lg:col-span-4 relative">
            <div className="sticky top-32 space-y-8">
              <div className="bg-white rounded-[3.5rem] shadow-[0_60px_100px_-25px_rgba(0,53,128,0.12)] border border-gray-100 overflow-hidden">
                <div className="p-12 bg-gray-950 text-white relative">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/10 blur-2xl rounded-full"></div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-4">
                    Verified Best Rate
                  </p>
                  <div className="flex items-baseline space-x-3">
                    <span className="text-5xl font-black tracking-tighter italic">
                      ฿14,200
                    </span>
                    <span className="text-sm font-bold text-gray-600 line-through">
                      ฿22,500
                    </span>
                  </div>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-3">
                    All Taxes & Fees Included
                  </p>
                </div>

                <div className="p-12 space-y-10">
                  <div className="space-y-5">
                    <div className="p-5 border border-gray-100 rounded-2xl flex items-center justify-between bg-gray-50/50 hover:bg-white hover:shadow-lg transition-all cursor-pointer">
                      <div>
                        <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">
                          Arriving
                        </p>
                        <p className="text-sm font-black text-gray-900 uppercase">
                          24 Apr 2026
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-300" />
                      <div className="text-right">
                        <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">
                          Departing
                        </p>
                        <p className="text-sm font-black text-gray-900 uppercase">
                          01 May 2026
                        </p>
                      </div>
                    </div>
                    <div className="p-5 border border-gray-100 rounded-2xl flex items-center justify-between bg-gray-50/50 hover:bg-white hover:shadow-lg transition-all cursor-pointer">
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                        Total Guests
                      </p>
                      <p className="text-sm font-black text-gray-900 uppercase">
                        2 Adults · 1 Room
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleBooking}
                    disabled={isBooking}
                    className="w-full h-20 bg-[#006ce4] text-white rounded-[1.5rem] font-black uppercase tracking-widest text-sm hover:bg-[#005bb8] transition-all shadow-[0_20px_40px_-10px_rgba(0,108,228,0.4)] active:scale-[0.98] disabled:bg-gray-400 flex items-center justify-center"
                  >
                    {isBooking ? (
                      <div className="flex items-center space-x-3">
                        <div className="w-5 h-5 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Processing...</span>
                      </div>
                    ) : (
                      "Reserve Selection"
                    )}
                  </button>

                  <div className="flex items-center justify-center space-x-3 text-[10px] font-black uppercase tracking-widest text-green-600 bg-green-50 py-3 rounded-full">
                    <Check className="w-4 h-4" />
                    <span>Free Cancellation until Apr 20</span>
                  </div>

                  <div className="pt-10 border-t border-gray-50 space-y-4">
                    <div className="flex justify-between items-center text-xs font-bold text-gray-600">
                      <span>฿14,200 x 7 nights</span>
                      <span>฿99,400</span>
                    </div>
                    <div className="flex justify-between items-center text-xl font-black pt-6 border-t border-dashed border-gray-200">
                      <span className="uppercase tracking-tighter">
                        Total Price
                      </span>
                      <span className="text-[#003580]">฿99,400</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Professional Trust Signal */}
              <div className="p-8 bg-white rounded-[2.5rem] border border-gray-100 flex items-center space-x-6 shadow-sm">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center">
                  <ShieldCheck className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 mb-1">
                    Vifily Protected
                  </p>
                  <p className="text-xs font-black text-gray-900 uppercase tracking-tighter">
                    100% Secure Payment Path
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Property Policies - Crucial for Business Reality */}
      <section className="max-w-7xl mx-auto px-6 mt-20">
        <div className="bg-white p-14 rounded-[3.5rem] shadow-sm border border-gray-100">
          <h3 className="text-2xl font-black uppercase tracking-tight text-gray-900 mb-12">
            Property Policies & Fine Print
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="space-y-4">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-gray-400">
                Check-In/Out
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-bold border-b border-gray-50 pb-2">
                  <span>Check-in from</span>
                  <span>15:00</span>
                </div>
                <div className="flex justify-between text-sm font-bold">
                  <span>Check-out until</span>
                  <span>12:00</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-gray-400">
                Children & Beds
              </p>
              <p className="text-sm font-medium text-gray-600 leading-relaxed">
                Children of any age are welcome. Cots and extra beds are
                available upon request and subject to availability.
              </p>
            </div>
            <div className="space-y-4">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-gray-400">
                Payment Methods
              </p>
              <div className="flex flex-wrap gap-4 grayscale opacity-40">
                <div className="w-12 h-8 bg-gray-200 rounded"></div>
                <div className="w-12 h-8 bg-gray-200 rounded"></div>
                <div className="w-12 h-8 bg-gray-200 rounded"></div>
                <div className="w-12 h-8 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Success Modal Overlay */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-gray-950/80 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white rounded-[3rem] max-w-lg w-full p-12 relative overflow-hidden text-center shadow-2xl"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-green-500"></div>
              <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
                <Check className="w-10 h-10" />
              </div>
              <h2 className="text-3xl font-black uppercase tracking-tighter mb-4 text-gray-900">
                Booking Confirmed
              </h2>
              <p className="text-gray-500 font-medium mb-8">
                Your stay at{" "}
                <strong className="text-gray-900">
                  Grand Palais Luxury & Spa
                </strong>{" "}
                is fully secured. An email confirmation has been sent.
              </p>

              <div className="bg-gray-50 p-6 rounded-2xl mb-8 text-left border border-gray-100">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">
                  Confirmation Number
                </p>
                <p className="text-xl font-mono font-black text-gray-900 mb-4">
                  BKG-2026-001
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-4 h-4 text-blue-600" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">
                      Vifily Protected
                    </span>
                  </div>
                  <span className="text-sm font-black text-gray-900">
                    ฿14,200
                  </span>
                </div>
              </div>

              <button
                onClick={() => setShowSuccess(false)}
                className="w-full py-4 bg-gray-900 text-white rounded-xl font-black uppercase tracking-widest text-xs hover:bg-green-600 transition-all"
              >
                View My Itinerary
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
