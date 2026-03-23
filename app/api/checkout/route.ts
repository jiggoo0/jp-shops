import { NextResponse } from "next/server";
import Stripe from "stripe";
import { BillingFactory } from "@/lib/factories/BillingFactory";
import { PlanType } from "@/lib";
import { logApiActivity } from "@/lib/utils";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || "sk_test_mock_key";
const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2026-02-25.clover" as Stripe.LatestApiVersion,
});

export async function POST(req: Request) {
  const startTime = Date.now();
  let body: { planId?: string; returnUrl?: string } | undefined;
  try {
    body = await req.json();
    const planId = body?.planId;
    const returnUrl = body?.returnUrl;

    if (!planId) {
      return NextResponse.json(
        { status: "error", message: "Missing plan identifier" },
        { status: 400 },
      );
    }

    // 1. Use Factory to create standardized Stripe Item
    const lineItem = BillingFactory.createStripeItem(planId as PlanType);
    const metadata = BillingFactory.getPlanMetadata(planId as PlanType);

    // 2. สร้าง Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "promptpay"],
      line_items: [lineItem],
      mode: "payment",
      metadata: metadata,
      success_url: `${returnUrl || process.env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}&plan_id=${planId || ""}`,
      cancel_url: `${returnUrl || process.env.NEXT_PUBLIC_SITE_URL}/cancel`,
    });

    const responseData = { status: "success", data: { url: session.url } };

    await logApiActivity({
      endpoint: "/api/checkout",
      method: "POST",
      statusCode: 200,
      requestPayload: body,
      responsePayload: responseData,
      durationMs: Date.now() - startTime,
    });

    return NextResponse.json(responseData);
  } catch (error: unknown) {
    console.error("Stripe Error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Internal Server Error";

    await logApiActivity({
      endpoint: "/api/checkout",
      method: "POST",
      statusCode: 500,
      requestPayload: body,
      responsePayload: { error: errorMessage },
      durationMs: Date.now() - startTime,
    });

    return NextResponse.json(
      { status: "error", message: errorMessage },
      { status: 500 },
    );
  }
}
