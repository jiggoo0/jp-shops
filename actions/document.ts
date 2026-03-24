"use server";

import { documentSchema, type DocumentInput } from "@/lib/config/plans";
import { withSubscriptionGuard } from "@/lib/services/guard";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createDocument(data: DocumentInput) {
  // 1. Execute with Subscription Guard (Proxy Pattern handles Auth & Sub checks)
  const result = await withSubscriptionGuard(async (userId) => {
    // 2. Data Validation (Zero Error Protocol)
    const validatedData = documentSchema.parse(data);

    // 3. Create standardized client (Respects RLS)
    const supabase = await createClient();

    // 4. Insert to Supabase
    const { data: insertedData, error } = await supabase
      .from("documents")
      .insert([
        {
          partner_id: userId,
          owner_name: validatedData.ownerName,
          document_type: validatedData.documentType,
          issued_date: validatedData.issuedDate,
          expiry_date: validatedData.expiryDate,
          status: validatedData.status,
          issuer: validatedData.issuer,
          metadata: validatedData.metadata,
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
}
