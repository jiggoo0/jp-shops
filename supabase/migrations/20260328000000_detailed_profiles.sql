-- Migration: Add detailed fields to profiles table
-- Description: เพิ่มฟิลด์ข้อมูลส่วนตัวสำหรับระบบสมัครสมาชิกที่ละเอียดขึ้น (ชื่อ-สกุล, เบอร์โทรศัพท์)

ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS full_name TEXT,
ADD COLUMN IF NOT EXISTS phone_number TEXT;
