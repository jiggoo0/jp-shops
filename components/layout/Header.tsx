import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { LogOut, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui";
import { supabase } from "@/lib";
import { Session } from "@supabase/supabase-js";
interface HeaderProps {
  onOpenCheckout?: () => void;
}

export function Header({ onOpenCheckout }: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

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

          // ดึงข้อมูล Role จาก profiles
          const { data: profile } = await client
            .from("profiles")
            .select("role")
            .eq("id", session.user.id)
            .single();

          if (profile) {
            setUserRole(profile.role);
          }
        } else {
          setUserEmail(null);
          setUserRole(null);
        }
      } catch (error) {
        console.warn("Auth session check failed:", error);
      }
    };
    checkUser();

    // Listen for auth changes
    const {
      data: { subscription },
    } = client.auth.onAuthStateChange(
      async (_event: string, session: Session | null) => {
        if (session?.user) {
          setUserEmail(session.user.email ?? "Partner");

          const { data: profile } = await client
            .from("profiles")
            .select("role")
            .eq("id", session.user.id)
            .single();

          if (profile) {
            setUserRole(profile.role);
          }
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
  }, []);

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
    if (pathname !== "/") {
      router.push(`/#${id}`);
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || pathname !== "/"
          ? "bg-white/90 backdrop-blur-xl border-b border-gray-100 py-4 shadow-sm"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-3 group relative">
          <div className="relative w-14 h-14">
            <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl group-hover:bg-green-500/40 transition-all duration-700"></div>
            <Image
              src="/logo.svg"
              alt="JP Visual Docs Logo"
              width={56}
              height={56}
              className="w-full h-full relative z-10 drop-shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 ease-out"
            />
          </div>
          <div className="flex flex-col relative z-10">
            <span
              className={`text-2xl font-black tracking-tighter leading-none uppercase transition-colors duration-500 ${
                scrolled || pathname !== "/"
                  ? "text-gray-900"
                  : "text-gray-900 drop-shadow-[0_2px_10px_rgba(255,255,255,0.8)]"
              }`}
            >
              JP-VISUAL
              <span
                className={`${scrolled || pathname !== "/" ? "text-gray-400" : "text-gray-300"}`}
              >
                &DOCS
              </span>
            </span>
            <div className="flex items-center mt-1">
              <span className="text-[8px] font-black tracking-[0.3em] text-green-600 leading-none uppercase bg-green-50/50 px-1.5 py-0.5 rounded shadow-sm border border-green-100/50">
                By.เจ้าป่า
              </span>
            </div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center space-x-10 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
          <button
            onClick={() => scrollToSection("services")}
            className="hover:text-gray-900 transition-colors"
          >
            บริการ
          </button>
          <button
            onClick={() => scrollToSection("vifily")}
            className="hover:text-gray-900 transition-colors"
          >
            ระบบ Vifily
          </button>
          <Link href="/about" className="hover:text-gray-900 transition-colors">
            เกี่ยวกับเรา
          </Link>
          <button
            onClick={() => scrollToSection("contact")}
            className="hover:text-gray-900 transition-colors"
          >
            ติดต่อเรา
          </button>
        </nav>

        <div className="flex items-center space-x-4">
          {userEmail ? (
            <div className="flex items-center space-x-3 bg-gray-50 px-4 py-2 rounded-full border border-gray-100 shadow-inner group">
              <Link
                href={
                  userRole === "admin"
                    ? "/admin/dashboard"
                    : "/partner/dashboard"
                }
                className="flex items-center space-x-3"
              >
                <div className="hidden sm:flex flex-col text-right">
                  <span className="text-[8px] font-black uppercase tracking-widest text-gray-400 group-hover:text-green-600 transition-colors">
                    {userRole === "admin" ? "Admin" : "Partner"} Dashboard
                  </span>
                  <span className="text-[10px] font-bold text-gray-900">
                    {userEmail.split("@")[0]}
                  </span>
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center group-hover:bg-green-600 transition-colors">
                  <UserIcon className="w-4 h-4" />
                </div>
              </Link>
              <div className="w-px h-4 bg-gray-200"></div>
              <button
                onClick={handleLogout}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                disabled={isLoggingOut}
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
                className="font-black uppercase tracking-widest text-[10px]"
              >
                พาร์ทเนอร์
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
            className="rounded-full px-6 bg-gray-900 text-white font-black uppercase tracking-widest text-[10px] h-10 shadow-xl shadow-gray-200"
          >
            {userEmail ? "Dashboard" : "ประเมินด่วน"}
          </Button>
        </div>
      </div>
    </header>
  );
}
