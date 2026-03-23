import * as z from "zod";

export const documentSchema = z.object({
  ownerName: z.string(),
  documentType: z.string(),
  issuedDate: z.string(),
  expiryDate: z.string(),
  status: z.string().default("Verified"),
  issuer: z.string(),
});

export type DocumentInput = z.infer<typeof documentSchema>;

// สำหรับ User Profile (ข้อมูลจาก Database)
export interface UserProfile {
  id: string;
  subscription_status: string;
  subscription_end_date: string | null;
  plan_id: string | null;
  email?: string;
  full_name?: string;
}
