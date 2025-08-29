"use client";
import Sidebar from "@/components/layout/sidebar";
import BlogCard from "@/components/blog/blogCard";
import { useAuth } from "@/context/AuthContext";
import { useService } from "@/hooks/useService";
import { useEffect } from "react";
import { Blog } from "@/lib/types";

interface BlogApiResponseType extends Record<string, any> {
  data: Blog[];
}
export default function Home() {
  const { loading } = useAuth();
  const fetchBlogApi = `${process.env.NEXT_PUBLIC_BLOG_SERVICE}`;
  const {
    data,
    loading: apiLoading,
    error,
    execute,
  } = useService<BlogApiResponseType>(fetchBlogApi);

  useEffect(() => {
    execute();
  }, [execute]);

  if (loading || apiLoading) {
    return (
      <div className="min-h-screen flex-col flex justify-center items-center">
        <div className="w-8 h-8 animate-spin rounded-full border-t-2 border-primary"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!data?.data) {
    return (
      <div className="min-h-screen flex-col flex justify-center items-center">
        <p className="font-bold text-4xl">No blog found....</p>
      </div>
    );
  }
  return (
    <div className="w-full">
      <div className="container mx-auto flex flex-row px-4 py-8 gap-8 max-w-full">
        <main className="flex-1">
          <div className="mb-4">
            <h1 className="text-4xl font-bold mb-2">Latest Posts</h1>
            <p className="text-md text-muted-foreground">
              Discover the latest articles from the community
            </p>
          </div>
          <div className="flex flex-col gap-8 w-full">
            {data.data.map((blog, id) => (
              <BlogCard key={id} blog={blog} />
            ))}
          </div>
        </main>
        <aside className="hidden lg:block relative w-80">
          <Sidebar />
        </aside>
      </div>
    </div>
  );
}
