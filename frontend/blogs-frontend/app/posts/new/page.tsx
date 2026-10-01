import PostForm from "@/components/PostForm";

export default function NewPostPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight">Write a post</h1>
      <PostForm />
    </main>
  );
}
