"use server";

import {
  supabaseAdmin,
  documentSchema,
  type DocumentInput,
  withSubscriptionGuard,
} from "@/lib";
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

    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Cookie: cookieStore.toString() } },
    });

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: "กรุณาเข้าสู่ระบบก่อนดำเนินการ" };
    }

    // 2. Execute with Subscription Guard (Proxy Pattern)
    const result = await withSubscriptionGuard(user.id, async () => {
      // 3. Data Validation (Zero Error Protocol)
      const validatedData = documentSchema.parse(data);

      // 4. Insert to Supabase using Admin client
      const { data: insertedData, error } = await supabaseAdmin
        .from("documents")
        .insert([
          {
            partner_id: user.id,
            owner_name: validatedData.ownerName,
            document_type: validatedData.documentType,
            issued_date: validatedData.issuedDate,
            expiry_date: validatedData.expiryDate,
            status: validatedData.status,
            issuer: validatedData.issuer,
          },
        ])
        .select("id")
        .single();

      if (error) throw error;
      return insertedData;
    });

    if (!result.success || !result.data) {
      return {
        success: false,
        error: result.error || "Failed to create document",
      };
    }

    revalidatePath("/partner/documents");
    return { success: true, id: result.data.id as string };
  } catch (error) {
    console.error("Action Error:", error);
    return { success: false, error: "Invalid data format or server error." };
  }
}
