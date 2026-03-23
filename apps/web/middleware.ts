import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return response;
  }

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return request.cookies.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        request.cookies.set({ name, value, ...options });
        response = NextResponse.next({
          request: {
            headers: request.headers,
          },
        });
        response.cookies.set({ name, value, ...options });
      },
      remove(name: string, options: CookieOptions) {
        request.cookies.set({ name, value: "", ...options });
        response = NextResponse.next({
          request: {
            headers: request.headers,
          },
        });
        response.cookies.set({ name, value: "", ...options });
      },
    },
  });

  // 🛡️ เช็ค Session และข้อมูลสิทธิ์ในครั้งเดียว (Single Query Strategy)
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");
  const isPartnerRoute = request.nextUrl.pathname.startsWith("/partner");

  if (user) {
    // ดึง Profile ข้อมูลเดียวที่จำเป็นสำหรับทุกเงื่อนไข
    const { data: profile } = await supabase
      .from("profiles")
      .select("role, subscription_status, subscription_end_date")
      .eq("id", user.id)
      .single();

    if (profile) {
      const now = new Date();
      const expiry = profile.subscription_end_date
        ? new Date(profile.subscription_end_date)
        : null;
      const isExpired =
        !expiry || expiry < now || profile.subscription_status !== "active";

      // 1. เส้นทาง Admin (Admin Only)
      if (isAdminRoute && profile.role !== "admin") {
        return NextResponse.redirect(
          new URL("/partner/dashboard", request.url),
        );
      }

      // 2. เส้นทาง Partner
      if (isPartnerRoute && profile.role !== "admin") {
        // หากไม่ใช่หน้า pricing และสถานะหมดอายุ ให้เด้งไปหน้า pricing
        if (
          !request.nextUrl.pathname.startsWith("/partner/pricing") &&
          isExpired
        ) {
          return NextResponse.redirect(
            new URL("/partner/pricing", request.url),
          );
        }
      }

      // 3. ป้องกัน User ที่มี Role ไปเข้าหน้า Login ซ้ำ (ถ้าเข้า /login ให้ไป Dashboard เลย)
      if (request.nextUrl.pathname === "/login") {
        if (profile.role === "admin")
          return NextResponse.redirect(
            new URL("/admin/dashboard", request.url),
          );
        return NextResponse.redirect(
          new URL("/partner/dashboard", request.url),
        );
      }
    }
  } else {
    // ถ้าไม่มี User และพยายามเข้าหน้า Admin หรือ Partner ให้ไป Login
    if (isAdminRoute || isPartnerRoute) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/partner/:path*",
    "/login",
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
