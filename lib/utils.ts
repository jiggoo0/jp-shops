import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { createAdminClient } from "./supabase/admin";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Logs API activity to the database
 */
export async function logApiActivity(params: {
  userId?: string;
  endpoint: string;
  method: string;
  statusCode: number;
  requestPayload?: unknown;
  responsePayload?: unknown;
  durationMs?: number;
}) {
  try {
    const adminClient = createAdminClient();
    await adminClient.from("api_logs").insert([
      {
        user_id: params.userId,
        endpoint: params.endpoint,
        method: params.method,
        status_code: params.statusCode,
        request_payload: params.requestPayload,
        response_payload: params.responsePayload,
        duration_ms: params.durationMs,
      },
    ]);
  } catch (error) {
    console.error("Failed to log API activity:", error);
  }
}
