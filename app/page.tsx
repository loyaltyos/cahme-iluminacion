import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CircleDollarSign,
  Factory,
  FileCheck2,
  Headphones,
  Landmark,
  ParkingCircle,
  ShieldCheck,
  SunMedium,
  Truck,
  Zap
} from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import {
  categories,
  categoryLabels,
  featuredProducts,
  heroLightingImage,
  projectImages
} from "@/lib/products";

const trustBadges = [
  ["Pago seguro", ShieldCheck],
  ["Envios coordinados", Truck],
  ["Factura disponible", FileCheck2],
  ["Asesoria tecnica", Headphones]
];

const projectTypes = [
  {
    title: "Fraccionamientos",
    copy: "Alumbrado exterior, postes solares, balizas y luminarias para amenidades.",
    icon: Building2
  },
  {
    title: "Naves industriales",
    copy: "High bays, reflectores y lineas hermeticas para operacion continua.",
    icon: Factory
  },
  {
    title: "Estacionamientos",
    copy: "Reflectores, postes, fotoceldas y soluciones de seguridad perimetral.",
    icon: ParkingCircle
  },
  {
    title: "Parques y vialidades",
    copy: "Luminarias viales, brazos, postes y sistemas solares autonomos.",
    icon: Landmark
  }
];

const reasons = [
  "Productos profesionales",
  "Asesoria tecnica",
  "Cobertura para obra publica y privada",
  "Compra online segura"
];

const gallery = [
  {
    title: "Alumbrado vial",
    image: projectImages.street
  },
  {
    title: "Iluminacion industrial",
    image: projectImages.industrial
  },
  {
    title: "Postes solares",
    image: projectImages.solar
  }
];

export default function Home() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-camhe-black text-white">
        <Image
          src={heroLightingImage}
          alt="Luminaria LED de alumbrado publico CAMHE"
          fill
          priority
          className="absolute inset-0 -z-20 object-cover opacity-62"
          sizes="100vw"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(11,11,13,0.96),rgba(11,11,13,0.78)_46%,rgba(11,11,13,0.28))]" />
        <div className="industrial-grid absolute inset-0 -z-10 opacity-35" />
        <div className="container-page grid min-h-[calc(100vh-76px)] items-center py-16 lg:py-20">
          <div className="max-w-3xl">
            <p className="inline-flex border border-white/15 bg-white/8 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-white/78 backdrop-blur">
              CAMHE Iluminacion
            </p>
            <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[1.08] md:text-5xl lg:text-[58px]">
              Iluminacion LED e infraestructura electrica para proyectos exigentes.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/76 md:text-lg">
              Compra luminarias viales, soluciones industriales, alumbrado solar y
              accesorios electricos con respaldo tecnico para obra publica y privada.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                className="focus-ring inline-flex items-center gap-2 rounded-sm bg-camhe-red px-6 py-4 text-sm font-black uppercase tracking-[0.1em] text-white shadow-[0_14px_32px_rgba(215,25,32,0.28)] transition hover:bg-white hover:text-camhe-black"
                href="/catalogo"
              >
                Comprar iluminacion <ArrowRight size={18} />
              </Link>
              <Link
                className="focus-ring inline-flex rounded-sm border border-white/25 bg-white/8 px-6 py-4 text-sm font-black uppercase tracking-[0.1em] text-white backdrop-blur transition hover:bg-white hover:text-camhe-black"
                href="/contacto"
              >
                Cotizar proyecto
              </Link>
            </div>
            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {trustBadges.map(([label, Icon]) => (
                <div
                  key={label as string}
                  className="flex items-center gap-3 border border-white/12 bg-white/8 px-4 py-3 backdrop-blur"
                >
                  <Icon size={18} className="text-camhe-red" />
                  <span className="text-xs font-black uppercase tracking-[0.12em] text-white/86">
                    {label as string}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <SectionHeading
          eyebrow="Categorias"
          title="Soluciones para alumbrado, industria, energia solar y accesorios electricos."
        />
        <div className="mt-9 grid gap-4 md:grid-cols-5">
          {categories.map((category) => (
            <Link
              key={category}
              href={`/catalogo?categoria=${encodeURIComponent(category)}`}
              className="group border border-black/10 bg-camhe-light p-5 transition hover:-translate-y-1 hover:border-camhe-red hover:bg-white hover:shadow-premium"
            >
              <div className="mb-6 inline-grid h-11 w-11 place-items-center bg-camhe-black text-white group-hover:bg-camhe-red">
                {category === "Energia Solar" ? (
                  <SunMedium size={21} />
                ) : category === "Accesorios Electricos" ? (
                  <Zap size={21} />
                ) : (
                  <Building2 size={21} />
                )}
              </div>
              <h2 className="font-black leading-tight text-camhe-black">
                {categoryLabels[category]}
              </h2>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-camhe-light py-16">
        <div className="container-page">
          <SectionHeading
            eyebrow="Soluciones por tipo de proyecto"
            title="Compra por aplicacion, no solo por producto."
            description="Organizamos la oferta para que encuentres rapido lo que cada obra necesita."
          />
          <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {projectTypes.map(({ title, copy, icon: Icon }) => (
              <article key={title} className="border border-black/10 bg-white p-6 shadow-sm">
                <Icon size={28} className="text-camhe-red" />
                <h2 className="mt-5 text-xl font-black text-camhe-black">{title}</h2>
                <p className="mt-3 text-sm leading-6 text-camhe-steel">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <SectionHeading
          eyebrow="Destacados"
          title="Productos listos para comprar o cotizar en linea."
        />
        <div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="bg-camhe-black py-16 text-white">
        <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-camhe-red">
              Por que elegir CAMHE Iluminacion
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight md:text-5xl">
              Un ecommerce tecnico para compras de iluminacion reales.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {reasons.map((reason) => (
              <div key={reason} className="border border-white/12 bg-white/8 p-5">
                <CircleDollarSign size={22} className="text-camhe-red" />
                <h3 className="mt-5 text-lg font-black">{reason}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <SectionHeading
          eyebrow="Galeria de proyectos"
          title="Visuales del rubro: vialidades, naves y alumbrado solar."
        />
        <div className="mt-9 grid gap-6 lg:grid-cols-3">
          {gallery.map((item) => (
            <article key={item.title} className="group overflow-hidden border border-black/10 bg-white shadow-sm">
              <div className="relative aspect-[4/3] bg-camhe-light">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              </div>
              <div className="border-t border-black/10 p-5">
                <h2 className="text-xl font-black text-camhe-black">{item.title}</h2>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
