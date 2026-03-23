import { createClient } from "@/lib/supabase/server";
import { getSubscriptionStatus } from "./subscription";

/**
 * Proxy Pattern: Wraps an action with a subscription check.
 * Use this for Partner-level features.
 */
export async function withSubscriptionGuard<T>(
  action: (userId: string) => Promise<T>,
): Promise<{ success: boolean; data?: T; error?: string }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Authentication required." };
  }

  const sub = await getSubscriptionStatus(user.id);
  if (!sub.isActive) {
    return {
      success: false,
      error: "Subscription required or expired. Please upgrade your plan.",
    };
  }

  try {
    const result = await action(user.id);
    return { success: true, data: result };
  } catch (error: unknown) {
    return {
      success: false,
      error: (error as Error).message || "Action failed",
    };
  }
}

/**
 * Proxy Pattern: Wraps an action with an Admin check.
 * Use this for critical administrative features.
 */
export async function withAdminGuard<T>(
  action: (userId: string) => Promise<T>,
): Promise<{ success: boolean; data?: T; error?: string }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Authentication required." };
  }

  // Check role from single source of truth (users table)
  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("role")
    .eq("id", user.id)
    .single();

  if (userError || userData?.role !== "admin") {
    return {
      success: false,
      error: "Unauthorized access. Admin role required.",
    };
  }

  try {
    const result = await action(user.id);
    return { success: true, data: result };
  } catch (error: unknown) {
    return {
      success: false,
      error: (error as Error).message || "Admin Action failed",
    };
  }
}
