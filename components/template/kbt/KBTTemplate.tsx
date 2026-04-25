"use client";

/* @identity เจ้าป่า */
import React from "react";
import styles from "./KBTTemplate.module.css";
import { KBT_NAV_LINKS } from "./constants";
import Image from "next/image";
import Link from "next/link";
import BaseTemplate from "../BaseTemplate";
import FlightDeals from "./_components/FlightDeals";
import QuickServices from "./_components/QuickServices";

interface TemplateProps {
  view?: string[];
}

const BookingView = () => {
  const [step, setStep] = React.useState(1);
  const [selectedSeat, setSelectedSeat] = React.useState<string | null>(null);

  const seats = ["A1", "A2", "B1", "B2", "C1", "C2", "D1", "D2"];

  return (
    <div className="flex min-h-[70vh] flex-col items-center bg-slate-50 p-6 md:p-20">
      <div className="w-full max-w-2xl rounded-xl bg-white p-8 shadow-xl">
        {/* Progress Bar */}
        <div className="mb-12 flex justify-between">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`flex h-10 w-10 items-center justify-center rounded-full font-bold ${
                step >= s ? "bg-[#4b2382] text-white" : "bg-slate-200 text-slate-500"
              }`}
            >
              {s}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="mb-6 text-2xl font-bold text-[#4b2382]">เลือกที่นั่งพรีเมียม</h2>
            <div className="grid grid-cols-4 gap-4">
              {seats.map((seat) => (
                <button
                  key={seat}
                  onClick={() => setSelectedSeat(seat)}
                  className={`rounded-lg border-2 p-4 font-bold transition-all ${
                    selectedSeat === seat
                      ? "border-[#f9a825] bg-[#4b2382] text-white"
                      : "border-slate-100 hover:border-[#4b2382]"
                  }`}
                >
                  {seat}
                </button>
              ))}
            </div>
            <button
              disabled={!selectedSeat}
              onClick={() => setStep(2)}
              className="mt-8 w-full rounded-lg bg-[#4b2382] py-4 font-bold text-white transition-opacity disabled:opacity-50"
            >
              ดำเนินการต่อ
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <h2 className="mb-6 text-2xl font-bold text-[#4b2382]">ข้อมูลผู้โดยสาร</h2>
            <div className="space-y-4 text-left">
              <div>
                <label className="text-sm font-bold text-slate-600">ชื่อ-นามสกุล (ภาษาอังกฤษ)</label>
                <input type="text" className="mt-1 w-full rounded-lg border p-3" placeholder="MR. TRAVELER" />
              </div>
              <div>
                <label className="text-sm font-bold text-slate-600">เลขพาสปอร์ต</label>
                <input type="text" className="mt-1 w-full rounded-lg border p-3" placeholder="AA123456" />
              </div>
            </div>
            <div className="mt-8 flex gap-4">
              <button onClick={() => setStep(1)} className="flex-1 rounded-lg border py-4 font-bold text-slate-500">ย้อนกลับ</button>
              <button onClick={() => setStep(3)} className="flex-1 rounded-lg bg-[#4b2382] py-4 font-bold text-white">ยืนยันการจอง</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="py-12 text-center animate-in zoom-in duration-500">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-4xl text-green-600">
              ✓
            </div>
            <h2 className="mb-2 text-2xl font-bold text-[#4b2382]">การจองสำเร็จ!</h2>
            <p className="text-slate-500">ที่นั่ง {selectedSeat} ถูกจองเรียบร้อยแล้ว <br/> ระบบกำลังส่งยืนยันไปยังอีเมลของคุณ</p>
            <button
              onClick={() => {
                setStep(1);
                setSelectedSeat(null);
                window.location.href = "/template/kbt";
              }}
              className="mt-8 rounded-lg bg-[#4b2382] px-8 py-3 font-bold text-white"
            >
              กลับหน้าหลัก
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const KBTTemplate: React.FC<TemplateProps> = ({ view }) => {
  const [activeSearchTab, setActiveSearchTab] = React.useState("จองเที่ยวบิน");

  // ตรวจสอบกลยุทธ์การแสดงผลตาม Path ย่อย
  const viewKey = view?.[0] || "home";

  const HomeView = () => (
    <>
      <div className={styles.hero}>
        <Image
          src="https://images.unsplash.com/photo-1542296332-2e4473faf563?q=80&w=2070"
          alt="KBT Hero"
          fill
          priority
          className={styles.heroImage}
        />
        <div className={styles.searchBox}>
          <div className={styles.searchTabs}>
            {["จองเที่ยวบิน", "จัดการบุคกิ้ง", "เช็คอิน", "สถานะเที่ยวบิน"].map(
              (tab) => (
                <button
                  key={tab}
                  className={activeSearchTab === tab ? styles.activeTab : ""}
                  onClick={() => setActiveSearchTab(tab)}
                >
                  {tab}
                </button>
              )
            )}
          </div>
          <div className={styles.searchForm}>
            {activeSearchTab === "จองเที่ยวบิน" ? (
              <>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label>จาก</label>
                    <input type="text" defaultValue="กรุงเทพฯ (BKK)" />
                  </div>
                  <div className={styles.field}>
                    <label>ถึง</label>
                    <input type="text" placeholder="ปลายทางของคุณ" />
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label>วันออกเดินทาง</label>
                    <input type="date" />
                  </div>
                  <div className={styles.field}>
                    <label>วันเดินทางกลับ</label>
                    <input type="date" />
                  </div>
                  <button className={styles.submitBtn}>ค้นหาเที่ยวบิน</button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-slate-500">
                <p className="mb-2 text-lg font-semibold">
                  ระบบ{activeSearchTab}
                </p>
                <p className="text-center text-sm">
                  กำลังดึงข้อมูลจากระบบหลัก...
                  <br />
                  กรุณากรอกข้อมูลเพื่อตรวจสอบ
                </p>
                <div className="mt-6 flex w-full max-w-md gap-4">
                  <input
                    type="text"
                    className="flex-1 rounded border p-3"
                    placeholder={
                      activeSearchTab === "เช็คอิน"
                        ? "หมายเลขการจอง (PNR)"
                        : "เลขที่เที่ยวบิน หรือ ชื่อผู้เดินทาง"
                    }
                  />
                  <button className={styles.submitBtn} style={{ margin: 0 }}>
                    ตกลง
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <QuickServices />
      <FlightDeals />
    </>
  );

  const renderView = () => {
    switch (viewKey) {
      case "booking":
        return <BookingView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <BaseTemplate
      containerClassName={styles.container}
      header={
        <>
          <div className={styles.topBar}>
            <div className={styles.topInner}>
              <span>ช่วยเหลือ</span>
              <span>ภาษาไทย/THB</span>
            </div>
          </div>
          <header className={styles.header}>
            <div className={styles.logoContainer}>
              <div className={styles.logoSymbol}></div>
              <div className={styles.logoText}>
                <span className={styles.brandName}>การบินไตย</span>
                <span className={styles.brandTagline}>รักคุณเท่าพสุธา</span>
              </div>
            </div>
            <nav className={styles.nav}>
              <ul>
                {KBT_NAV_LINKS.map((link, i) => (
                  <li key={i}>
                    <Link 
                      href={link.label === "หน้าแรก" ? "/template/kbt" : link.label === "จองเที่ยวบิน" ? "/template/kbt/booking" : "#"}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </header>
        </>
      }
      footer={
        <footer className={styles.footer}>
          <div className={styles.footerContent}>
            <p>© 2026 การบินไตย (KBT Public Co.,Ltd.) - สงวนลิขสิทธิ์</p>
          </div>
        </footer>
      }
    >
      {renderView()}
    </BaseTemplate>
  );
};

export default KBTTemplate;
