---
title: Performance Optimization in Tailwind CSS
description: Learn how to optimize Tailwind CSS for production in static HTML projects to improve performance and reduce bundle size.
navigation:
  order: 19
---

# Performance Optimization in Tailwind CSS

Performance optimization is critical when using Tailwind CSS in production for static HTML applications. By default, Tailwind generates thousands of utility classes, but most projects only use a small fraction of them. In this tutorial, you’ll learn how to optimize your Tailwind CSS build for maximum performance and minimal bundle size in a static HTML project.

In this tutorial, you’ll learn:
- How to purge unused CSS classes
- Build optimization strategies for static sites
- Content configuration best practices
- Advanced optimization techniques
- Measuring performance impact

## Understanding the Problem

Tailwind CSS generates a comprehensive set of utility classes by default, resulting in a large CSS file (often 3MB+ uncompressed). In static HTML projects, where you’re serving CSS directly, this can slow down page load times. Most projects only use a small percentage of these classes, making optimization essential.

Here’s an example of what an unoptimized Tailwind CSS file includes:

::Editor
#title
dist/styles.css (unoptimized)

#default
```css
/* Tailwind generates thousands of classes like: */
.text-xs { font-size: 0.75rem; line-height: 1rem; }
.text-sm { font-size: 0.875rem; line-height: 1.25rem; }
.text-base { font-size: 1rem; line-height: 1.5rem; }
/* ... thousands more classes you might not use */

.bg-red-50 { background-color: rgb(254 242 242); }
.bg-red-100 { background-color: rgb(254 226 226); }
/* ... hundreds of color variations */
```
::

## Setting Up the Project

Create a simple static HTML project using Tailwind CSS. You can use Tailwind via a CDN for development or compile it for production.

**Project Structure**:

```
my-tailwind-site/
├── node_modules/
├── src/
│   ├── css/
│   │   ├── input.css
│   ├── html/
│   │   ├── index.html
│   │   ├── about.html
│   │   ├── blog.html
│   │   ├── contact.html
├── dist/
│   ├── styles.css
├── public/
│   ├── images/
│   │   ├── placeholder.jpg
├── tailwind.config.js
├── package.json
```

**Install Tailwind CSS**:
```bash
npm init -y
npm install --save-dev tailwindcss
npx tailwindcss init
```

**Input CSS File**:

::Editor
#title
src/css/input.css

#default
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```
::

**Sample HTML File**:

::Editor
#title
src/html/index.html

#default
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Portfolio</title>
  <link href="/dist/styles.css" rel="stylesheet">
</head>
<body class="bg-gray-100">
  <nav class="bg-blue-600 text-white p-4">
    <div class="max-w-4xl mx-auto flex justify-between items-center">
      <a href="/" class="text-xl font-bold">My Portfolio</a>
      <div class="space-x-4">
        <a href="/about.html" class="hover:underline">About</a>
        <a href="/blog.html" class="hover:underline">Blog</a>
        <a href="/contact.html" class="hover:underline">Contact</a>
      </div>
    </div>
  </nav>
  <main class="max-w-4xl mx-auto p-6">
    <h1 class="text-3xl font-bold text-blue-700">Welcome</h1>
    <p class="mt-4 text-gray-700">This is a static HTML site using Tailwind CSS.</p>
  </main>
</body>
</html>
```
::

Start the development server (optional, for local testing):
```bash
npx tailwindcss -i ./src/css/input.css -o ./dist/styles.css --watch
```

**Test URL**: Serve via a local server (e.g., `npx serve dist`) at `http://localhost:3000`.

## Configuring Content Purging

The most important optimization is configuring the `content` option in `tailwind.config.js` to scan only the files that contain Tailwind classes.

::Editor
#title
tailwind.config.js

#default
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/html/**/*.{html}",
    "./src/js/**/*.{js}",
    // Include other file types if you add JavaScript
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```
::

**Explanation**:
- `content` specifies which files Tailwind should scan for class usage.
- Only HTML files in `src/html/` are scanned in this example.
- This removes unused classes during the build process.

### Best Practices for Content Configuration

Be specific with your content paths to ensure all classes are detected while avoiding unnecessary files:

::Editor
#title
tailwind.config.js (optimized)

#default
```javascript
module.exports = {
  content: [
    // Include specific file extensions
    "./src/html/**/*.{html}",
    "./src/js/**/*.{js}",
    
    // Avoid scanning unnecessary files
    "!./node_modules/**",
    "!./dist/**",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```
::

**Explanation**:
- Use precise paths to include only relevant files.
- Exclude `node_modules` and `dist` to prevent unnecessary scanning.
- Add JavaScript files if you dynamically generate classes.

## Optimizing Your Build Process

### Using Environment Variables

Set up different configurations for development and production:

::Editor
#title
tailwind.config.js

#default
```javascript
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  content: [
    "./src/html/**/*.{html}",
    "./src/js/**/*.{js}",
  ],
  
  // Disable unused features in production
  corePlugins: {
    preflight: isProduction ? false : true, // Disable base styles if custom CSS is used
    container: false, // Disable if not using container classes
  },
  
  theme: {
    extend: {
      // Only include custom values you actually use
      colors: {
        primary: '#3B82F6',
        secondary: '#1F2937',
      },
    },
  },
  
  plugins: [],
}
```
::

**Explanation**:
- Disable `preflight` in production if you have custom base styles.
- Only include necessary custom colors to reduce CSS size.

### Build Script Optimization

Create optimized build scripts for different environments:

::Editor
#title
package.json

#default
```json
{
  "scripts": {
    "build:css": "tailwindcss -i ./src/css/input.css -o ./dist/styles.css --watch",
    "build:css:prod": "NODE_ENV=production tailwindcss -i ./src/css/input.css -o ./dist/styles.css --minify",
    "build": "npm run build:css:prod"
  },
  "devDependencies": {
    "tailwindcss": "^3.4.0"
  }
}
```
::

**Explanation**:
- `build:css` runs Tailwind in watch mode for development.
- `build:css:prod` minifies the output for production.
- Minification reduces the CSS file size significantly.

## Advanced Optimization Techniques

### Safelist Important Classes

Some classes may be used dynamically (e.g., via JavaScript) and could be purged. Use the `safelist` to preserve them:

::Editor
#title
tailwind.config.js

#default
```javascript
module.exports = {
  content: ["./src/html/**/*.{html}", "./src/js/**/*.{js}"],
  safelist: [
    // Preserve specific classes
    'text-red-500',
    'bg-blue-600',
    
    // Preserve class patterns
    {
      pattern: /bg-(red|green|blue)-(400|500|600)/,
    },
    
    // Preserve classes with variants
    {
      pattern: /text-(sm|base|lg|xl)/,
      variants: ['sm', 'md', 'lg'],
    },
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```
::

**Explanation**:
- `safelist` ensures dynamically used classes aren’t purged.
- Use sparingly to avoid increasing bundle size.

### Tree Shaking Unused Plugins

Disable unused core plugins to reduce CSS size:

::Editor
#title
tailwind.config.js

#default
```javascript
module.exports = {
  content: ["./src/html/**/*.{html}", "./src/js/**/*.{js}"],
  
  // Disable core plugins you don't use
  corePlugins: {
    float: false,           // Disable if not using float utilities
    objectFit: false,       // Disable if not using object-fit utilities
    objectPosition: false,  // Disable if not using object-position utilities
  },
  
  theme: {
    // Remove unused breakpoints
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      // Remove xl, 2xl if not used
    },
    
    // Reduce color palette
    colors: {
      white: '#ffffff',
      black: '#000000',
      gray: {
        100: '#f7fafc',
        200: '#edf2f7',
        700: '#4a5568',
      },
      blue: {
        600: '#2563eb',
        700: '#1d4ed8',
      },
    },
  },
  
  plugins: [],
}
```
::

**Explanation**:
- Disable unused plugins like `float` to reduce generated CSS.
- Limit breakpoints and colors to only those used in your HTML.

## Measuring Performance Impact

### Before and After Comparison

Measure the CSS file size before and after optimization:

::Editor
#title
Terminal Commands

#default
```bash
# Check file size before optimization
ls -lh dist/styles.css

# Build with optimization
npm run build:css:prod

# Check file size after optimization
ls -lh dist/styles.css

# Check compressed size with gzip
gzip -c dist/styles.css | wc -c
```
::

**Example Output**:
- Before: `dist/styles.css` ~3MB
- After: `dist/styles.css` ~20KB (minified and purged)
- Gzipped: ~5KB

### Using a Static Site Analyzer

For static sites, use a tool like `css-stats` to analyze CSS:

```bash
npm install -g css-stats
css-stats dist/styles.css > css-report.json
```

**Explanation**:
- `css-stats` provides detailed metrics on CSS file size and selector count.
- Use these metrics to identify further optimization opportunities.

## Performance Best Practices

1. **Use specific content paths**: Only scan files that contain Tailwind classes.
2. **Remove unused core plugins**: Disable features you don’t use.
3. **Limit your color palette**: Only include colors used in your HTML.
4. **Use safelist sparingly**: Only for dynamically generated classes.
5. **Monitor bundle size**: Regularly check your CSS file size.
6. **Enable compression**: Use gzip or Brotli on your server (e.g., Nginx, Netlify).

## Common Performance Issues

### Dynamic Class Generation

Avoid generating classes dynamically in JavaScript, as they may be purged:

::Editor
#title
src/js/utils.js (Bad Practice)

#default
```javascript
// This might get purged
const color = 'red';
const shade = '500';
const className = `text-${color}-${shade}`;

// Better approach - use predefined classes
const classMap = {
  red: 'text-red-500',
  blue: 'text-blue-500',
  green: 'text-green-500',
};
const className = classMap[color];
```
::

::Editor
#title
src/html/blog.html (Using Predefined Classes)

#default
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Blog</title>
  <link href="/dist/styles.css" rel="stylesheet">
</head>
<body class="bg-gray-100">
  <nav class="bg-blue-600 text-white p-4">
    <div class="max-w-4xl mx-auto flex justify-between items-center">
      <a href="/" class="text-xl font-bold">My Portfolio</a>
      <div class="space-x-4">
        <a href="/about.html" class="hover:underline">About</a>
        <a href="/blog.html" class="hover:underline">Blog</a>
        <a href="/contact.html" class="hover:underline">Contact</a>
      </div>
    </div>
  </nav>
  <main class="max-w-4xl mx-auto p-6">
    <h1 class="text-3xl font-bold text-blue-700">Blog</h1>
    <div class="mt-4">
      <input type="text" placeholder="Search posts..." class="border p-2 w-full rounded text-gray-700">
    </div>
    <ul class="mt-4 space-y-4">
      <li class="border p-4 rounded">
        <a href="#" class="text-blue-500 hover:underline">
          <h2 class="text-xl font-semibold">First Post</h2>
        </a>
        <p class="text-gray-700">This is the first post.</p>
      </li>
    </ul>
  </main>
  <script src="/js/utils.js"></script>
</body>
</html>
```
::

**Explanation**:
- Use predefined classes in HTML to ensure they’re detected by Tailwind’s purge process.
- If dynamic classes are needed, add them to the `safelist`.

## Real-World Mini-Project: Optimized Static Site

Enhance the static site with optimized Tailwind CSS.

**Updated Project Structure**:

```
my-tailwind-site/
├── node_modules/
├── src/
│   ├── css/
│   │   ├── input.css
│   ├── html/
│   │   ├── index.html
│   │   ├── about.html
│   │   ├── blog.html
│   │   ├── contact.html
│   ├── js/
│   │   ├── utils.js
├── dist/
│   ├── styles.css
├── public/
│   ├── images/
│   │   ├── placeholder.jpg
├── tailwind.config.js
├── package.json
```

**Test URLs** (via local server):
- `http://localhost:3000/index.html`
- `http://localhost:3000/blog.html`

**Build for Production**:
```bash
npm run build:css:prod
```

**Deploy**:
Copy the `dist` folder to a static hosting service like Netlify or Vercel.

## What’s Next?

You’ve learned how to optimize Tailwind CSS for a static HTML site! In the next tutorial, **Best Practices and Common Patterns**, you’ll explore naming conventions, reusable HTML snippets, and maintainable CSS architecture for static sites.

### Key Takeaways:
- Configure `content` to purge unused Tailwind classes
- Optimize the build process with minification and environment variables
- Use `safelist` for dynamic classes
- Disable unused plugins and limit the theme
- Measure performance with file size checks and tools
- Follow best practices for efficient CSS delivery

## Practice Exercise
1. Set up a static HTML site with Tailwind CSS.
2. Configure `tailwind.config.js` to purge unused classes.
3. Optimize the build process with minification.
4. Add a `safelist` for a dynamic class used in JavaScript.
5. Measure the CSS file size before and after optimization.