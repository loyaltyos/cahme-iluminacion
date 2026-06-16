import type { Metadata } from "next";
import { Suspense } from "react";
import { CatalogClient } from "@/components/catalog-client";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Catálogo",
  description: "Compra luminarias LED, energía solar y accesorios eléctricos CAMHE."
};

export default function CatalogoPage() {
  return (
    <section className="container-page py-14">
      <SectionHeading
        eyebrow="Catálogo"
        title="Productos CAMHE para iluminación e infraestructura eléctrica."
        description="Explora categorías profesionales, agrega productos al carrito y prepara tu pedido online."
      />
      <div className="mt-10">
        <Suspense fallback={<div className="py-10 font-bold">Cargando catálogo...</div>}>
          <CatalogClient />
        </Suspense>
      </div>
    </section>
  );
}
