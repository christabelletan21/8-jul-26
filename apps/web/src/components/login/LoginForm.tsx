"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

interface LoginFormProps {
  githubEnabled: boolean;
  devLoginEnabled: boolean;
}

export function LoginForm({ githubEnabled, devLoginEnabled }: LoginFormProps) {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/dashboard";

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleDevLogin(event: React.FormEvent) {
    event.preventDefault();
    setIsSubmitting(true);
    await signIn("dev-login", { email, name, callbackUrl });
  }

  return (
    <div>
      {githubEnabled && (
        <button
          type="button"
          onClick={() => signIn("github", { callbackUrl })}
          className="w-full rounded-md bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
        >
          Sign in with GitHub
        </button>
      )}

      {githubEnabled && devLoginEnabled && (
        <div className="my-6 flex items-center gap-3" role="separator">
          <div className="h-px flex-1 bg-slate-200" />
          <span className="text-xs uppercase text-slate-400">or, for local development</span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>
      )}

      {devLoginEnabled && (
        <form onSubmit={handleDevLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            />
          </div>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700">
              Name (optional)
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md border border-brand-600 px-4 py-2.5 text-sm font-semibold text-brand-700 hover:bg-brand-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 disabled:opacity-50"
          >
            Continue with dev login
          </button>
        </form>
      )}

      {!githubEnabled && !devLoginEnabled && (
        <p className="text-sm text-slate-600">
          No sign-in providers are configured. Set <code>GITHUB_ID</code>/<code>GITHUB_SECRET</code>{" "}
          or run in development mode.
        </p>
      )}
    </div>
  );
}
