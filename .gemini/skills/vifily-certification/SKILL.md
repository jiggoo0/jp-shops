---
name: vifily-certification
description: ระบบจัดการเอกสารรับรองดิจิทัล (Digital Certificates) และการสร้าง QR Code อัตโนมัติเพื่อตรวจสอบความน่าเชื่อถือ (Verification) ตามมาตรฐาน Vifily ของ JP Visual Docs
version: 1.0.0
author: JP Visual Docs Team
---

# Vifily Digital Certification System

สกิลสำหรับสร้างความเชื่อมั่นระดับสากลให้แก่ลูกค้า ผ่านเอกสารดิจิทัลที่ไม่สามารถปลอมแปลงได้

## 🎯 วัตถุประสงค์ (Core Value)

- สร้าง "Digital Trust" ให้แก่ลูกค้าที่ต้องการยื่นวีซ่า หรือกู้สินเชื่อ
- มีระบบตรวจสอบตัวตนของเอกสาร (Document Identity) ผ่าน QR Code ที่รวดเร็วและแม่นยำ

## 🔄 ขั้นตอนการทำงาน (Workflows)

1. **Document Issuance:** เมื่อลูกค้าขอออกเอกสาร ให้ระบบทำการสร้าง UUID ประจำตัวเอกสารและบันทึกลงในฐานข้อมูลที่ปลอดภัย (Supabase RLS Protected)
2. **Verification URL Generation:** สร้างลิงก์ตรวจสอบที่อยู่ภายใต้โดเมน `jpvisouldocs.shop/verify/doc/[UUID]`
3. **QR Code Placement:** นำ QR Code มาวางในส่วนบนหรือส่วนท้ายของเอกสาร ให้สแกนได้ง่าย
4. **Verification Portal Rendering:** แสดงหน้าเว็บที่มีสถานะ "Verified" พร้อมข้อมูลจริงจากฐานข้อมูลเพื่อเปรียบเทียบกับเอกสารกระดาษ

## 🛡️ กฎเหล็ก (Rules & Constraints)

- **Zero Placeholder Policy:** ห้ามปล่อยให้หน้า Verification แสดงข้อมูลจำลอง (Dummy) ต้องดึงจาก DB จริงเท่านั้น
- **Document Expiration Concept:** มีระบุกรอบเวลาที่เอกสารมีผลบังคับใช้ (Expiry Date) เพื่อความถูกต้องของข้อมูล
- **Trust Indicators:** หน้าเว็บต้องมีเครื่องหมายรับรองความปลอดภัยที่ชัดเจน (Trust Shield/Verified Icon)
