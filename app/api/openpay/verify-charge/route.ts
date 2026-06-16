import { NextResponse } from "next/server";
import { hasOpenpayServerCredentials } from "@/lib/openpay-config";

export async function POST(request: Request) {
  const payload = (await request.json().catch(() => null)) as {
    transactionId?: string;
    orderId?: string;
  } | null;

  if (!payload?.transactionId && !payload?.orderId) {
    return NextResponse.json({ error: "Referencia invalida." }, { status: 400 });
  }

  if (!hasOpenpayServerCredentials()) {
    return NextResponse.json({ error: "Servicio de pago no disponible." }, { status: 503 });
  }

  return NextResponse.json({
    status: "pending",
    transactionId: payload.transactionId ?? null,
    orderId: payload.orderId ?? null
  });
}
