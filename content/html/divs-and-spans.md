---
title: HTML Divs and Spans
description: Learn to group content using divs and spans in HTML.
navigation:
  order: 5
---

# HTML Divs and Spans

In this seventh tutorial, you'll learn about the `<div>` and `<span>` tags in HTML. These tags are used to group and organize content, often for styling or scripting purposes. They are non-semantic, meaning they don’t convey specific meaning like `<header>` or `<article>`, but they are essential for structuring pages.

In this tutorial, you’ll learn:
- How to use `<div>` for block-level grouping
- How to use `<span>` for inline grouping
- Practical applications with attributes like `class` and `id`

## Using the `<div>` Tag

The `<div>` tag is a block-level element used to group sections of content, such as entire sections or layouts. It creates a new line before and after the element, making it ideal for creating containers.

Here’s a simple example:

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
    <title>Div Example</title>
  </head>
  <body>
    <div>
      <h1>Welcome</h1>
      <p>This content is grouped in a div.</p>
    </div>
    <div>
      <p>Another div for more content.</p>
    </div>
  </body>
</html>
```
::

### Explanation
- `<div>`: Groups content into a block, often used as a container for styling or JavaScript.
- Each `<div>` starts on a new line, creating a block structure.

## Using the `<span>` Tag

The `<span>` tag is an inline element used to group smaller pieces of content, like a word or phrase, within a line. It doesn’t create a new line, making it perfect for styling specific parts of text.

Example with `<span>`:

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
    <title>Span Example</title>
  </head>
  <body>
    <p>This is a <span>highlighted</span> word in a sentence.</p>
    <p>Another sentence with <span>special</span> text.</p>
  </body>
</html>
```
::

### Explanation
- `<span>`: Groups inline content without breaking the flow of text.
- Often used to apply styles (e.g., color) or JavaScript to specific parts of content.

## Combining Divs and Spans with Attributes

Both `<div>` and `<span>` are often used with attributes like `class` and `id` to target them for styling or scripting. Here’s a practical example:

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
    <title>Div and Span</title>
  </head>
  <body>
    <div class="container">
      <h1 id="main-title">My Page</h1>
      <p>This is a <span class="highlight">key term</span> in the text.</p>
    </div>
    <div class="footer">
      <p>Footer content with a <span class="note">note</span>.</p>
    </div>
  </body>
</html>
```
::

### Key Points
- `class="container"`: Applies a reusable class to the `<div>` for styling or scripting.
- `id="main-title"`: Assigns a unique identifier to the `<h1>`.
- `<span class="highlight">`: Targets a specific word for styling.

## Best Practices
- Use `<div>` for larger structural blocks, but prefer semantic tags (e.g., `<section>`, `<article>`) when appropriate.
- Use `<span>` for small, inline content changes, like highlighting text.
- Keep `id` values unique within a page.
- Avoid overusing `<div>` and `<span>` when semantic tags are more suitable.

## What’s Next?

You’ve learned how to use `<div>` and `<span>` to organize content! In the next tutorial, we’ll explore **HTML Multimedia Elements**, covering `<audio>`, `<video>`, and `<iframe>` for embedding media.