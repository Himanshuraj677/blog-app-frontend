"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Mock_blogs } from "@/lib/mock-data";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import Link from "next/link";
import Image from "next/image";

export default function EditBlog() {
  const { id } = useParams();
  const router = useRouter();
  const blog = Mock_blogs.find((b) => b.id === id);

  // Local states
  const [title, setTitle] = useState(blog?.title || "");
  const [excerpt, setExcerpt] = useState(blog?.excerpt || "");
  const [tags, setTags] = useState(blog?.tags?.join(", ") || "");
  const [status, setStatus] = useState(blog?.status || "draft");
  const [featuredImage, setFeaturedImage] = useState(blog?.featuredImage || "");
  const [content, setContent] = useState(blog?.content || { type: "doc", content: [] });

  const handleSave = () => {
    const updatedIndex = Mock_blogs.findIndex((blog) => blog.id === id);
    if (updatedIndex !== -1) {
      Mock_blogs[updatedIndex] = {...Mock_blogs[updatedIndex], title,
      excerpt,
      tags: tags.split(",").map((t) => t.trim()),
      status,
      featuredImage,
      content, // ✅ now comes from SimpleEditor
      updatedAt: new Date().toISOString(),};
    }

    console.log("Updated Blog:", Mock_blogs[updatedIndex]);
    alert("Blog saved (check console)");
    router.push("/");
  };

  if (!blog) return <div>Blog not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Edit Blog</h1>

      {/* Title */}
      <div>
        <label className="block font-medium mb-1">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      {/* Excerpt */}
      <div>
        <label className="block font-medium mb-1">Excerpt</label>
        <textarea
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      {/* Tags */}
      <div>
        <label className="block font-medium mb-1">Tags (comma separated)</label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      {/* Featured Image */}
      <div>
        <label className="block font-medium mb-1">Featured Image URL</label>
        <input
          type="text"
          value={featuredImage}
          onChange={(e) => setFeaturedImage(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
        {featuredImage && (
          <Image
            src={featuredImage}
            alt="Featured"
            width={800}
            height={400}
            className="mt-2 h-48 w-full object-cover rounded"
          />
        )}
      </div>

      {/* Status */}
      <div>
        <label className="block font-medium mb-1">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full border rounded px-3 py-2"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      {/* Tiptap Editor */}
      <div>
        <label className="block font-medium mb-1">Content</label>
        <div className="border rounded p-2 min-h-[300px]">
          <SimpleEditor
            content={content}
            editable={true}
            onChange={(json) => setContent(json)} // ✅ capture editor state
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between">
        <Link
          href="/blogs"
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Cancel
        </Link>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
