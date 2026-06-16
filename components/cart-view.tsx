"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/components/cart-provider";
import { formatPrice } from "@/lib/products";

export function CartView() {
  const { detailedItems, subtotal, setQuantity, removeItem, clearCart } = useCart();

  if (detailedItems.length === 0) {
    return (
      <section className="container-page py-20">
        <div className="mx-auto max-w-2xl border border-black/10 bg-camhe-light p-8 text-center">
          <h1 className="text-3xl font-black text-camhe-black">Tu carrito está vacío</h1>
          <p className="mt-3 text-camhe-steel">
            Explora el catálogo y agrega luminarias, soluciones solares o accesorios eléctricos.
          </p>
          <Link
            className="focus-ring mt-6 inline-flex rounded-sm bg-camhe-red px-6 py-3 text-sm font-black uppercase tracking-[0.1em] text-white"
            href="/catalogo"
          >
            Ver catálogo
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="container-page grid gap-8 py-16 lg:grid-cols-[1fr_360px]">
      <div className="space-y-4">
        {detailedItems.map((item) => (
          <article
            key={item.productId}
            className="grid gap-4 border border-black/10 bg-white p-4 shadow-sm sm:grid-cols-[140px_1fr_auto]"
          >
            <div className="relative aspect-square overflow-hidden bg-camhe-light">
              <Image
                src={item.product.image}
                alt={item.product.name}
                fill
                className="object-cover"
                sizes="140px"
              />
            </div>
            <div>
              <h2 className="text-xl font-black text-camhe-black">{item.product.name}</h2>
              <p className="mt-2 text-sm leading-6 text-camhe-steel">{item.product.description}</p>
              <p className="mt-3 text-lg font-black text-camhe-red">
                {formatPrice(item.product.price)}
              </p>
            </div>
            <div className="flex items-center gap-2 sm:flex-col sm:items-end sm:justify-between">
              <div className="flex items-center border border-black/10">
                <button
                  className="focus-ring grid h-10 w-10 place-items-center"
                  onClick={() => setQuantity(item.productId, item.quantity - 1)}
                  aria-label="Disminuir cantidad"
                >
                  <Minus size={16} />
                </button>
                <span className="grid h-10 w-10 place-items-center font-black">{item.quantity}</span>
                <button
                  className="focus-ring grid h-10 w-10 place-items-center"
                  onClick={() => setQuantity(item.productId, item.quantity + 1)}
                  aria-label="Aumentar cantidad"
                >
                  <Plus size={16} />
                </button>
              </div>
              <button
                className="focus-ring grid h-10 w-10 place-items-center rounded-sm text-camhe-steel hover:bg-camhe-light hover:text-camhe-red"
                onClick={() => removeItem(item.productId)}
                aria-label="Eliminar producto"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </article>
        ))}
      </div>
      <aside className="h-fit border border-black/10 bg-camhe-light p-6">
        <h2 className="text-xl font-black text-camhe-black">Resumen</h2>
        <div className="mt-5 space-y-3 border-y border-black/10 py-5 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <strong>{formatPrice(subtotal)}</strong>
          </div>
          <div className="flex justify-between text-camhe-steel">
            <span>Envío</span>
            <span>Por cotizar</span>
          </div>
        </div>
        <Link
          className="focus-ring mt-6 inline-flex w-full justify-center rounded-sm bg-camhe-red px-5 py-4 text-sm font-black uppercase tracking-[0.1em] text-white"
          href="/checkout"
        >
          Ir a checkout
        </Link>
        <button
          className="focus-ring mt-3 inline-flex w-full justify-center rounded-sm border border-black/15 px-5 py-3 text-sm font-black uppercase tracking-[0.1em] text-camhe-black"
          onClick={clearCart}
        >
          Vaciar carrito
        </button>
      </aside>
    </section>
  );
}
