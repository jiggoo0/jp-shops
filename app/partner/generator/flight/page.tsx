"use client";

import { useState, useEffect } from "react";
import { KLMTemplate, FlightSegment } from "@/components/tickets/KLMTemplate";
import { ANATemplate } from "@/components/tickets/ANATemplate";
import { EtihadTemplate } from "@/components/tickets/EtihadTemplate";
import { Button } from "@/components/ui";
import {
  ShieldCheck,
  Plane,
  FileText,
  Lock,
  ChevronLeft,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

type Airline = "KLM" | "ANA" | "ETIHAD";

export default function FlightTicketGenerator() {
  const supabase = createClient();
  const [airline, setAirline] = useState<Airline>("KLM");
  const [isPartner, setIsPartner] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  const [formData, setFormData] = useState({
    passengerName: "DOE/JOHN MR",
    pnr: "ABC123XYZ",
    eTicket: "074-1234567890",
    issueDate: new Date()
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
      .toUpperCase(),
  });

  const [flightData, setFlightData] = useState<FlightSegment>({
    flightNumber: "KL 876",
    departure: "BANGKOK (BKK)",
    departureTime: "12:15",
    arrival: "AMSTERDAM (AMS)",
    arrivalTime: "18:30",
    date: "15 DEC 2026",
    cabinClass: "ECONOMY (V)",
    seat: "24A",
  });

  useEffect(() => {
    const checkPartnerStatus = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from("users")
          .select("subscription_status, subscription_end_date")
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

  const handleOpenCheckout = () => {
    const event = new CustomEvent("open-checkout", {
      detail: {
        serviceId: "flight_ticket",
        serviceData: {
          airline,
          ...formData,
          flightNumber: flightData.flightNumber,
          departure: flightData.departure,
          departureTime: flightData.departureTime,
          arrival: flightData.arrival,
          arrivalTime: flightData.arrivalTime,
          date: flightData.date,
          cabinClass: flightData.cabinClass,
          seat: flightData.seat,
          issueDate: formData.issueDate,
        },
      },
    });
    window.dispatchEvent(event);
  };

  const handlePartnerGenerate = async () => {
    setIsGenerating(true);
    // Simulate generation & saving to DB (This would call a server action in real use)
    setTimeout(() => {
      setIsGenerating(false);
      setGenerated(true);
    }, 2000);
  };

  const renderTemplate = () => {
    const props = {
      ...formData,
      flights: [flightData],
      isPreview: !generated, // Remove watermark if generated
    };

    switch (airline) {
      case "KLM":
        return <KLMTemplate {...props} />;
      case "ANA":
        return <ANATemplate {...props} />;
      case "ETIHAD":
        return <EtihadTemplate {...props} />;
      default:
        return <KLMTemplate {...props} />;
    }
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
                <Plane className="w-5 h-5 mr-3 text-blue-600" />
                Ticket Data Form
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">
                    Select Airline
                  </label>
                  <select
                    value={airline}
                    onChange={(e) => setAirline(e.target.value as Airline)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="KLM">KLM Royal Dutch (Europe)</option>
                    <option value="ANA">ANA All Nippon (Asia)</option>
                    <option value="ETIHAD">Etihad Airways (Middle East)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">
                    Passenger Name
                  </label>
                  <input
                    type="text"
                    value={formData.passengerName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        passengerName: e.target.value.toUpperCase(),
                      })
                    }
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm font-bold uppercase focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">
                      Booking Ref (PNR)
                    </label>
                    <input
                      type="text"
                      value={formData.pnr}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          pnr: e.target.value.toUpperCase(),
                        })
                      }
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">
                      e-Ticket Number
                    </label>
                    <input
                      type="text"
                      value={formData.eTicket}
                      onChange={(e) =>
                        setFormData({ ...formData, eTicket: e.target.value })
                      }
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <h3 className="text-sm font-bold mb-4 uppercase tracking-wider text-gray-700">
                    Flight Segment 1
                  </h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">
                          Flight Number
                        </label>
                        <input
                          type="text"
                          value={flightData.flightNumber}
                          onChange={(e) =>
                            setFlightData({
                              ...flightData,
                              flightNumber: e.target.value.toUpperCase(),
                            })
                          }
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">
                          Date
                        </label>
                        <input
                          type="text"
                          value={flightData.date}
                          onChange={(e) =>
                            setFlightData({
                              ...flightData,
                              date: e.target.value.toUpperCase(),
                            })
                          }
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                      </div>
                    </div>
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
                {isPartner ? "Partner Authorization" : "Unlock Full Ticket"}
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed mb-6 font-semibold">
                {isPartner
                  ? "ระบบพาร์ทเนอร์ได้รับการยืนยันแล้ว คุณสามารถสร้างตั๋วเครื่องบินฉบับเต็มและบันทึกลงคลังเอกสารของคุณได้ทันทีโดยไม่มีค่าใช้จ่ายเพิ่มเติม"
                  : "Preview mode displays 70% of the ticket layout with watermarks. Complete payment to generate the high-resolution PDF."}
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
                  <span>Pay ฿500 to Unlock</span>
                </Button>
              )}
            </div>
          </div>

          {/* Preview Panel */}
          <div className="lg:col-span-8 bg-gray-300 p-4 md:p-8 rounded-[2.5rem] flex items-center justify-center overflow-hidden relative shadow-inner min-h-[600px]">
            <div className="absolute top-6 left-6 flex items-center space-x-2 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full text-white z-10">
              <FileText className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">
                {generated ? "Official Document" : "Live Preview (70%)"}
              </span>
            </div>

            <div className="w-full max-w-3xl scale-90 md:scale-100 transform origin-top transition-all shadow-2xl relative">
              {renderTemplate()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
