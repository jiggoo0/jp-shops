import { createClient } from '@supabase/supabase-js'
import * as zod from 'zod';

export * from './supabase'

export type PlanType = 'free' | 'starter' | 'pro' | 'enterprise' | 'monthly'

export const planConfig: Record<PlanType, { name: string, price: number }> = {
  free: { name: 'Free', price: 0 },
  starter: { name: 'Starter', price: 900 },
  pro: { name: 'Pro', price: 2900 },
  enterprise: { name: 'Enterprise', price: 9900 },
  monthly: { name: 'Monthly', price: 1500 }
}

export function calculateExpiryDate(daysOrPlan: any, _startDate?: any): string {
  const date = new Date()
  const days = typeof daysOrPlan === 'number' ? daysOrPlan : 30
  date.setDate(date.getDate() + days)
  return date.toISOString()
}

export const documentSchema = zod.any();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getSubscriptionStatus = async (_userId?: string) => ({
  isActive: true,
  status: "active",
});

export type DocumentInput = {
  type: string;
  title: string;
  content: string;
  companyName?: string;
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

export const supabaseAdmin = supabaseUrl && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null;
