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

  return (
    <Link href={`/products/${id}`} className="group cursor-pointer block">
      <div className="relative">
        <div className="aspect-[4/5] bg-surface mb-6 overflow-hidden relative rounded-sm">
          <Image 
            src={image} 
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          {tag && (
            <span className="absolute top-4 left-4 text-label-caps bg-white px-3 py-1 text-black">
              {tag}
            </span>
          )}
          <button
            type="button"
            onClick={handleQuickAdd}
            className="absolute bottom-4 right-4 text-label-caps bg-black text-white px-4 py-2 opacity-90 hover:opacity-100 shadow-sm uppercase tracking-wide"
          >
            Add to cart
          </button>
        </div>
        <div className="space-y-1">
          <h3 className="font-headline text-xl">{title}</h3>
          <p className="font-body text-secondary line-clamp-2">{description}</p>
          <p className="font-body text-primary-container font-semibold">{price}</p>
        </div>
      </div>
    </Link>
  );
}
