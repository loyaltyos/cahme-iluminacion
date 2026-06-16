import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  const text = encodeURIComponent("Hola CAMHE, quiero cotizar productos de iluminación.");

  return (
    <a
      className="focus-ring fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-premium transition hover:scale-105"
      href={`https://wa.me/529990000000?text=${text}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle size={27} />
    </a>
  );
}
