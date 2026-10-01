"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { API_URL } from "@/lib/api";
import { getToken } from "@/lib/auth";
import { useCurrentUser } from "@/lib/useCurrentUser";

export default function OwnerActions({ postId, ownerId }: { postId: number; ownerId?: number }) {
  const router = useRouter();
  const { user } = useCurrentUser();
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  if (!user || user.id !== ownerId) return null;

  async function handleDelete() {
    if (!confirm("Delete this post? This can't be undone.")) return;
    setDeleting(true);
    setError("");

    const res = await fetch(`${API_URL}/posts/${postId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${getToken()}` },
    });

    if (!res.ok) {
      setError("Could not delete the post.");
      setDeleting(false);
      return;
    }

    router.push("/");
    router.refresh();
  }

  return (
    <div className="flex items-center gap-4 text-sm">
      {error && <span className="text-red-500">{error}</span>}
      <Link href={`/posts/${postId}/edit`} className="text-zinc-500 hover:text-indigo-600">
        Edit
      </Link>
      <button onClick={handleDelete} disabled={deleting} className="text-zinc-500 hover:text-red-500 disabled:opacity-50">
        {deleting ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
}
