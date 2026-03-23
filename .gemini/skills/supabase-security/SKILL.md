---
name: supabase-security
description: แนวทางการจัดการฐานข้อมูล Supabase (PostgreSQL) เน้นความปลอดภัยระดับสูงสุดด้วย Row Level Security (RLS) และ Database Migrations ตามมาตรฐาน Supabase Official
version: 1.0.0
author: JP Visual Docs (inspired by Supabase)
---

# Supabase Security & Database Patterns

สกิลนี้ทำหน้าที่เป็น "ปราการด่านสุดท้าย" เพื่อป้องกันการรั่วไหลของข้อมูลพนักงานและลูกค้าของ JP Visual Docs

## 🛡️ หัวใจของความปลอดภัย (Core Security)

- **RLS (Row Level Security):** ต้องเปิดใช้งาน (Enable) ในทุกตาราง (Table) ของแอปพลิเคชัน
- **Policy Creation:** ออกแบบ Policy ที่อนุญาตให้พนักงานเข้าถึงเฉพาะข้อมูลของตัวเอง (`auth.uid() = user_id`)

## 🔄 ขั้นตอนการทำงาน (Workflows)

1. **Migration-Led Design:** เมื่อมีการเพิ่มฟิลด์หรือตารางใหม่ ให้ทำผ่านไฟล์ `.sql` Migration เท่านั้น (เก็บใน `supabase/migrations`)
2. **Type Safety Generation:** เมื่อโครงสร้างฐานข้อมูลเปลี่ยนไป ให้รัน `supabase gen types` ทันทีเพื่อให้ TypeScript ซิงค์กับฐานข้อมูลจริง
3. **Environment Security:** คีย์ `service_role` ห้ามปรากฏในฝั่ง Client (Frontend) เด็ดขาด ให้ใช้เฉพาะใน Server-side logic เท่านั้น

## 🛡️ กฎเหล็ก (Rules)

- **Zero Access by Default:** ทุกตารางต้องเปิด RLS โดยไม่มีเงื่อนไข
- **Strict Data Types:** ใช้ UUID สำหรับ Primary Keys และ JSONB สำหรับข้อมูลที่ยืดหยุ่น (เช่น รายรับ-รายจ่าย)
- **Audit Logs:** บันทึกการเปลี่ยนแปลงข้อมูลสำคัญ (เช่น เงินเดือน) เสมอ
