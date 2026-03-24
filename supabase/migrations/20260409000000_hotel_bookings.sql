-- Migration: Hotel Bookings Schema
-- Description: ตารางเก็บข้อมูลการจองโรงแรมที่สร้างจากระบบเพื่อการตรวจสอบ (Verification)

CREATE TABLE IF NOT EXISTS hotel_bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE SET NULL,
  hotel_name TEXT NOT NULL,
  guest_name TEXT NOT NULL,
  confirmation_no TEXT NOT NULL,
  check_in_date DATE NOT NULL,
  check_out_date DATE NOT NULL,
  room_type TEXT NOT NULL,
  address TEXT NOT NULL,
  payment_id UUID REFERENCES payments(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- เพิ่มบริการ hotel_booking ในตาราง services
INSERT INTO services (id, name, price, description) VALUES
('hotel_booking', 'Hotel Confirmation Generator', 500.00, 'ระบบออกใบยืนยันที่พักจำลองเพื่อยื่นวีซ่า')
ON CONFLICT (id) DO UPDATE SET price = EXCLUDED.price, description = EXCLUDED.description;

-- นโยบายความปลอดภัย (RLS)
ALTER TABLE hotel_bookings ENABLE ROW LEVEL SECURITY;

-- ทุกคนสามารถดูข้อมูลการจองได้ผ่าน ID เพื่อการ Verification
CREATE POLICY "Public can view hotel bookings for verification" 
ON hotel_bookings FOR SELECT 
USING (true);

-- ผู้ใช้เจ้าของสามารถดูการจองของตัวเองได้
CREATE POLICY "Users can view their own hotel bookings" 
ON hotel_bookings FOR SELECT 
USING (auth.uid() = user_id);
