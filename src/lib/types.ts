export type UserRole = "admin" | "moderator" | "author" | "subscriber";

export type UserStatus = "active" | "suspended" | "banned";

export type PostStatus = "draft" | "pending" | "published" | "archived";

export interface Blog {
  id: string;
  title: string;
  content: string | Record<string, any>;
  excerpt: string;
  author: {
    id: string;
    name: User | string;
    image: string | null;
  };
  tags: string[];
  status: PostStatus | string;
  featured?: boolean;
  featuredImage?: string;
  readingTime: number;
  engagement: {
    likes: number;
    bookmarks: number;
    comments: number;
    views: number;
    shares: number;
  };
  userEngagement: {
    hasLiked: boolean;
    hasBookmarked: boolean;
  };
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface BlogInput {
  title: string;
  excerpt: string;
  tags: string[];
  status: PostStatus | string;
  featuredImage?: string;
  content: string | Record<string, any>;
}

export interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  avatar?: string;
  bio?: string;
  location?: string;
  website?: string;
  role: UserRole;
  status: UserStatus;
  socialLinks: {
    github?: string;
    twitter?: string;
    linkedin?: string;
  };
  stats: {
    followers: number;
    following: number;
    posts: number;
    likes: number;
  };
  preferences: {
    emailNotifications: boolean;
    darkMode: boolean;
  };
  createdAt: string;
  updatedAt: string;
}

export interface BlogApiResponseType extends Record<string, any> {
  data: Blog[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}
