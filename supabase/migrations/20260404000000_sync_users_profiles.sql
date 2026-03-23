-- Migration: Sync Users Table with Profile fields
-- Description: เพิ่มฟิลด์ที่เคยอยู่ใน profiles ลงใน users เพื่อให้ใช้ตารางเดียวตาม NextAuth Schema

ALTER TABLE users
ADD COLUMN IF NOT EXISTS full_name TEXT,
ADD COLUMN IF NOT EXISTS phone_number TEXT,
ADD COLUMN IF NOT EXISTS subscription_status TEXT DEFAULT 'inactive',
ADD COLUMN IF NOT EXISTS subscription_end_date TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS plan_id TEXT,
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- ย้ายข้อมูลจาก profiles ไป users (ถ้ามี)
DO $$
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'profiles') THEN
        UPDATE users u
        SET 
            full_name = p.full_name,
            phone_number = p.phone_number,
            subscription_status = p.subscription_status,
            subscription_end_date = p.subscription_end_date,
            plan_id = p.plan_id,
            updated_at = p.updated_at
        FROM profiles p
        WHERE u.id = p.id;
    END IF;
END $$;
