import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Contacta a CAMHE Iluminación para compras y cotizaciones."
};

export default function ContactoPage() {
  return (
    <section className="container-page grid gap-10 py-16 lg:grid-cols-[0.9fr_1.1fr]">
      <div>
        <SectionHeading
          eyebrow="Contacto"
          title="Cotiza productos de iluminación e infraestructura eléctrica."
          description="Envíanos los datos del proyecto y te contactaremos para confirmar disponibilidad, envío y condiciones comerciales."
        />
        <div className="mt-8 grid gap-4 text-camhe-graphite">
          <p className="flex items-center gap-3"><Phone className="text-camhe-red" /> +52 55 4517 4522</p>
          <p className="flex items-center gap-3"><Mail className="text-camhe-red" /> info@camheiluminacion.com</p>
          <p className="flex items-center gap-3"><MapPin className="text-camhe-red" /> Av. Cvln Dr Alt 164, Independiente Poniente, 44290, Guadalajara, Jalisco</p>
        </div>
      </div>
      <form className="grid gap-4 border border-black/10 bg-camhe-light p-6">
        <label className="grid gap-2 text-sm font-bold">
          Nombre
          <input className="focus-ring border border-black/15 px-4 py-3 font-normal" required />
        </label>
        <label className="grid gap-2 text-sm font-bold">
          Email
          <input className="focus-ring border border-black/15 px-4 py-3 font-normal" type="email" required />
        </label>
        <label className="grid gap-2 text-sm font-bold">
          Teléfono
          <input className="focus-ring border border-black/15 px-4 py-3 font-normal" required />
        </label>
        <label className="grid gap-2 text-sm font-bold">
          Mensaje
          <textarea className="focus-ring min-h-36 border border-black/15 px-4 py-3 font-normal" required />
        </label>
        <button className="focus-ring rounded-sm bg-camhe-red px-6 py-4 text-sm font-black uppercase tracking-[0.1em] text-white">
          Enviar mensaje
        </button>
      </form>
    </section>
  );
}
