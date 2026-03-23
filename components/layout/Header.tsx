"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, User as UserIcon, Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui";
import { createClient } from "@/lib/supabase/client";
import { Session } from "@supabase/supabase-js";

interface HeaderProps {
  onOpenCheckout?: () => void;
}

export function Header({ onOpenCheckout }: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname() || "/";
  const supabase = createClient();
  const [scrolled, setScrolled] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { label: "หน้าหลัก", href: "/", type: "link" },
    { label: "บริการ", id: "services", type: "scroll" },
    { label: "VIFILY", id: "vifily", type: "scroll" },
    { label: "บทความ", href: "/blog", type: "link" },
    { label: "เกี่ยวกับเรา", href: "/about", type: "link" },
    { label: "ติดต่อเรา", id: "contact", type: "scroll" },
  ];

  useEffect(() => {
    const client = supabase;
    if (!client || !client.auth) return;

    const checkUser = async () => {
      try {
        const {
          data: { session },
        } = await client.auth.getSession();
        if (session?.user) {
          setUserEmail(session.user.email ?? "Partner");
          const { data: userProfile } = await client
            .from("users")
            .select("role")
            .eq("id", session.user.id)
            .single();
          if (userProfile) setUserRole(userProfile.role);
        }
      } catch (error) {
        console.warn("Auth session check failed:", error);
      }
    };
    checkUser();

    const {
      data: { subscription },
    } = client.auth.onAuthStateChange(
      async (_event: string, session: Session | null) => {
        if (session?.user) {
          setUserEmail(session.user.email ?? "Partner");
          const { data: userProfile } = await client
            .from("users")
            .select("role")
            .eq("id", session.user.id)
            .single();
          if (userProfile) setUserRole(userProfile.role);
        } else {
          setUserEmail(null);
          setUserRole(null);
        }
      },
    );

    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (subscription) subscription.unsubscribe();
    };
  }, [supabase]);

  const handleLogout = async () => {
    if (!supabase || !supabase.auth) return;
    setIsLoggingOut(true);
    try {
      await supabase.auth.signOut();
      setUserEmail(null);
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);

    if (pathname !== "/") {
      // ถ้าไม่ได้อยู่หน้าแรก ให้กลับไปหน้าแรกพร้อม hash
      router.push(`/#${id}`);
      return;
    }

    // ถ้าอยู่หน้าแรกอยู่แล้ว ให้เลื่อนไปยังส่วนนั้น
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // ปรับชดเชยความสูงของ Navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleHomeClick = (e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || pathname !== "/" || mobileMenuOpen
          ? "bg-white border-b border-gray-100 py-4 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.08)]"
          : "bg-white/40 backdrop-blur-md py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Brand Section */}
        <Link
          href="/"
          onClick={handleHomeClick}
          className="flex items-center space-x-4 group relative z-50"
        >
          <div className="relative w-12 h-12 md:w-16 md:h-16">
            <div className="absolute inset-0 bg-green-500/20 rounded-full blur-2xl group-hover:bg-green-500/40 transition-all duration-700"></div>
            <Image
              src="/logo.svg"
              alt="JP Visual Docs Logo"
              width={64}
              height={64}
              className="w-full h-full relative z-10 drop-shadow-[0_5px_15px_rgba(0,0,0,0.1)] group-hover:scale-110 transition-all duration-500"
            />
          </div>
          <div className="flex flex-col relative z-10 text-left">
            <span className="text-2xl md:text-3xl font-black tracking-tighter leading-none uppercase text-gray-900">
              JP-VISUAL
              <span className="text-gray-400 group-hover:text-green-600 transition-colors">
                &DOCS
              </span>
            </span>
            <div className="flex items-center mt-1.5">
              <span className="text-[9px] font-black tracking-[0.4em] text-white leading-none uppercase bg-gray-900 px-2 py-1 rounded shadow-lg border border-gray-800">
                By.เจ้าป่า
              </span>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-2">
          {menuItems.map((item) => (
            <div key={item.label} className="relative">
              {item.type === "link" ? (
                <Link
                  href={item.href!}
                  onClick={
                    item.href === "/"
                      ? handleHomeClick
                      : () => setMobileMenuOpen(false)
                  }
                  className={`px-6 py-3 text-[11px] font-black uppercase tracking-[0.25em] rounded-2xl transition-all duration-300 ${
                    (item.href === "/" && pathname === "/") ||
                    (item.href !== "/" && pathname.startsWith(item.href!))
                      ? "text-green-600 bg-green-50/50"
                      : "text-gray-900 hover:text-green-600 hover:bg-gray-50"
                  }`}
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  onClick={() => scrollToSection(item.id!)}
                  className="px-6 py-3 text-[11px] font-black uppercase tracking-[0.25em] text-gray-900 hover:text-green-600 hover:bg-gray-50 rounded-2xl transition-all duration-300"
                >
                  {item.label}
                </button>
              )}
            </div>
          ))}
        </nav>

        {/* Action Suite & Mobile Toggle */}
        <div className="flex items-center space-x-4 relative z-50">
          {userEmail ? (
            <div className="flex items-center space-x-3 bg-white px-3 py-1.5 rounded-2xl border border-gray-200 shadow-sm">
              <Link
                href={
                  userRole === "admin"
                    ? "/admin/dashboard"
                    : "/partner/dashboard"
                }
                className="flex items-center space-x-2"
              >
                <div className="w-8 h-8 rounded-xl bg-gray-900 text-white flex items-center justify-center">
                  <UserIcon className="w-4 h-4" />
                </div>
              </Link>
              <button
                onClick={handleLogout}
                className="p-1.5 text-gray-400 hover:text-red-500 transition-all"
              >
                <LogOut
                  className={`w-4 h-4 ${isLoggingOut ? "animate-pulse" : ""}`}
                />
              </button>
            </div>
          ) : (
            <Link href="/login" className="hidden sm:block">
              <Button
                variant="ghost"
                size="sm"
                className="font-black uppercase tracking-[0.2em] text-[10px] text-gray-900"
              >
                Login
              </Button>
            </Link>
          )}

          <Button
            size="sm"
            onClick={() =>
              userEmail
                ? router.push("/partner/dashboard")
                : onOpenCheckout
                  ? onOpenCheckout()
                  : router.push("/register")
            }
            className="rounded-full px-6 bg-gray-900 text-white font-black uppercase tracking-[0.2em] text-[10px] h-10 shadow-xl hover:bg-green-600 transition-all"
          >
            {userEmail ? "Portal" : "ประเมินด่วน"}
          </Button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-3 bg-gray-900 rounded-2xl text-white shadow-xl"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Overlay: Full Opacity */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-2xl z-40 overflow-hidden"
          >
            <div className="p-8 flex flex-col space-y-4">
              {menuItems.map((item) => (
                <div key={item.label}>
                  {item.type === "link" ? (
                    <Link
                      href={item.href!}
                      onClick={
                        item.href === "/"
                          ? handleHomeClick
                          : () => setMobileMenuOpen(false)
                      }
                      className={`flex items-center justify-between p-5 rounded-3xl text-sm font-black uppercase tracking-[0.2em] transition-all ${
                        (item.href === "/" && pathname === "/") ||
                        (item.href !== "/" && pathname.startsWith(item.href!))
                          ? "bg-green-50 text-green-600"
                          : "bg-gray-50 text-gray-900"
                      }`}
                    >
                      <span>{item.label}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  ) : (
                    <button
                      onClick={() => scrollToSection(item.id!)}
                      className="flex items-center justify-between p-5 rounded-3xl text-sm font-black uppercase tracking-[0.2em] bg-gray-50 text-gray-900 w-full text-left"
                    >
                      <span>{item.label}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
