"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/components/cart-provider";

export function ProductDetailActions({ productId }: { productId: string }) {
  const { addItem } = useCart();

  return (
    <div className="mt-8 flex flex-wrap gap-3">
      <button
        className="focus-ring inline-flex items-center gap-2 rounded-sm bg-camhe-red px-6 py-4 text-sm font-black uppercase tracking-[0.1em] text-white"
        onClick={() => addItem(productId)}
      >
        <ShoppingCart size={18} />
        Agregar al carrito
      </button>
      <Link
        className="focus-ring inline-flex rounded-sm border border-black/15 px-6 py-4 text-sm font-black uppercase tracking-[0.1em] text-camhe-black"
        href="/carrito"
      >
        Ver carrito
      </Link>
    </div>
  );
}
