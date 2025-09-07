---
title: CSS Variables Theming
description: Build dynamic themes with CSS.
navigation:
  order: 14
---

# CSS Variables and Theming

In this tutorial, you’ll learn to use **CSS variables (custom properties)** to create reusable, dynamic styles and implement theming for web applications. You’ll define variables, create themes, switch them with JavaScript, and apply responsive theming, all using plain HTML, CSS, and JavaScript.

In this tutorial, you’ll learn:
- Defining and using CSS variables
- Creating light and dark themes
- Dynamically switching themes with JavaScript
- Responsive theming for different devices
- Theming specific components
- Handling fallbacks and browser compatibility
- Best practices for maintainable styles

## Defining CSS Variables

CSS variables are defined with `--` in `:root` and used with `var()`:

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
    <title>Basic CSS Variables</title>
    <style>
      :root {
        --primary-color: #007bff;
        --background: #f8f9fa;
        --font-size: 16px;
        --padding: 20px;
      }
      .container {
        background: var(--background);
        padding: var(--padding);
        font-size: var(--font-size);
        display: flex; flex-direction: column; gap: 10px;
      }
      button {
        background: var(--primary-color);
        color: white;
        padding: 10px;
        border: none;
        cursor: pointer;
      }
      button:hover {
        background: #0056b3;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Using CSS Variables</h1>
      <button>Click Me</button>
      <p>Reusable styles with variables.</p>
    </div>
  </body>
</html>
```
::

## Light and Dark Themes

Create themes by redefining variables:

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
    <title>Light/Dark Theme</title>
    <style>
      :root {
        --primary-color: #007bff;
        --background: #ffffff;
        --text-color: #333333;
        --font-size: 16px;
      }
      [data-theme="dark"] {
        --primary-color: #66b0ff;
        --background: #222222;
        --text-color: #ffffff;
        --font-size: 16px;
      }
      body {
        background: var(--background);
        color: var(--text-color);
        font-size: var(--font-size);
        font-family: Arial, sans-serif;
        margin: 0;
      }
      .container {
        display: flex; flex-direction: column; gap: 15px; padding: 20px;
      }
      button {
        background: var(--primary-color);
        color: white;
        padding: 12px;
        border: none;
        cursor: pointer;
      }
      button:hover {
        background: #0056b3;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Theme Switcher</h1>
      <button onclick="toggleTheme()">Toggle Theme</button>
      <p>Switch between light and dark themes.</p>
    </div>
    <script>
      function toggleTheme() {
        document.body.dataset.theme = document.body.dataset.theme === 'dark' ? '' : 'dark';
      }
    </script>
  </body>
</html>
```
::

## Dynamic Theme Switching

Change variables dynamically with JavaScript:

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
    <title>Dynamic Theme</title>
    <style>
      :root {
        --primary-color: #007bff;
        --background: #ffffff;
        --text-color: #333333;
      }
      .container {
        background: var(--background);
        color: var(--text-color);
        padding: 20px;
        display: flex; flex-direction: column; gap: 15px;
      }
      button {
        background: var(--primary-color);
        color: white;
        padding: 12px;
        border: none;
        cursor: pointer;
      }
      input[type="color"] {
        padding: 5px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Dynamic Theme Switcher</h1>
      <input type="color" id="colorPicker" value="#007bff">
      <button>Primary Button</button>
      <p>Pick a color to update theme.</p>
    </div>
    <script>
      document.getElementById('colorPicker').addEventListener('input', (e) => {
        document.documentElement.style.setProperty('--primary-color', e.target.value);
      });
    </script>
  </body>
</html>
```
::

## Responsive Theming

Adjust variables based on screen size:

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
    <title>Responsive Theming</title>
    <style>
      :root {
        --font-size: 16px;
        --padding: 20px;
        --background: #f8f9fa;
      }
      @media (max-width: 600px) {
        :root {
          --font-size: 14px;
          --padding: 10px;
          --background: #e9ecef;
        }
      }
      .container {
        font-size: var(--font-size);
        padding: var(--padding);
        background: var(--background);
        display: flex; flex-direction: column; gap: 15px;
      }
      button {
        background: #007bff;
        color: white;
        padding: var(--padding);
        font-size: var(--font-size);
        border: none;
        cursor: pointer;
      }
      button:hover {
        background: #0056b3;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Responsive Theme</h1>
      <button>Responsive Button</button>
      <p>Resize window to test theme changes.</p>
    </div>
  </body>
</html>
```
::

## Component-Specific Theming

Apply variables to specific components:

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
    <title>Component Theming</title>
    <style>
      :root {
        --primary-bg: #007bff;
        --primary-text: #ffffff;
        --secondary-bg: #6c757d;
        --secondary-text: #ffffff;
      }
      .card {
        background: var(--primary-bg);
        color: var(--primary-text);
        padding: 20px;
        margin: 15px;
        border-radius: 5px;
      }
      .card-secondary {
        background: var(--secondary-bg);
        color: var(--secondary-text);
      }
      .container {
        display: flex; flex-direction: column; gap: 15px; padding: 20px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Themed Cards</h1>
      <div class="card">
        <h2>Primary Card</h2>
        <p>Styled with primary theme.</p>
      </div>
      <div class="card card-secondary">
        <h2>Secondary Card</h2>
        <p>Styled with secondary theme.</p>
      </div>
    </div>
  </body>
</html>
```
::

## Fallback Values and Browser Compatibility

Provide fallbacks for unsupported browsers:

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
    <title>Fallback Variables</title>
    <style>
      :root {
        --accent-color: #28a745;
        --fallback-color: #333333;
      }
      .container {
        background: var(--accent-color, var(--fallback-color, #000000));
        padding: 20px;
        color: white;
        display: flex; flex-direction: column; gap: 15px;
      }
      p {
        font-size: 16px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Fallback Variables</h1>
      <p>Background uses fallback if variable is undefined.</p>
    </div>
  </body>
</html>
```
::

## Browser Compatibility

CSS variables are supported in all modern browsers (Chrome, Firefox, Safari, Edge). For older browsers (e.g., IE), use fallbacks:

- **Example**: `color: var(--text-color, #333);`
- **Test**: Always test in multiple browsers.
- **Polyfills**: Use CSS polyfills for broader support if needed.

## Best Practices
- Define variables in `:root` for global access.
- Use semantic names (e.g., `--primary-color` instead of `--blue`).
- Provide fallback values: `var(--color, #000)`.
- Keep themes consistent across components.
- Test responsive theming on various screen sizes.
- Minimize JavaScript theme changes for performance.
- Use browser developer tools to debug variable values.

## What’s Next?

You’ve mastered CSS variables and theming! Review JavaScript APIs or explore advanced HTML forms for more web development skills.