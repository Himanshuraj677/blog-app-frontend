export const Mock_blogs = [
  {
    id: "1",
    title: "Getting Started with Next.js 14 and App Router",
    content: {
      type: "doc",
      content: [
        {
          type: "heading",
          attrs: {
            textAlign: null,
            level: 1,
          },
          content: [
            {
              type: "text",
              text: "Getting started",
            },
          ],
        },
        {
          type: "paragraph",
          attrs: {
            textAlign: null,
          },
          content: [
            {
              type: "text",
              text: "Welcome to the ",
            },
            {
              type: "text",
              marks: [
                {
                  type: "italic",
                },
                {
                  type: "highlight",
                  attrs: {
                    color: "var(--tt-color-highlight-yellow)",
                  },
                },
              ],
              text: "Simple Editor",
            },
            {
              type: "text",
              text: " template! This template integrates ",
            },
            {
              type: "text",
              marks: [
                {
                  type: "bold",
                },
              ],
              text: "open source",
            },
            {
              type: "text",
              text: " UI components and Tiptap extensions licensed under ",
            },
            {
              type: "text",
              marks: [
                {
                  type: "bold",
                },
              ],
              text: "MIT",
            },
            {
              type: "text",
              text: ".",
            },
          ],
        },
        {
          type: "paragraph",
          attrs: {
            textAlign: null,
          },
          content: [
            {
              type: "text",
              text: "Integrate it by following the ",
            },
            {
              type: "text",
              marks: [
                {
                  type: "link",
                  attrs: {
                    href: "https://tiptap.dev/docs/ui-components/templates/simple-editor",
                    target: "_blank",
                    rel: "noopener noreferrer nofollow",
                    class: null,
                  },
                },
              ],
              text: "Tiptap UI Components docs",
            },
            {
              type: "text",
              text: " or using our CLI tool.",
            },
          ],
        },
        {
          type: "codeBlock",
          attrs: {
            language: null,
          },
          content: [
            {
              type: "text",
              text: "npx @tiptap/cli init",
            },
          ],
        },
        {
          type: "heading",
          attrs: {
            textAlign: null,
            level: 2,
          },
          content: [
            {
              type: "text",
              text: "Features",
            },
          ],
        },
        {
          type: "blockquote",
          content: [
            {
              type: "paragraph",
              attrs: {
                textAlign: null,
              },
              content: [
                {
                  type: "text",
                  marks: [
                    {
                      type: "italic",
                    },
                  ],
                  text: "A fully responsive rich text editor with built-in support for common formatting and layout tools. Type markdown ",
                },
                {
                  type: "text",
                  marks: [
                    {
                      type: "code",
                    },
                  ],
                  text: "**",
                },
                {
                  type: "text",
                  marks: [
                    {
                      type: "italic",
                    },
                  ],
                  text: " or use keyboard shortcuts ",
                },
                {
                  type: "text",
                  marks: [
                    {
                      type: "code",
                    },
                  ],
                  text: "⌘+B",
                },
                {
                  type: "text",
                  text: " for ",
                },
                {
                  type: "text",
                  marks: [
                    {
                      type: "strike",
                    },
                  ],
                  text: "most",
                },
                {
                  type: "text",
                  text: " all common markdown marks. 🪄",
                },
              ],
            },
          ],
        },
        {
          type: "paragraph",
          attrs: {
            textAlign: "left",
          },
          content: [
            {
              type: "text",
              text: "Add images, customize alignment, and apply ",
            },
            {
              type: "text",
              marks: [
                {
                  type: "highlight",
                  attrs: {
                    color: "var(--tt-color-highlight-blue)",
                  },
                },
              ],
              text: "advanced formatting",
            },
            {
              type: "text",
              text: " to make your writing more engaging and professional.",
            },
          ],
        },
        {
          type: "image",
          attrs: {
            src: "/images/tiptap-ui-placeholder-image.jpg",
            alt: "placeholder-image",
            title: "placeholder-image",
          },
        },
        {
          type: "bulletList",
          content: [
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  attrs: {
                    textAlign: "left",
                  },
                  content: [
                    {
                      type: "text",
                      marks: [
                        {
                          type: "bold",
                        },
                      ],
                      text: "Superscript",
                    },
                    {
                      type: "text",
                      text: " (x",
                    },
                    {
                      type: "text",
                      marks: [
                        {
                          type: "superscript",
                        },
                      ],
                      text: "2",
                    },
                    {
                      type: "text",
                      text: ") and ",
                    },
                    {
                      type: "text",
                      marks: [
                        {
                          type: "bold",
                        },
                      ],
                      text: "Subscript",
                    },
                    {
                      type: "text",
                      text: " (H",
                    },
                    {
                      type: "text",
                      marks: [
                        {
                          type: "subscript",
                        },
                      ],
                      text: "2",
                    },
                    {
                      type: "text",
                      text: "O) for precision.",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  attrs: {
                    textAlign: "left",
                  },
                  content: [
                    {
                      type: "text",
                      marks: [
                        {
                          type: "bold",
                        },
                      ],
                      text: "Typographic conversion",
                    },
                    {
                      type: "text",
                      text: ": automatically convert to ",
                    },
                    {
                      type: "text",
                      marks: [
                        {
                          type: "code",
                        },
                      ],
                      text: "->",
                    },
                    {
                      type: "text",
                      text: " an arrow ",
                    },
                    {
                      type: "text",
                      marks: [
                        {
                          type: "bold",
                        },
                      ],
                      text: "→",
                    },
                    {
                      type: "text",
                      text: ".",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: "paragraph",
          attrs: {
            textAlign: "left",
          },
          content: [
            {
              type: "text",
              marks: [
                {
                  type: "italic",
                },
              ],
              text: "→ ",
            },
            {
              type: "text",
              marks: [
                {
                  type: "link",
                  attrs: {
                    href: "https://tiptap.dev/docs/ui-components/templates/simple-editor#features",
                    target: "_blank",
                    rel: "noopener noreferrer nofollow",
                    class: null,
                  },
                },
              ],
              text: "Learn more",
            },
          ],
        },
        {
          type: "horizontalRule",
        },
        {
          type: "heading",
          attrs: {
            textAlign: "left",
            level: 2,
          },
          content: [
            {
              type: "text",
              text: "Make it your own",
            },
          ],
        },
        {
          type: "paragraph",
          attrs: {
            textAlign: "left",
          },
          content: [
            {
              type: "text",
              text: "Switch between light and dark modes, and tailor the editor's appearance with customizable CSS to match your style.",
            },
          ],
        },
        {
          type: "taskList",
          content: [
            {
              type: "taskItem",
              attrs: {
                checked: true,
              },
              content: [
                {
                  type: "paragraph",
                  attrs: {
                    textAlign: "left",
                  },
                  content: [
                    {
                      type: "text",
                      text: "Test template",
                    },
                  ],
                },
              ],
            },
            {
              type: "taskItem",
              attrs: {
                checked: false,
              },
              content: [
                {
                  type: "paragraph",
                  attrs: {
                    textAlign: "left",
                  },
                  content: [
                    {
                      type: "text",
                      marks: [
                        {
                          type: "link",
                          attrs: {
                            href: "https://tiptap.dev/docs/ui-components/templates/simple-editor",
                            target: "_blank",
                            rel: "noopener noreferrer nofollow",
                            class: null,
                          },
                        },
                      ],
                      text: "Integrate the free template",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: "paragraph",
          attrs: {
            textAlign: "left",
          },
        },
      ],
    },
    excerpt:
      "Explore the latest features in Next.js 14 including App Router improvements and Server Components enhancements.",
    authorId: "3",
    author: "Himanshu Raj",
    tags: ["nextjs", "react", "web-development", "javascript"],
    status: "published",
    featuredImage: "https://images.unsplash.com/photo-1619410283995-43d9134e7656?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0",
    readingTime: 8,
    engagement: {
      likes: 124,
      bookmarks: 45,
      comments: 23,
      views: 1250,
      shares: 18,
    },
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
    publishedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    title: "Building Scalable APIs with TypeScript",
    content: {
      type: "doc",
      content: [
        {
          type: "heading",
          attrs: {
            textAlign: null,
            level: 1,
          },
          content: [
            {
              type: "text",
              text: "Getting started",
            },
          ],
        },
        {
          type: "paragraph",
          attrs: {
            textAlign: null,
          },
          content: [
            {
              type: "text",
              text: "Welcome to the ",
            },
            {
              type: "text",
              marks: [
                {
                  type: "italic",
                },
                {
                  type: "highlight",
                  attrs: {
                    color: "var(--tt-color-highlight-yellow)",
                  },
                },
              ],
              text: "Simple Editor",
            },
            {
              type: "text",
              text: " template! This template integrates ",
            },
            {
              type: "text",
              marks: [
                {
                  type: "bold",
                },
              ],
              text: "open source",
            },
            {
              type: "text",
              text: " UI components and Tiptap extensions licensed under ",
            },
            {
              type: "text",
              marks: [
                {
                  type: "bold",
                },
              ],
              text: "MIT",
            },
            {
              type: "text",
              text: ".",
            },
          ],
        },
        {
          type: "paragraph",
          attrs: {
            textAlign: null,
          },
          content: [
            {
              type: "text",
              text: "Integrate it by following the ",
            },
            {
              type: "text",
              marks: [
                {
                  type: "link",
                  attrs: {
                    href: "https://tiptap.dev/docs/ui-components/templates/simple-editor",
                    target: "_blank",
                    rel: "noopener noreferrer nofollow",
                    class: null,
                  },
                },
              ],
              text: "Tiptap UI Components docs",
            },
            {
              type: "text",
              text: " or using our CLI tool.",
            },
          ],
        },
        {
          type: "codeBlock",
          attrs: {
            language: null,
          },
          content: [
            {
              type: "text",
              text: "npx @tiptap/cli init",
            },
          ],
        },
        {
          type: "heading",
          attrs: {
            textAlign: null,
            level: 2,
          },
          content: [
            {
              type: "text",
              text: "Features",
            },
          ],
        },
        {
          type: "blockquote",
          content: [
            {
              type: "paragraph",
              attrs: {
                textAlign: null,
              },
              content: [
                {
                  type: "text",
                  marks: [
                    {
                      type: "italic",
                    },
                  ],
                  text: "A fully responsive rich text editor with built-in support for common formatting and layout tools. Type markdown ",
                },
                {
                  type: "text",
                  marks: [
                    {
                      type: "code",
                    },
                  ],
                  text: "**",
                },
                {
                  type: "text",
                  marks: [
                    {
                      type: "italic",
                    },
                  ],
                  text: " or use keyboard shortcuts ",
                },
                {
                  type: "text",
                  marks: [
                    {
                      type: "code",
                    },
                  ],
                  text: "⌘+B",
                },
                {
                  type: "text",
                  text: " for ",
                },
                {
                  type: "text",
                  marks: [
                    {
                      type: "strike",
                    },
                  ],
                  text: "most",
                },
                {
                  type: "text",
                  text: " all common markdown marks. 🪄",
                },
              ],
            },
          ],
        },
        {
          type: "paragraph",
          attrs: {
            textAlign: "left",
          },
          content: [
            {
              type: "text",
              text: "Add images, customize alignment, and apply ",
            },
            {
              type: "text",
              marks: [
                {
                  type: "highlight",
                  attrs: {
                    color: "var(--tt-color-highlight-blue)",
                  },
                },
              ],
              text: "advanced formatting",
            },
            {
              type: "text",
              text: " to make your writing more engaging and professional.",
            },
          ],
        },
        {
          type: "image",
          attrs: {
            src: "/images/tiptap-ui-placeholder-image.jpg",
            alt: "placeholder-image",
            title: "placeholder-image",
          },
        },
        {
          type: "bulletList",
          content: [
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  attrs: {
                    textAlign: "left",
                  },
                  content: [
                    {
                      type: "text",
                      marks: [
                        {
                          type: "bold",
                        },
                      ],
                      text: "Superscript",
                    },
                    {
                      type: "text",
                      text: " (x",
                    },
                    {
                      type: "text",
                      marks: [
                        {
                          type: "superscript",
                        },
                      ],
                      text: "2",
                    },
                    {
                      type: "text",
                      text: ") and ",
                    },
                    {
                      type: "text",
                      marks: [
                        {
                          type: "bold",
                        },
                      ],
                      text: "Subscript",
                    },
                    {
                      type: "text",
                      text: " (H",
                    },
                    {
                      type: "text",
                      marks: [
                        {
                          type: "subscript",
                        },
                      ],
                      text: "2",
                    },
                    {
                      type: "text",
                      text: "O) for precision.",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  attrs: {
                    textAlign: "left",
                  },
                  content: [
                    {
                      type: "text",
                      marks: [
                        {
                          type: "bold",
                        },
                      ],
                      text: "Typographic conversion",
                    },
                    {
                      type: "text",
                      text: ": automatically convert to ",
                    },
                    {
                      type: "text",
                      marks: [
                        {
                          type: "code",
                        },
                      ],
                      text: "->",
                    },
                    {
                      type: "text",
                      text: " an arrow ",
                    },
                    {
                      type: "text",
                      marks: [
                        {
                          type: "bold",
                        },
                      ],
                      text: "→",
                    },
                    {
                      type: "text",
                      text: ".",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: "paragraph",
          attrs: {
            textAlign: "left",
          },
          content: [
            {
              type: "text",
              marks: [
                {
                  type: "italic",
                },
              ],
              text: "→ ",
            },
            {
              type: "text",
              marks: [
                {
                  type: "link",
                  attrs: {
                    href: "https://tiptap.dev/docs/ui-components/templates/simple-editor#features",
                    target: "_blank",
                    rel: "noopener noreferrer nofollow",
                    class: null,
                  },
                },
              ],
              text: "Learn more",
            },
          ],
        },
        {
          type: "horizontalRule",
        },
        {
          type: "heading",
          attrs: {
            textAlign: "left",
            level: 2,
          },
          content: [
            {
              type: "text",
              text: "Make it your own",
            },
          ],
        },
        {
          type: "paragraph",
          attrs: {
            textAlign: "left",
          },
          content: [
            {
              type: "text",
              text: "Switch between light and dark modes, and tailor the editor's appearance with customizable CSS to match your style.",
            },
          ],
        },
        {
          type: "taskList",
          content: [
            {
              type: "taskItem",
              attrs: {
                checked: true,
              },
              content: [
                {
                  type: "paragraph",
                  attrs: {
                    textAlign: "left",
                  },
                  content: [
                    {
                      type: "text",
                      text: "Test template",
                    },
                  ],
                },
              ],
            },
            {
              type: "taskItem",
              attrs: {
                checked: false,
              },
              content: [
                {
                  type: "paragraph",
                  attrs: {
                    textAlign: "left",
                  },
                  content: [
                    {
                      type: "text",
                      marks: [
                        {
                          type: "link",
                          attrs: {
                            href: "https://tiptap.dev/docs/ui-components/templates/simple-editor",
                            target: "_blank",
                            rel: "noopener noreferrer nofollow",
                            class: null,
                          },
                        },
                      ],
                      text: "Integrate the free template",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: "paragraph",
          attrs: {
            textAlign: "left",
          },
        },
      ],
    },
    excerpt:
      "Learn how to build robust, type-safe APIs using TypeScript with proper error handling and scalable architecture patterns.",
    authorId: "2",
    author: "Devanshu Raj",
    tags: ["typescript", "api", "backend", "nodejs"],
    status: "published",
    featuredImage: "https://images.unsplash.com/photo-1619410283995-43d9134e7656?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0",
    readingTime: 12,
    engagement: {
      likes: 89,
      bookmarks: 67,
      comments: 15,
      views: 890,
      shares: 12,
    },
    createdAt: "2024-01-12T14:30:00Z",
    updatedAt: "2024-01-12T14:30:00Z",
    publishedAt: "2024-01-12T14:30:00Z",
  },
  {
    id: "3",
    title: "The Future of Web Development",
    content: {
      type: "doc",
      content: [
        {
          type: "heading",
          attrs: {
            textAlign: null,
            level: 1,
          },
          content: [
            {
              type: "text",
              text: "Getting started",
            },
          ],
        },
        {
          type: "paragraph",
          attrs: {
            textAlign: null,
          },
          content: [
            {
              type: "text",
              text: "Welcome to the ",
            },
            {
              type: "text",
              marks: [
                {
                  type: "italic",
                },
                {
                  type: "highlight",
                  attrs: {
                    color: "var(--tt-color-highlight-yellow)",
                  },
                },
              ],
              text: "Simple Editor",
            },
            {
              type: "text",
              text: " template! This template integrates ",
            },
            {
              type: "text",
              marks: [
                {
                  type: "bold",
                },
              ],
              text: "open source",
            },
            {
              type: "text",
              text: " UI components and Tiptap extensions licensed under ",
            },
            {
              type: "text",
              marks: [
                {
                  type: "bold",
                },
              ],
              text: "MIT",
            },
            {
              type: "text",
              text: ".",
            },
          ],
        },
        {
          type: "paragraph",
          attrs: {
            textAlign: null,
          },
          content: [
            {
              type: "text",
              text: "Integrate it by following the ",
            },
            {
              type: "text",
              marks: [
                {
                  type: "link",
                  attrs: {
                    href: "https://tiptap.dev/docs/ui-components/templates/simple-editor",
                    target: "_blank",
                    rel: "noopener noreferrer nofollow",
                    class: null,
                  },
                },
              ],
              text: "Tiptap UI Components docs",
            },
            {
              type: "text",
              text: " or using our CLI tool.",
            },
          ],
        },
        {
          type: "codeBlock",
          attrs: {
            language: null,
          },
          content: [
            {
              type: "text",
              text: "npx @tiptap/cli init",
            },
          ],
        },
        {
          type: "heading",
          attrs: {
            textAlign: null,
            level: 2,
          },
          content: [
            {
              type: "text",
              text: "Features",
            },
          ],
        },
        {
          type: "blockquote",
          content: [
            {
              type: "paragraph",
              attrs: {
                textAlign: null,
              },
              content: [
                {
                  type: "text",
                  marks: [
                    {
                      type: "italic",
                    },
                  ],
                  text: "A fully responsive rich text editor with built-in support for common formatting and layout tools. Type markdown ",
                },
                {
                  type: "text",
                  marks: [
                    {
                      type: "code",
                    },
                  ],
                  text: "**",
                },
                {
                  type: "text",
                  marks: [
                    {
                      type: "italic",
                    },
                  ],
                  text: " or use keyboard shortcuts ",
                },
                {
                  type: "text",
                  marks: [
                    {
                      type: "code",
                    },
                  ],
                  text: "⌘+B",
                },
                {
                  type: "text",
                  text: " for ",
                },
                {
                  type: "text",
                  marks: [
                    {
                      type: "strike",
                    },
                  ],
                  text: "most",
                },
                {
                  type: "text",
                  text: " all common markdown marks. 🪄",
                },
              ],
            },
          ],
        },
        {
          type: "paragraph",
          attrs: {
            textAlign: "left",
          },
          content: [
            {
              type: "text",
              text: "Add images, customize alignment, and apply ",
            },
            {
              type: "text",
              marks: [
                {
                  type: "highlight",
                  attrs: {
                    color: "var(--tt-color-highlight-blue)",
                  },
                },
              ],
              text: "advanced formatting",
            },
            {
              type: "text",
              text: " to make your writing more engaging and professional.",
            },
          ],
        },
        {
          type: "image",
          attrs: {
            src: "/images/tiptap-ui-placeholder-image.jpg",
            alt: "placeholder-image",
            title: "placeholder-image",
          },
        },
        {
          type: "bulletList",
          content: [
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  attrs: {
                    textAlign: "left",
                  },
                  content: [
                    {
                      type: "text",
                      marks: [
                        {
                          type: "bold",
                        },
                      ],
                      text: "Superscript",
                    },
                    {
                      type: "text",
                      text: " (x",
                    },
                    {
                      type: "text",
                      marks: [
                        {
                          type: "superscript",
                        },
                      ],
                      text: "2",
                    },
                    {
                      type: "text",
                      text: ") and ",
                    },
                    {
                      type: "text",
                      marks: [
                        {
                          type: "bold",
                        },
                      ],
                      text: "Subscript",
                    },
                    {
                      type: "text",
                      text: " (H",
                    },
                    {
                      type: "text",
                      marks: [
                        {
                          type: "subscript",
                        },
                      ],
                      text: "2",
                    },
                    {
                      type: "text",
                      text: "O) for precision.",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  attrs: {
                    textAlign: "left",
                  },
                  content: [
                    {
                      type: "text",
                      marks: [
                        {
                          type: "bold",
                        },
                      ],
                      text: "Typographic conversion",
                    },
                    {
                      type: "text",
                      text: ": automatically convert to ",
                    },
                    {
                      type: "text",
                      marks: [
                        {
                          type: "code",
                        },
                      ],
                      text: "->",
                    },
                    {
                      type: "text",
                      text: " an arrow ",
                    },
                    {
                      type: "text",
                      marks: [
                        {
                          type: "bold",
                        },
                      ],
                      text: "→",
                    },
                    {
                      type: "text",
                      text: ".",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: "paragraph",
          attrs: {
            textAlign: "left",
          },
          content: [
            {
              type: "text",
              marks: [
                {
                  type: "italic",
                },
              ],
              text: "→ ",
            },
            {
              type: "text",
              marks: [
                {
                  type: "link",
                  attrs: {
                    href: "https://tiptap.dev/docs/ui-components/templates/simple-editor#features",
                    target: "_blank",
                    rel: "noopener noreferrer nofollow",
                    class: null,
                  },
                },
              ],
              text: "Learn more",
            },
          ],
        },
        {
          type: "horizontalRule",
        },
        {
          type: "heading",
          attrs: {
            textAlign: "left",
            level: 2,
          },
          content: [
            {
              type: "text",
              text: "Make it your own",
            },
          ],
        },
        {
          type: "paragraph",
          attrs: {
            textAlign: "left",
          },
          content: [
            {
              type: "text",
              text: "Switch between light and dark modes, and tailor the editor's appearance with customizable CSS to match your style.",
            },
          ],
        },
        {
          type: "taskList",
          content: [
            {
              type: "taskItem",
              attrs: {
                checked: true,
              },
              content: [
                {
                  type: "paragraph",
                  attrs: {
                    textAlign: "left",
                  },
                  content: [
                    {
                      type: "text",
                      text: "Test template",
                    },
                  ],
                },
              ],
            },
            {
              type: "taskItem",
              attrs: {
                checked: false,
              },
              content: [
                {
                  type: "paragraph",
                  attrs: {
                    textAlign: "left",
                  },
                  content: [
                    {
                      type: "text",
                      marks: [
                        {
                          type: "link",
                          attrs: {
                            href: "https://tiptap.dev/docs/ui-components/templates/simple-editor",
                            target: "_blank",
                            rel: "noopener noreferrer nofollow",
                            class: null,
                          },
                        },
                      ],
                      text: "Integrate the free template",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: "paragraph",
          attrs: {
            textAlign: "left",
          },
        },
      ],
    },
    excerpt:
      "Explore the emerging trends and technologies that will define the future of web development in the coming years.",
    authorId: "1",
    author: "Abhinav Kumar",
    tags: ["web-development", "future-tech", "trends", "innovation"],
    status: "published",
    featuredImage: "https://images.unsplash.com/photo-1619410283995-43d9134e7656?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0",
    readingTime: 6,
    engagement: {
      likes: 156,
      bookmarks: 89,
      comments: 34,
      views: 1890,
      shares: 28,
    },
    createdAt: "2024-01-10T09:15:00Z",
    updatedAt: "2024-01-10T09:15:00Z",
    publishedAt: "2024-01-10T09:15:00Z",
  },
];
