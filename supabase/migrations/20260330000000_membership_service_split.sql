-- Migration: Advanced Membership & Service Schema
-- Description: แยกข้อมูลค่าสมัครสมาชิกออกจากค่าบริการรายชิ้น

-- 1. ตารางแผนสมาชิก (Membership Plans)
CREATE TABLE IF NOT EXISTS subscription_plans (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  label TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  duration_days INTEGER NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. ตารางบริการ (Services)
CREATE TABLE IF NOT EXISTS services (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. ตารางประวัติการชำระเงิน (Payments/Transactions)
CREATE TABLE IF NOT EXISTS payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL,
  currency TEXT DEFAULT 'thb',
  status TEXT DEFAULT 'pending', -- pending, paid, failed
  payment_type TEXT NOT NULL, -- 'subscription', 'service'
  target_id TEXT NOT NULL, -- plan_id หรือ service_id
  stripe_session_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. อัปเดตตาราง profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS plan_id TEXT REFERENCES subscription_plans(id);

-- 5. ข้อมูลเริ่มต้น (Seed Data)
INSERT INTO subscription_plans (id, name, label, price, duration_days, description) VALUES
('1_day', '1 Day Pass', 'รายวัน', 199.00, 1, 'สิทธิ์การเข้าใช้งานระบบ Vifily 24 ชั่วโมง'),
('30_days', '30 Days Pass', 'รายเดือน', 2500.00, 30, 'สิทธิ์การเข้าใช้งานระบบ Vifily 30 วัน'),
('365_days', 'VIP Elite', 'รายปี', 19900.00, 365, 'สิทธิ์การเข้าใช้งานระบบ Vifily รายปี (Best Value)')
ON CONFLICT (id) DO NOTHING;

INSERT INTO services (id, name, price, description) VALUES
('doc_verification', 'Document Verification', 50.00, 'ค่าธรรมเนียมการตรวจสอบเอกสารรายชิ้น'),
('ai_assistant', 'AI Assistant Premium', 20.00, 'ค่าธรรมเนียมการปรึกษา AI รายครั้ง (ถ้าไม่มีแพ็กเกจ)')
ON CONFLICT (id) DO NOTHING;

-- 6. นโยบายความปลอดภัย (RLS)
ALTER TABLE subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view plans and services" ON subscription_plans FOR SELECT USING (true);
CREATE POLICY "Anyone can view services" ON services FOR SELECT USING (true);
CREATE POLICY "Users can view their own payments" ON payments FOR SELECT USING (auth.uid() = user_id);
