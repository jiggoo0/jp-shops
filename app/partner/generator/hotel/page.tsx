"use client";

import { useState, useEffect } from "react";
import { HotelTemplate } from "@/components/tickets/HotelTemplate";
import { Button } from "@/components/ui";
import {
  ShieldCheck,
  Building,
  Lock,
  Calendar,
  ChevronLeft,
  Loader2,
  CheckCircle2,
  FileText,
} from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

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
  const supabase = createClient();
  const [selectedPreset, setSelectedPreset] = useState(0);
  const [isPartner, setIsPartner] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  const [formData, setFormData] = useState({
    guestName: "DOE/JOHN MR",
    confirmationNo:
      "HTL-" + Math.random().toString(36).substring(2, 10).toUpperCase(),
    checkInDate: "15 DEC 2026",
    checkOutDate: "20 DEC 2026",
  });

  useEffect(() => {
    const checkPartnerStatus = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from("users")
          .select("subscription_status")
          .eq("id", user.id)
          .single();

        if (profile?.subscription_status === "active") {
          setIsPartner(true);
        }
      }
      setIsLoading(false);
    };
    checkPartnerStatus();
  }, [supabase]);

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

  const handlePartnerGenerate = async () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setGenerated(true);
    }, 2000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Navigation Header */}
        <div className="flex items-center justify-between mb-12">
          <Link
            href="/partner/dashboard"
            className="group flex items-center space-x-3 text-gray-500 hover:text-gray-900 transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center group-hover:bg-gray-900 group-hover:text-white transition-all shadow-sm">
              <ChevronLeft className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">
              Back to Dashboard
            </span>
          </Link>

          <div className="flex items-center space-x-4 bg-white px-6 py-3 rounded-full border border-gray-200 shadow-sm">
            <div
              className={`w-2 h-2 rounded-full ${isPartner ? "bg-green-500 animate-pulse" : "bg-gray-300"}`}
            ></div>
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-900">
              {isPartner ? "Partner Active Protocol" : "Guest Mode"}
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
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
                      Check-in
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
                      Check-out
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
              </div>
            </div>

            {/* Action Panel */}
            <div className="bg-gray-900 text-white p-8 rounded-[2rem] shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full -mr-16 -mt-16"></div>
              <ShieldCheck
                className={`w-8 h-8 ${isPartner ? "text-green-400" : "text-gray-500"} mb-4`}
              />
              <h3 className="text-xl font-black uppercase tracking-tight mb-2">
                {isPartner ? "Partner Authorization" : "Finalize Booking"}
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed mb-6 font-semibold">
                {isPartner
                  ? "ยืนยันสิทธิ์พาร์ทเนอร์สำเร็จ คุณสามารถสร้างบุ๊กกิ้งโรงแรมฉบับทางการและบันทึกลงคลังเอกสารของคุณได้ทันที"
                  : "Preview displays a realistic confirmation draft (70%). Complete payment to generate a verified Official Confirmation PDF."}
              </p>

              {isPartner ? (
                <Button
                  onClick={handlePartnerGenerate}
                  disabled={isGenerating || generated}
                  className={`w-full h-14 font-black uppercase tracking-widest text-xs rounded-xl shadow-lg flex items-center justify-center space-x-2 transition-all ${
                    generated
                      ? "bg-green-600 text-white"
                      : "bg-white text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  {isGenerating ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : generated ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Saved to Archive</span>
                    </>
                  ) : (
                    <>
                      <FileText className="w-4 h-4" />
                      <span>Generate & Save to Archive</span>
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  onClick={handleOpenCheckout}
                  className="w-full h-14 bg-green-500 text-white font-black uppercase tracking-widest text-xs hover:bg-green-400 rounded-xl shadow-lg shadow-green-500/30 flex items-center justify-center space-x-2"
                >
                  <Lock className="w-4 h-4" />
                  <span>Confirm & Pay ฿500</span>
                </Button>
              )}
            </div>
          </div>

          {/* Preview Panel */}
          <div className="lg:col-span-8 bg-gray-200 p-4 md:p-8 rounded-[2.5rem] flex items-center justify-center overflow-hidden relative shadow-inner min-h-[600px]">
            <div className="absolute top-6 left-6 flex items-center space-x-2 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full text-white z-10">
              <Calendar className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">
                {generated ? "Official Document" : "Official Preview (70%)"}
              </span>
            </div>

            <div className="w-full max-w-3xl scale-90 md:scale-100 transform origin-top transition-all shadow-2xl relative">
              <HotelTemplate
                hotelName={hotel.name}
                address={hotel.address}
                roomType={hotel.roomType}
                price={hotel.price}
                {...formData}
                isPreview={!generated}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
