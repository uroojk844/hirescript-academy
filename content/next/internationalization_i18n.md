---
title: Internationalization (i18n)
description: Learn how to add multi-language support to Next.js applications using i18n routing, translation management, and locale switching.
navigation:
  order: 21
---

# Internationalization (i18n)

Welcome to the final lesson in our **Next.js Tutorial - 20 Modules** series! In this tutorial, you’ll learn how to implement **Internationalization (i18n)** in a Next.js application to support multiple languages and locales. This lesson builds on concepts from **SEO in Next.js** and **Performance Optimization**, focusing on using Next.js i18n routing, a translation library (`next-intl`), and a locale switcher in the App Router. We’ll enhance the portfolio project to support English (`en`) and Spanish (`es`) locales.

In this tutorial, you’ll learn:

- Understanding i18n in Next.js
- Setting up i18n routing in the App Router
- Managing translations with `next-intl`
- Creating a locale switcher
- Localizing dynamic pages and metadata
- Best practices for i18n

## What is Internationalization (i18n)?

**Internationalization (i18n)** is the process of designing an application to support multiple languages and regional settings. In Next.js, i18n enables locale-based routing, translation management, and localized content delivery.

**Key Features**:
- **i18n Routing**: Automatically handle locale-based URLs (e.g., `/en/blog`, `/es/blog`).
- **Translation Management**: Store and retrieve translations for UI text.
- **Locale Switching**: Allow users to switch languages dynamically.
- **Localized Metadata**: Provide locale-specific SEO metadata.

**Benefits**:
- Reach a global audience with localized content.
- Improve user experience with native language support.
- Enhance SEO for different regions.

## Setting Up the Project

Use the Next.js project from the **SEO in Next.js** lesson, configured with TypeScript, Tailwind CSS, and the App Router. Install the `next-intl` library for translation management.

**Install next-intl**:
```bash
npm install next-intl
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
│   │   ├── [locale]/
│   │   │   ├── api/
│   │   │   │   ├── auth/
│   │   │   │   │   ├── [...nextauth]/
│   │   │   │   │   │   ├── route.ts
│   │   │   │   │   ├── login/
│   │   │   │   │   │   ├── route.ts
│   │   │   │   ├── posts/
│   │   │   │   │   ├── route.ts
│   │   │   │   ├── posts/[id]/
│   │   │   │   │   ├── route.ts
│   │   │   │   ├── user/
│   │   │   │   │   ├── route.ts
│   │   │   │   ├── feedback/
│   │   │   │   │   ├── route.ts
│   │   │   │   ├── upload/
│   │   │   │   │   ├── route.ts
│   │   │   ├── sitemap.xml/
│   │   │   │   ├── route.ts
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── dashboard/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── client/
│   │   │   │   │   ├── page.tsx
│   │   │   │   ├── custom/
│   │   │   │   │   ├── page.tsx
│   │   │   ├── about/
│   │   │   │   ├── page.tsx
│   │   │   ├── contact/
│   │   │   │   ├── page.tsx
│   │   │   ├── blog/
│   │   │   │   ├── layout.tsx
│   │   │   │   ├── page.tsx
│   │   │   │   ├── BlogClient.tsx
│   │   │   │   ├── posts/
│   │   │   │   │   ├── page.tsx
│   │   │   │   ├── create/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   ├── action.ts
│   │   │   │   ├── upload/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   ├── action.ts
│   │   │   │   ├── [id]/
│   │   │   │   │   ├── page.tsx
│   │   │   │   ├── [...slug]/
│   │   │   │   │   ├── page.tsx
│   │   │   ├── docs/
│   │   │   │   ├── [[...slug]]/
│   │   │   │   │   ├── page.tsx
│   │   │   ├── (auth)/
│   │   │   │   ├── template.tsx
│   │   │   │   ├── login/
│   │   │   │   │   ├── page.tsx
│   │   │   │   ├── custom-login/
│   │   │   │   │   ├── page.tsx
│   │   │   │   ├── signup/
│   │   │   │   │   ├── page.tsx
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
│   ├── i18n/
│   │   ├── en.json
│   │   ├── es.json
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

**Test URL**: `http://localhost:3000/en`

## Setting Up i18n Routing

Configure Next.js for locale-based routing.

### Step 1: Update next.config.js
Enable i18n routing for English (`en`) and Spanish (`es`).

::Editor
#title
next.config.js

#default

```js
/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  images: {
    domains: ['localhost'],
  },
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'en',
    localeDetection: true,
  },
});
```

::

**Explanation**:
- `locales`: Defines supported languages (`en`, `es`).
- `defaultLocale`: Sets English as the fallback.
- `localeDetection`: Automatically detects the user’s preferred locale.

### Step 2: Restructure App Directory
Move the app contents into a `[locale]` folder to support i18n routing.

1. Create a `src/app/[locale]` folder.
2. Move all contents from `src/app/` (except `api` and `sitemap.xml`) into `src/app/[locale]`.
3. Update import paths in affected files (e.g., `NavBar.tsx`, `BlogClient.tsx`) to reflect the new structure.

**Example Path Update** in `NavBar.tsx`:
```tsx
import { ThemeProvider } from '../../context/ThemeContext';
```

**Test URLs**:
- `http://localhost:3000/en`
- `http://localhost:3000/es`

## Managing Translations with next-intl

Use `next-intl` to manage translations.

### Step 3: Set Up Translation Files
Create translation files for English and Spanish.

::Editor
#title
src/i18n/en.json

#default

```json
{
  "NavBar": {
    "home": "My Portfolio",
    "about": "About",
    "blog": "Blog",
    "contact": "Contact",
    "dashboard": "Dashboard",
    "login": "Login",
    "signout": "Sign Out"
  },
  "Blog": {
    "title": "Blog",
    "searchPlaceholder": "Search posts...",
    "resetPosts": "Reset Posts",
    "createPost": "Create Post",
    "backToBlog": "Back to Blog"
  },
  "CreatePost": {
    "title": "Create Post",
    "formTitle": "Title",
    "formContent": "Content",
    "submit": "Create Post"
  }
}
```

::

::Editor
#title
src/i18n/es.json

#default

```json
{
  "NavBar": {
    "home": "Mi Portafolio",
    "about": "Acerca de",
    "blog": "Blog",
    "contact": "Contacto",
    "dashboard": "Panel",
    "login": "Iniciar Sesión",
    "signout": "Cerrar Sesión"
  },
  "Blog": {
    "title": "Blog",
    "searchPlaceholder": "Buscar publicaciones...",
    "resetPosts": "Restablecer Publicaciones",
    "createPost": "Crear Publicación",
    "backToBlog": "Volver al Blog"
  },
  "CreatePost": {
    "title": "Crear Publicación",
    "formTitle": "Título",
    "formContent": "Contenido",
    "submit": "Crear Publicación"
  }
}
```

::

### Step 4: Configure next-intl
Create a middleware and provider for translations.

::Editor
#title
src/middleware.ts

#default

```ts
import { NextResponse } from 'next/server';
import { createMiddleware } from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'es'],
  defaultLocale: 'en',
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
```

::

::Editor
#title
src/app/[locale]/layout.tsx

#default

```tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import '../globals.css';
import { ThemeProvider } from '../../context/ThemeContext';
import { Provider } from 'react-redux';
import { store } from '../../store';
import NavBar from '../../components/NavBar';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'My Portfolio',
    template: '%s | My Portfolio',
  },
  description: 'A Next.js portfolio application showcasing blog posts and user features.',
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  let messages;
  try {
    messages = (await import(`../../i18n/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Provider store={store}>
            <ThemeProvider>
              <NavBar />
              <main className="min-h-screen">{children}</main>
              <Analytics />
            </ThemeProvider>
          </Provider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

::

**Explanation**:
- The middleware handles locale routing.
- `NextIntlClientProvider` provides translations to client components.
- Dynamic import of translation files based on locale.

## Creating a Locale Switcher

Add a locale switcher to the `NavBar`.

### Step 5: Update NavBar with Locale Switcher
Modify the `NavBar` to include a dropdown for switching locales.

::Editor
#title
src/components/NavBar.tsx

#default

```tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useSession, signOut } from 'next-auth/react';

export default function NavBar() {
  const pathname = usePathname();
  const t = useTranslations('NavBar');
  const { data: session } = useSession();

  const switchLocale = (locale: string) => {
    const newPath = pathname.replace(/^\/(en|es)/, `/${locale}`);
    window.location.href = newPath;
  };

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          {t('home')}
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/about" className="hover:underline">
            {t('about')}
          </Link>
          <Link href="/blog" className="hover:underline">
            {t('blog')}
          </Link>
          <Link href="/contact" className="hover:underline">
            {t('contact')}
          </Link>
          <Link href="/dashboard" className="hover:underline">
            {t('dashboard')}
          </Link>
          {session ? (
            <button
              onClick={() => signOut()}
              className="hover:underline"
            >
              {t('signout')}
            </button>
          ) : (
            <Link href="/login" className="hover:underline">
              {t('login')}
            </Link>
          )}
          <select
            onChange={(e) => switchLocale(e.target.value)}
            value={pathname.startsWith('/es') ? 'es' : 'en'}
            className="bg-blue-500 text-white p-2 rounded"
          >
            <option value="en">English</option>
            <option value="es">Español</option>
          </select>
        </div>
      </div>
    </nav>
  );
}
```

::

**Test URLs**:
- `http://localhost:3000/en/blog`
- `http://localhost:3000/es/blog`

**Explanation**:
- `useTranslations` retrieves translations for the `NavBar` namespace.
- The locale switcher updates the URL to reflect the selected locale.

## Localizing Dynamic Pages and Metadata

Localize the blog page and its metadata.

### Step 6: Update Blog Page
Use translations in the `BlogClient` component.

::Editor
#title
src/app/[locale]/blog/BlogClient.tsx

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
import { useTranslations } from 'next-intl';

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
  const t = useTranslations('Blog');

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
    return <div className="text-center p-6">{t('loading')}</div>;
  }

  if (status === 'failed') {
    return <div className="text-center p-6 text-red-700">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-700">{t('title')}</h1>
      <div className="my-4">
        <SearchBar onSearch={handleSearch} />
      </div>
      <button
        onClick={() => dispatch(resetPosts())}
        className="mb-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        {t('resetPosts')}
      </button>
      <Link
        href="/blog/create"
        className="mb-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {t('createPost')}
      </Link>
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

**Update Translation Files**:
Add loading state translation:

::Editor
#title
src/i18n/en.json (snippet)

#default

```json
{
  "Blog": {
    "loading": "Loading..."
  }
}
```

::

::Editor
#title
src/i18n/es.json (snippet)

#default

```json
{
  "Blog": {
    "loading": "Cargando..."
  }
}
```

::

### Step 7: Localize Metadata
Update metadata to support multiple languages.

::Editor
#title
src/app/[locale]/layout.tsx (updated metadata)

#default

```tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import '../globals.css';
import { ThemeProvider } from '../../context/ThemeContext';
import { Provider } from 'react-redux';
import { store } from '../../store';
import NavBar from '../../components/NavBar';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] });

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const messages = (await import(`../../i18n/${locale}.json`)).default;

  return {
    title: {
      default: messages.NavBar.home,
      template: `%s | ${messages.NavBar.home}`,
    },
    description: locale === 'en'
      ? 'A Next.js portfolio application showcasing blog posts and user features.'
      : 'Una aplicación de portafolio en Next.js que muestra publicaciones de blog y funciones de usuario.',
  };
}

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  let messages;
  try {
    messages = (await import(`../../i18n/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Provider store={store}>
            <ThemeProvider>
              <NavBar />
              <main className="min-h-screen">{children}</main>
              <Analytics />
            </ThemeProvider>
          </Provider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

::

**Test URLs**:
- `http://localhost:3000/en/blog`
- `http://localhost:3000/es/blog`

**Explanation**:
- The blog page uses `useTranslations` for localized text.
- Metadata is dynamically generated based on the locale.

## Real-World Mini-Project: i18n Portfolio

Enhance the portfolio with multi-language support.

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
│   │   ├── [locale]/
│   │   │   ├── api/
│   │   │   │   ├── auth/
│   │   │   │   │   ├── [...nextauth]/
│   │   │   │   │   │   ├── route.ts
│   │   │   │   │   ├── login/
│   │   │   │   │   │   ├── route.ts
│   │   │   │   ├── posts/
│   │   │   │   │   ├── route.ts
│   │   │   │   ├── posts/[id]/
│   │   │   │   │   ├── route.ts
│   │   │   │   ├── user/
│   │   │   │   │   ├── route.ts
│   │   │   │   ├── feedback/
│   │   │   │   │   ├── route.ts
│   │   │   │   ├── upload/
│   │   │   │   │   ├── route.ts
│   │   │   ├── sitemap.xml/
│   │   │   │   ├── route.ts
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── dashboard/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── client/
│   │   │   │   │   ├── page.tsx
│   │   │   │   ├── custom/
│   │   │   │   │   ├── page.tsx
│   │   │   ├── about/
│   │   │   │   ├── page.tsx
│   │   │   ├── contact/
│   │   │   │   ├── page.tsx
│   │   │   ├── blog/
│   │   │   │   ├── layout.tsx
│   │   │   │   ├── page.tsx
│   │   │   │   ├── BlogClient.tsx
│   │   │   │   ├── posts/
│   │   │   │   │   ├── page.tsx
│   │   │   │   ├── create/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   ├── action.ts
│   │   │   │   ├── upload/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   ├── action.ts
│   │   │   │   ├── [id]/
│   │   │   │   │   ├── page.tsx
│   │   │   │   ├── [...slug]/
│   │   │   │   │   ├── page.tsx
│   │   │   ├── docs/
│   │   │   │   ├── [[...slug]]/
│   │   │   │   │   ├── page.tsx
│   │   │   ├── (auth)/
│   │   │   │   ├── template.tsx
│   │   │   │   ├── login/
│   │   │   │   │   ├── page.tsx
│   │   │   │   ├── custom-login/
│   │   │   │   │   ├── page.tsx
│   │   │   │   ├── signup/
│   │   │   │   │   ├── page.tsx
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
│   ├── i18n/
│   │   ├── en.json
│   │   ├── es.json
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
├── .eslintrc.json
├── .gitignore
├── jest.config.js
├── jest.setup.js
├── next.config.js
├── middleware.ts
├── package.json
├── tsconfig.json
├── tailwind.config.js
```

**Test URLs**:
- `http://localhost:3000/en/blog` → English blog page
- `http://localhost:3000/es/blog` → Spanish blog page
- `http://localhost:3000/en/blog/create` → English create post page
- `http://localhost:3000/es/blog/create` → Spanish create post page

## Best Practices

### i18n Routing
- Use `[locale]` folder for App Router i18n.
- Configure `defaultLocale` and `locales` in `next.config.js`.
- Enable `localeDetection` for automatic locale selection.

### Translation Management
- Organize translations by component or page (e.g., `NavBar`, `Blog`).
- Use a library like `next-intl` for scalability.
- Keep translation files concise and maintainable.

### Locale Switching
- Provide a user-friendly locale switcher (e.g., dropdown).
- Preserve the current path when switching locales.
- Store user locale preference (e.g., in cookies) for persistence.

### SEO and Accessibility
- Use locale-specific metadata for SEO.
- Set the `lang` attribute in `<html>` for accessibility.
- Validate translations for accuracy and cultural relevance.

## Common Patterns

### Localized API Routes
Handle locale-specific API responses:

::Editor
#title
src/app/[locale]/api/posts/route.ts

#default

```ts
import { NextResponse } from 'next/server';

const posts: { id: string; title: string; content: string; image?: string }[] = [
  { id: '1', title: 'First Post', content: 'This is the first post.', image: 'image-1.jpg' },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get('locale') || 'en';

  const localizedPosts = posts.map((post) => ({
    ...post,
    title: locale === 'es' ? `Publicación ${post.title}` : post.title,
    content: locale === 'es' ? `Este es el contenido de ${post.content}` : post.content,
  }));

  return NextResponse.json(localizedPosts, {
    headers: {
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}
```

::

### Dynamic Locale Detection
Use a cookie to persist locale preference:

::Editor
#title
src/middleware.ts (updated)

#default

```ts
import { NextResponse } from 'next/server';
import { createMiddleware } from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'es'],
  defaultLocale: 'en',
  localeDetection: true,
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
```

::

## What’s Next?

This concludes the **Next.js Tutorial** series! You’ve built a fully-featured portfolio application with routing, authentication, API routes, testing, performance optimization, SEO, and i18n. explore advanced topics like:

- **Serverless Functions**: Deploy serverless functions with Vercel or AWS.
- **Webhooks**: Integrate webhooks for real-time updates.
- **Analytics Dashboards**: Build dashboards with real-time data.

### Key Takeaways:
- Configure i18n routing with `[locale]` folder and `next.config.js`
- Manage translations using `next-intl`
- Implement a locale switcher for user-friendly language changes
- Localize dynamic pages and metadata
- Follow best practices for scalable i18n
- Test multi-language support across pages

## Practice Exercise
1. Add i18n routing to your Next.js project for two languages.
2. Create translation files for a page (e.g., `en.json`, `es.json`).
3. Implement a locale switcher in the navigation.
4. Localize metadata for a dynamic page.
5. Test locale switching and translations across pages.