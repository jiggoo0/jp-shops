-- Migration: Enable RLS on Documents
-- Description: บังคับใช้ความปลอดภัยระดับแถวข้อมูล (Row Level Security) ตาม Zero Error Protocol

-- 1. เพิ่มคอลัมน์ partner_id เพื่อระบุเจ้าของเอกสาร (ถ้ายังไม่มี)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'documents' AND column_name = 'partner_id') THEN
        ALTER TABLE documents ADD COLUMN partner_id UUID REFERENCES auth.users ON DELETE CASCADE;
        CREATE INDEX idx_documents_partner_id ON documents (partner_id);
    END IF;
END $$;

-- 2. เปิดใช้งาน RLS
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- 3. Policy สำหรับ Partner (ดูและสร้างเฉพาะของตัวเอง)
CREATE POLICY "Partners can view their own documents" 
ON documents FOR SELECT 
USING (auth.uid() = partner_id);

CREATE POLICY "Partners can insert their own documents" 
ON documents FOR INSERT 
WITH CHECK (auth.uid() = partner_id);

CREATE POLICY "Partners can update their own documents" 
ON documents FOR UPDATE 
USING (auth.uid() = partner_id)
WITH CHECK (auth.uid() = partner_id);

CREATE POLICY "Partners can delete their own documents" 
ON documents FOR DELETE 
USING (auth.uid() = partner_id);

-- 4. Policy สำหรับ Admin (จัดการได้ทั้งหมด)
CREATE POLICY "Admins have full access to all documents" 
ON documents FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);
