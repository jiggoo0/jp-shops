-- Migration: API Logging System
-- Description: บันทึกการเรียกใช้งาน API เพื่อตรวจสอบความผิดพลาดและการใช้งาน (Audit Log)

CREATE TABLE IF NOT EXISTS api_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE SET NULL,
  endpoint TEXT NOT NULL,
  method TEXT NOT NULL,
  status_code INTEGER,
  request_payload JSONB,
  response_payload JSONB,
  ip_address TEXT,
  user_agent TEXT,
  duration_ms INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index เพื่อการค้นหา Log ที่รวดเร็ว
CREATE INDEX IF NOT EXISTS idx_api_logs_endpoint ON api_logs (endpoint);
CREATE INDEX IF NOT EXISTS idx_api_logs_user_id ON api_logs (user_id);
CREATE INDEX IF NOT EXISTS idx_api_logs_created_at ON api_logs (created_at DESC);

-- RLS: เฉพาะแอดมินที่ดู Log ได้
ALTER TABLE api_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view all logs" 
ON api_logs FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);
