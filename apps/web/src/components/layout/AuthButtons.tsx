"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";

interface AuthButtonsProps {
  isAuthenticated: boolean;
  userName: string | null;
}

export function AuthButtons({ isAuthenticated, userName }: AuthButtonsProps) {
  if (isAuthenticated) {
    return (
      <div className="flex items-center gap-3">
        {userName && <span className="hidden text-sm text-slate-600 sm:inline">{userName}</span>}
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/" })}
          className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <Link
      href="/login"
      className="rounded-md bg-brand-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
    >
      Sign in
    </Link>
  );
}
