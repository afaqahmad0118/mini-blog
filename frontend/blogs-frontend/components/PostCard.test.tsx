import { render, screen } from "@testing-library/react";
import PostCard from "./PostCard";
import type { Post } from "@/lib/types";

const fakePost: Post = {
  id: 1,
  title: "Learning Jest",
  content: "Tests are fun",
  created_at: "2026-01-05",
  cover_image: null,
  owner: { id: 7, username: "ali" },
};

test("shows the post title, content and author", () => {
  render(<PostCard post={fakePost} />);

  expect(screen.getByText("Learning Jest")).toBeInTheDocument();
  expect(screen.getByText("Tests are fun")).toBeInTheDocument();
  expect(screen.getByText("ali")).toBeInTheDocument();
});

test("links to the post page", () => {
  render(<PostCard post={fakePost} />);

  expect(screen.getByRole("link")).toHaveAttribute("href", "/posts/1");
});
