import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Safeguard against missing credentials to prevent runtime crash
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export type UserProfile = {
  id: string
  email: string
  role: 'admin' | 'partner' | 'user'
  full_name?: string
  avatar_url?: string
}
