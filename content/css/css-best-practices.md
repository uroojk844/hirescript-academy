---
title: CSS Best Practices
description: Write clean, optimized CSS for maintainability.
navigation:
  order: 13
---

# CSS Best Practices

In this final tutorial, you’ll learn **best practices** for writing clean, efficient, and accessible CSS to style HTML effectively.

In this tutorial, you’ll learn:
- Writing maintainable CSS
- Accessibility and performance tips
- Avoiding common pitfalls

## Writing Clean CSS

Clean CSS is readable and organized:
- Use consistent naming (e.g., BEM).
- Avoid inline styles.
- Group related styles logically.

Example of clean CSS:

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
    <title>Clean CSS</title>
    <style>
      .header {
        background: #333;
        color: white;
        padding: 10px;
      }
      .header__title {
        font-size: 24px;
      }
    </style>
  </head>
  <body>
    <header class="header">
      <h1 class="header__title">My Website</h1>
    </header>
  </body>
</html>
```
::

## Accessibility and Performance

- Ensure color contrast for readability.
- Minimize CSS file size.
- Use media queries for responsiveness.

Example with accessibility:

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
    <title>Accessible CSS</title>
    <style>
      a {
        color: #0000EE;
        text-decoration: underline;
      }
      a:focus {
        outline: 2px solid blue;
      }
    </style>
  </head>
  <body>
    <h1>Accessible Links</h1>
    <a href="#">Focusable Link</a>
  </body>
</html>
```
::

## Best Practices
- Use external CSS files.
- Avoid `!important` unless necessary.
- Test across browsers and devices.

## What’s Next?

Congratulations! You’ve completed the CSS tutorials. Combine these skills with HTML knowledge or explore JavaScript next.