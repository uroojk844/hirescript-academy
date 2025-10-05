---
title: Server and Client Components
description: Learn how to use React Server Components and Client Components in Next.js to optimize performance and interactivity in your application.
navigation:
  order: 7
---

# Server and Client Components

Welcome to the Server and Client Components lesson in our **Next.js Tutorial - 20 Modules** series! In this tutorial, you’ll learn how to use **React Server Components** and **Client Components** in **Next.js** with the **App Router** to optimize performance and add interactivity to your application. This lesson builds on concepts from **Layouts and Templates** and **Dynamic Routes Parameters**, focusing on leveraging server-side rendering for data fetching and client-side interactivity for dynamic UI.

In this tutorial, you’ll learn:

- Understanding Server and Client Components in Next.js
- Creating Server Components for data fetching
- Using Client Components for interactivity
- Combining Server and Client Components
- Managing state in Client Components
- Best practices for component usage

## What are Server and Client Components?

Next.js 13 introduced the **App Router**, which leverages **React Server Components** as the default component type. Server and Client Components serve distinct purposes:

- **Server Components**:
  - Run on the server during rendering (SSG, SSR, or ISR).
  - Ideal for data fetching, rendering static content, and reducing client-side JavaScript.
  - Cannot use browser APIs, hooks (e.g., `useState`, `useEffect`), or event handlers.
  - Automatically used unless marked with `'use client'`.

- **Client Components**:
  - Run in the browser, enabling interactivity (e.g., forms, event handlers).
  - Marked with the `'use client'` directive at the top of the file.
  - Can use React hooks and browser APIs but increase client-side JavaScript.

**Key Benefits**:
- **Server Components**: Reduce client-side bundle size, improve SEO, and handle data fetching efficiently.
- **Client Components**: Enable dynamic, interactive UI with minimal server dependency.

## Setting Up the Project

Use the Next.js project from the **Layouts and Templates** lesson, configured with TypeScript, Tailwind CSS, and the App Router.

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

## Creating Server Components

Server Components are ideal for fetching data and rendering static content.

### Step 1: Update the Blog Posts Page
Convert the blog posts page to a Server Component with async data fetching.

::Editor
#title
src/app/blog/posts/page.tsx

#default

```tsx
import type { Metadata } from 'next';
import Link from 'next/link';

// Mock API function
async function fetchPosts() {
  // Simulate async data fetching
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

**Test URL**: `http://localhost:3000/blog/posts`

**Explanation**:
- This is a Server Component (no `'use client'` directive).
- The `async` function fetches data server-side, reducing client-side JavaScript.
- The page is rendered on the server (SSG or SSR, depending on configuration).

### Step 2: Update the Blog Post Page
Ensure the dynamic blog post page is a Server Component.

::Editor
#title
src/app/blog/[id]/page.tsx

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
}
```

::

**Test URL**: `http://localhost:3000/blog/1`

## Creating Client Components

Client Components are used for interactivity, such as forms or stateful UI.

### Step 1: Create a Client-Side Search Component
Add a search bar to filter blog posts.

::Editor
#title
src/components/SearchBar.tsx

#default

```tsx
'use client';

import { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search posts..."
        className="border p-2 rounded text-gray-700"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Search
      </button>
    </form>
  );
}
```

::

**Explanation**:
- `'use client'`: Marks this as a Client Component.
- Uses `useState` for local state management.
- Calls the `onSearch` callback when the form is submitted.

### Step 2: Integrate Search into the Posts Page
Update the posts page to filter posts client-side.

::Editor
#title
src/app/blog/posts/page.tsx (updated)

#default

```tsx
'use client';

import type { Metadata } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import SearchBar from '../../../components/SearchBar';

// Mock data
const allPosts = [
  { id: '1', title: 'First Post', excerpt: 'This is my first blog post.' },
  { id: '2', title: 'Second Post', excerpt: 'Exploring Next.js features.' },
];

export const metadata: Metadata = {
  title: 'Blog Posts - My Portfolio',
  description: 'List of all blog posts',
};

export default function Posts() {
  const [posts, setPosts] = useState(allPosts);

  const handleSearch = (query: string) => {
    const filtered = allPosts.filter((post) =>
      post.title.toLowerCase().includes(query.toLowerCase())
    );
    setPosts(filtered);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-700">Blog Posts</h1>
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

**Test URL**: `http://localhost:3000/blog/posts`

**Explanation**:
- The page is now a Client Component due to `'use client'`.
- The `SearchBar` component filters posts client-side using `useState`.
- This increases client-side JavaScript but enables interactive filtering.

## Combining Server and Client Components

Combine Server and Client Components for optimal performance and interactivity.

### Step 1: Create a Server Component Wrapper
Create a server component to fetch data and pass it to a client component.

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

**Explanation**:
- `app/blog/page.tsx` is a Server Component that fetches data.
- `BlogClient.tsx` is a Client Component that handles interactivity.
- The server component passes `initialPosts` to the client component, minimizing client-side JavaScript.

## Real-World Mini-Project: Interactive Portfolio Blog

Enhance the portfolio blog with server and client components.

::Editor
#title
src/app/blog/layout.tsx (updated)

#default

```tsx
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog - My Portfolio',
  description: 'Blog section of the Next.js portfolio',
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <aside className="w-full md:w-1/4 bg-gray-200 p-4 rounded">
          <h2 className="text-xl font-bold text-blue-700">Blog Menu</h2>
          <ul className="mt-4 space-y-2">
            <li>
              <Link href="/blog" className="text-blue-500 hover:underline">
                Blog Home
              </Link>
            </li>
            <li>
              <Link href="/blog/posts" className="text-blue-500 hover:underline">
                All Posts
              </Link>
            </li>
          </ul>
        </aside>
        <section className="w-full md:w-3/4">{children}</section>
      </div>
    </div>
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
- `http://localhost:3000/blog` → Interactive blog page with search
- `http://localhost:3000/blog/posts` → Client-side filtered posts
- `http://localhost:3000/blog/1` → Server-rendered post

## Best Practices

### Server Components
- Use Server Components for data fetching and static content.
- Keep Server Components async for seamless data integration.
- Minimize client-side JavaScript by offloading logic to the server.

### Client Components
- Use Client Components only for interactivity (e.g., forms, event handlers).
- Mark components with `'use client'` when using hooks or browser APIs.
- Pass data from Server Components to Client Components via props.

### Performance
- Maximize Server Component usage to reduce bundle size.
- Avoid unnecessary `'use client'` directives in shared components.
- Use static generation (`generateStaticParams`) for known routes.

## Common Patterns

### Passing Data to Client Components
Pass props from Server to Client Components:

::Editor
#title
src/app/blog/page.tsx (snippet)

#default

```tsx
export default async function Blog() {
  const posts = await fetchPosts();
  return <BlogClient initialPosts={posts} />;
}
```

::

### Error Handling in Server Components
Handle errors gracefully:

::Editor
#title
src/app/blog/[id]/page.tsx (snippet)

#default

```tsx
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

## What’s Next?

In the next tutorial, **Data Fetching Methods**, you’ll learn how to fetch data in Next.js using Server Components, `getStaticProps`, `getServerSideProps`, and client-side fetching for dynamic and static content.

### Key Takeaways:
- Use Server Components for server-side rendering and data fetching
- Use Client Components for interactivity with `'use client'`
- Combine Server and Client Components for optimal performance
- Pass data from Server to Client Components via props
- Manage state in Client Components with hooks
- Follow best practices for component usage

## Practice Exercise
1. Convert an existing page to a Server Component with async data fetching.
2. Create a Client Component for a form or interactive feature.
3. Combine a Server Component and Client Component in a single route.
4. Add error handling to a Server Component with `notFound()`.
5. Test the interactivity and server-rendered content.