import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politica de Envios",
  description: "Politica de envios de CAMHE Iluminacion."
};

export default function PoliticaEnviosPage() {
  return (
    <section className="container-page max-w-4xl py-16">
      <p className="text-sm font-black uppercase tracking-[0.18em] text-camhe-red">Legal</p>
      <h1 className="mt-3 text-4xl font-black text-camhe-black">Politica de Envios</h1>
      <div className="mt-8 space-y-5 leading-7 text-camhe-steel">
        <p>
          Los envios de CAMHE Iluminacion se coordinan segun disponibilidad,
          ubicacion, dimensiones, peso, valor del pedido y caracteristicas de cada
          producto.
        </p>
        <p>
          En compras de luminarias, accesorios y componentes compactos, el envio
          podra realizarse por paqueteria o mensajeria. En postes, equipos solares,
          tableros o productos voluminosos, se podra requerir transporte dedicado o
          maniobras especiales.
        </p>
        <p>
          El costo y fecha estimada de entrega se confirmaran antes del despacho.
          El cliente debe revisar que la direccion, datos de contacto y condiciones
          de recepcion sean correctas.
        </p>
        <p>
          Cualquier dano visible en empaque o producto debe reportarse al momento
          de la entrega con evidencia fotografica para iniciar la revision
          correspondiente.
        </p>
      </div>
    </section>
  );
}
