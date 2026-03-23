import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("LINE Webhook received:", body);

    // TODO: Process messages or events from LINE here

    // LINE requires a 200 OK response immediately
    return NextResponse.json({ status: "success" }, { status: 200 });
  } catch (error) {
    console.error("Error processing LINE webhook:", error);
    return NextResponse.json({ status: "error" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json(
    { message: "LINE Webhook endpoint is active and ready." },
    { status: 200 },
  );
}
