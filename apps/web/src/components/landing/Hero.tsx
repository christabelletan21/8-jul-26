import Link from "next/link";

export function Hero() {
  return (
    <section className="bg-gradient-to-b from-brand-50 to-white">
      <div className="mx-auto max-w-6xl px-4 py-20 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Learn to build software that ships.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
          Structured courses, live training, and hands-on practice for developers at every
          stage — from your first line of code to production-grade systems.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/courses"
            className="rounded-md bg-brand-600 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            Browse courses
          </Link>
          <Link
            href="/trainings"
            className="rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            View trainings
          </Link>
        </div>
      </div>
    </section>
  );
}
