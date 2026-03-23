-- Migration: Seed Fixed Users for Admin and Partner
-- Description: เพิ่มบัญชี Admin และ Partner หลักเข้าสู่ระบบ (รหัสผ่านจัดการผ่าน lib/auth.ts)

-- 1. เพิ่ม Master Admin
INSERT INTO users (id, name, email, role, created_at, updated_at)
VALUES (
  '00000000-0000-0000-0000-000000000001', 
  'Master Admin', 
  'admin@jpvisualdocs.com', 
  'admin', 
  NOW(), 
  NOW()
)
ON CONFLICT (email) DO UPDATE SET
  role = 'admin',
  name = 'Master Admin',
  updated_at = NOW();

-- 2. เพิ่ม Official Partner
INSERT INTO users (id, name, email, role, created_at, updated_at)
VALUES (
  '00000000-0000-0000-0000-000000000002', 
  'Official Partner', 
  'Partner@jpvisualdocs.com', 
  'partner', 
  NOW(), 
  NOW()
)
ON CONFLICT (email) DO UPDATE SET
  role = 'partner',
  name = 'Official Partner',
  updated_at = NOW();
