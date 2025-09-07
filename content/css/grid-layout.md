---
title: CSS Grid Layout
description: Create two-dimensional layouts with CSS Grid.
navigation:
  order: 8
---

# CSS Grid Layout

In this eighth tutorial, you’ll learn about **CSS Grid**, a powerful layout system for creating two-dimensional (row and column) designs.

In this tutorial, you’ll learn:
- Grid container and item properties
- Defining rows and columns
- Building a grid layout

## Grid Basics

A grid container uses `display: grid` to arrange **grid items** in rows and columns.

Example with grid:

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
    <title>Grid Layout</title>
    <style>
      .container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
      }
      .item {
        background: lightgreen;
        padding: 10px;
      }
    </style>
  </head>
  <body>
    <h1>Grid Layout</h1>
    <div class="container">
      <div class="item">Item 1</div>
      <div class="item">Item 2</div>
      <div class="item">Item 3</div>
      <div class="item">Item 4</div>
    </div>
  </body>
</html>
```
::

## Key Grid Properties

- `grid-template-columns`: Defines column sizes.
- `grid-template-rows`: Defines row sizes.
- `gap`: Sets spacing between grid items.

Example with custom grid:

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
    <title>Custom Grid</title>
    <style>
      .container {
        display: grid;
        grid-template-columns: 100px 200px;
        grid-template-rows: 50px 50px;
        gap: 10px;
      }
      .item {
        background: salmon;
      }
    </style>
  </head>
  <body>
    <h1>Grid Example</h1>
    <div class="container">
      <div class="item">Item 1</div>
      <div class="item">Item 2</div>
    </div>
  </body>
</html>
```
::

## Best Practices
- Use `fr` units for flexible grids.
- Combine grid with media queries.
- Test for cross-browser compatibility.

## What’s Next?

You’ve learned CSS Grid! Next, we’ll explore **CSS Media Queries** for responsive designs.