---
title: Performance Optimization
description: Learn how to optimize Next.js applications for speed and scalability using lazy loading, code splitting, image optimization, and caching.
navigation:
  order: 18
---

# Performance Optimization

Welcome to the Performance Optimization lesson in our **Next.js Tutorial - 20 Modules** series! In this tutorial, you’ll learn how to optimize **Next.js** applications to improve speed, reduce load times, and enhance user experience. This lesson builds on concepts from **Testing in Next.js** and **File Uploads**, focusing on techniques like **lazy loading**, **code splitting**, **image optimization**, and **caching** in the App Router. We’ll enhance the portfolio project to ensure it performs efficiently.

In this tutorial, you’ll learn:

- Understanding performance optimization in Next.js
- Implementing lazy loading and code splitting
- Optimizing images with Next.js Image component
- Using caching for API routes and pages
- Analyzing and improving performance
- Best practices for performance optimization

## What is Performance Optimization?

**Performance optimization** involves improving the speed and efficiency of a web application to reduce load times, improve responsiveness, and lower resource usage. In Next.js, optimization leverages built-in features and best practices to enhance user experience.

**Key Techniques**:
- **Lazy Loading**: Load components or modules only when needed.
- **Code Splitting**: Split JavaScript bundles to reduce initial load size.
- **Image Optimization**: Use Next.js `Image` component for efficient image delivery.
- **Caching**: Cache static assets, API responses, and pages for faster access.

**Benefits**:
- Faster page loads and improved SEO
- Reduced server load and bandwidth usage
- Better user experience and lower bounce rates

## Setting Up the Project

Use the Next.js project from the **Testing in Next.js** lesson, configured with TypeScript, Tailwind CSS, and the App Router. No additional dependencies are required for this lesson, as Next.js provides built-in optimization features.

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
│   │   │   ├── auth/
│   │   │   │   ├── [...nextauth]/
│   │   │   │   │   ├── route.ts
│   │   │   │   ├── login/
│   │   │   │   │   ├── route.ts
│   │   │   ├── posts/
│   │   │   │   ├── route.ts
│   │   │   ├── posts/[id]/
│   │   │   │   ├── route.ts
│   │   │   ├── user/
│   │   │   │   ├── route.ts
│   │   │   ├── feedback/
│   │   │   │   ├── route.ts
│   │   │   ├── upload/
│   │   │   │   ├── route.ts
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── dashboard/
│   │   │   ├── page.tsx
│   │   │   ├── client/
│   │   │   │   ├── page.tsx
│   │   │   ├── custom/
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
│   │   │   │   ├── action.ts
│   │   │   ├── upload/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── action.ts
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
│   │   │   ├── custom-login/
│   │   │   │   ├── page.tsx
│   │   │   ├── signup/
│   │   │   │   ├── page.tsx
│   ├── components/
│   │   ├── NavBar.tsx
│   │   ├── SearchBar.tsx
│   │   ├── PostForm.tsx
│   │   ├── FormField.tsx
│   ├── context/
│   │   ├── ThemeContext.tsx
│   ├── store/
│   │   ├── index.ts
│   │   ├── postsSlice.ts
│   ├── styles/
│   │   ├── globals.css
├── public/
│   ├── uploads/
├── tests/
│   ├── components/
│   │   ├── NavBar.test.tsx
│   ├── api/
│   │   ├── posts.test.ts
│   ├── e2e/
│   │   ├── blog.spec.cy.ts
├── cypress/
│   ├── e2e/
│   ├── fixtures/
│   ├── support/
├── .eslintrc.json
├── .gitignore
├── jest.config.js
├── jest.setup.js
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

## Lazy Loading and Code Splitting

Next.js automatically code-splits by route, but you can further optimize by lazy loading components.

### Step 1: Lazy Load BlogClient Component
Use `dynamic` to lazy load the `BlogClient` component.

::Editor
#title
src/app/blog/page.tsx

#default

```tsx
import dynamic from 'next/dynamic';

const BlogClient = dynamic(() => import('./BlogClient'), {
  loading: () => <div className="text-center p-6">Loading...</div>,
  ssr: false,
});

export default function Blog() {
  return (
    <div>
      <BlogClient />
    </div>
  );
}
```

::

**Test URL**: `http://localhost:3000/blog`

**Explanation**:
- `dynamic` lazy loads the `BlogClient` component, reducing the initial bundle size.
- `ssr: false` disables server-side rendering for the component, suitable for client-heavy components.
- A loading fallback improves user experience during loading.

## Image Optimization

Use the Next.js `Image` component to optimize images.

### Step 2: Optimize Images in BlogClient
Update the `BlogClient` component to use optimized images.

::Editor
#title
src/app/blog/BlogClient.tsx

#default

```tsx
'use client';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { fetchPosts, resetPosts } from '../../store/postsSlice';
import Link from 'next/link';
import Image from 'next/image';
import SearchBar from '../../components/SearchBar';

interface Post {
  id: string;
  title: string;
  content: string;
  image?: string;
}

export default function BlogClient() {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, status, error } = useSelector((state: RootState) => state.posts);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(posts);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts());
    }
    setFilteredPosts(posts);
  }, [dispatch, status, posts]);

  const handleSearch = (query: string) => {
    const filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  if (status === 'loading') {
    return <div className="text-center p-6">Loading...</div>;
  }

  if (status === 'failed') {
    return <div className="text-center p-6 text-red-700">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-700">Blog</h1>
      <div className="my-4">
        <SearchBar onSearch={handleSearch} />
      </div>
      <button
        onClick={() => dispatch(resetPosts())}
        className="mb-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Reset Posts
      </button>
      <ul className="mt-4 space-y-4">
        {filteredPosts.map((post) => (
          <li key={post.id} className="border p-4 rounded">
            <Link href={`/blog/${post.id}`} className="text-blue-500 hover:underline">
              <h2 className="text-xl font-semibold">{post.title}</h2>
            </Link>
            {post.image && (
              <Image
                src={`/uploads/${post.image}`}
                alt={post.title}
                width={200}
                height={200}
                className="mt-2 rounded"
                priority={false}
                placeholder="blur"
                blurDataURL="/uploads/placeholder.jpg"
              />
            )}
            <p className="text-gray-700">{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

::

**Add Placeholder Image**:
Place a `placeholder.jpg` in `public/uploads/` for the blur placeholder.

**Test URL**: `http://localhost:3000/blog`

**Explanation**:
- The `Image` component optimizes images by resizing, compressing, and serving modern formats (e.g., WebP).
- `placeholder="blur"` provides a low-res preview while loading.
- `priority={false}` defers loading for non-critical images.

## Caching API Routes and Pages

Use caching to improve performance for API routes and pages.

### Step 3: Cache API Responses
Update the `/api/posts` route to use caching.

::Editor
#title
src/app/api/posts/route.ts

#default

```ts
import { NextResponse } from 'next/server';

const posts: { id: string; title: string; content: string; image?: string }[] = [
  { id: '1', title: 'First Post', content: 'This is the first post.', image: 'image-1.jpg' },
];

export async function GET() {
  return NextResponse.json(posts, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=59',
    },
  });
}

export async function POST(request: Request) {
  const { title, content } = await request.json();

  if (!title || !content) {
    return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
  }

  const newPost = {
    id: String(posts.length + 1),
    title,
    content,
  };

  posts.push(newPost);
  return NextResponse.json(newPost);
}
```

::

**Explanation**:
- `Cache-Control` header caches the response for 3600 seconds (1 hour).
- `stale-while-revalidate` allows serving stale content while revalidating in the background.

### Step 4: Cache Pages with ISR
Use Incremental Static Regeneration (ISR) for the blog page.

::Editor
#title
src/app/blog/posts/page.tsx

#default

```tsx
import Link from 'next/link';

interface Post {
  id: string;
  title: string;
  content: string;
  image?: string;
}

async function fetchPosts() {
  const res = await fetch('http://localhost:3000/api/posts', {
    next: { revalidate: 3600 }, // Revalidate every hour
  });
  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }
  return res.json();
}

export default async function Posts() {
  const posts: Post[] = await fetchPosts();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-700">All Posts</h1>
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

export const revalidate = 3600; // Revalidate page every hour
```

::

**Test URL**: `http://localhost:3000/blog/posts`

**Explanation**:
- `next: { revalidate: 3600 }` caches the API response for 1 hour.
- `export const revalidate = 3600` enables ISR for the page, regenerating every hour.

## Analyzing Performance

Use Next.js built-in tools and browser DevTools to analyze performance.

### Step 5: Enable Next.js Analytics
Update `next.config.js` to enable Vercel Analytics.

::Editor
#title
next.config.js

#default

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ['localhost'],
  },
};

module.exports = nextConfig;
```

::

**Add Vercel Analytics**:
Install the Vercel Analytics package:
```bash
npm install @vercel/analytics
```

Add Analytics to the root layout:

::Editor
#title
src/app/layout.tsx

#default

```tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '../context/ThemeContext';
import { Provider } from 'react-redux';
import { store } from '../store';
import NavBar from '../components/NavBar';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'My Portfolio',
  description: 'A Next.js portfolio application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          <ThemeProvider>
            <NavBar />
            <main className="min-h-screen">{children}</main>
            <Analytics />
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
```

::

**Test URL**: `http://localhost:3000`

**Explanation**:
- Vercel Analytics tracks page views and performance metrics.
- Use browser DevTools (e.g., Lighthouse) to analyze load times and identify bottlenecks.

## Real-World Mini-Project: Optimized Portfolio

Enhance the portfolio with performance optimizations.

**Updated Project Structure**:

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
│   │   │   ├── auth/
│   │   │   │   ├── [...nextauth]/
│   │   │   │   │   ├── route.ts
│   │   │   │   ├── login/
│   │   │   │   │   ├── route.ts
│   │   │   ├── posts/
│   │   │   │   ├── route.ts
│   │   │   ├── posts/[id]/
│   │   │   │   ├── route.ts
│   │   │   ├── user/
│   │   │   │   ├── route.ts
│   │   │   ├── feedback/
│   │   │   │   ├── route.ts
│   │   │   ├── upload/
│   │   │   │   ├── route.ts
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── dashboard/
│   │   │   ├── page.tsx
│   │   │   ├── client/
│   │   │   │   ├── page.tsx
│   │   │   ├── custom/
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
│   │   │   │   ├── action.ts
│   │   │   ├── upload/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── action.ts
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
│   │   │   ├── custom-login/
│   │   │   │   ├── page.tsx
│   │   │   ├── signup/
│   │   │   │   ├── page.tsx
│   ├── components/
│   │   ├── NavBar.tsx
│   │   ├── SearchBar.tsx
│   │   ├── PostForm.tsx
│   │   ├── FormField.tsx
│   ├── context/
│   │   ├── ThemeContext.tsx
│   ├── store/
│   │   ├── index.ts
│   │   ├── postsSlice.ts
│   ├── styles/
│   │   ├── globals.css
├── public/
│   ├── uploads/
│   │   ├── placeholder.jpg
├── tests/
│   ├── components/
│   │   ├── NavBar.test.tsx
│   ├── api/
│   │   ├── posts.test.ts
│   ├── e2e/
│   │   ├── blog.spec.cy.ts
├── cypress/
│   ├── e2e/
│   ├── fixtures/
│   ├── support/
```

**Test URLs**:
- `http://localhost:3000/blog` → Lazy-loaded blog page with optimized images
- `http://localhost:3000/blog/posts` → ISR-cached posts page
- `http://localhost:3000/api/posts` → Cached API response

## Best Practices

### Lazy Loading
- Lazy load non-critical components with `next/dynamic`.
- Use `ssr: false` for client-only components.
- Provide loading fallbacks for better UX.

### Image Optimization
- Always use the `Image` component for images.
- Set `width` and `height` to prevent layout shifts.
- Use `placeholder="blur"` for non-critical images.

### Caching
- Use ISR for dynamic pages with `revalidate`.
- Set `Cache-Control` headers for API routes.
- Leverage CDN caching in production (e.g., Vercel).

### Analysis
- Run Lighthouse audits to identify performance issues.
- Use Vercel Analytics for real-world performance data.
- Monitor bundle size with tools like `next bundle analyzer`.

## Common Patterns

### Dynamic Imports with Error Boundaries
Wrap lazy-loaded components in an error boundary:

::Editor
#title
src/components/ErrorBoundary.tsx

#default

```tsx
'use client';

import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <div>Something went wrong</div>;
    }
    return this.props.children;
  }
}
```

::

::Editor
#title
src/app/blog/page.tsx (updated)

#default

```tsx
import dynamic from 'next/dynamic';
import ErrorBoundary from '../../components/ErrorBoundary';

const BlogClient = dynamic(() => import('./BlogClient'), {
  loading: () => <div className="text-center p-6">Loading...</div>,
  ssr: false,
});

export default function Blog() {
  return (
    <ErrorBoundary fallback={<div>Error loading blog</div>}>
      <BlogClient />
    </ErrorBoundary>
  );
}
```

::

### Memoization for Components
Use `React.memo` for performance-critical components:

::Editor
#title
src/components/SearchBar.tsx

#default

```tsx
'use client';

import { memo } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

function SearchBarComponent({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <input
      type="text"
      value={query}
      onChange={handleChange}
      placeholder="Search posts..."
      className="border p-2 w-full rounded"
    />
  );
}

export default memo(SearchBarComponent);
```

::

## What’s Next?

In the next tutorial, **SEO in Next.js**, you’ll learn how to optimize your Next.js application for search engines using metadata, sitemaps, and structured data.

### Key Takeaways:
- Use lazy loading and code splitting to reduce bundle size
- Optimize images with the Next.js `Image` component
- Implement caching for API routes and pages
- Analyze performance with tools like Lighthouse and Vercel Analytics
- Follow best practices for scalable optimization
- Combine techniques for maximum performance

## Practice Exercise
1. Lazy load a component using `next/dynamic`.
2. Optimize images on the blog page with the `Image` component.
3. Add caching to an API route with `Cache-Control`.
4. Implement ISR for a dynamic page.
5. Analyze performance using Lighthouse and improve scores.