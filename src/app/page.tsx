"use client"
import Navbar from "@/components/layout/navbar";
import Sidebar from "@/components/layout/sidebar";
import { MOCK_POSTS } from "@/lib/mock-data";
import { Skeleton } from "@/components/ui/skeleton"
import BlogCard from "@/components/blog/blogCard";

export default function Home() {
  return (
    <div className="w-full">
      <Navbar />
      <div className="container mx-auto flex flex-row px-4 py-8 gap-8 max-w-full">
        <main className="flex-1">
          {/* <div className="mb-4">
            <h1 className="text-4xl font-bold mb-2">Latest Posts</h1>
            <p className="text-md text-muted-foreground">Discover the latest articles from the community</p>
          </div> */}
          <div className="flex flex-col gap-8 w-full">
            {
              MOCK_POSTS.map((blog, id) => (
                <BlogCard key={id} blog={blog} />
              ))
            }
          </div>
        </main>
        {/* <aside className="hidden lg:block">
          <Sidebar />
        </aside> */}
      </div>
    </div>
  );
}
