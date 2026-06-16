import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductDetailActions } from "@/components/product-detail-actions";
import { categoryLabels, formatPrice, products } from "@/lib/products";

export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const product = products.find((item) => item.id === id);
  if (!product) return {};

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.image]
    }
  };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = products.find((item) => item.id === id);

  if (!product) {
    notFound();
  }

  return (
    <section className="container-page grid gap-10 py-14 lg:grid-cols-[1fr_0.85fr]">
      <div className="relative min-h-[420px] overflow-hidden bg-camhe-light">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 1024px) 100vw, 55vw"
        />
      </div>
      <div>
        <Link className="text-sm font-black uppercase tracking-[0.12em] text-camhe-red" href={`/catalogo?categoria=${encodeURIComponent(product.category)}`}>
          {categoryLabels[product.category]}
        </Link>
        <h1 className="mt-4 text-4xl font-black leading-tight text-camhe-black">{product.name}</h1>
        <p className="mt-5 text-lg leading-8 text-camhe-steel">{product.description}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {product.specs.map((spec) => (
            <span key={spec} className="bg-camhe-light px-3 py-2 text-sm font-black text-camhe-graphite">
              {spec}
            </span>
          ))}
        </div>
        <p className="mt-8 text-4xl font-black text-camhe-red">{formatPrice(product.price)}</p>
        <ProductDetailActions productId={product.id} />
      </div>
    </section>
  );
}
