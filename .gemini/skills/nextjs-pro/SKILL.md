---
name: nextjs-pro
description: แนวทางปฏิบัติที่ดีที่สุดสำหรับ Next.js 15 (App Router) เน้นการใช้ Server Actions, React Server Components และการจัดการ Cache อย่างถูกต้องตามมาตรฐาน Vercel Labs
version: 1.0.0
author: JP Visual Docs (inspired by Vercel Labs)
---

# Next.js 15 Professional Patterns

สกิลนี้ช่วยควบคุมการพัฒนาเว็บแอปพลิเคชัน Next.js ให้มีประสิทธิภาพสูงสุด (Performance) และมีข้อผิดพลาดน้อยที่สุด (Zero Error)

## 🎯 วัตถุประสงค์

- พัฒนา App Router ที่ซับซ้อนได้อย่างรื่นไหล
- ใช้ Server Actions แทน API Routes เพื่อความปลอดภัยและการเชื่อมต่อที่สมบูรณ์ (Seamless Integration)
- ควบคุม TypeScript ให้เป็นแบบ Strict Mode (ห้ามใช้ any)

## 🔄 ขั้นตอนการทำงาน (Workflows)

1. **Server Actions First:** เมื่อมีการส่งฟอร์ม (Form Submission) ให้ใช้ Server Actions เสมอ โดยมีการตรวจสอบข้อมูลด้วย `zod`
2. **Component Separation:** แยก Client Components เฉพาะเมื่อจำเป็น (เช่น มีการใช้ useState, useEffect, onClick) ส่วนที่เหลือให้เป็น Server Components เพื่อความรวดเร็ว
3. **Data Fetching:** ใช้ `await` สำหรับ `params` และ `searchParams` ในหน้า Page และ Layout ตามมาตรฐาน Next.js 15

## 🛡️ กฎเหล็ก (Rules)

- ห้ามใช้ `any` หรือ `@ts-ignore` (Strict TypeScript)
- ทุก API Call หรือ Database Interaction ต้องมี `try-catch` และ Fallback UI
- การแสดงผลข้อมูลสำคัญต้องมีการตรวจสอบสิทธิ์ (Auth Check) ก่อนเสมอ
