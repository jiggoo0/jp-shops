import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options });
          response = NextResponse.next({
            request: { headers: request.headers },
          });
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: "", ...options });
          response = NextResponse.next({
            request: { headers: request.headers },
          });
          response.cookies.set({ name, value: "", ...options });
        },
      },
    },
  );

  // สำคัญมาก: getUser() จะตรวจสอบ session จาก Cookies และ Database ทันที
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isLoggedIn = !!user;

  const nextUrl = request.nextUrl;
  const isAdminRoute = nextUrl.pathname.startsWith("/admin");
  const isPartnerRoute = nextUrl.pathname.startsWith("/partner");
  const isAuthRoute =
    nextUrl.pathname === "/login" || nextUrl.pathname === "/register";

  // 1. ถ้ายังไม่ Login และเข้าหน้าหวงห้าม (Admin/Partner) -> ไป Login
  if (!isLoggedIn && (isAdminRoute || isPartnerRoute)) {
    // ยกเว้นหน้า Pricing ให้เข้าได้เสมอ (เพื่อให้ลูกค้าดูราคาได้ก่อนสมัคร)
    if (nextUrl.pathname === "/partner/pricing") return response;
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  // 2. ถ้า Login แล้วจะเข้าหน้า Login/Register (Auth routes) -> ไปหน้ากลาง (Dashboard)
  if (isLoggedIn && isAuthRoute) {
    // ส่งไปที่หน้า Dashboard รวมเพื่อให้ Page เป็นคนตัดสินใจ Redirect ต่อ (Admin/Partner)
    return NextResponse.redirect(new URL("/partner/dashboard", nextUrl));
  }

  return response;
}

// กำหนดเส้นทางที่ proxy จะทำงาน (Matcher)
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
