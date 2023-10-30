import Link from "next/link";

export default function Header() {
  return (
    <header>
      <div className="navbar bg-neutral text-neutral-content px-8">
        <div className="container justify-between mx-auto">
          <Link href="/">
            <div className="text-2xl font-bold uppercase">Dokke</div>
          </Link>
          <nav className="flex gap-10">
            <Link href="/documents">
              <div className="text-neutral-content font-semibold">
                Documents
              </div>
            </Link>
            <Link href="/create">
              <div className="text-neutral-content font-semibold">
                Create new
              </div>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
