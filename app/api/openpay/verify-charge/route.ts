import { NextResponse } from "next/server";
import { getOpenpayConfig, hasOpenpayServerCredentials } from "@/lib/openpay-config";
import {
  getOpenpayCharge,
  getOpenpayPaymentMessage,
  getOpenpayPaymentState,
  OpenpayChargeError
} from "@/lib/openpay";

function getTransactionIdFromUrl(request: Request) {
  const url = new URL(request.url);
  return url.searchParams.get("transactionId") ?? url.searchParams.get("id") ?? "";
}

function toVerificationResponse(charge: Awaited<ReturnType<typeof getOpenpayCharge>>) {
  return {
    status: charge.status,
    ...getOpenpayPaymentState(charge.status),
    transactionId: charge.id,
    orderId: charge.order_id ?? null,
    amount: charge.amount,
    authorization: charge.authorization ?? null,
    message: getOpenpayPaymentMessage(charge.status, charge.error_message)
  };
}

async function verifyCharge(transactionId: string) {
  if (!transactionId) {
    return NextResponse.json({ error: "Referencia de cargo invalida." }, { status: 400 });
  }

  if (!hasOpenpayServerCredentials()) {
    return NextResponse.json({ error: "Servicio de pago no disponible." }, { status: 503 });
  }

  try {
    const charge = await getOpenpayCharge(transactionId, getOpenpayConfig());
    return NextResponse.json(toVerificationResponse(charge));
  } catch (error) {
    if (error instanceof OpenpayChargeError) {
      return NextResponse.json(
        {
          error: error.message,
          category: error.details?.category ?? null,
          errorCode: error.details?.error_code ?? null,
          requestId: error.details?.request_id ?? null
        },
        { status: error.status >= 400 && error.status < 500 ? 404 : 502 }
      );
    }

    return NextResponse.json({ error: "No fue posible consultar el cargo en Openpay." }, { status: 500 });
  }
}

export async function GET(request: Request) {
  return verifyCharge(getTransactionIdFromUrl(request));
}

export async function POST(request: Request) {
  const payload = (await request.json().catch(() => null)) as {
    transactionId?: string;
    id?: string;
  } | null;

  return verifyCharge(payload?.transactionId ?? payload?.id ?? "");
}
