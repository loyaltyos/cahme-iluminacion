import type { MetadataRoute } from "next";
import { products } from "@/lib/products";

const baseUrl = "https://camheiluminacion.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/catalogo",
    "/nosotros",
    "/proyectos",
    "/contacto",
    "/carrito",
    "/checkout",
    "/terminos-y-condiciones",
    "/aviso-de-privacidad",
    "/politica-de-envios",
    "/politica-de-devoluciones",
    "/envios",
    "/devoluciones-y-reembolsos"
  ];

  return [
    ...routes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8
    })),
    ...products.map((product) => ({
      url: `${baseUrl}/catalogo/${product.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7
    }))
  ];
}
