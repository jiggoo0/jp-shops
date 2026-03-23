import {
  planConfig,
  PlanType,
  serviceConfig,
  ServiceId,
  PaymentCategory,
} from "../index";

export interface UnifiedBillingItem {
  id: PlanType | ServiceId;
  name: string;
  label?: string;
  price: number;
  formattedPrice: string;
  description: string;
  category: PaymentCategory;
  days?: number;
}

export class BillingFactory {
  /**
   * Returns all available subscription plans
   */
  static getAllPlans(): UnifiedBillingItem[] {
    return (Object.keys(planConfig) as PlanType[]).map((id) => {
      const plan = planConfig[id];
      return {
        id,
        name: plan.name,
        label: plan.label,
        price: plan.price,
        formattedPrice: `฿${plan.price.toLocaleString()}`,
        description: plan.description,
        category: "subscription",
        days: plan.days,
      };
    });
  }

  /**
   * Returns all available individual services
   */
  static getAllServices(): UnifiedBillingItem[] {
    return (Object.keys(serviceConfig) as ServiceId[]).map((id) => {
      const service = serviceConfig[id];
      return {
        id,
        name: service.name,
        price: service.price,
        formattedPrice: `฿${service.price.toLocaleString()}`,
        description: service.description,
        category: "service",
      };
    });
  }

  /**
   * Gets specific item details by ID and Category
   */
  static getItemDetails(
    id: PlanType | ServiceId,
    category: PaymentCategory,
  ): UnifiedBillingItem | null {
    if (category === "subscription") {
      const plan = planConfig[id as PlanType];
      if (!plan) return null;
      return {
        id,
        name: plan.name,
        label: plan.label,
        price: plan.price,
        formattedPrice: `฿${plan.price.toLocaleString()}`,
        description: plan.description,
        category: "subscription",
        days: plan.days,
      };
    } else {
      const service = serviceConfig[id as ServiceId];
      if (!service) return null;
      return {
        id,
        name: service.name,
        price: service.price,
        formattedPrice: `฿${service.price.toLocaleString()}`,
        description: service.description,
        category: "service",
      };
    }
  }

  /**
   * Creates a Stripe line item from a plan or service ID
   */
  static createStripeItem(id: PlanType | ServiceId, category: PaymentCategory) {
    const item = this.getItemDetails(id, category);
    if (!item)
      throw new Error(`Invalid item ID: ${id} for category: ${category}`);

    const productName =
      category === "subscription"
        ? `JP Visual Docs: ${item.name}`
        : `Service: ${item.name}`;

    const productDescription =
      category === "subscription"
        ? `สิทธิ์การเข้าใช้งานระบบ Vifily Standard เป็นเวลา ${item.days} วัน`
        : item.description;

    return {
      price_data: {
        currency: "thb",
        product_data: {
          name: productName,
          description: productDescription,
        },
        unit_amount: item.price * 100,
      },
      quantity: 1,
    };
  }

  /**
   * Gets metadata for a transaction
   */
  static getPlanMetadata(id: PlanType | ServiceId, category: PaymentCategory) {
    const item = this.getItemDetails(id, category);
    if (!item) return { targetId: id, type: category };

    return {
      targetId: id,
      days: String(item.days || "0"),
      type: category,
    };
  }
}
