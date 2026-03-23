import { NextResponse } from "next/server";
import crypto from "crypto";
import { BotHandler } from "@/lib/bot/BotHandler";
import { logApiActivity } from "@/lib/utils";

const CHANNEL_ACCESS_TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN || "";
const CHANNEL_SECRET = process.env.LINE_CHANNEL_SECRET || "";

const botHandler = new BotHandler();

export async function POST(request: Request) {
  const startTime = Date.now();
  let rawBody = "";
  try {
    rawBody = await request.text();
    const signature = request.headers.get("x-line-signature") || "";

    // 1. Verify Signature (Security First)
    if (!verifySignature(rawBody, signature)) {
      await logApiActivity({
        endpoint: "/api/line/webhook",
        method: "POST",
        statusCode: 401,
        requestPayload: { rawBody },
        durationMs: Date.now() - startTime,
      });
      return NextResponse.json(
        { status: "invalid signature" },
        { status: 401 },
      );
    }

    const body = JSON.parse(rawBody);
    const events = body.events || [];

    for (const event of events) {
      if (event.type === "message" && event.message.type === "text") {
        const replyToken = event.replyToken;
        const userMessage = event.message.text;

        // 2. Use Strategy Pattern via BotHandler
        const responseText = botHandler.handle(userMessage);

        await replyMessage(replyToken, responseText);
      }
    }

    await logApiActivity({
      endpoint: "/api/line/webhook",
      method: "POST",
      statusCode: 200,
      requestPayload: body,
      durationMs: Date.now() - startTime,
    });

    return NextResponse.json({ status: "success" }, { status: 200 });
  } catch (error) {
    console.error("LINE Webhook Error:", error);

    await logApiActivity({
      endpoint: "/api/line/webhook",
      method: "POST",
      statusCode: 500,
      requestPayload: { rawBody },
      durationMs: Date.now() - startTime,
    });

    return NextResponse.json({ status: "error" }, { status: 500 });
  }
}

function verifySignature(body: string, signature: string): boolean {
  if (!CHANNEL_SECRET) return true;
  const hash = crypto
    .createHmac("sha256", CHANNEL_SECRET)
    .update(body)
    .digest("base64");
  return hash === signature;
}

async function replyMessage(replyToken: string, text: string) {
  const url = "https://api.line.me/v2/bot/message/reply";
  const body = {
    replyToken,
    messages: [
      {
        type: "text",
        text: text,
      },
    ],
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${CHANNEL_ACCESS_TOKEN}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("LINE API Error:", errorData);
  }
}

export async function GET() {
  return NextResponse.json(
    { message: "LINE Webhook for JP Visual Docs is Active." },
    { status: 200 },
  );
}
