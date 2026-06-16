export function WhatsAppButton() {
  const text = encodeURIComponent("Hola CAMHE, quiero cotizar productos de iluminación.");

  return (
    <a
      className="focus-ring fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-premium ring-1 ring-white/40 transition hover:scale-105 hover:bg-[#1ebe5d]"
      href={`https://wa.me/525545174522?text=${text}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Contactar por WhatsApp"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 32 32"
        className="h-8 w-8 fill-current"
      >
        <path d="M16.03 4.02C9.43 4.02 4.06 9.36 4.06 15.93c0 2.1.55 4.15 1.6 5.95L4 28l6.28-1.64a12.02 12.02 0 0 0 5.75 1.46h.01c6.6 0 11.97-5.34 11.97-11.91 0-3.18-1.25-6.17-3.52-8.42a11.9 11.9 0 0 0-8.46-3.47Zm.01 21.78h-.01c-1.72 0-3.4-.46-4.88-1.32l-.35-.21-3.73.98 1-3.63-.23-.37a9.85 9.85 0 0 1-1.5-5.32c0-5.46 4.47-9.9 9.96-9.9 2.66 0 5.16 1.03 7.04 2.9a9.82 9.82 0 0 1 2.91 7c0 5.46-4.47 9.87-9.96 9.87Zm5.46-7.39c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.6-.92-2.19-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.11 3.21 5.1 4.5.71.31 1.27.49 1.7.63.71.23 1.36.2 1.88.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.29.17-1.42-.08-.13-.27-.2-.57-.35Z" />
      </svg>
    </a>
  );
}
