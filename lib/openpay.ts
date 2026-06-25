export type OpenpayCheckoutPayload = {
  orderId: string;
  amount: number;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    unitPrice: number;
  }>;
};

export type OpenpayChargePayload = OpenpayCheckoutPayload & {
  tokenId: string;
  deviceSessionId: string;
  redirectUrl?: string;
};

export type OpenpayChargeStatus = "completed" | "in_progress" | "failed" | "cancelled" | "refunded";

export type OpenpayChargeResponse = {
  id: string;
  status: string;
  amount: number;
  order_id?: string;
  authorization?: string;
  error_message?: string;
  payment_method?: {
    url?: string;
    type?: string;
  };
};

export type OpenpayErrorResponse = {
  category?: string;
  description?: string;
  error_code?: number;
  http_code?: number;
  request_id?: string;
};

export class OpenpayChargeError extends Error {
  status: number;
  details: OpenpayErrorResponse | null;

  constructor(message: string, status: number, details: OpenpayErrorResponse | null) {
    super(message);
    this.name = "OpenpayChargeError";
    this.status = status;
    this.details = details;
  }
}

function getBasicAuth(privateKey: string) {
  return Buffer.from(`${privateKey}:`).toString("base64");
}

function getOpenpayBaseUrl(production: boolean) {
  return production ? "https://api.openpay.mx" : "https://sandbox-api.openpay.mx";
}

export async function createOpenpayCharge(
  payload: OpenpayChargePayload,
  config: { merchantId: string; privateKey: string; production: boolean }
) {
  const response = await fetch(
    `${getOpenpayBaseUrl(config.production)}/v1/${config.merchantId}/charges`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${getBasicAuth(config.privateKey)}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        method: "card",
        amount: Number(payload.amount.toFixed(2)),
        currency: "MXN",
        source_id: payload.tokenId,
        description: `Compra CAMHE Iluminacion ${payload.orderId}`,
        order_id: payload.orderId,
        device_session_id: payload.deviceSessionId,
        use_3d_secure: true,
        redirect_url: payload.redirectUrl,
        customer: {
          name: payload.customer.name,
          email: payload.customer.email,
          phone_number: payload.customer.phone
        }
      })
    }
  );

  const data = (await response.json().catch(() => null)) as
    | OpenpayChargeResponse
    | OpenpayErrorResponse
    | null;

  if (!response.ok) {
    const details = data as OpenpayErrorResponse | null;
    throw new OpenpayChargeError(
      details?.description ?? "No fue posible crear el cargo en Openpay.",
      response.status,
      details
    );
  }

  return data as OpenpayChargeResponse;
}

export async function getOpenpayCharge(
  transactionId: string,
  config: { merchantId: string; privateKey: string; production: boolean }
) {
  const response = await fetch(`${getOpenpayBaseUrl(config.production)}/v1/${config.merchantId}/charges/${transactionId}`, {
    method: "GET",
    headers: {
      Authorization: `Basic ${getBasicAuth(config.privateKey)}`,
      Accept: "application/json"
    }
  });

  const data = (await response.json().catch(() => null)) as
    | OpenpayChargeResponse
    | OpenpayErrorResponse
    | null;

  if (!response.ok) {
    const details = data as OpenpayErrorResponse | null;
    throw new OpenpayChargeError(
      details?.description ?? "No fue posible consultar el cargo en Openpay.",
      response.status,
      details
    );
  }

  return data as OpenpayChargeResponse;
}

export function getOpenpayPaymentMessage(status: string, errorMessage?: string) {
  void errorMessage;
  const normalizedStatus = status.toLowerCase();

  if (normalizedStatus === "completed") return "Pago aprobado.";
  if (["failed", "cancelled", "refunded"].includes(normalizedStatus)) return "Transacción fallida.";
  return "Pago pendiente.";
}

export function getOpenpayPaymentState(status: string) {
  const normalizedStatus = status.toLowerCase();

  return {
    approved: normalizedStatus === "completed",
    pending: ["in_progress", "charge_pending"].includes(normalizedStatus),
    rejected: ["failed", "cancelled"].includes(normalizedStatus),
    refunded: normalizedStatus === "refunded"
  };
}
