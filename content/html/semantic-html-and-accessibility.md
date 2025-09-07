---
title: Semantic HTML and Accessibility
description: Learn to use semantic HTML tags to improve structure and accessibility.
navigation:
  order: 6
---

# Semantic HTML and Accessibility

In this fifth tutorial, you'll learn about **semantic HTML** and **accessibility** (a11y). Semantic HTML uses tags that describe their meaning, making your code more readable and accessible. Accessibility ensures your website is usable by everyone, including those using assistive technologies like screen readers.

In this tutorial, you’ll learn:
- What semantic HTML is and why it matters
- Common semantic tags like `<header>`, `<main>`, and `<article>`
- Basic accessibility practices for better usability

## What is Semantic HTML?

Semantic HTML tags convey the meaning of the content they contain, unlike generic tags like `<div>` or `<span>`. For example, `<header>` indicates a page header, while `<article>` represents a self-contained piece of content. Semantic tags improve:
- **SEO**: Search engines understand your content better.
- **Accessibility**: Screen readers interpret the structure correctly.
- **Code Readability**: Developers can understand the page structure.

Here’s an example of a semantic HTML structure:

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
    <title>Semantic Structure</title>
  </head>
  <body>
    <header>
      <h1>My Website</h1>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
        </ul>
      </nav>
    </header>
    <main>
      <article>
        <h2>Blog Post</h2>
        <p>This is a blog post about semantic HTML.</p>
      </article>
    </main>
    <footer>
      <p>&copy; 2025 My Website</p>
    </footer>
  </body>
</html>
```
::

### Common Semantic Tags
- `<header>`: Represents introductory content or navigation.
- `<nav>`: Contains navigation links.
- `<main>`: Holds the primary content of the page.
- `<article>`: Defines independent, self-contained content.
- `<section>`: Groups related content.
- `<aside>`: Contains secondary content, like sidebars.
- `<footer>`: Represents the footer of a page or section.

## Improving Accessibility

Accessibility ensures your website is usable by everyone, including people with disabilities. Here are key practices:
- Use semantic tags to provide structure.
- Add `alt` attributes to images (covered in the Links and Images tutorial).
- Use `aria-*` attributes to enhance screen reader support.
- Ensure proper keyboard navigation (e.g., links and buttons should be focusable).

Example with accessibility features:

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
    <title>Accessible Page</title>
  </head>
  <body>
    <header>
      <h1>Welcome</h1>
      <nav aria-label="Main navigation">
        <ul>
          <li><a href="/" aria-current="page">Home</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
    </header>
    <main>
      <section aria-labelledby="news-heading">
        <h2 id="news-heading">Latest News</h2>
        <p>Read our latest updates here.</p>
      </section>
    </main>
    <footer>
      <p>&copy; 2025 All Rights Reserved</p>
    </footer>
  </body>
</html>
```
::

### Accessibility Features Explained
- `lang="en"`: Specifies the document language for screen readers.
- `aria-label`: Provides a label for navigation regions.
- `aria-current="page"`: Indicates the current page for screen readers.
- `aria-labelledby`: Links a section to its heading for context.

## Best Practices
- Use semantic tags instead of `<div>` for meaningful structure.
- Ensure all interactive elements (e.g., links, buttons) are keyboard-accessible.
- Test with tools like screen readers (e.g., NVDA, VoiceOver) or accessibility checkers.
- Keep content simple and clear for all users.

## What’s Next?

You’ve learned how to use semantic HTML and improve accessibility! In the next tutorial, we’ll explore **HTML Attributes and Metadata**, diving into global attributes and meta tags for enhanced functionality.