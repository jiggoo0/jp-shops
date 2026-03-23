# API Design Specification - JP Visual Docs (v1)

**Version:** 1.0.0  
**Base URL:** `https://www.jpvisouldocs.shop/api/v1`  
**Persona:** Senior Architect ("เจ้าป่า")  
**Standard:** RESTful API with JSend Response Format

---

## 1. Resource Modeling

### Core Entities

- **Partner (User Profile)**: สมาชิกพาร์ทเนอร์ที่ใช้ระบบ
- **Document (Trust Document)**: เอกสารความเชื่อมั่น (สลิปเงินเดือน, หนังสือรับรอง)
- **Subscription**: สิทธิ์การเข้าถึงบริการระดับพรีเมียม
- **Inquiry**: รายการประสานงานขอข้อมูลเพิ่มเติม
- **Verification (Vifily)**: รายการตรวจสอบความถูกต้องของเอกสาร

---

## 2. Authentication & Security

### Bearer Token (Supabase Auth)

ทุก Request (ยกเว้น Public endpoints) ต้องส่ง Header:
`Authorization: Bearer <supabase_access_token>`

### Access Control (Guard Clauses)

- **Public**: การตรวจสอบเอกสาร (Vifily)
- **Partner**: เข้าถึงข้อมูลตนเอง และสร้างเอกสาร (ต้องมีสถานะ `active`)
- **Admin**: เข้าถึงและจัดการข้อมูลทั้งหมดในระบบ

---

## 3. Endpoint Specifications

### 3.1 Partner Profile (`/partners`)

จัดการข้อมูลผู้เชี่ยวชาญ/ที่ปรึกษาสินเชื่อ

- `GET /v1/partners/me`
  - **Desc**: ดึงข้อมูลโปรไฟล์ปัจจุบัน
  - **Response**: `200 OK`
- `PATCH /v1/partners/me`
  - **Desc**: อัปเดตข้อมูลการติดต่อ
  - **Body**: `{ "name": "string", "phone": "string" }`

### 3.2 Documents (`/documents`)

ระบบจัดการเอกสารความเชื่อมั่น

- `POST /v1/documents`
  - **Desc**: ออกเอกสารใหม่ (สลิปเงินเดือน/หนังสือรับรอง)
  - **Auth**: Partner (Status: `active`)
  - **Body**: ดู `DocumentInput` schema
  - **Response**: `201 Created`
- `GET /v1/documents`
  - **Desc**: รายการเอกสารทั้งหมด (Filter โดย `partner_id` อัตโนมัติ)
  - **Params**: `?page=1&limit=20&type=payslip`
- `GET /v1/documents/{id}`
  - **Desc**: รายละเอียดเอกสารและสถานะ Vifily
- `DELETE /v1/documents/{id}`
  - **Desc**: ยกเลิกเอกสาร (Admin Only)

### 3.3 Verifications (`/verifications`)

ระบบตรวจสอบความน่าเชื่อถือแบบ Real-time

- `GET /v1/verifications/{id}`
  - **Desc**: ตรวจสอบสถานะเอกสารผ่านรหัส Vifily
  - **Auth**: Public
  - **Response**: ข้อมูลเอกสารพื้นฐาน (Masked sensitive data)

### 3.4 Inquiries (`/inquiries`)

ระบบประสานงานที่ปรึกษาสินเชื่อ

- `POST /v1/inquiries`
  - **Desc**: ส่งเรื่องขอรับคำปรึกษาหรือแจ้งปัญหา
  - **Body**: ดู `ContactInput` schema

---

## 4. Response Format

### Success (`200 OK`, `201 Created`)

```json
{
  "status": "success",
  "data": {
    "id": "uuid",
    "attributes": { ... }
  },
  "meta": {
    "timestamp": "2024-03-23T10:00:00Z"
  }
}
```

### Error (`4xx`, `5xx`)

```json
{
  "status": "error",
  "message": "คำอธิบายข้อผิดพลาด (ภาษาไทย)",
  "code": "ERROR_CODE",
  "details": []
}
```

---

## 5. Status Codes

- `200`: สำเร็จ
- `201`: สร้าง Resource สำเร็จ
- `401`: ยังไม่ได้เข้าสู่ระบบ
- `403`: ไม่มีสิทธิ์เข้าถึง (เช่น Subscription หมดอายุ)
- `404`: ไม่พบข้อมูล
- `422`: ข้อมูลนำเข้าไม่ถูกต้อง (Validation Fail)

---

## 6. Implementation Notes (Next.js 15)

- **Directory**: `apps/web/app/api/v1/[resource]/route.ts`
- **Shared Logic**: ใช้ `packages/lib` สำหรับ DB interaction เสมอ
- **Security**: บังคับใช้ `createServerClient` จาก `@supabase/ssr` ในทุก API Route
