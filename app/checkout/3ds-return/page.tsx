import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ShieldCheck } from "lucide-react";
import { OpenpayReturnStatus } from "@/components/openpay-return-status";

export const metadata: Metadata = {
  title: "Confirmacion de pago",
  description: "Confirmacion de pago CAMHE Iluminacion."
};

export default function ThreeDsReturnPage() {
  return (
    <section className="container-page py-20">
      <div className="mx-auto max-w-2xl border border-black/10 bg-camhe-light p-8 text-center shadow-sm">
        <ShieldCheck className="mx-auto text-camhe-red" size={44} />
        <Suspense
          fallback={
            <>
              <h1 className="mt-4 text-3xl font-black text-camhe-black">Pago pendiente.</h1>
              <p className="mt-3 leading-7 text-camhe-steel">
                Pago pendiente.
              </p>
            </>
          }
        >
          <OpenpayReturnStatus />
        </Suspense>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            className="focus-ring inline-flex rounded-sm bg-camhe-red px-6 py-3 text-sm font-black uppercase tracking-[0.1em] text-white"
            href="/catalogo"
          >
            Seguir comprando
          </Link>
          <Link
            className="focus-ring inline-flex rounded-sm border border-black/15 bg-white px-6 py-3 text-sm font-black uppercase tracking-[0.1em] text-camhe-black"
            href="/contacto"
          >
            Contactar asesor
          </Link>
        </div>
      </div>
    </section>
  );
}
