"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import BlogForm from "@/components/blog/blog-form"
import { useAuth } from "@/context/AuthContext"
import { BlogInput } from "@/lib/types"
export default function CreatePostPage() {
  const router = useRouter()
  const {user, loading} = useAuth();

  useEffect(() => {
  if (!loading) {
    if (!user) {
      router.push("/");
    }
  }
}, [router, user, loading]);

  const handleSubmit = async (blog: BlogInput) => {
    console.log(blog);
    const createblogApi = `${process.env.NEXT_PUBLIC_BLOG_SERVICE}/create`;
    const res = await fetch(createblogApi, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(blog),
    })
    const response = await res.json();
    console.log(response);
  }
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return <BlogForm type="create" handleSubmit={handleSubmit} />
}
