---
title: HTML Microdata and SEO
description: Enhance HTML with microdata and SEO meta tags.
navigation:
  order: 12
---

# HTML Microdata and SEO

In this twelfth tutorial, you'll learn about **microdata** and advanced **SEO (Search Engine Optimization)** techniques in HTML. Microdata adds structured data to improve search engine understanding, while meta tags enhance visibility.

In this tutorial, you’ll learn:
- How to use microdata with schema.org
- Advanced `<meta>` tags for SEO
- Improving search engine rankings

## Using Microdata with Schema.org

Microdata adds machine-readable metadata to HTML using attributes like `itemscope`, `itemtype`, and `itemprop`. Schema.org provides standard vocabularies (e.g., for articles, products).

Example with microdata for an article:

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
    <title>Microdata Example</title>
  </head>
  <body>
    <h1>Article Page</h1>
    <article itemscope itemtype="https://schema.org/Article">
      <h2 itemprop="headline">Learning HTML</h2>
      <p itemprop="author">Jane Doe</p>
      <p itemprop="datePublished">2025-09-07</p>
      <div itemprop="articleBody">This is an article about HTML.</div>
    </article>
  </body>
</html>
```
::

### Key Microdata Attributes
- `itemscope`: Defines a microdata scope.
- `itemtype`: Specifies the schema.org type (e.g., `https://schema.org/Article`).
- `itemprop`: Assigns properties (e.g., `headline`, `author`).

## Advanced SEO Meta Tags

Advanced `<meta>` tags improve search engine rankings and social media sharing (e.g., Open Graph tags).

Example with SEO meta tags:

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
    <meta name="description" content="Learn HTML with tutorials." />
    <meta name="robots" content="index, follow" />
    <meta property="og:title" content="HTML Tutorials" />
    <meta property="og:description" content="Master HTML with our guide." />
    <meta property="og:image" content="https://example.com/image.jpg" />
    <title>SEO Enhanced Page</title>
  </head>
  <body>
    <h1>HTML Tutorials</h1>
    <p>Learn HTML step-by-step.</p>
  </body>
</html>
```
::

### Key SEO Tags
- `name="robots"`: Controls search engine indexing.
- `property="og:*"`: Open Graph tags for social media previews.
- `rel="canonical"`: Specifies the preferred URL to avoid duplicate content.

## Combining Microdata and SEO

Example combining both:

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
    <meta name="description" content="HTML tutorial series." />
    <meta property="og:title" content="HTML Tutorial Series" />
    <meta property="og:type" content="website" />
    <title>Microdata and SEO</title>
  </head>
  <body>
    <article itemscope itemtype="https://schema.org/Article">
      <h1 itemprop="headline">Advanced HTML</h1>
      <p itemprop="author">John Smith</p>
      <div itemprop="articleBody">Learn advanced HTML techniques.</div>
    </article>
  </body>
</html>
```
::

## Best Practices
- Use schema.org types relevant to your content (e.g., `Article`, `Product`).
- Keep meta descriptions under 160 characters.
- Test microdata with tools like Google’s Structured Data Testing Tool.

## What’s Next?

You’ve learned about microdata and SEO! In the final tutorial, we’ll cover **HTML Best Practices**, focusing on clean code and optimization.