---
title: Authentication in Next.js
description: Learn how to implement authentication in Next.js using NextAuth.js and custom solutions for secure user authentication.
navigation:
  order: 13
---

# Authentication in Next.js

Welcome to the Authentication in Next.js lesson in our **Next.js Tutorial - 20 Modules** series! In this tutorial, you’ll learn how to implement **authentication** in **Next.js** to secure your application and manage user sessions. This lesson builds on concepts from **Client-Side Rendering** and **API Routes Creation**, focusing on using **NextAuth.js** for authentication with providers like GitHub and a custom authentication solution for email/password login. We’ll use the **App Router** for primary examples and include Pages Router examples for completeness.

In this tutorial, you’ll learn:

- Understanding authentication in Next.js
- Setting up NextAuth.js for authentication
- Implementing GitHub OAuth with NextAuth.js
- Creating a custom email/password authentication solution
- Protecting routes and accessing user sessions
- Best practices for authentication

## What is Authentication in Next.js?

**Authentication** verifies a user’s identity, allowing secure access to protected resources. Next.js supports authentication through libraries like **NextAuth.js** or custom solutions, integrating seamlessly with both the **App Router** and **Pages Router**.

**Key Features**:
- **NextAuth.js**: A complete authentication solution supporting OAuth, credentials, and more.
- **Custom Authentication**: Build your own system using API routes and session management.
- **Session Management**: Access user data client-side and server-side.
- **Route Protection**: Restrict access to pages based on authentication status.

**Use Cases**:
- User login with OAuth providers (e.g., GitHub, Google).
- Email/password login for custom applications.
- Protecting dashboards or admin pages.
- Managing user sessions across client and server.

## Setting Up the Project

Use the Next.js project from the **Client-Side Rendering** lesson, configured with TypeScript, Tailwind CSS, and the App Router. We’ll install **NextAuth.js** for authentication.

**Install NextAuth.js**:
```bash
npm install next-auth
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

## Setting Up NextAuth.js (App Router)

NextAuth.js simplifies authentication with support for OAuth, credentials, and session management.

### Step 1: Configure NextAuth.js
Create an API route for NextAuth.js.

::Editor
#title
src/app/api/auth/[...nextauth]/route.ts

#default

```ts
import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
```

::

**Environment Variables**:
Create a `.env.local` file for GitHub OAuth credentials.

::Editor
#title
.env.local

#default

```
GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-random-secret
```

::

**Steps to Get GitHub Credentials**:
1. Go to GitHub > Settings > Developer settings > OAuth Apps > New OAuth App.
2. Set the callback URL to `http://localhost:3000/api/auth/callback/github`.
3. Copy the Client ID and Client Secret to `.env.local`.
4. Generate a random `NEXTAUTH_SECRET` (e.g., using `openssl rand -base64 32`).

### Step 2: Create a Login Page
Update the login page to use NextAuth.js.

::Editor
#title
src/app/(auth)/login/page.tsx

#default

```tsx
'use client';

import { signIn } from 'next-auth/react';

export default function Login() {
  const handleGitHubLogin = () => {
    signIn('github', { callbackUrl: '/dashboard' });
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-700">Login</h1>
      <button
        onClick={handleGitHubLogin}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Sign in with GitHub
      </button>
    </div>
  );
}
```

::

**Test URL**: `http://localhost:3000/login`

**Explanation**:
- `'use client'` enables client-side interactivity.
- `signIn('github')` initiates GitHub OAuth, redirecting to the dashboard after login.

### Step 3: Protect the Dashboard
Restrict access to the dashboard using session data.

::Editor
#title
src/app/dashboard/page.tsx

#default

```tsx
import type { Metadata } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

async function fetchPosts() {
  const res = await fetch('http://localhost:3000/api/posts', {
    cache: 'no-store',
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

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  try {
    const posts = await fetchPosts();
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-blue-700">
          Welcome, {session.user?.name}
        </h1>
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
        <h1 className="text-3xl font-bold text-blue-700">
          Welcome, {session.user?.name}
        </h1>
        <p className="text-red-700 mt-4">Error loading posts</p>
      </div>
    );
  }
}
```

::

**Test URL**: `http://localhost:3000/dashboard`

**Explanation**:
- `getServerSession` checks for an active session server-side.
- Redirects to `/login` if the user is not authenticated.
- Displays user-specific data (e.g., name) and posts.

### Step 4: Add a Sign-Out Button
Update the dashboard to include a sign-out option.

::Editor
#title
src/app/dashboard/page.tsx (updated)

#default

```tsx
'use client';

import type { Metadata } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

async function fetchPosts() {
  const res = await fetch('http://localhost:3000/api/posts', {
    cache: 'no-store',
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

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  try {
    const posts = await fetchPosts();
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-blue-700">
            Welcome, {session.user?.name}
          </h1>
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Sign Out
          </button>
        </div>
        <h2 className="text-2xl font-semibold text-gray-700 mt-4">Recent Posts</h2>
        <ul className="mt-4 space-y-4">
          {posts.map((post: { id: string; title: string; content: string }) => (
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
  } catch (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-blue-700">
            Welcome, {session.user?.name}
          </h1>
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Sign Out
          </button>
        </div>
        <p className="text-red-700 mt-4">Error loading posts</p>
      </div>
    );
  }
}
```

::

**Test URL**: `http://localhost:3000/dashboard`

## Custom Authentication Solution

Implement a simple email/password authentication system using API routes.

### Step 1: Create a Custom Auth API Route
Add an API route for login.

::Editor
#title
src/app/api/auth/login/route.ts

#default

```ts
import { NextResponse } from 'next/server';
import { sign } from 'jsonwebtoken';

// Mock user database
const users = [
  { id: '1', email: 'user@example.com', password: 'password123' },
];

export async function POST(request: Request) {
  const { email, password } = await request.json();

  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const token = sign({ userId: user.id }, process.env.JWT_SECRET!, {
    expiresIn: '1h',
  });

  return NextResponse.json({ token });
}
```

::

**Environment Variables**:
Update `.env.local` with a JWT secret.

::Editor
#title
.env.local (updated)

#default

```
GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-random-secret
JWT_SECRET=your-jwt-secret
```

::

### Step 2: Create a Custom Login Page
Add a login form for email/password authentication.

::Editor
#title
src/app/(auth)/custom-login/page.tsx

#default

```tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CustomLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        throw new Error('Login failed');
      }
      const { token } = await res.json();
      localStorage.setItem('token', token);
      router.push('/dashboard/custom');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-700">Custom Login</h1>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div>
          <label htmlFor="email" className="block text-gray-700">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 w-full rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-gray-700">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 w-full rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
      {error && <p className="mt-4 text-red-700">{error}</p>}
    </div>
  );
}
```

::

### Step 3: Create a Protected Custom Dashboard
Add a dashboard protected by the custom JWT.

::Editor
#title
src/app/dashboard/custom/page.tsx

#default

```tsx
import type { Metadata } from 'next';
import { verify } from 'jsonwebtoken';
import { redirect } from 'next/navigation';
import Link from 'next/link';

async function fetchPosts() {
  const res = await fetch('http://localhost:3000/api/posts', {
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }
  return res.json();
}

export const metadata: Metadata = {
  title: 'Custom Dashboard - My Portfolio',
  description: 'Custom authenticated dashboard',
};

export default async function CustomDashboard({
  searchParams,
}: {
  searchParams: { token?: string };
}) {
  const token = searchParams.token || '';
  let userId: string | null = null;

  try {
    const decoded = verify(token, process.env.JWT_SECRET!) as { userId: string };
    userId = decoded.userId;
  } catch (error) {
    redirect('/custom-login');
  }

  try {
    const posts = await fetchPosts();
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-blue-700">Custom Dashboard</h1>
        <p className="text-gray-700">User ID: {userId}</p>
        <h2 className="text-2xl font-semibold text-gray-700 mt-4">Recent Posts</h2>
        <ul className="mt-4 space-y-4">
          {posts.map((post: { id: string; title: string; content: string }) => (
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
  } catch (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-blue-700">Custom Dashboard</h1>
        <p className="text-gray-700">User ID: {userId}</p>
        <p className="text-red-700 mt-4">Error loading posts</p>
      </div>
    );
  }
}
```

::

**Test URLs**:
- `http://localhost:3000/custom-login` → Custom login page
- `http://localhost:3000/dashboard/custom?token=<your-token>` → Protected dashboard

**Note**: For testing, use the token returned from `/api/auth/login`. In a real app, store the token securely (e.g., in `localStorage`) and pass it via headers or a secure context.

## Real-World Mini-Project: Secure Portfolio Dashboard

Enhance the portfolio with authenticated dashboards.

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
│   ├── styles/
│   │   ├── globals.css
```

**Test URLs**:
- `http://localhost:3000/login` → GitHub login
- `http://localhost:3000/custom-login` → Custom email/password login
- `http://localhost:3000/dashboard` → Protected dashboard (NextAuth.js)
- `http://localhost:3000/dashboard/custom` → Protected custom dashboard

## Best Practices

### NextAuth.js
- Use NextAuth.js for quick setup with OAuth or credentials.
- Store secrets in `.env.local` and never expose them.
- Use `getServerSession` for server-side session checks.

### Custom Authentication
- Use secure JWT libraries like `jsonwebtoken`.
- Hash passwords in production (e.g., with `bcrypt`).
- Store tokens securely (e.g., HttpOnly cookies instead of `localStorage`).

### Security
- Validate and sanitize user input to prevent injection attacks.
- Use HTTPS in production for secure communication.
- Implement rate limiting on login endpoints.

### Performance
- Minimize server-side session checks for public pages.
- Cache session data where possible.
- Optimize API routes for authentication.

## Common Patterns

### Middleware for Route Protection
Protect multiple routes with middleware (App Router):

::Editor
#title
src/middleware.ts

#default

```ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './app/api/auth/[...nextauth]/route';

export async function middleware(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session && request.url.includes('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
```

::

### Client-Side Session Access
Access session data in Client Components:

::Editor
#title
src/app/dashboard/client/page.tsx (snippet)

#default

```tsx
'use client';

import { useSession } from 'next-auth/react';

export default function DashboardClient() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div className="text-center p-6">Loading...</div>;
  }

  if (!session) {
    return <div className="text-center p-6 text-red-700">Please log in</div>;
  }

  // ... rest of the component
}
```

::

## What’s Next?

In the next tutorial, **State Management**, you’ll learn how to manage state in Next.js applications using React Context, Redux, or other state management libraries.

### Key Takeaways:
- Use NextAuth.js for OAuth and credentials-based authentication
- Implement custom authentication with JWT and API routes
- Protect routes using server-side and client-side session checks
- Securely store credentials and tokens
- Optimize authentication for performance
- Follow best practices for secure authentication

## Practice Exercise
1. Set up NextAuth.js with GitHub OAuth in the App Router.
2. Create a custom email/password login API route.
3. Protect a dashboard page with session checks.
4. Add a sign-out button to a protected page.
5. Test authentication flows for both NextAuth.js and custom solutions.