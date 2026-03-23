import { createClient } from "@supabase/supabase-js";
import * as zod from "zod";

export * from "./supabase";

export type PlanType = "1_day" | "7_days" | "15_days" | "30_days" | "365_days";

export const planConfig: Record<
  PlanType,
  { name: string; label: string; price: number; days: number }
> = {
  "1_day": { name: "1 Day Pass", label: "รายวัน", price: 199, days: 1 },
  "7_days": { name: "7 Days Pass", label: "รายสัปดาห์", price: 890, days: 7 },
  "15_days": {
    name: "15 Days Pass",
    label: "ครึ่งเดือน",
    price: 1500,
    days: 15,
  },
  "30_days": { name: "30 Days Pass", label: "รายเดือน", price: 2500, days: 30 },
  "365_days": { name: "VIP Elite", label: "รายปี", price: 19900, days: 365 },
};

export function calculateExpiryDate(
  daysOrPlan: number | PlanType,
  startDate?: Date,
): Date {
  const date = startDate || new Date();
  let days = 30;
  if (typeof daysOrPlan === "number") {
    days = daysOrPlan;
  } else if (planConfig[daysOrPlan as PlanType]) {
    days = planConfig[daysOrPlan as PlanType].days;
  }
  date.setDate(date.getDate() + days);
  return date;
}

export const documentSchema = zod.object({
  ownerName: zod.string(),
  documentType: zod.string(),
  issuedDate: zod.string(),
  expiryDate: zod.string(),
  status: zod.string().default("Verified"),
  issuer: zod.string(),
});

export const getSubscriptionStatus = async (userId?: string) => {
  if (!userId || !supabaseAdmin) return { isActive: false, status: "none" };

  try {
    const { data, error } = await supabaseAdmin
      .from("profiles")
      .select("subscription_status, subscription_end_date")
      .eq("id", userId)
      .single();

    if (error || !data) return { isActive: false, status: "none" };

    const now = new Date();
    const expiry = data.subscription_end_date
      ? new Date(data.subscription_end_date)
      : null;

    const isActive =
      data.subscription_status === "active" && (!expiry || expiry > now);

    return {
      isActive,
      status: data.subscription_status as string,
      expiry: expiry?.toLocaleDateString("th-TH"),
    };
  } catch (err) {
    console.error("Error checking subscription:", err);
    return { isActive: false, status: "error" };
  }
};

/**
 * Proxy Pattern: Wraps an action with a subscription check
 */
export async function withSubscriptionGuard<T>(
  userId: string,
  action: () => Promise<T>,
): Promise<{ success: boolean; data?: T; error?: string }> {
  const sub = await getSubscriptionStatus(userId);
  if (!sub.isActive) {
    return {
      success: false,
      error: "Subscription required or expired. Please upgrade your plan.",
    };
  }
  try {
    const result = await action();
    return { success: true, data: result };
  } catch (error: unknown) {
    return {
      success: false,
      error: (error as Error).message || "Action failed",
    };
  }
}

export type DocumentInput = zod.infer<typeof documentSchema>;

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseServiceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "";

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
