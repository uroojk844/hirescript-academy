---
title: Performance Optimization
description: Learn how to optimize Tailwind CSS for production and improve performance.
navigation:
  order: 19
---

# Performance Optimization in Tailwind CSS

Performance optimization is crucial when using Tailwind CSS in production applications. By default, Tailwind generates thousands of utility classes, but most projects only use a fraction of them. In this tutorial, you'll learn how to optimize your Tailwind CSS build for maximum performance and minimal bundle size.

In this tutorial, you'll learn:
- How to purge unused CSS classes
- Build optimization strategies
- Content configuration best practices
- Advanced optimization techniques

## Understanding the Problem

Tailwind CSS generates a comprehensive set of utility classes by default, which can result in a large CSS file (often 3MB+ uncompressed). However, most projects only use a small percentage of these classes, making optimization essential for production builds.

Here's what happens without optimization:

::Editor
#title
styles.css (unoptimized)

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

## Configuring Content Purging

The most important optimization is configuring the `content` option in your `tailwind.config.js` file. This tells Tailwind which files to scan for class usage.

::Editor
#title
tailwind.config.js

#default
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    // Include any other file types that contain Tailwind classes
    "./public/index.html",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```
::

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
    "./src/**/*.{js,jsx,ts,tsx,vue,html}",
    
    // Include template files if using SSR
    "./templates/**/*.html",
    
    // Include any JavaScript files that generate classes
    "./utils/classNames.js",
    
    // Avoid scanning unnecessary files
    "!./node_modules/**",
    "!./dist/**",
  ],
  // ... rest of config
}
```
::

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
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  
  // Disable unused features in production
  corePlugins: {
    // Disable if you're not using these features
    preflight: true,
    container: false,
  },
  
  theme: {
    extend: {
      // Only include custom values you actually use
      colors: {
        primary: '#3B82F6',
        secondary: '#1F2937',
      }
    },
  },
  
  plugins: [
    // Only include plugins you're using
    // require('@tailwindcss/forms'),
    // require('@tailwindcss/typography'),
  ],
}
```
::

### Build Script Optimization

Create optimized build scripts for different environments:

::Editor
#title
package.json

#default
```json
{
  "scripts": {
    "build:css": "tailwindcss -i ./src/input.css -o ./dist/output.css --watch",
    "build:css:prod": "tailwindcss -i ./src/input.css -o ./dist/output.css --minify",
    "build": "npm run build:css:prod"
  },
  "devDependencies": {
    "tailwindcss": "^3.3.0",
    "@tailwindcss/cli": "^3.3.0"
  }
}
```
::

## Advanced Optimization Techniques

### Safelist Important Classes

Sometimes Tailwind might remove classes that are generated dynamically. Use the safelist to preserve them:

::Editor
#title
tailwind.config.js

#default
```javascript
module.exports = {
  content: ["./src/**/*.{html,js}"],
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
    }
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```
::

### Tree Shaking Unused Plugins

Only include the Tailwind plugins you're actually using:

::Editor
#title
tailwind.config.js

#default
```javascript
module.exports = {
  content: ["./src/**/*.{html,js}"],
  
  // Disable core plugins you don't use
  corePlugins: {
    float: false,           // If you don't use float utilities
    objectFit: false,       // If you don't use object-fit utilities
    objectPosition: false,  // If you don't use object-position utilities
  },
  
  theme: {
    // Remove unused breakpoints
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      // Remove xl, 2xl if not used
    },
    
    // Reduce color palette if needed
    colors: {
      // Keep only the colors you use
      white: '#ffffff',
      black: '#000000',
      gray: {
        100: '#f7fafc',
        200: '#edf2f7',
        // ... only include shades you use
      }
    }
  },
  
  plugins: [
    // Only include plugins you actually use
  ],
}
```
::

## Measuring Performance Impact

### Before and After Comparison

Use tools to measure your CSS file size:

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

# Use gzip to see compressed size
gzip -c dist/styles.css | wc -c
```
::

### Bundle Analysis

For webpack-based projects, analyze your bundle:

::Editor
#title
webpack.config.js

#default
```javascript
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  // ... other config
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
    }),
  ],
};
```
::

## Performance Best Practices

1. **Use specific content paths**: Only scan files that contain Tailwind classes
2. **Remove unused core plugins**: Disable features you don't use
3. **Limit your color palette**: Only include colors you actually use
4. **Use safelist sparingly**: Only for dynamically generated classes
5. **Monitor bundle size**: Regularly check your CSS file size
6. **Enable compression**: Use gzip or Brotli compression on your server

## Common Performance Issues

### Dynamic Class Generation

Avoid generating classes dynamically as they might be purged:

::Editor
#title
Bad Practice

#default
```javascript
// This might get purged
const color = 'red';
const shade = '500';
const className = `text-${color}-${shade}`;

// Better approach - use safelist or predefined classes
const classMap = {
  red: 'text-red-500',
  blue: 'text-blue-500',
  green: 'text-green-500',
};
const className = classMap[color];
```
::

## What's Next?

You've learned how to optimize Tailwind CSS for production! In the next tutorial, we'll explore **Best Practices and Common Patterns**, covering naming conventions, component organization, and maintainable CSS architecture.