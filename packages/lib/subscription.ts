import { supabase } from "./db";
import { z } from "zod";

export type PlanType = "daily" | "15days" | "monthly" | "yearly";

export const planConfig = {
  daily: { days: 1, label: "Starter (1 Day)" },
  "15days": { days: 15, label: "Runner (15 Days)" },
  monthly: { days: 30, label: "Pro (1 Month)" },
  yearly: { days: 365, label: "VIP Elite (1 Year)" },
};

/**
 * คำนวณวันหมดอายุใหม่ตามประเภทแพ็กเกจ
 * @param currentEndDate วันหมดอายุเดิม (ถ้ามี)
 * @param plan ประเภทแพ็กเกจ
 */
export function calculateExpiryDate(
  currentEndDate: Date | string | null,
  plan: PlanType,
): Date {
  const baseDate =
    currentEndDate && new Date(currentEndDate) > new Date()
      ? new Date(currentEndDate)
      : new Date();

  const daysToAdd = planConfig[plan].days;
  const newDate = new Date(baseDate);
  newDate.setDate(newDate.getDate() + daysToAdd);

  return newDate;
}

/**
 * ตรวจสอบสถานะการเป็นสมาชิกของพาร์ทเนอร์
 * @param userId UUID ของพาร์ทเนอร์
 */
export async function getSubscriptionStatus(userId: string) {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("subscription_status, subscription_end_date, role")
      .eq("id", userId)
      .single();

    if (error || !data)
      return { status: "none", isActive: false, role: "partner" };

    const now = new Date();
    const endDate = data.subscription_end_date
      ? new Date(data.subscription_end_date)
      : null;

    // ตรวจสอบสถานะและวันหมดอายุ
    const isActive =
      data.subscription_status === "active" && endDate && endDate > now;

    return {
      status: data.subscription_status,
      endDate: data.subscription_end_date,
      isActive: !!isActive,
      role: data.role || "partner",
    };
  } catch (error) {
    console.error("Subscription check failed:", error);
    return { status: "none", isActive: false, role: "partner" };
  }
}

/**
 * Zod Schema สำหรับตรวจสอบ Input การต่ออายุ (สำหรับแอดมิน)
 */
export const subscriptionGrantSchema = z.object({
  email: z.string().email(),
  plan: z.enum(["daily", "15days", "monthly", "yearly"]),
});
