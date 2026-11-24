import Image from "next/image";
import { artSizes } from "@/data/art-sizes";

/** An illustration from /public/art or /public/jars, e.g. "art/toast" or "jars/bourbon". */
export default function Cutout({
  name,
  alt = "",
  className,
  sizes = "300px",
  eager = false,
}: {
  name: string;
  alt?: string;
  className?: string;
  sizes?: string;
  eager?: boolean;
}) {
  const [width, height] = artSizes[name];
  return (
    <Image
      src={`/${name}.webp`}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      className={className}
      draggable={false}
      loading={eager ? "eager" : "lazy"}
    />
  );
}
