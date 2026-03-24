import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  ChevronLeft,
  Hotel,
  Plus,
  Calendar,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";

export default async function AdminBookingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // ตรวจสอบสิทธิ์ Admin จากตาราง users
  const { data: profile } = await supabase
    .from("users")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (profile?.role !== "admin") {
    redirect("/");
  }

  // Mock data for display purposes
  const mockupHotels = [
    {
      id: 1,
      name: "Grand Palais Luxury & Spa",
      location: "Paris, France",
      slug: "/booking",
      status: "Active",
      income: "฿142,000",
    },
    {
      id: 2,
      name: "Swiss Alps Resort & Wellness",
      location: "Zermatt, Switzerland",
      slug: "/booking",
      status: "Active",
      income: "฿89,500",
    },
  ];

  const mockupBookings = [
    {
      id: "BKG-2026-001",
      guest: "Mr. Somchai S.",
      hotel: "Grand Palais Luxury & Spa",
      dates: "24 Apr - 01 May",
      status: "Confirmed",
      amount: "฿99,400",
    },
    {
      id: "BKG-2026-002",
      guest: "Ms. Linda W.",
      hotel: "Swiss Alps Resort & Wellness",
      dates: "15 May - 20 May",
      status: "Pending",
      amount: "฿65,000",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/admin/dashboard"
          className="inline-flex items-center text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-white transition-colors mb-8 group"
        >
          <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
          Back to Control Center
        </Link>

        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tighter text-blue-100 mb-2">
              Hotel & Booking Management
            </h1>
            <p className="text-blue-300/50 font-medium text-sm">
              จัดการรายการโรงแรมระดับโลกและการจองทั้งหมดในระบบ
            </p>
          </div>
          <button className="mt-6 md:mt-0 px-6 py-3 bg-blue-600 text-white rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-blue-500 transition-all flex items-center shadow-lg shadow-blue-500/20">
            <Plus className="w-4 h-4 mr-2" />
            Add New Hotel Property
          </button>
        </div>

        {/* Hotels List Section */}
        <div className="mb-16">
          <h2 className="text-xl font-black uppercase tracking-widest mb-6 flex items-center text-gray-300">
            <Hotel className="w-5 h-5 mr-3" /> Managed Properties
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockupHotels.map((hotel) => (
              <div
                key={hotel.id}
                className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700/50 hover:border-blue-500/50 transition-all flex justify-between items-center group"
              >
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-green-400">
                      {hotel.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-white">
                    {hotel.name}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">{hotel.location}</p>
                </div>
                <div className="text-right flex flex-col items-end">
                  <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">
                    Revenue
                  </p>
                  <p className="text-lg font-bold text-blue-400 mb-4">
                    {hotel.income}
                  </p>
                  <Link
                    href={hotel.slug}
                    target="_blank"
                    className="text-[10px] font-black uppercase tracking-widest text-blue-300 hover:text-white flex items-center bg-blue-500/10 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    View Live Page <ArrowUpRight className="w-3 h-3 ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bookings Table Section */}
        <div>
          <h2 className="text-xl font-black uppercase tracking-widest mb-6 flex items-center text-gray-300">
            <Calendar className="w-5 h-5 mr-3" /> Recent Reservations
          </h2>
          <div className="bg-gray-800/30 rounded-3xl border border-gray-700/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-800/50 border-b border-gray-700/50">
                    <th className="p-5 text-[10px] font-black uppercase tracking-widest text-gray-400">
                      Booking ID
                    </th>
                    <th className="p-5 text-[10px] font-black uppercase tracking-widest text-gray-400">
                      Guest Name
                    </th>
                    <th className="p-5 text-[10px] font-black uppercase tracking-widest text-gray-400">
                      Property
                    </th>
                    <th className="p-5 text-[10px] font-black uppercase tracking-widest text-gray-400">
                      Dates
                    </th>
                    <th className="p-5 text-[10px] font-black uppercase tracking-widest text-gray-400">
                      Status
                    </th>
                    <th className="p-5 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700/30">
                  {mockupBookings.map((booking, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-gray-800/40 transition-colors"
                    >
                      <td className="p-5 text-sm font-mono font-bold text-gray-300">
                        {booking.id}
                      </td>
                      <td className="p-5 text-sm font-bold text-white">
                        {booking.guest}
                      </td>
                      <td className="p-5 text-xs text-gray-400">
                        {booking.hotel}
                      </td>
                      <td className="p-5 text-xs text-gray-400">
                        {booking.dates}
                      </td>
                      <td className="p-5">
                        <span
                          className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest flex w-max items-center ${
                            booking.status === "Confirmed"
                              ? "bg-green-500/10 text-green-400 border border-green-500/20"
                              : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                          }`}
                        >
                          {booking.status === "Confirmed" && (
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                          )}
                          {booking.status}
                        </span>
                      </td>
                      <td className="p-5 text-sm font-bold text-blue-400 text-right">
                        {booking.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
