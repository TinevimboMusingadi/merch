"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";

export default function ShopPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  return (
    <>
      <Navbar />
      <main className="w-full max-w-[1280px] mx-auto px-8 py-20">
        <header className="mb-20 space-y-4">
          <span className="text-label-caps text-primary uppercase block">The Collective</span>
          <h1 className="font-display text-5xl tracking-tight">Product Gallery</h1>
          <p className="font-body text-secondary max-w-lg">
            A curated selection of tactile excellence for the modern desk setup. 
            Each piece is selected for its functional purity and aesthetic focus.
          </p>
        </header>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-pulse font-serif text-black/40 uppercase tracking-widest">Loading Collection...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-gutter gap-y-20">
            {products.map((product) => (
              <ProductCard 
                key={product.id}
                id={product.id.toString()}
                title={product.title}
                price={`$${product.price.toFixed(2)}`}
                description={product.description}
                image={product.image_url}
                tag={product.tag}
              />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
