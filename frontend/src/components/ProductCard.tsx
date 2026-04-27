import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  id: string;
  title: string;
  price: string;
  description: string;
  image: string;
  tag?: string;
}

export default function ProductCard({ id, title, price, description, image, tag }: ProductCardProps) {
  return (
    <Link href={`/products/${id}`} className="group cursor-pointer">
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
      </div>
      <div className="space-y-1">
        <h3 className="font-headline text-xl">{title}</h3>
        <p className="font-body text-secondary">{description}</p>
        <p className="font-body text-primary-container font-semibold">{price}</p>
      </div>
    </Link>
  );
}
