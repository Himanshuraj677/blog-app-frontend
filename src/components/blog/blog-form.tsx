import { useState } from "react";
import Image from "next/image";
import { Blog, BlogInput } from "@/lib/types";
import React from "react";
import { SimpleEditor } from "../tiptap-templates/simple/simple-editor";
import Link from "next/link";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { handleImageUpload } from "@/utils/handleImageUpload";

interface BlogFormProps {
  blog?: Blog;
  type: "create" | "edit";
  handleSubmit: (data: BlogInput) => void;
  isLoading: boolean;
}

export default function BlogForm({
  blog,
  type,
  handleSubmit,
  isLoading,
}: BlogFormProps) {
  const [title, setTitle] = useState(blog?.title || "");
  const [excerpt, setExcerpt] = useState(blog?.excerpt || "");
  const [tags, setTags] = useState<string[]>(blog?.tags || []);
  const [status, setStatus] = useState(blog?.status || "draft");
  const [featuredImage, setFeaturedImage] = useState(blog?.featuredImage || "");
  const [content, setContent] = useState(
    blog?.content || { type: "doc", content: [] }
  );

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">
        {type === "create" ? "Create" : "Edit"} Blog
      </h1>

      {/* Title */}
      <div>
        <Label className="block font-medium mb-1">Title</Label>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      {/* Excerpt */}
      <div>
        <Label className="block font-medium mb-1">Excerpt</Label>
        <Textarea
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      {/* Tags */}
      <div>
        <Label className="block font-medium mb-1">Tags (comma separated)</Label>
        <Input
          type="text"
          value={tags.join(",")}
          onChange={(e) =>
            setTags(e.target.value.split(",").map((tag) => tag.trim()))
          }
          className="w-full border rounded px-3 py-2"
        />
      </div>

      {/* Featured Image */}
      <div>
        <Label className="block font-medium mb-1">Featured Image URL</Label>
        <Input
          type="file"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              handleImageUpload(file).then((url) => setFeaturedImage(url));
            }
          }}
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
        <Label className="block font-medium mb-1">Status</Label>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-full border rounded px-3 py-2">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="published">Published</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tiptap Editor */}
      <div>
        <Label className="block font-medium mb-1">Content</Label>
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
          href="/"
          className="px-3 py-1 bg-gray-600 rounded hover:bg-gray-800"
        >
          Cancel
        </Link>
        <Button
          onClick={() =>
            handleSubmit({
              title,
              excerpt,
              tags,
              status,
              featuredImage,
              content,
            })
          }
          disabled={isLoading}
          variant="secondary"
        >
          {isLoading ? (
            <div className="flex gap-0.5 items-center">
              <span>Creating...</span>
              <div className="w-2 h-2 animate-spin border-t border-white rounded-full"></div>
            </div>
          ) : type === "create" ? (
            "Create Blog"
          ) : (
            "Save Changes"
          )}
        </Button>
      </div>
    </div>
  );
}
