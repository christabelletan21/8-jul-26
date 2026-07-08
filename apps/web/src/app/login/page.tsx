import { LoginForm } from "@/components/login/LoginForm";

export default function LoginPage() {
  const githubEnabled = Boolean(process.env.GITHUB_ID && process.env.GITHUB_SECRET);
  const devLoginEnabled = process.env.NODE_ENV === "development";

  return (
    <div className="mx-auto max-w-sm px-4 py-16">
      <h1 className="text-2xl font-bold text-slate-900">Sign in</h1>
      <p className="mt-1 text-sm text-slate-600">
        Choose a sign-in method to track your course progress.
      </p>
      <div className="mt-6">
        <LoginForm githubEnabled={githubEnabled} devLoginEnabled={devLoginEnabled} />
      </div>
    </div>
  );
}
