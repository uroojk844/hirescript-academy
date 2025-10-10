---
title: Server-Side Rendering
description: Learn how to use Next.js for server-side rendering (SSR) to deliver dynamic, user-specific content with optimal performance.
navigation:
  order: 11
---

# Server-Side Rendering

Welcome to the Server-Side Rendering lesson in our **Next.js Tutorial - 20 Modules** series! In this tutorial, you’ll learn how to use **Next.js** for **Server-Side Rendering (SSR)** to generate dynamic, user-specific content on each request. This lesson builds on concepts from **Static Site Generation** and **API Routes Creation**, focusing on rendering pages server-side using the **App Router** and the legacy **Pages Router** with `getServerSideProps`. SSR is ideal for pages requiring fresh data, such as user dashboards or real-time feeds.

In this tutorial, you’ll learn:

- Understanding Server-Side Rendering (SSR) in Next.js
- Implementing SSR in the App Router with Server Components
- Using `getServerSideProps` in the Pages Router
- Fetching data for SSR from APIs
- Handling dynamic routes with SSR
- Best practices for SSR

## What is Server-Side Rendering?

**Server-Side Rendering (SSR)** generates HTML on the server for each request, ensuring the content is up-to-date and tailored to the user. Unlike **Static Site Generation (SSG)**, which pre-renders pages at build time, SSR fetches data and renders the page on-demand, making it suitable for dynamic content.

**Key Benefits**:
- **Dynamic Content**: Delivers fresh data for each request (e.g., user-specific data).
- **SEO**: Pre-rendered HTML is crawlable by search engines.
- **Flexibility**: Ideal for pages with frequently changing data.

**App Router vs. Pages Router**:
- **App Router**: Uses async Server Components for SSR, with dynamic rendering controlled by `dynamic` exports or `fetch` options.
- **Pages Router**: Uses `getServerSideProps` to fetch data on each request.

## Setting Up the Project

Use the Next.js project from the **Static Site Generation** lesson, configured with TypeScript, Tailwind CSS, and the App Router. We’ll continue using the `pages/` directory for Pages Router examples.

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

## Server-Side Rendering in the App Router

In the App Router, SSR is achieved using **Server Components** with dynamic fetching, controlled by `fetch` options or the `dynamic` export.

### Step 1: SSR for a Dashboard Page
Create a dashboard page that fetches user-specific data server-side.

::Editor
#title
src/app/dashboard/page.tsx

#default

```tsx
import type { Metadata } from 'next';

// Mock API function to simulate user data
async function fetchUserData(userId: string) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    id: userId,
    name: 'John Doe',
    email: 'john@example.com',
    lastLogin: new Date().toISOString(),
  };
}

export const metadata: Metadata = {
  title: 'Dashboard - My Portfolio',
  description: 'User dashboard with real-time data',
};

// Force dynamic rendering for SSR
export const dynamic = 'force-dynamic';

export default async function Dashboard() {
  const userId = '123'; // Simulated user ID (e.g., from auth)
  const user = await fetchUserData(userId);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-700">User Dashboard</h1>
      <div className="mt-4 border p-4 rounded">
        <p className="text-gray-700"><strong>Name:</strong> {user.name}</p>
        <p className="text-gray-700"><strong>Email:</strong> {user.email}</p>
        <p className="text-gray-700"><strong>Last Login:</strong> {user.lastLogin}</p>
      </div>
    </div>
  );
}
```

::

**Test URL**: `http://localhost:3000/dashboard`

**Explanation**:
- The page is a Server Component, fetching data server-side for each request.
- `export const dynamic = 'force-dynamic'` ensures SSR by disabling static optimization.
- The `fetchUserData` function simulates a dynamic API call, rendering fresh data on each request.

### Step 2: SSR for Dynamic Routes
Update the blog post page to use SSR for dynamic routes.

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

// Force dynamic rendering for SSR
export const dynamic = 'force-dynamic';

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
- `http://localhost:3000/blog/1` → Renders post server-side
- `http://localhost:3000/blog/3` → 404 page

**Explanation**:
- `dynamic = 'force-dynamic'` ensures the page is rendered server-side for each request.
- Removes `generateStaticParams` to disable SSG for this route.
- The page fetches fresh data on each request, suitable for dynamic content.

## Server-Side Rendering in the Pages Router

In the Pages Router, SSR is achieved using `getServerSideProps`.

### Step 1: SSR with getServerSideProps
Update the dynamic blog page to use `getServerSideProps`.

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

### Step 2: SSR for Dynamic Routes
Add a dynamic route with `getServerSideProps`.

::Editor
#title
pages/blog-dynamic/[id].tsx

#default

```tsx
import type { GetServerSideProps, NextPage } from 'next';

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

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
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
- `http://localhost:3000/blog-dynamic/1` → Renders post server-side
- `http://localhost:3000/blog-dynamic/3` → Shows "Post not found"

## Fetching Data from API Routes for SSR

Use internal API routes for SSR data fetching.

### Step 1: Fetch Posts for SSR
Update the dashboard to fetch data from `/api/posts`.

::Editor
#title
src/app/dashboard/page.tsx (updated)

#default

```tsx
import type { Metadata } from 'next';

// Fetch from internal API
async function fetchPosts() {
  const res = await fetch('http://localhost:3000/api/posts', {
    cache: 'no-store', // Disable caching for SSR
  });
  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }
  return res.json();
}

export const metadata: Metadata = {
  title: 'Dashboard - My Portfolio',
  description: 'User dashboard with real-time data',
};

export const dynamic = 'force-dynamic';

export default async function Dashboard() {
  try {
    const posts = await fetchPosts();
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-blue-700">User Dashboard</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mt-4">Recent Posts</h2>
        <ul className="mt-4 space-y-4">
          {posts.map((post: { id: string; title: string; content: string }) => (
            <li key={post.id} className="border p-4 rounded">
              <h3 className="text-xl font-semibold text-blue-700">{post.title}</h3>
              <p className="text-gray-700">{post.content}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  } catch (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-blue-700">User Dashboard</h1>
        <p className="text-red-700 mt-4">Error loading posts</p>
      </div>
    );
  }
}
```

::

**Test URL**: `http://localhost:3000/dashboard`

**Explanation**:
- Uses `fetch` with `cache: 'no-store'` to ensure fresh data for SSR.
- Fetches from the internal `/api/posts` route.
- Handles errors with a fallback UI.

## Real-World Mini-Project: Dynamic Portfolio Dashboard

Enhance the portfolio with a server-rendered dashboard.

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
```

**Test URLs**:
- `http://localhost:3000/dashboard` → Server-rendered dashboard
- `http://localhost:3000/blog/1` → Server-rendered post
- `http://localhost:3000/blog-dynamic` → Pages Router SSR

## Best Practices

### SSR
- Use SSR for pages requiring fresh, user-specific data.
- Minimize server-side computation to reduce latency.
- Use `dynamic = 'force-dynamic'` or `cache: 'no-store'` for SSR in the App Router.

### Error Handling
- Handle API errors with try-catch in Server Components.
- Provide fallback UI for failed requests.
- Use `notFound()` for invalid dynamic routes.

### Performance
- Cache static assets (e.g., images) to reduce server load.
- Optimize API calls to minimize response times.
- Consider SSG or ISR for content that doesn’t need frequent updates.

## Common Patterns

### Conditional SSR
Conditionally fetch data based on parameters:

::Editor
#title
src/app/dashboard/page.tsx (snippet)

#default

```tsx
export default async function Dashboard({ searchParams }: { searchParams: { userId?: string } }) {
  const userId = searchParams.userId || '123';
  const user = await fetchUserData(userId);
  // ...
}
```

::

### Environment Variables
Use environment variables for API URLs:

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
src/app/dashboard/page.tsx (snippet)

#default

```tsx
async function fetchPosts() {
  const res = await fetch(`${process.env.API_URL}/posts`, {
    cache: 'no-store',
  });
  return res.json();
}
```

::

## What’s Next?

In the next tutorial, **Client-Side Rendering**, you’ll learn how to implement client-side rendering (CSR) in Next.js for highly interactive applications using tools like `useEffect`, SWR, or React Query.

### Key Takeaways:
- Use Server Components with `dynamic = 'force-dynamic'` for SSR in the App Router
- Use `getServerSideProps` for SSR in the Pages Router
- Fetch fresh data for each request in SSR
- Handle errors and invalid routes gracefully
- Optimize SSR for performance
- Follow best practices for dynamic content

## Practice Exercise
1. Create a server-rendered page in the App Router with `dynamic = 'force-dynamic'`.
2. Add a Pages Router page with `getServerSideProps` for SSR.
3. Fetch data from an internal API route for SSR.
4. Implement error handling and fallback UI.
5. Test SSR behavior for dynamic and static routes.