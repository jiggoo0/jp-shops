// 🌍 Shared & Client-side exports (Build-safe)
export * from "./config/plans";
export * from "./utils";

import { type PlanType, planConfig } from "./config/plans";

// Note: Do NOT export a global supabase instance here.
// Use createClient() from "@/lib/supabase/client" for Client Components
// or "@/lib/supabase/server" for Server Components to avoid Multiple Instance warnings.

/**
 * Utility to calculate expiry date based on plan type or number of days.
 */ export function calculateExpiryDate(
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
