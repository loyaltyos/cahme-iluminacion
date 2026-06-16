import Image from "next/image";
import { CreditCard, ShieldCheck } from "lucide-react";

const logos = [
  { name: "Openpay by BBVA", src: "/payment/LogotipoOpenpay-01.jpg", className: "max-h-9" },
  { name: "Visa", src: "/payment/visa.png", className: "max-h-7" },
  { name: "Mastercard", src: "/payment/masterCard.png", className: "max-h-8" },
  { name: "American Express", src: "/payment/americanExpress.png", className: "max-h-8" },
  { name: "BBVA", src: "/payment/BBVA.png", className: "max-h-7" },
  { name: "Citibanamex", src: "/payment/citibanamex.png", className: "max-h-7" },
  { name: "Santander", src: "/payment/santander.png", className: "max-h-7" },
  { name: "Banorte", src: "/payment/banorte.png", className: "max-h-7" },
  { name: "HSBC", src: "/payment/hsbc.png", className: "max-h-7" },
  { name: "Scotiabank", src: "/payment/scotiabank.png", className: "max-h-7" },
  { name: "Banco Azteca", src: "/payment/bancoAzteca.png", className: "max-h-7" }
];

export function PaymentBadges() {
  return (
    <div className="rounded-sm border border-black/10 bg-white p-5 shadow-sm md:p-6">
      <div className="flex items-center gap-2 font-black text-camhe-black">
        <CreditCard size={20} className="text-camhe-red" />
        Pago seguro con tarjeta
      </div>
      <p className="mt-2 text-sm leading-6 text-camhe-steel">
        Tus pagos son procesados de forma segura mediante Openpay by BBVA.
      </p>
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {logos.map((logo) => (
          <div
            key={logo.name}
            className="flex h-16 items-center justify-center rounded-sm border border-black/10 bg-white px-4 shadow-[0_8px_22px_rgba(11,11,13,0.04)]"
          >
            <Image
              src={logo.src}
              alt={logo.name}
              width={150}
              height={56}
              className={`w-auto object-contain ${logo.className}`}
            />
          </div>
        ))}
      </div>
      <div className="mt-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-camhe-steel">
        <ShieldCheck size={16} className="text-camhe-red" />
        Transacciones protegidas
      </div>
    </div>
  );
}
