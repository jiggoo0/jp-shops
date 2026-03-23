"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Zap, AlertCircle, ChevronRight } from "lucide-react";
import Link from "next/link";

interface SubscriptionBoosterProps {
  status: "active" | "inactive" | "pending";
  planName?: string;
  expiryDate?: string;
  variant?: "floating" | "card";
}

export function SubscriptionBooster({
  status,
  planName = "No Active Plan",
  expiryDate,
  variant = "card",
}: SubscriptionBoosterProps) {
  const isActive = status === "active";

  if (variant === "floating") {
    return (
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="fixed bottom-24 right-6 z-40 hidden md:block"
      >
        <Link href="/partner/pricing">
          <div className="bg-white/80 backdrop-blur-2xl border border-gray-100 p-4 rounded-[2rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] flex items-center space-x-4 hover:scale-105 transition-all cursor-pointer group">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isActive ? "bg-green-500 text-white shadow-lg shadow-green-500/20" : "bg-red-500 text-white shadow-lg shadow-red-500/20"}`}
            >
              {isActive ? (
                <ShieldCheck className="w-6 h-6" />
              ) : (
                <Zap className="w-6 h-6" />
              )}
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                Account Status
              </p>
              <p className="text-xs font-black text-gray-900 uppercase tracking-tight">
                {isActive ? planName : "Upgrade Required"}
              </p>
            </div>
            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-gray-900 group-hover:text-white transition-colors">
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <div className="relative overflow-hidden bg-gray-900 rounded-[2.5rem] p-8 shadow-2xl group border border-gray-800">
      {/* Decorative Background */}
      <div
        className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] -mr-32 -mt-32 transition-colors duration-1000 ${isActive ? "bg-green-500/20 group-hover:bg-green-500/30" : "bg-red-500/20 group-hover:bg-red-500/30"}`}
      ></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/5 rounded-full blur-[40px] -ml-16 -mb-16"></div>

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="flex items-center space-x-6">
          <div
            className={`w-20 h-20 rounded-[1.5rem] flex items-center justify-center shadow-2xl ${isActive ? "bg-green-500 text-white shadow-green-500/20" : "bg-red-500 text-white shadow-red-500/20"}`}
          >
            {isActive ? (
              <ShieldCheck className="w-10 h-10" />
            ) : (
              <AlertCircle className="w-10 h-10" />
            )}
          </div>
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span
                className={`w-2 h-2 rounded-full ${isActive ? "bg-green-500 animate-pulse" : "bg-red-500"}`}
              ></span>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
                {isActive ? "System Active" : "System Restricted"}
              </span>
            </div>
            <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-1">
              {isActive ? planName : "Access Denied"}
            </h3>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest italic">
              {isActive
                ? `Expiry Protocol: ${expiryDate}`
                : "Please select a plan to activate AI features"}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {!isActive ? (
            <Link href="/partner/pricing">
              <button className="h-16 px-8 bg-white text-gray-900 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-green-500 hover:text-white transition-all shadow-xl active:scale-95">
                Activate Booster Now
              </button>
            </Link>
          ) : (
            <Link href="/partner/pricing">
              <button className="h-16 px-8 bg-gray-800 text-gray-400 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-gray-700 hover:text-white transition-all border border-gray-700">
                Extend Plan
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
