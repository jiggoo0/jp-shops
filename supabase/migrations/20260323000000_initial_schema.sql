-- รันคำสั่งนี้ในหน้า SQL Editor ของ Supabase
CREATE TABLE IF NOT EXISTS documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('payslip', 'salary_certificate')),
  company_name TEXT NOT NULL,
  employee_name TEXT NOT NULL,
  position TEXT NOT NULL,
  years_of_service INTEGER DEFAULT 0,
  base_salary NUMERIC(12, 2) NOT NULL,
  other_earnings JSONB DEFAULT '{}'::jsonb,
  deductions JSONB DEFAULT '{}'::jsonb,
  issue_date DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ปิด Row Level Security ชั่วคราวเพื่อให้ระบบทำงานได้ทันที
ALTER TABLE documents DISABLE ROW LEVEL SECURITY;
