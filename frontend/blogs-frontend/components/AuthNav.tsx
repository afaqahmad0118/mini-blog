"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Avatar from "@/components/Avatar";
import { logout } from "@/lib/auth";
import { useCurrentUser } from "@/lib/useCurrentUser";

// this is just for testing purpose

export default function AuthNav() {
  const router = useRouter();
  const { user, loading } = useCurrentUser();

  if (loading) {
    return <div className="h-8 w-40 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />;
  }

  if (!user) {
    return (
      <div className="flex items-center gap-4 text-sm">
        <Link href="/login" className="text-zinc-600 hover:text-indigo-600 dark:text-zinc-400">Log in</Link>
        <Link href="/signup" className="rounded-lg bg-indigo-600 px-3 py-1.5 font-semibold text-white hover:bg-indigo-700">
          Sign up
        </Link>
      </div>
    );
  }

  function handleLogout() {
    logout();
    router.push("/");
    router.refresh();
  }

  return (
    <div className="flex items-center gap-4 text-sm">
      <Link href="/posts/new" className="rounded-lg bg-indigo-600 px-3 py-1.5 font-semibold text-white hover:bg-indigo-700">
        Write
      </Link>
      <div className="flex items-center gap-2">
        <Avatar name={user.username} size="sm" />
        <span className="font-medium">{user.username}</span>
      </div>
      <button onClick={handleLogout} className="text-zinc-500 hover:text-red-500">
        Log out
      </button>
    </div>
  );
}
