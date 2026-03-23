export type PlanType = "1_day" | "7_days" | "15_days" | "30_days" | "365_days";
export type ServiceId = "doc_verification" | "ai_assistant";
export type PaymentCategory = "subscription" | "service";

export interface PlanConfig {
  name: string;
  label: string;
  price: number;
  days: number;
}

export interface ServiceConfig {
  name: string;
  price: number;
  description: string;
}
