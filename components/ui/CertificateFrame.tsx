"use client";

import React from "react";
import { motion } from "framer-motion";

interface CertificateFrameProps {
  children: React.ReactNode;
  themeColor?: string;
}

export default function CertificateFrame({
  children,
  themeColor = "bg-green-600",
}: CertificateFrameProps) {
  return (
    <div className="relative p-1 md:p-4 bg-white rounded-[3rem] shadow-2xl overflow-hidden">
      {/* Ornate Border Overlay */}
      <div className="absolute inset-0 border-[16px] border-gray-50 pointer-events-none rounded-[3rem]"></div>
      <div className="absolute inset-4 border border-gray-100 pointer-events-none rounded-[2rem]"></div>

      {/* Corner Accents */}
      <div
        className={`absolute top-0 left-0 w-32 h-32 ${themeColor} opacity-10 rounded-br-full -translate-x-10 -translate-y-10`}
      ></div>
      <div
        className={`absolute bottom-0 right-0 w-32 h-32 ${themeColor} opacity-10 rounded-tl-full translate-x-10 translate-y-10`}
      ></div>

      {/* Main Content Container */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative z-10"
      >
        {children}
      </motion.div>

      {/* Security micro-print at the very bottom */}
      <div className="absolute bottom-6 left-0 w-full text-center pointer-events-none">
        <p className="text-[6px] text-gray-200 font-mono uppercase tracking-[0.5em]">
          VIFILY SECURE DOCUMENT • ANTI-FORGERY PROTOCOL ACTIVE • VIFILY SECURE
          DOCUMENT • ANTI-FORGERY PROTOCOL ACTIVE
        </p>
      </div>
    </div>
  );
}
