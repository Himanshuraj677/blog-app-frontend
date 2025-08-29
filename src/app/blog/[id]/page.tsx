"use client";

import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Bookmark,
  Clock,
  Eye,
  Heart,
  MessageCircle,
  Share,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import formatNumber from "@/lib/formatNumber";
import Image from "next/image";
import BlogForm from "@/components/blog/blog-form";
import { Mock_blogs } from "@/lib/mock-data";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { useService } from "@/hooks/useService";
import { Blog } from "@/lib/types";

interface Blogpageprops {
  params: Promise<{ id: string }>;
}

interface BlogApiResponseType extends Record<string, any> {
  data: Blog;
}
export default function Page({ params }: Blogpageprops) {
  const { id: blogId } = React.use(params);
  const [readingProgress, setReadingProgress] = useState(0);
  const fetchBlogApi = `${process.env.NEXT_PUBLIC_BLOG_SERVICE}/${blogId}`;
  const { loading, execute, data: apiData, error } =
    useService<BlogApiResponseType>(fetchBlogApi);
  const blog = apiData?.data;
  useEffect(() => {
    execute();
  }, [execute])

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setReadingProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex-col flex justify-center items-center">
        <p className="font-bold text-4xl">No blog found....</p>
      </div>
    );
  }

  if (loading || !blog) {
    return (
      <div className="min-h-screen flex-col flex justify-center items-center">
        <div className="w-8 h-8 animate-spin rounded-full border-t-2 border-primary"></div>
        <p>Loading...</p>
      </div>
    );
  }


  return (
    <div className="w-full min-h-screen relative">
      <div className="fixed top-16 left-0 z-10 h-1 w-full">
        <div
          className="h-full bg-primary transition-all duration-150 ease-out blur-sm"
          style={{ width: `${readingProgress}%` }}
        />
      </div>
      <div className="container max-w-4xl mx-auto p-4">
        <Link
          href="/"
          className="flex gap-4 text-sm items-center font-semibold"
        >
          <ArrowLeft className="w-4 h-8" />
          <span>Back to posts</span>
        </Link>
        <div className="mt-8 flex flex-col gap-8">
          <h2 className="text-4xl tracking-tight font-bold">{blog.title}</h2>
          <div className="flex gap-6">
            <Avatar className="w-10 h-10 hover:ring-2 hover:ring-primary transition-all">
              <AvatarImage src={blog.featuredImage} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex w-full justify-between">
              <div className="flex-1 flex flex-col gap-1">
                <span className="text-foreground">{blog.author as string}</span>
                <span className="text-muted-foreground text-sm flex gap-2 items-center">
                  <span>
                    {new Date(blog.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{blog.readingTime} min read</span>
                  </div>
                  <span>•</span>
                  <div>{formatNumber(blog.engagement.views)} views</div>
                </span>
              </div>
              <Link href={`/blog/${blogId}/edit`}>
                <Button variant="secondary" className="">
                  Edit
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex gap-4">
            {blog.tags.map((tag, id) => (
              <Badge key={id} variant="secondary" className="px-2 py-1">
                #{tag}
              </Badge>
            ))}
          </div>
          <div className="flex items-center justify-between border-y border-slate-900 py-4">
            <div className="flex gap-4 md:gap-8">
              <div className="flex gap-2 items-center">
                <Heart className="w-5 h-5" />{" "}
                <span>{formatNumber(blog.engagement.likes)}</span>
              </div>
              <div className="flex gap-2 items-center">
                <MessageCircle className="w-5 h-5" />{" "}
                <span>{formatNumber(blog.engagement.comments)}</span>
              </div>
            </div>
            <div className="flex gap-4 md:gap-8">
              <Bookmark className="w-5 h-5" />
              <Share className="w-5 h-5" />{" "}
            </div>
          </div>
          <div className="relative w-full aspect-video">
            {blog.featuredImage && (
              <Image
                alt={blog.title}
                fill
                src="https://images.unsplash.com/photo-1619410283995-43d9134e7656?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0"
                className="object-cover object-center rounded-md"
              />
            )}
          </div>
          <div className="prose prose-lg max-w-full mb-8">
            <SimpleEditor content={blog.content} editable={false} />
          </div>
        </div>
      </div>
    </div>
  );
}
