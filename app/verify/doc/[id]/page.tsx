import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import VerifyClient from "./VerifyClient";

interface VerifyPageProps {
  params: Promise<{ id: string }>;
}

export default async function VerifyPage({ params }: VerifyPageProps) {
  const { id } = await params;

  // UUID validation basic regex
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(id)) {
    return notFound();
  }

  const adminClient = createAdminClient();
  const { data: docData, error } = await adminClient
    .from("documents")
    .select(
      "id, owner_name, document_type, issued_date, expiry_date, status, issuer",
    )
    .eq("id", id)
    .single();

  if (error || !docData) {
    return notFound();
  }

  const formattedData = {
    id: docData.id,
    ownerName: docData.owner_name,
    documentType: docData.document_type,
    issuedDate: String(docData.issued_date),
    expiryDate: String(docData.expiry_date),
    status: docData.status,
    issuer: docData.issuer,
  };

  return <VerifyClient docData={formattedData} />;
}
