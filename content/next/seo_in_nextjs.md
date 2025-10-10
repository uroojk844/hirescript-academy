---
title: SEO in Next.js
description: Learn how to optimize Next.js applications for search engines using metadata, sitemaps, and structured data for better visibility.
navigation:
  order: 19
---

# SEO in Next.js

Welcome to the SEO in Next.js lesson in our **Next.js Tutorial - 20 Modules** series! In this tutorial, you’ll learn how to optimize **Next.js** applications for search engine optimization (SEO) to improve visibility and rankings. This lesson builds on concepts from **Performance Optimization** and **Testing in Next.js**, focusing on using **dynamic metadata**, **sitemaps**, and **structured data** in the App Router. We’ll enhance the portfolio project to make it more discoverable by search engines.

In this tutorial, you’ll learn:

- Understanding SEO in Next.js
- Configuring dynamic metadata for pages
- Generating static and dynamic sitemaps
- Adding structured data with JSON-LD
- Optimizing for performance and accessibility
- Best practices for SEO

## What is SEO in Next.js?

**Search Engine Optimization (SEO)** involves techniques to improve a website’s visibility in search engine results. In Next.js, SEO is enhanced through server-side rendering (SSR), static site generation (SSG), metadata management, sitemaps, and structured data.

**Key Features**:
- **Metadata**: Define `<title>`, `<meta>` tags, and Open Graph tags for better indexing.
- **Sitemaps**: Provide search engines with a map of your site’s pages.
- **Structured Data**: Use JSON-LD to add context (e.g., schema.org) for rich snippets.
- **Performance**: Leverage Next.js optimizations for faster load times.

**Benefits**:
- Higher search engine rankings
- Improved click-through rates with rich snippets
- Better user experience and accessibility

## Setting Up the Project

Use the Next.js project from the **Performance Optimization** lesson, configured with TypeScript, Tailwind CSS, and the App Router. No additional dependencies are required for this lesson, as Next.js provides built-in SEO features.

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
│   │   ├── ErrorBoundary.tsx
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

## Configuring Dynamic Metadata

Next.js allows dynamic metadata for better SEO using the `Metadata` API.

### Step 1: Update Root Layout Metadata
Add comprehensive metadata to the root layout.

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
  title: {
    default: 'My Portfolio',
    template: '%s | My Portfolio',
  },
  description: 'A Next.js portfolio application showcasing blog posts and user features.',
  keywords: ['Next.js', 'portfolio', 'blog', 'TypeScript', 'Tailwind CSS'],
  openGraph: {
    title: 'My Portfolio',
    description: 'Explore my portfolio with blog posts and user features built with Next.js.',
    url: 'https://my-portfolio.example.com',
    siteName: 'My Portfolio',
    images: [
      {
        url: '/uploads/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'My Portfolio Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'My Portfolio',
    description: 'Explore my portfolio with blog posts and user features.',
    images: ['/uploads/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
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

**Add Open Graph Image**:
Place an `og-image.jpg` in `public/uploads/` for social media previews.

**Test URL**: `http://localhost:3000`

**Explanation**:
- `title.template` ensures consistent page titles (e.g., "Blog | My Portfolio").
- `openGraph` and `twitter` metadata enhance social media sharing.
- `keywords` improve search engine indexing.

### Step 2: Dynamic Metadata for Blog Posts
Add dynamic metadata for individual blog posts.

::Editor
#title
src/app/blog/[id]/page.tsx

#default

```tsx
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

interface Post {
  id: string;
  title: string;
  content: string;
  image?: string;
}

async function fetchPost(id: string): Promise<Post> {
  const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch post');
  }
  return res.json();
}

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await fetchPost(params.id);

  return {
    title: post.title,
    description: post.content.slice(0, 160),
    openGraph: {
      title: post.title,
      description: post.content.slice(0, 160),
      url: `https://my-portfolio.example.com/blog/${post.id}`,
      images: post.image
        ? [
            {
              url: `/uploads/${post.image}`,
              width: 200,
              height: 200,
              alt: post.title,
            },
          ]
        : undefined,
    },
  };
}

export default async function Post({ params }: Props) {
  const post = await fetchPost(params.id);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link href="/blog" className="text-blue-500 hover:underline">
        ← Back to Blog
      </Link>
      <h1 className="text-3xl font-bold text-blue-700 mt-4">{post.title}</h1>
      {post.image && (
        <Image
          src={`/uploads/${post.image}`}
          alt={post.title}
          width={200}
          height={200}
          className="mt-4 rounded"
        />
      )}
      <p className="mt-4 text-gray-700">{post.content}</p>
    </div>
  );
}
```

::

**Test URL**: `http://localhost:3000/blog/1`

**Explanation**:
- `generateMetadata` dynamically sets metadata based on post data.
- The description is truncated to 160 characters for SEO best practices.
- Open Graph images enhance social media previews.

## Generating Sitemaps

Create a sitemap to help search engines crawl your site.

### Step 3: Create a Sitemap Route
Add a dynamic sitemap route.

::Editor
#title
src/app/sitemap.xml/route.ts

#default

```ts
import { NextResponse } from 'next/server';

async function fetchPosts() {
  const res = await fetch('http://localhost:3000/api/posts', {
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }
  return res.json();
}

export async function GET() {
  const posts = await fetchPosts();
  const baseUrl = 'https://my-portfolio.example.com';

  const staticPages = [
    '',
    '/about',
    '/contact',
    '/blog',
    '/blog/posts',
    '/dashboard',
    '/login',
    '/signup',
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages
    .map(
      (path) => `
    <url>
      <loc>${baseUrl}${path}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.7</priority>
    </url>`
    )
    .join('')}
  ${posts
    .map(
      (post: { id: string }) => `
    <url>
      <loc>${baseUrl}/blog/${post.id}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.5</priority>
    </url>`
    )
    .join('')}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
```

::

**Test URL**: `http://localhost:3000/sitemap.xml`

**Explanation**:
- The sitemap includes static pages and dynamic blog posts.
- `lastmod` and `changefreq` help search engines prioritize crawling.
- The `Content-Type` header ensures proper XML rendering.

## Adding Structured Data

Use JSON-LD for structured data to enable rich snippets.

### Step 4: Add Structured Data to Blog Posts
Add schema.org markup to the blog post page.

::Editor
#title
src/app/blog/[id]/page.tsx (updated)

#default

```tsx
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';

interface Post {
  id: string;
  title: string;
  content: string;
  image?: string;
}

async function fetchPost(id: string): Promise<Post> {
  const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch post');
  }
  return res.json();
}

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await fetchPost(params.id);

  return {
    title: post.title,
    description: post.content.slice(0, 160),
    openGraph: {
      title: post.title,
      description: post.content.slice(0, 160),
      url: `https://my-portfolio.example.com/blog/${post.id}`,
      images: post.image
        ? [
            {
              url: `/uploads/${post.image}`,
              width: 200,
              height: 200,
              alt: post.title,
            },
          ]
        : undefined,
    },
  };
}

export default async function Post({ params }: Props) {
  const post = await fetchPost(params.id);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.content.slice(0, 160),
    datePublished: new Date().toISOString(),
    image: post.image ? `https://my-portfolio.example.com/uploads/${post.image}` : undefined,
    author: {
      '@type': 'Person',
      name: 'John Doe',
    },
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Script id="json-ld" type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </Script>
      <Link href="/blog" className="text-blue-500 hover:underline">
        ← Back to Blog
      </Link>
      <h1 className="text-3xl font-bold text-blue-700 mt-4">{post.title}</h1>
      {post.image && (
        <Image
          src={`/uploads/${post.image}`}
          alt={post.title}
          width={200}
          height={200}
          className="mt-4 rounded"
        />
      )}
      <p className="mt-4 text-gray-700">{post.content}</p>
    </div>
  );
}
```

::

**Test URL**: `http://localhost:3000/blog/1`

**Explanation**:
- The `Script` component injects JSON-LD structured data.
- Schema.org `BlogPosting` type enhances search engine understanding.
- Structured data can enable rich snippets in search results.

## Real-World Mini-Project: SEO-Optimized Portfolio

Enhance the portfolio with SEO best practices.

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
│   │   ├── sitemap.xml/
│   │   │   ├── route.ts
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
│   │   ├── ErrorBoundary.tsx
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
│   │   ├── og-image.jpg
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
- `http://localhost:3000/` → Root page with metadata
- `http://localhost:3000/blog/1` → Blog post with dynamic metadata and structured data
- `http://localhost:3000/sitemap.xml` → Sitemap for crawling

## Best Practices

### Metadata
- Use dynamic metadata for unique page titles and descriptions.
- Include Open Graph and Twitter Card tags for social sharing.
- Keep descriptions under 160 characters for SEO.

### Sitemaps
- Generate dynamic sitemaps for large sites.
- Submit sitemaps to Google Search Console.
- Update `lastmod` for frequently changing pages.

### Structured Data
- Use schema.org types relevant to your content (e.g., `BlogPosting`, `Article`).
- Validate structured data with Google’s Rich Results Test.
- Include only relevant fields to avoid clutter.

### Performance and Accessibility
- Combine SEO with performance optimizations (e.g., ISR, image optimization).
- Ensure accessibility with semantic HTML and ARIA attributes.
- Use tools like Lighthouse to audit SEO and accessibility.

## Common Patterns

### Robots.txt
Add a `robots.txt` file to control crawling:

::Editor
#title
public/robots.txt

#default

```
User-agent: *
Allow: /
Sitemap: https://my-portfolio.example.com/sitemap.xml
Disallow: /dashboard
Disallow: /login
Disallow: /signup
```

::

### Canonical URLs
Add canonical tags to avoid duplicate content:

::Editor
#title
src/app/blog/[id]/page.tsx (snippet)

#default

```tsx
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await fetchPost(params.id);

  return {
    title: post.title,
    description: post.content.slice(0, 160),
    alternates: {
      canonical: `https://my-portfolio.example.com/blog/${post.id}`,
    },
    // ... other metadata
  };
}
```

::

## What’s Next?

In the next tutorial, **Deployment**, you’ll learn how to deploy your Next.js application to platforms like Vercel, Netlify, or AWS.

### Key Takeaways:
- Configure dynamic metadata for SEO-friendly pages
- Generate sitemaps for better crawling
- Add structured data for rich snippets
- Combine SEO with performance and accessibility
- Follow best practices for maximum visibility
- Use tools to validate SEO implementation

## Practice Exercise
1. Add dynamic metadata to a page (e.g., blog post).
2. Create a sitemap for static and dynamic routes.
3. Implement JSON-LD structured data for blog posts.
4. Add Open Graph and Twitter Card metadata.
5. Test SEO with Lighthouse or Google’s Rich Results Test.