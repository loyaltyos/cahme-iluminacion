"use client";

import Image from "next/image";
import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { Check, CreditCard, ShieldCheck } from "lucide-react";
import { useCart } from "@/components/cart-provider";
import { formatPrice } from "@/lib/products";

type CardBrand = "visa" | "mastercard" | "amex" | null;

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

export function CheckoutView() {
  const { detailedItems, subtotal, clearCart } = useCart();
  const [sent, setSent] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [paymentNotice, setPaymentNotice] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [card, setCard] = useState({
    number: "",
    holder: "",
    month: "",
    year: "",
    cvv: ""
  });

  const orderId = useMemo(() => `CAMHE-${Date.now().toString().slice(-8)}`, []);
  const cardBrand = detectCardBrand(card.number);

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

  async function handlePayment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPaymentError("");
    setPaymentNotice("");

    const validationMessage = validateCard();
    if (validationMessage) {
      setPaymentError(validationMessage);
      return;
    }

    setIsSubmitting(true);
    const fallbackMessage =
      "Pago pendiente de integración. Un asesor se comunicará contigo para finalizar la compra.";

    try {
      const response = await fetch("/api/openpay/status", {
        method: "GET",
        headers: { Accept: "application/json" }
      });
      const data = (await response.json()) as { enabled?: boolean };

      if (!data.enabled) {
        setPaymentNotice(fallbackMessage);
        return;
      }
    } catch {
      setPaymentNotice(fallbackMessage);
      return;
    } finally {
      setIsSubmitting(false);
    }

    // TODO: Conectar tokenizacion Openpay y enviar token/deviceSessionId a /api/openpay/create-charge.
    clearCart();
    setSent(true);
  }

  if (detailedItems.length === 0 && !sent) {
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

  if (sent) {
    return (
      <section className="container-page py-20">
        <div className="mx-auto max-w-2xl border border-black/10 bg-camhe-light p-8 text-center shadow-sm">
          <ShieldCheck className="mx-auto text-camhe-red" size={44} />
          <h1 className="mt-4 text-3xl font-black text-camhe-black">Pedido recibido</h1>
          <p className="mt-3 text-camhe-steel">
            Recibimos tu solicitud {orderId}. Un asesor CAMHE confirmara disponibilidad,
            entrega y pago seguro.
          </p>
          <Link
            className="focus-ring mt-6 inline-flex rounded-sm bg-camhe-black px-6 py-3 font-black text-white"
            href="/catalogo"
          >
            Seguir comprando
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-camhe-light py-16">
      <div className="container-page grid gap-8 lg:grid-cols-[minmax(0,1fr)_390px]">
        <form
          className="grid min-w-0 gap-6 border border-black/10 bg-white p-5 shadow-sm md:p-8"
          onSubmit={handlePayment}
        >
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
              disabled={isSubmitting}
            >
              {isSubmitting ? "Validando pago" : "Pagar con Openpay"}
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
