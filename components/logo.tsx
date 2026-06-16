import Link from "next/link";

export function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link className="focus-ring flex items-center gap-3 rounded-sm" href="/" aria-label="CAMHE Iluminación">
      <span className={`relative flex h-11 w-11 items-center justify-center text-white ${inverse ? "bg-white/10" : "bg-camhe-black"}`}>
        <span className="absolute inset-x-2 top-2 h-1 bg-camhe-red" />
        <span className="text-lg font-black tracking-[0.08em]">C</span>
      </span>
      <span className="leading-none">
        <span className={`block text-xl font-black tracking-[0.12em] ${inverse ? "text-white" : "text-camhe-black"}`}>
          CAMHE
        </span>
        <span className="block text-[11px] font-bold uppercase tracking-[0.24em] text-camhe-red">
          Iluminacion
        </span>
      </span>
    </Link>
  );
}
