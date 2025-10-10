---
title: Layouts and Templates
description: Learn how to create reusable layouts and templates in Next.js using the App Router to maintain consistent UI across routes.
navigation:
  order: 6
---

# Layouts and Templates

Welcome to the Layouts and Templates lesson in our **Next.js Tutorial - 20 Modules** series! In this tutorial, you’ll learn how to create **layouts** and **templates** in **Next.js** using the **App Router** to maintain consistent UI across routes and enhance your application’s structure. This lesson builds on concepts from **Dynamic Routes Parameters** and **Pages and Navigation**, focusing on organizing shared UI components like headers, footers, and sidebars, and understanding the differences between layouts and templates.

In this tutorial, you’ll learn:

- Understanding layouts and templates in the App Router
- Creating a root layout for global UI
- Building nested layouts for specific routes
- Using templates for per-page UI
- Managing metadata in layouts
- Best practices for layouts and templates

## What are Layouts and Templates?

In Next.js’s App Router, **layouts** and **templates** are used to define shared UI structures for your application:

- **Layouts**: Define a shared UI that wraps child routes, persisting across page navigations (e.g., a navigation bar that remains visible). Layouts maintain state during client-side navigation.
- **Templates**: Similar to layouts but reset on navigation, re-rendering for each page (useful for page-specific transitions or animations).
- **Root Layout**: A mandatory `app/layout.tsx` file that wraps the entire application, including global styles and metadata.
- **Nested Layouts**: Layouts in subdirectories (e.g., `app/blog/layout.tsx`) apply to specific route segments.

**Key Differences**:
- **Layouts** persist state (e.g., a collapsible sidebar stays collapsed).
- **Templates** re-render on each navigation, resetting state.

## Setting Up the Project

Use the Next.js project from the **Dynamic Routes Parameters** lesson, configured with TypeScript, Tailwind CSS, and the App Router.

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

## Creating a Root Layout

The root layout (`app/layout.tsx`) defines the global structure for your application.

### Step 1: Enhance the Root Layout
Update the root layout to include a header, footer, and global metadata.

::Editor
#title
src/app/layout.tsx

#default

```tsx
import type { Metadata } from 'next';
import NavBar from '../components/NavBar';
import './styles/globals.css';

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
      <body className="bg-gray-100 flex flex-col min-h-screen">
        <NavBar />
        <main className="flex-grow">{children}</main>
        <footer className="bg-blue-600 text-white p-4 text-center">
          <p>&copy; {new Date().getFullYear()} My Portfolio. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
```

::

**Explanation**:
- The `NavBar` component (from the previous lesson) provides navigation.
- The `main` tag uses `flex-grow` to ensure the footer stays at the bottom.
- The footer is included in the root layout, appearing on all pages.
- `metadata` sets global SEO properties.

**Test URLs**:
- `http://localhost:3000/` → Homepage with header and footer
- `http://localhost:3000/about` → About page with header and footer

## Creating Nested Layouts

Nested layouts apply to specific route segments, like the blog section.

### Step 1: Update the Blog Layout
Enhance the blog layout to include a sidebar for blog-related routes.

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

**Test URLs**:
- `http://localhost:3000/blog` → Blog page with sidebar
- `http://localhost:3000/blog/posts` → Posts page with sidebar
- `http://localhost:3000/blog/1` → Blog post with sidebar

**Explanation**:
- The layout applies to `/blog` and its child routes (e.g., `/blog/posts`, `/blog/[id]`).
- The sidebar is shared across all blog routes, maintaining state during navigation.
- Tailwind CSS creates a responsive flex layout.

## Using Templates

Templates are similar to layouts but re-render on navigation, resetting state.

### Step 1: Create a Template for Auth Routes
Add a template for the `(auth)` route group to demonstrate re-rendering.

::Editor
#title
src/app/(auth)/template.tsx

#default

```tsx
'use client';

import { useEffect } from 'react';

export default function AuthTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    console.log('Auth template rendered');
  }, []);

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Authentication</h2>
      {children}
    </div>
  );
}
```

::

**Test URLs**:
- `http://localhost:3000/login` → Login page with template
- `http://localhost:3000/signup` → Sign Up page with template

**Explanation**:
- `'use client'`: Required for `useEffect` in the template.
- The `console.log` runs on each navigation, confirming the template re-renders.
- The template wraps `/login` and `/signup` with a centered card UI.

### Step 2: Update Auth Pages
Ensure the login and signup pages use the template.

::Editor
#title
src/app/(auth)/login/page.tsx

#default

```tsx
export default function Login() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-700">Login</h1>
      <p className="mt-4 text-gray-700">Sign in to your account.</p>
    </div>
  );
}
```

::

**Test Navigation**:
Navigate between `/login` and `/signup` to see the console log “Auth template rendered” each time.

## Managing Metadata in Layouts

Layouts can define metadata that applies to all child routes.

### Step 1: Update Blog Layout Metadata
Ensure child routes inherit or override metadata.

::Editor
#title
src/app/blog/posts/page.tsx

#default

```tsx
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog Posts - My Portfolio',
  description: 'List of all blog posts',
};

async function fetchPosts() {
  return [
    { id: '1', title: 'First Post', excerpt: 'This is my first blog post.' },
    { id: '2', title: 'Second Post', excerpt: 'Exploring Next.js features.' },
  ];
}

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

**Explanation**:
- The `metadata` in `posts/page.tsx` overrides the blog layout’s metadata for the `/blog/posts` route.
- Child routes like `/blog/[id]` use `generateMetadata` for dynamic metadata (as seen in the previous lesson).

## Real-World Mini-Project: Portfolio with Layouts

Enhance the portfolio with a consistent layout structure.

::Editor
#title
src/app/layout.tsx (updated)

#default

```tsx
import type { Metadata } from 'next';
import NavBar from '../components/NavBar';
import './styles/globals.css';

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
      <body className="bg-gray-100 flex flex-col min-h-screen">
        <NavBar />
        <main className="flex-grow max-w-4xl mx-auto w-full p-6">{children}</main>
        <footer className="bg-blue-600 text-white p-4 text-center">
          <p>&copy; {new Date().getFullYear()} My Portfolio. All rights reserved.</p>
        </footer>
      </body>
    </html>
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
│   │   │   ├── template.tsx
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
- `http://localhost:3000/` → Homepage with global layout
- `http://localhost:3000/blog` → Blog page with sidebar
- `http://localhost:3000/login` → Login page with template

## Best Practices

### Layouts
- Use layouts for persistent UI (e.g., navigation bars, footers).
- Place shared layouts in parent directories (e.g., `app/blog/layout.tsx`).
- Keep layouts lightweight to avoid performance issues.

### Templates
- Use templates for per-page UI that resets on navigation.
- Mark templates as client components if using hooks.
- Avoid overusing templates; prefer layouts for shared UI.

### Metadata
- Define global metadata in the root layout.
- Override metadata in child routes or pages as needed.
- Use `generateMetadata` for dynamic metadata in dynamic routes.

## Common Patterns

### Conditional Layouts
Apply layouts conditionally based on route:

::Editor
#title
src/app/blog/layout.tsx (snippet)

#default

```tsx
export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const showSidebar = true; // Add logic as needed
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-6">
        {showSidebar && (
          <aside className="w-full md:w-1/4 bg-gray-200 p-4 rounded">
            <h2 className="text-xl font-bold text-blue-700">Blog Menu</h2>
            <ul className="mt-4 space-y-2">
              <li><Link href="/blog" className="text-blue-500 hover:underline">Blog Home</Link></li>
              <li><Link href="/blog/posts" className="text-blue-500 hover:underline">All Posts</Link></li>
            </ul>
          </aside>
        )}
        <section className={showSidebar ? 'w-full md:w-3/4' : 'w-full'}>{children}</section>
      </div>
    </div>
  );
}
```

::

### Shared Layout for Route Group
Create a layout for the `(auth)` group:

::Editor
#title
src/app/(auth)/layout.tsx

#default

```tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Authentication - My Portfolio',
  description: 'Authentication pages for the portfolio',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      {children}
    </div>
  );
}
```

::

**Explanation**:
- The `(auth)` layout centers the auth pages, while the `template.tsx` adds a card UI.

## What’s Next?

In the next tutorial, **Server and Client Components**, you’ll learn how to use React Server Components and Client Components in Next.js to optimize performance and interactivity.

### Key Takeaways:
- Use layouts for persistent, shared UI across routes
- Use templates for per-page UI that resets on navigation
- Create root and nested layouts for consistent design
- Manage metadata in layouts and pages
- Organize layouts in the App Router for modularity
- Follow best practices for layouts and templates

## Practice Exercise
1. Add a footer to the root layout of your Next.js project.
2. Create a nested layout for a new `/portfolio` route with a sidebar.
3. Add a template for the `/docs` route group with a re-rendering effect.
4. Update metadata for a specific route (e.g., `/blog/posts`).
5. Test navigation to ensure layouts and templates apply correctly.