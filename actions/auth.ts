"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { calculateExpiryDate } from "@/lib";
import { type PlanType } from "@/lib/config/plans";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_mock_key", {
  apiVersion: "2026-02-25.clover" as Stripe.LatestApiVersion,
});

export async function registerUser(data: {
  email: string;
  password: string;
  fullName: string;
  phoneNumber: string;
  planId?: string;
}) {
  try {
    const adminClient = createAdminClient();

    // 1. Create User in Auth
    const { data: authData, error: authError } =
      await adminClient.auth.admin.createUser({
        email: data.email,
        password: data.password,
        email_confirm: true, // Auto-confirm for this flow
      });

    if (authError) {
      return { success: false, error: authError.message };
    }

    const userId = authData.user?.id;
    if (!userId) return { success: false, error: "ไม่สามารถสร้างบัญชีได้" };

    // 2. Upsert User with extra data including selected plan intent
    const { error: profileError } = await adminClient.from("users").upsert(
      {
        id: userId,
        full_name: data.fullName,
        phone_number: data.phoneNumber,
        subscription_status: "inactive", // เริ่มต้นด้วยสถานะ inactive แทน none
        plan_id: data.planId,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "id" },
    );

    if (profileError) {
      console.error("Profile update error:", profileError);
    }

    return { success: true, userId: userId };
  } catch (error) {
    console.error("Registration Error:", error);
    return { success: false, error: "เกิดข้อผิดพลาดไม่ทราบสาเหตุ" };
  }
}

export async function verifyPayment(
  sessionId: string,
  category: string,
  targetId: string,
) {
  try {
    if (!sessionId || !category || !targetId) return { success: false };

    // 1. Verify with Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== "paid") {
      return { success: false, error: "Payment not completed" };
    }

    const userId = session.metadata?.userId;
    const adminClient = createAdminClient();

    if (!userId) return { success: false };

    // 2. Update Transaction Record in `payments` table
    const { error: paymentError } = await adminClient
      .from("payments")
      .update({
        status: "paid",
        updated_at: new Date().toISOString(),
      })
      .eq("stripe_session_id", sessionId);

    if (paymentError) console.error("Payment log update error:", paymentError);

    // 3. Update User Benefits based on Category
    if (category === "subscription") {
      const newExpiry = calculateExpiryDate(targetId as PlanType);

      const { error } = await adminClient
        .from("users")
        .update({
          subscription_status: "active",
          subscription_end_date: newExpiry.toISOString(),
          plan_id: targetId,
          updated_at: new Date().toISOString(),
        })
        .eq("id", userId);

      if (error) throw error;
    } else if (category === "service") {
      // Logic for service-specific activation
      const caseName = session.metadata?.caseName || "General Service";
      const guestEmail = session.metadata?.guestEmail; // ดึงอีเมล Guest ที่ใช้รับงาน

      console.log(`[SERVICE PAID] ${targetId} for ${userId || "GUEST"}`);
      console.log(`Case: ${caseName}`);
      console.log(`Delivery Email: ${guestEmail || "Not Provided"}`);

      // Future: Trigger Email Service to send mock data/instructions to guestEmail
    }

    return { success: true };
  } catch (error) {
    console.error("Payment verification error:", error);
    return { success: false, error: "Verification failed" };
  }
}
