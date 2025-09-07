---
title: HTML Best Practices
description: Learn to write clean, optimized HTML code.
navigation:
  order: 13
---

# HTML Best Practices

In this final tutorial, you'll learn **best practices** for writing clean, efficient, and optimized HTML code. These practices ensure your webpages are maintainable, accessible, and performant.

In this tutorial, you’ll learn:
- How to write clean HTML code
- Tips for accessibility and performance
- Common pitfalls to avoid

## Writing Clean HTML

Clean HTML is readable, well-structured, and follows standards:
- Use consistent indentation (e.g., 2 spaces).
- Prefer semantic tags over `<div>` and `<span>`.
- Close all tags properly and avoid deprecated tags (e.g., `<font>`).

Example of clean HTML:

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
    <title>Clean HTML</title>
  </head>
  <body>
    <header>
      <h1>My Website</h1>
    </header>
    <main>
      <article>
        <h2>Article Title</h2>
        <p>Content here.</p>
      </article>
    </main>
    <footer>
      <p>&copy; 2025</p>
    </footer>
  </body>
</html>
```
::

## Accessibility Best Practices

Ensure your HTML is accessible:
- Use semantic tags for structure.
- Include `alt` attributes for images.
- Use `aria-*` attributes for dynamic content.
- Ensure keyboard navigability (e.g., focusable buttons).

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
    <title>Accessible HTML</title>
  </head>
  <body>
    <nav aria-label="Main navigation">
      <ul>
        <li><a href="/" aria-current="page">Home</a></li>
        <li><a href="/about">About</a></li>
      </ul>
    </nav>
    <main>
      <img src="image.jpg" alt="Description of image" />
    </main>
  </body>
</html>
```
::

## Performance Optimization

Optimize HTML for faster loading:
- Minimize file size by removing unnecessary whitespace.
- Use relative URLs for local resources.
- Avoid excessive nesting of elements.

Example of optimized HTML:

::Editor
#title
index.html

#default
```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Optimized HTML</title>
</head>
<body>
<h1>Welcome</h1>
<p>Simple and efficient.</p>
</body>
</html>
```
::

## Common Pitfalls to Avoid
- Don’t use `<table>` for layouts; use CSS.
- Avoid inline styles; use external CSS.
- Don’t skip `<!DOCTYPE html>` or `lang` attributes.
- Test across browsers to ensure compatibility.

## What’s Next?

Congratulations! You’ve completed the HTML tutorial series. You’re now equipped to build structured, accessible, and optimized webpages. Next, consider exploring CSS or JavaScript to enhance your web development skills.