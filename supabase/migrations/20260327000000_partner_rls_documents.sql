-- Migration: Add partner_id to documents to support Partner Dashboard and RLS
-- Description: เชื่อมโยงเอกสารกับพาร์ทเนอร์ผู้สร้างเพื่อให้แสดงผลแยกตามบัญชีได้

-- 1. เพิ่มคอลัมน์ partner_id (Nullable สำหรับระบบเดิม แต่บังคับใช้ในระบบใหม่)
ALTER TABLE documents ADD COLUMN IF NOT EXISTS partner_id UUID REFERENCES auth.users ON DELETE SET NULL;

-- 2. สร้าง Index เพื่อความเร็วในการดึงข้อมูล Dashboard
CREATE INDEX IF NOT EXISTS idx_documents_partner_id ON documents (partner_id);

-- 3. ติดตั้งนโยบายความปลอดภัย (RLS) สำหรับเอกสาร
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- นโยบาย: เจ้าของเอกสาร (พาร์ทเนอร์) ดูและจัดการข้อมูลของตนเองได้
CREATE POLICY "Partners can manage their own documents" 
ON documents FOR ALL 
USING (auth.uid() = partner_id);

-- นโยบาย: ทุกคน (Public) สามารถดูรายละเอียดเอกสารผ่านรหัส ID เพื่อการ Verification
CREATE POLICY "Public can verify documents via ID" 
ON documents FOR SELECT 
USING (true);

-- นโยบาย: แอดมินจัดการได้ทุกอย่าง
CREATE POLICY "Admins can manage all documents" 
ON documents FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);
