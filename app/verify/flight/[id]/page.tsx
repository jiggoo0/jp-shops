import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import VerifyFlightClient from "./VerifyFlightClient";

interface VerifyFlightPageProps {
  params: Promise<{ id: string }>;
}

export default async function VerifyFlightPage({
  params,
}: VerifyFlightPageProps) {
  const { id } = await params;

  // UUID validation basic regex
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(id)) {
    return notFound();
  }

  const adminClient = createAdminClient();
  const { data: ticketData, error } = await adminClient
    .from("flight_tickets")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !ticketData) {
    return notFound();
  }

  // Expiry Logic: 7 Days from created_at
  const createdAt = new Date(ticketData.created_at);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - createdAt.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const isExpired = diffDays > 7;

  return (
    <VerifyFlightClient
      ticket={ticketData}
      isExpired={isExpired}
      daysLeft={7 - diffDays > 0 ? 7 - diffDays : 0}
    />
  );
}
