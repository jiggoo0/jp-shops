import { NextResponse } from "next/server";
import Stripe from "stripe";
import { headers } from "next/headers";
import { createAdminClient } from "@/lib/supabase/admin";
import { calculateExpiryDate } from "@/lib";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  apiVersion: "2026-02-25.clover" as any,
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("stripe-signature") as string;

  let event: Stripe.Event;

  try {
    if (!webhookSecret) {
      console.error("❌ Missing STRIPE_WEBHOOK_SECRET");
      return NextResponse.json(
        { error: "Webhook secret missing" },
        { status: 400 },
      );
    }
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error(`❌ Webhook Error: ${message}`);
    return NextResponse.json(
      { error: `Webhook Error: ${message}` },
      { status: 400 },
    );
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object as Stripe.Checkout.Session;
      await handleSuccessfulPayment(session);
      break;

    default:
      console.log(`ℹ️ Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}

async function handleSuccessfulPayment(session: Stripe.Checkout.Session) {
  const { userId, targetId, category, days } = session.metadata || {};

  if (!userId || !targetId) {
    console.error("❌ Missing metadata in Stripe session", session.id);
    return;
  }

  const supabase = createAdminClient();

  // 1. Update Payment record
  await supabase
    .from("payments")
    .update({
      status: "completed",
      updated_at: new Date().toISOString(),
    })
    .eq("stripe_session_id", session.id);

  // 2. If it's a subscription, update user's plan and expiry
  if (category === "subscription") {
    const expiryDate = calculateExpiryDate(Number(days || 30));

    const { error: updateError } = await supabase
      .from("users")
      .update({
        subscription_status: "active",
        subscription_end_date: expiryDate.toISOString(),
        plan_id: targetId,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId);

    if (updateError) {
      console.error(`❌ Error updating user ${userId}:`, updateError.message);
    } else {
      console.log(
        `✅ User ${userId} upgraded to ${targetId} until ${expiryDate.toLocaleDateString()}`,
      );
    }
  } else if (category === "service" && targetId === "flight_ticket") {
    // 3. If it's a flight ticket generation service
    const flightMetadata = session.metadata || {};
    console.log(`✅ Flight Ticket Generation Triggered for ${userId}`);

    // Save to flight_tickets table
    const { data: ticketData, error: ticketError } = await supabase
      .from("flight_tickets")
      .insert({
        user_id: userId,
        airline: flightMetadata.airline,
        passenger_name: flightMetadata.passengerName,
        pnr: flightMetadata.pnr,
        eticket: flightMetadata.eTicket,
        flight_data: {
          flightNumber: flightMetadata.flightNumber,
          departure: flightMetadata.departure,
          departureTime: flightMetadata.departureTime,
          arrival: flightMetadata.arrival,
          arrivalTime: flightMetadata.arrivalTime,
          date: flightMetadata.date,
          cabinClass: flightMetadata.cabinClass,
          seat: flightMetadata.seat,
          issueDate: flightMetadata.issueDate,
        },
        payment_id: session.id, // Or look up the payment record ID
      })
      .select()
      .single();

    if (ticketError) {
      console.error("❌ Error saving flight ticket:", ticketError.message);
    } else {
      console.log(`✅ Flight Ticket record created: ${ticketData.id}`);

      // In a real implementation:
      // a. Generate High-Res PDF without watermarks using Puppeteer/Playwright
      // b. Send via selected deliveryMethod (Email or LINE)
      if (flightMetadata.deliveryMethod === "line") {
        console.log(
          `📡 Dispatching PDF to LINE ID: ${flightMetadata.lineId} for Ticket ID: ${ticketData.id}`,
        );
      } else {
        console.log(
          `📧 Dispatching PDF to Email: ${flightMetadata.guestEmail} for Ticket ID: ${ticketData.id}`,
        );
      }
    }
  } else if (category === "service" && targetId === "hotel_booking") {
    // 4. If it's a hotel booking generation service
    const hotelMetadata = session.metadata || {};
    console.log(`✅ Hotel Booking Generation Triggered for ${userId}`);

    // Save to hotel_bookings table
    const { data: bookingData, error: bookingError } = await supabase
      .from("hotel_bookings")
      .insert({
        user_id: userId,
        hotel_name: hotelMetadata.hotelName,
        guest_name: hotelMetadata.guestName,
        confirmation_no: hotelMetadata.confirmationNo,
        check_in_date: hotelMetadata.checkInDate,
        check_out_date: hotelMetadata.checkOutDate,
        room_type: hotelMetadata.roomType,
        address: hotelMetadata.address,
        payment_id: session.id,
      })
      .select()
      .single();

    if (bookingError) {
      console.error("❌ Error saving hotel booking:", bookingError.message);
    } else {
      console.log(`✅ Hotel Booking record created: ${bookingData.id}`);
      if (hotelMetadata.deliveryMethod === "line") {
        console.log(
          `📡 Dispatching Hotel PDF to LINE ID: ${hotelMetadata.lineId} for Booking ID: ${bookingData.id}`,
        );
      } else {
        console.log(
          `📧 Dispatching Hotel PDF to Email: ${hotelMetadata.guestEmail} for Booking ID: ${bookingData.id}`,
        );
      }
    }
  }
}
