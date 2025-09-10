---
title: Advance Grid Layout
description: Build grid-based layouts with Grid.
navigation:
  order: 17
---

# CSS Grid Layout

In this tutorial, you’ll learn to create **grid-based layouts** using **CSS Grid**, a powerful tool for two-dimensional layouts. Using plain HTML, CSS, and JavaScript, you’ll build responsive grids styled with CSS variables and gradients, ideal for complex web designs.

In this tutorial, you’ll learn:
- Setting up a grid container and items
- Defining grid templates and gaps
- Creating responsive grid layouts
- Adding interactivity with JavaScript
- Ensuring accessibility
- Best practices for Grid

## Grid Container and Items

Set up a grid container with `<div>` elements:

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
    <title>Basic Grid</title>
    <style>
      :root {
        --primary-color: #007bff;
        --text-color: #ffffff;
        --card-bg: #f8f9fa;
      }
      body { margin: 0; font-family: Arial, sans-serif; }
      .container {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
        padding: 20px;
        background: linear-gradient(to right, var(--primary-color), #6c757d);
      }
      .item {
        background: var(--card-bg);
        padding: 15px;
        border-radius: 5px;
        text-align: center;
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

- **Explanation**: `display: grid` and `grid-template-columns: repeat(3, 1fr)` create a three-column grid, with `gap` for spacing and gradients from `css-gradients.md`.

## Grid Templates and Areas

Define grid templates and named areas:

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
    <title>Grid Template Areas</title>
    <style>
      :root {
        --primary-color: #007bff;
        --text-color: #ffffff;
        --card-bg: #f8f9fa;
      }
      body { margin: 0; font-family: Arial, sans-serif; }
      .container {
        display: grid;
        grid-template-areas:
          'header header header'
          'sidebar main main'
          'footer footer footer';
        grid-template-columns: 200px 1fr 1fr;
        grid-template-rows: auto 1fr auto;
        gap: 20px;
        padding: 20px;
        min-height: 100vh;
        background: linear-gradient(to right, var(--primary-color), #6c757d);
      }
      .item-header { grid-area: header; }
      .item-sidebar { grid-area: sidebar; }
      .item-main { grid-area: main; }
      .item-footer { grid-area: footer; }
      .item {
        background: var(--card-bg);
        padding: 15px;
        border-radius: 5px;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="item item-header">Header</div>
      <div class="item item-sidebar">Sidebar</div>
      <div class="item item-main">Main Content</div>
      <div class="item item-footer">Footer</div>
    </div>
  </body>
</html>
```
::

- **Explanation**: `grid-template-areas` defines a layout with named areas, creating a structured page layout.

## Responsive Grid Layout

Make the grid responsive with media queries:

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
      :root {
        --primary-color: #007bff;
        --text-color: #ffffff;
        --card-bg: #f8f9fa;
      }
      body { margin: 0; font-family: Arial, sans-serif; }
      .container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 20px;
        padding: 20px;
        background: linear-gradient(to right, var(--primary-color), #6c757d);
      }
      .item {
        background: var(--card-bg);
        padding: 15px;
        border-radius: 5px;
        text-align: center;
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
      <div class="item">Item 3</div>
      <div class="item">Item 4</div>
    </div>
  </body>
</html>
```
::

- **Explanation**: `repeat(auto-fit, minmax(200px, 1fr))` creates a responsive grid that adjusts columns based on available space, stacking on small screens.

## Dynamic Grid with JavaScript

Dynamically adjust grid properties with JavaScript:

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
    <title>Dynamic Grid</title>
    <style>
      :root {
        --primary-color: #007bff;
        --text-color: #ffffff;
        --card-bg: #f8f9fa;
        --columns: 3;
      }
      body { margin: 0; font-family: Arial, sans-serif; }
      .container {
        display: grid;
        grid-template-columns: repeat(var(--columns), 1fr);
        gap: 20px;
        padding: 20px;
        background: linear-gradient(to right, var(--primary-color), #6c757d);
      }
      .item {
        background: var(--card-bg);
        padding: 15px;
        border-radius: 5px;
        text-align: center;
      }
      .controls {
        display: flex;
        gap: 10px;
        padding: 10px;
      }
      button {
        background: var(--primary-color);
        color: var(--text-color);
        padding: 10px;
        border: none;
        cursor: pointer;
      }
    </style>
  </head>
  <body>
    <div class="controls">
      <button onclick="changeColumns('2')">2 Columns</button>
      <button onclick="changeColumns('3')">3 Columns</button>
      <button onclick="changeColumns('4')">4 Columns</button>
    </div>
      <h1>Dynamic Grid</h1>
    <div class="container">
      <div class="item">Item 1</div>
      <div class="item">Item 2</div>
      <div class="item">Item 3</div>
      <div class="item">Item 4</div>
    </div>
    <script>
      function changeColumns(columns) {
        document.documentElement.style.setProperty('--columns', columns);
      }
    </script>
  </body>
</html>
```
::

- **Explanation**: JavaScript updates the `--columns` CSS variable, dynamically changing the grid layout, integrating with `css-variables-theming.md`.

## Accessibility Considerations

Ensure Grid layouts are accessible:

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
    <title>Accessible Grid</title>
    <style>
      :root {
        --primary-color: #007bff;
        --text-color: #ffffff;
        --card-bg: #f8f9fa;
      }
      body { margin: 0; font-family: Arial, sans-serif; }
      .container {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
        padding: 20px;
        background: linear-gradient(to right, var(--primary-color), #6c757d);
      }
      .item {
        background: var(--card-bg);
        padding: 15px;
        border-radius: 5px;
        text-align: center;
      }
      .item:focus {
        outline: 2px solid #66b0ff;
      }
    </style>
  </head>
  <body>
    <h1>Accessible Grid</h1>
    <div class="container" role="region" aria-label="Content cards">
      <div class="item" tabindex="0">Item 1</div>
      <div class="item" tabindex="0">Item 2</div>
      <div class="item" tabindex="0">Item 3</div>
    </div>
  </body>
</html>
```
::

- **Explanation**: Adds `tabindex="0"` for keyboard navigation and `role="region"` for screen reader support.

## Best Practices
- Use Grid for two-dimensional layouts (rows and columns).
- Combine with CSS variables for theming (e.g., `--card-bg`).
- Use `repeat(auto-fit, minmax())` for responsive grids.
- Ensure accessibility with `tabindex` and ARIA roles.
- Test edge cases: overflow content, small screens, no JavaScript.
- Optimize performance by avoiding overly complex grid templates.

## What’s Next?

You’ve mastered CSS Grid! Apply these skills to components in the **UI Components** section or explore JavaScript for more interactivity.