import Image from "next/image";
import Link from "next/link";
import Avatar from "@/components/Avatar";
import { imageUrl } from "@/lib/api";
import { formatDate } from "@/lib/format";
import type { Post } from "@/lib/types";

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/posts/${post.id}`}
      className="group overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
    >
      {post.cover_image && (
        <div className="relative aspect-2/1 w-full bg-zinc-100 dark:bg-zinc-800">
          <Image src={imageUrl(post.cover_image)} alt="" fill unoptimized className="object-cover" />
        </div>
      )}
      <div className="p-5">
        <h2 className="text-xl font-semibold group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
          {post.title}
        </h2>
        <p className="mt-2 line-clamp-2 text-zinc-600 dark:text-zinc-400">{post.content}</p>
        <div className="mt-4 flex items-center gap-2">
          <Avatar name={post.owner?.username ?? "?"} size="sm" />
          <span className="text-sm text-zinc-500">{post.owner?.username ?? "unknown"}</span>
          <span className="text-sm text-zinc-400">· {formatDate(post.created_at)}</span>
        </div>
      </div>
    </Link>
  );
}




