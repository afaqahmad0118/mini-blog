import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-20 text-center">
      <p className="text-5xl font-bold text-indigo-600">404</p>
      <h1 className="mt-4 text-2xl font-bold">Page not found</h1>
      <p className="mt-2 text-zinc-500">This post may have been deleted, or the link is wrong.</p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-lg bg-indigo-600 px-5 py-2 font-semibold text-white hover:bg-indigo-700"
      >
        Back to all posts
      </Link>
    </main>
  );
}
