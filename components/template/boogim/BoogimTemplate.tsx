"use client";

/* @identity เจ้าป่า */
import React from "react";
import styles from "./BoogimTemplate.module.css";
import { BOOGIM_NAV } from "./constants";
import Image from "next/image";
import DestinationGrid from "./_components/DestinationGrid";
import TrendingProperties from "./_components/TrendingProperties";

interface TemplateProps {
  view?: string[];
}

const AccomContent = () => (
  <>
    <section className="mt-8 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="rounded-full bg-blue-50 p-3 text-blue-600">
          <span className="text-xl">ℹ️</span>
        </div>
        <div>
          <h4 className="text-sm font-bold">
            รับคำแนะนำในการเดินทางที่เป็นประโยชน์
          </h4>
          <p className="text-xs text-slate-500">
            ตรวจสอบข้อจำกัดในการเดินทางล่าสุดก่อนจอง
          </p>
        </div>
      </div>
    </section>
    <DestinationGrid />
    <TrendingProperties />
    <section className="mt-16 rounded-xl bg-[#003580] p-8 text-white">
      <div className="max-w-2xl">
        <h3 className="mb-2 text-2xl font-bold">ประหยัด 15% หรือมากกว่า</h3>
        <p className="mb-6 opacity-90">
          แผนการเดินทางในฝันของคุณเป็นจริงได้ด้วยข้อเสนอ Getaway Deals
        </p>
        <button className="rounded-md bg-[#0071c2] px-6 py-2.5 font-bold transition-colors hover:bg-[#005999]">
          หาข้อเสนอ Getaway Deals
        </button>
      </div>
    </section>
  </>
);

const FlightContent = () => (
  <div className="mt-12 rounded-xl border border-dashed border-slate-300 bg-white py-12 text-center">
    <div className="mb-4 text-4xl">✈️</div>
    <h3 className="mb-2 text-xl font-bold">ค้นหาเที่ยวบินราคาประหยัด</h3>
    <p className="mb-6 text-slate-500">
      เปรียบเทียบตั๋วเครื่องบินจากกว่า 600 สายการบินทั่วโลก
    </p>
    <div className="grid grid-cols-1 gap-6 px-8 text-left md:grid-cols-2 lg:grid-cols-3">
      {[
        { city: "สิงคโปร์", price: "2,400" },
        { city: "ฮ่องกง", price: "4,500" },
        { city: "ไทเป", price: "5,200" },
      ].map((f, i) => (
        <div
          key={i}
          className="cursor-pointer rounded-lg border p-4 hover:border-blue-500"
        >
          <span className="text-xs font-bold text-blue-600">ยอดนิยม</span>
          <p className="font-bold">กรุงเทพฯ → {f.city}</p>
          <p className="text-sm text-slate-500">
            ไป-กลับ เริ่มต้นที่ ฿{f.price}
          </p>
        </div>
      ))}
    </div>
  </div>
);

const BoogimTemplate: React.FC<TemplateProps> = () => {
  const [activeNav, setActiveNav] = React.useState(BOOGIM_NAV[0]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <div className={styles.logo}>Boogim.com</div>
          <div className={styles.topActions}>
            <span className="cursor-pointer hover:underline">THB</span>
            <Image
              src="https://flagcdn.com/w20/th.png"
              alt="Thai"
              width={20}
              height={20}
              className={styles.flag}
            />
            <button className={styles.helpBtn}>?</button>
            <button className={styles.listProperty}>
              ลงประกาศที่พักของคุณ
            </button>
            <button className={styles.authBtn}>ลงทะเบียน</button>
            <button className={styles.authBtn}>เข้าสู่ระบบ</button>
          </div>
        </div>
        <nav className={styles.nav}>
          <ul>
            {BOOGIM_NAV.map((item, i) => (
              <li
                key={i}
                className={activeNav === item ? styles.activeNav : ""}
                onClick={() => setActiveNav(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className={styles.main}>
        <section className={styles.hero}>
          <h1>
            {activeNav === "ที่พัก"
              ? "ค้นหาที่พักสำหรับการเดินทางครั้งถัดไป"
              : activeNav === "เที่ยวบิน"
                ? "ค้นหาเที่ยวบินที่ใช่สำหรับคุณ"
                : `ค้นหา${activeNav}ราคาประหยัด`}
          </h1>
          <p>ประหยัดมากขึ้นเมื่อจองผ่าน Boogim.com...</p>
        </section>

        <div className={styles.searchContainer}>
          <div className={styles.searchBar}>
            <div className={styles.inputField}>
              <span className={styles.icon}>
                {activeNav === "เที่ยวบิน" ? "🛫" : "📍"}
              </span>
              <input
                type="text"
                placeholder={
                  activeNav === "เที่ยวบิน" ? "ไปที่ไหนดี?" : "คุณจะไปที่ไหน?"
                }
              />
            </div>
            <div className={styles.inputField}>
              <span className={styles.icon}>📅</span>
              <input
                type="text"
                placeholder={
                  activeNav === "ที่พัก"
                    ? "เช็คอิน — เช็คเอาท์"
                    : "วันที่เดินทาง"
                }
              />
            </div>
            <div className={styles.inputField}>
              <span className={styles.icon}>
                {activeNav === "รถเช่า" ? "🚗" : "👤"}
              </span>
              <input
                type="text"
                placeholder={
                  activeNav === "ที่พัก"
                    ? "ผู้ใหญ่ 2 คน · เด็ก 0 คน · 1 ห้อง"
                    : activeNav === "เที่ยวบิน"
                      ? "ผู้โดยสาร 1 คน, ชั้นประหยัด"
                      : "เลือกประเภทรถ"
                }
              />
            </div>
            <button className={styles.searchBtn}>ค้นหา</button>
          </div>
        </div>

        {activeNav === "ที่พัก" ? <AccomContent /> : <FlightContent />}
      </main>

      <footer className={styles.footer}>
        <div className="mx-auto mb-8 grid max-w-4xl grid-cols-2 gap-8 px-4 text-left md:grid-cols-4">
          <div>
            <h5 className="mb-3 font-bold">การสนับสนุน</h5>
            <ul className="space-y-2 text-[11px] opacity-70">
              <li>ศูนย์ช่วยเหลือ</li>
              <li>ประกาศด้านความปลอดภัย</li>
              <li>ตัวเลือกในการยกเลิก</li>
            </ul>
          </div>
          <div>
            <h5 className="mb-3 font-bold">ชุมชน</h5>
            <ul className="space-y-2 text-[11px] opacity-70">
              <li>Boogim.com สำหรับคู่ค้า</li>
              <li>ร่วมงานกับเรา</li>
              <li>บล็อกการเดินทาง</li>
            </ul>
          </div>
        </div>
        <p className="border-t border-slate-200 pt-8 opacity-60">
          © 2026 Boogim.com - สงวนลิขสิทธิ์
        </p>
      </footer>
    </div>
  );
};

export default BoogimTemplate;
