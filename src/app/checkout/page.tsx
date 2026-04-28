"use client";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CheckoutPage() {
  const { cart, total, clearCart } = useCart();
  const { token, user } = useAuth();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [instructions, setInstructions] = useState("");

  useEffect(() => {
    if (user?.email) {
      setEmail(user.email);
    }
  }, [user]);

  const handleCheckout = async () => {
    setLoading(true);
    setError("");
    
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    try {
      const response = await fetch("/api/paynow/initiate", {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          reference: `Order-${Date.now()}`,
          auth_email: email,
          items: cart.map(item => ({ name: item.title, amount: item.price })),
          phone: phone || null,
          method: "ecocash"
        })
      });

      const data = await response.json();
      if (data.success) {
        if (data.redirect_url) {
          window.location.href = data.redirect_url;
        } else if (data.instructions) {
          setInstructions(data.instructions);
          clearCart();
        }
      } else {
        setError(data.error || "Payment failed to initiate");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="max-w-[1280px] mx-auto px-8 py-20">
        <h1 className="font-headline text-4xl mb-12">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="space-y-8">
            <div className="space-y-4">
              <label className="text-label-caps block">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-0 border-b border-black/10 focus:border-primary-container focus:ring-0 py-2 outline-none"
                placeholder="you@example.com"
                required
              />
            </div>
            
            <div className="space-y-4">
              <label className="text-label-caps block">Phone Number (Optional - for EcoCash/OneMoney)</label>
              <input 
                type="tel" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-transparent border-0 border-b border-black/10 focus:border-primary-container focus:ring-0 py-2 outline-none"
                placeholder="0777000000"
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
            {instructions && (
              <div className="bg-primary-container/10 p-6 rounded-sm">
                <p className="font-medium mb-2">Payment Initiated!</p>
                <p className="text-sm">{instructions}</p>
              </div>
            )}

            {!instructions && (
              <button 
                onClick={handleCheckout}
                disabled={loading || cart.length === 0}
                className="w-full bg-black text-white font-body text-sm py-5 uppercase tracking-widest hover:bg-primary-container transition-colors disabled:opacity-50"
              >
                {loading ? "Processing..." : `Pay $${total.toFixed(2)}`}
              </button>
            )}
          </div>

          <div className="bg-surface p-10 h-fit space-y-6">
            <h2 className="text-label-caps border-b border-black/5 pb-4">Order Summary</h2>
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.title} x {item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-black/5 pt-4 flex justify-between font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
