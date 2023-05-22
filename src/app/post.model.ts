export type Post = {
  content: string;
  title: string;
  id?: string;
};

export type Data = {
  [s: string]: Post;
};
