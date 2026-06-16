import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Nosotros",
  description: "Conoce CAMHE Iluminación, proveedor de iluminación e infraestructura eléctrica."
};

export default function NosotrosPage() {
  return (
    <section className="container-page py-16">
      <SectionHeading
        eyebrow="Nosotros"
        title="Especialistas en soluciones eléctricas con una visión industrial moderna."
        description="CAMHE Iluminación atiende necesidades de suministro para proyectos públicos, industriales, solares y residenciales con productos seleccionados por desempeño, durabilidad y estética."
      />
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {[
          ["Calidad", "Productos con especificaciones claras para ambientes exigentes."],
          ["Velocidad", "Experiencia de compra preparada para cotización, pago y despacho."],
          ["Escala", "Soluciones para compras unitarias, mantenimiento y proyectos integrales."]
        ].map(([title, description]) => (
          <article key={title} className="border border-black/10 bg-camhe-light p-6">
            <h2 className="text-2xl font-black text-camhe-black">{title}</h2>
            <p className="mt-3 leading-7 text-camhe-steel">{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
