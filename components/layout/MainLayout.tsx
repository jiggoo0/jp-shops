"use client";

import { useState } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { AIAssistant } from "@/components/AIAssistant";
import { CheckoutModal } from "@/components/CheckoutModal";
import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export function MainLayout({ children }: { children: React.ReactNode }) {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const pathname = usePathname();

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
          <CheckoutModal onClose={() => setIsCheckoutOpen(false)} />
        )}
      </AnimatePresence>

      {!pathname.startsWith("/admin") && <AIAssistant />}
    </div>
  );
}
