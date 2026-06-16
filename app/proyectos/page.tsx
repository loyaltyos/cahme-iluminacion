import type { Metadata } from "next";
import Image from "next/image";
import { SectionHeading } from "@/components/section-heading";
import { projectImages } from "@/lib/products";

export const metadata: Metadata = {
  title: "Proyectos",
  description: "Aplicaciones CAMHE en alumbrado publico, industria, energia solar y accesorios electricos."
};

const projects = [
  {
    title: "Corredor vial LED",
    copy: "Luminarias viales, postes y controles para mejorar visibilidad en calles, accesos y avenidas.",
    image: projectImages.street
  },
  {
    title: "Nave industrial",
    copy: "High bays, reflectores y lineas hermeticas para operaciones con alta demanda de luz.",
    image: projectImages.industrial
  },
  {
    title: "Alumbrado solar autonomo",
    copy: "Postes solares y luminarias con panel integrado para zonas sin infraestructura electrica.",
    image: projectImages.solar
  },
  {
    title: "Infraestructura electrica",
    copy: "Tableros, protecciones, canalizaciones y cableado para completar instalaciones confiables.",
    image: projectImages.electrical
  }
];

export default function ProyectosPage() {
  return (
    <section className="container-page py-16">
      <SectionHeading
        eyebrow="Proyectos"
        title="Aplicaciones reales para obra, industria y eficiencia energetica."
        description="Escenarios de iluminacion e infraestructura electrica donde CAMHE concentra productos profesionales para compra y cotizacion."
      />
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <article key={project.title} className="group overflow-hidden border border-black/10 bg-white shadow-sm">
            <div className="relative aspect-[16/10] bg-camhe-light">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-black text-camhe-black">{project.title}</h2>
              <p className="mt-3 leading-7 text-camhe-steel">{project.copy}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
