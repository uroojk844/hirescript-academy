---
title: Dynamic Routes Parameters
description: Learn how to handle dynamic route parameters in Next.js, fetch data for dynamic routes, and generate static paths for static site generation.
navigation:
  order: 5
---

# Dynamic Routes Parameters

Welcome to the Dynamic Routes Parameters lesson in our **Next.js Tutorial - 20 Modules** series! In this tutorial, you’ll learn how to handle **dynamic route parameters** in Next.js using the **App Router**, including fetching data for dynamic routes and generating static paths for static site generation (SSG). This lesson builds on concepts from **Pages and Navigation** and **File-based Routing System**, focusing on creating flexible, data-driven routes for your application.

In this tutorial, you’ll learn:

- Creating dynamic routes with parameters
- Accessing route parameters in pages
- Fetching data for dynamic routes
- Generating static paths with `generateStaticParams`
- Handling catch-all and optional catch-all routes
- Best practices for dynamic routing

## What are Dynamic Route Parameters?

Dynamic routes allow you to create pages with variable URL segments, such as `/blog/123` or `/products/shirt`. In Next.js’s App Router, dynamic routes are defined using square brackets (e.g., `[id]`) in the file structure. Parameters are accessible in your page component via the `params` prop, and you can pre-render these routes for static site generation using `generateStaticParams`.

**Key Concepts**:
- **Dynamic Segment**: A URL segment defined with `[param]` (e.g., `app/blog/[id]/page.tsx` for `/blog/123`).
- **Catch-All Routes**: Handle multiple segments with `[...slug]` (e.g., `/blog/a/b/c`).
- **Optional Catch-All Routes**: Use `[[...slug]]` for optional segments.
- **Static Generation**: Pre-render dynamic routes at build time with `generateStaticParams`.

## Setting Up the Project

Use the Next.js project from the **Pages and Navigation** lesson, configured with TypeScript, Tailwind CSS, and the App Router.

**Project Structure**:

```
my-next-app/
├── node_modules/
├── public/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── about/
│   │   │   ├── page.tsx
│   │   ├── contact/
│   │   │   ├── page.tsx
│   │   ├── blog/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── posts/
│   │   │   │   ├── page.tsx
│   │   │   ├── [id]/
│   │   │   │   ├── page.tsx
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   │   ├── page.tsx
│   │   │   ├── signup/
│   │   │   │   ├── page.tsx
│   ├── components/
│   │   ├── NavBar.tsx
│   ├── styles/
│   │   ├── globals.css
├── .eslintrc.json
├── .gitignore
├── next.config.js
├── package.json
├── tsconfig.json
├── tailwind.config.js
```

Start the development server:
```bash
cd my-next-app
npm run dev
```

**Test URL**: `http://localhost:3000`

## Creating Dynamic Routes

Dynamic routes are created by adding a folder with square brackets, like `[id]`, in the `app/` directory.

### Step 1: Enhance the Blog Post Route
Update the blog post page to fetch mock data based on the `id` parameter.

::Editor
#title
src/app/blog/[id]/page.tsx

#default

```tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

// Mock data for blog posts
const posts = [
  { id: '1', title: 'First Post', content: 'This is my first blog post.' },
  { id: '2', title: 'Second Post', content: 'Exploring Next.js features.' },
];

interface Params {
  params: { id: string };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const post = posts.find((p) => p.id === params.id);
  if (!post) {
    return { title: 'Post Not Found' };
  }
  return {
    title: post.title,
    description: `Content for ${post.title}`,
  };
}

export default function BlogPost({ params }: Params) {
  const post = posts.find((p) => p.id === params.id);

  if (!post) {
    notFound(); // Triggers 404 page
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-blue-700">{post.title}</h1>
      <p className="mt-4 text-lg text-gray-700">{post.content}</p>
    </main>
  );
}
```

::

**Test URLs**:
- `http://localhost:3000/blog/1` → Displays “First Post”
- `http://localhost:3000/blog/3` → Triggers 404 page

**Explanation**:
- `[id]` captures the dynamic `id` parameter from the URL.
- The `params` prop provides access to `id`.
- `notFound()` renders the custom 404 page if the post doesn’t exist.
- `generateMetadata` sets dynamic metadata for SEO.

### Step 2: Generate Static Paths
For static site generation (SSG), define valid dynamic routes using `generateStaticParams`.

::Editor
#title
src/app/blog/[id]/page.tsx (updated)

#default

```tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

// Mock data for blog posts
const posts = [
  { id: '1', title: 'First Post', content: 'This is my first blog post.' },
  { id: '2', title: 'Second Post', content: 'Exploring Next.js features.' },
];

interface Params {
  params: { id: string };
}

export async function generateStaticParams() {
  return posts.map((post) => ({
    id: post.id,
  }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const post = posts.find((p) => p.id === params.id);
  if (!post) {
    return { title: 'Post Not Found' };
  }
  return {
    title: post.title,
    description: `Content for ${post.title}`,
  };
}

export default function BlogPost({ params }: Params) {
  const post = posts.find((p) => p.id === params.id);

  if (!post) {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-blue-700">{post.title}</h1>
      <p className="mt-4 text-lg text-gray-700">{post.content}</p>
    </main>
  );
}
```

::

**Explanation**:
- `generateStaticParams` returns an array of objects specifying valid `id` values.
- At build time, Next.js pre-renders `/blog/1` and `/blog/2`.
- Dynamic routes not listed will render dynamically or trigger a 404.

## Fetching Data for Dynamic Routes

Fetch data from an external API (mocked here) for dynamic routes.

### Step 1: Update the Blog Posts Page
Display a list of posts linking to dynamic routes.

::Editor
#title
src/app/blog/posts/page.tsx

#default

```tsx
import Link from 'next/link';

// Mock data
const posts = [
  { id: '1', title: 'First Post', excerpt: 'This is my first blog post.' },
  { id: '2', title: 'Second Post', excerpt: 'Exploring Next.js features.' },
];

export default function Posts() {
  return (
    <main className="flex min-h-screen flex-col items-center p-6">
      <h1 className="text-4xl font-bold text-blue-700">Blog Posts</h1>
      <ul className="mt-4 space-y-4 max-w-2xl w-full">
        {posts.map((post) => (
          <li key={post.id} className="border p-4 rounded">
            <Link href={`/blog/${post.id}`} className="text-blue-500 hover:underline">
              <h2 className="text-xl font-semibold">{post.title}</h2>
            </Link>
            <p className="text-gray-700">{post.excerpt}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
```

::

**Test URL**: `http://localhost:3000/blog/posts`

### Step 2: Simulate API Data Fetching
Use a mock API function to fetch post data.

::Editor
#title
src/app/blog/[id]/page.tsx (updated)

#default

```tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

// Mock API function
async function fetchPost(id: string) {
  const posts = [
    { id: '1', title: 'First Post', content: 'This is my first blog post.' },
    { id: '2', title: 'Second Post', content: 'Exploring Next.js features.' },
  ];
  return posts.find((p) => p.id === id) || null;
}

interface Params {
  params: { id: string };
}

export async function generateStaticParams() {
  const posts = [
    { id: '1' },
    { id: '2' },
  ];
  return posts.map((post) => ({ id: post.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const post = await fetchPost(params.id);
  if (!post) {
    return { title: 'Post Not Found' };
  }
  return {
    title: post.title,
    description: `Content for ${post.title}`,
  };
}

export default async function BlogPost({ params }: Params) {
  const post = await fetchPost(params.id);

  if (!post) {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-blue-700">{post.title}</h1>
      <p className="mt-4 text-lg text-gray-700">{post.content}</p>
    </main>
  );
}
```

::

**Explanation**:
- `fetchPost` simulates an async API call.
- The page is a server component, allowing async data fetching.
- `generateStaticParams` ensures static generation for known IDs.

## Catch-All and Optional Catch-All Routes

Handle multiple or optional URL segments.

### Step 1: Create a Catch-All Route
Add a catch-all route for `/blog/*`.

::Editor
#title
src/app/blog/[...slug]/page.tsx

#default

```tsx
interface Params {
  params: { slug: string[] };
}

export default function CatchAll({ params }: Params) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-blue-700">Catch-All Route</h1>
      <p className="mt-4 text-lg text-gray-700">
        Slug: {params.slug.join('/')}
      </p>
    </main>
  );
}
```

::

**Test URLs**:
- `http://localhost:3000/blog/a/b/c` → Displays `Slug: a/b/c`
- `http://localhost:3000/blog/test` → Displays `Slug: test`

### Step 2: Create an Optional Catch-All Route
Add an optional catch-all route for `/docs/*`.

::Editor
#title
src/app/docs/[[...slug]]/page.tsx

#default

```tsx
interface Params {
  params: { slug?: string[] };
}

export default function Docs({ params }: Params) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-blue-700">Documentation</h1>
      <p className="mt-4 text-lg text-gray-700">
        Slug: {params.slug ? params.slug.join('/') : 'No slug provided'}
      </p>
    </main>
  );
}
```

::

**Test URLs**:
- `http://localhost:3000/docs` → Displays `Slug: No slug provided`
- `http://localhost:3000/docs/guide/install` → Displays `Slug: guide/install`

## Real-World Mini-Project: Dynamic Portfolio Blog

Enhance the portfolio with a dynamic blog section.

::Editor
#title
src/app/blog/posts/page.tsx (updated)

#default

```tsx
import Link from 'next/link';

// Mock API function
async function fetchPosts() {
  return [
    { id: '1', title: 'First Post', excerpt: 'This is my first blog post.' },
    { id: '2', title: 'Second Post', excerpt: 'Exploring Next.js features.' },
  ];
}

export default async function Posts() {
  const posts = await fetchPosts();

  return (
    <main className="flex min-h-screen flex-col items-center p-6">
      <h1 className="text-4xl font-bold text-blue-700">Blog Posts</h1>
      <ul className="mt-4 space-y-4 max-w-2xl w-full">
        {posts.map((post) => (
          <li key={post.id} className="border p-4 rounded">
            <Link href={`/blog/${post.id}`} className="text-blue-500 hover:underline">
              <h2 className="text-xl font-semibold">{post.title}</h2>
            </Link>
            <p className="text-gray-700">{post.excerpt}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
```

::

**Updated Project Structure**:

```
my-next-app/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── about/
│   │   │   ├── page.tsx
│   │   ├── contact/
│   │   │   ├── page.tsx
│   │   ├── blog/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── posts/
│   │   │   │   ├── page.tsx
│   │   │   ├── [id]/
│   │   │   │   ├── page.tsx
│   │   │   ├── [...slug]/
│   │   │   │   ├── page.tsx
│   │   ├── docs/
│   │   │   ├── [[...slug]]/
│   │   │   │   ├── page.tsx
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   │   ├── page.tsx
│   │   │   ├── signup/
│   │   │   │   ├── page.tsx
│   ├── components/
│   │   ├── NavBar.tsx
│   ├── styles/
│   │   ├── globals.css
```

**Test URLs**:
- `http://localhost:3000/blog/posts` → Lists blog posts
- `http://localhost:3000/blog/1` → Displays “First Post”
- `http://localhost:3000/docs/guide/install` → Displays documentation page

## Best Practices

### Dynamic Routes
- Use meaningful parameter names (e.g., `[id]`, `[slug]`).
- Validate parameters and handle missing data with `notFound()`.
- Use `generateStaticParams` for static generation of known routes.

### Data Fetching
- Fetch data in server components for SSG or SSR.
- Handle errors gracefully with fallback UI or 404 pages.
- Cache API responses where possible (covered in later modules).

### Organization
- Group related dynamic routes in folders (e.g., `app/blog/[id]`).
- Use catch-all routes for flexible URL structures.

## Common Patterns

### Dynamic Route with Fallback
Handle dynamic routes dynamically if `generateStaticParams` doesn’t cover all cases:

::Editor
#title
src/app/blog/[id]/page.tsx (snippet)

#default

```tsx
export const dynamicParams = true; // Allow dynamic rendering for unlisted IDs
```

::

### Client-Side Data Fetching
For client-side data fetching, use `useEffect` (requires `'use client'`):

::Editor
#title
src/app/blog/[id]/client-page.tsx

#default

```tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function ClientBlogPost() {
  const params = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    async function fetchPost() {
      const posts = [
        { id: '1', title: 'First Post', content: 'This is my first blog post.' },
        { id: '2', title: 'Second Post', content: 'Exploring Next.js features.' },
      ];
      const data = posts.find((p) => p.id === params.id);
      setPost(data || null);
    }
    fetchPost();
  }, [params.id]);

  if (!post) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-6">
        <h1 className="text-4xl font-bold text-red-700">Post Not Found</h1>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-blue-700">{post.title}</h1>
      <p className="mt-4 text-lg text-gray-700">{post.content}</p>
    </main>
  );
}
```

::

**Test URL**: `http://localhost:3000/blog/1/client-page`

## What’s Next?

In the next tutorial, **Layouts and Templates**, you’ll learn how to create reusable layouts and templates to maintain consistent UI across routes and enhance your application’s structure.

### Key Takeaways:
- Create dynamic routes with `[param]` syntax
- Access parameters via the `params` prop
- Fetch data for dynamic routes in server components
- Use `generateStaticParams` for static site generation
- Implement catch-all and optional catch-all routes
- Follow best practices for dynamic routing

## Practice Exercise
1. Add a dynamic route for `/products/[id]` with mock data.
2. Implement `generateStaticParams` for static generation of product pages.
3. Create a catch-all route for `/categories/[...slug]`.
4. Add a list page (e.g., `/products`) linking to dynamic routes.
5. Test all routes and handle invalid parameters with a 404 page.