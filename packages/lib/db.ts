import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// สร้าง Default client สำหรับใช้ทั่วไป (จะทำงานต่อเมื่อมีตัวแปรสภาพแวดล้อมครบ)
export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : (null as any); // ปล่อยให้เป็น null เพื่อให้ระบบตรวจสอบได้ภายหลัง

// Admin client สำหรับงานหลังบ้าน (Server-side เท่านั้น)
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
export const supabaseAdmin =
  supabaseUrl && supabaseServiceKey
    ? createClient(supabaseUrl, supabaseServiceKey)
    : supabase;
