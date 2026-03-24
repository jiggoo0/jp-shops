"use client";

import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, CheckCircle2, Globe, Cpu, Activity } from "lucide-react";
import { Button } from "@/components/ui";
import { ClientMotionDiv } from "@/components/ui/ClientMotion";

export function VerificationSection() {
  return (
    <section
      id="vifily"
      className="py-48 bg-gray-950 text-white overflow-hidden relative border-y border-white/5"
    >
      {/* High-Tech Grid Background */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      {/* Strategic Glow Accents */}
      <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-green-500/[0.05] rounded-full blur-[120px]"></div>
      <div className="absolute bottom-1/4 -right-20 w-[600px] h-[600px] bg-blue-500/[0.03] rounded-full blur-[140px]"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-12 gap-24 items-center">
        {/* Left: Content & Philosophy */}
        <div className="lg:col-span-5">
          <ClientMotionDiv
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-3 bg-white/5 backdrop-blur-xl px-5 py-2 rounded-xl mb-10 border border-white/10 shadow-2xl">
              <Cpu className="w-4 h-4 text-green-400" />
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-300">
                AI Integrity Engine v2.0
              </span>
            </div>

            <h2 className="text-5xl md:text-7xl font-black mb-10 leading-[0.9] tracking-tighter uppercase">
              UNLINK-GLOBAL <br />{" "}
              <span className="text-green-500">TRUST PROTOCOL.</span>
            </h2>

            <div className="space-y-8 mb-16">
              <p className="text-gray-300 text-xl leading-relaxed font-bold italic border-l-4 border-green-500 pl-8 bg-white/[0.02] py-6 rounded-r-3xl">
                &quot;อำนาจการรับรองความถูกต้องแบบ Real-time
                ผ่านเครือข่ายความเชื่อถือของ UNLINK-GLOBAL
                เพื่อยกระดับความน่าเชื่อถือของเอกสารทุกฉบับสู่มาตรฐานสูงสุด&quot;
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center border border-green-500/20">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                    Anti-Tamper
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                    <Globe className="w-4 h-4 text-blue-500" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                    Global Node
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-8">
              <Link href="/register" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="bg-green-600 text-white border-none hover:bg-green-500 h-20 px-12 rounded-2xl font-black uppercase tracking-widest text-sm shadow-[0_20px_50px_-10px_rgba(34,197,94,0.4)] w-full transition-all"
                >
                  เริ่มระบบตรวจสอบ
                </Button>
              </Link>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest mb-1">
                    Security Status
                  </p>
                  <p className="text-[11px] font-mono font-bold text-green-400 uppercase tracking-tighter">
                    PROTOCOL_ENFORCED
                  </p>
                </div>
                <Activity className="w-5 h-5 text-gray-700" />
              </div>
            </div>
          </ClientMotionDiv>
        </div>

        {/* Right: The High-Standard Terminal UI */}
        <div className="lg:col-span-7 relative">
          <ClientMotionDiv
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Main Terminal Window */}
            <div className="bg-gray-900 rounded-[2.5rem] border border-white/10 shadow-[0_80px_150px_-30px_rgba(0,0,0,0.8)] overflow-hidden relative group">
              {/* Terminal Header */}
              <div className="bg-gray-800/50 px-8 py-4 border-b border-white/5 flex justify-between items-center">
                <div className="flex space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/20"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/20"></div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-[10px] font-mono font-black text-gray-400 uppercase tracking-[0.2em]">
                    Live Scan: #UL-9982
                  </span>
                </div>
              </div>

              {/* Scanning Area */}
              <div className="relative aspect-video md:aspect-[16/10] bg-black overflow-hidden flex items-center justify-center p-12">
                {/* Background Image (Desaturated) */}
                <Image
                  src="/unlink-verification.webp"
                  alt="Unlink Global Core"
                  fill
                  className="object-cover opacity-20 grayscale group-hover:opacity-30 transition-all duration-1000"
                />

                {/* Precision UI Overlay */}
                <div className="absolute inset-12 border border-white/5 pointer-events-none">
                  {/* Corner Accents */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-green-500/50"></div>
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-green-500/50"></div>
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-green-500/50"></div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-green-500/50"></div>
                </div>

                {/* The Document / Certificate Card (Standardized) */}
                <div className="relative w-full max-w-sm aspect-[3/4] bg-white rounded-2xl shadow-2xl p-8 z-10 border-[10px] border-gray-100/10 overflow-hidden transition-transform duration-700 group-hover:scale-[1.02]">
                  {/* Scanning Beam */}
                  <div className="absolute left-0 right-0 h-1 bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.8)] z-20 animate-[scan_4s_ease-in-out_infinite] opacity-80"></div>

                  <div className="flex flex-col h-full border-2 border-dashed border-gray-100 rounded-xl p-6 justify-between">
                    <div className="flex justify-between items-start">
                      <ShieldCheck className="w-12 h-12 text-gray-900 opacity-20" />
                      <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-100">
                        <div className="w-8 h-8 bg-gray-900 rounded-md"></div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="h-2 w-3/4 bg-gray-100 rounded-full"></div>
                      <div className="h-2 w-1/2 bg-gray-50 rounded-full"></div>
                      <div className="h-2 w-2/3 bg-gray-100 rounded-full"></div>
                    </div>

                    <div className="pt-6 border-t border-gray-200">
                      <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest text-center">
                        Security Hash Verification
                      </p>
                      <p className="text-[7px] font-mono font-bold text-gray-900 text-center truncate mt-1">
                        0x8829...FF92-UNLINK-SECURE
                      </p>
                    </div>
                  </div>
                </div>

                {/* Floating Technical Data */}
                <div className="absolute top-20 right-20 hidden md:block">
                  <div className="bg-black/60 backdrop-blur-md border border-white/10 p-4 rounded-xl space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="flex items-center space-x-3 opacity-60"
                      >
                        <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                        <div className="w-20 h-1 bg-white/10 rounded-full"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Status Footer */}
              <div className="bg-gray-900/80 px-8 py-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-6">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-600/20">
                    <ShieldCheck className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-white uppercase tracking-widest leading-none mb-1">
                      Authenticity Level
                    </p>
                    <p className="text-[10px] font-bold text-green-500 uppercase tracking-widest leading-none">
                      Tier-1 Institutional
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-8">
                  <div className="text-right">
                    <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest mb-1">
                      Processing Hash
                    </p>
                    <p className="text-[10px] font-mono text-gray-400">
                      SHA-256::VERIFIED
                    </p>
                  </div>
                  <div className="h-10 w-px bg-white/5"></div>
                  <CheckCircle2 className="w-6 h-6 text-green-500" />

                  {/* UNLINK-GLOBAL TRUST SEAL */}
                  <div className="h-10 w-px bg-white/5"></div>
                  <a
                    href="https://www.unlink-th.com"
                    target="_blank"
                    rel="noopener"
                    title="Verified by UNLINK-GLOBAL"
                    className="hover:scale-110 transition-transform duration-300 block bg-white/5 p-1 rounded-lg border border-white/10"
                  >
                    <Image
                      src="https://www.unlink-th.com/branding/verify-badge.webp"
                      alt="Verified by UNLINK-GLOBAL"
                      width={40}
                      height={40}
                      className="w-10 h-auto"
                    />
                  </a>
                </div>
              </div>
            </div>

            {/* Decorative Cyber Rings */}
            <div className="absolute -z-10 -top-10 -right-10 w-64 h-64 border border-white/5 rounded-full"></div>
            <div className="absolute -z-10 -bottom-10 -left-10 w-80 h-80 border border-white/5 rounded-full"></div>
          </ClientMotionDiv>
        </div>
      </div>
    </section>
  );
}
