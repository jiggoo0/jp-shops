"use server";

import { supabaseAdmin, calculateExpiryDate, type PlanType } from "@/lib";
import { revalidatePath } from "next/cache";

export async function grantSubscription(email: string, plan: PlanType) {
  try {
    if (!supabaseAdmin) {
      return {
        success: false,
        error: "ระบบแอดมินขัดข้อง (Admin Config Error)",
      };
    }
    // 1. ค้นหา User จาก Email
    const { data: userData, error: userError } = await supabaseAdmin
      .from("profiles")
      .select("id, subscription_end_date")
      .eq("email", email)
      .single();

    if (userError || !userData) {
      return { success: false, error: "ไม่พบผู้ใช้งานรายนี้ในระบบ" };
    }

    // 2. คำนวณวันหมดอายุใหม่
    const newExpiry = calculateExpiryDate(plan, userData.subscription_end_date);

    // 3. อัปเดตข้อมูลพาร์ทเนอร์
    const { error: updateError } = await supabaseAdmin
      .from("profiles")
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
      success: true,
      message: `ต่ออายุสำเร็จ! วันหมดอายุใหม่คือ: ${newExpiry.toLocaleDateString("th-TH")}`,
    };
  } catch (error) {
    console.error("Admin Action Error:", error);
    return { success: false, error: "เกิดข้อผิดพลาดในการต่ออายุ" };
  }
}
