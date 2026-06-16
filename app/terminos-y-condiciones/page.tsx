import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terminos y Condiciones",
  description: "Terminos de compra y uso de CAMHE Iluminacion."
};

export default function TerminosPage() {
  return (
    <section className="container-page max-w-4xl py-16">
      <p className="text-sm font-black uppercase tracking-[0.18em] text-camhe-red">Legal</p>
      <h1 className="mt-3 text-4xl font-black text-camhe-black">Terminos y Condiciones</h1>
      <div className="mt-8 space-y-5 leading-7 text-camhe-steel">
        <p>
          Estos terminos regulan el uso del sitio CAMHE Iluminacion y las compras
          realizadas en linea de luminarias, alumbrado publico, iluminacion
          industrial, energia solar y accesorios electricos.
        </p>
        <p>
          La informacion de productos, precios, promociones, existencias y tiempos
          de entrega puede actualizarse sin previo aviso. CAMHE Iluminacion
          confirmara disponibilidad, condiciones comerciales y datos de entrega
          antes de concluir el procesamiento del pedido.
        </p>
        <p>
          El cliente debe proporcionar datos correctos de contacto, facturacion y
          domicilio de entrega. En productos de gran formato, postes, luminarias de
          alto montaje o componentes electricos especializados, la entrega puede
          requerir coordinacion logistica adicional.
        </p>
        <p>Las transacciones serán efectuadas mediante la pasarela de Openpay.</p>
        <p>
          CAMHE Iluminacion podra solicitar informacion adicional para validar la
          compra, prevenir operaciones no autorizadas o coordinar la facturacion
          correspondiente.
        </p>
        <p>
          El uso, instalacion y mantenimiento de los productos debe realizarse de
          acuerdo con sus especificaciones tecnicas, normatividad aplicable y por
          personal calificado cuando corresponda.
        </p>
      </div>
    </section>
  );
}
