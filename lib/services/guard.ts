import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import { getSubscriptionStatus } from "./subscription";

/**
 * Memoized helper to get the current user.
 * Prevents multiple auth calls in the same request.
 */
export const getCachedUser = cache(async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
});

/**
 * Memoized helper to get subscription status.
 */
export const getCachedSubscription = cache(async (userId: string) => {
  return await getSubscriptionStatus(userId);
});

/**
 * Memoized helper to get user role.
 */
export const getCachedUserRole = cache(async (userId: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("users")
    .select("role")
    .eq("id", userId)
    .single();

  if (error) return null;
  return data?.role;
});

/**
 * Proxy Pattern: Wraps an action with a subscription check.
 * Use this for Partner-level features.
 */
export async function withSubscriptionGuard<T>(
  action: (userId: string) => Promise<T>,
): Promise<{ success: boolean; data?: T; error?: string }> {
  const user = await getCachedUser();

  if (!user) {
    return { success: false, error: "Authentication required." };
  }

  const sub = await getCachedSubscription(user.id);
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
  const user = await getCachedUser();

  if (!user) {
    return { success: false, error: "Authentication required." };
  }

  // Check role using memoized helper
  const role = await getCachedUserRole(user.id);

  if (role !== "admin") {
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
