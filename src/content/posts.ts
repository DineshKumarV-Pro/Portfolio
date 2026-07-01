export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  publishedAt?: string;
  readingTime?: string;
  placeholder?: boolean;
};

/** Empty by default — populate via MDX or CMS later. */
export const posts: Post[] = [];

export const recentPosts: Post[] = posts.slice(0, 3);
