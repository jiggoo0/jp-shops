// 🌍 Shared & Client-side exports (Build-safe)
export * from "./config/plans";
export * from "./utils";

import { createClient } from "@supabase/supabase-js";
import { type PlanType, planConfig } from "./config/plans";

// 📦 Backward Compatibility instances (Client-safe)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Note: supabaseAdmin and Server-only functions (like getSubscriptionStatus)
// should be imported directly from "@/lib/supabase/admin" or "@/lib/services/subscription"
// to avoid build errors in Client Components.

/**
 * Utility to calculate expiry date based on plan type or number of days.
 */
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
