---
title: Form Handling
description: Learn how to handle forms in Next.js using controlled components, server actions, and React Hook Form for efficient form management.
navigation:
  order: 15
---

# Form Handling

Welcome to the Form Handling lesson in our **Next.js Tutorial - 20 Modules** series! In this tutorial, you’ll learn how to manage forms in **Next.js** to collect and process user input effectively. This lesson builds on concepts from **State Management** and **Authentication in Next.js**, focusing on implementing forms using **controlled components**, **server actions** in the App Router, and **React Hook Form** for advanced form management. We’ll enhance the portfolio project with form features like creating blog posts and user feedback forms.

In this tutorial, you’ll learn:

- Understanding form handling in Next.js
- Creating controlled forms in Client Components
- Using server actions for form submissions
- Implementing forms with React Hook Form
- Validating forms and handling errors
- Best practices for form handling

## What is Form Handling?

**Form handling** involves capturing, validating, and processing user input from HTML forms. In Next.js, forms can be handled client-side (using React state) or server-side (using server actions or API routes), with libraries like React Hook Form simplifying validation and state management.

**Key Features**:
- **Controlled Components**: Manage form state with React state.
- **Server Actions**: Handle form submissions server-side in the App Router.
- **React Hook Form**: A lightweight library for form validation and management.
- **Validation**: Ensure user input meets requirements (e.g., required fields, email format).

**Use Cases**:
- Creating or editing blog posts
- User registration or feedback forms
- Search or filter inputs
- File uploads or complex form submissions

## Setting Up the Project

Use the Next.js project from the **State Management** lesson, configured with TypeScript, Tailwind CSS, and the App Router. We’ll install **React Hook Form** for advanced form handling.

**Install React Hook Form**:
```bash
npm install react-hook-form
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
│   ├── context/
│   │   ├── ThemeContext.tsx
│   ├── store/
│   │   ├── index.ts
│   │   ├── postsSlice.ts
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

## Controlled Forms in Client Components

Use React state to manage form inputs in a Client Component.

### Step 1: Update the Post Creation Form
Update the post creation page to use a controlled form.

::Editor
#title
src/app/blog/create/page.tsx

#default

```tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      setError('All fields are required');
      return;
    }

    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });
      if (!res.ok) {
        throw new Error('Failed to create post');
      }
      router.push('/blog');
    } catch (err) {
      setError('Failed to create post');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-700">Create Post</h1>
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
      {error && <p className="mt-4 text-red-700">{error}</p>}
    </div>
  );
}
```

::

**Test URL**: `http://localhost:3000/blog/create`

**Explanation**:
- `'use client'` marks the component as a Client Component.
- Uses `useState` to manage form inputs (`title`, `content`).
- Submits data to the `/api/posts` endpoint and redirects on success.

## Using Server Actions

Server actions allow form submissions to be handled server-side in the App Router.

### Step 1: Create a Server Action
Add a server action for form submission.

::Editor
#title
src/app/blog/create/action.ts

#default

```ts
'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// Mock database
const posts: { id: string; title: string; content: string }[] = [];

export async function createPost(formData: FormData) {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;

  if (!title || !content) {
    return { error: 'All fields are required' };
  }

  const newPost = {
    id: String(posts.length + 1),
    title,
    content,
  };

  posts.push(newPost);
  revalidatePath('/blog');
  redirect('/blog');
}
```

::

### Step 2: Update the Form to Use Server Actions
Modify the create post page to use the server action.

::Editor
#title
src/app/blog/create/page.tsx

#default

```tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createPost } from './action';

export default function CreatePost() {
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    const result = await createPost(formData);
    if (result?.error) {
      setError(result.error);
    } else {
      router.push('/blog');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-700">Create Post (Server Action)</h1>
      <form action={handleSubmit} className="mt-4 space-y-4">
        <div>
          <label htmlFor="title" className="block text-gray-700">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            className="border p-2 w-full rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-gray-700">Content</label>
          <textarea
            id="content"
            name="content"
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
      {error && <p className="mt-4 text-red-700">{error}</p>}
    </div>
  );
}
```

::

**Test URL**: `http://localhost:3000/blog/create`

**Explanation**:
- The `action.ts` file defines a server action (`createPost`) to handle form data.
- The form uses the `action` prop to call the server action directly.
- `revalidatePath` updates the blog page cache after submission.

## Using React Hook Form

React Hook Form simplifies form management with validation and performance optimizations.

### Step 1: Create a Feedback Form
Add a feedback form using React Hook Form.

::Editor
#title
src/app/contact/page.tsx

#default

```tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormData = z.infer<typeof schema>;

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        throw new Error('Failed to submit feedback');
      }
      alert('Feedback submitted successfully!');
    } catch (err) {
      alert('Failed to submit feedback');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-700">Contact Us</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
        <div>
          <label htmlFor="name" className="block text-gray-700">Name</label>
          <input
            id="name"
            {...register('name')}
            className="border p-2 w-full rounded"
          />
          {errors.name && <p className="text-red-700">{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block text-gray-700">Email</label>
          <input
            id="email"
            type="email"
            {...register('email')}
            className="border p-2 w-full rounded"
          />
          {errors.email && <p className="text-red-700">{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="message" className="block text-gray-700">Message</label>
          <textarea
            id="message"
            {...register('message')}
            className="border p-2 w-full rounded"
          />
          {errors.message && <p className="text-red-700">{errors.message.message}</p>}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-400"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
```

::

### Step 2: Create a Feedback API Route
Add an API route to handle feedback submissions.

::Editor
#title
src/app/api/feedback/route.ts

#default

```ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { name, email, message } = await request.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
  }

  // Simulate saving feedback (e.g., to a database)
  console.log('Feedback:', { name, email, message });

  return NextResponse.json({ message: 'Feedback received' });
}
```

::

**Install Zod for Validation**:
```bash
npm install zod @hookform/resolvers
```

**Test URL**: `http://localhost:3000/contact`

**Explanation**:
- React Hook Form manages form state and validation with `useForm`.
- Zod provides schema-based validation for type safety.
- The form submits to `/api/feedback` with error handling.

## Real-World Mini-Project: Form-Enhanced Portfolio

Enhance the portfolio with form-driven features.

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
- `http://localhost:3000/blog/create` → Post creation form (controlled and server action)
- `http://localhost:3000/contact` → Feedback form with React Hook Form
- `http://localhost:3000/blog` → Updated blog with new posts

## Best Practices

### Controlled Forms
- Use controlled components for simple forms with minimal validation.
- Handle form state with React state or libraries like React Hook Form.
- Provide clear error messages for invalid inputs.

### Server Actions
- Use server actions for secure, server-side form processing in the App Router.
- Validate form data server-side to prevent malicious input.
- Use `revalidatePath` to update cached pages after submission.

### React Hook Form
- Use React Hook Form for complex forms with validation.
- Integrate with schema libraries like Zod for type-safe validation.
- Optimize performance by minimizing re-renders.

### Security
- Sanitize and validate all user inputs to prevent injection attacks.
- Use CSRF protection for form submissions in production.
- Secure API routes with authentication checks.

## Common Patterns

### Reusable Form Component
Create a reusable form component:

::Editor
#title
src/components/FormField.tsx

#default

```tsx
import { FieldError, UseFormRegister } from 'react-hook-form';

interface FormFieldProps {
  label: string;
  id: string;
  type?: string;
  register: UseFormRegister<any>;
  name: string;
  error?: FieldError;
}

export default function FormField({ label, id, type = 'text', register, name, error }: FormFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-gray-700">{label}</label>
      <input
        id={id}
        type={type}
        {...register(name)}
        className="border p-2 w-full rounded"
      />
      {error && <p className="text-red-700">{error.message}</p>}
    </div>
  );
}
```

::

### Server Action with Authentication
Secure server actions with session checks:

::Editor
#title
src/app/blog/create/action.ts (snippet)

#default

```ts
'use server';

import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../api/auth/[...nextauth]/route';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createPost(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return { error: 'Unauthorized' };
  }

  const title = formData.get('title') as string;
  const content = formData.get('content') as string;

  // ... rest of the action
}
```

::

## What’s Next?

In the next tutorial, **File Uploads**, you’ll learn how to handle file uploads in Next.js using server-side processing and libraries like Multer or Next.js API routes.

### Key Takeaways:
- Use controlled components for simple form handling
- Implement server actions for secure form submissions
- Use React Hook Form for efficient form management and validation
- Validate inputs client-side and server-side
- Optimize form performance and UX
- Follow best practices for secure form handling

## Practice Exercise
1. Create a controlled form for creating a blog post.
2. Implement a form using server actions in the App Router.
3. Build a feedback form with React Hook Form and Zod validation.
4. Add error handling and loading states to a form.
5. Test form submissions with API routes and server actions.