"use server";

import { supabaseAdmin, PlanType, calculateExpiryDate } from "@/lib";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_mock_key", {
  apiVersion: "2026-02-25.clover" as Stripe.LatestApiVersion,
});

export async function registerUser(data: {
  email: string;
  password: string;
  fullName: string;
  phoneNumber: string;
}) {
  try {
    if (!supabaseAdmin) {
      return { success: false, error: "ระบบขัดข้อง (Admin Config Error)" };
    }

    // 1. Create User in Auth
    const { data: authData, error: authError } =
      await supabaseAdmin.auth.admin.createUser({
        email: data.email,
        password: data.password,
        email_confirm: true, // Auto-confirm for this flow
      });

    if (authError) {
      return { success: false, error: authError.message };
    }

    const userId = authData.user?.id;
    if (!userId) return { success: false, error: "ไม่สามารถสร้างบัญชีได้" };

    // 2. Update Profile with extra data (Trigger already created the row)
    const { error: profileError } = await supabaseAdmin
      .from("profiles")
      .update({
        full_name: data.fullName,
        phone_number: data.phoneNumber,
        subscription_status: "none", // Force none initially
      })
      .eq("id", userId);

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
  planId: PlanType | string,
) {
  try {
    if (!sessionId || !planId) return { success: false };

    // 1. Verify with Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== "paid") {
      return { success: false, error: "Payment not completed" };
    }

    // 2. Get current user
    const cookieStore = await cookies();
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey || !supabaseAdmin)
      return { success: false };

    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Cookie: cookieStore.toString() } },
    });

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return { success: false, error: "Not logged in" };

    // 3. Update subscription status
    const newExpiry = calculateExpiryDate(planId as PlanType);

    const { error } = await supabaseAdmin
      .from("profiles")
      .update({
        subscription_status: "active",
        subscription_end_date: newExpiry.toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id);

    if (error) throw error;

    return { success: true };
  } catch (error) {
    console.error("Payment verification error:", error);
    return { success: false, error: "Verification failed" };
  }
}
