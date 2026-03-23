import { planConfig, PlanType } from "../index";

export class BillingFactory {
  /**
   * Creates a Stripe line item from a plan ID
   */
  static createStripeItem(planId: PlanType) {
    const plan = planConfig[planId];
    if (!plan) throw new Error(`Invalid plan ID: ${planId}`);

    return {
      price_data: {
        currency: "thb",
        product_data: {
          name: `JP Visual Docs: ${plan.name}`,
          description: `สิทธิ์การเข้าใช้งานระบบ Vifily Standard เป็นเวลา ${plan.days} วัน`,
        },
        unit_amount: plan.price * 100,
      },
      quantity: 1,
    };
  }

  /**
   * Gets metadata for a plan
   */
  static getPlanMetadata(planId: PlanType) {
    const plan = planConfig[planId];
    return {
      planId,
      days: plan.days.toString(),
      type: "subscription",
    };
  }
}
