import { createAdminClient } from "@/lib/supabase/admin";

/**
 * Checks the subscription status of a user.
 */
export const getSubscriptionStatus = async (userId?: string) => {
  if (!userId) return { isActive: false, status: "none" };

  try {
    const adminClient = createAdminClient();
    const { data, error } = await adminClient
      .from("users")
      .select("subscription_status, subscription_end_date, plan_id")
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
      planId: data.plan_id as string,
      expiry: expiry?.toLocaleDateString("th-TH"),
    };
  } catch (err) {
    console.error("Error checking subscription:", err);
    return { isActive: false, status: "error" };
  }
};
