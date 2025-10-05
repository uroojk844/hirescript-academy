---
title: File-based Routing System
description: Learn how to use Next.js’s file-based routing system with the App Router to create static, dynamic, and nested routes for your application.
navigation:
  order: 3
---

# File-based Routing System

Welcome to the File-based Routing System lesson in our **Next.js Tutorial - 20 Modules** series! In this tutorial, you’ll learn how to use **Next.js’s file-based routing system** with the **App Router** to create static, dynamic, and nested routes for your web application. This lesson builds on concepts from **Installation and Setup** and **Introduction to Next.js**, focusing on how Next.js simplifies routing by mapping files in the `app/` directory to URL paths.

In this tutorial, you’ll learn:

- Understanding the App Router in Next.js
- Creating static routes with files
- Building nested routes with folders
- Implementing dynamic routes with parameters
- Using route groups for organization
- Best practices for organizing routes

## What is the File-based Routing System?

Next.js uses a **file-based routing system**, where the file and folder structure in the `app/` directory (or `pages/` in legacy projects) defines the routes of your application. With the **App Router** (introduced in Next.js 13), you can create routes using files like `page.tsx` and `layout.tsx`, with enhanced support for nested layouts, dynamic routes, and route groups.

**Key Concepts**:
- **Page**: A `page.tsx` file defines a route’s content (e.g., `app/about/page.tsx` maps to `/about`).
- **Layout**: A `layout.tsx` file defines a shared UI for a route and its children.
- **Dynamic Routes**: Use square brackets for dynamic segments (e.g., `app/blog/[id]/page.tsx` for `/blog/123`).
- **Route Groups**: Use parentheses to group routes without affecting the URL (e.g., `app/(auth)/login/page.tsx` maps to `/login`).

## Setting Up the Project

Use the Next.js project from the **Installation and Setup** lesson, configured with TypeScript, Tailwind CSS, and the App Router.

**Project Structure**:

```
my-next-app/
├── node_modules/
├── public/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
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

## Creating Static Routes

Static routes are created by adding `page.tsx` files in the `app/` directory.

### Step 1: Create an About Page
Add a new page for the `/about` route.

::Editor
#title
src/app/about/page.tsx

#default

```tsx
export default function About() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-blue-700">About Us</h1>
      <p className="mt-4 text-lg text-gray-700">
        This is the About page for our Next.js application.
      </p>
    </main>
  );
}
```

::

**Test URL**: `http://localhost:3000/about`

**Browser Output**:
```
About Us
This is the About page for our Next.js application.
```

**Explanation**:
- `app/about/page.tsx` maps to the `/about` route.
- The `page.tsx` file defines the content for the route.

### Step 2: Create a Contact Page
Add a page for the `/contact` route.

::Editor
#title
src/app/contact/page.tsx

#default

```tsx
export default function Contact() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-blue-700">Contact Us</h1>
      <p className="mt-4 text-lg text-gray-700">
        Reach out to us via this Contact page.
      </p>
    </main>
  );
}
```

::

**Test URL**: `http://localhost:3000/contact`

## Creating Nested Routes

Nested routes are created by organizing files in subdirectories.

### Step 1: Create a Blog Section
Add a nested route for `/blog` and `/blog/posts`.

::Editor
#title
src/app/blog/page.tsx

#default

```tsx
export default function Blog() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-blue-700">Blog</h1>
      <p className="mt-4 text-lg text-gray-700">
        Welcome to our blog section.
      </p>
    </main>
  );
}
```

::

::Editor
#title
src/app/blog/posts/page.tsx

#default

```tsx
export default function Posts() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-blue-700">Blog Posts</h1>
      <p className="mt-4 text-lg text-gray-700">
        Browse all blog posts here.
      </p>
    </main>
  );
}
```

::

**Test URLs**:
- `http://localhost:3000/blog` → Blog page
- `http://localhost:3000/blog/posts` → Posts page

**Explanation**:
- `app/blog/page.tsx` maps to `/blog`.
- `app/blog/posts/page.tsx` maps to `/blog/posts`.

### Step 2: Add a Shared Layout
Create a layout for the blog section to share UI across its routes.

::Editor
#title
src/app/blog/layout.tsx

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
    <div>
      <nav className="p-4 bg-blue-600 text-white">
        <ul className="flex space-x-4">
          <li><Link href="/blog" className="hover:underline">Blog Home</Link></li>
          <li><Link href="/blog/posts" className="hover:underline">Posts</Link></li>
        </ul>
      </nav>
      {children}
    </div>
  );
}
```

::

**Test URLs**:
- `http://localhost:3000/blog` → Blog page with navigation
- `http://localhost:3000/blog/posts` → Posts page with navigation

**Explanation**:
- `app/blog/layout.tsx` applies to `/blog` and all its child routes (e.g., `/blog/posts`).
- The `children` prop renders the content of the child page.

## Creating Dynamic Routes

Dynamic routes use square brackets for URL parameters (e.g., `[id]`).

### Step 1: Create a Dynamic Blog Post Route
Add a page for individual blog posts at `/blog/[id]`.

::Editor
#title
src/app/blog/[id]/page.tsx

#default

```tsx
import { use } from 'react';

interface Params {
  params: { id: string };
}

export default function BlogPost({ params }: Params) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-blue-700">Blog Post {params.id}</h1>
      <p className="mt-4 text-lg text-gray-700">
        This is the content for blog post {params.id}.
      </p>
    </main>
  );
}
```

::

**Test URL**: `http://localhost:3000/blog/123`

**Browser Output**:
```
Blog Post 123
This is the content for blog post 123.
```

**Explanation**:
- `app/blog/[id]/page.tsx` captures the `id` parameter from the URL.
- The `params` prop provides access to dynamic segments (e.g., `id`).

### Step 2: Add Dynamic Metadata
Update the blog post page to include dynamic metadata.

::Editor
#title
src/app/blog/[id]/page.tsx

#default

```tsx
import type { Metadata } from 'next';

interface Params {
  params: { id: string };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  return {
    title: `Blog Post ${params.id}`,
    description: `Content for blog post ${params.id}`,
  };
}

export default function BlogPost({ params }: Params) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-blue-700">Blog Post {params.id}</h1>
      <p className="mt-4 text-lg text-gray-700">
        This is the content for blog post {params.id}.
      </p>
    </main>
  );
}
```

::

**Explanation**:
- `generateMetadata` dynamically sets the page’s title and description based on the `id` parameter.

## Using Route Groups

Route groups organize routes without affecting the URL structure.

### Step 1: Create an Auth Group
Group authentication-related routes (e.g., `/login`, `/signup`).

::Editor
#title
src/app/(auth)/login/page.tsx

#default

```tsx
export default function Login() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-blue-700">Login</h1>
      <p className="mt-4 text-lg text-gray-700">
        Sign in to your account.
      </p>
    </main>
  );
}
```

::

::Editor
#title
src/app/(auth)/signup/page.tsx

#default

```tsx
export default function Signup() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-blue-700">Sign Up</h1>
      <p className="mt-4 text-lg text-gray-700">
        Create a new account.
      </p>
    </main>
  );
}
```

::

**Test URLs**:
- `http://localhost:3000/login` → Login page
- `http://localhost:3000/signup` → Sign Up page

**Explanation**:
- The `(auth)` folder groups routes without adding `/auth` to the URL.
- Routes like `app/(auth)/login/page.tsx` map to `/login`.

## Real-World Mini-Project: Portfolio with Routes

Build a portfolio with static, nested, and dynamic routes.

::Editor
#title
src/app/page.tsx

#default

```tsx
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <h1 className="text-5xl font-bold text-blue-700">My Portfolio</h1>
      <p className="mt-4 text-xl text-gray-700">
        Welcome to my Next.js portfolio.
      </p>
      <div className="mt-6 space-x-4">
        <Link href="/about" className="text-blue-500 hover:underline">
          About
        </Link>
        <Link href="/blog" className="text-blue-500 hover:underline">
          Blog
        </Link>
        <Link href="/login" className="text-blue-500 hover:underline">
          Login
        </Link>
      </div>
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
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   │   ├── page.tsx
│   │   │   ├── signup/
│   │   │   │   ├── page.tsx
```

**Test URLs**:
- `http://localhost:3000/` → Homepage
- `http://localhost:3000/about` → About page
- `http://localhost:3000/blog` → Blog page
- `http://localhost:3000/blog/posts` → Posts page
- `http://localhost:3000/blog/123` → Blog post with ID 123
- `http://localhost:3000/login` → Login page

## Best Practices

### Routing
- Use meaningful file and folder names for routes.
- Leverage `layout.tsx` for shared UI across related routes.
- Use route groups to organize routes without affecting URLs.

### Organization
- Keep the `app/` directory clean and modular.
- Use dynamic routes for parameterized URLs.
- Add metadata for SEO in each route.

### Development
- Test routes during development with `npm run dev`.
- Use `Link` from `next/link` for client-side navigation.

## Common Patterns

### Catch-All Routes
Handle multiple dynamic segments (e.g., `/blog/*`):

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

**Test URL**: `http://localhost:3000/blog/a/b/c` → Displays `Slug: a/b/c`

### Not Found Page
Create a custom 404 page:

::Editor
#title
src/app/not-found.tsx

#default

```tsx
export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-red-700">404 - Page Not Found</h1>
      <p className="mt-4 text-lg text-gray-700">
        The page you’re looking for doesn’t exist.
      </p>
    </main>
  );
}
```

::

**Test URL**: `http://localhost:3000/unknown` → Displays 404 page

## What’s Next?

In the next tutorial, **Pages and Navigation**, you’ll learn how to enhance page navigation using `next/link`, create dynamic page content, and handle client-side transitions for a seamless user experience.

### Key Takeaways:
- Next.js App Router maps files to routes
- Create static routes with `page.tsx`
- Build nested routes with folders
- Implement dynamic routes with `[param]`
- Use route groups for organization
- Follow best practices for clean routing

## Practice Exercise
1. Create a new Next.js project with the App Router.
2. Add static routes for `/home`, `/about`, and `/services`.
3. Create a nested route for `/products/list`.
4. Implement a dynamic route for `/products/[id]`.
5. Add a route group for `/login` and `/signup`.
6. Test all routes in the browser.