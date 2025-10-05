---
title: Introduction to Next.js
description: Learn the basics of Next.js, a React framework for building server-rendered, static, and hybrid web applications.
navigation:
  order: 1
---

# Introduction to Next.js

Welcome to the first lesson in our **Next.js Tutorial - 20 Modules** series! In this tutorial, you’ll get an overview of **Next.js**, a powerful React framework designed to simplify building modern web applications. You’ll learn what Next.js is, its key features, and why it’s a popular choice for developers. This lesson sets the foundation for the rest of the series, preparing you for hands-on development in subsequent modules.

In this tutorial, you’ll learn:

- What is Next.js and its core concepts
- Key features and benefits of Next.js
- Common use cases for Next.js
- Comparing Next.js with other frameworks
- Setting up your development environment
- Creating your first Next.js page

## What is Next.js?

**Next.js** is a full-stack React framework for building server-rendered, static, and hybrid web applications. It extends React with features like file-based routing, server-side rendering (SSR), static site generation (SSG), and API routes, making it ideal for building performant and SEO-friendly applications.

**Core Concepts**:
- **File-based Routing**: Create pages by adding files to the `pages/` directory (e.g., `pages/about.js` becomes `/about`).
- **Rendering Modes**:
  - **Static Site Generation (SSG)**: Pre-renders pages at build time.
  - **Server-Side Rendering (SSR)**: Renders pages on each request.
  - **Client-Side Rendering (CSR)**: Renders in the browser using React.
- **API Routes**: Build backend endpoints within the same project.
- **Built-in Optimizations**: Image optimization, code splitting, and more.

## Key Features of Next.js

Next.js offers a rich set of features that streamline web development:

- **Automatic Routing**: No need for external routing libraries; file names define routes.
- **Pre-rendering**: Supports SSG and SSR for better performance and SEO.
- **Image Optimization**: Built-in `next/image` component for lazy loading and modern formats.
- **API Routes**: Create serverless API endpoints in `pages/api/`.
- **TypeScript Support**: Native support for TypeScript with zero configuration.
- **Fast Refresh**: Instant feedback during development.
- **Built-in CSS Support**: Import CSS files or use CSS-in-JS solutions like styled-components.
- **Vercel Integration**: Seamless deployment with Vercel, the creators of Next.js.

## Why Use Next.js?

Next.js is popular for its developer experience and performance benefits:

- **SEO-Friendly**: Pre-rendering improves search engine visibility.
- **Performance**: Automatic optimizations like code splitting and image compression.
- **Developer Productivity**: Simplifies routing, data fetching, and state management.
- **Flexibility**: Supports static sites, dynamic apps, and full-stack applications.
- **Ecosystem**: Integrates with tools like React, TypeScript, and databases.

**Use Cases**:
- E-commerce websites (e.g., product pages with SSG)
- Blogs and content-heavy sites (SEO and performance)
- Dashboards and SaaS applications (dynamic rendering)
- APIs and full-stack apps (with API routes)

## Comparing Next.js with Other Frameworks

| Feature                | Next.js                     | Create React App (CRA) | Gatsby                     |
|------------------------|-----------------------------|------------------------|----------------------------|
| **Base Framework**     | React                      | React                 | React                     |
| **Routing**            | File-based                 | Manual (React Router) | File-based                |
| **Rendering**          | SSG, SSR, CSR              | CSR                   | SSG, CSR                  |
| **API Routes**         | Built-in                   | None                  | None                      |
| **Image Optimization** | Built-in (`next/image`)    | Manual                | Built-in                  |
| **Deployment**         | Vercel, others             | Any host              | Netlify, others           |

**When to Choose Next.js**:
- Need server-side rendering or static generation.
- Want a full-stack solution with API routes.
- Prioritize SEO and performance out of the box.

## Setting Up Your Development Environment

To start using Next.js, ensure you have:

- **Node.js**: Version 18 or higher (download from [nodejs.org](https://nodejs.org/)).
- **Code Editor**: VS Code or similar.
- **Terminal**: For running commands.
- **Git**: For version control.

### Verify Node.js Installation
```bash
node -v
npm -v
```

**Expected Output**:
```
v18.x.x
v9.x.x
```

## Creating Your First Next.js Page

Let’s create a simple Next.js project to get started.

### Step 1: Create a Next.js App
Run the following command to bootstrap a Next.js project:

```bash
npx create-next-app@latest my-next-app
```

Follow the prompts:
- Template: Default
- TypeScript: Optional (select `No` for simplicity)
- ESLint, Tailwind CSS, etc.: Optional (select defaults for now)

This creates a project structure:

```
my-next-app/
├── node_modules/
├── pages/
│   ├── _app.js
│   ├── index.js
├── public/
├── styles/
│   ├── globals.css
├── .gitignore
├── package.json
├── next.config.js
```

### Step 2: Start the Development Server
Navigate to the project directory and start the server:

```bash
cd my-next-app
npm run dev
```

**Output**:
```
ready - started server on 0.0.0.0:3000, url: http://localhost:3000
```

Open `http://localhost:3000` in your browser to see the default Next.js page.

### Step 3: Create a Simple Page
Modify the homepage to display a welcome message.

::Editor
#title
pages/index.js

#default

```javascript
export default function Home() {
  return (
    <div>
      <h1>Welcome to Next.js!</h1>
      <p>This is your first Next.js page.</p>
    </div>
  );
}
```

::

**Test URL**: `http://localhost:3000`

**Browser Output**:
```
Welcome to Next.js!
This is your first Next.js page.
```

**Explanation**:
- `pages/index.js`: Defines the homepage (`/` route).
- Next.js automatically renders this as a React component.
- The `export default` function is the page’s content.

### Step 4: Add Another Page
Create an About page to explore file-based routing.

::Editor
#title
pages/about.js

#default

```javascript
export default function About() {
  return (
    <div>
      <h1>About Us</h1>
      <p>Learn more about our Next.js application.</p>
    </div>
  );
}
```

::

**Test URL**: `http://localhost:3000/about`

**Browser Output**:
```
About Us
Learn more about our Next.js application.
```

**Explanation**:
- `pages/about.js` automatically maps to the `/about` route.
- No additional routing setup is needed.

## Styling the Page (Optional Preview)

Add basic CSS to enhance the homepage.

::Editor
#title
styles/globals.css

#default

```css
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 20px;
}

h1 {
  color: #333;
}

p {
  color: #666;
}
```

::

**Update index.js to use styles**:

::Editor
#title
pages/index.js

#default

```javascript
export default function Home() {
  return (
    <div>
      <h1>Welcome to Next.js!</h1>
      <p>This is your first Next.js page.</p>
    </div>
  );
}
```

::

Refresh `http://localhost:3000` to see styled content.

## Real-World Mini-Project: Portfolio Homepage

Create a simple portfolio homepage to apply what you’ve learned.

::Editor
#title
pages/index.js

#default

```javascript
export default function Portfolio() {
  return (
    <div>
      <h1>My Portfolio</h1>
      <p>Welcome to my Next.js portfolio! I’m a developer learning Next.js.</p>
      <ul>
        <li><a href="/about">About Me</a></li>
        <li><a href="/projects">Projects</a></li>
      </ul>
    </div>
  );
}
```

::

::Editor
#title
pages/projects.js

#default

```javascript
export default function Projects() {
  return (
    <div>
      <h1>My Projects</h1>
      <p>Explore my Next.js projects.</p>
    </div>
  );
}
```

::

**Test URLs**:
- `http://localhost:3000/` → Portfolio homepage
- `http://localhost:3000/about` → About page
- `http://localhost:3000/projects` → Projects page

## Best Practices

### Project Setup
- Use `create-next-app` for quick setup.
- Keep the `pages/` directory organized for routing.
- Commit changes to Git for version control.

### Development
- Leverage Next.js Fast Refresh for quick feedback.
- Start with simple pages to understand routing.
- Use React components for reusable UI.

### Learning Path
- Familiarize yourself with React if new to it.
- Explore Next.js documentation for deeper insights.

## What’s Next?

In the next tutorial, **Installation and Setup**, you’ll dive deeper into setting up a Next.js project, including TypeScript, ESLint, and other configurations to prepare for advanced development.

### Key Takeaways:
- Next.js is a React framework for server-rendered and static web apps
- Offers file-based routing, pre-rendering, and API routes
- Simplifies development with built-in optimizations
- Ideal for SEO, performance, and full-stack apps
- Create pages easily with the `pages/` directory
- Set up a basic Next.js project with `create-next-app`

## Practice Exercise
1. Create a new Next.js project using `create-next-app`.
2. Add three pages: Home, About, and Contact.
3. Add basic CSS to style the pages.
4. Test navigation between pages in the browser.
5. Explore the Next.js documentation for additional features.