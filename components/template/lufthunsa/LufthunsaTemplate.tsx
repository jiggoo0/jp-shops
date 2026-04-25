"use client";

/* @identity เจ้าป่า */
import React from "react";
import styles from "./LufthunsaTemplate.module.css";
import Image from "next/image";
import TravelInformation from "./_components/TravelInformation";
import TravelPromotions from "./_components/TravelPromotions";

interface TemplateProps {
  view?: string[];
}

const LufthunsaTemplate: React.FC<TemplateProps> = () => {
  const [activeTab, setActiveTab] = React.useState("Flights");

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <div className={styles.crane}></div>
          <span className={styles.brandName}>LUFTHUNSA</span>
        </div>
        <nav className={styles.topNav}>
          <ul>
            <li className={styles.activeNav}>Book & Manage</li>
            <li>Prepare for travel</li>
            <li>Information</li>
          </ul>
        </nav>
        <div className={styles.userSection}>
          <button className={styles.loginBtn}>Login</button>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.hero}>
          <Image
            src="https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?q=80&w=2069"
            alt="Lufthunsa Hero"
            fill
            priority
            className={styles.heroImage}
          />
          <div className={styles.heroText}>
            <h1>Say yes to the world</h1>
          </div>
          <div className={styles.bookingWidget}>
            <div className={styles.widgetHeader}>
              {["Flights", "Hotel", "Car"].map((tab) => (
                <button
                  key={tab}
                  className={activeTab === tab ? styles.active : ""}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className={styles.widgetForm}>
              {activeTab === "Flights" ? (
                <>
                  <div className={styles.inputBox}>
                    <label>From</label>
                    <input type="text" defaultValue="Frankfurt (FRA)" />
                  </div>
                  <div className={styles.inputBox}>
                    <label>To</label>
                    <input type="text" placeholder="Where to?" />
                  </div>
                  <button className={styles.searchBtn}>Search flights</button>
                </>
              ) : (
                <div className="flex w-full items-center justify-between gap-4">
                  <div className={styles.inputBox} style={{ flex: 1 }}>
                    <label>
                      {activeTab === "Hotel"
                        ? "Destination"
                        : "Pick-up location"}
                    </label>
                    <input
                      type="text"
                      placeholder={
                        activeTab === "Hotel"
                          ? "City, hotel, etc."
                          : "Airport or city"
                      }
                    />
                  </div>
                  <button
                    className={styles.searchBtn}
                    style={{ marginTop: 22 }}
                  >
                    Search {activeTab.toLowerCase()}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <TravelInformation />
        <TravelPromotions />
      </main>

      <footer className={styles.footer}>
        <div className="mx-auto mb-12 grid max-w-4xl grid-cols-2 gap-8 text-left md:grid-cols-4">
          <div>
            <h5 className="mb-4 font-bold text-[#001b48]">Support</h5>
            <ul className="space-y-2 text-xs text-slate-500">
              <li>Help Center</li>
              <li>Contact</li>
              <li>Feedback</li>
            </ul>
          </div>
          <div>
            <h5 className="mb-4 font-bold text-[#001b48]">Corporate</h5>
            <ul className="space-y-2 text-xs text-slate-500">
              <li>About Lufthunsa Group</li>
              <li>Sustainability</li>
              <li>Careers</li>
            </ul>
          </div>
        </div>
        <p className="border-t pt-8">
          © Lufthunsa Group 2026 - Template for documentation
        </p>
      </footer>
    </div>
  );
};

export default LufthunsaTemplate;
