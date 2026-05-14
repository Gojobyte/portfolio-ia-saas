export function Footer() {
  return (
    <footer className="border-t border-card-border py-6 px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-muted">
          &copy; 2025 Adoum Salah &mdash; Construit avec Next.js & Tailwind CSS
        </p>
        <p className="text-xs text-muted">
          Deploye sur Vercel
        </p>
      </div>
    </footer>
  );
}
