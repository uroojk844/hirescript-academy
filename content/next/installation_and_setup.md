---
title: Installation and Setup
description: Learn how to set up a Next.js project, including TypeScript, ESLint, Tailwind CSS, and other development tools for a robust development environment.
navigation:
  order: 2
---

# Installation and Setup

Welcome to the Installation and Setup lesson in our **Next.js Tutorial - 20 Modules** series! In this tutorial, you’ll learn how to set up a **Next.js** project from scratch, configure optional features like **TypeScript**, **ESLint**, and **Tailwind CSS**, and prepare your development environment for building modern web applications. This lesson builds on the **Introduction to Next.js**, providing the foundation for hands-on development in subsequent modules.

In this tutorial, you’ll learn:

- Installing Node.js and required tools
- Creating a new Next.js project with `create-next-app`
- Configuring TypeScript for type safety
- Setting up ESLint for code quality
- Adding Tailwind CSS for styling
- Organizing the project structure
- Best practices for Next.js setup

## Prerequisites

Before starting, ensure you have:

- **Node.js**: Version 18 or higher (download from [nodejs.org](https://nodejs.org/)).
- **Code Editor**: VS Code or similar (with extensions like ESLint, Prettier, and Tailwind CSS IntelliSense).
- **Terminal**: For running commands (e.g., Command Prompt, Terminal, or PowerShell).
- **Git**: For version control (optional but recommended).

### Verify Node.js Installation
Check your Node.js and npm versions:

```bash
node -v
npm -v
```

**Expected Output**:
```
v18.x.x
v9.x.x
```

If Node.js is not installed or outdated, download and install it from [nodejs.org](https://nodejs.org/).

## Creating a Next.js Project

Next.js provides a CLI tool, `create-next-app`, to bootstrap a project with pre-configured settings.

### Step 1: Create a New Project
Run the following command to create a Next.js project:

```bash
npx create-next-app@latest my-next-app
```

Follow the interactive prompts:
- **Would you like to use TypeScript?** Yes (for type safety)
- **Would you like to use ESLint?** Yes (for code linting)
- **Would you like to use Tailwind CSS?** Yes (for styling)
- **Would you like to use `src/` directory?** Yes (for organized structure)
- **Would you like to use App Router?** Yes (for modern routing)
- **Would you like to customize the default import alias?** No (use default `@/*`)

This creates a project with the following structure:

```
my-next-app/
├── node_modules/
├── public/
├── src/
│   ├── app/
│   │   ├── layout.js
│   │   ├── page.js
│   ├── styles/
│   │   ├── globals.css
├── .eslintrc.json
├── .gitignore
├── next.config.js
├── package.json
├── tsconfig.json
├── tailwind.config.js
```

### Step 2: Explore the Project Structure
- **`src/app/`**: Contains the App Router files (`page.js` for the homepage, `layout.js` for the root layout).
- **`public/`**: Stores static assets like images or favicon.
- **`src/styles/globals.css`**: Global CSS file (includes Tailwind CSS if selected).
- **`tsconfig.json`**: TypeScript configuration.
- **`.eslintrc.json`**: ESLint configuration.
- **`tailwind.config.js`**: Tailwind CSS configuration.
- **`next.config.js`**: Next.js configuration.

### Step 3: Start the Development Server
Navigate to the project directory and start the server:

```bash
cd my-next-app
npm run dev
```

**Output**:
```
ready - started server on 0.0.0.0:3000, url: http://localhost:3000
```

Open `http://localhost:3000` in your browser to see the default Next.js welcome page.

## Configuring TypeScript

If you selected TypeScript during setup, `create-next-app` configures it automatically. To verify:

::Editor
#title
src/app/page.tsx

#default

```tsx
export default function Home() {
  return (
    <main>
      <h1 className="text-4xl font-bold">Welcome to Next.js with TypeScript!</h1>
      <p className="mt-4">This is your first TypeScript page.</p>
    </main>
  );
}
```

::

**Test URL**: `http://localhost:3000`

**Browser Output**:
```
Welcome to Next.js with TypeScript!
This is your first TypeScript page.
```

**Explanation**:
- `.tsx` extension indicates a TypeScript React file.
- TypeScript provides type safety (e.g., catching type errors during development).
- The `className` uses Tailwind CSS classes (if enabled).

### Manual TypeScript Setup (Optional)
If you didn’t select TypeScript initially, add it:

1. Install TypeScript and types:
   ```bash
   npm install --save-dev typescript @types/react @types/node
   ```

2. Create `tsconfig.json`:
   ```bash
   npx tsc --init
   ```

3. Update `tsconfig.json`:
   ::Editor
   #title
   tsconfig.json

   #default

   ```json
   {
     "compilerOptions": {
       "target": "es5",
       "lib": ["dom", "dom.iterable", "esnext"],
       "allowJs": true,
       "skipLibCheck": true,
       "strict": true,
       "esModuleInterop": true,
       "module": "esnext",
       "moduleResolution": "node",
       "resolveJsonModule": true,
       "isolatedModules": true,
       "jsx": "preserve",
       "incremental": true,
       "baseUrl": ".",
       "paths": {
         "@/*": ["src/*"]
       }
     },
     "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
     "exclude": ["node_modules"]
   }
   ```

   ::

4. Rename `.js` files to `.tsx` (e.g., `src/app/page.js` to `src/app/page.tsx`).

5. Restart the development server:
   ```bash
   npm run dev
   ```

## Setting Up ESLint

ESLint is pre-configured if selected during setup. It enforces code quality and consistency.

### Verify ESLint
Check the ESLint configuration:

::Editor
#title
.eslintrc.json

#default

```json
{
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "plugins": ["react", "@typescript-eslint"],
  "rules": {
    "react/prop-types": "off"
  }
}
```

::

Run ESLint to check for issues:
```bash
npm run lint
```

### Add Prettier (Optional)
For consistent code formatting, integrate Prettier with ESLint:

1. Install dependencies:
   ```bash
   npm install --save-dev prettier eslint-config-prettier eslint-plugin-prettier
   ```

2. Create `.prettierrc`:
   ::Editor
   #title
   .prettierrc

   #default

   ```json
   {
     "semi": true,
     "trailingComma": "es5",
     "singleQuote": true,
     "printWidth": 80,
     "tabWidth": 2
   }
   ```

   ::

3. Update `.eslintrc.json`:
   ::Editor
   #title
   .eslintrc.json

   #default

   ```json
   {
     "env": {
       "browser": true,
       "es2021": true,
       "node": true
     },
     "extends": [
       "eslint:recommended",
       "plugin:react/recommended",
       "plugin:@typescript-eslint/recommended",
       "plugin:react-hooks/recommended",
       "prettier"
     ],
     "parser": "@typescript-eslint/parser",
     "parserOptions": {
       "ecmaVersion": 12,
       "sourceType": "module"
     },
     "plugins": ["react", "@typescript-eslint", "prettier"],
     "rules": {
       "react/prop-types": "off",
       "prettier/prettier": "error"
     }
   }
   ```

   ::

4. Run linting and formatting:
   ```bash
   npm run lint
   npx prettier --write .
   ```

## Setting Up Tailwind CSS

If you selected Tailwind CSS, it’s pre-configured. Verify the setup:

::Editor
#title
tailwind.config.js

#default

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

::

::Editor
#title
src/styles/globals.css

#default

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

::

**Use Tailwind in a Page**:

::Editor
#title
src/app/page.tsx

#default

```tsx
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-blue-600">Welcome to Next.js!</h1>
      <p className="mt-4 text-lg text-gray-600">This is a styled page using Tailwind CSS.</p>
    </main>
  );
}
```

::

**Test URL**: `http://localhost:3000`

**Browser Output**: A centered, styled homepage with Tailwind classes.

### Manual Tailwind Setup (Optional)
If Tailwind wasn’t selected:

1. Install Tailwind:
   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

2. Update `tailwind.config.js` as above.

3. Add Tailwind directives to `src/styles/globals.css`.

4. Restart the server:
   ```bash
   npm run dev
   ```

## Real-World Mini-Project: Portfolio Setup

Create a portfolio homepage with TypeScript and Tailwind CSS.

::Editor
#title
src/app/layout.tsx

#default

```tsx
import type { Metadata } from 'next';
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
      <body className="bg-gray-100">{children}</body>
    </html>
  );
}
```

::

::Editor
#title
src/app/page.tsx

#default

```tsx
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <h1 className="text-5xl font-bold text-blue-700">My Portfolio</h1>
      <p className="mt-4 text-xl text-gray-700">
        Welcome to my Next.js portfolio, built with TypeScript and Tailwind CSS.
      </p>
      <div className="mt-6 space-x-4">
        <a href="/about" className="text-blue-500 hover:underline">
          About Me
        </a>
        <a href="/projects" className="text-blue-500 hover:underline">
          Projects
        </a>
      </div>
    </main>
  );
}
```

::

::Editor
#title
src/app/about/page.tsx

#default

```tsx
export default function About() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-blue-700">About Me</h1>
      <p className="mt-4 text-lg text-gray-700">
        I’m a developer learning Next.js to build modern web applications.
      </p>
    </main>
  );
}
```

::

**Test URLs**:
- `http://localhost:3000/` → Portfolio homepage
- `http://localhost:3000/about` → About page

## Best Practices

### Environment Setup
- Use Node.js 18+ for compatibility.
- Install editor extensions for TypeScript, ESLint, and Tailwind.
- Initialize Git for version control:
  ```bash
  git init
  git add .
  git commit -m "Initial Next.js setup"
  ```

### Configuration
- Enable TypeScript for type safety in larger projects.
- Use ESLint and Prettier for consistent code quality.
- Leverage Tailwind CSS for rapid styling.

### Project Structure
- Use `src/` for organized code.
- Keep `public/` for static assets.
- Maintain modular files in `app/` for routing.

## Common Patterns

### Customizing next.config.js
Enable experimental features or configure settings:

::Editor
#title
next.config.js

#default

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;
```

::

### VS Code Settings
Create a `.vscode/settings.json` for editor consistency:

::Editor
#title
.vscode/settings.json

#default

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "eslint.run": "onSave"
}
```

::

## What’s Next?

In the next tutorial, **File-based Routing System**, you’ll learn how to leverage Next.js’s file-based routing to create dynamic and nested routes for your application.

### Key Takeaways:
- Set up a Next.js project with `create-next-app`
- Configure TypeScript for type-safe development
- Use ESLint and Prettier for code quality
- Style pages with Tailwind CSS
- Organize the project with `src/` and App Router
- Follow best practices for a robust setup

## Practice Exercise
1. Create a new Next.js project with TypeScript and Tailwind CSS.
2. Set up ESLint and Prettier for code formatting.
3. Create two pages: Home and Contact, styled with Tailwind.
4. Run the linter and fix any issues.
5. Commit the project to a Git repository.