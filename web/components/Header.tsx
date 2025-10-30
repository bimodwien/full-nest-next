import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-black shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className="font-medium text-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-black/50 rounded"
          >
            Home
          </Link>
        </nav>
      </div>
    </header>
  );
}
