"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import {
  categories,
  categoryLabels,
  products,
  type Category
} from "@/lib/products";

export function CatalogClient() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("categoria") as Category | null;
  const [category, setCategory] = useState<Category | "Todos">(
    initialCategory && categories.includes(initialCategory) ? initialCategory : "Todos"
  );

  const filteredProducts = useMemo(
    () =>
      category === "Todos"
        ? products
        : products.filter((product) => product.category === category),
    [category]
  );

  return (
    <div className="space-y-8">
      <div className="flex gap-2 overflow-x-auto pb-2">
        {(["Todos", ...categories] as Array<Category | "Todos">).map((item) => (
          <button
            key={item}
            onClick={() => setCategory(item)}
            className={`focus-ring whitespace-nowrap rounded-sm border px-4 py-3 text-sm font-black uppercase tracking-[0.08em] transition ${
              category === item
                ? "border-camhe-red bg-camhe-red text-white"
                : "border-black/10 bg-white text-camhe-graphite hover:border-camhe-red"
            }`}
          >
            {item === "Todos" ? "Todos" : categoryLabels[item]}
          </button>
        ))}
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
