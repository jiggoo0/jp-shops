import { createClient } from "@supabase/supabase-js";
import * as zod from "zod";

export * from "./supabase";

export type PlanType = "free" | "starter" | "pro" | "enterprise" | "monthly";

export const planConfig: Record<
  PlanType,
  { name: string; label: string; price: number; days: number }
> = {
  free: { name: "Free", label: "FREE", price: 0, days: 0 },
  starter: { name: "Starter", label: "STARTER", price: 900, days: 30 },
  pro: { name: "Pro", label: "PRO", price: 2900, days: 365 },
  enterprise: {
    name: "Enterprise",
    label: "ENTERPRISE",
    price: 9900,
    days: 365,
  },
  monthly: { name: "Monthly", label: "MONTHLY", price: 990, days: 30 },
};

export function calculateExpiryDate(
  daysOrPlan: PlanType | number,
  startDate?: string | number | Date,
): Date {
  const date = new Date(startDate || Date.now());
  if (typeof daysOrPlan === "number") {
    date.setDate(date.getDate() + daysOrPlan);
  } else if (typeof daysOrPlan === "string" && daysOrPlan in planConfig) {
    const days = planConfig[daysOrPlan as PlanType].days;
    date.setDate(date.getDate() + days);
  } else {
    // Default fallback
    date.setMonth(date.getMonth() + 1);
  }
  return date;
}

export const documentSchema = zod.object({
  type: zod.string(),
  companyName: zod.string().optional(),
  employeeName: zod.string(),
  position: zod.string(),
  yearsOfService: zod.number().optional(),
  baseSalary: zod.number(),
  issueDate: zod.string(),
  otherEarnings: zod.record(zod.number()).optional(),
  deductions: zod.record(zod.number()).optional(),
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getSubscriptionStatus = async (_userId?: string) => ({
  isActive: true,
  status: "active",
});

export type DocumentInput = {
  type: string;
  companyName?: string;
  employeeName: string;
  position: string;
  yearsOfService?: number;
  baseSalary: number;
  issueDate: string;
  otherEarnings?: Record<string, number>;
  deductions?: Record<string, number>;
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
