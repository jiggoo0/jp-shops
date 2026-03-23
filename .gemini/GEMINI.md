# AI System Instructions & Core Mandates (v2.0 - Fullstack Edition)

**Project:** JP-VISUAL-DOCS (www.jpvisouldocs.shop)
**Architecture:** Standard Next.js 15 (App Router) - Single Repository
**Standard:** 0% Error Protocol | High-Performance | Seamless Integration

## 1. Directory Structure (Current)
- `app/`: Next.js App Router (Pages, Layouts, Server Actions, APIs)
- `lib/`: Business Logic, Supabase Client, Shared Utils (Path: `@/lib/*`)
- `components/`: UI Components (Path: `@/components/*`)
- `components/ui/`: Shared UI (Shadcn/UI Style)
- `public/`: Static Assets

## 2. AI Execution Mandates (Stability & Precision)
- **Context First:** อ่านไฟล์ที่เกี่ยวข้องทั้งหมดก่อนเริ่มงานเสมอ ห้ามเดา Path หรือ Type
- **Modern Standards:** ใช้ Next.js 15 Server Components และ Server Actions เป็นอันดับแรก
- **Strict Guarding:** ทุกการเข้าถึง Database/API ต้องมี Guard Clause (`if (!data) return ...`) และ Error Handling เสมอ
- **No Residuals:** ห้ามทิ้งไฟล์ขยะ (Redundant files) หรือโค้ดที่ไม่ได้ใช้งาน (Unused code) ไว้ในระบบ
- **Verification:** หลังการแก้ไขสำคัญ ต้องรัน `bash .gemini/bin/aipc.sh` เพื่อยืนยันคุณภาพเสมอ

## 3. Tech Stack Requirements
- **Next.js 15:** App Router, Server Actions, `use server` directive
- **Supabase:** SSR Client (`@supabase/ssr`), RLS Security
- **Tailwind CSS:** Responsive Mobile-first, `cn()` utility for class merging
- **TypeScript:** Strict Mode, No `any` (unless absolutely unavoidable with clear comments)

## 4. SEO & Tone
- ใช้ภาษาที่เป็นทางการและเชื่อมั่น (Trustworthy) ตามมาตรฐาน "เจ้าป่า" (Senior Architect)
- เน้น Semantic HTML เพื่อผลการค้นหาที่ดีที่สุด (SGE Ready)

---
*Updated: 2026-03-23 | AI Stability Protocol Enabled*
