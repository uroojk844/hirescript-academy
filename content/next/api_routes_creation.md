---
title: API Routes Creation
description: Learn how to create API routes in Next.js to build backend functionality, handle requests, and integrate with frontend pages.
navigation:
  order: 9
---

# API Routes Creation

Welcome to the API Routes Creation lesson in our **Next.js Tutorial - 20 Modules** series! In this tutorial, you’ll learn how to create **API routes** in **Next.js** to build backend functionality within your application. This lesson builds on concepts from **Data Fetching Methods** and **Server and Client Components**, focusing on creating server-side endpoints to handle HTTP requests and integrating them with your frontend. We’ll cover API routes in both the **App Router** and the legacy **Pages Router** for a comprehensive understanding.

In this tutorial, you’ll learn:

- Understanding API routes in Next.js
- Creating API routes in the App Router
- Creating API routes in the Pages Router
- Handling HTTP methods (GET, POST, etc.)
- Consuming API routes in frontend pages
- Best practices for API routes

## What are API Routes?

**API routes** in Next.js allow you to create server-side endpoints within your application, enabling backend functionality without a separate server. These routes can handle HTTP requests (GET, POST, PUT, DELETE, etc.) and return JSON responses, making them ideal for building RESTful APIs or serverless functions.

**Key Features**:
- **App Router**: API routes are created in `app/api/` with `route.ts` files.
- **Pages Router**: API routes are created in `pages/api/` with `.ts` or `.js` files.
- **Serverless**: Runs as serverless functions on platforms like Vercel.
- **Integrated**: Seamlessly integrate with your Next.js frontend.

**Use Cases**:
- Fetching data from a database or external API
- Handling form submissions
- Authenticating users
- Processing CRUD operations

## Setting Up the Project

Use the Next.js project from the **Data Fetching Methods** lesson, configured with TypeScript, Tailwind CSS, and the App Router. We’ll add API routes in both `app/api/` and `pages/api/` directories.

**Project Structure**:

```
my-next-app/
├── node_modules/
├── pages/
│   ├── api/
│   ├── blog-static.tsx
│   ├── blog-dynamic.tsx
├── src/
│   ├── app/
│   │   ├── api/
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

## Creating API Routes in the App Router

In the App Router, API routes are defined in the `app/api/` directory using `route.ts` files.

### Step 1: Create a GET API Route
Create an API route to fetch blog posts.

::Editor
#title
src/app/api/posts/route.ts

#default

```ts
import { NextResponse } from 'next/server';

// Mock data
const posts = [
  { id: '1', title: 'First Post', content: 'This is my first blog post.' },
  { id: '2', title: 'Second Post', content: 'Exploring Next.js features.' },
];

export async function GET() {
  return NextResponse.json(posts);
}
```

::

**Test URL**: `http://localhost:3000/api/posts`

**Response**:
```json
[
  { "id": "1", "title": "First Post", "content": "This is my first blog post." },
  { "id": "2", "title": "Second Post", "content": "Exploring Next.js features." }
]
```

**Explanation**:
- `app/api/posts/route.ts` maps to `/api/posts`.
- The `GET` function handles GET requests and returns JSON.
- `NextResponse.json` formats the response with proper headers.

### Step 2: Create a POST API Route
Add a route to create a new post.

::Editor
#title
src/app/api/posts/route.ts (updated)

#default

```ts
import { NextResponse } from 'next/server';

// Mock data
let posts = [
  { id: '1', title: 'First Post', content: 'This is my first blog post.' },
  { id: '2', title: 'Second Post', content: 'Exploring Next.js features.' },
];

export async function GET() {
  return NextResponse.json(posts);
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

  return NextResponse.json(newPost, { status: 201 });
}
```

::

**Test POST Request** (using a tool like Postman or curl):
```bash
curl -X POST http://localhost:3000/api/posts \
-H "Content-Type: application/json" \
-d '{"title":"New Post","content":"This is a new post."}'
```

**Response**:
```json
{
  "id": "3",
  "title": "New Post",
  "content": "This is a new post."
}
```

**Explanation**:
- The `POST` function handles POST requests, parsing the request body.
- Validates input and returns an error if invalid.
- Adds the new post to the mock data (in-memory for demo purposes).

### Step 3: Create a Dynamic API Route
Add a route to fetch a single post by ID.

::Editor
#title
src/app/api/posts/[id]/route.ts

#default

```ts
import { NextResponse } from 'next/server';

// Mock data
const posts = [
  { id: '1', title: 'First Post', content: 'This is my first blog post.' },
  { id: '2', title: 'Second Post', content: 'Exploring Next.js features.' },
];

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const post = posts.find((p) => p.id === params.id);
  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }
  return NextResponse.json(post);
}
```

::

**Test URL**: `http://localhost:3000/api/posts/1`

**Response**:
```json
{
  "id": "1",
  "title": "First Post",
  "content": "This is my first blog post."
}
```

## Creating API Routes in the Pages Router

In the Pages Router, API routes are defined in `pages/api/`.

### Step 1: Create a Pages Router API Route
Add an API route to fetch posts.

::Editor
#title
pages/api/legacy-posts.ts

#default

```ts
import type { NextApiRequest, NextApiResponse } from 'next';

// Mock data
const posts = [
  { id: '1', title: 'First Post', content: 'This is my first blog post.' },
  { id: '2', title: 'Second Post', content: 'Exploring Next.js features.' },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(posts);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
```

::

**Test URL**: `http://localhost:3000/api/legacy-posts`

**Response**:
```json
[
  { "id": "1", "title": "First Post", "content": "This is my first blog post." },
  { "id": "2", "title": "Second Post", "content": "Exploring Next.js features." }
]
```

**Explanation**:
- `pages/api/legacy-posts.ts` maps to `/api/legacy-posts`.
- The `handler` function checks the request method and responds accordingly.

## Consuming API Routes in Frontend Pages

Consume the API routes in a frontend page using client-side fetching.

### Step 1: Update the Blog Client Component
Fetch posts from the `/api/posts` endpoint.

::Editor
#title
src/app/blog/BlogClient.tsx

#default

```tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import SearchBar from '../../components/SearchBar';

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

  const handleSearch = (query: string) => {
    const filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(query.toLowerCase())
    );
    setPosts(filtered);
  };

  if (loading) {
    return <div className="text-center p-6">Loading...</div>;
  }

  if (error) {
    return <div className="text-center p-6 text-red-700">{error}</div>;
  }

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

### Step 2: Create a Form to Add Posts
Add a form to create new posts using the POST API route.

::Editor
#title
src/components/PostForm.tsx

#default

```tsx
'use client';

import { useState } from 'react';

export default function PostForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });
      if (!res.ok) {
        throw new Error('Failed to create post');
      }
      setMessage('Post created successfully!');
      setTitle('');
      setContent('');
    } catch (err) {
      setMessage('Error creating post');
    }
  };

  return (
    <div className="border p-4 rounded">
      <h2 className="text-xl font-semibold text-blue-700">Create a New Post</h2>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div>
          <label htmlFor="title" className="block text-gray-700">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-gray-700">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border p-2 w-full rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Post
        </button>
      </form>
      {message && <p className="mt-4 text-gray-700">{message}</p>}
    </div>
  );
}
```

::

### Step 3: Integrate the Form
Add the form to a new page.

::Editor
#title
src/app/blog/create/page.tsx

#default

```tsx
import type { Metadata } from 'next';
import PostForm from '../../../components/PostForm';

export const metadata: Metadata = {
  title: 'Create Post - My Portfolio',
  description: 'Create a new blog post',
};

export default function CreatePost() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <PostForm />
    </div>
  );
}
```

::

**Test URL**: `http://localhost:3000/blog/create`

## Real-World Mini-Project: Portfolio with API Routes

Enhance the portfolio with API routes for blog functionality.

**Updated Project Structure**:

```
my-next-app/
├── pages/
│   ├── api/
│   │   ├── legacy-posts.ts
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
- `http://localhost:3000/blog` → Fetches posts from `/api/posts`
- `http://localhost:3000/blog/create` → Form to create posts
- `http://localhost:3000/api/posts/1` → Fetches a single post

## Best Practices

### API Routes
- Use App Router API routes (`app/api/`) for new projects.
- Validate request data to prevent errors.
- Return appropriate HTTP status codes (e.g., 200, 404, 400).

### Security
- Sanitize input data to prevent injection attacks.
- Use environment variables for sensitive data (e.g., API keys).
- Implement CORS if needed for external access.

### Performance
- Cache API responses where possible.
- Keep API routes lightweight to minimize serverless cold starts.
- Use Server Components to fetch from API routes internally when possible.

## Common Patterns

### Error Handling
Add error handling to API routes:

::Editor
#title
src/app/api/posts/route.ts (snippet)

#default

```ts
export async function GET() {
  try {
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
```

::

### Environment Variables
Store API keys in `.env.local`:

::Editor
#title
.env.local

#default

```
API_KEY=your-api-key
```

::

::Editor
#title
src/app/api/posts/route.ts (snippet)

#default

```ts
export async function GET() {
  const apiKey = process.env.API_KEY;
  // Use apiKey for external API calls
  return NextResponse.json(posts);
}
```

::

## What’s Next?

In the next tutorial, **Static Site Generation**, you’ll learn how to use Next.js to generate static sites with `generateStaticParams` and Incremental Static Regeneration (ISR) for optimal performance.

### Key Takeaways:
- Create API routes in `app/api/` (App Router) or `pages/api/` (Pages Router)
- Handle GET, POST, and other HTTP methods
- Consume API routes in frontend pages
- Validate and secure API routes
- Use Server Components for internal API calls
- Follow best practices for API development

## Practice Exercise
1. Create an API route in `app/api/` to fetch a list of items.
2. Add a POST API route to create new items.
3. Create a frontend page to consume the API routes.
4. Add error handling and validation to the API routes.
5. Test the API routes using a tool like Postman and the frontend page.