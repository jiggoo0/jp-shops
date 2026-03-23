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
  }
}
