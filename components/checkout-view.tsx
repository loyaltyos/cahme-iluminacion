"use client";

import Image from "next/image";
import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Check, CreditCard } from "lucide-react";
import { useCart } from "@/components/cart-provider";
import { formatPrice } from "@/lib/products";

type CardBrand = "visa" | "mastercard" | "amex" | null;

type OpenpayTokenResponse = {
  data?: {
    id?: string;
    description?: string;
  };
  message?: string;
  status?: number;
};

type OpenpayGlobal = {
  setId: (merchantId: string) => void;
  setApiKey: (publicKey: string) => void;
  setSandboxMode: (enabled: boolean) => void;
  getSandboxMode?: () => boolean;
  token: {
    create: (
      cardData: {
        card_number: string;
        holder_name: string;
        expiration_year: string;
        expiration_month: string;
        cvv2: string;
      },
      onSuccess: (response: OpenpayTokenResponse) => void,
      onError: (response: OpenpayTokenResponse) => void
    ) => void;
  };
  deviceData: {
    setup: (formId: string, hiddenFieldName: string) => string;
  };
};

type ChargeResponse = {
  approved?: boolean;
  pending?: boolean;
  rejected?: boolean;
  message?: string;
  redirectUrl?: string | null;
  transactionId?: string;
  error?: string;
  detail?: string;
  category?: string | null;
  errorCode?: number | null;
  requestId?: string | null;
};

class OpenpayCheckoutError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = "OpenpayCheckoutError";
  }
}

declare global {
  interface Window {
    OpenPay?: OpenpayGlobal;
  }
}

const openpayMerchantId = process.env.NEXT_PUBLIC_OPENPAY_MERCHANT_ID ?? "";
const openpayPublicKey = process.env.NEXT_PUBLIC_OPENPAY_PUBLIC_KEY ?? "";
const checkoutFormId = "camhe-openpay-payment-form";
const deviceSessionFieldName = "device_session_id";
const pendingChargeStorageKey = "camhe-openpay-pending-charge";
const checkoutTimeoutMs = 20000;
const openpayScriptGroups = [
  {
    name: "jQuery",
    urls: ["https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"]
  },
  {
    name: "Openpay.js",
    urls: ["https://resources.openpay.mx/lib/openpay-js/1.2.39/openpay.v1.min.js"]
  },
  {
    name: "Openpay device data",
    urls: [
      "https://resources.openpay.mx/lib/openpay-js/1.2.39/openpay-data.v1.min.js",
      "https://resources.openpay.mx/lib/openpay-data-js/1.2.38/openpay-data.v1.min.js",
      "https://openpay.s3.amazonaws.com/openpay-data.v1.min.js"
    ]
  }
];

const openpayClientConfig = {
  merchantId: openpayMerchantId,
  publicKey: openpayPublicKey
};
let openpayLoader: Promise<void> | null = null;

const cardLogos: Record<Exclude<CardBrand, null>, { src: string; alt: string; label: string }> = {
  visa: { src: "/payment/visa.png", alt: "Visa", label: "Visa" },
  mastercard: { src: "/payment/masterCard.png", alt: "Mastercard", label: "Mastercard" },
  amex: { src: "/payment/americanExpress.png", alt: "American Express", label: "Amex" }
};

const topLogos = [
  { name: "Openpay", src: "/payment/LogotipoOpenpay-01.jpg", className: "max-h-9" },
  { name: "Visa", src: "/payment/visa.png", className: "max-h-7" },
  { name: "Mastercard", src: "/payment/masterCard.png", className: "max-h-8" },
  { name: "American Express", src: "/payment/americanExpress.png", className: "max-h-8" }
];

const bankLogos = [
  { name: "BBVA", src: "/payment/BBVA.png" },
  { name: "Citibanamex", src: "/payment/citibanamex.png" },
  { name: "Santander", src: "/payment/santander.png" },
  { name: "Banorte", src: "/payment/banorte.png" },
  { name: "HSBC", src: "/payment/hsbc.png" },
  { name: "Scotiabank", src: "/payment/scotiabank.png" },
  { name: "Banco Azteca", src: "/payment/bancoAzteca.png" }
];

function onlyDigits(value: string) {
  return value.replace(/\D/g, "");
}

function formatCardNumber(value: string) {
  return onlyDigits(value).slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
}

function detectCardBrand(value: string): CardBrand {
  const digits = onlyDigits(value);
  if (digits.startsWith("4")) return "visa";
  if (digits.startsWith("5")) return "mastercard";
  if (digits.startsWith("3")) return "amex";
  return null;
}

function loadScript(src: string) {
  return new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`);

    if (existing?.dataset.loaded === "true") {
      resolve();
      return;
    }

    const script = existing ?? document.createElement("script");

    script.src = src;
    script.async = false;
    script.onload = () => {
      script.dataset.loaded = "true";
      resolve();
    };
    script.onerror = () => reject(new OpenpayCheckoutError(`Fallo carga del script: ${src}`));

    if (!existing) {
      document.head.appendChild(script);
    }
  });
}

async function loadScriptGroup(name: string, urls: string[]) {
  const errors: string[] = [];

  for (const url of urls) {
    try {
      await loadScript(url);
      console.log(`Openpay script cargado: ${name}`, url);
      return;
    } catch (error) {
      console.error("Openpay checkout error", error);
      errors.push(error instanceof Error ? error.message : String(error));
    }
  }

  throw new OpenpayCheckoutError(`Fallo carga del script ${name}: ${errors.join(" | ")}`);
}

function loadOpenpay() {
  if (!openpayLoader) {
    openpayLoader = openpayScriptGroups.reduce(
      (chain, group) => chain.then(() => loadScriptGroup(group.name, group.urls)),
      Promise.resolve()
    );
  }

  return openpayLoader;
}

function configureOpenpay() {
  console.log("window.OpenPay", window.OpenPay);
  console.log("merchant", process.env.NEXT_PUBLIC_OPENPAY_MERCHANT_ID);
  console.log("public", process.env.NEXT_PUBLIC_OPENPAY_PUBLIC_KEY);

  if (!window.OpenPay) {
    throw new OpenpayCheckoutError("Fallo Openpay.js: window.OpenPay no existe despues de cargar el script.");
  }

  if (!openpayClientConfig.merchantId) {
    throw new OpenpayCheckoutError("Fallo merchant: NEXT_PUBLIC_OPENPAY_MERCHANT_ID esta ausente.");
  }

  if (!openpayClientConfig.publicKey) {
    throw new OpenpayCheckoutError("Fallo api key: NEXT_PUBLIC_OPENPAY_PUBLIC_KEY esta ausente.");
  }

  try {
    window.OpenPay.setId(openpayClientConfig.merchantId);
    console.log("OpenPay.setId OK");
  } catch (error) {
    throw new OpenpayCheckoutError("Fallo merchant: OpenPay.setId no pudo inicializarse.", {
      cause: error
    });
  }

  try {
    window.OpenPay.setApiKey(openpayClientConfig.publicKey);
    console.log("OpenPay.setApiKey OK");
  } catch (error) {
    throw new OpenpayCheckoutError("Fallo api key: OpenPay.setApiKey no pudo inicializarse.", {
      cause: error
    });
  }

  try {
    window.OpenPay.setSandboxMode(true);
    if (window.OpenPay.getSandboxMode && window.OpenPay.getSandboxMode() !== true) {
      throw new Error("OpenPay.getSandboxMode no regreso true.");
    }
    console.log("OpenPay.setSandboxMode OK");
  } catch (error) {
    throw new OpenpayCheckoutError("Fallo sandbox: OpenPay.setSandboxMode(true) no pudo inicializarse.", {
      cause: error
    });
  }
}

function getOpenpayError(response: OpenpayTokenResponse) {
  return response.data?.description ?? response.message ?? "Error de validacion de tarjeta.";
}

function getCheckoutErrorMessage(error: unknown) {
  if (error instanceof DOMException && error.name === "AbortError") {
    return "La operacion tardo mas de lo esperado. Intenta nuevamente.";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "No fue posible procesar el pago. Intenta nuevamente.";
}

function withCheckoutTimeout<T>(operation: (signal: AbortSignal) => Promise<T>) {
  const controller = new AbortController();
  let timeoutId: number | undefined;
  const timeout = new Promise<never>((_, reject) => {
    timeoutId = window.setTimeout(() => {
      controller.abort();
      reject(new DOMException("Checkout timeout", "AbortError"));
    }, checkoutTimeoutMs);
  });

  return Promise.race([operation(controller.signal), timeout]).finally(() => {
    if (timeoutId) window.clearTimeout(timeoutId);
  });
}

export function CheckoutView() {
  const { detailedItems, subtotal } = useCart();
  const [paymentError, setPaymentError] = useState("");
  const [paymentNotice, setPaymentNotice] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openpayReady, setOpenpayReady] = useState(false);
  const [card, setCard] = useState({
    number: "",
    holder: "",
    month: "",
    year: "",
    cvv: ""
  });

  const orderId = useMemo(() => `CAMHE-${Date.now().toString().slice(-8)}`, []);
  const cardBrand = detectCardBrand(card.number);

  useEffect(() => {
    let mounted = true;

    async function initializeOpenpay() {
      await loadOpenpay();
      configureOpenpay();
      if (mounted) setOpenpayReady(true);
    }

    initializeOpenpay().catch((error) => {
      console.error("Openpay checkout error", error);
      if (mounted) {
        setPaymentError(getCheckoutErrorMessage(error));
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  function updateCardField(field: keyof typeof card, value: string) {
    setPaymentError("");
    setPaymentNotice("");
    setCard((current) => ({
      ...current,
      [field]:
        field === "number"
          ? formatCardNumber(value)
          : field === "month"
            ? onlyDigits(value).slice(0, 2)
            : field === "year"
              ? onlyDigits(value).slice(0, 2)
              : field === "cvv"
                ? onlyDigits(value).slice(0, 4)
                : value.toUpperCase()
    }));
  }

  function validateCard() {
    const number = onlyDigits(card.number);
    const requiredFields = [
      [card.holder.trim(), "Ingresa el nombre del titular."],
      [number, "Ingresa el numero de tarjeta."],
      [card.month, "Ingresa el mes de vencimiento."],
      [card.year, "Ingresa el ano de vencimiento."],
      [card.cvv, "Ingresa el CVV."]
    ];

    const missing = requiredFields.find(([value]) => !value);
    if (missing) return missing[1];
    if (number.length < 15) return "Revisa el numero de tarjeta.";
    if (Number(card.month) < 1 || Number(card.month) > 12) return "Revisa el mes de vencimiento.";
    if (card.year.length !== 2) return "Ingresa el ano en formato AA.";
    if (card.cvv.length < 3) return "Revisa el CVV.";
    return "";
  }

  async function createCardToken() {
    await loadOpenpay();
    configureOpenpay();

    return new Promise<string>((resolve, reject) => {
      window.OpenPay?.token.create(
        {
          card_number: onlyDigits(card.number),
          holder_name: card.holder.trim(),
          expiration_year: card.year,
          expiration_month: card.month.padStart(2, "0"),
          cvv2: card.cvv
        },
        (response) => {
          const tokenId = response.data?.id;

          if (tokenId) {
            resolve(tokenId);
            return;
          }

          reject(new Error("Error de validacion: Openpay no devolvio token de tarjeta."));
        },
        (response) => reject(new OpenpayCheckoutError(`Tokenizacion fallida: ${getOpenpayError(response)}`))
      );
    });
  }

  function createDeviceSessionId() {
    configureOpenpay();

    if (!window.OpenPay?.deviceData?.setup) {
      throw new OpenpayCheckoutError(
        "Fallo device_session_id: OpenPay.deviceData.setup no esta disponible."
      );
    }

    const deviceSessionId = window.OpenPay?.deviceData.setup(
      checkoutFormId,
      deviceSessionFieldName
    );

    if (!deviceSessionId) {
      throw new OpenpayCheckoutError("No fue posible generar device_session_id.");
    }

    console.log("OpenPay.deviceData.setup OK");
    return deviceSessionId;
  }

  async function handlePayment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPaymentError("");
    setPaymentNotice("");

    const validationMessage = validateCard();
    if (validationMessage) {
      setPaymentError(`Error de validacion: ${validationMessage}`);
      return;
    }

    setIsSubmitting(true);
    let shouldResetLoading = true;

    try {
      const data = await withCheckoutTimeout(async (signal) => {
        const formData = new FormData(event.currentTarget);
        await loadOpenpay();
        configureOpenpay();
        setOpenpayReady(true);
        const deviceSessionId = createDeviceSessionId();
        const tokenId = await createCardToken();

        const response = await fetch("/api/openpay/create-charge", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            orderId,
            amount: subtotal,
            token_id: tokenId,
            device_session_id: deviceSessionId,
            customer: {
              name: String(formData.get("name") ?? "").trim(),
              email: String(formData.get("email") ?? "").trim(),
              phone: String(formData.get("phone") ?? "").trim()
            },
            items: detailedItems.map((item) => ({
              id: item.productId,
              name: item.product.name,
              quantity: item.quantity,
              unitPrice: item.product.price
            }))
          }),
          signal
        });
        const chargeData = (await response.json().catch(() => null)) as ChargeResponse | null;

        if (!response.ok) {
          throw new OpenpayCheckoutError(
            chargeData?.error ?? "No fue posible procesar el pago con Openpay."
          );
        }

        if (!chargeData) {
          throw new OpenpayCheckoutError("Respuesta invalida de Openpay.");
        }

        return chargeData;
      });

      if (!data.redirectUrl) {
        setPaymentError("No se pudo iniciar la autenticacion 3D Secure. Intenta nuevamente.");
        if (data.errorCode || data.requestId) {
          setPaymentNotice(
            [
              data.errorCode ? `Codigo Openpay: ${data.errorCode}` : "",
              data.requestId ? `Solicitud: ${data.requestId}` : ""
            ]
              .filter(Boolean)
              .join(" - ")
          );
        }
        return;
      }

      if (data.transactionId) {
        window.sessionStorage.setItem(
          pendingChargeStorageKey,
          JSON.stringify({ transactionId: data.transactionId, orderId })
        );
      }
      shouldResetLoading = false;
      setPaymentNotice("Pago en validacion. Te redirigiremos a la confirmacion bancaria.");
      window.location.href = data.redirectUrl;
    } catch (error) {
      console.error("Openpay checkout error", error);
      setPaymentError(getCheckoutErrorMessage(error));
      return;
    } finally {
      if (shouldResetLoading) {
        setIsSubmitting(false);
      }
    }
  }

  if (detailedItems.length === 0) {
    return (
      <section className="container-page py-20">
        <div className="mx-auto max-w-2xl border border-black/10 bg-camhe-light p-8 text-center shadow-sm">
          <h1 className="text-3xl font-black text-camhe-black">No hay productos para pagar</h1>
          <p className="mt-3 text-camhe-steel">Agrega productos al carrito para iniciar tu compra.</p>
          <Link
            className="focus-ring mt-6 inline-flex rounded-sm bg-camhe-red px-6 py-3 font-black text-white"
            href="/catalogo"
          >
            Ver catalogo
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-camhe-light py-16">
      <div className="container-page grid gap-8 lg:grid-cols-[minmax(0,1fr)_390px]">
        <form
          id={checkoutFormId}
          className="grid min-w-0 gap-6 border border-black/10 bg-white p-5 shadow-sm md:p-8"
          onSubmit={handlePayment}
        >
          <input type="hidden" name={deviceSessionFieldName} />
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-camhe-red">
              Checkout seguro
            </p>
            <h1 className="mt-3 text-3xl font-black text-camhe-black md:text-4xl">
              Finaliza tu compra
            </h1>
            <p className="mt-3 max-w-2xl text-camhe-steel">
              Completa tus datos para coordinar entrega, facturacion y pago con tarjeta.
            </p>
          </div>

          <div className="grid min-w-0 gap-4 md:grid-cols-2">
            <label className="grid min-w-0 gap-2 text-sm font-bold">
              Nombre completo
              <input required className="focus-ring h-12 w-full min-w-0 border border-black/15 px-4 font-normal" name="name" />
            </label>
            <label className="grid min-w-0 gap-2 text-sm font-bold">
              Telefono
              <input required className="focus-ring h-12 w-full min-w-0 border border-black/15 px-4 font-normal" name="phone" />
            </label>
            <label className="grid min-w-0 gap-2 text-sm font-bold md:col-span-2">
              Email
              <input required type="email" className="focus-ring h-12 w-full min-w-0 border border-black/15 px-4 font-normal" name="email" />
            </label>
            <label className="grid min-w-0 gap-2 text-sm font-bold md:col-span-2">
              Direccion de entrega
              <textarea required className="focus-ring min-h-28 w-full min-w-0 border border-black/15 px-4 py-3 font-normal" name="address" />
            </label>
            <label className="grid min-w-0 gap-2 text-sm font-bold md:col-span-2">
              Requerimientos de facturacion o proyecto
              <textarea className="focus-ring min-h-24 w-full min-w-0 border border-black/15 px-4 py-3 font-normal" name="notes" />
            </label>
          </div>

          <section className="min-w-0 overflow-hidden rounded-xl border border-black/10 bg-white p-5 shadow-[0_22px_70px_rgba(11,11,13,0.09)] md:p-7">
            <div className="grid gap-5">
              <div className="max-w-3xl">
                <h2 className="text-2xl font-black text-camhe-black">Datos de pago</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-camhe-steel">
                  Tus datos de tarjeta se tokenizan directamente con Openpay y no son
                  almacenados por CAMHE Iluminacion.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {topLogos.map((logo) => (
                  <div
                    key={logo.name}
                    className="flex h-14 min-w-0 items-center justify-center rounded-lg border border-black/10 bg-white px-4 shadow-[0_8px_24px_rgba(11,11,13,0.05)]"
                  >
                    <Image
                      src={logo.src}
                      alt={logo.name}
                      width={120}
                      height={42}
                      className={`w-auto object-contain ${logo.className}`}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 border-y border-black/10 py-4">
              <div className="mb-3 flex items-center justify-between gap-4">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-camhe-steel">
                  Bancos participantes
                </p>
                <span className="hidden text-xs font-bold text-camhe-steel sm:inline">
                  Desliza para ver mas
                </span>
              </div>
              <div className="-mx-1 flex gap-3 overflow-x-auto px-1 pb-2 [scrollbar-width:thin]">
                {bankLogos.map((bank) => (
                  <div
                    key={bank.name}
                    className="flex h-12 w-36 shrink-0 items-center justify-center rounded-full border border-black/10 bg-camhe-light px-5"
                  >
                    <Image
                      src={bank.src}
                      alt={bank.name}
                      width={110}
                      height={38}
                      className="max-h-7 w-auto object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-black/10 bg-white p-4 shadow-[0_10px_32px_rgba(11,11,13,0.06)] md:p-5">
              <div className="grid min-w-0 gap-4">
                <label className="grid min-w-0 gap-2 text-sm font-bold">
                  Nombre del titular
                  <input
                    required
                    autoComplete="cc-name"
                    data-openpay-card="holder_name"
                    className="focus-ring h-[52px] w-full min-w-0 rounded-[10px] border border-black/15 bg-white px-4 font-normal placeholder:text-camhe-steel/55"
                    value={card.holder}
                    onChange={(event) => updateCardField("holder", event.target.value)}
                    placeholder="Nombre como aparece en la tarjeta"
                  />
                </label>
                <label className="grid min-w-0 gap-2 text-sm font-bold">
                  Numero de tarjeta
                  <div className="flex h-[52px] min-w-0 items-center rounded-[10px] border border-black/15 bg-white">
                    <input
                      required
                      inputMode="numeric"
                      autoComplete="cc-number"
                      data-openpay-card="card_number"
                      className="focus-ring h-full min-w-0 flex-1 rounded-[10px] px-4 font-normal outline-none placeholder:text-camhe-steel/55"
                      value={card.number}
                      onChange={(event) => updateCardField("number", event.target.value)}
                      placeholder="0000 0000 0000 0000"
                    />
                    <div className="mr-3 flex h-9 w-14 shrink-0 items-center justify-center rounded-md border border-black/10 bg-white">
                      {cardBrand ? (
                        <Image
                          src={cardLogos[cardBrand].src}
                          alt={cardLogos[cardBrand].alt}
                          width={56}
                          height={28}
                          className="max-h-7 w-auto object-contain"
                        />
                      ) : (
                        <CreditCard size={22} className="text-camhe-steel" />
                      )}
                    </div>
                  </div>
                </label>
                <div className="grid min-w-0 gap-3 md:grid-cols-3">
                  <label className="grid min-w-0 gap-2 text-sm font-bold">
                    MM
                    <input
                      required
                      inputMode="numeric"
                      autoComplete="cc-exp-month"
                      data-openpay-card="expiration_month"
                      className="focus-ring h-[52px] w-full min-w-0 rounded-[10px] border border-black/15 bg-white px-4 font-normal placeholder:text-camhe-steel/55"
                      value={card.month}
                      onChange={(event) => updateCardField("month", event.target.value)}
                      placeholder="MM"
                    />
                  </label>
                  <label className="grid min-w-0 gap-2 text-sm font-bold">
                    AA
                    <input
                      required
                      inputMode="numeric"
                      autoComplete="cc-exp-year"
                      data-openpay-card="expiration_year"
                      className="focus-ring h-[52px] w-full min-w-0 rounded-[10px] border border-black/15 bg-white px-4 font-normal placeholder:text-camhe-steel/55"
                      value={card.year}
                      onChange={(event) => updateCardField("year", event.target.value)}
                      placeholder="AA"
                    />
                  </label>
                  <label className="grid min-w-0 gap-2 text-sm font-bold">
                    CVV
                    <input
                      required
                      inputMode="numeric"
                      autoComplete="cc-csc"
                      data-openpay-card="cvv2"
                      className="focus-ring h-[52px] w-full min-w-0 rounded-[10px] border border-black/15 bg-white px-4 font-normal placeholder:text-camhe-steel/55"
                      value={card.cvv}
                      onChange={(event) => updateCardField("cvv", event.target.value)}
                      placeholder="CVV"
                    />
                  </label>
                </div>
              </div>
            </div>

            {paymentError && (
              <p className="mt-5 rounded-lg border border-camhe-red/25 bg-camhe-light px-4 py-3 text-sm font-bold text-camhe-red">
                {paymentError}
              </p>
            )}
            {paymentNotice && (
              <p className="mt-5 rounded-lg border border-black/10 bg-camhe-light px-4 py-3 text-sm font-bold leading-6 text-camhe-graphite">
                {paymentNotice}
              </p>
            )}

            <div className="mt-6 grid gap-3 border-t border-black/10 pt-5 text-sm leading-6 text-camhe-steel">
              <p className="flex gap-3">
                <Check size={18} className="mt-0.5 shrink-0 text-camhe-red" />
                <span>Pagos procesados de forma segura mediante Openpay.</span>
              </p>
              <p className="flex gap-3">
                <Check size={18} className="mt-0.5 shrink-0 text-camhe-red" />
                <span>Tus datos no son almacenados por CAMHE Iluminacion.</span>
              </p>
              <p className="flex gap-3">
                <Check size={18} className="mt-0.5 shrink-0 text-camhe-red" />
                <span>Proteccion antifraude y 3D Secure.</span>
              </p>
            </div>
          </section>

          <label className="flex gap-3 text-sm leading-6 text-camhe-steel">
            <input required type="checkbox" className="mt-1 h-4 w-4 accent-camhe-red" />
            <span>
              He leido y acepto los{" "}
              <Link href="/terminos-y-condiciones" className="font-bold text-camhe-red" target="_blank">
                Terminos y Condiciones
              </Link>
              ,{" "}
              <Link href="/aviso-de-privacidad" className="font-bold text-camhe-red" target="_blank">
                Aviso de Privacidad
              </Link>
              ,{" "}
              <Link href="/politica-de-envios" className="font-bold text-camhe-red" target="_blank">
                Politica de Envios
              </Link>{" "}
              y{" "}
              <Link href="/politica-de-devoluciones" className="font-bold text-camhe-red" target="_blank">
                Politica de Devoluciones
              </Link>
              .
            </span>
          </label>

          <div>
            <button
              className="focus-ring inline-flex w-full justify-center rounded-xl bg-camhe-red px-6 py-4 text-sm font-black uppercase tracking-[0.1em] text-white shadow-[0_14px_32px_rgba(215,25,32,0.22)] transition hover:bg-camhe-black disabled:cursor-not-allowed disabled:opacity-70"
              disabled={isSubmitting || !openpayReady}
            >
              {!openpayReady ? "Preparando pago" : isSubmitting ? "Validando pago" : "Pagar con Openpay"}
            </button>
            <p className="mt-3 text-center text-xs leading-5 text-camhe-steel">
              Transaccion protegida con sistema antifraude Openpay.
            </p>
          </div>
        </form>

        <aside className="h-fit border border-black/10 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-black text-camhe-black">Resumen del pedido</h2>
          <p className="mt-1 text-sm font-bold uppercase tracking-[0.12em] text-camhe-steel">
            {orderId}
          </p>
          <div className="mt-5 grid gap-4">
            {detailedItems.map((item) => (
              <div key={item.productId} className="flex justify-between gap-4 text-sm">
                <span>{item.quantity} x {item.product.name}</span>
                <strong>{formatPrice(item.product.price * item.quantity)}</strong>
              </div>
            ))}
          </div>
          <div className="mt-5 border-t border-black/10 pt-5">
            <div className="flex justify-between text-lg font-black">
              <span>Total</span>
              <span className="text-camhe-red">{formatPrice(subtotal)}</span>
            </div>
            <p className="mt-3 text-xs leading-5 text-camhe-steel">
              Envio coordinado segun ubicacion, volumen y disponibilidad del pedido.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
