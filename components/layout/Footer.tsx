"use client";

import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Lock, Globe, ArrowUpRight } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export function Footer() {
  const pathname = usePathname();
  const router = useRouter();

  const scrollToSection = (id: string) => {
    if (pathname !== "/") {
      router.push(`/#${id}`);
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const footerLinks = [
    {
      title: "ระบบจัดการ",
      links: [
        { label: "ยื่นวีซ่าครบวงจร", id: "services" },
        { label: "ที่ปรึกษาสินเชื่อ", id: "services" },
        { label: "ระบบ UNLINK Check", id: "vifily" },
        { label: "System Status", href: "/status" },
        { label: "บทความ & ข้อมูล", href: "/blog" },
      ],
    },
    {
      title: "เอกสารสำคัญ",
      links: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Use", href: "/terms" },
        { label: "Sitemap", href: "/sitemap" },
        { label: "ติดต่อเจ้าหน้าที่", id: "contact" },
      ],
    },
    {
      title: "พาร์ทเนอร์",
      links: [
        { label: "Partner Login", href: "/login" },
        { label: "ร่วมเป็นส่วนหนึ่ง", href: "/register" },
      ],
    },
  ];

  return (
    <footer className="bg-white border-t border-gray-100 pt-32 pb-16 font-sans relative overflow-hidden">
      {/* Subtle Background Accent */}
      <div className="absolute bottom-0 right-0 w-[30%] h-[30%] bg-green-500/[0.03] rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-20 mb-32">
          {/* Brand Identity Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-10 group cursor-pointer">
              <div className="relative w-14 h-14">
                <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl group-hover:bg-green-500/40 transition-all duration-700"></div>
                <Image
                  src="/logo.svg"
                  alt="JP Visual Docs Logo"
                  width={56}
                  height={56}
                  className="w-full h-full relative z-10 drop-shadow-2xl group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-2xl font-black tracking-tighter leading-none uppercase text-gray-900">
                  JP-VISUAL<span className="text-gray-400">&DOCS</span>
                </span>
                <div className="flex items-center mt-1">
                  <span className="text-[8px] font-black tracking-[0.3em] text-green-600 leading-none uppercase bg-green-50 px-1.5 py-0.5 rounded border border-green-100/50 shadow-sm">
                    By.เจ้าป่า
                  </span>
                </div>
              </div>
            </div>
            <p className="text-gray-700 text-xl max-w-sm mb-12 font-bold italic leading-relaxed">
              &quot;เราช่วยวิเคราะห์และจัดชุดเอกสารให้ครบตามเงื่อนไข
              ภายใต้มาตรฐานความปลอดภัยที่ UNLINK-GLOBAL รับรอง&quot;
            </p>

            <div className="flex items-center space-x-8 mt-12">
              <div className="flex flex-col">
                <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-1">
                  Auth Status
                </span>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="w-2 h-2 bg-green-500 rounded-sm rotate-45"
                    ></div>
                  ))}
                </div>
              </div>

              {/* UNLINK-GLOBAL TRUST SEAL */}
              <a
                href="https://www.unlink-th.com"
                target="_blank"
                rel="noopener"
                title="Verified by UNLINK-GLOBAL"
                className="hover:scale-105 transition-transform duration-300 block"
              >
                <Image
                  src="https://www.unlink-th.com/branding/verify-badge.webp"
                  alt="Verified by UNLINK-GLOBAL Digital Reputation Management"
                  width={100}
                  height={100}
                  className="w-20 h-auto grayscale hover:grayscale-0 transition-all duration-500"
                />
              </a>
            </div>
          </div>

          {/* Dynamic Links Generation */}
          {footerLinks.map((group) => (
            <div key={group.title} className="col-span-1">
              <p className="font-black uppercase tracking-[0.3em] text-[10px] text-gray-900 mb-10 border-l-2 border-green-500 pl-4">
                {group.title}
              </p>
              <ul className="space-y-6">
                {group.links.map((link) => (
                  <li key={link.label}>
                    {link.href ? (
                      <Link
                        href={link.href}
                        className="text-[11px] font-black uppercase tracking-[0.15em] text-gray-500 hover:text-gray-900 transition-all duration-300 flex items-center group"
                      >
                        {link.label}
                        <ArrowUpRight className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-all -translate-y-1 group-hover:translate-y-0" />
                      </Link>
                    ) : (
                      <button
                        onClick={() => scrollToSection(link.id!)}
                        className="text-[11px] font-black uppercase tracking-[0.15em] text-gray-500 hover:text-gray-900 transition-all duration-300 flex items-center group"
                      >
                        {link.label}
                        <ArrowUpRight className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-all -translate-y-1 group-hover:translate-y-0" />
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer Bottom Section: Enhanced Clarity */}
        <div className="pt-16 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-10 bg-gray-50/50 p-10 rounded-[3rem] border border-gray-100">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gray-900 rounded-2xl flex items-center justify-center shadow-lg">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-900">
                JP-VISUAL&DOCS &copy; {new Date().getFullYear()}
              </p>
              <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                UNLINK Digital Protocol Enabled
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-12">
            <div className="flex items-center space-x-3 group">
              <div className="w-8 h-8 bg-white border border-gray-100 rounded-xl flex items-center justify-center shadow-sm group-hover:bg-gray-900 group-hover:text-white transition-all">
                <Lock className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-900">
                SSL Secured
              </span>
            </div>
            <div className="flex items-center space-x-3 group">
              <div className="w-8 h-8 bg-white border border-gray-100 rounded-xl flex items-center justify-center shadow-sm group-hover:bg-green-600 group-hover:text-white transition-all">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-900">
                Unlink Verified
              </span>
            </div>
          </div>
        </div>

        {/* System integrity hash at the very bottom */}
        <div className="mt-12 text-center">
          <p className="text-[8px] font-mono text-gray-300 uppercase tracking-widest">
            SYSTEM_ID::JP_VISUAL_DOCS_STABLE_VERSION_2.0
          </p>
        </div>
      </div>
    </footer>
  );
}
