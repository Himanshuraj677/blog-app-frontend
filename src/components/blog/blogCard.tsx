import React from "react";
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
interface BlogcardProps {
  blog: Blog;
}

const formatNumber = (count: number): string => {
  if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
  else return count.toString();
};

export default function BlogCard({ blog }: BlogcardProps) {
  return (
    <Card className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1 py-0 bg-background overflow-hidden border-slate-800">
      <CardContent className="p-0">
        <div className="relative w-full aspect-video rounded-t-md overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1619410283995-43d9134e7656?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0"
            alt={blog.title}
            fill
            className="object-cover object-center"
          />
        </div>
        <div className="mt-6 px-6 flex flex-col gap-6">
          {/* Author Info */}
          <div className="flex gap-6">
            <Avatar className="w-10 h-10 hover:ring-2 hover:ring-primary transition-all">
              <AvatarImage src={blog.featuredImage} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex-1 flex flex-col">
              <div className="text-foreground">{blog.author as string}</div>
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
            <h2 className="text-xl font-bold">{blog.title}</h2>
            <p className="text-md text-muted-foreground">{blog.excerpt}</p>

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
                <Heart className="w-5 h-5" />{" "}
                <span>{formatNumber(blog.engagement.likes)}</span>
              </div>
              <div className="flex gap-2 items-center">
                <MessageCircle className="w-5 h-5" />{" "}
                <span>{formatNumber(blog.engagement.comments)}</span>
              </div>
              <div className="flex gap-2 items-center">
                <Eye className="w-5 h-5" />{" "}
                <span>{formatNumber(blog.engagement.views)}</span>
              </div>
            </div>
            <div className="flex gap-4 md:gap-8">
              <Bookmark className="w-5 h-5" />
              <Share className="w-5 h-5" />{" "}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
