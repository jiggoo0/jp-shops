-- Migration: Performance Optimization Indexes
-- Description: เพิ่ม Index เพื่อเร่งความเร็วในการค้นหาเอกสารและความน่าเชื่อถือ

-- 1. Index สำหรับการค้นหาประเภทเอกสารและวันที่ออกเอกสาร (ใช้บ่อยใน Dashboard)
CREATE INDEX IF NOT EXISTS idx_documents_type_issue_date ON documents (type, issue_date DESC);

-- 2. Index สำหรับการค้นหาชื่อพนักงาน (Search functionality)
CREATE INDEX IF NOT EXISTS idx_documents_employee_name ON documents USING gin (employee_name gin_trgm_ops);
-- หมายเหตุ: ต้องเปิด extension pg_trgm ก่อนถ้ายังไม่มี
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- 3. Index สำหรับการค้นหาบริษัท
CREATE INDEX IF NOT EXISTS idx_documents_company_name ON documents (company_name);

-- 4. ตรวจสอบสถานะ Profile และ Role รวดเร็ว (ซ้ำจากเดิมเพื่อความชัวร์)
CREATE INDEX IF NOT EXISTS idx_profiles_role_status ON profiles (role, subscription_status);
