"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import BlogForm from "@/components/blog/blog-form";
import { Blog, BlogInput } from "@/lib/types";
import { HttpMethod, useService } from "@/hooks/useService";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import NotFoundPage from "@/components/page-not-found/notfound";

interface BlogApiResponseType extends Record<string, any> {
  data: Blog;
}

export default function EditBlog() {
  const { id: blogId } = useParams();
  const {data: session, isPending} = authClient.useSession();
  const router = useRouter();
  const [hasEditPermission, setHasEditPermission] = useState(false);

  const fetchBlogApi = `${process.env.NEXT_PUBLIC_BLOG_SERVICE}/${blogId}`;
  const upadteBlogApi = `${process.env.NEXT_PUBLIC_BLOG_SERVICE}/${blogId}`;

  const {
    loading,
    execute: fetchBlog,
    data: apiData,
    error: fetchError,
  } = useService<BlogApiResponseType>(fetchBlogApi);

  const {
    loading: loadingUpdate,
    execute: updateBlog,
    data,
    error: updateError,
  } = useService<BlogApiResponseType, BlogInput>(upadteBlogApi);

  const blog = apiData?.data;
  useEffect(() => {
    fetchBlog();
  }, []);

  useEffect(() => {
    if (!session?.user.id) return;
    const checkPermission = async () => {
      const {data, error} = await authClient.admin.hasPermission({
        userId: session?.user.id,
        permission: {blog: ["update"]}
      })
      if (error) {
        console.error("Permission error:", error);
      }
      else {
        setHasEditPermission(data?.success || false);
      }
    }
    checkPermission();
  }, [session])

  useEffect(() => {
    if (data) {
      toast.success("Blog updated successfully!");
      router.push(`/blog/${blogId}`);
    }
  }, [data, blogId, router]);

  const handleSave = async (blog: BlogInput) => {
    const override = {
      method: "PUT" as HttpMethod,
      body: blog,
    };
    await updateBlog(override);
  };

  useEffect(() => {
    if (updateError) {
      toast.error(updateError.message);
    }
  }, [updateError]);

  if (fetchError) {
    return (
      <div className="min-h-screen flex-col flex justify-center items-center">
        <p className="font-bold text-3xl">No blog found....</p>
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

  if (!hasEditPermission && blog.authorId !== session?.user?.id) {
    return <NotFoundPage />
  }

  return <BlogForm blog={blog} type="edit" handleSubmit={handleSave} isLoading={loadingUpdate}/>;
}
