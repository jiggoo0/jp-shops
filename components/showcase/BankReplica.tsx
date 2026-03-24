"use client";

import React from "react";
import {
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownLeft,
  Landmark,
  ShieldCheck,
  Fingerprint,
  Eye,
  EyeOff,
  CreditCard,
  PieChart,
  User,
} from "lucide-react";

export function BankReplica() {
  const [showBalance, setShowBalance] = React.useState(true);

  return (
    <div className="bg-[#f4f7f6] min-h-screen font-sans text-gray-900 flex justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white shadow-2xl rounded-[3rem] overflow-hidden border-8 border-gray-900 relative">
        {/* Status Bar Mock */}
        <div className="bg-gray-900 h-8 flex justify-between items-center px-8 text-white text-[10px] font-bold">
          <span>9:41</span>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-white rounded-full opacity-20"></div>
            <div className="w-4 h-2 bg-white rounded-sm"></div>
          </div>
        </div>

        {/* App Header */}
        <div className="bg-gradient-to-br from-[#004a3d] to-[#006b54] p-8 text-white">
          <div className="flex justify-between items-center mb-10">
            <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center">
              <Landmark className="w-5 h-5" />
            </div>
            <div className="text-center">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">
                Secure Asset Hub
              </p>
              <p className="text-sm font-bold">Vifily Banking Node</p>
            </div>
            <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center">
              <MoreHorizontal className="w-5 h-5" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium opacity-80">
                Total Financial Asset
              </p>
              <button onClick={() => setShowBalance(!showBalance)}>
                {showBalance ? (
                  <Eye className="w-4 h-4 opacity-60" />
                ) : (
                  <EyeOff className="w-4 h-4 opacity-60" />
                )}
              </button>
            </div>
            <p className="text-4xl font-black tracking-tighter">
              {showBalance ? "฿ 12,450,000.00" : "฿ ••••••••"}
            </p>
            <div className="flex items-center space-x-2 pt-2">
              <div className="bg-green-500/20 text-green-400 text-[10px] font-black px-2 py-0.5 rounded-full border border-green-500/30">
                +2.4% TODAY
              </div>
              <p className="text-[10px] opacity-40 uppercase font-black">
                Last Sync: 2 mins ago
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-4 gap-4 p-8 -mt-6">
          {[
            { icon: <ArrowUpRight />, label: "Transfer" },
            { icon: <PieChart />, label: "Invest" },
            { icon: <CreditCard />, label: "Cards" },
            { icon: <Fingerprint />, label: "Identity" },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center space-y-2">
              <div className="w-14 h-14 bg-white shadow-xl rounded-2xl flex items-center justify-center text-[#006b54] hover:bg-[#006b54] hover:text-white transition-all cursor-pointer border border-gray-50">
                {item.icon}
              </div>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Transactions */}
        <div className="px-8 pb-12">
          <div className="flex justify-between items-end mb-6">
            <h3 className="text-sm font-black uppercase tracking-widest text-gray-400">
              Integrity Log
            </h3>
            <span className="text-[10px] font-bold text-[#006b54] uppercase underline cursor-pointer">
              View History
            </span>
          </div>

          <div className="space-y-6">
            {[
              {
                title: "Dividend Yield",
                sub: "Global Equities Node",
                amount: "+ ฿45,000.00",
                type: "in",
              },
              {
                title: "Property Acquisition",
                sub: "BKK Commercial Registry",
                amount: "- ฿8,500,000.00",
                type: "out",
              },
              {
                title: "Consultancy Fee",
                sub: "Identity Farming Project",
                amount: "+ ฿1,200,000.00",
                type: "in",
              },
              {
                title: "System Maintenance",
                sub: "Vifily OS Protocol",
                amount: "- ฿12,000.00",
                type: "out",
              },
            ].map((tx, i) => (
              <div
                key={i}
                className="flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${tx.type === "in" ? "bg-green-50 text-green-600" : "bg-gray-50 text-gray-400"}`}
                  >
                    {tx.type === "in" ? (
                      <ArrowDownLeft className="w-5 h-5" />
                    ) : (
                      <ArrowUpRight className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-tight text-gray-900">
                      {tx.title}
                    </p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase">
                      {tx.sub}
                    </p>
                  </div>
                </div>
                <p
                  className={`text-xs font-black ${tx.type === "in" ? "text-green-600" : "text-gray-900"}`}
                >
                  {tx.amount}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Nav */}
        <div className="border-t border-gray-100 p-6 flex justify-around items-center bg-white">
          <div className="text-[#006b54]">
            <Landmark className="w-6 h-6" />
          </div>
          <div className="text-gray-300">
            <PieChart className="w-6 h-6" />
          </div>
          <div className="text-gray-300">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div className="text-gray-300">
            <User className="w-6 h-6" />
          </div>
        </div>
      </div>
    </div>
  );
}
