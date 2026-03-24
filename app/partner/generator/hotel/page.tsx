"use client";

import { useState } from "react";
import { HotelTemplate } from "@/components/tickets/HotelTemplate";
import { Button } from "@/components/ui";
import { ShieldCheck, Building, Lock, Calendar } from "lucide-react";

const PRESET_HOTELS = [
  {
    name: "InterContinental Amstel Amsterdam",
    address:
      "Prof. Sir Raymond Westerlingstraat 1, 1018 RD Amsterdam, Netherlands",
    roomType: "Executive Room - City View",
    price: "€ 1,240.00",
  },
  {
    name: "The Peninsula Tokyo",
    address: "1-8-1 Yurakucho, Chiyoda City, Tokyo 100-0006, Japan",
    roomType: "Deluxe Suite - Imperial View",
    price: "¥ 185,000",
  },
  {
    name: "Emirates Palace Mandarin Oriental",
    address:
      "West Corniche Road, Al Ras Al Akhdar, Abu Dhabi, United Arab Emirates",
    roomType: "Palace Suite - Garden View",
    price: "AED 4,850.00",
  },
];

export default function HotelGenerator() {
  const [selectedPreset, setSelectedPreset] = useState(0);
  const [formData, setFormData] = useState({
    guestName: "DOE/JOHN MR",
    confirmationNo:
      "HTL-" + Math.random().toString(36).substring(2, 10).toUpperCase(),
    checkInDate: "15 DEC 2026",
    checkOutDate: "20 DEC 2026",
  });

  const hotel = PRESET_HOTELS[selectedPreset];

  const handleOpenCheckout = () => {
    const event = new CustomEvent("open-checkout", {
      detail: {
        serviceId: "hotel_booking",
        serviceData: {
          hotelName: hotel.name,
          address: hotel.address,
          roomType: hotel.roomType,
          price: hotel.price,
          ...formData,
        },
      },
    });
    window.dispatchEvent(event);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8">
        {/* Form Panel */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
            <h2 className="text-xl font-black uppercase tracking-tight flex items-center mb-6">
              <Building className="w-5 h-5 mr-3 text-blue-600" />
              Hotel Booking Form
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">
                  Select Hotel Location
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {PRESET_HOTELS.map((h, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedPreset(i)}
                      className={`p-3 text-left rounded-xl border-2 text-xs font-bold transition-all ${
                        selectedPreset === i
                          ? "border-blue-600 bg-blue-50 text-blue-900"
                          : "border-gray-50 bg-gray-50 text-gray-500 hover:border-gray-200"
                      }`}
                    >
                      {h.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">
                  Primary Guest Name
                </label>
                <input
                  type="text"
                  value={formData.guestName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      guestName: e.target.value.toUpperCase(),
                    })
                  }
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm font-bold uppercase focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">
                    Check-in Date
                  </label>
                  <input
                    type="text"
                    value={formData.checkInDate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        checkInDate: e.target.value.toUpperCase(),
                      })
                    }
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">
                    Check-out Date
                  </label>
                  <input
                    type="text"
                    value={formData.checkOutDate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        checkOutDate: e.target.value.toUpperCase(),
                      })
                    }
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <h3 className="text-sm font-bold mb-4 uppercase tracking-wider text-gray-700">
                  Reservation Metadata
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400 font-bold uppercase">
                      Room Type:
                    </span>
                    <span className="text-gray-900 font-black">
                      {hotel.roomType}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400 font-bold uppercase">
                      Price Level:
                    </span>
                    <span className="text-gray-900 font-black">
                      {hotel.price}
                    </span>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl text-[10px] text-gray-500 italic">
                    {hotel.address}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 text-white p-8 rounded-[2rem] shadow-xl">
            <ShieldCheck className="w-8 h-8 text-green-400 mb-4" />
            <h3 className="text-xl font-black uppercase tracking-tight mb-2">
              Finalize Booking
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed mb-6 font-semibold">
              Preview displays a realistic confirmation draft (70%). Upon
              payment, we generate a verified Official Confirmation PDF with a
              live QR code for visa submission.
            </p>
            <Button
              onClick={handleOpenCheckout}
              className="w-full h-14 bg-green-500 text-white font-black uppercase tracking-widest text-xs hover:bg-green-400 rounded-xl shadow-lg shadow-green-500/30 flex items-center justify-center space-x-2"
            >
              <Lock className="w-4 h-4" />
              <span>Confirm & Pay ฿500</span>
            </Button>
          </div>
        </div>

        {/* Preview Panel */}
        <div className="lg:col-span-8 bg-gray-200 p-4 md:p-8 rounded-[2.5rem] flex items-center justify-center overflow-hidden relative shadow-inner">
          <div className="absolute top-6 left-6 flex items-center space-x-2 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full text-white z-10">
            <Calendar className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">
              Official Preview (70%)
            </span>
          </div>

          <div className="w-full max-w-3xl scale-90 md:scale-100 transform origin-top transition-all shadow-2xl relative">
            <HotelTemplate
              hotelName={hotel.name}
              address={hotel.address}
              roomType={hotel.roomType}
              price={hotel.price}
              {...formData}
              isPreview={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
