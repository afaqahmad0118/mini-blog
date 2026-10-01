"use client";

import { useEffect } from "react";

export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto max-w-2xl px-4 py-20 text-center">
      <h1 className="text-2xl font-bold">Something went wrong</h1>
      <p className="mt-2 text-zinc-500">We couldn&apos;t load this page. Is the backend server running?</p>
      <button
        onClick={() => retry()}
        className="mt-6 rounded-lg bg-indigo-600 px-5 py-2 font-semibold text-white hover:bg-indigo-700"
      >
        Try again
      </button>
    </main>
  );
}
