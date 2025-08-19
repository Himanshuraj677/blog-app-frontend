"use client";

import Navbar from "@/components/layout/navbar";
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

interface Blogpageprops {
  params: {
    id: string;
  };
}
export default function Page({ params }: Blogpageprops) {
  const [readingProgress, setReadingProgress] = useState(0);
  const blog = {
    id: "1",
    title: "Getting Started with Next.js 14 and App Router",
    content:
      "<h2>Introduction to Next.js 14</h2><p>Next.js 14 brings exciting new features and improvements to the React framework. In this comprehensive guide, we'll explore the App Router, Server Components, and the latest performance optimizations.</p><h3>Key Features</h3><ul><li>Improved App Router with better performance</li><li>Enhanced Server Components</li><li>Better TypeScript support</li><li>Optimized bundling</li></ul><p>Let's dive into each of these features and see how they can improve your development experience.</p>",
    excerpt:
      "Explore the latest features in Next.js 14 including App Router improvements and Server Components enhancements.",
    authorId: "3",
    author: "Himanshu Raj",
    tags: ["nextjs", "react", "web-development", "javascript"],
    status: "published",
    featuredImage: "/placeholder.svg?height=400&width=800",
    readingTime: 8,
    engagement: {
      likes: 124,
      bookmarks: 45,
      comments: 23,
      views: 1250,
      shares: 18,
    },
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
    publishedAt: "2024-01-15T10:00:00Z",
  };

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
  return (
    <div className="w-full min-h-screen relative">
      <Navbar />
      <div className="fixed top-16 left-0 z-10 h-1 w-full">
        <div
          className="h-full bg-primary transition-all duration-150 ease-out blur-sm"
          style={{ width: `${readingProgress}%` }}
        />
      </div>
      <div className="container max-w-4xl mx-auto p-4">
        <div className="flex gap-4 text-sm items-center cursor-pointer font-semibold">
          <ArrowLeft className="w-4 h-8" />
          <span>Back to posts</span>
        </div>
        <div className="mt-8 flex flex-col gap-8">
          <h2 className="text-4xl tracking-tight font-bold">{blog.title}</h2>
          <div className="flex gap-6">
            <Avatar className="w-10 h-10 hover:ring-2 hover:ring-primary transition-all">
              <AvatarImage src={blog.featuredImage} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex-1 flex flex-col gap-1">
              <div className="text-foreground">{blog.author as string}</div>
              <div className="text-muted-foreground text-sm flex gap-2 items-center">
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
              </div>
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
          <div className="prose prose-lg max-w-none mb-8">
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
          </div>
        </div>
      </div>
    </div>
  );
}
