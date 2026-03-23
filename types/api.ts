export interface SubscriptionStatusResponse {
  isActive: boolean;
  status: string;
  planId?: string;
  expiry?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
