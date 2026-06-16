"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/components/cart-provider";
import { categoryLabels, formatPrice, type Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <article className="group grid overflow-hidden rounded-sm border border-black/10 bg-white shadow-sm transition hover:-translate-y-1 hover:border-camhe-red/35 hover:shadow-premium">
      <Link href={`/catalogo/${product.id}`} className="block">
        <div className="relative aspect-[5/4] overflow-hidden bg-camhe-light">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <span className="absolute left-3 top-3 border border-white/25 bg-white/90 px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-camhe-black shadow-sm backdrop-blur">
            {categoryLabels[product.category]}
          </span>
        </div>
      </Link>
      <div className="grid gap-4 p-5">
        <div>
          <Link href={`/catalogo/${product.id}`}>
            <h2 className="min-h-[48px] text-lg font-black leading-tight text-camhe-black transition hover:text-camhe-red">
              {product.name}
            </h2>
          </Link>
          <p className="mt-2 min-h-[72px] text-sm leading-6 text-camhe-steel">
            {product.description}
          </p>
        </div>
        <div className="flex min-h-[30px] flex-wrap items-center gap-2">
          {product.specs.map((spec) => (
            <span
              key={spec}
              className="border border-black/10 bg-camhe-light px-2.5 py-1 text-xs font-bold text-camhe-graphite"
            >
              {spec}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between gap-3">
          <strong className="text-xl font-black text-camhe-red">
            {formatPrice(product.price)}
          </strong>
          <button
            className="focus-ring inline-flex h-11 items-center gap-2 rounded-sm bg-camhe-black px-4 text-sm font-black text-white transition hover:bg-camhe-red"
            onClick={() => addItem(product.id)}
          >
            <ShoppingCart size={17} />
            Agregar
          </button>
        </div>
      </div>
    </article>
  );
}
