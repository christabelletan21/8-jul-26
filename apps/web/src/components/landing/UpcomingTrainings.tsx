const PLACEHOLDER_TRAININGS = [
  { title: "Live: Debugging React Performance", date: "Coming soon", instructor: "TBA" },
  { title: "Workshop: Kubernetes Fundamentals", date: "Coming soon", instructor: "TBA" },
  { title: "Bootcamp: API Design Best Practices", date: "Coming soon", instructor: "TBA" },
];

export function UpcomingTrainings() {
  return (
    <section className="bg-slate-50 py-16" aria-labelledby="upcoming-trainings-heading">
      <div className="mx-auto max-w-6xl px-4">
        <h2 id="upcoming-trainings-heading" className="text-2xl font-bold text-slate-900">
          Upcoming trainings
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Live scheduling is coming soon — here&apos;s a preview of what&apos;s planned.
        </p>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PLACEHOLDER_TRAININGS.map((training) => (
            <div
              key={training.title}
              className="rounded-lg border border-dashed border-slate-300 bg-white p-5"
            >
              <h3 className="text-lg font-semibold text-slate-900">{training.title}</h3>
              <p className="mt-1 text-sm text-slate-600">Instructor: {training.instructor}</p>
              <p className="mt-1 text-sm text-slate-500">{training.date}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
