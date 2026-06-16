import { NextResponse } from "next/server";
import { getOpenpayConfig, hasOpenpayServerCredentials } from "@/lib/openpay-config";
import type { OpenpayCheckoutPayload } from "@/lib/openpay";

type CreateChargeBody = OpenpayCheckoutPayload & {
  tokenId?: string;
  deviceSessionId?: string;
  use3ds?: boolean;
};

function isValidPayload(payload: CreateChargeBody) {
  return Boolean(
    payload.amount > 0 &&
      payload.customer?.name &&
      payload.customer?.email &&
      payload.customer?.phone &&
      payload.items?.length &&
      payload.items.every((item) => item.id && item.name && item.quantity > 0 && item.unitPrice > 0)
  );
}

export async function POST(request: Request) {
  const payload = (await request.json().catch(() => null)) as CreateChargeBody | null;

  if (!payload || !isValidPayload(payload)) {
    return NextResponse.json({ error: "Pedido invalido." }, { status: 400 });
  }

  if (!payload.tokenId || !payload.deviceSessionId) {
    return NextResponse.json({ error: "Datos de pago incompletos." }, { status: 400 });
  }

  if (!hasOpenpayServerCredentials()) {
    return NextResponse.json({ error: "Servicio de pago no disponible." }, { status: 503 });
  }

  const config = getOpenpayConfig();
  const redirectUrl = `${config.siteUrl.replace(/\/$/, "")}/checkout/3ds-return`;

  return NextResponse.json(
    {
      status: "pending",
      orderId: payload.orderId,
      amount: payload.amount,
      redirectUrl
    },
    { status: 202 }
  );
}
