import Image from "next/image";

export default function Logo({ className = "h-16 w-auto", eager = false }: { className?: string; eager?: boolean }) {
  return (
    <Image
      src="/thesp.png"
      alt="The Daily Spread"
      width={1536}
      height={800}
      sizes="260px"
      loading={eager ? "eager" : "lazy"}
      className={`${className} object-contain select-none`}
      draggable={false}
    />
  );
}
