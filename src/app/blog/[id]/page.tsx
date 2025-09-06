"use client";

import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Bookmark,
  Clock,
  Heart,
  MessageCircle,
  Share,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import formatNumber from "@/lib/formatNumber";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { useService } from "@/hooks/useService";
import { Blog } from "@/lib/types";
import { authClient } from "@/lib/auth-client";
import { API_SERVICES } from "@/lib/constant";
import { toast } from "react-toastify";

interface Blogpageprops {
  params: Promise<{ id: string }>;
}

interface BlogApiResponseType extends Record<string, any> {
  data: Blog;
}
export default function Page({ params }: Blogpageprops) {
  const { id: blogId } = React.use(params);
  const fetchBlogApi = `${process.env.NEXT_PUBLIC_BLOG_SERVICE}/${blogId}`;
  const {
    loading,
    execute,
    data: apiData,
    error,
  } = useService<BlogApiResponseType>(fetchBlogApi);
  const blog = apiData?.data;
  const { data: session, isPending } = authClient.useSession();

  const [readingProgress, setReadingProgress] = useState(0);
  const [hasEditPermission, setHasEditPermission] = useState(false);
  const [userEngagement, setUserEngagement] = useState({
    hasLiked: false,
    hasBookmarked: false,
  });

  const [engagement, setEngagement] = useState({
    likes: 0,
    bookmarks: 0,
    comments: 0,
    views: 0,
  });

  useEffect(() => {
    execute();
  }, []);

  useEffect(() => {
    if (blog) {
      setUserEngagement({
        hasLiked: blog.userEngagement.hasLiked,
        hasBookmarked: blog.userEngagement.hasBookmarked,
      });
      setEngagement({
        likes: blog.engagement.likes,
        bookmarks: blog.engagement.bookmarks,
        views: blog.engagement.views,
        comments: blog.engagement.comments,
      });
    }
  }, [blog]);

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

  useEffect(() => {
    if (!session?.user?.id) return;

    const checkPermission = async () => {
      try {
        const { data, error } = await authClient.admin.hasPermission({
          userId: session.user.id,
          permission: { blog: ["update"] },
        });
        if (error) {
          console.error("Permission error:", error);
        } else {
          setHasEditPermission(data?.success || false);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      }
    };

    checkPermission();
  }, [session]);

  const toggleLike = async () => {
    const prevUserEngagement = { ...userEngagement };
    const prevEngagement = { ...engagement };
  
    // Optimistic update
    setEngagement((prev) => ({
      ...prev,
      likes: prev.likes + (prevUserEngagement.hasLiked ? -1 : 1),
    }));
    setUserEngagement((prev) => ({ ...prev, hasLiked: !prev.hasLiked }));
  
    try {
      const response = await fetch(`${API_SERVICES.blog}/${blog?.id}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (!response.ok) {
        const errdata = await response.json();
        toast.error(errdata?.error || errdata?.message || "Something went wrong");
  
        // rollback
        setUserEngagement(prevUserEngagement);
        setEngagement(prevEngagement);
      }
    } catch (err) {
      toast.error("Network error");
      setUserEngagement(prevUserEngagement);
      setEngagement(prevEngagement);
    }
  };

  const toggleBookmark = async () => {
    const prevUserEngagement = { ...userEngagement };
    const prevEngagement = { ...engagement };
  
    // Optimistic update
    setEngagement((prev) => ({
      ...prev,
      bookmarks: prev.bookmarks + (prevUserEngagement.hasBookmarked ? -1 : 1),
    }));
    setUserEngagement((prev) => ({
      ...prev,
      hasBookmarked: !prev.hasBookmarked,
    }));
  
    try {
      const response = await fetch(`${API_SERVICES.blog}/${blog?.id}/bookmark`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (!response.ok) {
        const errdata = await response.json();
        toast.error(errdata?.error || errdata?.message || "Something went wrong");
  
        // rollback
        setUserEngagement(prevUserEngagement);
        setEngagement(prevEngagement);
      }
    } catch (err) {
      toast.error("Network error");
      setUserEngagement(prevUserEngagement);
      setEngagement(prevEngagement);
    }
  };

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
              <AvatarImage src={blog.author.image || ""} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex w-full justify-between">
              <div className="flex-1 flex flex-col gap-1">
                <span className="text-foreground">
                  {blog.author.name as string}
                </span>
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
                  <div>{formatNumber(engagement.views)} views</div>
                </span>
              </div>
              {(hasEditPermission || blog.author.id === session?.user.id) && (
                <Link href={`/blog/${blogId}/edit`}>
                  <Button variant="secondary" className="">
                    Edit
                  </Button>
                </Link>
              )}
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
                <Heart
                  className="w-5 h-5 cursor-pointer transition-transform hover:scale-110"
                  fill={userEngagement.hasLiked ? "red" : "none"}
                  stroke={userEngagement.hasLiked ? "red" : "currentColor"}
                  onClick={toggleLike}
                />{" "}
                <span>{formatNumber(engagement.likes)}</span>
              </div>
              <div className="flex gap-2 items-center">
                <MessageCircle className="w-5 h-5" />{" "}
                <span>{formatNumber(engagement.comments)}</span>
              </div>
            </div>
            <div className="flex gap-4 md:gap-8">
              <Bookmark
                className="w-5 h-5 cursor-pointer transition-transform hover:scale-110"
                fill={userEngagement.hasBookmarked ? "white" : "none"}
                stroke={userEngagement.hasBookmarked ? "white" : "currentColor"}
                onClick={toggleBookmark}
              />
              <Share className="w-5 h-5" />{" "}
            </div>
          </div>
          <div className="relative w-full aspect-video">
            {blog.featuredImage && (
              <Image
                alt={blog.title}
                fill
                src={blog.featuredImage}
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
