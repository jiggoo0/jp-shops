# Technical Data Inspection Log (From Dev Screenshots)

**Date of Inspection:** 2026-03-23  
**Source:** `/Dev/Screenshot_*.jpg` (Group: ป้ายPJ)  
**Inspector:** Senior Architect ("เจ้าป่า")

---

## 📊 1. Data Extraction Summary

จากการแกะข้อมูลภาพหน้าจอ พบรายการบัญชีผู้ใช้ (Accounts) ที่เตรียมนำเข้าระบบ JP Visual Docs ดังนี้:

### บัญชีผู้ดูแลระบบ (Potential Admins/Moderators)

- **Jinny Sirinat**: ผู้ดูแลหลัก (Admin)
- **Jakkit Suwansirisan**: ผู้ดูแลระบบ (Admin)
- **Jaopa Zerofour**: (เจ้าป่า) บัญชีอ้างอิงของระบบ

### รายการพาร์ทเนอร์ (Sample Partner Accounts)

| ชื่อโปรไฟล์            | อีเมลอ้างอิง              | รูปแบบรหัสผ่าน | กลุ่ม/ทีม |
| :--------------------- | :------------------------ | :------------- | :-------- |
| สุภาพบุรุษ รองเท้าแตะ  | Sas2@outlook.co.th        | Qq12345qq      | Lockpro   |
| Baimon Kandarat        | Fudvisvvv@outlook.co.th   | qq98765qq      | ทีม #     |
| Thanakorn MrTree       | nakponfaie@outlook.co.th  | q12345678q     | ทีม @.    |
| พี่สิน ร้อยเปอร์เซ็นต์ | zxcvbnmasdf3502@gmail.com | Qq12345678qq   | ทีม @.    |
| Manow Siri             | Naitode@outlook.co.th     | gg55555gg      | -         |
| Kewwarin Suratsatit    | Nnop2@outlook.co.th       | Qq12345qq      | -         |
| Natchaphat Karut       | Str2@outlook.co.th        | Qq54321qq      | -         |

---

## ⚙️ 2. System Logic Insights

- **Credential Pattern**: รหัสผ่านส่วนใหญ่เป็น Case-sensitive และมีการผสมตัวเลข (เช่น Qq...qq)
- **Onboarding Workflow**: พาร์ทเนอร์ทำการ "ลงชื่อ" ผ่านการคอมเมนต์ในโซเชียลมีเดียก่อนที่จะมีการย้ายข้อมูลเข้าระบบเว็บหลัก
- **Semantic Link**: บัญชีเหล่านี้คือกลุ่มเป้าหมายที่จะต้องใช้ระบบ **Vifily Generation** ในเฟสถัดไป

---

## 🛠️ 3. Recommendations for Implementation

1. **Bulk Import**: ควรสร้าง Script สำหรับการนำรายชื่อเหล่านี้เข้าสู่ Supabase Auth โดยตั้งค่ารหัสผ่านเริ่มต้นตามที่แกะข้อมูลได้
2. **Security**: เนื่องจากมีการเปิดเผยรหัสผ่านในกลุ่มโซเชียล ระบบใหม่ **ต้อง** บังคับให้พาร์ทเนอร์เปลี่ยนรหัสผ่าน (Force Password Change) เมื่อ Login ครั้งแรกบนหน้าเว็บ
3. **Role Mapping**: ใช้ข้อมูล "ทีม/กลุ่ม" ในการกำหนด Metadata หรือ Role ในตาราง `profiles`

---

**"เจ้าป่า" ได้บันทึกหลักฐานและข้อมูลทางเทคนิคทั้งหมดเรียบร้อยแล้วครับ**
