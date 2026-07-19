import Image from "next/image";
import { PizzaPlaceholderArt } from "@/components/ui/PizzaPlaceholderArt";

type ImageSlotProps = {
  src?: string;
  alt: string;
  shape?: "whole" | "slice";
  className?: string;
  sizes?: string;
  priority?: boolean;
};

/**
 * Renders a real photo (next/image) when `src` is given, otherwise falls
 * back to branded placeholder art — same sizing/aspect either way, so
 * dropping in real photography later requires no layout changes.
 */
export function ImageSlot({
  src,
  alt,
  shape = "whole",
  className = "",
  sizes,
  priority,
}: ImageSlotProps) {
  return (
    <div
      className={`relative overflow-hidden bg-slice-paper ${className}`}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes ?? "100vw"}
          priority={priority}
          className="object-cover"
        />
      ) : (
        <PizzaPlaceholderArt
          shape={shape}
          className="absolute inset-0 h-full w-full p-4"
        />
      )}
    </div>
  );
}
