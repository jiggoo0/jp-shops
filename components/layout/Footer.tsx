"use client";

import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Lock } from "lucide-react";
import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();

  const scrollToSection = (id: string) => {
    if (pathname !== "/") {
      window.location.href = `/#${id}`;
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[#F9F9F9] border-t border-gray-100 pt-32 pb-16 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-20 mb-32">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-10">
              <div className="relative w-12 h-12">
                <Image
                  src="/logo.svg"
                  alt="JP Visual Docs Logo"
                  width={48}
                  height={48}
                  className="w-full h-full drop-shadow-xl opacity-80 hover:opacity-100 transition-opacity"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tighter uppercase leading-none text-gray-900">
                  JP-VISOUL<span className="text-gray-300">&DOCS</span>
                </span>
                <span className="text-[7px] font-black tracking-[0.2em] text-green-600 leading-none mt-1 uppercase">
                  By.เจ้าป่า
                </span>
              </div>
            </div>
            <p className="text-gray-400 text-xl max-w-sm mb-12 font-medium italic leading-relaxed">
              &quot;เราช่วยวิเคราะห์และจัดชุดเอกสารให้ครบตามเงื่อนไข
              แบงก์และสถานทูต ดูแลระดับมืออาชีพที่คุณไม่ต้องจัดการเอง&quot;
            </p>
          </div>

          <div className="col-span-1">
            <p className="font-black uppercase tracking-[0.3em] text-[10px] text-gray-900 mb-10">
              ระบบจัดการ
            </p>
            <ul className="space-y-5 text-xs font-black uppercase tracking-[0.15em] text-gray-400">
              <li
                onClick={() => scrollToSection("services")}
                className="hover:text-gray-900 cursor-pointer transition-colors"
              >
                ยื่นวีซ่าครบวงจร
              </li>
              <li
                onClick={() => scrollToSection("services")}
                className="hover:text-gray-900 cursor-pointer transition-colors"
              >
                ที่ปรึกษาสินเชื่อ
              </li>
              <li
                onClick={() => scrollToSection("vifily")}
                className="hover:text-gray-900 cursor-pointer transition-colors"
              >
                ระบบ Vifily Check
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <p className="font-black uppercase tracking-[0.3em] text-[10px] text-gray-900 mb-10">
              เอกสารสำคัญ
            </p>
            <ul className="space-y-5 text-xs font-black uppercase tracking-[0.15em] text-gray-400">
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-gray-900 cursor-pointer transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-gray-900 cursor-pointer transition-colors"
                >
                  Terms of Use
                </Link>
              </li>
              <li
                onClick={() => scrollToSection("contact")}
                className="hover:text-gray-900 cursor-pointer transition-colors"
              >
                ติดต่อเจ้าหน้าที่
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <p className="font-black uppercase tracking-[0.3em] text-[10px] text-gray-900 mb-10">
              สำหรับพาร์ทเนอร์
            </p>
            <ul className="space-y-5 text-xs font-black uppercase tracking-[0.15em] text-gray-400">
              <li>
                <Link
                  href="/login"
                  className="hover:text-gray-900 cursor-pointer transition-colors"
                >
                  Partner Login
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="hover:text-gray-900 cursor-pointer transition-colors"
                >
                  ร่วมเป็นส่วนหนึ่ง
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-16 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center space-x-3 opacity-30">
            <div className="w-1.5 h-1.5 bg-gray-900 rounded-full"></div>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-900">
              JP-Visual&Docs &copy; {new Date().getFullYear()}
            </p>
          </div>
          <div className="flex items-center space-x-4 grayscale opacity-40">
            <div className="flex items-center space-x-2">
              <Lock className="w-3.5 h-3.5 text-gray-900" />
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-900">
                SSL Secured
              </span>
            </div>
            <div className="w-px h-4 bg-gray-200"></div>
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-3.5 h-3.5 text-gray-900" />
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-900">
                AI Verified
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
