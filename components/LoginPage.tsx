"use client";

import { useState } from "react";
import { users } from "@/data/menuData";
import { User } from "@/types";

interface LoginPageProps {
  onLogin: (user: User) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username.trim()) {
      setError("Please enter a username.");
      return;
    }

    if (!password.trim()) {
      setError("Please enter a password.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const user = users[username.toLowerCase() as keyof typeof users];
      if (!user) {
        setError('Invalid username. Try "sav" or "kir".');
        setIsLoading(false);
        return;
      }

      setIsSuccess(true);
      setTimeout(() => {
        onLogin(user);
      }, 500);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Default Background */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
        style={{
          backgroundImage:
            "url('https://www.pixelstalk.net/wp-content/uploads/2016/08/Beautiful-Cute-Kitten-Desktop-Wallpapers.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

      {/* Login Container */}
      <div
        className={`
          relative z-10 bg-black/60 backdrop-blur-lg rounded-xl p-10 w-full max-w-md mx-4 shadow-2xl
          transition-all duration-500 transform
          ${isLoading && !isSuccess ? "scale-95 opacity-80" : "scale-100 opacity-100"}
          ${isSuccess ? "scale-105 opacity-0" : ""}
          animate-slideUp
        `}
      >
        <h1 className="text-2xl font-bold text-white text-center mb-6">
          Login to MCD2025 🍔
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all disabled:opacity-50"
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all disabled:opacity-50"
            />
          </div>

          <p className="text-sm text-white/50 text-center">
            Available usernames: sav or kir (any password works)
          </p>

          {error && (
            <p className="text-red-400 text-sm text-center animate-shake">{error}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`
              w-full py-3 px-6 rounded-lg font-bold transition-all duration-300 transform
              ${
                isSuccess
                  ? "bg-green-500 text-white"
                  : "bg-pink-500 hover:bg-pink-400 text-black hover:-translate-y-0.5 hover:shadow-lg"
              }
              disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
            `}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Logging in...
              </span>
            ) : isSuccess ? (
              "Successful login!"
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
