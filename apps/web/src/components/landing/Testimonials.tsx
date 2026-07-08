const TESTIMONIALS = [
  {
    quote: "The structured learning path made it easy to go from tutorials to a real portfolio project.",
    name: "Alex R.",
    role: "Career switcher",
  },
  {
    quote: "Live trainings paired with self-paced courses is exactly the format I needed.",
    name: "Priya S.",
    role: "Backend engineer",
  },
];

export function Testimonials() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16" aria-labelledby="testimonials-heading">
      <h2 id="testimonials-heading" className="text-2xl font-bold text-slate-900">
        What learners say
      </h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        {TESTIMONIALS.map((testimonial) => (
          <blockquote key={testimonial.name} className="rounded-lg bg-slate-50 p-6">
            <p className="text-slate-700">&ldquo;{testimonial.quote}&rdquo;</p>
            <footer className="mt-3 text-sm font-medium text-slate-900">
              {testimonial.name}
              <span className="ml-1 font-normal text-slate-500">— {testimonial.role}</span>
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
