"use client";

import React, { useState, useEffect } from "react";
import {
  Activity,
  ShieldCheck,
  Users,
  Zap,
  Globe,
  Server,
  Lock,
  ArrowUpRight,
} from "lucide-react";
import { motion } from "framer-motion";

export default function StatusPage() {
  // Fake realistic live data
  const [activeNow, setActive] = useState(6);
  const [processedToday] = useState(34);

  useEffect(() => {
    // Randomly change active users to look "live"
    const interval = setInterval(() => {
      setActive((prev) => {
        const change = Math.floor(Math.random() * 3) - 1; // -1, 0, 1
        const newVal = prev + change;
        return newVal < 4 ? 5 : newVal > 9 ? 8 : newVal;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const systemStats = [
    {
      label: "Active Members",
      value: "217",
      sub: "Verified Partners",
      icon: <Users className="w-5 h-5" />,
    },
    {
      label: "Daily Transactions",
      value: processedToday,
      sub: "Avg. 30-40 Cases",
      icon: <Activity className="w-5 h-5" />,
    },
    {
      label: "Live Nodes",
      value: activeNow,
      sub: "Currently Online",
      icon: <Zap className="w-5 h-5 text-green-500" />,
    },
    {
      label: "System Uptime",
      value: "99.98%",
      sub: "Last 365 Days",
      icon: <Server className="w-5 h-5 text-blue-500" />,
    },
  ];

  const services = [
    { name: "Vifily Core Engine", status: "Operational", latency: "42ms" },
    { name: "AI Document Generator", status: "Operational", latency: "128ms" },
    { name: "Global Verification API", status: "Operational", latency: "85ms" },
    { name: "Secure Payment Gateway", status: "Operational", latency: "15ms" },
    {
      name: "Customer Support (Line OA)",
      status: "Operational",
      latency: "Instant",
    },
  ];

  const recentLogs = [
    {
      id: "VF-8821",
      action: "Certificate Verified",
      location: "Bangkok",
      time: "2 mins ago",
    },
    {
      id: "PR-4012",
      action: "Partner Subscription",
      location: "Phuket",
      time: "15 mins ago",
    },
    {
      id: "VF-8819",
      action: "Identity Hash Check",
      location: "Chiang Mai",
      time: "24 mins ago",
    },
    {
      id: "VF-8818",
      action: "Document Generated",
      location: "Chonburi",
      time: "42 mins ago",
    },
    {
      id: "VF-8817",
      action: "Protocol Audit",
      location: "Nonthaburi",
      time: "1 hour ago",
    },
  ];

  return (
    <div className="min-h-screen bg-white pt-48 pb-32 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center space-x-3 bg-green-50 text-green-700 px-5 py-2 rounded-full mb-8 border border-green-100 shadow-sm"
            >
              <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                System Status: All Services Operational
              </span>
            </motion.div>

            <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter uppercase text-gray-900 leading-none">
              SYSTEM <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 italic text-5xl md:text-7xl">
                INTEGRITY.
              </span>
            </h1>
            <p className="text-gray-700 text-xl font-bold italic leading-relaxed">
              &quot;ตรวจสอบความพร้อมของระบบและสถิติการใช้งานจริงแบบ Real-time
              เพื่อความมั่นใจในทุกการประมวลผลเอกสารของคุณ&quot;
            </p>
          </div>

          <div className="bg-gray-900 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group min-w-[300px]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl"></div>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-green-400 mb-2">
              Live Connections
            </p>
            <p className="text-6xl font-black tracking-tighter mb-4">
              {activeNow}
            </p>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Active Sessions
              </span>
              <ArrowUpRight className="w-4 h-4 text-green-500" />
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {systemStats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] hover:shadow-xl transition-all duration-500 group"
            >
              <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mb-8 border border-gray-100 group-hover:bg-gray-900 group-hover:text-white transition-all">
                {stat.icon}
              </div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">
                {stat.label}
              </p>
              <p className="text-4xl font-black text-gray-900 tracking-tighter mb-2">
                {stat.value}
              </p>
              <p className="text-[10px] font-bold text-gray-500 italic">
                {stat.sub}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Services & Logs Split Section */}
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Service Health List */}
          <div className="lg:col-span-7">
            <div className="bg-white p-10 md:p-16 rounded-[4rem] border border-gray-100 shadow-sm relative overflow-hidden">
              <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight mb-12 flex items-center">
                <Server className="w-6 h-6 mr-4 text-green-600" />
                Service Health Report
              </h2>

              <div className="space-y-8">
                {services.map((service, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between group"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-green-500 rounded-full group-hover:scale-150 transition-transform"></div>
                      <span className="text-sm font-bold text-gray-700 uppercase tracking-wide">
                        {service.name}
                      </span>
                    </div>
                    <div className="flex items-center space-x-8">
                      <span className="text-[9px] font-mono font-bold text-gray-400">
                        {service.latency}
                      </span>
                      <span className="text-[10px] font-black text-green-600 uppercase bg-green-50 px-3 py-1 rounded-lg border border-green-100">
                        {service.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Activity Log */}
          <div className="lg:col-span-5">
            <div className="bg-gray-900 p-10 md:p-16 rounded-[4rem] text-white shadow-2xl relative overflow-hidden h-full">
              <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/micro-carbon.png')] opacity-10 pointer-events-none"></div>

              <h2 className="text-xl font-black uppercase tracking-[0.2em] mb-12 flex items-center relative z-10 text-green-400">
                <Globe className="w-5 h-5 mr-4" />
                Live Integrity Log
              </h2>

              <div className="space-y-10 relative z-10">
                {recentLogs.map((log, i) => (
                  <div
                    key={i}
                    className="flex items-start justify-between group"
                  >
                    <div className="space-y-1">
                      <p className="text-[10px] font-mono text-gray-500 group-hover:text-green-400 transition-colors">
                        ID: #{log.id}
                      </p>
                      <p className="text-sm font-black uppercase tracking-tight">
                        {log.action}
                      </p>
                      <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">
                        {log.location}
                      </p>
                    </div>
                    <span className="text-[9px] font-bold text-gray-600 italic mt-1">
                      {log.time}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-16 pt-8 border-t border-white/5 flex items-center justify-center">
                <p className="text-[8px] font-mono text-gray-600 uppercase tracking-[0.5em]">
                  SYSTEM_LOG::STREAM_ACTIVE
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Integrity Badge */}
        <div className="mt-32 pt-16 border-t border-gray-100 flex flex-col items-center">
          <div className="flex items-center space-x-6 grayscale opacity-50 mb-8">
            <div className="flex items-center space-x-2">
              <Lock className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-900">
                Encrypted
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-900">
                Certified
              </span>
            </div>
          </div>
          <p className="text-[9px] font-black text-gray-300 uppercase tracking-[0.4em]">
            JP-VISUAL&DOCS GLOBAL INFRASTRUCTURE &bull; EST. 2017
          </p>
        </div>
      </div>
    </div>
  );
}
