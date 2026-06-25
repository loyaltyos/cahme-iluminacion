import { NextResponse } from "next/server";
import { getOpenpayConfig, hasOpenpayServerCredentials } from "@/lib/openpay-config";
import {
  createOpenpayCharge,
  getOpenpayPaymentMessage,
  getOpenpayPaymentState,
  OpenpayChargeError,
  type OpenpayCheckoutPayload
} from "@/lib/openpay";
import { productById } from "@/lib/products";

type CreateChargeBody = OpenpayCheckoutPayload & {
  token_id?: string;
  device_session_id?: string;
};

function getExpectedAmount(payload: CreateChargeBody) {
  return payload.items.reduce<number | null>((total, item) => {
    if (total === null) return null;

    const product = productById.get(item.id);
    if (!product || product.price !== item.unitPrice) return null;

    return total + product.price * item.quantity;
  }, 0);
}

function matchesMoney(left: number, right: number) {
  return Math.round(left * 100) === Math.round(right * 100);
}

function isValidPayload(payload: CreateChargeBody) {
  const expectedAmount = getExpectedAmount(payload);

  return Boolean(
    payload.amount > 0 &&
      expectedAmount !== null &&
      matchesMoney(payload.amount, expectedAmount) &&
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

  if (!payload.token_id || !payload.device_session_id) {
    return NextResponse.json({ error: "Datos de pago incompletos." }, { status: 400 });
  }

  if (!hasOpenpayServerCredentials()) {
    return NextResponse.json({ error: "Servicio de pago no disponible." }, { status: 503 });
  }

  const config = getOpenpayConfig();
  const redirectUrl = `${config.siteUrl.replace(/\/$/, "")}/checkout/3ds-return?orderId=${encodeURIComponent(payload.orderId)}`;

  try {
    const charge = await createOpenpayCharge(
      {
        ...payload,
        tokenId: payload.token_id,
        deviceSessionId: payload.device_session_id,
        redirectUrl
      },
      config
    );

    const redirectTo = charge.payment_method?.url;
    const paymentState = getOpenpayPaymentState(charge.status);

    return NextResponse.json({
      status: charge.status,
      ...paymentState,
      transactionId: charge.id,
      authorization: charge.authorization ?? null,
      orderId: charge.order_id ?? payload.orderId,
      amount: charge.amount,
      payment_method: charge.payment_method ?? null,
      redirectUrl: redirectTo ?? null,
      message: getOpenpayPaymentMessage(charge.status, charge.error_message)
    });
  } catch (error) {
    if (error instanceof OpenpayChargeError) {
      const status = error.status >= 400 && error.status < 500 ? 402 : 502;

      return NextResponse.json(
        {
          error: error.message,
          category: error.details?.category ?? null,
          errorCode: error.details?.error_code ?? null,
          requestId: error.details?.request_id ?? null
        },
        { status }
      );
    }

    return NextResponse.json(
      { error: "No fue posible procesar el pago con Openpay." },
      { status: 500 }
    );
  }
}
