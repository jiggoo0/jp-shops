-- Migration: Fix and Optimize Indexes for Documents Table
-- Description: ลบ Index ที่อ้างอิงคอลัมน์ผิดและสร้าง Index ใหม่ที่เพิ่มประสิทธิภาพจริง

-- 1. เปิดใช้งาน pg_trgm สำหรับการค้นหาข้อความแบบ Fuzzy Search (ถ้ายังไม่มี)
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- 2. ลบ Index เดิมที่มีปัญหา (ถ้ามี)
DROP INDEX IF EXISTS idx_documents_employee_name;
DROP INDEX IF EXISTS idx_documents_type_issue_date;
DROP INDEX IF EXISTS idx_documents_company_name;

-- 3. สร้าง Index ใหม่ที่สอดคล้องกับคอลัมน์จริงใน Table documents
-- ค้นหาประเภทเอกสารและวันที่ออกเอกสาร (Dashboard)
CREATE INDEX IF NOT EXISTS idx_documents_doc_type_issued_date 
ON documents (document_type, issued_date DESC);

-- ค้นหาชื่อเจ้าของเอกสารแบบ Fuzzy Search (Search Box)
CREATE INDEX IF NOT EXISTS idx_documents_owner_name_trgm 
ON documents USING gin (owner_name gin_trgm_ops);

-- ค้นหาชื่อผู้ออกเอกสาร (Issuer)
CREATE INDEX IF NOT EXISTS idx_documents_issuer 
ON documents (issuer);

-- 4. สร้าง Composite Index สำหรับ Query หลักของ Partner Dashboard (ดึงเอกสารของตัวเองเรียงตามเวลา)
CREATE INDEX IF NOT EXISTS idx_documents_partner_created_at 
ON documents (partner_id, created_at DESC);

-- 5. ตรวจสอบและสร้าง Index บน profiles เพื่อความเร็วในการทำ Auth/Guard
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles (id);
CREATE INDEX IF NOT EXISTS idx_profiles_updated_at ON profiles (updated_at DESC);
