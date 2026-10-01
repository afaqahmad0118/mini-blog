import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PostForm from "./PostForm";

const mockPush = jest.fn(); // 🆕

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush, refresh: jest.fn() }), // 🆕 uses mockPush
}));

afterEach(() => {        // 🆕
  localStorage.clear();
  jest.clearAllMocks();
});

test("typing in the title box shows the text", async () => {
  const user = userEvent.setup();
  render(<PostForm />);

  const titleBox = screen.getByPlaceholderText("Post title");
  await user.type(titleBox, "My first post");

  expect(titleBox).toHaveValue("My first post");
});

test("shows an error if you publish without logging in", async () => {
  const user = userEvent.setup();
  render(<PostForm />);

  await user.type(screen.getByPlaceholderText("Post title"), "Hello");
  await user.type(screen.getByPlaceholderText("Write your post..."), "Some text");
  await user.click(screen.getByRole("button", { name: "Publish" }));

  expect(screen.getByText(/Please log in first/)).toBeInTheDocument();
});

// 🆕
test("shows an error when the server says 403", async () => {
  localStorage.setItem("token", "fake-token");
  global.fetch = jest.fn().mockResolvedValue({ ok: false, status: 403 });

  const user = userEvent.setup();
  render(<PostForm />);

  await user.type(screen.getByPlaceholderText("Post title"), "Hello");
  await user.type(screen.getByPlaceholderText("Write your post..."), "Some text");
  await user.click(screen.getByRole("button", { name: "Publish" }));

  expect(await screen.findByText("You can only edit your own posts.")).toBeInTheDocument();
});

// 🆕
test("goes to the new post page after publishing", async () => {
  localStorage.setItem("token", "fake-token");
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => ({ id: 5 }),
  });

  const user = userEvent.setup();
  render(<PostForm />);

  await user.type(screen.getByPlaceholderText("Post title"), "Hello");
  await user.type(screen.getByPlaceholderText("Write your post..."), "Some text");
  await user.click(screen.getByRole("button", { name: "Publish" }));

  await waitFor(() => expect(mockPush).toHaveBeenCalledWith("/posts/5"));
});
