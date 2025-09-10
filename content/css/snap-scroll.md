---
title: CSS Snap Scroll
description: Create smooth scrolling with snap.
navigation:
  order: 20
---

# CSS Snap Scroll

In this tutorial, you’ll learn to create **CSS snap scroll** for smooth, controlled scrolling that snaps to specific points, ideal for galleries, full-screen sections, or carousels. Using plain HTML, CSS, and JavaScript, you’ll build responsive snap-scroll layouts with CSS variables, gradients, and interactivity.

In this tutorial, you’ll learn:
- Setting up snap scroll with `scroll-snap-type`
- Styling snap points with `scroll-snap-align`
- Creating responsive snap layouts
- Adding navigation with JavaScript
- Ensuring accessibility
- Best practices for snap scroll

## Basic Snap Scroll

Set up a vertical snap scroll container:

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
    <title>Basic Snap Scroll</title>
    <style>
      :root {
        --primary-color: #007bff;
        --text-color: #ffffff;
        --section-bg: #f8f9fa;
      }
      body { margin: 0; font-family: Arial, sans-serif; }
      .container {
        height: 100vh;
        overflow-y: auto;
        scroll-snap-type: y mandatory;
        background: linear-gradient(to bottom, var(--primary-color), #6c757d);
      }
      .section {
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background: var(--section-bg);
        scroll-snap-align: start;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="section">
        <h1>Section 1</h1>
      </div>
      <div class="section">
        <h1>Section 2</h1>
      </div>
      <div class="section">
        <h1>Section 3</h1>
      </div>
    </div>
  </body>
</html>
```
::

- **Explanation**: `scroll-snap-type: y mandatory` enables vertical snapping, and `scroll-snap-align: start` aligns sections to the top. Uses gradients from `css-gradients.md` and flexbox from `flexbox-layout.md`.

## Horizontal Snap Scroll

Create a horizontal snap scroll for a gallery:

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
    <title>Horizontal Snap Scroll</title>
    <style>
      :root {
        --primary-color: #007bff;
        --text-color: #ffffff;
        --item-bg: #f8f9fa;
      }
      body { margin: 0; font-family: Arial, sans-serif; }
      .container {
        display: flex;
        overflow-x: auto;
        scroll-snap-type: x mandatory;
        background: linear-gradient(to right, var(--primary-color), #6c757d);
        padding: 20px;
      }
      .item {
        flex: 0 0 300px;
        height: 200px;
        margin-right: 20px;
        background: var(--item-bg);
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        scroll-snap-align: center;
      }
    </style>
  </head>
  <body>
    <h1>Gallery Snap Scroll</h1>
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

- **Explanation**: `scroll-snap-type: x mandatory` enables horizontal snapping, with `scroll-snap-align: center` centering items, similar to `image-carousel.md`.

## Dynamic Snap Scroll with JavaScript

Add navigation buttons for snap scrolling:

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
    <title>Dynamic Snap Scroll</title>
    <style>
      :root {
        --primary-color: #007bff;
        --text-color: #ffffff;
        --item-bg: #f8f9fa;
      }
      body { margin: 0; font-family: Arial, sans-serif; }
      .container {
        display: flex;
        overflow-x: auto;
        scroll-snap-type: x mandatory;
        background: linear-gradient(to right, var(--primary-color), #6c757d);
        padding: 20px;
        scroll-behavior: smooth;
      }
      .item {
        flex: 0 0 300px;
        height: 200px;
        margin-right: 20px;
        background: var(--item-bg);
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        scroll-snap-align: center;
      }
      .controls {
        display: flex;
        gap: 10px;
        padding: 10px;
      }
      button {
        padding: 10px;
        background: var(--primary-color);
        color: var(--text-color);
        border: none;
        cursor: pointer;
      }
    </style>
  </head>
  <body>
    <div class="controls">
      <button onclick="scrollPrev()">Previous</button>
      <button onclick="scrollNext()">Next</button>
    </div>
      <h1>Dynamic Snap Scroll</h1>
    <div class="container">
      <div class="item">Item 1</div>
      <div class="item">Item 2</div>
      <div class="item">Item 3</div>
      <div class="item">Item 4</div>
    </div>
    <script>
      const container = document.querySelector('.container');
      function scrollPrev() {
        container.scrollBy({ left: -300, behavior: 'smooth' });
      }
      function scrollNext() {
        container.scrollBy({ left: 300, behavior: 'smooth' });
      }
    </script>
  </body>
</html>
```
::

- **Explanation**: JavaScript uses `scrollBy` for smooth navigation, with `scroll-behavior: smooth` enhancing the snap effect. Integrates with `array-methods-reference.md`.

## Accessibility Considerations

Ensure snap scroll is accessible:

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
    <title>Accessible Snap Scroll</title>
    <style>
      :root {
        --primary-color: #007bff;
        --text-color: #ffffff;
        --item-bg: #f8f9fa;
      }
      body { margin: 0; font-family: Arial, sans-serif; }
      .container {
        display: flex;
        overflow-x: auto;
        scroll-snap-type: x mandatory;
        background: linear-gradient(to right, var(--primary-color), #6c757d);
        padding: 20px;
        scroll-behavior: smooth;
      }
      .item {
        flex: 0 0 300px;
        height: 200px;
        margin-right: 20px;
        background: var(--item-bg);
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        scroll-snap-align: center;
      }
      .item:focus {
        outline: 2px solid #ff6b6b;
      }
      .controls {
        display: flex;
        gap: 10px;
        padding: 10px;
      }
      button {
        padding: 10px;
        background: var(--primary-color);
        color: var(--text-color);
        border: none;
        cursor: pointer;
      }
      button:focus {
        outline: 2px solid #ff6b6b;
      }
    </style>
  </head>
  <body>
    <div class="controls">
      <button onclick="scrollPrev()" aria-label="Previous item">Previous</button>
      <button onclick="scrollNext()" aria-label="Next item">Next</button>
    </div>
      <h1>Accessible Snap Scroll</h1>
    <div class="container" role="region" aria-label="Scrollable gallery">
      <div class="item" tabindex="0">Item 1</div>
      <div class="item" tabindex="0">Item 2</div>
      <div class="item" tabindex="0">Item 3</div>
    </div>
    <script>
      const container = document.querySelector('.container');
      function scrollPrev() {
        container.scrollBy({ left: -300, behavior: 'smooth' });
      }
      function scrollNext() {
        container.scrollBy({ left: 300, behavior: 'smooth' });
      }
    </script>
  </body>
</html>
```
::

- **Explanation**: Adds `role="region"`, `aria-label`, and `tabindex="0"` for accessibility, with `:focus` from `pseudo-classes-reference.md`.

## Best Practices
- Use `scroll-snap-type: mandatory` for strict snapping, `proximity` for optional snapping.
- Set `scroll-snap-align` to `start`, `center`, or `end` based on design needs.
- Ensure smooth scrolling with `scroll-behavior: smooth`.
- Test accessibility with keyboard navigation and screen readers.
- Handle edge cases: touch devices, small screens, no JavaScript.
- Use CSS variables for theming (e.g., `--primary-color`).
- Optimize performance by limiting snap points in large containers.

## What’s Next?

You’ve mastered CSS snap scroll! Apply it to `image-carousel.md` for enhanced galleries or explore `css-counters.md` for numbered content.