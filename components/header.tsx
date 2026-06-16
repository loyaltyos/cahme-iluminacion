"use client";

import Link from "next/link";
import { Menu, ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "@/components/logo";
import { useCart } from "@/components/cart-provider";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/catalogo", label: "Catalogo" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/contacto", label: "Contacto" }
];

export function Header() {
  const [open, setOpen] = useState(false);
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-white/96 shadow-[0_10px_35px_rgba(11,11,13,0.07)] backdrop-blur-xl">
      <div className="container-page flex h-[76px] items-center justify-between gap-6">
        <Logo />
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navegacion principal">
          {navItems.map((item) => (
            <Link
              key={item.href}
              className="focus-ring rounded-sm px-4 py-3 text-[13px] font-black uppercase tracking-[0.1em] text-camhe-graphite transition hover:bg-camhe-light hover:text-camhe-red"
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            className="focus-ring relative inline-flex h-11 items-center gap-2 rounded-sm border border-black/10 bg-camhe-black px-4 text-sm font-black uppercase tracking-[0.08em] text-white shadow-sm transition hover:bg-camhe-red"
            href="/carrito"
            aria-label="Abrir carrito"
          >
            <ShoppingCart size={19} />
            <span className="hidden sm:inline">Carrito</span>
            {itemCount > 0 && (
              <span className="absolute -right-2 -top-2 grid h-6 min-w-6 place-items-center rounded-full bg-camhe-red px-1 text-xs font-black text-white">
                {itemCount}
              </span>
            )}
          </Link>
          <button
            className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-sm border border-black/15 lg:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label="Abrir menu"
          >
            {open ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-black/10 bg-white lg:hidden">
          <nav className="container-page grid gap-1 py-4" aria-label="Navegacion movil">
            {navItems.map((item) => (
              <Link
                key={item.href}
                className="rounded-sm px-2 py-3 text-sm font-bold uppercase tracking-[0.08em] text-camhe-graphite hover:bg-camhe-light"
                href={item.href}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
