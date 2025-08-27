"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import BlogForm from "@/components/blog/blog-form"
import { useAuth } from "@/context/AuthContext"
import { BlogInput } from "@/lib/types"
export default function CreatePostPage() {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const {user} = useAuth();

  useEffect(() => {
    if (!user) {
      router.push("/")
      return
    }
    setIsLoading(false)
  }, [router, user])

  const handleSubmit = (blog: BlogInput) => {
    console.log(blog);
  }
  if (isLoading) {
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
