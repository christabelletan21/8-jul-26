export function ComingSoon({ title, description }: { title: string; description: string }) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <h1 className="text-3xl font-bold text-slate-900">{title}</h1>
      <p className="mt-3 text-slate-600">{description}</p>
      <p className="mt-6 inline-block rounded-full bg-slate-100 px-4 py-1.5 text-sm font-medium text-slate-600">
        Coming soon
      </p>
    </div>
  );
}
