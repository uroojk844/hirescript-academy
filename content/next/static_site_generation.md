---
title: Static Site Generation
description: Learn how to use Next.js to generate static sites with generateStaticParams, Incremental Static Regeneration (ISR), and Pages Router methods like getStaticProps and getStaticPaths.
navigation:
  order: 10
---

# Static Site Generation

Welcome to the Static Site Generation lesson in our **Next.js Tutorial - 20 Modules** series! In this tutorial, you’ll learn how to use **Next.js** to generate **static sites** using **Static Site Generation (SSG)** with the **App Router** (`generateStaticParams`) and **Incremental Static Regeneration (ISR)**. You’ll also explore legacy **Pages Router** methods like `getStaticProps` and `getStaticPaths**. This lesson builds on concepts from **API Routes Creation** and **Data Fetching Methods**, focusing on creating performant, SEO-friendly static pages.

In this tutorial, you’ll learn:

- Understanding Static Site Generation (SSG) and ISR
- Using `generateStaticParams` in the App Router for SSG
- Implementing ISR in the App Router
- Using `getStaticProps` and `getStaticPaths` in the Pages Router
- Combining SSG with API routes
- Best practices for static site generation

## What is Static Site Generation?

**Static Site Generation (SSG)** pre-renders pages at **build time**, creating static HTML files that are served to users. This approach is ideal for content that doesn’t change frequently, such as blog posts, documentation, or marketing pages.

**Incremental Static Regeneration (ISR)** allows you to update static content after the initial build without redeploying, using a revalidation interval.

**Key Benefits**:
- **Performance**: Static pages load quickly with minimal server processing.
- **SEO**: Pre-rendered HTML is easily crawlable by search engines.
- **Scalability**: Static files can be served via a CDN.
- **ISR**: Balances static performance with dynamic updates.

**App Router vs. Pages Router**:
- **App Router**: Uses `generateStaticParams` for dynamic routes and async Server Components for data fetching.
- **Pages Router**: Uses `getStaticProps` for data fetching and `getStaticPaths` for dynamic routes.

## Setting Up the Project

Use the Next.js project from the **API Routes Creation** lesson, configured with TypeScript, Tailwind CSS, and the App Router. We’ll continue using the `pages/` directory for Pages Router examples.

**Project Structure**:

```
my-next-app/
├── node_modules/
├── pages/
│   ├── api/
│   │   ├── legacy-posts.ts
│   ├── blog-static.tsx
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

## Static Site Generation in the App Router

In the App Router, SSG is achieved using **Server Components** and `generateStaticParams` for dynamic routes.

### Step 1: SSG for Blog Posts
Update the blog posts page to fetch data at build time.

::Editor
#title
src/app/blog/posts/page.tsx

#default

```tsx
import type { Metadata } from 'next';
import Link from 'next/link';

// Mock API function (simulating external API)
async function fetchPosts() {
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
    <div className="max-w-4xl mx-auto p-6">
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
- The page is a Server Component, fetching data at build time (SSG).
- The `fetchPosts` function simulates an API call, but the result is cached for static generation.
- The page is pre-rendered as static HTML during `next build`.

### Step 2: SSG for Dynamic Routes
Use `generateStaticParams` for dynamic blog post pages.

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
  // Fetch IDs from an API or use mock data
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
      <div className="max-w-4xl mx-auto p-6">
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

**Test URLs**:
- `http://localhost:3000/blog/1` → Pre-rendered post
- `http://localhost:3000/blog/3` → 404 page

**Explanation**:
- `generateStaticParams` specifies which dynamic routes to pre-render (`/blog/1`, `/blog/2`).
- The page is generated as static HTML at build time.
- Non-specified IDs trigger `notFound()` at runtime.

### Step 3: Incremental Static Regeneration (ISR)
Add ISR to the blog posts page to revalidate content periodically.

::Editor
#title
src/app/blog/posts/page.tsx (updated)

#default

```tsx
import type { Metadata } from 'next';
import Link from 'next/link';

// Mock API function
async function fetchPosts() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return [
    { id: '1', title: 'First Post', excerpt: 'This is my first blog post.' },
    { id: '2', title: 'Second Post', excerpt: 'Exploring Next.js features.' },
    // Simulate updated content
    { id: '3', title: 'New Post', excerpt: 'Added via ISR.' },
  ];
}

export const metadata: Metadata = {
  title: 'Blog Posts - My Portfolio',
  description: 'List of all blog posts',
};

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Posts() {
  const posts = await fetchPosts();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-700">Blog Posts</h1>
      <p className="text-gray-500">Last updated: {new Date().toLocaleString()}</p>
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
- `revalidate = 60` enables ISR, re-fetching data every 60 seconds.
- The page is static at build time but updates in the background.
- The timestamp shows the last render time for debugging.

## Static Site Generation in the Pages Router

In the Pages Router, SSG is achieved using `getStaticProps` and `getStaticPaths`.

### Step 1: SSG with getStaticProps
Update the static blog page to use `getStaticProps`.

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
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const posts = [
    { id: '1', title: 'First Post', excerpt: 'This is my first blog post.' },
    { id: '2', title: 'Second Post', excerpt: 'Exploring Next.js features.' },
  ];

  return {
    props: {
      posts,
    },
    revalidate: 60, // ISR: Revalidate every 60 seconds
  };
};

export default BlogStatic;
```

::

**Test URL**: `http://localhost:3000/blog-static`

### Step 2: SSG for Dynamic Routes
Add a dynamic route with `getStaticPaths`.

::Editor
#title
pages/blog-static/[id].tsx

#default

```tsx
import type { GetStaticProps, GetStaticPaths, NextPage } from 'next';

interface Post {
  id: string;
  title: string;
  content: string;
}

interface BlogPostProps {
  post: Post | null;
}

const BlogPost: NextPage<BlogPostProps> = ({ post }) => {
  if (!post) {
    return <div className="text-center p-6 text-red-700">Post not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-700">{post.title}</h1>
      <p className="mt-4 text-lg text-gray-700">{post.content}</p>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [{ params: { id: '1' } }, { params: { id: '2' } }];

  return {
    paths,
    fallback: false, // 404 for non-generated paths
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const posts = [
    { id: '1', title: 'First Post', content: 'This is my first blog post.' },
    { id: '2', title: 'Second Post', content: 'Exploring Next.js features.' },
  ];
  const post = posts.find((p) => p.id === params?.id) || null;

  return {
    props: {
      post,
    },
  };
};

export default BlogPost;
```

::

**Test URLs**:
- `http://localhost:3000/blog-static/1` → Pre-rendered post
- `http://localhost:3000/blog-static/3` → 404 page

## Combining SSG with API Routes

Fetch data from an internal API route for SSG.

### Step 1: Update the Blog Posts Page
Fetch posts from `/api/posts`.

::Editor
#title
src/app/blog/posts/page.tsx (updated)

#default

```tsx
import type { Metadata } from 'next';
import Link from 'next/link';

async function fetchPosts() {
  const res = await fetch('http://localhost:3000/api/posts', {
    cache: 'force-cache', // Cache for SSG
  });
  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }
  return res.json();
}

export const metadata: Metadata = {
  title: 'Blog Posts - My Portfolio',
  description: 'List of all blog posts',
};

export default async function Posts() {
  const posts = await fetchPosts();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-700">Blog Posts</h1>
      <ul className="mt-4 space-y-4">
        {posts.length === 0 ? (
          <p className="text-gray-700">No posts available.</p>
        ) : (
          posts.map((post: { id: string; title: string; excerpt: string }) => (
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
- Uses `fetch` with `cache: 'force-cache'` to ensure SSG.
- Fetches data from the internal `/api/posts` route.

## Real-World Mini-Project: Static Portfolio Blog

Enhance the portfolio with a static blog section.

**Updated Project Structure**:

```
my-next-app/
├── pages/
│   ├── api/
│   │   ├── legacy-posts.ts
│   ├── blog-static/
│   │   ├── [id].tsx
│   ├── blog-static.tsx
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
- `http://localhost:3000/blog/posts` → Static posts with ISR
- `http://localhost:3000/blog/1` → Static post
- `http://localhost:3000/blog-static` → Pages Router SSG

## Best Practices

### SSG
- Use SSG for content that doesn’t change frequently (e.g., blogs, docs).
- Use `generateStaticParams` (App Router) or `getStaticPaths` (Pages Router) for dynamic routes.
- Cache API responses with `fetch` for SSG.

### ISR
- Use ISR for content that updates periodically (e.g., news, product listings).
- Set appropriate `revalidate` intervals based on content freshness.
- Test ISR behavior in production environments.

### Error Handling
- Handle API errors with try-catch in Server Components.
- Use `notFound()` for missing dynamic routes.
- Provide fallback UI for empty data sets.

## Common Patterns

### Fallback Pages
Enable fallback for dynamic routes in the Pages Router:

::Editor
#title
pages/blog-static/[id].tsx (snippet)

#default

```tsx
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
    fallback: 'blocking', // Render on-demand for unlisted paths
  };
};
```

::

### Environment Variables for API URLs
Use environment variables for API endpoints:

::Editor
#title
.env.local

#default

```
API_URL=http://localhost:3000/api
```

::

::Editor
#title
src/app/blog/posts/page.tsx (snippet)

#default

```tsx
async function fetchPosts() {
  const res = await fetch(`${process.env.API_URL}/posts`, {
    cache: 'force-cache',
  });
  return res.json();
}
```

::

## What’s Next?

In the next tutorial, **Server-Side Rendering**, you’ll learn how to use Next.js for server-side rendering (SSR) to deliver dynamic, user-specific content with optimal performance.

### Key Takeaways:
- Use `generateStaticParams` for SSG in the App Router
- Implement ISR with `revalidate` for periodic updates
- Use `getStaticProps` and `getStaticPaths` in the Pages Router
- Combine SSG with internal API routes
- Cache data for performance
- Follow best practices for static site generation

## Practice Exercise
1. Create a static page in the App Router with `generateStaticParams`.
2. Add ISR to a page with a 60-second revalidation interval.
3. Create a Pages Router page with `getStaticProps` and `getStaticPaths`.
4. Fetch data from an internal API route for SSG.
5. Test static pages and verify ISR behavior.