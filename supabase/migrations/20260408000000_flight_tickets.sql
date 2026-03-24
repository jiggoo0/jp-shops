-- Migration: Flight Tickets Schema
-- Description: ตารางเก็บข้อมูลตั๋วเครื่องบินที่สร้างจากระบบเพื่อการตรวจสอบ (Verification)

CREATE TABLE IF NOT EXISTS flight_tickets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE SET NULL,
  airline TEXT NOT NULL, -- KLM, ANA, ETIHAD
  passenger_name TEXT NOT NULL,
  pnr TEXT NOT NULL,
  eticket TEXT NOT NULL,
  flight_data JSONB NOT NULL,
  payment_id UUID REFERENCES payments(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- เพิ่มบริการ flight_ticket ในตาราง services
INSERT INTO services (id, name, price, description) VALUES
('flight_ticket', 'Flight Ticket Generator', 500.00, 'ระบบออกตั๋วเครื่องบินจำลองเพื่อยื่นวีซ่า')
ON CONFLICT (id) DO UPDATE SET price = EXCLUDED.price, description = EXCLUDED.description;

-- นโยบายความปลอดภัย (RLS)
ALTER TABLE flight_tickets ENABLE ROW LEVEL SECURITY;

-- ทุกคนสามารถดูข้อมูลตั๋วได้ผ่าน ID เพื่อการ Verification (จำกัดเวลา 7 วันจะคุมที่ Application Layer หรือ View)
CREATE POLICY "Public can view flight tickets for verification" 
ON flight_tickets FOR SELECT 
USING (true);

-- ผู้ใช้เจ้าของตั๋วสามารถดูตั๋วของตัวเองได้
CREATE POLICY "Users can view their own flight tickets" 
ON flight_tickets FOR SELECT 
USING (auth.uid() = user_id);
