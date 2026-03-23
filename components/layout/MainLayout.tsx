"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { ServiceId } from "@/lib";

const AIAssistant = dynamic(
  () =>
    import("@/components/shared/AIAssistant").then((mod) => mod.AIAssistant),
  { ssr: false },
);
const CheckoutModal = dynamic(
  () =>
    import("@/components/shared/CheckoutModal").then(
      (mod) => mod.CheckoutModal,
    ),
  { ssr: false },
);

export function MainLayout({ children }: { children: React.ReactNode }) {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [initialService, setInitialService] = useState<ServiceId>("loan");
  const pathname = usePathname();

  useEffect(() => {
    const handleOpenCheckout = (e: Event | CustomEvent) => {
      if ("detail" in e && e.detail?.serviceId) {
        setInitialService(e.detail.serviceId);
      }
      setIsCheckoutOpen(true);
    };

    window.addEventListener("open-checkout", handleOpenCheckout);
    return () =>
      window.removeEventListener("open-checkout", handleOpenCheckout);
  }, []);

  // Pages that don't need header/footer (e.g. specialized admin views or very minimal pages)
  const isMinimalPage =
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/admin");

  return (
    <div className="flex flex-col min-h-screen">
      {!isMinimalPage && (
        <Header onOpenCheckout={() => setIsCheckoutOpen(true)} />
      )}

      <main className="flex-grow">{children}</main>

      {!isMinimalPage && <Footer />}

      <AnimatePresence>
        {isCheckoutOpen && (
          <CheckoutModal
            onClose={() => setIsCheckoutOpen(false)}
            initialServiceId={initialService}
          />
        )}
      </AnimatePresence>

      {!pathname.startsWith("/admin") && <AIAssistant />}
    </div>
  );
}
