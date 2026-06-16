import { NextResponse } from "next/server";

type OpenpayEvent = {
  type?: unknown;
  transaction?: unknown;
  event_date?: unknown;
};

const handledEvents = new Set([
  "charge.succeeded",
  "charge.failed",
  "charge.cancelled",
  "charge.refunded",
  "chargeback.created",
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

  if (handledEvents.has(event.type)) {
    console.log("Openpay event", event.type, event.transaction);
  } else {
    console.log("Openpay event unhandled", event.type, event.transaction);
  }

  return NextResponse.json({ received: true });
}
