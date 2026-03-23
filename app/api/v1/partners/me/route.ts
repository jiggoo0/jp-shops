import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { logApiActivity } from "@/lib/utils";

export async function GET() {
  const startTime = Date.now();
  const supabase = await createClient();

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
    .from("users")
    .select(
      "id, full_name, role, subscription_status, subscription_end_date, plan_id",
    )
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
