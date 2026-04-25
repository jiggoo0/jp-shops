"use client";

/* @identity เจ้าป่า */
import React from "react";
import styles from "./LottiSeoulTemplate.module.css";
import Image from "next/image";
import RoomList from "./_components/RoomList";
import Facilities from "./_components/Facilities";

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
        <button className={styles.searchBtn}>SEARCH</button>
      </div>
    </div>
    <RoomList />
    <Facilities />
  </>
);

const DiningContent = () => (
  <div className="bg-white px-[10%] py-24 text-center">
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
          src="https://images.unsplash.com/photo-1550966841-3ee32335676e?q=80&w=2070"
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

const LottiSeoulTemplate: React.FC<TemplateProps> = () => {
  const [activeMenu, setActiveMenu] = React.useState("ABOUT");

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.topNav}>
          <div className={styles.left}>
            <span>HOTELS & RESORTS</span>
            <span>REWARDS</span>
          </div>
          <div className={styles.logo}>
            <span className={styles.lotti}>LOTTI</span>
            <span className={styles.city}>SEOUL</span>
          </div>
          <div className={styles.right}>
            <span>KOREAN</span>
            <span>LOGIN</span>
            <button className={styles.reservationBtn}>RESERVATION</button>
          </div>
        </div>
        <nav className={styles.mainNav}>
          <ul>
            {["ABOUT", "ROOMS", "DINING", "FACILITIES", "OFFERS"].map(
              (menu) => (
                <li
                  key={menu}
                  className={activeMenu === menu ? styles.active : ""}
                  onClick={() => setActiveMenu(menu)}
                >
                  {menu}
                </li>
              )
            )}
          </ul>
        </nav>
      </header>

      <main className={styles.main}>
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

        {activeMenu === "DINING" ? <DiningContent /> : <HomeContent />}
      </main>

      <footer className={styles.footer}>
        <div className="mx-auto mb-12 flex max-w-4xl justify-center gap-12 text-[11px] uppercase tracking-[2px] text-slate-400">
          <span>Newsletter</span>
          <span>Contact Us</span>
          <span>Privacy Policy</span>
          <span>Terms of Use</span>
        </div>
        <p>© 2026 LOTTI HOTELS & RESORTS. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LottiSeoulTemplate;
