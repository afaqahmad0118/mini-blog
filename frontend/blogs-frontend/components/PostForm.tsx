"use client";

import { useState, type ChangeEvent, type SubmitEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { API_URL, imageUrl } from "@/lib/api";
import { getToken } from "@/lib/auth";
import type { Post } from "@/lib/types";

const MAX_SIZE = 5 * 1024 * 1024; // 5 MB, same as the backend

export default function PostForm({ post }: { post?: Post }) {
  const router = useRouter();
  const [title, setTitle] = useState(post?.title ?? "");
  const [content, setContent] = useState(post?.content ?? "");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState(post?.cover_image ? imageUrl(post.cover_image) : "");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const picked = e.target.files?.[0];
    if (!picked) return;

    if (picked.size > MAX_SIZE) {
      setError("Image must be smaller than 5 MB.");
      e.target.value = "";
      return;
    }

    setError("");
    setFile(picked);
    setPreview(URL.createObjectURL(picked));
  }

  async function uploadCover(id: number, token: string) {
    const formData = new FormData();
    formData.append("file", file as File);

    const res = await fetch(`${API_URL}/posts/${id}/cover`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    if (!res.ok) {
      const data = await res.json();
      return typeof data.detail === "string" ? data.detail : "The image could not be uploaded.";
    }
    return "";
  }

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const token = getToken();
    if (!token) {
      setError("Please log in first.");
      return;
    }

    setSubmitting(true);
    const res = await fetch(post ? `${API_URL}/posts/${post.id}` : `${API_URL}/posts`, {
      method: post ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, content }),
    });

    if (!res.ok) setSubmitting(false);

    if (res.status === 401) {
      setError("Your login has expired. Please log in again.");
      return;
    }
    if (res.status === 403) {
      setError("You can only edit your own posts.");
      return;
    }
    if (!res.ok) {
      setError("Something went wrong. Please try again.");
      return;
    }

    const id = post ? post.id : (await res.json()).id;

    if (file) {
      const uploadError = await uploadCover(id, token);
      if (uploadError) {
        setSubmitting(false);
        setError(`Your post was saved, but the image failed: ${uploadError}`);
        return;
      }
    }

    router.push(`/posts/${id}`);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
      <label className="flex cursor-pointer flex-col gap-2">
        <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Cover image (optional)</span>
        {preview ? (
          <div className="relative aspect-2/1 w-full overflow-hidden rounded-lg border border-zinc-300 dark:border-zinc-700">
            <Image src={preview} alt="Cover preview" fill unoptimized className="object-cover" />
          </div>
        ) : (
          <div className="flex aspect-2/1 w-full items-center justify-center rounded-lg border-2 border-dashed border-zinc-300 text-sm text-zinc-500 dark:border-zinc-700">
            Click to choose an image (JPG, PNG or WEBP, max 5 MB)
          </div>
        )}
        <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleFileChange} className="hidden" />
        {preview && <span className="text-xs text-zinc-500">Click the image to change it</span>}
      </label>

      <input
        className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-lg font-semibold dark:border-zinc-700 dark:bg-zinc-900"
        placeholder="Post title"
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="min-h-60 rounded-lg border border-zinc-300 bg-white px-3 py-2 leading-7 dark:border-zinc-700 dark:bg-zinc-900"
        placeholder="Write your post..."
        required
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      {error && (
        <p className="text-sm text-red-500">
          {error}{" "}
          {error.includes("log in") && <Link href="/login" className="underline">Log in</Link>}
        </p>
      )}
      <div className="flex gap-3">
        <button disabled={submitting} className="rounded-lg bg-indigo-600 px-5 py-2 font-semibold text-white hover:bg-indigo-700 disabled:opacity-50">
          {submitting ? "Saving..." : post ? "Save changes" : "Publish"}
        </button>
        <Link
          href={post ? `/posts/${post.id}` : "/"}
          className="rounded-lg border border-zinc-300 px-5 py-2 font-semibold dark:border-zinc-700"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
