import type { Metadata } from "next";
import { CheckoutView } from "@/components/checkout-view";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Finaliza tu pedido CAMHE Iluminación."
};

export default function CheckoutPage() {
  return <CheckoutView />;
}
