"use client";
import { useParams } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Bolt, Keyboard, Usb, Palette } from "lucide-react";

export default function ProductPage() {
  const { id } = useParams();

  // In a real app, you'd fetch product by ID. 
  // For now, we'll show the Cyberpunk Keyboard as the default.
  
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-section-gap max-w-[1280px] mx-auto px-8">
        <div className="flex flex-col lg:flex-row gap-gutter">
          {/* Left: Sidebar (Categories) */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-32 flex flex-col gap-8 h-full">
              <div>
                <h3 className="text-lg font-bold text-black font-headline">Categories</h3>
                <p className="text-black/40 text-sm font-serif">Curated Workspace</p>
              </div>
              <nav className="flex flex-col">
                <a className="font-serif text-sm py-2 text-black/40 pl-4 border-l-2 border-transparent hover:text-primary-container hover:bg-black/5 transition-all duration-200" href="#">
                  All Products
                </a>
                <a className="font-serif text-sm py-2 text-black font-semibold border-l-2 border-primary-container pl-4 hover:bg-black/5 transition-all duration-200" href="#">
                  Mechanical Keyboards
                </a>
                <a className="font-serif text-sm py-2 text-black/40 pl-4 border-l-2 border-transparent hover:text-primary-container hover:bg-black/5 transition-all duration-200" href="#">
                  Stickers & Decals
                </a>
              </nav>
            </div>
          </aside>

          {/* Product Content */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-lg items-start">
              {/* Images */}
              <div className="flex flex-col gap-base">
                <div className="aspect-square bg-white border border-black/5 rounded-sm overflow-hidden relative">
                  <Image 
                    alt="Cyberpunk Edition Keyboard" 
                    fill
                    className="object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDETNJ2Yd2-TznrQCYrhWlMhR45En4hcB0Pb-bPqGDdB6GCS60SHWavHuCTxO0pHnSw-5JDNmPI9SOfwemPC_zZi5m8Z2nB53H9aWunfmzg_fIwc8JboHg7BHsr941EfaHqvnnmUVN-WBP3BWrBSm8Towwp0UX3Xnuxyzeqw5tF1WAu9vUTcSTxtqli__U56X0Fqx7AKIUpv0Uc68hc9YIRyTMuxkdJjX_vqMIF1oldHNdP4h1Wvfpd5LKOjTbrGAmknqXmeazg92Jr"
                  />
                </div>
                <div className="grid grid-cols-3 gap-base">
                  <div className="aspect-square bg-white border border-black/5 rounded-sm overflow-hidden cursor-pointer hover:opacity-80 transition-opacity relative">
                    <Image alt="detail" fill src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIVmgbvPa0CPVaSIEvgTW87TbW47eerYWkdCRdJP62ZJLIdQ7EfL88yOhhI136mTGEeOC_X1bIBdvi6eja4eh3ikEPVdbu1lDhI3HSMEwaYJUM-6ZSHSzJwrRDgjAnd-hhFbeClgYp6gvUbl3HU9sH1CZYx6heHKeaJQ44IEOm9NvirN5npMNdQnKjl0UD7alkP-50Ut73GCWdP-jNGrHdFnfpj_p8Hnm6Nfb8t6A50yebsYxgkx4PM3kNYgOpkXMNinYlR21HpT5z" />
                  </div>
                  <div className="aspect-square bg-white border border-black/5 rounded-sm overflow-hidden cursor-pointer hover:opacity-80 transition-opacity relative">
                    <Image alt="detail" fill src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdMMEMYyZaXh5FzV2qxdwujIG5hNMLvP0kMX6eJI00e2aLLzejLGeRvkpn_jFzsauAi3KaNzbUKV9cVoGZV0X8az9LZiTKFgvRAf0A4Uz6-dYRtWcM2Ds-la3Ak4jhwneLrdd-dqJHZ0LVmWBAPYZoSOZtUe1yIQj2oC2up5sicSQzpayTrq7iEzggxP4EpDOadBLO0kvzERvAjNglcOO_dh4jm7QgKFRjxIvAQmPGtXzX3COL-I75IMl3f4L6gwmYcnqtBd4iPEEi" />
                  </div>
                  <div className="aspect-square bg-white border border-black/5 rounded-sm overflow-hidden cursor-pointer hover:opacity-80 transition-opacity relative">
                    <Image alt="detail" fill src="https://lh3.googleusercontent.com/aida-public/AB6AXuByJ_7mJ3HFaHGBlt4egswOvklLDh6IxIPYZGYyXjgHhNwRPo6QvXHAWj1OYtZXhyvK5C7TBZvo0SUvTcUtySnBCKduNbAka8Ae2VlofchmDUZ0KaqznLA9uhm2ynVE-ilcxorJ-lhlU2na1HgI54KE7h3ngDIkee4zhq2bwpB_qFfPZB6e1eiKU_EvqEAyMqJlIGWqVlVJVoDarxomNhPGftmmWy4O7zM2RxE6dmF1SS9HJwjqVZEL3KltflqQefxKA0m0TQvPVuWn" />
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="flex flex-col gap-stack-md">
                <div className="flex flex-col gap-2">
                  <span className="bg-[#F4F1EA] text-primary-container text-label-caps px-3 py-1 w-fit rounded-sm">LIMITED EDITION</span>
                  <h1 className="font-headline text-4xl text-on-surface">Cyberpunk Edition Mechanical Keyboard</h1>
                  <p className="text-primary text-xl font-semibold">$289.00</p>
                </div>
                <p className="font-body text-secondary max-w-md">
                  A masterclass in tactile feedback and aesthetic precision. This limited run features a CNC-milled aluminum chassis with industrial-grade cerakote finish and custom-sculpted PBT keycaps.
                </p>

                {/* Configurators */}
                <div className="flex flex-col gap-stack-sm">
                  <label className="text-label-caps text-secondary uppercase">Switch Type</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button className="border border-primary-container bg-white py-3 flex flex-col items-center gap-1 hover:bg-primary-container/10 transition-colors">
                      <span className="text-sm font-medium">Linear</span>
                      <span className="text-[10px] text-secondary">Silent & Smooth</span>
                    </button>
                    <button className="border border-black/10 py-3 flex flex-col items-center gap-1 hover:border-primary-container transition-colors">
                      <span className="text-sm font-medium">Tactile</span>
                      <span className="text-[10px] text-secondary">Balanced Bump</span>
                    </button>
                    <button className="border border-black/10 py-3 flex flex-col items-center gap-1 hover:border-primary-container transition-colors">
                      <span className="text-sm font-medium">Clicky</span>
                      <span className="text-[10px] text-secondary">Crisp Audio</span>
                    </button>
                  </div>
                </div>

                {/* Action */}
                <div className="pt-4">
                  <button className="w-full bg-black text-white font-body text-sm py-5 tracking-widest uppercase hover:bg-primary-container transition-colors duration-300">
                    Add to Cart
                  </button>
                </div>

                {/* Mini Specs */}
                <div className="grid grid-cols-2 gap-4 pt-8 border-t border-black/5">
                  <div className="flex items-center gap-2">
                    <Bolt className="w-4 h-4 text-secondary" />
                    <span className="text-[10px] text-secondary uppercase tracking-wider">Low Latency</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Keyboard className="w-4 h-4 text-secondary" />
                    <span className="text-[10px] text-secondary uppercase tracking-wider">Double-shot PBT</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Usb className="w-4 h-4 text-secondary" />
                    <span className="text-[10px] text-secondary uppercase tracking-wider">USB-C Detachable</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Palette className="w-4 h-4 text-secondary" />
                    <span className="text-[10px] text-secondary uppercase tracking-wider">RGB Customization</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
