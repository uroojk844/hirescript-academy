---
title: Installation and Setup
description: Learn different ways to install and configure Tailwind CSS in your projects.
navigation:
  order: 2
---

# Installation and Setup

In this tutorial, you'll learn how to install and set up Tailwind CSS in your projects. There are several ways to get started with Tailwind, from quick CDN links for prototyping to full installation for production projects.

In this tutorial, you'll learn:

- How to use Tailwind CSS via CDN for quick prototyping
- Installing Tailwind CSS with npm/yarn
- Setting up the Tailwind CLI
- Configuring your first Tailwind project
- Understanding the build process

## Method 1: CDN (Quick Start)

The fastest way to try Tailwind CSS is through the CDN. This method is perfect for learning, prototyping, or small projects, but shouldn't be used in production.

::Editor
#title
index.html

#default

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Tailwind CDN Setup</title>
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="bg-blue-50 min-h-screen flex items-center justify-center">
    <div class="bg-white p-8 rounded-lg shadow-lg max-w-md">
      <h1 class="text-2xl font-bold text-gray-800 mb-4">Hello Tailwind!</h1>
      <p class="text-gray-600 mb-6">
        This page is using Tailwind CSS via CDN. Perfect for quick prototyping!
      </p>
      <button class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition-colors">
        Get Started
      </button>
    </div>
  </body>
</html>
```

::

### CDN Pros and Cons:

**Pros:**
- No installation required
- Instant setup
- Great for learning and prototyping

**Cons:**
- Large file size (includes all utilities)
- No customization options
- Not suitable for production

## Method 2: npm/yarn Installation

For production projects, install Tailwind CSS as a dependency. This gives you full control over configuration and enables purging unused styles.

### Step 1: Initialize Your Project

First, create a new project directory and initialize it:

```bash
mkdir my-tailwind-project
cd my-tailwind-project
npm init -y
```

### Step 2: Install Tailwind CSS

Install Tailwind CSS and its peer dependencies:

```bash
# Using npm
npm install -D tailwindcss postcss autoprefixer

# Using yarn
yarn add -D tailwindcss postcss autoprefixer
```

### Step 3: Generate Configuration Files

Generate your `tailwind.config.js` and `postcss.config.js` files:

```bash
npx tailwindcss init -p
```

This creates two files:

**tailwind.config.js:**
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

**postcss.config.js:**
```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### Step 4: Configure Content Paths

Update your `tailwind.config.js` to include paths to all your template files:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./public/**/*.html",
    "./*.html"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### Step 5: Create Your CSS File

Create a CSS file (e.g., `src/input.css`) and add Tailwind directives:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Step 6: Build Your CSS

Add a build script to your `package.json`:

```json
{
  "scripts": {
    "build-css": "tailwindcss -i ./src/input.css -o ./public/output.css --watch"
  }
}
```

Run the build process:

```bash
npm run build-css
```

### Step 7: Use in Your HTML

Create an HTML file and link to your generated CSS:

::Editor
#title
index.html

#default

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Tailwind Project Setup</title>
    <link href="./public/output.css" rel="stylesheet">
  </head>
  <body class="bg-gradient-to-br from-purple-400 to-blue-500 min-h-screen">
    <div class="container mx-auto px-4 py-8">
      <div class="bg-white rounded-xl shadow-2xl p-8 max-w-2xl mx-auto">
        <h1 class="text-4xl font-bold text-center mb-6 text-gray-800">
          Project Setup Complete!
        </h1>
        <div class="grid md:grid-cols-2 gap-6">
          <div class="bg-green-50 p-4 rounded-lg">
            <h3 class="font-semibold text-green-800 mb-2">✅ Installed</h3>
            <p class="text-green-700">Tailwind CSS is now installed and configured</p>
          </div>
          <div class="bg-blue-50 p-4 rounded-lg">
            <h3 class="font-semibold text-blue-800 mb-2">🚀 Ready</h3>
            <p class="text-blue-700">Start building amazing interfaces!</p>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>
```

::

## Method 3: Tailwind CLI

The Tailwind CLI is a standalone tool that doesn't require Node.js dependencies.

### Installation

Download and install the CLI:

```bash
# macOS (using curl)
curl -sLO https://github.com/tailwindlabs/tailwindcss/releases/latest/download/tailwindcss-macos-x64
chmod +x tailwindcss-macos-x64
mv tailwindcss-macos-x64 tailwindcss

# Linux
curl -sLO https://github.com/tailwindlabs/tailwindcss/releases/latest/download/tailwindcss-linux-x64
chmod +x tailwindcss-linux-x64
mv tailwindcss-linux-x64 tailwindcss

# Windows (download the .exe from GitHub releases)
```

### Usage

Initialize and build with the CLI:

```bash
# Initialize config file
./tailwindcss init

# Build CSS
./tailwindcss -i input.css -o output.css --watch
```

## Understanding the Build Process

When you build Tailwind CSS, several important things happen:

1. **Processing Directives**: `@tailwind` directives are replaced with actual CSS
2. **Content Scanning**: Tailwind scans your files for class names
3. **Purging**: Unused styles are removed (in production builds)
4. **PostCSS Processing**: Additional transformations like autoprefixer

### Development vs Production

**Development Build:**
```bash
tailwindcss -i input.css -o output.css --watch
```

**Production Build:**
```bash
tailwindcss -i input.css -o output.css --minify
```

The production build:
- Minifies the CSS
- Removes unused styles
- Optimizes for smaller file size

## Project Structure Best Practices

Here's a recommended project structure:

```
my-project/
├── src/
│   ├── input.css
│   └── components/
├── public/
│   ├── index.html
│   └── output.css
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## Common Setup Issues and Solutions

### Issue 1: Styles Not Updating
**Problem**: Changes to HTML classes don't reflect in the browser.

**Solution**: Ensure your content paths in `tailwind.config.js` are correct and the build process is running with `--watch`.

### Issue 2: Large CSS File Size
**Problem**: Generated CSS file is too large.

**Solution**: Make sure your content paths are specific and run a production build with `--minify`.

### Issue 3: Classes Not Working
**Problem**: Tailwind classes have no effect.

**Solution**: Verify that your CSS file includes the Tailwind directives and is properly linked in your HTML.

## What's Next?

You've learned how to set up Tailwind CSS in different ways! In the next tutorial, we'll dive deep into **Understanding the Utility-First Approach**, where you'll learn the core concepts that make Tailwind so powerful and efficient.