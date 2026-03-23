-- Migration: Setup Sync Trigger for Auth and Public Users
-- Description: ระบบซิงค์ข้อมูลจาก auth.users มายัง public.users โดยอัตโนมัติ

-- 1. สร้างฟังก์ชันสำหรับซิงค์ข้อมูล
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, name, role, updated_at)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    CASE 
      WHEN NEW.email = 'admin@jpvisualdocs.com' THEN 'admin'
      ELSE 'partner'
    END,
    NOW()
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. สร้าง Trigger เพื่อรันฟังก์ชันเมื่อมีการ Insert ใน auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 3. อัปเดตข้อมูลเดิม (ซ่อมแซม ID ที่ไม่ตรงกัน)
-- หมายเหตุ: วิธีที่ดีที่สุดคือลบ User เก่าใน public.users ที่ ID ไม่ตรงทิ้ง เพื่อให้ Trigger/Login ทำงานได้ใหม่
DELETE FROM public.users WHERE id IN ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002');
