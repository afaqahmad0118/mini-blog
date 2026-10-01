import { notFound } from "next/navigation";
import PostForm from "@/components/PostForm";
import { API_URL } from "@/lib/api";
import type { Post } from "@/lib/types";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const res = await fetch(`${API_URL}/posts/${id}`);
  if (res.status === 404) notFound();
  const post: Post = await res.json();

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight">Edit post</h1>
      <PostForm post={post} />
    </main>
  );
}
