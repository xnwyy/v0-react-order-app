"use client";

import { useState } from "react";
import { LoginPage } from "@/components/LoginPage";
import { MainPage } from "@/components/MainPage";
import { ToastProvider } from "@/components/Toast";
import { User } from "@/types";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
  };

  const handleSignOut = () => {
    setUser(null);
  };

  return (
    <ToastProvider>
      {user ? (
        <MainPage user={user} onSignOut={handleSignOut} />
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </ToastProvider>
  );
}
