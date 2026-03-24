import * as z from "zod";

export const payrollSchema = z.object({
  ownerName: z.string().min(2, "ชื่อพนักงานต้องมีอย่างน้อย 2 ตัวอักษร"),
  position: z.string().min(2, "ตำแหน่งต้องระบุให้ชัดเจน"),
  companyName: z.string().min(2, "ชื่อบริษัทต้องมีอย่างน้อย 2 ตัวอักษร"),
  registrationNo: z.string().min(1, "เลขทะเบียนนิติบุคคลต้องระบุ"),
  salary: z.number().min(0, "เงินเดือนต้องไม่ติดลบ"),
  allowance: z.number().min(0).default(0),
  tax: z.number().min(0).default(0),
  sso: z.number().min(0).default(0),
  issuedDate: z.string(),
  expiryDate: z.string(),
  issuer: z.string().min(2, "ชื่อผู้ออกเอกสารต้องระบุให้ชัดเจน"),
});

export type PayrollInput = z.infer<typeof payrollSchema>;
