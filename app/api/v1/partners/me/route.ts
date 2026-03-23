import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { logApiActivity } from "@/lib/utils";

export async function GET() {
  const startTime = Date.now();
  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: "", ...options });
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    await logApiActivity({
      endpoint: "/api/v1/partners/me",
      method: "GET",
      statusCode: 401,
      durationMs: Date.now() - startTime,
    });
    return NextResponse.json(
      { status: "error", message: "Unauthorized" },
      { status: 401 },
    );
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) {
    await logApiActivity({
      userId: user.id,
      endpoint: "/api/v1/partners/me",
      method: "GET",
      statusCode: 404,
      durationMs: Date.now() - startTime,
    });
    return NextResponse.json(
      { status: "error", message: "Profile not found" },
      { status: 404 },
    );
  }

  const responseData = {
    status: "success",
    data: {
      id: profile.id,
      attributes: profile,
    },
    meta: {
      timestamp: new Date().toISOString(),
    },
  };

  await logApiActivity({
    userId: user.id,
    endpoint: "/api/v1/partners/me",
    method: "GET",
    statusCode: 200,
    responsePayload: responseData,
    durationMs: Date.now() - startTime,
  });

  return NextResponse.json(responseData);
}
