/* @identity เจ้าป่า */
"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { title: "เกี่ยวกับเรา", href: "/about" },
    { title: "บริการ", href: "/#services" },
    { title: "เทมเพลตจำลอง", href: "/templates" },
    { title: "บล็อก", href: "/blog" },
    { title: "FAQ", href: "/#faq" },
  ];

  return (
    <nav className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight text-primary">
            JP-VISUAL&DOCS
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {link.title}
            </Link>
          ))}
          <Link
            href="/contact"
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90"
          >
            ติดต่อเรา
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute left-0 top-16 w-full overflow-hidden border-b bg-background shadow-xl md:hidden"
          >
            <div className="flex flex-col p-4">
              {navLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="flex items-center justify-between border-b border-slate-50 py-4 text-lg font-semibold hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  {link.title}
                  <ChevronRight size={18} className="text-slate-400" />
                </Link>
              ))}
              <Link
                href="/contact"
                className="mt-4 flex w-full items-center justify-center rounded-xl bg-primary py-4 text-center font-bold text-white"
                onClick={() => setIsOpen(false)}
              >
                ติดต่อเรา
              </Link>
              <div className="mt-8 pb-4 text-center">
                <span className="text-sm font-medium italic text-primary">
                  &quot;เจ้าป่า&quot;
                </span>
                <p className="text-muted-foreground mt-1 text-xs">
                  Chief Strategic Architect
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
