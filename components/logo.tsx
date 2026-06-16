import Image from "next/image";
import Link from "next/link";

export function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link
      className={`focus-ring flex h-14 items-center rounded-sm px-1 ${inverse ? "bg-white" : "bg-transparent"}`}
      href="/"
      aria-label="CAMHE Iluminación"
    >
      <Image
        src="/logo-camhe.jpeg"
        alt="CAMHE Iluminación"
        width={190}
        height={56}
        priority
        className="h-12 w-auto object-contain"
        sizes="190px"
      />
    </Link>
  );
}
