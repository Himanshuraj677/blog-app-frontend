"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import BlogCard from "@/components/blog/blogCard";
import { useService } from "@/hooks/useService";
import { Blog, BlogApiResponseType } from "@/lib/types";
import { Filter } from "lucide-react";

const FILTERS = ["Mine", "Bookmarked", "Liked"];
const BLOG_SERVICE_URL = process.env.NEXT_PUBLIC_BLOG_SERVICE;

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [filter, setFilter] = useState("mine");
  const [open, setOpen] = useState(false);
  const [blogFetching, setBlogFetching] = useState(false);

  const observer = useRef<IntersectionObserver | null>(null);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const fetchBlogApi = `${BLOG_SERVICE_URL}/?page=${page}&limit=5&filter=${filter.toLowerCase()}`;
  const { data, loading, execute, error } =
    useService<BlogApiResponseType>(fetchBlogApi);

  // Reset blogs and page when filter changes
  useEffect(() => {
    setPage(1);
    setBlogs([]);
    console.log("Filter has changed: " + filter);
  }, [filter]);

  useEffect(() => {
    console.log("Blog count:", blogs.length);
  }, [blogs]);

  // Fetch blogs when page or filter changes
  useEffect(() => {
    if (!loading) {
      execute();
      console.log("Page has changed:", page);
    }
  }, [page, filter, execute]); // Added execute to dependencies

  // Update blogs when data arrives
  useEffect(() => {
    if (data?.data) {
      setBlogs((prev) => {
        const newBlogs = data.data.filter(
          (newBlog) => !prev.some((b) => b.id === newBlog.id)
        );
        return [...prev, ...newBlogs];
      });
      setHasMore(data.pagination.hasNextPage);
    }
    setBlogFetching(false);
  }, [data]);

  // Handle error state
  useEffect(() => {
    if (error) {
      setBlogFetching(false);
    }
  }, [error]);

  // IntersectionObserver for infinite scroll
  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    if (loaderRef.current) {
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore && !blogFetching) {
            setBlogFetching(true);
            setPage((prev) => prev + 1);
          }
        },
        { rootMargin: "100px", threshold: 1 }
      );
      observer.current.observe(loaderRef.current);
    }

    // Cleanup observer on unmount
    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [hasMore, blogFetching]);

  const handleFilterSelect = (val: string) => {
    const newFilter = val.toLowerCase();
    if (filter !== newFilter) {
      setFilter(newFilter);
    }
    setOpen(false);
  };

  return (
    <div className="w-full">
      <div className="container mx-auto py-10 px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">Blogs</h1>

          {/* Filter Dropdown */}
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-[220px] justify-between rounded-2xl shadow-md bg-gradient-to-r from-gray-900 to-gray-800 text-gray-200 border-gray-700 hover:from-gray-800 hover:to-gray-700"
              >
                <span>
                  {FILTERS.find((f) => f.toLowerCase() === filter) || "Mine"}
                </span>
                <Filter className="h-4 w-4 opacity-60" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-[240px] rounded-xl shadow-lg border border-gray-700 bg-gray-900">
              <Command>
                <CommandInput
                  placeholder="Search filter..."
                  className="text-gray-200 placeholder:text-gray-400"
                />
                <CommandList>
                  <CommandEmpty>No filter found.</CommandEmpty>
                  <CommandGroup>
                    {FILTERS.map((f) => (
                      <CommandItem
                        key={f}
                        value={f}
                        className="text-gray-200 hover:bg-gray-800 cursor-pointer"
                        onSelect={() => handleFilterSelect(f)}
                      >
                        {f}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        {loading && page === 1 && (
          <div className="min-h-screen flex-col flex justify-center items-center">
            <div className="w-8 h-8 animate-spin rounded-full border-t-2 border-primary"></div>
            <p>Loading...</p>
          </div>
        )}

        {!loading && blogs.length === 0 && !blogFetching && (
          <div className="min-h-screen flex-col flex justify-center items-center">
            <p className="font-bold text-4xl">No blog found...</p>
          </div>
        )}

        {/* Blogs */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.length === 0 && blogFetching
            ? Array.from({ length: 6 }).map((_, idx) => (
                <div
                  key={idx}
                  className="h-64 bg-gray-800 animate-pulse rounded-md"
                />
              ))
            : blogs.map((blog) => <BlogCard blog={blog} key={blog.id} />)}
        </div>

        {/* Loader */}
        {hasMore && (
          <div ref={loaderRef} className="flex justify-center mt-8">
            {blogFetching && (
              <div className="animate-spin w-8 h-8 border-t-2 border-blue-500 rounded-full"></div>
            )}
          </div>
        )}

        {error && (
          <div className="text-center text-red-500 mt-4">
            Failed to load blogs
          </div>
        )}
      </div>
    </div>
  );
}
