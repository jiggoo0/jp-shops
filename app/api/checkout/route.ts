import { NextResponse } from "next/server";
import Stripe from "stripe";
import { BillingFactory } from "@/lib/factories/BillingFactory";
import { PlanType, ServiceId, PaymentCategory } from "@/lib";
import { createAdminClient } from "@/lib/supabase/admin";
import { logApiActivity } from "@/lib/utils";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
  console.warn(
    "⚠️ Warning: STRIPE_SECRET_KEY is not defined. Checkout will fail.",
  );
}

const stripe = new Stripe(stripeSecretKey || "sk_test_empty", {
  apiVersion: "2026-02-25.clover", // Update to latest stable API version for current library
});

export async function POST(req: Request) {
  const startTime = Date.now();
  let body:
    | {
        planId?: string;
        serviceId?: string;
        category?: PaymentCategory;
        returnUrl?: string;
        userId?: string;
        metadata?: Record<string, string>;
      }
    | undefined;

  try {
    body = await req.json();
    const category = body?.category || "subscription";
    const targetId =
      category === "subscription" ? body?.planId : body?.serviceId;
    const returnUrl = body?.returnUrl;
    const userId = body?.userId;
    const extraMetadata = body?.metadata || {}; // เพิ่มการรับ Metadata เพิ่มเติม

    if (!targetId) {
      return NextResponse.json(
        { status: "error", message: "Missing target identifier" },
        { status: 400 },
      );
    }

    // 1. Create standardized Stripe Item using Factory
    const lineItem = BillingFactory.createStripeItem(
      targetId as PlanType | ServiceId,
      category,
    );
    const metadataFromFactory = BillingFactory.getPlanMetadata(
      targetId as PlanType | ServiceId,
      category,
    );

    // 2. Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: [
        "card",
        "promptpay",
      ] as Stripe.Checkout.SessionCreateParams.PaymentMethodType[],
      line_items: [lineItem],
      mode: "payment",
      metadata: {
        userId: userId || "",
        targetId: targetId as string,
        category: category as string,
        days: String(metadataFromFactory?.days || "0"),
        type: String(metadataFromFactory?.type || ""),
        ...extraMetadata, // รวม metadata เพิ่มเติม (เช่น ชื่อลูกค้า, เบอร์โทรเฉพาะเคส)
      },
      success_url: `${returnUrl || process.env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}&category=${category}&target_id=${targetId}`,
      cancel_url: `${returnUrl || process.env.NEXT_PUBLIC_SITE_URL}/cancel`,
    });

    // 3. บันทึกข้อมูลการชำระเงินเริ่มต้นลงในตาราง payments (ถ้ามี userId)
    if (userId) {
      const adminClient = createAdminClient();
      await adminClient.from("payments").insert([
        {
          user_id: userId,
          amount: lineItem.price_data.unit_amount / 100,
          status: "pending",
          payment_type: category,
          target_id: targetId,
          stripe_session_id: session.id,
        },
      ]);
    }

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

    return NextResponse.json(
      { status: "error", message: errorMessage },
      { status: 500 },
    );
  }
}
