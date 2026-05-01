"use client";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  id: string;
  title: string;
  price: string;
  /** Numeric price for cart; if omitted, parsed from `price`. */
  priceValue?: number;
  description: string;
  image: string;
  tag?: string;
}

export default function ProductCard({
  id,
  title,
  price,
  priceValue: priceOverride,
  description,
  image,
  tag,
}: ProductCardProps) {
  const { addToCart } = useCart();

  const priceResolved =
    priceOverride ??
    (parseFloat(String(price).replace(/[$,\s]/g, "")) || 0);

  function handleQuickAdd(event: React.MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    addToCart({
      id,
      title,
      price: priceResolved,
      image,
      description,
    });
  }

  const trimmedSrc = image?.trim();

  return (
    <Link
      href={`/products/${id}`}
      className="group block cursor-pointer text-on-surface no-underline hover:text-on-surface"
    >
      <article className="relative">
        <div className="relative mb-6 aspect-[4/5] overflow-hidden rounded-sm bg-surface">
          {trimmedSrc ? (
            <Image
              src={trimmedSrc}
              alt={title || "Product"}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
              className="z-0 object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 z-0 flex items-center justify-center bg-black/5 font-body text-sm text-secondary">
              No image
            </div>
          )}
          {tag && (
            <span className="absolute left-4 top-4 z-10 text-label-caps bg-white px-3 py-1 text-black shadow-sm">
              {tag}
            </span>
          )}
          <button
            type="button"
            onClick={handleQuickAdd}
            className="absolute bottom-4 right-4 z-10 text-label-caps uppercase tracking-wide shadow-sm px-4 py-2 bg-black text-white hover:opacity-100 opacity-90"
          >
            Add to cart
          </button>
        </div>
        <div className="space-y-1 border-t border-transparent pt-2">
          <h3 className="font-headline text-xl leading-snug text-black">{title}</h3>
          <p className="font-body line-clamp-2 text-sm leading-relaxed text-secondary">
            {description}
          </p>
          <p className="font-body font-semibold text-primary-container">{price}</p>
        </div>
      </article>
    </Link>
  );
}
