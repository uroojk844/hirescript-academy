---
title: HTML Attributes and Metadata
description: Explore global attributes and meta tags to enhance HTML functionality.
navigation:
  order: 7
---

# HTML Attributes and Metadata

In this sixth tutorial, you'll learn about **HTML attributes** and **metadata**. Attributes provide additional information to HTML elements, while meta tags in the `<head>` section define document metadata, such as character encoding and SEO details.

In this tutorial, you’ll learn:
- What HTML attributes are and how to use them
- Common global attributes like `class` and `id`
- Using `<meta>` tags for metadata and SEO

## Understanding HTML Attributes

Attributes are added to HTML tags to modify their behavior or provide additional information. They are written as `name="value"` pairs inside the opening tag. Some attributes are specific to certain tags (e.g., `href` for `<a>`), while others are **global** and can be used on any tag.

Here’s an example using attributes:

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
    <title>Attributes Example</title>
  </head>
  <body>
    <h1 id="main-heading">Welcome</h1>
    <p class="intro" title="Introduction">This is an introductory paragraph.</p>
    <a href="https://example.com" target="_blank">Visit Example</a>
  </body>
</html>
```
::

### Common Global Attributes
- `id`: Provides a unique identifier for an element (e.g., `id="main-heading"`).
- `class`: Assigns one or more classes for styling or scripting (e.g., `class="intro"`).
- `title`: Displays a tooltip when hovering over an element.
- `style`: Applies inline CSS (use sparingly; prefer external CSS).
- `data-*`: Stores custom data (e.g., `data-user="123"`).

Example with custom data attributes:

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
    <title>Data Attributes</title>
  </head>
  <body>
    <h1>Product List</h1>
    <div data-product-id="101" class="product">Laptop</div>
    <div data-product-id="102" class="product">Phone</div>
  </body>
</html>
```
::

## Using Meta Tags for Metadata

The `<meta>` tag, placed in the `<head>` section, provides metadata about the HTML document. Metadata isn’t displayed on the page but is used by browsers, search engines, and other services.

Common `<meta>` attributes include:
- `charset`: Defines the character encoding (e.g., `UTF-8`).
- `name` and `content`: Provide metadata like description or keywords for SEO.
- `http-equiv`: Controls browser behavior (e.g., refresh).

Example with meta tags for SEO:

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
    <meta name="description" content="Learn HTML with our tutorials." />
    <meta name="keywords" content="HTML, web development, tutorials" />
    <meta name="author" content="Your Name" />
    <title>SEO Meta Tags</title>
  </head>
  <body>
    <h1>Welcome to Our Tutorials</h1>
    <p>Explore our HTML learning resources.</p>
  </body>
</html>
```
::

### Key Meta Tags
- `<meta name="description" content="...">`: Summarizes the page for search engines.
- `<meta name="keywords" content="...">`: Lists relevant keywords (less critical for modern SEO).
- `<meta name="viewport" content="width=device-width, initial-scale=1.0">`: Ensures responsive design.
- `<meta name="robots" content="index, follow">`: Controls search engine indexing.

## Combining Attributes and Metadata

Here’s a practical example combining global attributes and meta tags:

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
    <meta name="description" content="A blog about web development." />
    <meta name="author" content="Jane Doe" />
    <title>Blog Page</title>
  </head>
  <body>
    <header id="site-header">
      <h1 class="main-title">My Blog</h1>
    </header>
    <main>
      <article data-post-id="001">
        <h2>Learning HTML</h2>
        <p class="content">HTML is the foundation of the web.</p>
      </article>
    </main>
  </body>
</html>
```
::

## Best Practices
- Use `id` sparingly and ensure uniqueness on the page.
- Prefer `class` for reusable styles or scripting.
- Include essential meta tags like `charset` and `viewport` in every HTML document.
- Write concise, relevant `description` meta tags for SEO.

## What’s Next?

You’ve learned about HTML attributes and metadata! In the next tutorial, we’ll dive into **Introduction to CSS**, covering how to style HTML elements with selectors, properties, and basic layouts.