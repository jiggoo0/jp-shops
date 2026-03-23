"use server";

import {
  supabaseAdmin,
  documentSchema,
  type DocumentInput,
  getSubscriptionStatus,
} from "@jp-visual-docs/lib";
import { revalidatePath } from "next/cache";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export async function createDocument(data: DocumentInput) {
  try {
    // 1. Authenticate User (Get session from cookies)
    const cookieStore = await cookies();
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey || !supabaseAdmin) {
      return {
        success: false,
        error: "ระบบฐานข้อมูลขัดข้อง (Server Configuration Error)",
      };
    }

    // Create a temporary client to get the user
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Cookie: cookieStore.toString() } },
    });

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: "กรุณาเข้าสู่ระบบก่อนดำเนินการ" };
    }

    // 2. Check Subscription Status (The 50/50 Gate)
    const sub = await getSubscriptionStatus(user.id);

    if (!sub.isActive) {
      return {
        success: false,
        error:
          "สิทธิ์การใช้งานของคุณหมดอายุ หรือยังไม่มีแพ็กเกจที่ใช้งานได้ กรุณาต่ออายุที่หน้า Pricing",
      };
    }

    // 3. Data Validation (Zero Error Protocol)
    const validatedData = documentSchema.parse(data);

    // 4. Insert to Supabase using Admin client
    const { data: insertedData, error } = await supabaseAdmin
      .from("documents")
      .insert([
        {
          type: validatedData.type,
          company_name: validatedData.companyName,
          employee_name: validatedData.employeeName,
          position: validatedData.position,
          base_salary: validatedData.baseSalary,
          other_earnings: validatedData.otherEarnings || {},
          deductions: validatedData.deductions || {},
          issue_date: validatedData.issueDate,
          years_of_service: validatedData.yearsOfService || 0,
        },
      ])
      .select("id")
      .single();

    if (error) {
      console.error("Supabase Error:", error);
      return {
        success: false,
        error: "Failed to create document in database.",
      };
    }

    revalidatePath("/admin/documents");
    return { success: true, id: insertedData.id };
  } catch (error) {
    console.error("Validation/Action Error:", error);
    return { success: false, error: "Invalid data format or server error." };
  }
}
