import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aviso de Privacidad",
  description: "Aviso de privacidad de CAMHE Iluminacion."
};

export default function PrivacidadPage() {
  return (
    <section className="container-page max-w-4xl py-16">
      <p className="text-sm font-black uppercase tracking-[0.18em] text-camhe-red">Legal</p>
      <h1 className="mt-3 text-4xl font-black text-camhe-black">Aviso de Privacidad</h1>
      <div className="mt-8 space-y-5 leading-7 text-camhe-steel">
        <p>
          CAMHE Iluminacion utiliza los datos personales del cliente para atender
          pedidos, cotizaciones, pagos, facturacion, entregas, soporte comercial y
          seguimiento de proyectos de iluminacion e infraestructura electrica.
        </p>
        <p>
          Los datos tratados pueden incluir nombre, telefono, correo electronico,
          domicilio de entrega, datos fiscales, historial de pedidos y referencias
          necesarias para validar o coordinar una compra.
        </p>
        <p>
          Los datos podran compartirse con proveedores logisticos, fiscales,
          tecnologicos y de procesamiento de pagos cuando sea necesario para
          completar una transaccion o cumplir obligaciones legales.
        </p>
        <p>
          El cliente puede solicitar acceso, correccion, cancelacion u oposicion
          sobre sus datos escribiendo a ventas@camheiluminacion.com.
        </p>
      </div>
    </section>
  );
}
