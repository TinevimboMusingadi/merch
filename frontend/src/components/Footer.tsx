import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-black/10">
      <div className="max-w-[1280px] mx-auto px-8 py-20 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-sm font-black text-black uppercase">LATENTIA</div>
        <div className="flex gap-12 font-serif text-xs uppercase tracking-widest">
          <Link className="text-black/40 hover:text-primary transition-colors" href="#">Shipping</Link>
          <Link className="text-black/40 hover:text-primary transition-colors" href="#">Returns</Link>
          <Link className="text-black/40 hover:text-primary transition-colors" href="#">Privacy</Link>
          <Link className="text-black/40 hover:text-primary transition-colors" href="#">Contact</Link>
        </div>
        <div className="font-serif text-xs uppercase tracking-widest text-black/40">
          © 2024 LATENTIA. ELEVATED UTILITY.
        </div>
      </div>
    </footer>
  );
}
