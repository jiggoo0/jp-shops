"use client";

/* @identity เจ้าป่า */
import React from "react";
import styles from "./KBTTemplate.module.css";
import { KBT_NAV_LINKS } from "./constants";
import Image from "next/image";
import BaseTemplate from "../BaseTemplate";
import FlightDeals from "./_components/FlightDeals";
import QuickServices from "./_components/QuickServices";

interface TemplateProps {
  view?: string[];
}

const BookingView = () => (
  <div className="flex min-h-[600px] flex-col items-center justify-center bg-slate-50 p-20 text-center">
    <div className="rounded-full bg-white p-8 shadow-xl">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-[#4b2382] border-t-transparent"></div>
    </div>
    <h2 className="mt-8 text-3xl font-bold text-[#4b2382]">ระบบจองพรีเมียม</h2>
    <p className="mt-4 max-w-md text-slate-500">
      กำลังเชื่อมต่อกับระบบจัดการที่นั่งและข้อมูลเที่ยวบินสากล... กรุณารอสักครู่
    </p>
  </div>
);

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
                  <li key={i}>{link.label}</li>
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
