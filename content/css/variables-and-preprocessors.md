---
title: CSS Variables and Preprocessors
description: Use variables and preprocessors for efficient CSS.
navigation:
  order: 12
---

# CSS Variables and Preprocessors

In this twelfth tutorial, you’ll learn about **CSS variables** (custom properties) and an overview of **CSS preprocessors** like Sass, which enhance CSS efficiency and maintainability.

In this tutorial, you’ll learn:
- Defining and using CSS variables
- Introduction to preprocessors
- Benefits for large projects

## CSS Variables

CSS variables (e.g., `--variable-name`) store reusable values.

Example with variables:

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
    <title>CSS Variables</title>
    <style>
      :root {
        --primary-color: blue;
      }
      h1 {
        color: var(--primary-color);
      }
      p {
        border: 1px solid var(--primary-color);
      }
    </style>
  </head>
  <body>
    <h1>Variable Styling</h1>
    <p>Using CSS variables.</p>
  </body>
</html>
```
::

## CSS Preprocessors

Preprocessors like Sass extend CSS with features like variables, nesting, and mixins. (Note: Requires setup in Nuxt.)

Example of Sass syntax (for reference):

::Editor
#title
styles.scss

#default
```scss
$primary-color: blue;

.container {
  h1 {
    color: $primary-color;
  }
}
```
::

## Best Practices
- Use variables for consistent theming.
- Explore preprocessors for large projects.
- Keep variable names descriptive.

## What’s Next?

You’ve learned variables and preprocessors! Next, we’ll explore **CSS Best Practices** for optimized code.