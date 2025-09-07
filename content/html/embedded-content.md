---
title: HTML Embedded Content
description: Learn to embed external content using embed and object tags.
navigation:
  order: 11
---

# HTML Embedded Content

In this eleventh tutorial, you'll learn about embedding external content in HTML using the `<embed>` and `<object>` tags. These tags complement `<iframe>` (covered in Multimedia Elements) by embedding specific file types like PDFs or SVGs.

In this tutorial, you’ll learn:
- How to use `<embed>` for simple embedding
- How to use `<object>` for versatile content
- Differences between `<embed>`, `<object>`, and `<iframe>`

## Using the `<embed>` Tag

The `<embed>` tag is a simple, self-closing tag for embedding external content like images, videos, or PDFs. It’s less flexible than `<iframe>` but easier for basic use.

Example with `<embed>`:

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
    <title>Embed Example</title>
  </head>
  <body>
    <h1>Embedded PDF</h1>
    <embed src="sample.pdf" type="application/pdf" width="600" height="400" />
  </body>
</html>
```
::

### Key Attributes for `<embed>`
- `src`: Specifies the file path or URL.
- `type`: Defines the MIME type (e.g., `application/pdf`).
- `width` and `height`: Set the display size.

## Using the `<object>` Tag

The `<object>` tag is more versatile, embedding various content types (e.g., PDFs, SVGs) with fallback content if the resource fails to load.

Example with `<object>`:

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
    <title>Object Example</title>
  </head>
  <body>
    <h1>Embedded SVG</h1>
    <object data="sample.svg" type="image/svg+xml" width="300" height="200">
      <p>Your browser does not support SVG.</p>
    </object>
  </body>
</html>
```
::

### Key Attributes for `<object>`
- `data`: Specifies the resource URL or path.
- `type`: Defines the MIME type.
- `width` and `height`: Set the display size.

## Comparing `<embed>`, `<object>`, and `<iframe>`

Example combining all three:

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
    <title>Embedded Content</title>
  </head>
  <body>
    <h1>Embedding Examples</h1>
    <h2>PDF with Embed</h2>
    <embed src="sample.pdf" type="application/pdf" width="300" height="200" />
    <h2>SVG with Object</h2>
    <object data="sample.svg" type="image/svg+xml" width="300" height="200">
      <p>SVG not supported.</p>
    </object>
    <h2>YouTube with Iframe</h2>
    <iframe width="300" height="200" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="YouTube video" frameborder="0" allowfullscreen></iframe>
  </body>
</html>
```
::

### Differences
- `<embed>`: Simple, no fallback, limited control.
- `<object>`: Supports fallback content, more flexible.
- `<iframe>`: Best for complex external content (e.g., webpages).

## Best Practices
- Use `<object>` when fallback content is needed.
- Specify correct MIME types for compatibility.
- Include `title` or fallback text for accessibility.

## What’s Next?

You’ve learned to embed content with `<embed>` and `<object>`! In the next tutorial, we’ll explore **HTML Microdata and SEO**, introducing schema.org and advanced meta tags.