import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Avatar from "@/components/Avatar";
import CommentForm from "@/components/CommentForm";
import OwnerActions from "@/components/OwnerActions";
import { API_URL, imageUrl } from "@/lib/api";
import { formatDate } from "@/lib/format";
import type { Post, Comment } from "@/lib/types";

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const res = await fetch(`${API_URL}/posts/${id}`);
  if (res.status === 404 || res.status === 422) notFound();
  if (!res.ok) throw new Error("Could not load the post");
  const post: Post = await res.json();

  const commentsRes = await fetch(`${API_URL}/posts/${id}/comments`);
  if (!commentsRes.ok) throw new Error("Could not load comments");
  const comments: Comment[] = await commentsRes.json();

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <div className="flex items-center justify-between">
        <Link href="/" className="text-sm text-zinc-500 hover:text-indigo-600">
          ← All posts
        </Link>
        <OwnerActions postId={post.id} ownerId={post.owner?.id} />
      </div>

      <article className="mt-6 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        {post.cover_image && (
          <div className="relative aspect-2/1 w-full bg-zinc-100 dark:bg-zinc-800">
            <Image src={imageUrl(post.cover_image)} alt="" fill unoptimized preload className="object-cover" />
          </div>
        )}
        <div className="p-6">
          <h1 className="text-3xl font-bold tracking-tight">{post.title}</h1>
          <div className="mt-3 flex items-center gap-2">
            <Avatar name={post.owner?.username ?? "?"} />
            <span className="text-sm text-zinc-500">
              by {post.owner?.username ?? "unknown"} · {formatDate(post.created_at)}
            </span>
          </div>
          <p className="mt-6 whitespace-pre-line leading-7 text-zinc-700 dark:text-zinc-300">{post.content}</p>
        </div>
      </article>

      <section className="mt-10">
        <h2 className="text-lg font-semibold">Comments ({comments.length})</h2>

        <CommentForm postId={post.id} />

        {comments.length === 0 && <p className="mt-4 text-zinc-500">No comments yet. Be the first!</p>}

        <div className="mt-4 flex flex-col gap-3">
          {comments.map((c) => (
            <div
              key={c.id}
              className="flex gap-3 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <Avatar name={c.user.username} size="sm" />
              <div>
                <p className="text-sm font-semibold">{c.user.username}</p>
                <p className="mt-1 text-zinc-700 dark:text-zinc-300">{c.content}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
