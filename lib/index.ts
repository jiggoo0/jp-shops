import { createClient } from '@supabase/supabase-js'
import * as zod from 'zod';

export * from './supabase'

export type PlanType = 'free' | 'starter' | 'pro' | 'enterprise' | 'monthly'

export const planConfig: Record<PlanType, { name: string, label: string, price: number, days: number }> = {
  free: { name: 'Free', label: 'ฟรี', price: 0, days: 0 },
  starter: { name: 'Starter', label: 'เริ่มต้น', price: 900, days: 30 },
  pro: { name: 'Pro', label: 'มืออาชีพ', price: 2900, days: 30 },
  enterprise: { name: 'Enterprise', label: 'องค์กร', price: 9900, days: 365 },
  monthly: { name: 'Monthly', label: 'รายเดือน', price: 1500, days: 30 }
}

export function calculateExpiryDate(daysOrPlan: any, _startDate?: any): Date {
  const date = new Date()
  let days = 30;
  if (typeof daysOrPlan === 'number') days = daysOrPlan;
  else if (typeof daysOrPlan === 'string' && planConfig[daysOrPlan as PlanType]) days = planConfig[daysOrPlan as PlanType].days;
  date.setDate(date.getDate() + days)
  return date
}

export const documentSchema = zod.any();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getSubscriptionStatus = async (_userId?: string) => ({
  isActive: true,
  status: "active",
});

export type DocumentInput = Partial<{
  type: string;
  title: string;
  content: string;
  [key: string]: any;
}>;

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
