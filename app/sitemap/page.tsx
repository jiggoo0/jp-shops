"use client";

import React from "react";
import Link from "next/link";
import {
  ChevronRight,
  Map,
  ShieldCheck,
  Briefcase,
  Users,
  Lock,
  Globe,
} from "lucide-react";
import { motion } from "framer-motion";

export default function SitemapPage() {
  const sitemapGroups = [
    {
      title: "บริการหลัก (Core Services)",
      icon: <Briefcase className="w-6 h-6 text-blue-600" />,
      links: [
        { label: "วิเคราะห์โปรไฟล์สินเชื่อ", href: "/#services" },
        { label: "เอกสารสิทธิ์การเดินทางสากล", href: "/#services" },
        { label: "ยื่นวีซ่ามาตรฐานพรีเมียม", href: "/#services" },
        { label: "โซลูชันเอกสารเฉพาะทาง", href: "/#services" },
        { label: "การรับรองสิทธิ์ดิจิทัล Vifily", href: "/#vifily" },
      ],
    },
    {
      title: "ระบบพาร์ทเนอร์ (Partner Ecosystem)",
      icon: <Users className="w-6 h-6 text-green-600" />,
      links: [
        { label: "เข้าสู่ระบบพาร์ทเนอร์ (Login)", href: "/login" },
        { label: "ลงทะเบียนใหม่ (Register)", href: "/register" },
        { label: "แดชบอร์ดจัดการงาน (Dashboard)", href: "/partner/dashboard" },
        { label: "ราคาแพ็กเกจ (Pricing)", href: "/partner/pricing" },
        { label: "ประวัติเอกสาร (Documents)", href: "/partner/documents" },
      ],
    },
    {
      title: "ข้อมูลและความน่าเชื่อถือ (Trust & Info)",
      icon: <ShieldCheck className="w-6 h-6 text-purple-600" />,
      links: [
        { label: "เกี่ยวกับเรา (About Us)", href: "/about" },
        { label: "บทความและเทรนด์ (Blog)", href: "/blog" },
        { label: "นโยบายความเป็นส่วนตัว", href: "/privacy" },
        { label: "ข้อกำหนดการใช้บริการ", href: "/terms" },
        { label: "ติดต่อผู้เชี่ยวชาญ (Contact)", href: "/#contact" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white pt-48 pb-32 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-3 bg-gray-100 px-6 py-2.5 rounded-full mb-8 border border-gray-200"
          >
            <Map className="w-4 h-4 text-gray-900" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-700">
              System Map & Navigation
            </span>
          </motion.div>

          <h1 className="text-6xl md:text-8xl font-black mb-10 tracking-tighter uppercase text-gray-900 leading-none">
            SITEMAP. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 italic">
              ผังเว็บไซต์
            </span>
          </h1>

          <p className="text-gray-700 text-xl md:text-2xl font-bold max-w-2xl mx-auto italic leading-relaxed bg-gray-50 px-8 py-4 rounded-[2rem] border border-gray-100">
            &quot;เข้าถึงทุกเครื่องมือและบริการของ JP-VISUAL&DOCS ได้ในที่เดียว
            รวดเร็ว แม่นยำ และปลอดภัย&quot;
          </p>
        </div>

        {/* Sitemap Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {sitemapGroups.map((group, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] transition-all duration-700 group"
            >
              <div className="flex items-center space-x-5 mb-10 pb-6 border-b border-gray-50">
                <div className="w-14 h-14 bg-gray-900 text-white rounded-2xl flex items-center justify-center shadow-xl group-hover:bg-green-600 transition-colors">
                  {group.icon}
                </div>
                <h2 className="text-lg font-black uppercase tracking-tight text-gray-900">
                  {group.title}
                </h2>
              </div>

              <ul className="space-y-6">
                {group.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link
                      href={link.href}
                      className="flex items-center justify-between group/link"
                    >
                      <span className="text-sm font-bold text-gray-600 group-hover/link:text-gray-900 transition-colors uppercase italic tracking-wide">
                        {link.label}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover/link:bg-gray-900 transition-all opacity-0 group-hover/link:opacity-100 group-hover/link:translate-x-0 -translate-x-4">
                        <ChevronRight className="w-4 h-4 text-white" />
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* System integrity Badge */}
        <div className="mt-32 pt-16 border-t border-gray-100 flex flex-col items-center text-center">
          <div className="flex items-center space-x-4 mb-8">
            <div className="flex items-center space-x-2 grayscale opacity-50">
              <Lock className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-900">
                Encrypted Path
              </span>
            </div>
            <div className="w-px h-4 bg-gray-200"></div>
            <div className="flex items-center space-x-2 grayscale opacity-50">
              <Globe className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-900">
                Global Direct Access
              </span>
            </div>
          </div>
          <p className="text-[9px] font-mono text-gray-300 uppercase tracking-[0.5em]">
            JAOPRA_SYSTEM_ARCHITECTURE::VERSION_2.0.FINAL
          </p>
        </div>
      </div>
    </div>
  );
}
