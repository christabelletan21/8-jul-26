import Link from "next/link";

export function CTA() {
  return (
    <section className="bg-brand-700">
      <div className="mx-auto max-w-6xl px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-white">Ready to start learning?</h2>
        <p className="mt-2 text-brand-100">
          Create an account and track your progress across every course.
        </p>
        <Link
          href="/login"
          className="mt-6 inline-block rounded-md bg-white px-5 py-3 text-sm font-semibold text-brand-700 hover:bg-brand-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          Get started
        </Link>
      </div>
    </section>
  );
}
