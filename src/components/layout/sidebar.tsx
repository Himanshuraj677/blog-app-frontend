import React from "react";
import { TrendingUp, Users } from "lucide-react";
import { Badge } from "../ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";

export default function Sidebar() {
  const trendingTags = [
    "#web-development (2)",
    "#nextjs (1)",
    "#react (1)",
    "#javascript (1)",
    "#typescript (1)",
    "#api (1)",
    "#backend (1)",
    "#nodejs (1)",
  ];
  const topAuthors = [
    {
      id: 122,
      name: "Himanshu Raj",
      followers: 14,
      profile: "https://testing",
      posts: 4,
    },
    {
      id: 123,
      name: "Devanshu Raj",
      followers: 34,
      profile: "https://testing",
      posts: 4,
    },
    {
      id: 124,
      name: "Abhinav Raj",
      followers: 314,
      profile: "https://testing",
      posts: 42,
    },
  ];
  return (
    <div className="w-80 flex flex-col gap-6">
      {/* Trending tags */}
      <div className="flex flex-col gap-8 border border-slate-800 rounded-md p-4">
        <div className="flex gap-4">
          <TrendingUp />
          <span className="text-xl font-semibold">Trending Tags</span>
        </div>
        <div className="flex flex-row gap-4 flex-wrap">
          {trendingTags.map((tag, id) => (
            <Badge key={id} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
      {/* top Authors */}
      <div className="flex flex-col gap-8 border border-slate-800 rounded-md p-4">
        <div className="flex gap-4">
          <Users />
          <span className="text-xl font-semibold">Top Authors</span>
        </div>
        <div className="flex flex-col gap-4">
          {topAuthors.map((author) => (
            <div key={author.id} className="flex gap-4 items-center">
              <Avatar className="w-10 h-10">
                <AvatarImage src={author.profile} />
                <AvatarFallback>HR</AvatarFallback>
              </Avatar>
              <div className="flex-1 flex flex-col">
                <span>{author.name}</span>
                <div className="text-muted-foreground text-sm flex gap-1 items-center">
                  <span>{author.followers} followers</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    {author.posts} posts
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className=""></div>
    </div>
  );
}
