"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import BlogForm from "@/components/blog/blog-form"
import { BlogInput } from "@/lib/types"
import { HttpMethod, useService } from "@/hooks/useService"
import { toast } from "react-toastify"
import { authClient } from "@/lib/auth-client"
import React from "react"
import NotFoundPage from "@/components/page-not-found/notfound"

interface CreateApiResponse extends Record<string, any> {
  message: string;
}
export default function CreatePostPage() {
  const router = useRouter()
  const { data: session, isPending: loading } = authClient.useSession();
  const createblogApi = `${process.env.NEXT_PUBLIC_BLOG_SERVICE}/create`;
  const {loading: isCreating, error, data, execute} = useService<CreateApiResponse, BlogInput>(createblogApi);

  const [hasCreatePermission, setHasCreatePermission] = useState(false);
  // console.log(hasCreatePermission);
  useEffect(() => {
      if (!session?.user?.id) return;
  
      const checkPermission = async () => {
        try {
          const { data, error } = await authClient.admin.hasPermission({
            userId: session.user.id,
            permission: { blog: ["create"] },
          });
          if (error) {
            console.error("Permission error:", error);
          } else {
            setHasCreatePermission(data?.success || false);
          }
        } catch (err) {
          console.error("Unexpected error:", err);
        }
      };
  
      checkPermission();
    }, [session]);

  useEffect(() => {
  if (!loading) {
    if (!session?.user) {
      router.push("/");
    }
  }
}, [router, session, loading]);

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

  if (!hasCreatePermission) {
    return <NotFoundPage />
  }

  return <BlogForm type="create" handleSubmit={handleSubmit} isLoading={isCreating}/>
}
