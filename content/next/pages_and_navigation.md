---
title: Pages and Navigation
description: Learn how to enhance page navigation in Next.js using the next/link component, create dynamic page content, and ensure seamless client-side transitions.
navigation:
  order: 4
---

# Pages and Navigation

Welcome to the Pages and Navigation lesson in our **Next.js Tutorial - 20 Modules** series! In this tutorial, you’ll learn how to enhance navigation in a **Next.js** application using the `next/link` component for client-side routing, create dynamic page content, and ensure smooth transitions between pages. This lesson builds on concepts from **File-based Routing System** and **Installation and Setup**, focusing on improving user experience with efficient navigation.

In this tutorial, you’ll learn:

- Using `next/link` for client-side navigation
- Creating dynamic page content with data
- Handling navigation programmatically
- Styling navigation components with Tailwind CSS
- Managing active link states
- Best practices for navigation in Next.js

## Why Client-Side Navigation?

Next.js uses **client-side navigation** to transition between pages without full page reloads, providing a fast and seamless user experience. The `next/link` component enables this by pre-fetching linked pages in the background, reducing latency.

**Key Benefits**:
- **Faster Transitions**: Client-side rendering avoids server round-trips.
- **Pre-fetching**: Automatically loads linked pages for instant navigation.
- **SEO-Friendly**: Works with server-rendered and static pages.
- **Simplified API**: No need for external routing libraries like React Router.

## Setting Up the Project

Use the Next.js project from the **File-based Routing System** lesson, configured with TypeScript, Tailwind CSS, and the App Router.

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

## Using `next/link` for Client-Side Navigation

The `next/link` component enables client-side navigation by wrapping anchor tags (`<a>`).

### Step 1: Add Navigation to the Root Layout
Update the root layout to include a navigation bar.

::Editor
#title
src/app/layout.tsx

#default

```tsx
import type { Metadata } from 'next';
import Link from 'next/link';
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
      <body className="bg-gray-100">
        <header className="bg-blue-600 text-white p-4">
          <nav className="max-w-4xl mx-auto flex space-x-4">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <Link href="/about" className="hover:underline">
              About
            </Link>
            <Link href="/blog" className="hover:underline">
              Blog
            </Link>
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
            <Link href="/login" className="hover:underline">
              Login
            </Link>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
```

::

**Test URLs**:
- `http://localhost:3000/` → Homepage with navigation bar
- `http://localhost:3000/about` → About page with navigation bar

**Explanation**:
- `Link` from `next/link` enables client-side navigation.
- The navigation bar is included in the root `layout.tsx`, so it appears on all pages.
- Tailwind CSS classes style the navigation bar.

### Step 2: Style the Homepage
Update the homepage to include a welcoming message and navigation links.

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
          Learn About Me
        </Link>
        <Link href="/blog" className="text-blue-500 hover:underline">
          Read My Blog
        </Link>
        <Link href="/contact" className="text-blue-500 hover:underline">
          Contact Me
        </Link>
      </div>
    </main>
  );
}
```

::

**Test URL**: `http://localhost:3000`

**Browser Output**:
A styled homepage with a navigation bar at the top and links below the welcome message.

## Managing Active Link States

Highlight the active link to improve user experience.

### Step 1: Create a Navigation Component
Create a reusable navigation component with active link styling.

::Editor
#title
src/components/NavBar.tsx

#default

```tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
  { href: '/login', label: 'Login' },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <header className="bg-blue-600 text-white p-4">
      <nav className="max-w-4xl mx-auto flex space-x-4">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`hover:underline ${
              pathname === link.href ? 'font-bold underline' : ''
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
```

::

**Explanation**:
- `'use client'`: Marks the component as client-side, required for hooks like `usePathname`.
- `usePathname`: Gets the current URL path to determine the active link.
- Active links are styled with `font-bold` and `underline`.

### Step 2: Update the Root Layout
Use the `NavBar` component in the layout.

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
      <body className="bg-gray-100">
        <NavBar />
        <main>{children}</main>
      </body>
    </html>
  );
}
```

::

**Test URLs**:
- `http://localhost:3000/` → Highlights “Home” in the nav bar
- `http://localhost:3000/about` → Highlights “About” in the nav bar

## Programmatic Navigation

Navigate programmatically using the `next/navigation` hooks.

### Step 1: Add a Button for Navigation
Update the blog post page to include a button that navigates back to the blog home.

::Editor
#title
src/app/blog/[id]/page.tsx

#default

```tsx
'use client';

import type { Metadata } from 'next';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-blue-700">Blog Post {params.id}</h1>
      <p className="mt-4 text-lg text-gray-700">
        This is the content for blog post {params.id}.
      </p>
      <button
        onClick={() => router.push('/blog')}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Back to Blog
      </button>
    </main>
  );
}
```

::

**Test URL**: `http://localhost:3000/blog/123`

**Browser Output**:
Displays the blog post with a “Back to Blog” button that navigates to `/blog`.

**Explanation**:
- `'use client'`: Enables client-side hooks.
- `useRouter`: Provides programmatic navigation methods like `push` and `back`.

## Creating Dynamic Page Content

Generate dynamic content for the blog posts page using mock data.

::Editor
#title
src/app/blog/posts/page.tsx

#default

```tsx
import Link from 'next/link';

const posts = [
  { id: '1', title: 'First Post', excerpt: 'This is my first blog post.' },
  { id: '2', title: 'Second Post', excerpt: 'Exploring Next.js features.' },
];

export default function Posts() {
  return (
    <main className="flex min-h-screen flex-col items-center p-6">
      <h1 className="text-4xl font-bold text-blue-700">Blog Posts</h1>
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
    </main>
  );
}
```

::

**Test URL**: `http://localhost:3000/blog/posts`

**Browser Output**:
Lists blog posts with clickable titles linking to dynamic routes (e.g., `/blog/1`).

## Real-World Mini-Project: Portfolio Navigation

Enhance the portfolio with a dynamic navigation system.

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
          Learn About Me
        </Link>
        <Link href="/blog" className="text-blue-500 hover:underline">
          Read My Blog
        </Link>
        <Link href="/contact" className="text-blue-500 hover:underline">
          Contact Me
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
│   ├── components/
│   │   ├── NavBar.tsx
│   ├── styles/
│   │   ├── globals.css
```

**Test URLs**:
- `http://localhost:3000/` → Homepage with navigation
- `http://localhost:3000/blog/posts` → Blog posts list
- `http://localhost:3000/blog/1` → Blog post with back button

## Best Practices

### Navigation
- Use `next/link` for all internal links to enable client-side navigation.
- Avoid `<a>` tags without `Link` for internal routes to prevent full reloads.
- Use `useRouter` for programmatic navigation (e.g., form submissions).

### Styling
- Leverage Tailwind CSS for consistent navigation styling.
- Highlight active links with `usePathname`.
- Keep navigation components reusable (e.g., `NavBar.tsx`).

### Performance
- Benefit from `next/link`’s automatic pre-fetching.
- Minimize client-side JavaScript by using server components where possible.

## Common Patterns

### Scroll Restoration
Next.js handles scroll restoration automatically, but you can customize it in `next.config.js`:

::Editor
#title
next.config.js

#default

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    scrollRestoration: true,
  },
};

module.exports = nextConfig;
```

::

### Prefetching Control
Disable prefetching for specific links:

::Editor
#title
src/app/page.tsx (snippet)

#default

```tsx
<Link href="/blog" prefetch={false} className="text-blue-500 hover:underline">
  Blog
</Link>
```

::

## What’s Next?

In the next tutorial, **Dynamic Routes Parameters**, you’ll learn how to handle dynamic route parameters in more detail, including fetching data for dynamic routes and generating static paths.

### Key Takeaways:
- Use `next/link` for client-side navigation
- Create reusable navigation components
- Highlight active links with `usePathname`
- Navigate programmatically with `useRouter`
- Build dynamic page content with mock data
- Follow best practices for seamless navigation

## Practice Exercise
1. Add a navigation bar to your Next.js project using `next/link`.
2. Create a reusable `NavBar` component with active link highlighting.
3. Add a dynamic posts page with mock data and links to individual posts.
4. Implement a “Back” button using `useRouter` on a dynamic route.
5. Test navigation across all pages.