-- Migration: Sync users table with legacy profiles structure
-- Description: เพิ่มคอลัมน์จาก profiles ลงใน users เพื่อให้ใช้งานร่วมกับ NextAuth ได้สมบูรณ์

ALTER TABLE users 
ADD COLUMN IF NOT EXISTS full_name TEXT,
ADD COLUMN IF NOT EXISTS phone_number TEXT,
ADD COLUMN IF NOT EXISTS subscription_status TEXT DEFAULT 'inactive',
ADD COLUMN IF NOT EXISTS subscription_end_date TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS plan_id TEXT;

-- ย้ายข้อมูลจาก profiles ไป users (ถ้ามีข้อมูลอยู่แล้ว)
DO $$ 
BEGIN 
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'profiles') THEN
        UPDATE users u
        SET 
            full_name = p.full_name,
            phone_number = p.phone_number,
            subscription_status = p.subscription_status,
            subscription_end_date = p.subscription_end_date,
            plan_id = p.plan_id
        FROM profiles p
        WHERE u.id = p.id;
    END IF;
END $$;
