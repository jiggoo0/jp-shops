# JP-VISUAL&DOCS Project Overview

โปรเจกต์นี้เป็นเว็บไซต์ทางการของ **เจ้าป่า (JP-VISUAL&DOCS)** ซึ่งให้บริการด้านกลยุทธ์การจัดการเอกสาร การยื่นสินเชื่อ วีซ่า และการสร้างภาพลักษณ์บุคคลระดับมืออาชีพ พัฒนาด้วยเทคโนโลยีเว็บล่าสุดเพื่อให้ได้ประสิทธิภาพและความสวยงามสูงสุด

## 🚀 Core Technologies

- **Framework:** Next.js 16 (Canary) - App Router
- **Library:** React 19
- **Styling:** Tailwind CSS (Vanilla CSS for custom styles)
- **Animation:** Framer Motion
- **Icons:** Lucide React
- **Content:** MDX (Next.js MDX support)
- **Caching:** Next.js 16 Cache Components (`'use cache'`, PPR)

## 🏗 Architecture & Patterns

- **Partial Prerendering (PPR):** เปิดใช้งานผ่าน `cacheComponents: true` ใน `next.config.mjs` และใช้ `Suspense` ในการ Stream ข้อมูลแบบ Dynamic
- **Advanced Caching:** ใช้ Directive `'use cache'` ใน `lib/data.ts` พร้อม `cacheLife` และ `cacheTag` เพื่อประสิทธิภาพการโหลดสูงสุด
- **SEO & Schema:** มีระบบ Structured Data (Schema.org) ใน `lib/schema.ts` เพื่อรองรับ Rich Results บน Google (FAQ, Organization, Services)
- **Component Strategy:** แยกส่วนประกอบเป็น `ui` (Reusable), `layout`, และ `sections` (Page blocks)
- **Utility:** ใช้ `cn` function (`tailwind-merge` + `clsx`) ในการจัดการ Tailwind classes

## 🛠 Commands

ใช้ `pnpm` เป็นมาตรฐานในการจัดการ dependencies:

| Command                | Description                                                                       |
| ---------------------- | --------------------------------------------------------------------------------- |
| `pnpm dev`             | เริ่มต้นเซิร์ฟเวอร์พัฒนา                                                          |
| `pnpm build --webpack` | บิลด์โปรเจกต์ (ต้องใช้ `--webpack` เนื่องจาก Turbopack ไม่รองรับบน ARM64/Android) |
| `pnpm start`           | เริ่มต้นเซิร์ฟเวอร์ Production หลังบิลด์                                          |
| `pnpm lint`            | ตรวจสอบคุณภาพโค้ดด้วย ESLint                                                      |
| `pnpm format`          | จัดรูปแบบโค้ดด้วย Prettier                                                        |
| `pnpm type-check`      | ตรวจสอบความถูกต้องของ TypeScript                                                  |
| `pnpm unused`          | ตรวจสอบโค้ดหรือไฟล์ที่ไม่ได้ใช้งาน (Knip)                                         |

## 📏 Development Conventions

- **Language:** เนื้อหาหลักใช้ภาษาไทย และใช้ภาษาอังกฤษสำหรับคำศัพท์เทคนิค
- **Identity:** ทุกไฟล์โค้ดสำคัญควรมี Comment `/* @identity เจ้าป่า */` ที่ด้านบนสุด
- **Code Quality:** ปฏิบัติตามลำดับ Lint -> Format -> Unused Check -> Type Check ก่อนจบงานเสมอ
- **Contrast & UI:** ให้ความสำคัญกับความคมชัดของข้อความ (Contrast Ratio) และความสวยงามระดับ Senior Engineer
- **Async APIs:** ใช้ `await params` และมาตรฐาน Next.js 15+ เสมอ
- **No rule disabling:** ห้ามปิดกฎ Linter หรือใช้ `any` โดยไม่จำเป็น

## 📂 Key Directories

- `app/`: Next.js App Router (Main content, Legal pages, Templates)
- `components/`: UI, Sections, and Layout components
- `lib/`: Data fetching, Schema, and Utility functions
- `constants/`: ข้อมูล Static และการตั้งค่าคงที่
- `content/`: บทความในรูปแบบ MDX
- `public/`: Assets, Images, and Favicons
- `styles/`: Global CSS และ Tailwind configuration
