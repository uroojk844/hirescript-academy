---
title: Dark Mode Implementation
description: Learn to implement dark mode in your Tailwind CSS projects.
navigation:
  order: 14
---

# Dark Mode Implementation

In this tutorial, you'll learn how to implement dark mode in your Tailwind CSS projects. Dark mode has become a popular feature that improves user experience by reducing eye strain in low-light environments and providing a modern aesthetic option.

In this tutorial, you'll learn:
- How to configure dark mode in Tailwind
- Using the `dark:` variant to style elements
- Creating a dark mode toggle
- Best practices for accessible dark mode designs

## Configuring Dark Mode

Tailwind CSS supports dark mode out of the box with two strategies: `media` (based on system preferences) and `class` (manually controlled). By default, dark mode uses the `media` strategy.

To enable class-based dark mode (recommended for toggle functionality), you need to configure your `tailwind.config.js`:

::Editor
#title
tailwind.config.js

#default
```js
module.exports = {
  darkMode: 'class', // or 'media'
  theme: {
    extend: {},
  },
  plugins: [],
}
```
::

### Strategy Options
- **`'media'`**: Automatically uses system dark mode preferences
- **`'class'`**: Requires adding a `dark` class to a parent element (usually `<html>` or `<body>`)

## Basic Dark Mode Styling

Once configured, you can use the `dark:` variant to apply styles only when dark mode is active:

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
    <title>Dark Mode Basics</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind.config = {
        darkMode: 'class'
      }
    </script>
  </head>
  <body class="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen p-8">
    <div class="max-w-2xl mx-auto">
      <h1 class="text-4xl font-bold mb-4">Dark Mode Example</h1>
      <p class="text-gray-700 dark:text-gray-300 mb-4">
        This text changes color based on the dark mode setting.
      </p>
      <div class="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <h2 class="text-2xl font-semibold mb-2">Card Component</h2>
        <p class="text-gray-600 dark:text-gray-400">
          This card adapts to dark mode automatically.
        </p>
      </div>
    </div>
  </body>
</html>
```
::

### Explanation
- `dark:bg-gray-900`: Applies dark background when dark mode is active
- `dark:text-gray-100`: Changes text to light color in dark mode
- Stack light and dark variants together for complete theming

## Creating a Dark Mode Toggle

Here's a practical example with a working toggle button:

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
    <title>Dark Mode Toggle</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind.config = {
        darkMode: 'class'
      }
    </script>
  </head>
  <body class="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300 min-h-screen">
    <div class="container mx-auto p-8">
      <header class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold">My Website</h1>
        <button 
          id="theme-toggle"
          class="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          <span id="theme-icon">🌙</span>
        </button>
      </header>
      
      <main class="grid gap-6">
        <section class="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
          <h2 class="text-2xl font-semibold mb-3">Welcome</h2>
          <p class="text-gray-700 dark:text-gray-300">
            Click the moon/sun icon to toggle dark mode.
          </p>
        </section>
      </main>
    </div>

    <script>
      const toggle = document.getElementById('theme-toggle');
      const icon = document.getElementById('theme-icon');
      const html = document.documentElement;

      toggle.addEventListener('click', () => {
        html.classList.toggle('dark');
        icon.textContent = html.classList.contains('dark') ? '☀️' : '🌙';
      });
    </script>
  </body>
</html>
```
::

### Key Points
- Toggle adds/removes `dark` class on the `<html>` element
- `transition-colors duration-300`: Smooth transition between modes
- Use emoji or icons (like from lucide-react) for toggle button

## Advanced Dark Mode Patterns

Create more complex components that look great in both modes:

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
    <title>Advanced Dark Mode</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind.config = {
        darkMode: 'class'
      }
    </script>
  </head>
  <body class="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 min-h-screen p-8 transition-colors duration-500">
    <div class="max-w-4xl mx-auto">
      <button 
        id="toggle"
        class="mb-6 px-4 py-2 rounded-full bg-white dark:bg-gray-700 shadow-lg"
      >
        <span id="icon">🌙</span> Toggle Theme
      </button>

      <div class="grid md:grid-cols-2 gap-6">
        <article class="bg-white dark:bg-gray-800 rounded-xl shadow-xl dark:shadow-2xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-2xl dark:hover:shadow-3xl transition-all">
          <div class="flex items-center mb-4">
            <div class="w-12 h-12 bg-blue-500 dark:bg-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
              A
            </div>
            <div class="ml-4">
              <h3 class="font-bold text-lg text-gray-900 dark:text-white">Article Title</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">2 hours ago</p>
            </div>
          </div>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
            This is a sample article that demonstrates how content looks in both light and dark modes with proper contrast and readability.
          </p>
          <button class="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-lg transition">
            Read More
          </button>
        </article>

        <article class="bg-white dark:bg-gray-800 rounded-xl shadow-xl dark:shadow-2xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 class="font-bold text-xl mb-4 text-gray-900 dark:text-white">Form Example</h3>
          <form class="space-y-4">
            <input 
              type="text" 
              placeholder="Your name"
              class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:outline-none"
            />
            <textarea 
              placeholder="Your message"
              rows="3"
              class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:outline-none"
            ></textarea>
            <button class="w-full py-2 bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white rounded-lg transition">
              Submit
            </button>
          </form>
        </article>
      </div>
    </div>

    <script>
      const toggle = document.getElementById('toggle');
      const icon = document.getElementById('icon');
      const html = document.documentElement;

      toggle.addEventListener('click', () => {
        html.classList.toggle('dark');
        icon.textContent = html.classList.contains('dark') ? '☀️' : '🌙';
      });
    </script>
  </body>
</html>
```
::

### Design Considerations
- Use lighter shades in dark mode (gray-700, gray-800) instead of pure black
- Adjust shadow intensity with `dark:shadow-2xl`
- Ensure proper contrast for form elements
- Use gradients that work in both modes

## Respecting System Preferences

You can initialize dark mode based on user's system preferences:

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
    <title>System Preference Detection</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind.config = {
        darkMode: 'class'
      }
    </script>
    <script>
      // Run before page loads to prevent flash
      if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
      }
    </script>
  </head>
  <body class="bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen p-8 transition-colors">
    <div class="max-w-2xl mx-auto">
      <h1 class="text-3xl font-bold mb-4">System Preference Aware</h1>
      <p class="mb-4 text-gray-700 dark:text-gray-300">
        This page respects your system's dark mode preference by default.
      </p>
      
      <div class="flex gap-4">
        <button id="light" class="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-lg">
          ☀️ Light
        </button>
        <button id="dark" class="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg">
          🌙 Dark
        </button>
        <button id="system" class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg">
          💻 System
        </button>
      </div>
    </div>

    <script>
      const html = document.documentElement;

      document.getElementById('light').addEventListener('click', () => {
        html.classList.remove('dark');
        localStorage.theme = 'light';
      });

      document.getElementById('dark').addEventListener('click', () => {
        html.classList.add('dark');
        localStorage.theme = 'dark';
      });

      document.getElementById('system').addEventListener('click', () => {
        localStorage.removeItem('theme');
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          html.classList.add('dark');
        } else {
          html.classList.remove('dark');
        }
      });
    </script>
  </body>
</html>
```
::

### Explanation
- Check `localStorage` for saved preference
- Fall back to `prefers-color-scheme` media query
- Save user's choice to persist across sessions
- Run script in `<head>` to prevent flash of wrong theme

## Best Practices

- Always provide sufficient contrast in both modes (WCAG AA minimum: 4.5:1 for text)
- Test with actual dark mode users, not just by toggling
- Avoid pure black backgrounds; use dark grays (gray-900) instead
- Make interactive elements clearly visible in both modes
- Use `transition-colors` for smooth theme switching
- Store user preference in localStorage
- Consider using `prefers-color-scheme` media query as default
- Don't forget to style all interactive states (hover, focus, active) for dark mode

## Common Pitfalls to Avoid

- Forgetting to style borders in dark mode (they disappear on dark backgrounds)
- Using images with white backgrounds in dark mode
- Not testing form inputs and other interactive elements
- Applying too much contrast (bright white on pure black causes eye strain)
- Forgetting to add `dark:` variants to hover and focus states

## What's Next?

You've learned how to implement dark mode in Tailwind CSS! In the next tutorial, we'll explore **Component Patterns and Reusability**, covering how to create reusable component styles and organize your Tailwind classes effectively.