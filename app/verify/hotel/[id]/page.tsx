import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import VerifyHotelClient from "./VerifyHotelClient";

interface VerifyHotelPageProps {
  params: Promise<{ id: string }>;
}

export default async function VerifyHotelPage({
  params,
}: VerifyHotelPageProps) {
  const { id } = await params;

  // UUID validation basic regex
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(id)) {
    return notFound();
  }

  const adminClient = createAdminClient();
  const { data: bookingData, error } = await adminClient
    .from("hotel_bookings")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !bookingData) {
    return notFound();
  }

  // Expiry Logic: 7 Days from created_at
  const createdAt = new Date(bookingData.created_at);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - createdAt.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const isExpired = diffDays > 7;

  return (
    <VerifyHotelClient
      booking={bookingData}
      isExpired={isExpired}
      daysLeft={7 - diffDays > 0 ? 7 - diffDays : 0}
    />
  );
}
