---
title: Client-Side Rendering
description: Learn how to implement client-side rendering (CSR) in Next.js for interactive applications using useEffect, SWR, and other tools.
navigation:
  order: 12
---

# Client-Side Rendering

Welcome to the Client-Side Rendering lesson in our **Next.js Tutorial - 20 Modules** series! In this tutorial, you’ll learn how to implement **Client-Side Rendering (CSR)** in **Next.js** to create highly interactive applications. This lesson builds on concepts from **Server-Side Rendering** and **API Routes Creation**, focusing on fetching and rendering data in the browser using `useEffect`, the SWR library, and other techniques. CSR is ideal for dynamic, user-driven interfaces like dashboards or search features.

In this tutorial, you’ll learn:

- Understanding Client-Side Rendering in Next.js
- Implementing CSR with `useEffect`
- Using SWR for efficient data fetching
- Combining CSR with Server Components
- Handling loading and error states
- Best practices for CSR

## What is Client-Side Rendering?

**Client-Side Rendering (CSR)** involves fetching data and rendering content in the browser after the initial HTML is loaded. Unlike **Server-Side Rendering (SSR)** or **Static Site Generation (SSG)**, CSR relies on JavaScript executed on the client to populate the UI, making it suitable for highly interactive applications.

**Key Features**:
- **Interactivity**: Ideal for dynamic UI (e.g., real-time search, forms).
- **Flexibility**: Fetches data based on user actions.
- **Initial Load**: Sends minimal HTML, with JavaScript handling rendering.

**Tools**:
- **useEffect**: Standard React hook for fetching data after component mounts.
- **SWR**: A lightweight library for data fetching, caching, and revalidation.
- **React Query**: An alternative for advanced state management and caching.

**Use Cases**:
- Real-time data updates (e.g., live feeds).
- User-driven content (e.g., search results).
- Interactive dashboards or forms.

## Setting Up the Project

Use the Next.js project from the **Server-Side Rendering** lesson, configured with TypeScript, Tailwind CSS, and the App Router. We’ll install SWR for advanced data fetching.

**Install SWR**:
```bash
npm install swr
```

**Project Structure**:

```
my-next-app/
├── node_modules/
├── pages/
│   ├── api/
│   │   ├── legacy-posts.ts
│   ├── blog-static/
│   │   ├── [id].tsx
│   ├── blog-static.tsx
│   ├── blog-dynamic/
│   │   ├── [id].tsx
│   ├── blog-dynamic.tsx
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── posts/
│   │   │   │   ├── route.ts
│   │   │   ├── posts/[id]/
│   │   │   │   ├── route.ts
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── dashboard/
│   │   │   ├── page.tsx
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
│   │   │   ├── create/
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
│   │   ├── PostForm.tsx
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

## Client-Side Rendering with useEffect

Use `useEffect` to fetch data in a Client Component.

### Step 1: Create a Client-Side Blog Page
Create a page that fetches posts client-side using `useEffect`.

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
  content: string;
}

export default function BlogClient() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch('/api/posts');
        if (!res.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        setError('Failed to load posts');
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
            <p className="text-gray-700">{post.content}</p>
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
- `'use client'` marks the component as a Client Component.
- `useEffect` fetches data from `/api/posts` after the component mounts.
- Handles loading and error states for better UX.

## Client-Side Rendering with SWR

SWR provides caching, revalidation, and optimistic updates for efficient data fetching.

### Step 1: Create a Client-Side Dashboard with SWR
Create a dashboard page using SWR to fetch user data and posts.

::Editor
#title
src/app/dashboard/client/page.tsx

#default

```tsx
'use client';

import useSWR from 'swr';
import Link from 'next/link';

interface Post {
  id: string;
  title: string;
  content: string;
}

interface User {
  id: string;
  name: string;
  email: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function DashboardClient() {
  const { data: user, error: userError } = useSWR<User>('/api/user', fetcher);
  const { data: posts, error: postsError } = useSWR<Post[]>('/api/posts', fetcher);

  if (userError || postsError) {
    return <div className="text-center p-6 text-red-700">Error loading data</div>;
  }

  if (!user || !posts) {
    return <div className="text-center p-6">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-700">Client-Side Dashboard</h1>
      <div className="mt-4 border p-4 rounded">
        <p className="text-gray-700"><strong>Name:</strong> {user.name}</p>
        <p className="text-gray-700"><strong>Email:</strong> {user.email}</p>
      </div>
      <h2 className="text-2xl font-semibold text-gray-700 mt-6">Recent Posts</h2>
      <ul className="mt-4 space-y-4">
        {posts.map((post) => (
          <li key={post.id} className="border p-4 rounded">
            <Link href={`/blog/${post.id}`} className="text-blue-500 hover:underline">
              <h3 className="text-xl font-semibold">{post.title}</h3>
            </Link>
            <p className="text-gray-700">{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

::

### Step 2: Create a User API Route
Add an API route for user data to support the dashboard.

::Editor
#title
src/app/api/user/route.ts

#default

```ts
import { NextResponse } from 'next/server';

export async function GET() {
  const user = {
    id: '123',
    name: 'John Doe',
    email: 'john@example.com',
  };
  return NextResponse.json(user);
}
```

::

**Test URLs**:
- `http://localhost:3000/dashboard/client` → Client-side dashboard
- `http://localhost:3000/api/user` → User data

**Explanation**:
- `useSWR` fetches data from `/api/user` and `/api/posts`.
- Automatically handles loading, error states, and caching.
- Revalidates data on focus or at intervals for freshness.

## Combining CSR with Server Components

Pass initial data from a Server Component to a Client Component for hybrid rendering.

### Step 1: Create a Server Component Wrapper
Fetch initial posts server-side and pass to a Client Component.

::Editor
#title
src/app/blog/page.tsx

#default

```tsx
import type { Metadata } from 'next';
import BlogClient from './BlogClient';

// Mock API function
async function fetchPosts() {
  const res = await fetch('http://localhost:3000/api/posts', {
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }
  return res.json();
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
  content: string;
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
    <div className="max-w-4xl mx-auto p-6">
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
            <p className="text-gray-700">{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

::

**Test URL**: `http://localhost:3000/blog`

**Explanation**:
- The Server Component fetches initial data for SSR or SSG.
- The Client Component handles interactive features like search.
- Combines the benefits of server-side data fetching with client-side interactivity.

## Real-World Mini-Project: Interactive Portfolio Dashboard

Enhance the portfolio with a client-side rendered dashboard.

**Updated Project Structure**:

```
my-next-app/
├── pages/
│   ├── api/
│   │   ├── legacy-posts.ts
│   ├── blog-static/
│   │   ├── [id].tsx
│   ├── blog-static.tsx
│   ├── blog-dynamic/
│   │   ├── [id].tsx
│   ├── blog-dynamic.tsx
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── posts/
│   │   │   │   ├── route.ts
│   │   │   ├── posts/[id]/
│   │   │   │   ├── route.ts
│   │   │   ├── user/
│   │   │   │   ├── route.ts
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── dashboard/
│   │   │   ├── page.tsx
│   │   │   ├── client/
│   │   │   │   ├── page.tsx
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
│   │   │   ├── create/
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
│   │   ├── PostForm.tsx
│   ├── styles/
│   │   ├── globals.css
```

**Test URLs**:
- `http://localhost:3000/dashboard/client` → Client-side dashboard with SWR
- `http://localhost:3000/blog/client` → Client-side blog with `useEffect`
- `http://localhost:3000/blog` → Hybrid SSR/CSR blog

## Best Practices

### CSR
- Use CSR for interactive, user-driven features.
- Minimize initial JavaScript bundle size by offloading static content to Server Components.
- Use libraries like SWR or React Query for efficient data fetching.

### Loading and Error States
- Always implement loading and error states for better UX.
- Provide fallback UI for failed requests.
- Use skeleton screens or spinners for loading states.

### Performance
- Combine CSR with SSR or SSG for initial data to reduce client-side fetching.
- Cache data with SWR or React Query to avoid unnecessary requests.
- Optimize API endpoints for fast responses.

## Common Patterns

### SWR with Revalidation
Enable periodic revalidation with SWR:

::Editor
#title
src/app/dashboard/client/page.tsx (snippet)

#default

```tsx
const { data: posts, error } = useSWR('/api/posts', fetcher, {
  refreshInterval: 60000, // Revalidate every 60 seconds
});
```

::

### Environment Variables
Use environment variables for API URLs:

::Editor
#title
.env.local

#default

```
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

::

::Editor
#title
src/app/blog/client/page.tsx (snippet)

#default

```tsx
const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`);
```

::

## What’s Next?

In the next tutorial, **Authentication in Next.js**, you’ll learn how to implement authentication in Next.js using providers like NextAuth.js or custom solutions.

### Key Takeaways:
- Use `useEffect` for basic client-side data fetching
- Use SWR for efficient caching and revalidation
- Combine CSR with Server Components for hybrid rendering
- Handle loading and error states effectively
- Optimize client-side JavaScript for performance
- Follow best practices for interactive UIs

## Practice Exercise
1. Create a client-side page using `useEffect` to fetch data.
2. Implement a page using SWR for data fetching.
3. Combine a Server Component with a Client Component for hybrid rendering.
4. Add loading and error states to a CSR page.
5. Test client-side rendering with API routes.