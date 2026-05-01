"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { FALLBACK_PRODUCTS } from "@/lib/seed-products";

export default function ShopPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("/api/products");
        const raw = await response.json().catch(() => null);
        if (response.ok && Array.isArray(raw)) {
          setProducts(raw);
        } else {
          setProducts(FALLBACK_PRODUCTS as unknown[]);
          setUsingFallback(true);
        }
      } catch (err) {
        console.error("Failed to fetch products", err);
        setProducts(FALLBACK_PRODUCTS as unknown[]);
        setUsingFallback(true);
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
          {usingFallback && (
            <p className="text-xs font-body text-amber-800 bg-amber-50 border border-amber-200 px-4 py-3 rounded-sm max-w-xl">
              Showing bundled catalog previews (API unreachable). Checkout works after you deploy a
              fixed API and run <code className="text-[11px]">python api/seed.py</code> against your DB.
            </p>
          )}
        </header>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-pulse font-serif text-black/40 uppercase tracking-widest">Loading Collection...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-gutter gap-y-20">
            {products.map((product, index) => {
              const priceNum = Number(product?.price ?? 0);
              const safePrice = Number.isFinite(priceNum) ? priceNum : 0;
              return (
                <ProductCard
                  key={String(product?.id ?? `item-${index}`)}
                  id={String(product?.id ?? index)}
                  title={String(product?.title ?? "Product")}
                  price={`$${safePrice.toFixed(2)}`}
                  priceValue={safePrice}
                  description={String(product?.description ?? "")}
                  image={String(
                    product?.image_url ?? product?.imageUrl ?? "",
                  )}
                  tag={product?.tag ? String(product.tag) : undefined}
                />
              );
            })}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
