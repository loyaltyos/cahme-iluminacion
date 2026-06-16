import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politica de Devoluciones",
  description: "Politica de devoluciones de CAMHE Iluminacion."
};

export default function PoliticaDevolucionesPage() {
  return (
    <section className="container-page max-w-4xl py-16">
      <p className="text-sm font-black uppercase tracking-[0.18em] text-camhe-red">Legal</p>
      <h1 className="mt-3 text-4xl font-black text-camhe-black">Politica de Devoluciones</h1>
      <div className="mt-8 space-y-5 leading-7 text-camhe-steel">
        <p>
          Las solicitudes de devolucion se revisan con base en el estado del
          producto, accesorios, empaque, documentacion, factura y fecha de compra.
        </p>
        <p>
          Para luminarias, equipos solares, accesorios electricos y componentes de
          instalacion, el producto debe conservar sus condiciones originales y no
          presentar senales de instalacion, manipulacion indebida o modificacion.
        </p>
        <p>
          No aplican devoluciones por instalacion incorrecta, uso indebido,
          variaciones electricas, desgaste normal, modificaciones, dano por humedad
          fuera de especificacion o seleccion incorrecta del producto por parte del
          cliente.
        </p>
        <p>
          Cuando una devolucion sea aprobada, el reembolso se procesara por el
          medio de pago correspondiente y conforme a los tiempos del procesador
          bancario.
        </p>
        <p>
          Domicilio fiscal: Av. Cvln Dr Alt 164, Independiente Poniente, 44290,
          Guadalajara, Jalisco.
        </p>
      </div>
    </section>
  );
}
