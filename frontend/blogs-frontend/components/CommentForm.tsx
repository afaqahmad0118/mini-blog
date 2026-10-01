"use client";

import { useState, type SubmitEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { API_URL } from "@/lib/api";
import { getToken } from "@/lib/auth";
import { useCurrentUser } from "@/lib/useCurrentUser";

export default function CommentForm({ postId }: { postId: number }) {
  const router = useRouter();
  const { user, loading } = useCurrentUser();
  const [content, setContent] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  if (loading) return null;

  if (!user) {
    return (
      <p className="mt-4 text-sm text-zinc-500">
        <Link href="/login" className="text-indigo-600">Log in</Link> to write a comment.
      </p>
    );
  }

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setError("");

    const res = await fetch(`${API_URL}/posts/${postId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ content }),
    });

    setSending(false);

    if (!res.ok) {
      setError("Could not post your comment. Please try again.");
      return;
    }

    setContent("");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-2">
      <textarea
        className="min-h-20 rounded-lg border border-zinc-300 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
        placeholder={`Comment as ${user.username}...`}
        required
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
      <button
        disabled={sending}
        className="self-start rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
      >
        {sending ? "Posting..." : "Post comment"}
      </button>
    </form>
  );
}
