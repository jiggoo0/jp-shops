import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || "sk_test_mock_key";
const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2026-02-25.clover" as Stripe.LatestApiVersion,
});

export async function POST(req: Request) {
  try {
    const { serviceName, amount, returnUrl } = await req.json();

    if (!serviceName || !amount) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // สร้าง Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "promptpay"], // รองรับบัตรเครดิตและพร้อมเพย์
      line_items: [
        {
          price_data: {
            currency: "thb",
            product_data: {
              name: serviceName,
              description:
                "บริการจัดทำเอกสารและตรวจสอบความถูกต้องด้วย AI (Vifily Standard)",
            },
            unit_amount: amount * 100, // Stripe รับหน่วยเป็นสตางค์
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${returnUrl || process.env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${returnUrl || process.env.NEXT_PUBLIC_SITE_URL}/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: unknown) {
    console.error("Stripe Error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
