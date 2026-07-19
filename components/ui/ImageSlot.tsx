import Image from "next/image";
import { FoodArt, type FoodArtKind } from "@/components/ui/FoodArt";

type ImageSlotProps = {
  src?: string;
  alt: string;
  art: FoodArtKind;
  accent?: string;
  className?: string;
  sizes?: string;
  preload?: boolean;
};

/**
 * Renders a real photo (next/image) when `src` is given, otherwise falls
 * back to the flat food illustration — same sizing either way, so dropping
 * in real photography later requires no layout changes.
 */
export function ImageSlot({
  src,
  alt,
  art,
  accent,
  className = "",
  sizes,
  preload,
}: ImageSlotProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes ?? "100vw"}
          preload={preload}
          className="object-cover"
        />
      ) : (
        <FoodArt
          kind={art}
          accent={accent}
          className="absolute inset-0 h-full w-full p-2"
        />
      )}
    </div>
  );
}
