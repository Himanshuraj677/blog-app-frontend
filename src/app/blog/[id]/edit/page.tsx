"use client";

import { useRouter, useParams } from "next/navigation";
import { Mock_blogs } from "@/lib/mock-data";
import BlogForm from "@/components/blog/blog-form";
import { BlogInput } from "@/lib/types";

export default function EditBlog() {
  const { id } = useParams();
  const router = useRouter();
  const blog = Mock_blogs.find((b) => b.id === id);

  const handleSave = (blog: BlogInput) => {
    console.log("Updated Blog:", blog);
    alert("Blog saved (check console)");
    router.push("/");
  };

  if (!blog) return <div>Blog not found</div>;

  return (
    <BlogForm blog={blog} type="edit" handleSubmit={handleSave}/>
  );
}
