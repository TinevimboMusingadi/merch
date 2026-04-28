import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";

const products = [
  {
    id: "1",
    title: "Tactile Mono Switches",
    description: "Set of 90 / Pre-lubed Linear",
    price: "$72.00",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBb9IDxtjEEdUZMpIBWfYpCDqo-z9Lg1SZoGQj0zm48PddjJxmGT7gdWL5FvhsASCi0T-Ug3U3lt0gs9hZCWnIlRMze6Gk1xdCg6vPDMHsMovU60SqlbhwWzunU8ujHyPGwIpfhkqcSB2Ue00eHGU7OQx5Bezl0ODmey_RJ5BHUaXjCE3_Za5Tx0jwx3_SMP2TwYRHiWCvv_X5skpFxklHZtxsVvtKMiBH5UI9QsCnTbmPBp40HwLuAjTd7l-ShJYmMzqMUEVgWSYFK",
    tag: "Limited Edition"
  },
  {
    id: "2",
    title: "Archival Vinyl Pack",
    description: "8-piece curated sticker set",
    price: "$24.00",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD4cY--2akvyWgqQe9zg26eAHVO4C-aOVMpAMgShCt1s_suRA4G2WUg_gvQcqBYhQb6H_HisB_e6a37wnO-TM122zJ_09scfh7QDC2MVMtl3yzyAcxI8nqRkxSW5rz2EYEhu6GsNcyTc7naR4Y37JZXxc713cymqpHQDitaTbMvKv6Oowd34rNF4IoxUm-oiLOcVDHdz_5MQASlE1ilYdvVycjytIIIuS-v8nvumg6xRFWnb5aqDYpE1kTbC8HnM1nwF4hSCMi4fowb"
  },
  {
    id: "3",
    title: "Merino Wool Felt Mat",
    description: "Large / Stone Grey",
    price: "$110.00",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCYuakGU5r9FJ9v-ACp2EsilZi9L53gehs4TmhnxCl0EhX4Ta3L3WfFgni9u6tt1ZLDx52pTkukjPMESObPXZG9gkFT7XLMlyasknLNpAFOWqPH2pV3F19ffBTGqQmWd5EUwGNm7uh8br64GPrcXU6hDibz6OUe4ThZEOrptujs1QaK7UJoBNfj5B_KTi-AzvNg1tGlK4Lm1NdGnHmQrYnf2kMa-FfyH09ZChj3cPX2d51IhxhClsa3P7nDirSHuDUAzqfN-rfMZLeK",
    tag: "Restocked"
  },
  {
    id: "4",
    title: "Essential Utility Decal",
    description: "Matte Finish / White",
    price: "$12.00",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDTtUBxdOWuwK9VV_ThGJxD0JN2fk5vdJARb17FFxqx1Gx1P9va9MJ_jjPAkGv0FD_0FplTMyhhENcm1g5MI1jdnjqAMIY10LD8YCTrNoYoQtozG_51KDB5GWywr8hLSp7FMgGKePxh-On1IF_Xq_Gm-iJ9KwMNSTVUS2hC7RxbkWsH3-dqRueM48K8FSE2fy3XLc1nvcA-c1LsB025k53AH2e-AhulYzdhX68eghLX-MZKD_ePQZkwNKV9dT3GuXc1zHgFjms7N0kv"
  }
];

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="w-full max-w-[1280px] mx-auto px-8">
        {/* Hero Section */}
        <section className="py-section-gap">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
            <div className="lg:col-span-5 space-y-stack-lg">
              <div>
                <span className="text-label-caps text-primary uppercase mb-4 block">Limited Batch No. 04</span>
                <h1 className="font-display text-6xl text-on-surface mb-6 leading-[1.1]">Elevated Utility for the Modern Desk.</h1>
                <p className="font-body text-lg text-secondary max-w-md">Curated artifacts for focused workspaces. Tactile excellence meets minimal expression.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-10 py-4 bg-black text-white font-body text-sm uppercase tracking-widest hover:bg-primary-container transition-colors duration-300">
                  Shop The Drop
                </button>
                <button className="px-10 py-4 border border-black text-black font-body text-sm uppercase tracking-widest hover:bg-primary-container hover:border-primary-container hover:text-white transition-colors duration-300">
                  View Journal
                </button>
              </div>
            </div>
            <div className="lg:col-span-7 relative h-[600px] bg-surface overflow-hidden rounded-sm">
              <Image 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDVOl0QTU-FsJJOYG5Dpfa3OIqs8xqSBHWiVp1GlCkV7EhQhmW0Ou4WSsP39XrjdDgYDtFv1AHsNGa8XwW2IkrMSUp5-MqpAJCiNypLK6Sp7lV2oDlIsyXT2A5BcNKbfNSqtRqy9aJNZ1Ef9DF8z6sCktSq4fq80t2d-w8yupo3pH319o0MmknfmxQ5JEuBIu-UnfmtqOMCHxtCA5jVCLyPHGalsqvVDnT14Xa8SPRn28KeDCiM3FTySNpbZSlr592294IEKPR8FcPb" 
                alt="Minimalist workspace"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-8 right-8 bg-white/90 backdrop-blur-sm p-6 max-w-xs border border-black/5">
                <p className="text-label-caps text-[10px] text-primary uppercase mb-1">Featured Item</p>
                <p className="font-headline text-[18px] leading-tight mb-2">The MK-72 Artisan Shell</p>
                <p className="font-body text-sm text-secondary">Machined aluminum. Linear switches. Timeless form.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Product Grid */}
        <section className="flex flex-col md:flex-row gap-gutter">
          <aside className="md:w-64 shrink-0">
            <div className="sticky top-32 flex flex-col gap-8 py-12 border-r border-black/5">
              <div>
                <h3 className="text-lg font-bold text-black font-headline uppercase tracking-tight">Categories</h3>
                <p className="font-body text-xs text-secondary/60">Curated Workspace</p>
              </div>
              <div className="flex flex-col gap-4 font-serif text-sm">
                <a className="text-black font-semibold border-l-2 border-primary-container pl-4" href="#">All Products</a>
                <a className="text-black/40 hover:text-primary-container hover:bg-black/5 pl-4 transition-all duration-200" href="#">Mechanical Keyboards</a>
                <a className="text-black/40 hover:text-primary-container hover:bg-black/5 pl-4 transition-all duration-200" href="#">Stickers & Decals</a>
                <a className="text-black/40 hover:text-primary-container hover:bg-black/5 pl-4 transition-all duration-200" href="#">Desk Mats</a>
              </div>
            </div>
          </aside>

          <div className="flex-1 py-12">
            <div className="flex justify-between items-end mb-12">
              <h2 className="font-headline text-4xl">New Drops</h2>
              <a className="font-body text-sm border-b border-black pb-1 hover:text-primary hover:border-primary transition-colors" href="#">View All</a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-16 gap-x-gutter">
              {products.map(p => (
                <ProductCard key={p.id} {...p} />
              ))}
            </div>
          </div>
        </section>

        {/* Editorial Section */}
        <section className="py-section-gap">
          <div className="relative w-full h-[500px] overflow-hidden rounded-sm">
            <Image 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQx1oofcjCKuRjVndrYNKsSFBl5P8vyZ7l_6LaP_4EAWL4D3Fer3GZRdOXW9k9tJ7oriEBVAW4Z8ZXlPuQ5cbxj0I03tf51ieibMTgYD895TJ2VuKCCVioSKFcw2pupl7cdYrhcDqFfnLxkER9O3wJiuP00_OgQQFpXAUSVa27mYftmgBLAz809GrS-PJ7pm0nLt4PjjXymB9_43mwoRkSjxq7VQdmuXGTMohWxRSJiPUkD4BJT757a1D9Eww_6neh2YMA_ACO8Ge8" 
              alt="Editorial background"
              fill
              className="object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center text-center p-8">
              <div className="max-w-2xl bg-white/10 backdrop-blur-md p-12 border border-white/20">
                <h2 className="font-headline text-4xl text-white mb-6">Designed to be Used. Built to be Kept.</h2>
                <p className="font-body text-lg text-white/90 mb-8 italic">"Objects in our workspace should command focus, not distract from it."</p>
                <button className="text-label-caps text-white border border-white px-8 py-3 hover:bg-white hover:text-black transition-all">Read The Ethos</button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
