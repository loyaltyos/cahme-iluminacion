import Link from "next/link";
import { CreditCard } from "lucide-react";
import { Logo } from "@/components/logo";
import { categories, categoryLabels } from "@/lib/products";

export function Footer() {
  return (
    <footer className="bg-camhe-black text-white">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.2fr_1fr_1fr]">
        <div className="space-y-5">
          <Logo inverse />
          <p className="max-w-sm text-sm leading-6 text-white/70">
            Iluminacion e infraestructura electrica para obra publica, industria,
            energia solar y proyectos residenciales de alto desempeno.
          </p>
          <div className="max-w-sm rounded-sm border border-white/10 bg-white/8 p-4">
            <div className="flex items-center gap-2 text-sm font-black text-white">
              <CreditCard size={18} className="text-camhe-red" />
              Pagos seguros con Openpay
            </div>
            <p className="mt-2 text-sm leading-6 text-white/62">
              Aceptamos tarjetas Visa, Mastercard y American Express.
            </p>
          </div>
        </div>
        <div>
          <h2 className="text-sm font-black uppercase tracking-[0.16em]">Categorias</h2>
          <div className="mt-4 grid gap-3 text-sm text-white/72">
            {categories.map((category) => (
              <Link key={category} href={`/catalogo?categoria=${encodeURIComponent(category)}`}>
                {categoryLabels[category]}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-sm font-black uppercase tracking-[0.16em]">Contacto</h2>
          <div className="mt-4 grid gap-3 text-sm text-white/72">
            <span>ventas@camheiluminacion.com</span>
            <span>WhatsApp: +52 999 000 0000</span>
            <span>Mexico</span>
          </div>
          <div className="mt-6 grid gap-2 text-xs font-bold uppercase tracking-[0.12em] text-white/50">
            <Link href="/terminos-y-condiciones">Terminos y Condiciones</Link>
            <Link href="/aviso-de-privacidad">Aviso de Privacidad</Link>
            <Link href="/politica-de-envios">Politica de Envios</Link>
            <Link href="/politica-de-devoluciones">Politica de Devoluciones</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5">
        <div className="container-page text-xs font-bold uppercase tracking-[0.16em] text-white/50">
          © {new Date().getFullYear()} CAMHE Iluminacion. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
