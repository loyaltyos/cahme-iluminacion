import { NextResponse } from "next/server";

type OpenpayEvent = {
  type?: unknown;
  transaction?: unknown;
  event_date?: unknown;
  verification_code?: unknown;
};

const handledEvents = new Set([
  "charge.succeeded",
  "charge.failed",
  "charge.cancelled",
  "charge.refunded",
  "verification"
]);

function hasValidSecret(request: Request) {
  const webhookSecret = process.env.OPENPAY_WEBHOOK_SECRET;
  if (!webhookSecret) return true;

  const headerSecret = request.headers.get("x-openpay-webhook-secret");
  const bearerToken = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  return headerSecret === webhookSecret || bearerToken === webhookSecret;
}

export async function POST(request: Request) {
  if (!hasValidSecret(request)) {
    return NextResponse.json({ error: "Webhook no autorizado." }, { status: 401 });
  }

  const event = (await request.json().catch(() => null)) as OpenpayEvent | null;
  if (!event || typeof event.type !== "string") {
    return NextResponse.json({ error: "Evento invalido." }, { status: 400 });
  }

  if (!handledEvents.has(event.type)) {
    console.log("Openpay event unhandled", event.type, event.transaction);
    return NextResponse.json({ received: true, handled: false });
  }

  switch (event.type) {
    case "verification":
      console.log("Openpay webhook verification", event.verification_code);
      break;
    case "charge.succeeded":
      console.log("Openpay charge succeeded", event.transaction);
      break;
    case "charge.failed":
      console.log("Openpay charge failed", event.transaction);
      break;
    case "charge.cancelled":
      console.log("Openpay charge cancelled", event.transaction);
      break;
    case "charge.refunded":
      console.log("Openpay charge refunded", event.transaction);
      break;
  }

  return NextResponse.json({ received: true, handled: true });
}
