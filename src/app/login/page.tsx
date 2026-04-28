"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    const endpoint = isRegister ? "/api/register" : "/api/token";
    const body = isRegister 
      ? JSON.stringify({ username, email, password })
      : new URLSearchParams({ username, password });

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: isRegister ? { "Content-Type": "application/json" } : { "Content-Type": "application/x-www-form-urlencoded" },
        body: body
      });

      const data = await response.json();
      
      if (response.ok) {
        if (isRegister) {
          setIsRegister(false);
          setError("Account created! Please log in.");
        } else {
          login(data.access_token, username);
        }
      } else {
        setError(data.detail || "Authentication failed");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-20 bg-background">
        <div className="w-full max-w-md bg-white p-12 space-y-10 border border-black/5">
          <div className="text-center space-y-2">
            <h1 className="font-headline text-3xl tracking-tight uppercase">
              {isRegister ? "Create Account" : "Sign In"}
            </h1>
            <p className="font-body text-sm text-secondary">
              {isRegister ? "Join the Latentia collective." : "Welcome back to your workspace."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <div className="space-y-1">
                <label className="text-label-caps block text-secondary">Username</label>
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-transparent border-0 border-b border-black/10 focus:border-primary focus:ring-0 py-2 outline-none font-body"
                  required
                />
              </div>

              {isRegister && (
                <div className="space-y-1">
                  <label className="text-label-caps block text-secondary">Email Address</label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent border-0 border-b border-black/10 focus:border-primary focus:ring-0 py-2 outline-none font-body"
                    required
                  />
                </div>
              )}

              <div className="space-y-1">
                <label className="text-label-caps block text-secondary">Password</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-0 border-b border-black/10 focus:border-primary focus:ring-0 py-2 outline-none font-body"
                  required
                />
              </div>
            </div>

            {error && <p className="text-xs text-red-500 text-center">{error}</p>}

            <button 
              type="submit"
              className="w-full bg-black text-white font-body text-sm py-5 uppercase tracking-widest hover:bg-primary-container transition-colors duration-300"
            >
              {isRegister ? "Register" : "Login"}
            </button>
          </form>

          <div className="text-center pt-4">
            <button 
              onClick={() => setIsRegister(!isRegister)}
              className="text-xs font-label text-secondary hover:text-black transition-colors"
            >
              {isRegister ? "Already have an account? Sign in" : "Don't have an account? Register"}
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
