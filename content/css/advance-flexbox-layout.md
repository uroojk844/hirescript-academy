---
title: Advance Flexbox Layout
description: Build flexible layouts with Flexbox.
navigation:
  order: 16
---

# CSS Flexbox Layout

In this tutorial, you’ll learn to create **flexible layouts** using **CSS Flexbox**, a powerful layout model for aligning and distributing elements. Using plain HTML, CSS, and JavaScript, you’ll build responsive, dynamic layouts styled with CSS variables and gradients, perfect for modern web designs.

In this tutorial, you’ll learn:
- Setting up a flex container and items
- Controlling alignment and spacing
- Creating responsive layouts
- Adding interactivity with JavaScript
- Ensuring accessibility
- Best practices for Flexbox

## Flex Container and Items

Set up a flex container with `<div>` elements:

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
    <title>Basic Flexbox</title>
    <style>
      :root {
        --primary-color: #007bff;
        --text-color: #ffffff;
        --card-bg: #f8f9fa;
      }
      body { margin: 0; font-family: Arial, sans-serif; }
      .container {
        display: flex;
        gap: 20px;
        padding: 20px;
        background: linear-gradient(to right, var(--primary-color), #6c757d);
      }
      .item {
        background: var(--card-bg);
        padding: 15px;
        border-radius: 5px;
        text-align: center;
        flex: 1;
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

- **Explanation**: The `display: flex` property creates a flex container, with `gap` for spacing and `flex: 1` to make items equal width. Integrates with gradients from `css-gradients.md`.

## Alignment and Spacing

Control alignment with `justify-content` and `align-items`:

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
      :root {
        --primary-color: #007bff;
        --text-color: #ffffff;
        --card-bg: #f8f9fa;
      }
      body { margin: 0; font-family: Arial, sans-serif; }
      .container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 20px;
        padding: 20px;
        min-height: 100vh;
        background: linear-gradient(to right, var(--primary-color), #6c757d);
      }
      .item {
        background: var(--card-bg);
        padding: 15px;
        border-radius: 5px;
        text-align: center;
        flex: 1;
      }
      .item:first-child {
        flex: 2;
      }
    </style>
  </head>
  <body>
    <h1>Flexbox Alignment</h1>
    <div class="container">
      <div class="item">Featured Item</div>
      <div class="item">Item 2</div>
      <div class="item">Item 3</div>
    </div>
  </body>
</html>
```
::

- **Explanation**: `justify-content: space-between` distributes items evenly, `align-items: center` vertically centers them, and `flex: 2` makes the first item wider.

## Responsive Flexbox Layout

Make the layout responsive with `flex-wrap` and media queries:

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
    <title>Responsive Flexbox</title>
    <style>
      :root {
        --primary-color: #007bff;
        --text-color: #ffffff;
        --card-bg: #f8f9fa;
      }
      body { margin: 0; font-family: Arial, sans-serif; }
      .container {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        padding: 20px;
        background: linear-gradient(to right, var(--primary-color), #6c757d);
      }
      .item {
        background: var(--card-bg);
        padding: 15px;
        border-radius: 5px;
        text-align: center;
        flex: 1;
        min-width: 200px;
      }
      @media (max-width: 600px) {
        .item {
          flex: 100%;
        }
      }
    </style>
  </head>
  <body>
    <h1>Responsive Flexbox</h1>
    <div class="container">
      <div class="item">Item 1</div>
      <div class="item">Item 2</div>
      <div class="item">Item 3</div>
    </div>
  </body>
</html>
```
::

- **Explanation**: `flex-wrap: wrap` allows items to wrap to the next line, and the media query stacks items on small screens.

## Dynamic Flexbox with JavaScript

Dynamically adjust flex properties with JavaScript:

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
    <title>Dynamic Flexbox</title>
    <style>
      :root {
        --primary-color: #007bff;
        --text-color: #ffffff;
        --card-bg: #f8f9fa;
        --gap-size: 20px;
      }
      body { margin: 0; font-family: Arial, sans-serif; }
      .container {
        display: flex;
        gap: var(--gap-size);
        padding: 20px;
        background: linear-gradient(to right, var(--primary-color), #6c757d);
      }
      .item {
        background: var(--card-bg);
        padding: 15px;
        border-radius: 5px;
        text-align: center;
        flex: 1;
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
      <button onclick="changeGap('10px')">Small Gap</button>
      <button onclick="changeGap('30px')">Large Gap</button>
    </div>
      <h1>Dynamic Flexbox</h1>
    <div class="container">
      <div class="item">Item 1</div>
      <div class="item">Item 2</div>
      <div class="item">Item 3</div>
    </div>
    <script>
      function changeGap(size) {
        document.documentElement.style.setProperty('--gap-size', size);
      }
    </script>
  </body>
</html>
```
::

- **Explanation**: JavaScript updates the `--gap-size` CSS variable, dynamically adjusting the flex `gap`, integrating with `css-variables-theming.md`.

## Accessibility Considerations

Ensure Flexbox layouts are accessible:

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
    <title>Accessible Flexbox</title>
    <style>
      :root {
        --primary-color: #007bff;
        --text-color: #ffffff;
        --card-bg: #f8f9fa;
      }
      body { margin: 0; font-family: Arial, sans-serif; }
      .container {
        display: flex;
        gap: 20px;
        padding: 20px;
        background: linear-gradient(to right, var(--primary-color), #6c757d);
      }
      .item {
        background: var(--card-bg);
        padding: 15px;
        border-radius: 5px;
        text-align: center;
        flex: 1;
      }
      .item:focus {
        outline: 2px solid #66b0ff;
      }
    </style>
  </head>
  <body>
    <h1>Accessible Flexbox</h1>
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
- Use `flex` for one-dimensional layouts (rows or columns).
- Combine with CSS variables for theming (e.g., `--card-bg`).
- Use `gap` for consistent spacing instead of margins.
- Ensure accessibility with `tabindex` and ARIA roles.
- Test edge cases: overflow content, small screens, no JavaScript.
- Optimize performance by avoiding excessive flex calculations.

## What’s Next?

You’ve mastered Flexbox layouts! Explore **CSS Grid Layout** for two-dimensional grid-based designs.