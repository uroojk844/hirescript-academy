---
title: Testing in Next.js
description: Learn how to test Next.js applications using Jest, React Testing Library, and Cypress for unit, integration, and end-to-end testing.
navigation:
  order: 17
---

# Testing in Next.js

Welcome to the Testing in Next.js lesson in our **Next.js Tutorial - 20 Modules** series! In this tutorial, you’ll learn how to test **Next.js** applications to ensure reliability and functionality. This lesson builds on concepts from **File Uploads** and **Form Handling**, focusing on using **Jest** for unit and integration tests, **React Testing Library** for component testing, and **Cypress** for end-to-end (E2E) testing. We’ll add tests to the portfolio project to cover components, API routes, and user flows.

In this tutorial, you’ll learn:

- Understanding testing in Next.js
- Setting up Jest and React Testing Library
- Writing unit tests for components
- Writing integration tests for API routes
- Setting up Cypress for E2E testing
- Best practices for testing

## What is Testing in Next.js?

**Testing** ensures that your Next.js application works as expected by verifying the behavior of components, API routes, and user flows. Next.js supports various testing strategies, including unit, integration, and E2E testing.

**Key Tools**:
- **Jest**: A JavaScript testing framework for unit and integration tests.
- **React Testing Library**: A library for testing React components.
- **Cypress**: A tool for E2E testing of web applications.

**Test Types**:
- **Unit Testing**: Test individual components or functions in isolation.
- **Integration Testing**: Test interactions between components or API routes.
- **E2E Testing**: Simulate real user scenarios across the entire app.

**Use Cases**:
- Testing UI components (e.g., NavBar, forms)
- Verifying API route responses
- Ensuring user flows (e.g., login, form submission) work correctly

## Setting Up the Project

Use the Next.js project from the **File Uploads** lesson, configured with TypeScript, Tailwind CSS, and the App Router. We’ll install **Jest**, **React Testing Library**, and **Cypress** for testing.

**Install Testing Dependencies**:
```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom ts-jest jest-environment-jsdom @types/jest cypress
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

## Setting Up Jest and React Testing Library

Configure Jest for unit and integration testing.

### Step 1: Create Jest Configuration
Add a Jest configuration file.

::Editor
#title
jest.config.js

#default

```js
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
};
```

::

### Step 2: Create Jest Setup File
Add a setup file for React Testing Library.

::Editor
#title
jest.setup.js

#default

```js
import '@testing-library/jest-dom';
```

::

### Step 3: Update package.json
Add scripts for running tests.

::Editor
#title
package.json (snippet)

#default

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "jest",
    "test:watch": "jest --watch"
  }
}
```

::

## Unit Testing Components

Test the `NavBar` component using React Testing Library.

### Step 1: Create a NavBar Test
Add a test file for the NavBar.

::Editor
#title
tests/components/NavBar.test.tsx

#default

```tsx
import { render, screen } from '@testing-library/react';
import NavBar from '@/components/NavBar';
import { ThemeProvider } from '@/context/ThemeContext';
import { useSession } from 'next-auth/react';

// Mock next-auth
jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}));

describe('NavBar', () => {
  beforeEach(() => {
    (useSession as jest.Mock).mockReturnValue({
      data: null,
      status: 'unauthenticated',
    });
  });

  it('renders navigation links', () => {
    render(
      <ThemeProvider>
        <NavBar />
      </ThemeProvider>
    );

    expect(screen.getByText('My Portfolio')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Blog')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('shows Sign Out button when authenticated', () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { name: 'John Doe' } },
      status: 'authenticated',
    });

    render(
      <ThemeProvider>
        <NavBar />
      </ThemeProvider>
    );

    expect(screen.getByText('Sign Out')).toBeInTheDocument();
    expect(screen.queryByText('Login')).not.toBeInTheDocument();
  });
});
```

::

**Run Tests**:
```bash
npm run test
```

**Explanation**:
- Tests verify that the `NavBar` renders links correctly.
- Mocks `useSession` to simulate authenticated and unauthenticated states.
- Uses `@testing-library/react` to render and query the DOM.

## Integration Testing API Routes

Test the `/api/posts` route.

### Step 1: Create an API Test
Add a test file for the posts API.

::Editor
#title
tests/api/posts.test.ts

#default

```ts
import { POST } from '@/app/api/posts/route';
import { NextRequest } from 'next/server';

describe('Posts API', () => {
  it('creates a post successfully', async () => {
    const request = new NextRequest('http://localhost:3000/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Test Post', content: 'This is a test' }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toHaveProperty('id');
    expect(data.title).toBe('Test Post');
    expect(data.content).toBe('This is a test');
  });

  it('returns error for missing fields', async () => {
    const request = new NextRequest('http://localhost:3000/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: '' }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Title and content are required');
  });
});
```

::

**Note**: Update the `/api/posts/route.ts` to include error handling for consistency:

::Editor
#title
src/app/api/posts/route.ts

#default

```ts
import { NextResponse } from 'next/server';

const posts: { id: string; title: string; content: string }[] = [
  { id: '1', title: 'First Post', content: 'This is the first post.' },
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
  return NextResponse.json(newPost);
}
```

::

**Run Tests**:
```bash
npm run test
```

**Explanation**:
- Tests the `POST` method of the `/api/posts` route.
- Simulates requests using `NextRequest`.
- Verifies successful post creation and error handling.

## Setting Up Cypress for E2E Testing

Configure Cypress for end-to-end testing of user flows.

### Step 1: Initialize Cypress
Run the following to set up Cypress:

```bash
npx cypress open
```

This creates a `cypress` folder with default configurations.

### Step 2: Create an E2E Test
Add a test for the blog page.

::Editor
#title
cypress/e2e/blog.spec.cy.ts

#default

```ts
describe('Blog Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/blog');
  });

  it('displays blog posts', () => {
    cy.get('h1').should('contain', 'Blog');
    cy.get('li').should('have.length.at.least', 1);
    cy.get('li').first().should('contain', 'First Post');
  });

  it('allows searching for posts', () => {
    cy.get('input[placeholder="Search posts..."]').type('First');
    cy.get('li').should('have.length', 1);
    cy.get('li').first().should('contain', 'First Post');
  });

  it('navigates to create post page', () => {
    cy.get('a[href="/blog/create"]').click();
    cy.url().should('include', '/blog/create');
    cy.get('h1').should('contain', 'Create Post');
  });
});
```

::

**Update SearchBar for Testing**:
Ensure the `SearchBar` component has a placeholder for Cypress to target:

::Editor
#title
src/components/SearchBar.tsx

#default

```tsx
'use client';

import { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <input
      type="text"
      value={query}
      onChange={handleChange}
      placeholder="Search posts..."
      className="border p-2 w-full rounded"
    />
  );
}
```

::

**Run Cypress Tests**:
```bash
npx cypress open
```

**Explanation**:
- Tests the blog page for rendering posts, searching, and navigation.
- Uses Cypress commands (`cy.visit`, `cy.get`) to simulate user interactions.
- Verifies UI elements and navigation flows.

## Real-World Mini-Project: Tested Portfolio

Add tests to ensure the portfolio app is robust.

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

**Test Commands**:
- Unit/Integration Tests: `npm run test`
- E2E Tests: `npx cypress open`

**Test URLs**:
- `http://localhost:3000/blog` → Tested blog page
- `http://localhost:3000/api/posts` → Tested API route
- `http://localhost:3000` → Tested NavBar

## Best Practices

### Unit Testing
- Test individual components in isolation.
- Mock dependencies (e.g., `useSession`, API calls) to control test scenarios.
- Focus on behavior over implementation details.

### Integration Testing
- Test interactions between components and API routes.
- Simulate real requests to verify server-side logic.
- Use mocks for external services (e.g., databases).

### E2E Testing
- Test critical user flows (e.g., login, form submission).
- Use Cypress for browser-based testing of UI and navigation.
- Mock API responses in E2E tests for consistency.

### General
- Write clear, maintainable test cases.
- Run tests in CI/CD pipelines for automated validation.
- Keep test files organized and co-located with components.

## Common Patterns

### Mocking Next.js Hooks
Mock `useRouter` for testing navigation:

::Editor
#title
tests/components/CreatePost.test.tsx

#default

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import CreatePost from '@/app/blog/create/page';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('CreatePost', () => {
  it('submits form and redirects', async () => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push });

    render(<CreatePost />);
    fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'Test Post' } });
    fireEvent.change(screen.getByLabelText('Content'), { target: { value: 'Test Content' } });
    fireEvent.click(screen.getByText('Create Post'));

    expect(push).toHaveBeenCalledWith('/blog');
  });
});
```

::

### Mocking API Responses in Cypress
Mock API responses for E2E tests:

::Editor
#title
cypress/e2e/blog.spec.cy.ts (snippet)

#default

```ts
it('displays mocked blog posts', () => {
  cy.intercept('GET', '/api/posts', [
    { id: '1', title: 'Mocked Post', content: 'This is a mocked post.' },
  ]).as('getPosts');

  cy.visit('http://localhost:3000/blog');
  cy.wait('@getPosts');
  cy.get('li').should('contain', 'Mocked Post');
});
```

::

## What’s Next?

In the next tutorial, **Performance Optimization**, you’ll learn how to optimize your Next.js application for speed and scalability using techniques like lazy loading, code splitting, and caching.

### Key Takeaways:
- Use Jest and React Testing Library for unit and integration tests
- Test components and API routes for reliability
- Use Cypress for E2E testing of user flows
- Mock dependencies to control test environments
- Organize tests for maintainability
- Follow best practices for comprehensive testing

## Practice Exercise
1. Write a unit test for a component (e.g., NavBar).
2. Write an integration test for an API route (e.g., `/api/posts`).
3. Create an E2E test with Cypress for the blog page.
4. Mock dependencies like `useSession` or `useRouter` in tests.
5. Run tests and verify coverage.