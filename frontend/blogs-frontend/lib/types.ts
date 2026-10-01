export type User = {
  id: number;
  username: string;
};

export type Post = {
  id: number;
  title: string;
  content: string;
  created_at: string | null;
  cover_image: string | null;
  owner: User | null;
};

export type Comment = {
  id: number;
  content: string;
  post_id: number;
  user: User;
};
