"use server";

import { calculateExpiryDate, type PlanType } from "@/lib";
import { createAdminClient } from "@/lib/supabase/admin";
import { withAdminGuard } from "@/lib/services/guard";
import { revalidatePath } from "next/cache";

export async function grantSubscription(email: string, plan: PlanType) {
  // Execute with Admin Guard (Critical Security Check)
  const result = await withAdminGuard(async () => {
    const adminClient = createAdminClient();

    // 1. ค้นหา User จาก Email
    const { data: userData, error: userError } = await adminClient
      .from("users")
      .select("id, subscription_end_date")
      .eq("email", email)
      .single();

    if (userError || !userData) {
      throw new Error("ไม่พบผู้ใช้งานรายนี้ในระบบ");
    }

    // 2. คำนวณวันหมดอายุใหม่
    const newExpiry = calculateExpiryDate(plan, userData.subscription_end_date);

    // 3. อัปเดตข้อมูลพาร์ทเนอร์
    const { error: updateError } = await adminClient
      .from("users")
      .update({
        subscription_status: "active",
        subscription_end_date: newExpiry.toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", userData.id);

    if (updateError) {
      throw updateError;
    }

    revalidatePath("/admin/users");
    return {
      message: `ต่ออายุสำเร็จ! วันหมดอายุใหม่คือ: ${newExpiry.toLocaleDateString("th-TH")}`,
    };
  });

  if (!result.success) {
    return { success: false, error: result.error };
  }

  return { success: true, message: result.data?.message };
}
