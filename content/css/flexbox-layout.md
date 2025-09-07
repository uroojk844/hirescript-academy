---
title: CSS Flexbox Layout
description: Create flexible layouts with CSS flexbox.
navigation:
  order: 7
---

# CSS Flexbox Layout

In this seventh tutorial, you’ll learn about **CSS Flexbox**, a layout model for creating flexible, responsive designs with minimal code.

In this tutorial, you’ll learn:
- Flexbox container and item properties
- Aligning and distributing flex items
- Building a simple flex layout

## Flexbox Basics

A flex container uses `display: flex` to arrange its **flex items** along a main axis or cross axis.

Example with flexbox:

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
    <title>Flexbox</title>
    <style>
      .container {
        display: flex;
        gap: 10px;
      }
      .item {
        background: lightblue;
        padding: 10px;
      }
    </style>
  </head>
  <body>
    <h1>Flexbox Layout</h1>
    <div class="container">
      <div class="item">Item 1</div>
      <div class="item">Item 2</div>
      <div class="item">Item 3</div>
    </div>
  </body>
</html>
```
::

## Key Flex Properties

- `flex-direction`: Sets axis (`row`, `column`).
- `justify-content`: Aligns items along main axis.
- `align-items`: Aligns items along cross axis.

Example with alignment:

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
    <title>Flex Alignment</title>
    <style>
      .container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100px;
        background: #f0f0f0;
      }
      .item {
        background: coral;
        padding: 10px;
      }
    </style>
  </head>
  <body>
    <h1>Flex Alignment</h1>
    <div class="container">
      <div class="item">Item 1</div>
      <div class="item">Item 2</div>
    </div>
  </body>
</html>
```
::

## Best Practices
- Use `gap` for spacing between items.
- Test flex layouts for responsiveness.
- Combine with media queries for flexibility.

## What’s Next?

You’ve learned flexbox! Next, we’ll explore **CSS Grid Layout** for two-dimensional layouts.