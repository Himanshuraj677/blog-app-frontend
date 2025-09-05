import React, { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Blog } from "@/lib/types";
import Image from "next/image";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import {
  Clock,
  Heart,
  Bookmark,
  Eye,
  Share,
  MessageCircle,
} from "lucide-react";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { API_SERVICES } from "@/lib/constant";
import { toast } from "react-toastify";
interface BlogcardProps {
  blog: Blog;
}

const formatNumber = (count: number): string => {
  if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
  else return count.toString();
};

export default function BlogCard({ blog }: BlogcardProps) {
  const [userEngagement, setUserEngagement] = useState({
    hasLiked: blog.userEngagement.hasLiked,
    hasBookmarked: blog.userEngagement.hasBookmarked,
  });

  const [engagement, setEngagement] = useState({
    likes: blog.engagement.likes,
    bookmarks: blog.engagement.bookmarks,
    comments: blog.engagement.comments,
    views: blog.engagement.views,
  });

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
    const response = await fetch(`${API_SERVICES.blog}/${blog.id}/like`, {
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
    const response = await fetch(`${API_SERVICES.blog}/${blog.id}/bookmark`, {
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

  return (
    <Card className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1 py-0 bg-background overflow-hidden border-slate-800">
      <CardContent className="p-0">
        <div className="relative w-full aspect-video rounded-t-md overflow-hidden">
          <Image
            src={blog.featuredImage as string}
            alt={blog.title}
            fill
            className="object-cover object-center"
          />
        </div>
        <div className="mt-6 px-6 flex flex-col gap-6">
          {/* Author Info */}
          <div className="flex gap-6">
            <Avatar className="w-10 h-10 hover:ring-2 hover:ring-primary transition-all">
              <AvatarImage src={blog.author.image || ""} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex-1 flex flex-col">
              <div className="text-foreground">
                {blog.author.name as string}
              </div>
              <div className="text-muted-foreground text-sm flex gap-1 items-center">
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
              </div>
            </div>
          </div>

          {/* Blog Details */}
          <div className="flex gap-2 flex-col">
            <Link href={`/blog/${blog.id}`} className="flex flex-col gap-2">
              <h2 className="text-xl font-bold">{blog.title}</h2>
              <p className="text-md text-muted-foreground">{blog.excerpt}</p>
            </Link>

            {/* Tags */}
            <div className="flex gap-2 flex-wrap">
              {/* First 2 tags always visible */}
              {blog.tags.slice(0, 2).map((tag, id) => (
                <Badge
                  key={id}
                  variant="secondary"
                  className="text-xs hover:bg-accent cursor-pointer transition-colors"
                >
                  #{tag}
                </Badge>
              ))}

              {/* Show 3rd only on md+ */}
              {blog.tags[2] && (
                <Badge
                  variant="secondary"
                  className="hidden md:inline-flex text-xs hover:bg-accent cursor-pointer transition-colors"
                >
                  #{blog.tags[2]}
                </Badge>
              )}

              {/* +N more */}
              {blog.tags.length > 2 && (
                <Badge
                  variant="secondary"
                  className="text-xs hover:bg-accent cursor-pointer transition-colors"
                >
                  +{blog.tags.length - 2} more
                </Badge>
              )}
            </div>
          </div>
          {/* Engagements */}
          <div className="flex items-center justify-between border-t border-slate-800 pt-6 mb-6">
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
              <div className="flex gap-2 items-center">
                <Eye className="w-5 h-5" />{" "}
                <span>{formatNumber(engagement.views)}</span>
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
        </div>
      </CardContent>
    </Card>
  );
}
