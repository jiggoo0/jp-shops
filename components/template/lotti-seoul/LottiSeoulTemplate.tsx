"use client";

/* @identity เจ้าป่า */
import React from "react";
import styles from "./LottiSeoulTemplate.module.css";
import Image from "next/image";
import RoomList from "./_components/RoomList";
import Facilities from "./_components/Facilities";
import Link from "next/link";
import BaseTemplate from "../BaseTemplate";

interface TemplateProps {
  view?: string[];
}

const HomeContent = () => (
  <>
    <div className={styles.quickReserve}>
      <div className={styles.reserveForm}>
        <div className={styles.item}>
          <label>CHECK IN / OUT</label>
          <span className="font-light">2026.04.25 - 2026.04.26</span>
        </div>
        <div className={styles.item}>
          <label>ADULTS / CHILDREN</label>
          <span className="font-light">2 Adults, 0 Children</span>
        </div>
        <button type="button" className={styles.searchBtn}>
          SEARCH
        </button>
      </div>
    </div>
    <RoomList />
    <Facilities />
  </>
);

const DiningContent = () => (
  <div className="bg-white px-[5%] py-24 text-center">
    <span className="mb-4 block text-xs uppercase tracking-[4px] text-[#c5a059]">
      Gastronomy
    </span>
    <h2 className="mb-12 text-4xl font-light tracking-[2px]">
      Culinary Journey
    </h2>
    <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
      <div className="relative h-[500px]">
        <Image
          src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070"
          alt="Dining"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 flex flex-col justify-end bg-black/20 p-12 text-left text-white">
          <h3 className="mb-2 text-2xl font-light">The Emerald Grill</h3>
          <p className="text-sm font-extralight">
            Fine dining with a view of the city skyline.
          </p>
        </div>
      </div>
      <div className="relative h-[500px]">
        <Image
          src="https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=2070"
          alt="Bar"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 flex flex-col justify-end bg-black/20 p-12 text-left text-white">
          <h3 className="mb-2 text-2xl font-light">Sky Lounge Bar</h3>
          <p className="text-sm font-extralight">
            Craft cocktails and premium selection of wines.
          </p>
        </div>
      </div>
    </div>
  </div>
);

const RoomsContent = () => (
  <div className="bg-white px-[5%] py-24">
    <h2 className={styles.sectionTitle}>Luxurious Accommodations</h2>
    <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
      {[
        { name: "Deluxe Room", size: "45 sqm", price: "450,000 KRW" },
        { name: "Premier Suite", size: "82 sqm", price: "850,000 KRW" },
        { name: "Royal Suite", size: "120 sqm", price: "2,500,000 KRW" },
      ].map((room, i) => (
        <div key={i} className="group cursor-pointer">
          <div className="mb-4 h-64 bg-slate-100 transition-colors group-hover:bg-slate-200"></div>
          <h4 className="text-lg font-light tracking-widest">{room.name}</h4>
          <p className="mt-2 text-xs text-slate-400">
            {room.size} | From {room.price}
          </p>
        </div>
      ))}
    </div>
  </div>
);

const FacilitiesContent = () => (
  <div className="bg-[#f9f9f9] px-[5%] py-24 text-center">
    <h2 className={styles.sectionTitle}>Exceptional Facilities</h2>
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
      {["Indoor Pool", "Luxury Spa", "Fitness Center", "Executive Lounge"].map(
        (f, i) => (
          <div key={i} className="rounded-lg bg-white p-12 shadow-sm">
            <h4 className="text-sm font-light uppercase tracking-[3px]">{f}</h4>
          </div>
        )
      )}
    </div>
  </div>
);

const LottiSeoulTemplate: React.FC<TemplateProps> = ({ view }) => {
  const viewMap: Record<string, string> = {
    rooms: "ROOMS",
    dining: "DINING",
    facilities: "FACILITIES",
    offers: "OFFERS",
  };

  const currentView = view?.[0];
  const activeMenu = (currentView && viewMap[currentView]) || "ABOUT";

  const renderContent = () => {
    switch (activeMenu) {
      case "ROOMS":
        return <RoomsContent />;
      case "DINING":
        return <DiningContent />;
      case "FACILITIES":
        return <FacilitiesContent />;
      case "OFFERS":
        return (
          <div className="py-40 text-center">
            <p className="text-sm tracking-[4px] opacity-40">
              NO CURRENT OFFERS AVAILABLE
            </p>
          </div>
        );
      default:
        return <HomeContent />;
    }
  };

  return (
    <BaseTemplate
      containerClassName={styles.container}
      mainClassName={styles.main}
      header={
        <header className={styles.header}>
          <div className={styles.topNav}>
            <div className={styles.left}>
              <span>HOTELS & RESORTS</span>
              <span>REWARDS</span>
            </div>
            <Link href="/template/kr-hotel" className={styles.logo}>
              <span className={styles.lotti}>LOTTI</span>
              <span className={styles.city}>SEOUL</span>
            </Link>
            <div className={styles.right}>
              <span>KOREAN</span>
              <span>LOGIN</span>
              <button type="button" className={styles.reservationBtn}>
                RESERVATION
              </button>
            </div>
          </div>
          <nav className={styles.mainNav}>
            <ul className="flex justify-center gap-12 text-[11px] tracking-[3px]">
              {["ABOUT", "ROOMS", "DINING", "FACILITIES", "OFFERS"].map(
                (menu) => {
                  const slug = Object.keys(viewMap).find(
                    (key) => viewMap[key] === menu
                  );
                  const href =
                    menu === "ABOUT"
                      ? "/template/kr-hotel"
                      : `/template/kr-hotel/${slug}`;

                  return (
                    <li
                      key={menu}
                      className={activeMenu === menu ? styles.active : ""}
                    >
                      <Link href={href}>{menu}</Link>
                    </li>
                  );
                }
              )}
            </ul>
          </nav>
        </header>
      }
      footer={
        <footer className={styles.footer}>
          <div className="mx-auto mb-12 flex max-w-4xl justify-center gap-12 text-[11px] uppercase tracking-[2px] text-slate-400">
            <span>Newsletter</span>
            <span>Contact Us</span>
            <span>Privacy Policy</span>
            <span>Terms of Use</span>
          </div>
          <p>© 2026 LOTTI HOTELS & RESORTS. All rights reserved.</p>
        </footer>
      }
    >
      <div className={styles.hero}>
        <Image
          src={
            activeMenu === "DINING"
              ? "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070"
              : activeMenu === "ROOMS"
                ? "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2074"
                : "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070"
          }
          alt="Lotti Seoul Hero"
          fill
          priority
          className={styles.heroImage}
        />
        <div className={styles.heroContent}>
          <span className={styles.sub}>
            {activeMenu === "ABOUT"
              ? "A Life of Luxury"
              : `Explore our ${activeMenu.toLowerCase()}`}
          </span>
          <h1 className="transition-all duration-700">
            {activeMenu === "ABOUT"
              ? "Modern Sophistication in the Heart of Seoul"
              : activeMenu === "ROOMS"
                ? "Ultimate Comfort and Elegant Design"
                : activeMenu === "DINING"
                  ? "Exquisite Flavors by World-Class Chefs"
                  : "Unforgettable Experiences Await You"}
          </h1>
        </div>
      </div>

      {renderContent()}
    </BaseTemplate>
  );
};

export default LottiSeoulTemplate;
