"use client";
import Sidebar from "@/components/layout/sidebar";
import BlogCard from "@/components/blog/blogCard";
import { useAuth } from "@/context/AuthContext";
import { useService } from "@/hooks/useService";
import { useEffect, useRef, useState } from "react";
import { Blog } from "@/lib/types";

interface BlogApiResponseType extends Record<string, any> {
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
export default function Home() {
  const { loading } = useAuth();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);


  const loaderRef = useRef<HTMLDivElement | null>(null);
  const fetchBlogApi = `${process.env.NEXT_PUBLIC_BLOG_SERVICE}/?page=${page}&limit=5`;
  const {
    data,
    loading: apiLoading,
    error,
    execute,
  } = useService<BlogApiResponseType>(fetchBlogApi);

  useEffect(() => {
    execute();
  }, [page]);
  
  useEffect(() => {
    if (data?.data) {
      sethasMore(data.pagination.hasNextPage);
      setBlogs((prev) => [...prev, ...data.data]);
      setIsFetching(false);
    }
  }, [data]);

const observer = useRef<IntersectionObserver | null>(null);

const setObserverRef = (node: HTMLDivElement | null) => {
  if (observer.current) observer.current.disconnect(); // disconnect old observer
  if (node) {
    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isFetching) {
          setIsFetching(true);
          setPage((prev) => prev + 1);
        }
      },
      { rootMargin: "100px", threshold: 1 }
    );
    observer.current.observe(node);
  }
};

  if ((loading || apiLoading) && page === 1) {
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
            {blogs.map((blog, id) => (
              <BlogCard key={id} blog={blog} />
            ))}
          </div>
          {hasMore && (
            <div ref={setObserverRef} className="flex justify-center mt-8">
              <div className="animate-spin w-8 h-8 border-t rounded-full"></div>
            </div>
          )}
        </main>
        <aside className="hidden lg:block relative w-80">
          <Sidebar />
        </aside>
      </div>
    </div>
  );
}
