"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Plane,
  Calendar,
  Users,
  ShieldCheck,
  Globe,
  Clock,
  ArrowRightLeft,
  ArrowRight,
  MapPin,
  Check,
  Award,
  Menu,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function FlightsPage() {
  const [isBooking, setIsBooking] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const flights = [
    {
      id: "VF-102",
      from: "CDG",
      fromCity: "Paris",
      to: "FRA",
      toCity: "Frankfurt",
      departure: "08:15",
      arrival: "09:30",
      duration: "1h 15m",
      price: 8400,
    },
    {
      id: "VF-205",
      from: "CDG",
      fromCity: "Paris",
      to: "LHR",
      toCity: "London",
      departure: "10:45",
      arrival: "11:00",
      duration: "1h 15m",
      price: 12500,
    },
    {
      id: "VF-309",
      from: "CDG",
      fromCity: "Paris",
      to: "ZRH",
      toCity: "Zurich",
      departure: "14:20",
      arrival: "15:35",
      duration: "1h 15m",
      price: 9800,
    },
  ];

  const handleBooking = () => {
    setIsBooking(true);
    setTimeout(() => {
      setIsBooking(false);
      setShowSuccess(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#F3F5F8] font-sans text-gray-900 pb-0">
      {/* ✈️ Airline Standalone Navbar - Lufthansa/Air France Inspired */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-[60] shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-12">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-[#00205B] rounded-full flex items-center justify-center text-white rotate-45 group-hover:rotate-[225deg] transition-all duration-700">
                <Plane className="w-6 h-6 fill-current" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-[#00205B] uppercase">
                VIFILY<span className="text-blue-500 italic">AIR</span>
              </span>
            </Link>
            <div className="hidden lg:flex items-center space-x-8 text-[10px] font-black uppercase tracking-widest text-gray-500">
              <Link
                href="#"
                className="text-blue-600 border-b-2 border-blue-600 pb-1"
              >
                Book & Manage
              </Link>
              <Link href="#" className="hover:text-blue-600 transition-colors">
                Prepare for travel
              </Link>
              <Link href="#" className="hover:text-blue-600 transition-colors">
                Vifily Miles
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-gray-400">
              <Globe className="w-4 h-4" />
              <span>EN | EUR</span>
            </div>
            <button className="flex items-center space-x-2 bg-gray-100 px-5 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest text-gray-700 hover:bg-gray-200 transition-all">
              <Users className="w-4 h-4" />
              <span>Login</span>
            </button>
            <Menu className="lg:hidden w-6 h-6 text-gray-900" />
          </div>
        </div>
      </nav>

      {/* Hero Flight Search - Clean & Functional */}
      <div className="bg-[#00205B] text-white pt-16 pb-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
          <div className="w-full h-full bg-gradient-to-l from-blue-400 to-transparent"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl md:text-6xl font-black tracking-tighter mb-12 uppercase italic"
          >
            European Excellence <br />
            <span className="text-blue-400 not-italic">Awaits You.</span>
          </motion.h1>

          <div className="bg-white p-2 rounded-2xl shadow-2xl flex flex-col space-y-2">
            {/* Trip Type Toggle */}
            <div className="flex space-x-4 p-4 border-b border-gray-100">
              <button className="text-[10px] font-black uppercase tracking-widest text-blue-600 flex items-center">
                <ArrowRightLeft className="w-3.5 h-3.5 mr-2" /> Round Trip
              </button>
              <button className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-blue-600 transition-colors">
                One Way
              </button>
              <button className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-blue-600 transition-colors">
                Multi-city
              </button>
            </div>

            {/* Main Search Bar */}
            <div className="flex flex-col lg:flex-row gap-2">
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="bg-gray-50 p-5 rounded-xl flex items-center space-x-4 border border-transparent focus-within:border-blue-500 focus-within:bg-white transition-all">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">
                      From
                    </p>
                    <input
                      type="text"
                      defaultValue="Paris (CDG)"
                      className="w-full font-black text-gray-900 bg-transparent outline-none uppercase"
                    />
                  </div>
                </div>
                <div className="bg-gray-50 p-5 rounded-xl flex items-center space-x-4 border border-transparent focus-within:border-blue-500 focus-within:bg-white transition-all">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">
                      To
                    </p>
                    <input
                      type="text"
                      placeholder="Where to?"
                      className="w-full font-black text-gray-900 bg-transparent outline-none uppercase"
                    />
                  </div>
                </div>
              </div>

              <div className="lg:w-96 bg-gray-50 p-5 rounded-xl flex items-center space-x-4 border border-transparent focus-within:border-blue-500 focus-within:bg-white transition-all">
                <Calendar className="w-6 h-6 text-gray-400" />
                <div className="flex-1 text-left">
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">
                    Departure — Return
                  </p>
                  <span className="font-black text-sm text-gray-900">
                    24 Apr — 01 May 2026
                  </span>
                </div>
              </div>

              <button className="bg-[#E5004F] text-white px-12 py-6 rounded-xl font-black uppercase tracking-[0.2em] text-sm hover:bg-[#C40042] transition-all shadow-xl active:scale-95">
                Search Flights
              </button>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 -mt-16 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Flight List Column */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between mb-8 bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-white shadow-sm">
              <h2 className="text-xl font-black uppercase tracking-tight text-[#00205B]">
                Available Departures
              </h2>
              <div className="flex items-center space-x-4">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Sort by: Best Price
                </span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
            </div>

            {flights.map((flight) => (
              <motion.div
                key={flight.id}
                whileHover={{ y: -5 }}
                className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-xl shadow-blue-900/5 group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ShieldCheck className="w-6 h-6 text-blue-500" />
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                  {/* Airline & Flight Info */}
                  <div className="flex items-center space-x-8">
                    <div className="w-16 h-16 bg-[#00205B] rounded-2xl flex items-center justify-center text-white rotate-45 shadow-xl">
                      <Plane className="w-8 h-8" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] mb-1">
                        Vifily Air • {flight.id}
                      </p>
                      <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                        Direct Flight
                      </p>
                    </div>
                  </div>

                  {/* Flight Timeline */}
                  <div className="flex-1 flex items-center justify-between max-w-sm w-full">
                    <div className="text-center">
                      <p className="text-3xl font-black text-gray-900 tracking-tighter leading-none">
                        {flight.departure}
                      </p>
                      <p className="text-xs font-black text-gray-400 uppercase mt-2">
                        {flight.from}
                      </p>
                    </div>

                    <div className="flex-1 flex flex-col items-center px-10 relative">
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-3">
                        {flight.duration}
                      </p>
                      <div className="w-full h-[2px] bg-gray-100 relative">
                        <div className="absolute -top-[10px] left-1/2 -translate-x-1/2 w-5 h-5 bg-white border-2 border-blue-500 rounded-full flex items-center justify-center">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                        </div>
                      </div>
                    </div>

                    <div className="text-center">
                      <p className="text-3xl font-black text-gray-900 tracking-tighter leading-none">
                        {flight.arrival}
                      </p>
                      <p className="text-xs font-black text-gray-400 uppercase mt-2">
                        {flight.to}
                      </p>
                    </div>
                  </div>

                  {/* Pricing Action */}
                  <div className="text-center md:text-right">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 italic">
                      From (Net)
                    </p>
                    <p className="text-3xl font-black text-[#00205B] tracking-tighter mb-4 italic">
                      ฿{flight.price.toLocaleString()}
                    </p>
                    <button
                      onClick={handleBooking}
                      disabled={isBooking}
                      className="px-10 py-3 bg-[#00205B] text-white rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-blue-600 transition-all shadow-xl"
                    >
                      {isBooking ? "..." : "Select"}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Column: Global Business Trust */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-[#00205B] rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 transition-transform duration-1000 group-hover:scale-150"></div>
              <Award className="w-12 h-12 text-blue-400 mb-8" />
              <h3 className="text-2xl font-black uppercase tracking-tighter mb-6">
                Platinum Executive Protocol
              </h3>
              <ul className="space-y-6">
                {[
                  "Complimentary Lounge Access",
                  "Fast-track EU Immigration",
                  "Priority Document Verification",
                  "Flexible Global Rescheduling",
                ].map((text, i) => (
                  <li
                    key={i}
                    className="flex items-center space-x-4 text-xs font-black uppercase tracking-widest text-blue-100"
                  >
                    <Check className="w-4 h-4 text-blue-400" />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full mt-12 py-5 bg-white text-[#00205B] rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-blue-50 transition-all shadow-2xl">
                Upgrade My Membership
              </button>
            </div>

            <div className="bg-white rounded-[3rem] p-10 border border-gray-100 shadow-xl shadow-blue-900/5">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-black text-gray-900 uppercase tracking-tight leading-none">
                    Global Concierge
                  </p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                    Available 24/7
                  </p>
                </div>
              </div>
              <p className="text-gray-500 text-xs font-medium leading-relaxed italic mb-8">
                &quot;Our dedicated team of professionals ensures your
                international travel documentation is 100% compliant with
                European standards.&quot;
              </p>

              <div className="flex items-center space-x-3 text-xs font-black uppercase tracking-widest text-blue-600 cursor-pointer group">
                <span>Contact Expert</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ✈️ Airline Standalone Footer */}
      <footer className="bg-white border-t border-gray-200 mt-32 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20 text-left">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-8">
                <div className="w-8 h-8 bg-[#00205B] rounded-full flex items-center justify-center text-white rotate-45">
                  <Plane className="w-5 h-5 fill-current" />
                </div>
                <span className="text-2xl font-black tracking-tighter text-[#00205B] uppercase">
                  VIFILY<span className="text-blue-500 italic">AIR</span>
                </span>
              </div>
              <p className="text-gray-400 max-w-sm leading-relaxed font-medium text-sm">
                Setting the highest standard for international aviation and
                document security. Vifily Air connects the world with European
                precision.
              </p>
            </div>
            <div>
              <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#00205B] mb-8">
                Travel Services
              </h5>
              <ul className="space-y-4 text-xs font-bold text-gray-500 uppercase tracking-widest">
                <li className="hover:text-blue-600 cursor-pointer transition-colors">
                  Flight Status
                </li>
                <li className="hover:text-blue-600 cursor-pointer transition-colors">
                  Seat Selection
                </li>
                <li className="hover:text-blue-600 cursor-pointer transition-colors">
                  Corporate Travel
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#00205B] mb-8">
                Support & Legal
              </h5>
              <ul className="space-y-4 text-xs font-bold text-gray-500 uppercase tracking-widest">
                <li className="hover:text-blue-600 cursor-pointer transition-colors">
                  Help Center
                </li>
                <li className="hover:text-blue-600 cursor-pointer transition-colors">
                  Privacy Policy
                </li>
                <li className="hover:text-blue-600 cursor-pointer transition-colors">
                  Carriage Terms
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
              © 2026 VIFILY AIRLINES GROUP • MEMBER OF GLOBAL TRUST ALLIANCE
            </p>
            <div className="flex items-center space-x-10 grayscale opacity-20">
              <ShieldCheck className="w-10 h-10" />
              <Award className="w-10 h-10" />
              <Globe className="w-10 h-10" />
            </div>
          </div>
        </div>
      </footer>

      {/* Flight Success Modal Overlay - E-Ticket Look */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#00205B]/95 backdrop-blur-xl flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, rotateX: 20 }}
              animate={{ scale: 1, rotateX: 0 }}
              className="bg-white rounded-[3rem] max-w-2xl w-full relative overflow-hidden shadow-2xl"
            >
              {/* Ticket Top Part */}
              <div className="bg-[#00205B] p-12 text-white relative">
                <div className="absolute top-0 right-0 p-12 opacity-10">
                  <Plane className="w-32 h-32 rotate-45" />
                </div>
                <div className="flex justify-between items-center mb-12">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] border border-blue-400/30 px-4 py-1.5 rounded-full">
                    Official Boarding Pass
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-[9px] font-black uppercase tracking-widest">
                      Ticket Verified
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-5xl font-black tracking-tighter">PAR</p>
                    <p className="text-xs font-bold text-blue-300 uppercase tracking-widest">
                      Paris Charles de Gaulle
                    </p>
                  </div>
                  <div className="flex-1 flex flex-col items-center px-10 pb-2">
                    <Plane className="w-6 h-6 text-blue-400 mb-4" />
                    <div className="w-full h-[1px] bg-blue-400/30"></div>
                  </div>
                  <div className="text-right">
                    <p className="text-5xl font-black tracking-tighter">FRA</p>
                    <p className="text-xs font-bold text-blue-300 uppercase tracking-widest">
                      Frankfurt International
                    </p>
                  </div>
                </div>
              </div>

              {/* Ticket Middle Part (Perforated Effect) */}
              <div className="relative h-8 flex items-center">
                <div className="absolute left-0 -translate-x-1/2 w-8 h-8 bg-[#00205B] rounded-full"></div>
                <div className="absolute right-0 translate-x-1/2 w-8 h-8 bg-[#00205B] rounded-full"></div>
                <div className="w-full border-t-2 border-dashed border-gray-100"></div>
              </div>

              {/* Ticket Bottom Part */}
              <div className="p-12 space-y-10">
                <div className="grid grid-cols-3 gap-8">
                  <div>
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">
                      Flight
                    </p>
                    <p className="text-lg font-black text-gray-900 uppercase">
                      VF-102
                    </p>
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">
                      Boarding
                    </p>
                    <p className="text-lg font-black text-gray-900 uppercase">
                      07:45
                    </p>
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">
                      Class
                    </p>
                    <p className="text-lg font-black text-blue-600 uppercase">
                      Platinum
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
                      Passenger Identifier
                    </p>
                    <p className="text-sm font-mono font-bold text-gray-900">
                      VIF-2026-X99-PAS
                    </p>
                  </div>
                  <div className="w-16 h-16 bg-white p-2 rounded-xl shadow-inner flex items-center justify-center">
                    <div className="w-full h-full border-2 border-gray-900 border-dashed rounded-lg opacity-20"></div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setShowSuccess(false)}
                    className="flex-1 py-5 bg-[#00205B] text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-blue-600 transition-all shadow-2xl shadow-blue-900/20"
                  >
                    Download E-Ticket
                  </button>
                  <button
                    onClick={() => setShowSuccess(false)}
                    className="px-10 py-5 bg-gray-100 text-gray-900 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-gray-200 transition-all"
                  >
                    Done
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
