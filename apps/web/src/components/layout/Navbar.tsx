import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { AuthButtons } from "./AuthButtons";

const NAV_LINKS = [
  { href: "/courses", label: "Courses" },
  { href: "/trainings", label: "Trainings" },
  { href: "/playground", label: "Playground" },
  { href: "/community", label: "Community" },
  { href: "/pricing", label: "Pricing" },
];

export async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <header className="border-b border-slate-200 bg-white">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4"
      >
        <Link href="/" className="text-lg font-bold text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded">
          DevAcademy
        </Link>

        <ul className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium text-slate-700 hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded"
              >
                {link.label}
              </Link>
            </li>
          ))}
          {session && (
            <li>
              <Link
                href="/dashboard"
                className="text-sm font-medium text-slate-700 hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded"
              >
                Dashboard
              </Link>
            </li>
          )}
        </ul>

        <AuthButtons isAuthenticated={Boolean(session)} userName={session?.user?.name ?? null} />
      </nav>
    </header>
  );
}
