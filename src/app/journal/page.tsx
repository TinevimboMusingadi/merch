import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function JournalPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-[720px] mx-auto px-8 py-24">
        <span className="text-label-caps text-primary uppercase block mb-4">
          Journal
        </span>
        <h1 className="font-headline text-4xl mb-6">Coming soon</h1>
        <p className="font-body text-secondary">
          Notes on design, tooling, and the Latentia line will live here.
        </p>
      </main>
      <Footer />
    </>
  );
}
