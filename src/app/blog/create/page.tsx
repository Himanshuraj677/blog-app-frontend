"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import BlogForm from "@/components/blog/blog-form"
import { useAuth } from "@/context/AuthContext"
import { BlogInput } from "@/lib/types"
import { HttpMethod, useService } from "@/hooks/useService"
import { toast } from "react-toastify"

interface CreateApiResponse extends Record<string, any> {
  message: string;
}
export default function CreatePostPage() {
  const router = useRouter()
  const {user, loading} = useAuth();
  const createblogApi = `${process.env.NEXT_PUBLIC_BLOG_SERVICE}/create`;
  const {loading: isCreating, error, data, execute} = useService<CreateApiResponse, BlogInput>(createblogApi);

  useEffect(() => {
  if (!loading) {
    if (!user) {
      router.push("/");
    }
  }
}, [router, user, loading]);

  const handleSubmit = async (blog: BlogInput) => {
    console.log(blog);
    const payload = {
      method: 'POST' as HttpMethod,
      body: blog,
    } 
    await execute(payload);
  }

  useEffect(() => {
    if (data) {
      toast.success("Blog created successfully");
      router.push(`/blog/${data.data.id}`)
    }

    if (error) {
      toast.error(error.message || "Unable to create a blog")
    }
  }, [data, error]);
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

  return <BlogForm type="create" handleSubmit={handleSubmit} isLoading={isCreating}/>
}
