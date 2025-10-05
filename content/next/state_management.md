---
title: State Management
description: Learn how to manage state in Next.js applications using React Context, Redux Toolkit, and other state management solutions.
navigation:
  order: 14
---

# State Management

Welcome to the State Management lesson in our **Next.js Tutorial - 20 Modules** series! In this tutorial, you’ll learn how to manage state in **Next.js** applications to handle dynamic data and user interactions. This lesson builds on concepts from **Authentication in Next.js** and **Client-Side Rendering**, focusing on using **React Context** for lightweight state management and **Redux Toolkit** for complex applications. We’ll implement state management in the **App Router** with examples that integrate with the existing portfolio project.

In this tutorial, you’ll learn:

- Understanding state management in Next.js
- Using React Context for simple state management
- Implementing Redux Toolkit for complex state management
- Integrating state with authenticated routes
- Managing state in Client Components
- Best practices for state management

## What is State Management?

**State management** involves storing and updating application data, such as user preferences, UI state, or fetched data, and sharing it across components. In Next.js, state management is typically handled in **Client Components** due to their interactivity, but it can integrate with Server Components for initial data.

**Key Tools**:
- **React Context**: Built-in React solution for sharing state without prop drilling.
- **Redux Toolkit**: A powerful library for managing global state in complex apps.
- **Other Options**: Zustand, Recoil, or MobX for alternative approaches.

**Use Cases**:
- Storing user authentication status
- Managing form inputs or UI toggles
- Handling global app data (e.g., user settings, cart items)
- Synchronizing fetched data across components

## Setting Up the Project

Use the Next.js project from the **Authentication in Next.js** lesson, configured with TypeScript, Tailwind CSS, and the App Router. We’ll install **Redux Toolkit** for advanced state management.

**Install Redux Toolkit**:
```bash
npm install @reduxjs/toolkit react-redux
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

## State Management with React Context

React Context is ideal for lightweight state management without external dependencies.

### Step 1: Create a Theme Context
Create a context to manage a theme toggle (light/dark mode).

::Editor
#title
src/context/ThemeContext.tsx

#default

```tsx
'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
```

::

### Step 2: Update the Root Layout
Wrap the app with the `ThemeProvider`.

::Editor
#title
src/app/layout.tsx

#default

```tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '../context/ThemeContext';
import NavBar from '../components/NavBar';

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
        <ThemeProvider>
          <NavBar />
          <main className="min-h-screen">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

::

### Step 3: Use Theme in a Component
Update the dashboard to use the theme.

::Editor
#title
src/app/dashboard/client/page.tsx

#default

```tsx
'use client';

import useSWR from 'swr';
import Link from 'next/link';
import { useTheme } from '../../../context/ThemeContext';

interface Post {
  id: string;
  title: string;
  content: string;
}

interface User {
  id: string;
  name: string;
  email: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function DashboardClient() {
  const { data: user, error: userError } = useSWR<User>('/api/user', fetcher);
  const { data: posts, error: postsError } = useSWR<Post[]>('/api/posts', fetcher);
  const { theme, toggleTheme } = useTheme();

  if (userError || postsError) {
    return <div className="text-center p-6 text-red-700">Error loading data</div>;
  }

  if (!user || !posts) {
    return <div className="text-center p-6">Loading...</div>;
  }

  return (
    <div className={`max-w-4xl mx-auto p-6 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-blue-700">Client-Side Dashboard</h1>
        <button
          onClick={toggleTheme}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Toggle {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
      </div>
      <div className="mt-4 border p-4 rounded">
        <p className="text-gray-700"><strong>Name:</strong> {user.name}</p>
        <p className="text-gray-700"><strong>Email:</strong> {user.email}</p>
      </div>
      <h2 className="text-2xl font-semibold text-gray-700 mt-6">Recent Posts</h2>
      <ul className="mt-4 space-y-4">
        {posts.map((post) => (
          <li key={post.id} className="border p-4 rounded">
            <Link href={`/blog/${post.id}`} className="text-blue-500 hover:underline">
              <h3 className="text-xl font-semibold">{post.title}</h3>
            </Link>
            <p className="text-gray-700">{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

::

**Test URL**: `http://localhost:3000/dashboard/client`

**Explanation**:
- `ThemeProvider` wraps the app to provide theme state.
- `useTheme` hook accesses the theme and toggle function.
- The dashboard applies the theme dynamically.

## State Management with Redux Toolkit

Redux Toolkit is ideal for complex state management with global state.

### Step 1: Create a Redux Store
Set up the Redux store with a slice for posts.

::Editor
#title
src/store/index.ts

#default

```ts
import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './postsSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

::

::Editor
#title
src/store/postsSlice.ts

#default

```ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Post {
  id: string;
  title: string;
  content: string;
}

interface PostsState {
  posts: Post[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  status: 'idle',
  error: null,
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const res = await fetch('/api/posts');
  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }
  return res.json();
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    resetPosts: (state) => {
      state.posts = [];
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export const { resetPosts } = postsSlice.actions;
export default postsSlice.reducer;
```

::

### Step 2: Wrap the App with Redux Provider
Update the root layout to include the Redux store.

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
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
```

::

### Step 3: Use Redux in a Component
Update the blog client page to use Redux for posts.

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
import SearchBar from '../../components/SearchBar';

interface Post {
  id: string;
  title: string;
  content: string;
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
            <p className="text-gray-700">{post.content}</p>
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
- Redux Toolkit manages the posts state globally.
- `fetchPosts` thunk handles async data fetching.
- The component uses `useSelector` and `useDispatch` to interact with the store.

## Integrating State with Authentication

Use state management to store authentication status.

### Step 1: Add Auth to Context
Update the ThemeContext to include authentication state.

::Editor
#title
src/context/ThemeContext.tsx

#default

```tsx
'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { useSession } from 'next-auth/react';

interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  isAuthenticated: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const { status } = useSession();
  const isAuthenticated = status === 'authenticated';

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isAuthenticated }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
```

::

### Step 2: Use Auth State in NavBar
Update the NavBar to show login/logout based on auth status.

::Editor
#title
src/components/NavBar.tsx

#default

```tsx
'use client';

import Link from 'next/link';
import { useTheme } from '../context/ThemeContext';
import { signOut } from 'next-auth/react';

export default function NavBar() {
  const { isAuthenticated } = useTheme();

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          My Portfolio
        </Link>
        <div className="space-x-4">
          <Link href="/about" className="hover:underline">
            About
          </Link>
          <Link href="/blog" className="hover:underline">
            Blog
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
          <Link href="/dashboard" className="hover:underline">
            Dashboard
          </Link>
          {isAuthenticated ? (
            <button
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="hover:underline"
            >
              Sign Out
            </button>
          ) : (
            <Link href="/login" className="hover:underline">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
```

::

**Test URL**: `http://localhost:3000`

## Real-World Mini-Project: Stateful Portfolio

Enhance the portfolio with state-managed features.

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
│   ├── context/
│   │   ├── ThemeContext.tsx
│   ├── store/
│   │   ├── index.ts
│   │   ├── postsSlice.ts
│   ├── styles/
│   │   ├── globals.css
```

**Test URLs**:
- `http://localhost:3000/blog` → Blog with Redux-managed posts
- `http://localhost:3000/dashboard/client` → Dashboard with theme toggle
- `http://localhost:3000` → NavBar with auth state

## Best Practices

### React Context
- Use Context for simple, app-wide state (e.g., theme, auth status).
- Avoid overusing Context for complex state to prevent performance issues.
- Combine with Server Components for initial data.

### Redux Toolkit
- Use Redux for complex, global state with async operations.
- Leverage thunks for async logic (e.g., API calls).
- Keep slices modular and focused on specific features.

### Performance
- Minimize re-renders by selecting specific state with `useSelector`.
- Use memoization for expensive computations.
- Combine state management with SSR/SSG for initial data.

## Common Patterns

### Persisting State
Persist theme state in `localStorage`:

::Editor
#title
src/context/ThemeContext.tsx (snippet)

#default

```tsx
const [theme, setTheme] = useState<'light' | 'dark'>(() => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('theme') === 'dark' ? 'dark' : 'light';
  }
  return 'light';
});

useEffect(() => {
  localStorage.setItem('theme', theme);
}, [theme]);
```

::

### Type-Safe Redux
Use TypeScript with Redux Toolkit:

::Editor
#title
src/store/postsSlice.ts (snippet)

#default

```ts
export const selectPosts = (state: RootState) => state.posts.posts;
export const selectStatus = (state: RootState) => state.posts.status;
export const selectError = (state: RootState) => state.posts.error;
```

::

## What’s Next?

In the next tutorial, **Form Handling**, you’ll learn how to handle forms in Next.js using controlled components, server actions, and form libraries like React Hook Form.

### Key Takeaways:
- Use React Context for lightweight state management
- Implement Redux Toolkit for complex global state
- Integrate state with authentication and API data
- Optimize state updates for performance
- Follow best practices for scalable state management
- Combine state management with Client Components

## Practice Exercise
1. Create a React Context for a simple feature (e.g., theme toggle).
2. Set up a Redux store with a slice for managing posts.
3. Use Redux in a Client Component to fetch and display data.
4. Integrate authentication status into a Context or Redux store.
5. Test state management across multiple pages.