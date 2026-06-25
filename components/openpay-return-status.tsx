"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

type PendingCharge = {
  transactionId?: string;
  orderId?: string;
};

type VerificationResponse = {
  approved?: boolean;
  pending?: boolean;
  rejected?: boolean;
  refunded?: boolean;
  status?: string;
  transactionId?: string;
  orderId?: string | null;
  message?: string;
  error?: string;
};

const pendingChargeStorageKey = "camhe-openpay-pending-charge";

function readPendingCharge() {
  try {
    const stored = window.sessionStorage.getItem(pendingChargeStorageKey);
    return stored ? (JSON.parse(stored) as PendingCharge) : null;
  } catch {
    return null;
  }
}

function getStatusTitle(data: VerificationResponse | null, loading: boolean) {
  if (loading) return "Pago pendiente";
  if (!data) return "Pago pendiente";
  if (data.approved) return "Pago aprobado";
  if (data.rejected) return "Pago rechazado";
  if (data.refunded) return "Pago reembolsado";
  return "Pago pendiente";
}

export function OpenpayReturnStatus() {
  const searchParams = useSearchParams();
  const [data, setData] = useState<VerificationResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const queryTransactionId = useMemo(
    () =>
      searchParams.get("transactionId") ??
      searchParams.get("transaction_id") ??
      searchParams.get("id") ??
      "",
    [searchParams]
  );

  useEffect(() => {
    let mounted = true;
    const pendingCharge = readPendingCharge();
    const transactionId = queryTransactionId || pendingCharge?.transactionId || "";

    async function verifyCharge() {
      if (!transactionId) {
        setData({
          pending: true,
          message: "Pago pendiente. No se recibio una referencia de Openpay para verificar el cargo."
        });
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `/api/openpay/verify-charge?transactionId=${encodeURIComponent(transactionId)}`,
          { headers: { Accept: "application/json" } }
        );
        const result = (await response.json()) as VerificationResponse;

        if (!mounted) return;

        setData(
          response.ok
            ? result
            : {
                rejected: true,
                message: result.error ?? "No fue posible consultar el cargo en Openpay."
              }
        );

        if (response.ok && !result.pending) {
          window.sessionStorage.removeItem(pendingChargeStorageKey);
        }
      } catch {
        if (!mounted) return;
        setData({
          pending: true,
          message: "Pago pendiente. No fue posible consultar Openpay en este momento."
        });
      } finally {
        if (mounted) setLoading(false);
      }
    }

    verifyCharge();

    return () => {
      mounted = false;
    };
  }, [queryTransactionId]);

  return (
    <>
      <h1 className="mt-4 text-3xl font-black text-camhe-black">
        {getStatusTitle(data, loading)}
      </h1>
      <p className="mt-3 leading-7 text-camhe-steel">
        {loading
          ? "Estamos consultando Openpay para confirmar el resultado de la transaccion."
          : data?.message ?? "Pago pendiente. Te notificaremos cuando Openpay confirme el resultado."}
      </p>
      {data?.transactionId && (
        <p className="mt-3 text-xs font-bold uppercase tracking-[0.12em] text-camhe-steel">
          Referencia Openpay: {data.transactionId}
        </p>
      )}
    </>
  );
}
