"use client";

import { User } from "@/types";

interface TopBarProps {
  user: User;
  onSignOut: () => void;
}

export function TopBar({ user, onSignOut }: TopBarProps) {
  return (
    <header className="flex items-center justify-between px-4 md:px-8 py-4 relative z-20 animate-slideDown">
      <div className="flex items-center gap-4">
        <img
          src={user.avatar}
          alt="User Avatar"
          className="w-14 h-14 md:w-16 md:h-16 rounded-full border-2 border-pink-500 object-cover shadow-lg transition-transform duration-300 hover:scale-110"
        />
        <h2 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
          Welcome, {user.displayName}!
        </h2>
      </div>
      <button
        onClick={onSignOut}
        className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white text-sm rounded-lg transition-all duration-300 hover:scale-105"
      >
        Sign Out
      </button>
    </header>
  );
}
