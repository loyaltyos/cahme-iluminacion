import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/components/cart-provider";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { WhatsAppButton } from "@/components/whatsapp-button";

export const metadata: Metadata = {
  metadataBase: new URL("https://camheiluminacion.com"),
  title: {
    default: "CAMHE Iluminación | Iluminación e infraestructura eléctrica",
    template: "%s | CAMHE Iluminación"
  },
  description:
    "Ecommerce premium de iluminación pública, industrial, solar, residencial y accesorios eléctricos para proyectos de infraestructura.",
  keywords: [
    "CAMHE",
    "iluminación",
    "alumbrado público",
    "iluminación industrial",
    "energía solar",
    "accesorios eléctricos",
    "infraestructura eléctrica"
  ],
  openGraph: {
    title: "CAMHE Iluminación",
    description:
      "Venta online de productos de iluminación e infraestructura eléctrica.",
    url: "https://camheiluminacion.com",
    siteName: "CAMHE Iluminación",
    locale: "es_MX",
    type: "website"
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-MX">
      <body>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  );
}
