-- Migration: Setup Subscription System for JP Visual Docs
-- Description: ขยายขอบเขตตาราง profiles เพื่อรองรับระบบสมาชิกพาร์ทเนอร์

-- 1. สร้าง Enum สำหรับสถานะสมาชิก
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'sub_status') THEN
        CREATE TYPE sub_status AS ENUM ('none', 'active', 'expired');
    END IF;
END $$;

-- 2. สร้างตาราง profiles (ถ้ายังไม่มี) หรือขยายคอลัมน์
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  role TEXT DEFAULT 'partner',
  subscription_status sub_status DEFAULT 'none',
  subscription_end_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. ติดตั้ง Index เพื่อ Performance (เช็ควันหมดอายุรวดเร็ว)
CREATE INDEX IF NOT EXISTS idx_profiles_subscription_end_date ON profiles (subscription_end_date);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles (role);

-- 4. ฟังก์ชันสำหรับสร้าง Profile อัตโนมัติเมื่อสมัครสมาชิก
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (new.id, new.email, 'partner');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. สร้าง Trigger (ลบของเก่าออกก่อนถ้ามีเพื่อความปลอดภัย)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 6. นโยบายความปลอดภัย (RLS) - ปิดไว้ก่อนตามมาตรฐานโปรเจกต์ปัจจุบัน แต่เตรียมโครงสร้างไว้
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile" 
ON profiles FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" 
ON profiles FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);
