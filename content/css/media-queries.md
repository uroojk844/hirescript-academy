---
title: CSS Media Queries
description: Create responsive designs with media queries.
navigation:
  order: 9
---

# CSS Media Queries

In this ninth tutorial, you’ll learn about **CSS media queries**, which make webpages responsive by applying styles based on device characteristics like screen size.

In this tutorial, you’ll learn:
- Media query syntax
- Targeting screen sizes
- Responsive layout adjustments

## Media Query Basics

Media queries use `@media` to apply styles conditionally, often based on `min-width` or `max-width`.

Example with media query:

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
    <title>Media Queries</title>
    <style>
      body {
        background: lightblue;
      }
      @media (max-width: 600px) {
        body {
          background: lightgreen;
        }
      }
    </style>
  </head>
  <body>
    <h1>Responsive Design</h1>
    <p>Background changes on small screens.</p>
  </body>
</html>
```
::

## Combining with Layouts

Use media queries with flexbox or grid:

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
    <title>Responsive Grid</title>
    <style>
      .container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
      }
      .item {
        background: coral;
        padding: 10px;
      }
      @media (max-width: 600px) {
        .container {
          grid-template-columns: 1fr;
        }
      }
    </style>
  </head>
  <body>
    <h1>Responsive Grid</h1>
    <div class="container">
      <div class="item">Item 1</div>
      <div class="item">Item 2</div>
    </div>
  </body>
</html>
```
::

## Best Practices
- Use mobile-first design (`min-width`).
- Test on multiple devices.
- Keep media queries organized.

## What’s Next?

You’ve learned media queries! Next, we’ll explore **CSS Transitions and Animations** for dynamic effects.