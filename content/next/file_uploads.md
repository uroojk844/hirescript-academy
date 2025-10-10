---
title: File Uploads
description: Learn how to handle file uploads in Next.js using API routes, server actions, and libraries like Multer for secure file processing.
navigation:
  order: 16
---

# File Uploads

Welcome to the File Uploads lesson in our **Next.js Tutorial - 20 Modules** series! In this tutorial, you’ll learn how to implement **file uploads** in **Next.js** to allow users to upload files like images or documents. This lesson builds on concepts from **Form Handling** and **Authentication in Next.js**, focusing on handling file uploads using **API routes** with Multer and **server actions** in the App Router. We’ll enhance the portfolio project with a feature to upload images for blog posts.

In this tutorial, you’ll learn:

- Understanding file uploads in Next.js
- Setting up file uploads with Multer and API routes
- Using server actions for file uploads in the App Router
- Validating and securing file uploads
- Displaying uploaded files
- Best practices for file uploads

## What are File Uploads?

**File uploads** allow users to send files (e.g., images, PDFs) to the server, which processes and stores them. In Next.js, file uploads can be handled via **API routes** (using libraries like Multer) or **server actions** (for simple processing in the App Router). Security and validation are critical to prevent malicious uploads.

**Key Features**:
- **Multer**: A middleware for handling `multipart/form-data` in Node.js.
- **Server Actions**: Process files server-side in the App Router.
- **Validation**: Ensure files meet size, type, and security requirements.
- **Storage**: Save files to the filesystem or cloud services (e.g., AWS S3).

**Use Cases**:
- Uploading profile pictures or blog post images
- Submitting documents or media files
- Managing user-generated content

## Setting Up the Project

Use the Next.js project from the **Form Handling** lesson, configured with TypeScript, Tailwind CSS, and the App Router. We’ll install **Multer** for handling file uploads.

**Install Multer**:
```bash
npm install multer
npm install --save-dev @types/multer
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
│   │   ├── FormField.tsx
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

## File Uploads with Multer and API Routes

Use Multer to handle file uploads via an API route.

### Step 1: Create an Upload API Route
Add an API route to process file uploads.

::Editor
#title
src/app/api/upload/route.ts

#default

```ts
import { NextResponse } from 'next/server';
import multer from 'multer';
import path from 'path';
import { promises as fs } from 'fs';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';

// Configure Multer storage
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Only JPEG and PNG images are allowed'));
  },
});

// Create uploads directory if it doesn't exist
const initUploadsDir = async () => {
  const dir = './public/uploads';
  try {
    await fs.access(dir);
  } catch (error) {
    await fs.mkdir(dir, { recursive: true });
  }
};

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await initUploadsDir();

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const filename = `image-${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.name)}`;
    const filePath = `./public/uploads/${filename}`;

    await fs.writeFile(filePath, buffer);

    return NextResponse.json({ message: 'File uploaded successfully', filename });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}
```

::

**Note**: This example uses the filesystem for simplicity. In production, use a cloud storage service like AWS S3.

### Step 2: Create an Upload Form
Add a form to upload images for blog posts.

::Editor
#title
src/app/blog/upload/page.tsx

#default

```tsx
'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function UploadImage() {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return <div className="text-center p-6">Loading...</div>;
  }

  if (!session) {
    router.push('/login');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) {
        throw new Error('Failed to upload file');
      }
      const data = await res.json();
      setSuccess(`File uploaded: ${data.filename}`);
      setError('');
    } catch (err) {
      setError('Failed to upload file');
      setSuccess('');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-700">Upload Image</h1>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div>
          <label htmlFor="file" className="block text-gray-700">Select Image</label>
          <input
            id="file"
            type="file"
            accept="image/jpeg,image/png"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="border p-2 w-full rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Upload
        </button>
      </form>
      {error && <p className="mt-4 text-red-700">{error}</p>}
      {success && <p className="mt-4 text-green-700">{success}</p>}
    </div>
  );
}
```

::

**Test URL**: `http://localhost:3000/blog/upload`

**Explanation**:
- The form uses `FormData` to send the file to the `/api/upload` endpoint.
- Multer validates file type and size, saving the file to `public/uploads`.
- Authentication ensures only logged-in users can upload files.

## File Uploads with Server Actions

Use server actions for file uploads in the App Router.

### Step 1: Create a Server Action for File Upload
Add a server action to handle file uploads.

::Editor
#title
src/app/blog/upload/action.ts

#default

```ts
'use server';

import { promises as fs } from 'fs';
import path from 'path';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../api/auth/[...nextauth]/route';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const initUploadsDir = async () => {
  const dir = './public/uploads';
  try {
    await fs.access(dir);
  } catch (error) {
    await fs.mkdir(dir, { recursive: true });
  }
};

export async function uploadFile(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return { error: 'Unauthorized' };
  }

  const file = formData.get('file') as File;
  if (!file) {
    return { error: 'No file uploaded' };
  }

  const filetypes = /jpeg|jpg|png/;
  const extname = filetypes.test(path.extname(file.name).toLowerCase());
  if (!extname) {
    return { error: 'Only JPEG and PNG images are allowed' };
  }

  if (file.size > 5 * 1024 * 1024) {
    return { error: 'File size exceeds 5MB limit' };
  }

  try {
    await initUploadsDir();
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const filename = `image-${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.name)}`;
    const filePath = `./public/uploads/${filename}`;

    await fs.writeFile(filePath, buffer);

    revalidatePath('/blog');
    return { message: 'File uploaded successfully', filename };
  } catch (error) {
    return { error: 'Failed to upload file' };
  }
}
```

::

### Step 2: Update the Upload Form
Modify the upload form to use the server action.

::Editor
#title
src/app/blog/upload/page.tsx

#default

```tsx
'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { uploadFile } from './action';

export default function UploadImage() {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return <div className="text-center p-6">Loading...</div>;
  }

  if (!session) {
    router.push('/login');
    return null;
  }

  const handleSubmit = async (formData: FormData) => {
    const result = await uploadFile(formData);
    if (result.error) {
      setError(result.error);
      setSuccess('');
    } else {
      setSuccess(result.message);
      setError('');
      router.push('/blog');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-700">Upload Image (Server Action)</h1>
      <form action={handleSubmit} className="mt-4 space-y-4">
        <div>
          <label htmlFor="file" className="block text-gray-700">Select Image</label>
          <input
            id="file"
            name="file"
            type="file"
            accept="image/jpeg,image/png"
            className="border p-2 w-full rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Upload
        </button>
      </form>
      {error && <p className="mt-4 text-red-700">{error}</p>}
      {success && <p className="mt-4 text-green-700">{success}</p>}
    </div>
  );
}
```

::

**Test URL**: `http://localhost:3000/blog/upload`

**Explanation**:
- The server action validates file type and size before saving.
- The form uses the `action` prop to call the server action directly.
- `revalidatePath` ensures the blog page reflects new uploads.

## Displaying Uploaded Files

Update the blog page to display uploaded images.

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
import Image from 'next/image';
import SearchBar from '../../components/SearchBar';

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
            {post.image && (
              <Image
                src={`/uploads/${post.image}`}
                alt={post.title}
                width={200}
                height={200}
                className="mt-2 rounded"
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

**Note**: Update the `/api/posts` route to include image data for posts (mocked for simplicity).

## Real-World Mini-Project: File-Enhanced Portfolio

Enhance the portfolio with file upload capabilities.

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
│   ├── context/
│   │   ├── ThemeContext.tsx
│   ├── store/
│   │   ├── index.ts
│   │   ├── postsSlice.ts
│   ├── styles/
│   │   ├── globals.css
├── public/
│   ├── uploads/
├── .eslintrc.json
├── .gitignore
├── next.config.js
├── package.json
├── tsconfig.json
├── tailwind.config.js
```

**Test URLs**:
- `http://localhost:3000/blog/upload` → File upload form (API and server action)
- `http://localhost:3000/blog` → Blog with uploaded images
- `http://localhost:3000/login` → Login to access protected upload

## Best Practices

### File Uploads
- Use Multer for API routes or server actions for simple uploads.
- Validate file types, sizes, and extensions to prevent malicious uploads.
- Store files in cloud storage (e.g., AWS S3) in production.

### Security
- Require authentication for file uploads.
- Sanitize file names to prevent path traversal attacks.
- Use secure storage and HTTPS for file transfers.

### Performance
- Compress images before storing to reduce file size.
- Use asynchronous file processing to avoid blocking the server.
- Cache static files (e.g., images) for faster delivery.

## Common Patterns

### File Upload with Progress
Add a progress indicator for uploads:

::Editor
#title
src/app/blog/upload/page.tsx (snippet)

#default

```tsx
const [progress, setProgress] = useState(0);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!file) {
    setError('Please select a file');
    return;
  }

  const formData = new FormData();
  formData.append('file', file);

  const xhr = new XMLHttpRequest();
  xhr.upload.onprogress = (event) => {
    if (event.lengthComputable) {
      setProgress(Math.round((event.loaded / event.total) * 100));
    }
  };

  xhr.open('POST', '/api/upload');
  xhr.send(formData);
};
```

::

### Cloud Storage Integration
Use AWS S3 for file storage (example configuration):

::Editor
#title
src/app/api/upload/route.ts (snippet)

#default

```ts
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('file') as File;

  const uploadParams = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: `uploads/${file.name}`,
    Body: Buffer.from(await file.arrayBuffer()),
  };

  await s3.send(new PutObjectCommand(uploadParams));
  // ...
}
```

::

## What’s Next?

In the next tutorial, **Testing in Next.js**, you’ll learn how to test your Next.js application using tools like Jest, React Testing Library, and Cypress.

### Key Takeaways:
- Use Multer for file uploads via API routes
- Implement server actions for file uploads in the App Router
- Validate and secure file uploads
- Display uploaded files in the UI
- Optimize file handling for performance
- Follow best practices for secure file uploads

## Practice Exercise
1. Create a file upload form using Multer and an API route.
2. Implement a file upload form with a server action.
3. Validate file types and sizes before processing.
4. Display uploaded images on the blog page.
5. Secure file uploads with authentication checks.