-- รันคำสั่งนี้ในหน้า SQL Editor ของ Supabase
CREATE TABLE IF NOT EXISTS documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_name TEXT NOT NULL,
  document_type TEXT NOT NULL,
  issued_date DATE NOT NULL,
  expiry_date DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'Verified',
  issuer TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ปิด Row Level Security ชั่วคราวเพื่อให้ระบบทำงานได้ทันที
ALTER TABLE documents DISABLE ROW LEVEL SECURITY;
