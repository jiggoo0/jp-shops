-- Migration: Fix API Logs RLS
-- Description: เปลี่ยนการอ้างอิงจาก profiles เป็น users ตามกฎเหล็ก (Critical Rule)

-- ลบนโยบายเดิมที่ผิดพลาดออก
DROP POLICY IF EXISTS "Admins can view all logs" ON api_logs;

-- สร้างนโยบายใหม่โดยใช้ตาราง users
CREATE POLICY "Admins can view all logs" 
ON api_logs FOR SELECT 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM users 
    WHERE id = auth.uid() AND role = 'admin'
  )
);
