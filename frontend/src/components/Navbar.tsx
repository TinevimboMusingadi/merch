"use client";
import Link from "next/link";
import { ShoppingCart, Search } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-[#F4F1EA] border-b border-black/10 sticky top-0 z-50">
      <div className="flex justify-between items-center w-full max-w-[1280px] mx-auto px-8 py-6">
        <Link href="/" className="text-2xl font-serif tracking-tight text-black uppercase">
          LATENTIA
        </Link>
        <div className="hidden md:flex items-center gap-10 font-body text-sm tracking-wide uppercase">
          <Link href="/keyboards" className="text-black/60 hover:text-primary transition-colors duration-300">Keyboards</Link>
          <Link href="/stickers" className="text-black/60 hover:text-primary transition-colors duration-300">Stickers</Link>
          <Link href="/mats" className="text-black/60 hover:text-primary transition-colors duration-300">Mats</Link>
          <Link href="/journal" className="text-black/60 hover:text-primary transition-colors duration-300">Journal</Link>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden lg:block relative">
            <input 
              className="bg-transparent border-0 border-b border-black/10 focus:ring-0 focus:border-primary text-sm py-1 font-body w-48 transition-all" 
              placeholder="Search" 
              type="text"
            />
          </div>
          <button className="text-black/60 hover:text-primary transition-colors">
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </nav>
  );
}
