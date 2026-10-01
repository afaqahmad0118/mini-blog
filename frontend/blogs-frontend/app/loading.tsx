export default function Loading() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <div className="h-9 w-48 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />
      <div className="mt-8 flex flex-col gap-4">
        {[1, 2, 3].map((n) => (
          <div key={n} className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="h-6 w-2/3 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
            <div className="mt-3 h-4 w-full animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
            <div className="mt-2 h-4 w-5/6 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
          </div>
        ))}
      </div>
    </main>
  );
}
