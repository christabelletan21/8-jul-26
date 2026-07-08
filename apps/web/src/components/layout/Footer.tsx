export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-slate-600">
        <p>&copy; {new Date().getFullYear()} DevAcademy. A software development education platform.</p>
      </div>
    </footer>
  );
}
