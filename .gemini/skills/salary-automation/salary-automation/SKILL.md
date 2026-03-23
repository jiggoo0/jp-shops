---
name: salary-automation
description: ระบบออกใบรับรองเงินเดือนและสลิปเงินเดือนอัตโนมัติ (Vifily Verification) สำหรับ JP Visual Docs โดยเฉพาะ เน้นความถูกต้อง (Zero Error) และความปลอดภัยสูง (Supabase RLS Pattern)
version: "1.0.0"
author: "JP Visual Docs Team"
tools:
  - run_shell_command
  - read_file
  - write_file
---

# Salary Certificate & Payslip Automation Skill (Vifily Ver.)

Skill นี้ออกแบบมาเพื่อยกระดับความเป็นมืออาชีพของ **เจพีวีซอลแอนดอส** ในการออกเอกสารทางการเงินที่มีความน่าเชื่อถือสูงสุด (Trustworthy) พร้อมระบบตรวจสอบย้อนกลับด้วย QR Code

## 🎯 วัตถุประสงค์ (Overview)

เพื่อเป็นไกด์ไลน์และเครื่องมือให้ Agent สามารถจัดการ:

1. การออกสลิปเงินเดือน (Payslip) และใบรับรองเงินเดือน (Salary Certificate) อย่างถูกต้อง
2. การคำนวณรายรับ-รายจ่ายที่ซับซ้อน (Smart Calculation)
3. การรักษาความปลอดภัยของข้อมูล (Data Privacy) ตามมาตรฐาน Supabase RLS

## 🛠️ รายการทรัพยากร (Available Resources)

- `../supabase_schema_v2.sql`: โครงสร้างฐานข้อมูลที่ปลอดภัยสูงสุด
- `apps/web/app/actions/document.ts`: Server Actions สำหรับบันทึกข้อมูล
- `apps/web/app/verify/doc/[id]/page.tsx`: หน้าแสดงผล Vifily Verification

## 🔄 ขั้นตอนการทำงาน (Workflows)

### 1. การออกเอกสารใหม่ (Automated Issuance)

- **Check Data:** ตรวจสอบข้อมูลพนักงาน (ชื่อ, ตำแหน่ง, อายุงาน, รายรับ, รายจ่าย) ให้ครบถ้วน
- **Validate:** ใช้ Zod Schema ใน `packages/lib/schemas/index.ts` เพื่อป้องกันข้อผิดพลาด
- **Secure Insert:** บันทึกข้อมูลผ่าน Server Action เพื่อให้ได้ UUID มาทำเป็นลิงก์ตรวจสอบ
- **QR Code Gen:** สร้าง QR Code ที่ชี้ไปที่ `https://jpvisouldocs.shop/verify/doc/[UUID]`

### 2. การตรวจสอบความน่าเชื่อถือ (Verification)

- เมื่อมีคนสแกน QR Code ระบบจะดึงข้อมูลจาก Supabase มาแสดงในรูปแบบ Template ที่เรียบหรูทางการ (Clean & Modern)
- แสดงสถานะ **"Verified by Vifily System"** เพื่อยืนยันว่าเป็นเอกสารจริงจากฐานข้อมูล

## 🛡️ กฎเหล็กและความปลอดภัย (Rules & Constraints)

- **Zero Error Protocol:** ห้ามปล่อยให้มีการข้ามขั้นตอนการ Validate ข้อมูลเด็ดขาด
- **Data Privacy:** ข้อมูลเงินเดือนถือเป็นความลับสูงสุด ห้ามแสดงผลในระบบ Log หรือ Console แบบดิบๆ (Raw Data)
- **Trustworthy Pattern:** รูปแบบเอกสารต้องใช้ธีม "เจ้าป่า" (พื้นขาว, ตัวอักษรดำ/เทาเข้ม, ฟอนต์ทางการ, การจัดวางสม่ำเสมอ)
- **Smart Calc:** การคำนวณ Net Salary ต้องสัมพันธ์กับรายรับและรายจ่ายทั้งหมดเสมอ

## 💡 ตัวอย่างการสั่งงาน (Examples)

- "สร้างสลิปเงินเดือนให้ นายเจ้าป่า ตัวอย่าง เงินเดือน 1,000 บาท อายุงาน 9 ปี พร้อมรายรับ-รายจ่ายที่สมจริง"
- "ตรวจสอบว่าข้อมูลใน Supabase สำหรับสลิปใบนี้ถูกต้องตามหลักความปลอดภัยหรือไม่"
