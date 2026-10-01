import PostCard from "@/components/PostCard";
import { API_URL } from "@/lib/api";
import type { Post } from "@/lib/types";

export default async function Home() {
  const res = await fetch(`${API_URL}/posts`);
  if (!res.ok) throw new Error("Could not load posts");
  const posts: Post[] = await res.json();

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight">Latest posts</h1>
      <p className="mt-1 text-zinc-500">Stories and notes from our writers.</p>

      <div className="mt-8 flex flex-col gap-4">
        {posts.length === 0 && <p className="text-zinc-500">No posts yet.</p>}
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </main>
  );
}
