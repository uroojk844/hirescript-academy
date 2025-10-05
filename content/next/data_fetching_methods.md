---
title: Data Fetching Methods
description: Learn how to fetch data in Next.js using Server Components, getStaticProps, getServerSideProps, and client-side fetching for dynamic and static content.
navigation:
  order: 8
---

# Data Fetching Methods

Welcome to the Data Fetching Methods lesson in our **Next.js Tutorial - 20 Modules** series! In this tutorial, you’ll learn how to fetch data in **Next.js** using various methods, including **Server Components** (App Router), **client-side fetching**, and legacy **Pages Router** methods like `getStaticProps` and `getServerSideProps**. This lesson builds on concepts from **Server and Client Components** and **Dynamic Routes Parameters**, focusing on fetching data efficiently for static and dynamic content.

In this tutorial, you’ll learn:

- Data fetching with Server Components in the App Router
- Using `getStaticProps` and `getServerSideProps` in the Pages Router
- Client-side data fetching with `useEffect`
- Combining fetching methods for hybrid applications
- Handling loading states and errors
- Best practices for data fetching

## Data Fetching in Next.js

Next.js provides multiple data fetching methods to suit different use cases:

- **Server Components (App Router)**: Fetch data server-side during rendering, ideal for static site generation (SSG) or server-side rendering (SSR).
- **getStaticProps (Pages Router)**: Fetch data at build time for SSG.
- **getServerSideProps (Pages Router)**: Fetch data on each request for SSR.
- **Client-Side Fetching**: Fetch data in the browser using `useEffect` or libraries like SWR or React Query.
- **Incremental Static Regeneration (ISR)**: Combine SSG with periodic revalidation.

**Use Cases**:
- **Server Components**: SEO-friendly pages, static content, or server-side data fetching.
- **getStaticProps**: Static sites like blogs or documentation.
- **getServerSideProps**: Dynamic, user-specific data like dashboards.
- **Client-Side Fetching**: Real-time data or user interactions.

## Setting Up the Project

Use the Next.js project from the **Server and Client Components** lesson, configured with TypeScript, Tailwind CSS, and the App Router. We’ll also add a `pages/` directory for Pages Router examples.

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
│   │   │   ├── BlogClient.tsx
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
│   │   │   ├── template.tsx
│   │   │   ├── login/
│   │   │   │   ├── page.tsx
│   │   │   ├── signup/
│   │   │   │   ├── page.tsx
│   ├── components/
│   │   ├── NavBar.tsx
│   │   ├── SearchBar.tsx
│   ├── styles/
│   │   ├── globals.css
├── pages/  # Added for Pages Router examples
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

## Data Fetching with Server Components (App Router)

Server Components in the App Router allow async data fetching directly in the component.

### Step 1: Fetch Data in a Server Component
Update the blog posts page to fetch data from a mock API.

::Editor
#title
src/app/blog/posts/page.tsx

#default

```tsx
import type { Metadata } from 'next';
import Link from 'next/link';

// Mock API function
async function fetchPosts() {
  // Simulate fetching from an API
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return [
    { id: '1', title: 'First Post', excerpt: 'This is my first blog post.' },
    { id: '2', title: 'Second Post', excerpt: 'Exploring Next.js features.' },
  ];
}

export const metadata: Metadata = {
  title: 'Blog Posts - My Portfolio',
  description: 'List of all blog posts',
};

export default async function Posts() {
  const posts = await fetchPosts();

  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-700">Blog Posts</h1>
      <ul className="mt-4 space-y-4">
        {posts.length === 0 ? (
          <p className="text-gray-700">No posts available.</p>
        ) : (
          posts.map((post) => (
            <li key={post.id} className="border p-4 rounded">
              <Link href={`/blog/${post.id}`} className="text-blue-500 hover:underline">
                <h2 className="text-xl font-semibold">{post.title}</h2>
              </Link>
              <p className="text-gray-700">{post.excerpt}</p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
```

::

**Test URL**: `http://localhost:3000/blog/posts`

**Explanation**:
- The page is a Server Component, fetching data server-side.
- The `fetchPosts` function simulates an API call with a delay.
- The page renders statically (SSG) by default, or dynamically if `dynamicParams` is enabled.

### Step 2: Handle Errors and Loading States
Add error handling to the blog post page.

::Editor
#title
src/app/blog/[id]/page.tsx

#default

```tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

// Mock API function
async function fetchPost(id: string) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const posts = [
      { id: '1', title: 'First Post', content: 'This is my first blog post.' },
      { id: '2', title: 'Second Post', content: 'Exploring Next.js features.' },
    ];
    return posts.find((p) => p.id === id) || null;
  } catch (error) {
    throw new Error('Failed to fetch post');
  }
}

interface Params {
  params: { id: string };
}

export async function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }];
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
  try {
    const post = await fetchPost(params.id);
    if (!post) {
      notFound();
    }
    return (
      <div>
        <h1 className="text-3xl font-bold text-blue-700">{post.title}</h1>
        <p className="mt-4 text-lg text-gray-700">{post.content}</p>
      </div>
    );
  } catch (error) {
    notFound();
  }
}
```

::

**Test URL**: `http://localhost:3000/blog/1`

## Data Fetching with Pages Router (Legacy)

The Pages Router uses `getStaticProps` and `getServerSideProps` for data fetching.

### Step 1: Create a Pages Router Blog Page
Add a blog page in the `pages/` directory using `getStaticProps`.

::Editor
#title
pages/blog-static.tsx

#default

```tsx
import type { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';

interface Post {
  id: string;
  title: string;
  excerpt: string;
}

interface BlogStaticProps {
  posts: Post[];
}

const BlogStatic: NextPage<BlogStaticProps> = ({ posts }) => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-700">Static Blog</h1>
      <ul className="mt-4 space-y-4">
        {posts.map((post) => (
          <li key={post.id} className="border p-4 rounded">
            <Link href={`/blog/${post.id}`} className="text-blue-500 hover:underline">
              <h2 className="text-xl font-semibold">{post.title}</h2>
            </Link>
            <p className="text-gray-700">{post.excerpt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const posts = [
    { id: '1', title: 'First Post', excerpt: 'This is my first blog post.' },
    { id: '2', title: 'Second Post', excerpt: 'Exploring Next.js features.' },
  ];

  return {
    props: {
      posts,
    },
  };
};

export default BlogStatic;
```

::

**Test URL**: `http://localhost:3000/blog-static`

**Explanation**:
- `getStaticProps` fetches data at build time for SSG.
- The page is pre-rendered as static HTML.
- Works in the `pages/` directory, not `app/`.

### Step 2: Add a Server-Side Rendered Page
Create a page with `getServerSideProps`.

::Editor
#title
pages/blog-dynamic.tsx

#default

```tsx
import type { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';

interface Post {
  id: string;
  title: string;
  excerpt: string;
}

interface BlogDynamicProps {
  posts: Post[];
}

const BlogDynamic: NextPage<BlogDynamicProps> = ({ posts }) => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-700">Dynamic Blog</h1>
      <ul className="mt-4 space-y-4">
        {posts.map((post) => (
          <li key={post.id} className="border p-4 rounded">
            <Link href={`/blog/${post.id}`} className="text-blue-500 hover:underline">
              <h2 className="text-xl font-semibold">{post.title}</h2>
            </Link>
            <p className="text-gray-700">{post.excerpt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const posts = [
    { id: '1', title: 'First Post', excerpt: 'This is my first blog post.' },
    { id: '2', title: 'Second Post', excerpt: 'Exploring Next.js features.' },
  ];

  return {
    props: {
      posts,
    },
  };
};

export default BlogDynamic;
```

::

**Test URL**: `http://localhost:3000/blog-dynamic`

**Explanation**:
- `getServerSideProps` fetches data on each request (SSR).
- Suitable for dynamic, user-specific data.

## Client-Side Data Fetching

Use `useEffect` for client-side fetching in Client Components.

### Step 1: Create a Client-Side Blog Page
Add a client-side fetched blog page.

::Editor
#title
src/app/blog/client/page.tsx

#default

```tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Post {
  id: string;
  title: string;
  excerpt: string;
}

export default function BlogClient() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const data = [
          { id: '1', title: 'First Post', excerpt: 'This is my first blog post.' },
          { id: '2', title: 'Second Post', excerpt: 'Exploring Next.js features.' },
        ];
        setPosts(data);
      } catch (err) {
        setError('Failed to fetch posts');
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  if (loading) {
    return <div className="text-center p-6">Loading...</div>;
  }

  if (error) {
    return <div className="text-center p-6 text-red-700">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-700">Client-Side Blog</h1>
      <ul className="mt-4 space-y-4">
        {posts.map((post) => (
          <li key={post.id} className="border p-4 rounded">
            <Link href={`/blog/${post.id}`} className="text-blue-500 hover:underline">
              <h2 className="text-xl font-semibold">{post.title}</h2>
            </Link>
            <p className="text-gray-700">{post.excerpt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

::

**Test URL**: `http://localhost:3000/blog/client`

**Explanation**:
- `'use client'` enables client-side rendering.
- `useEffect` fetches data after the component mounts.
- Handles loading and error states for better UX.

## Combining Fetching Methods

Combine Server and Client Components for a hybrid approach.

### Step 1: Use Server Component to Pass Initial Data
Update the blog page to fetch initial data server-side and pass to a Client Component.

::Editor
#title
src/app/blog/page.tsx

#default

```tsx
import type { Metadata } from 'next';
import BlogClient from './BlogClient';

// Mock API function
async function fetchPosts() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return [
    { id: '1', title: 'First Post', excerpt: 'This is my first blog post.' },
    { id: '2', title: 'Second Post', excerpt: 'Exploring Next.js features.' },
  ];
}

export const metadata: Metadata = {
  title: 'Blog - My Portfolio',
  description: 'Blog section of the portfolio',
};

export default async function Blog() {
  const posts = await fetchPosts();
  return <BlogClient initialPosts={posts} />;
}
```

::

::Editor
#title
src/app/blog/BlogClient.tsx

#default

```tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import SearchBar from '../../components/SearchBar';

interface Post {
  id: string;
  title: string;
  excerpt: string;
}

interface BlogClientProps {
  initialPosts: Post[];
}

export default function BlogClient({ initialPosts }: BlogClientProps) {
  const [posts, setPosts] = useState(initialPosts);

  const handleSearch = (query: string) => {
    const filtered = initialPosts.filter((post) =>
      post.title.toLowerCase().includes(query.toLowerCase())
    );
    setPosts(filtered);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-700">Blog</h1>
      <div className="my-4">
        <SearchBar onSearch={handleSearch} />
      </div>
      <ul className="mt-4 space-y-4">
        {posts.map((post) => (
          <li key={post.id} className="border p-4 rounded">
            <Link href={`/blog/${post.id}`} className="text-blue-500 hover:underline">
              <h2 className="text-xl font-semibold">{post.title}</h2>
            </Link>
            <p className="text-gray-700">{post.excerpt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

::

**Test URL**: `http://localhost:3000/blog`

## Real-World Mini-Project: Portfolio with Data Fetching

Enhance the portfolio with different data fetching methods.

**Updated Project Structure**:

```
my-next-app/
├── pages/
│   ├── blog-static.tsx
│   ├── blog-dynamic.tsx
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
│   │   │   ├── BlogClient.tsx
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
│   │   │   ├── template.tsx
│   │   │   ├── login/
│   │   │   │   ├── page.tsx
│   │   │   ├── signup/
│   │   │   │   ├── page.tsx
│   ├── components/
│   │   ├── NavBar.tsx
│   │   ├── SearchBar.tsx
│   ├── styles/
│   │   ├── globals.css
```

**Test URLs**:
- `http://localhost:3000/blog` → Server Component with initial data
- `http://localhost:3000/blog/posts` → Server Component with SSG
- `http://localhost:3000/blog/client` → Client-side fetching
- `http://localhost:3000/blog-static` → Pages Router with `getStaticProps`
- `http://localhost:3000/blog-dynamic` → Pages Router with `getServerSideProps`

## Best Practices

### Server Components
- Use Server Components for most data fetching to minimize client-side JavaScript.
- Handle errors with try-catch and `notFound()`.
- Use `generateStaticParams` for SSG with dynamic routes.

### Pages Router
- Use `getStaticProps` for static content like blogs or docs.
- Use `getServerSideProps` for dynamic, user-specific data.
- Combine with `getStaticPaths` for dynamic routes in SSG.

### Client-Side Fetching
- Use client-side fetching for real-time or user-driven data.
- Implement loading and error states for better UX.
- Consider libraries like SWR or React Query for advanced fetching.

### Performance
- Cache API responses in Server Components using `fetch` with caching options.
- Use ISR for static pages that need periodic updates.
- Minimize client-side fetching to reduce bundle size.

## Common Patterns

### Incremental Static Regeneration (ISR)
Add ISR to `getStaticProps`:

::Editor
#title
pages/blog-static.tsx (snippet)

#default

```tsx
export const getStaticProps: GetStaticProps = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const posts = [
    { id: '1', title: 'First Post', excerpt: 'This is my first blog post.' },
    { id: '2', title: 'Second Post', excerpt: 'Exploring Next.js features.' },
  ];

  return {
    props: {
      posts,
    },
    revalidate: 60, // Revalidate every 60 seconds
  };
};
```

::

### Caching in Server Components
Use `fetch` with caching:

::Editor
#title
src/app/blog/posts/page.tsx (snippet)

#default

```tsx
async function fetchPosts() {
  const res = await fetch('https://api.example.com/posts', {
    cache: 'force-cache', // Cache for SSG
  });
  return res.json();
}
```

::

## What’s Next?

In the next tutorial, **API Routes Creation**, you’ll learn how to create API routes in Next.js to build backend functionality within your application.

### Key Takeaways:
- Use Server Components for server-side data fetching
- Use `getStaticProps` for SSG in the Pages Router
- Use `getServerSideProps` for SSR in the Pages Router
- Implement client-side fetching with `useEffect`
- Combine fetching methods for hybrid apps
- Handle loading and error states effectively

## Practice Exercise
1. Create a Server Component page that fetches data from a mock API.
2. Add a Pages Router page with `getStaticProps` for static data.
3. Create a Client Component page with `useEffect` for client-side fetching.
4. Implement loading and error states for client-side fetching.
5. Test all fetching methods and verify behavior in the browser.