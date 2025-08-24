import { Blog } from '@/lib/types';
import React from 'react'
import { SimpleEditor } from '../tiptap-templates/simple/simple-editor';

interface BlogFormProps {
    editable: boolean;
    blog: Blog
}

export default function BlogForm({editable, blog}: BlogFormProps) {
  return (  
    <SimpleEditor content={blog.content} editable={editable} />
  )
}
