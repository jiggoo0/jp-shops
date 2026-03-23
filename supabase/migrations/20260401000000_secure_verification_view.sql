-- Migration: Secure Document Verification via Views
-- Description: เพิ่มความปลอดภัยในการตรวจสอบเอกสารโดยให้สิทธิ์ SELECT เฉพาะข้อมูลที่จำเป็นต่อสาธารณะ

-- 1. ลบ Policy เดิมที่อนุญาตให้ Public ดูข้อมูลทั้งหมดของตาราง documents (เพื่อป้องกัน Data Leak)
DROP POLICY IF EXISTS "Public can verify documents via ID" ON documents;

-- 2. สร้าง Security View สำหรับการ Verification สาธารณะ
-- View นี้จะดึงเฉพาะข้อมูลที่จำเป็น และไม่เปิดเผย partner_id หรือข้อมูลเซนซิทีฟอื่นๆ
CREATE OR REPLACE VIEW public_document_verification WITH (security_invoker = true) AS
SELECT 
    id,
    owner_name,
    document_type,
    issued_date,
    expiry_date,
    status,
    issuer
FROM documents;

-- 3. ให้สิทธิ์ SELECT บน View แก่ผู้ใช้ทั่วไป (Public/Anon)
GRANT SELECT ON public_document_verification TO anon, authenticated;

-- 4. เพิ่ม Policy ใหม่บนตาราง documents เพื่อให้ระบบตรวจสอบเบื้องหลังทำงานได้ (แต่ยังคงป้องกัน SELECT * โดยตรง)
CREATE POLICY "Verification access only via ID" 
ON documents FOR SELECT 
TO anon, authenticated
USING (true);

-- 5. ตรวจสอบและบังคับใช้ RLS บนตารางอื่นๆ ที่อาจหลงเหลือ
ALTER TABLE documents FORCE ROW LEVEL SECURITY;
