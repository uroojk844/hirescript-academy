---
title: CSS Counters
description: Create automatic numbering systems.
navigation:
  order: 19
---

# CSS Counters

In this tutorial, you’ll learn to create **CSS counters** to automatically number elements like lists, sections, or steps. Using plain HTML, CSS, and JavaScript, you’ll build dynamic, styled counters for ordered content, enhanced with CSS variables, gradients, and interactivity, ideal for tutorials or navigation menus.

In this tutorial, you’ll learn:
- Setting up counters with `counter-reset` and `counter-increment`
- Styling counters with pseudo-elements
- Creating nested counters for hierarchies
- Adding interactivity with JavaScript
- Ensuring accessibility
- Best practices for counters

## Basic Counter Setup

Use `counter-reset` and `counter-increment` to number elements:

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
    <title>Basic Counter</title>
    <style>
      :root {
        --primary-color: #007bff;
        --text-color: #ffffff;
        --item-bg: #f8f9fa;
      }
      body { margin: 0; font-family: Arial, sans-serif; background: #f0f0f0; padding: 20px; }
      .container {
        display: flex;
        flex-direction: column;
        gap: 10px;
        background: linear-gradient(to right, var(--primary-color), #6c757d);
        padding: 20px;
        border-radius: 5px;
      }
      .item {
        background: var(--item-bg);
        padding: 15px;
        border-radius: 3px;
      }
      .container {
        counter-reset: item-counter;
      }
      .item::before {
        counter-increment: item-counter;
        content: "Item " counter(item-counter) ": ";
        color: var(--primary-color);
        font-weight: bold;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Basic Counter</h1>
      <div class="item">First item</div>
      <div class="item">Second item</div>
      <div class="item">Third item</div>
    </div>
  </body>
</html>
```
::

- **Explanation**: `counter-reset: item-counter` initializes a counter, `counter-increment: item-counter` increments it, and `::before` displays the counter. Uses gradients from `css-gradients.md` and flexbox from `flexbox-layout.md`.

## Nested Counters

Create hierarchical counters for nested lists:

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
    <title>Nested Counters</title>
    <style>
      :root {
        --primary-color: #007bff;
        --text-color: #ffffff;
        --item-bg: #f8f9fa;
      }
      body { margin: 0; font-family: Arial, sans-serif; background: #f0f0f0; padding: 20px; }
      .container {
        display: flex;
        flex-direction: column;
        gap: 10px;
        background: linear-gradient(to right, var(--primary-color), #6c757d);
        padding: 20px;
        border-radius: 5px;
        counter-reset: section-counter;
      }
      .section {
        padding: 10px;
        background: var(--item-bg);
        border-radius: 3px;
        counter-reset: subsection-counter;
      }
      .section::before {
        counter-increment: section-counter;
        content: counter(section-counter) ". ";
        color: var(--primary-color);
        font-weight: bold;
      }
      .subsection::before {
        counter-increment: subsection-counter;
        content: counter(section-counter) "." counter(subsection-counter) " ";
        color: #ff6b6b;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Nested Counters</h1>
      <div class="section">
        Main Section
        <div class="subsection">Subsection</div>
        <div class="subsection">Subsection</div>
      </div>
      <div class="section">
        Main Section
        <div class="subsection">Subsection</div>
      </div>
    </div>
  </body>
</html>
```
::

- **Explanation**: Nested counters use multiple `counter-reset` and `counter-increment` pairs to create hierarchical numbering (e.g., 1.1, 1.2, 2.1).

## Dynamic Counters with JavaScript

Dynamically add items with JavaScript, maintaining counters:

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
    <title>Dynamic Counter</title>
    <style>
      :root {
        --primary-color: #007bff;
        --text-color: #ffffff;
        --item-bg: #f8f9fa;
      }
      body { margin: 0; font-family: Arial, sans-serif; background: #f0f0f0; padding: 20px; }
      .container {
        display: flex;
        flex-direction: column;
        gap: 10px;
        background: linear-gradient(to right, var(--primary-color), #6c757d);
        padding: 20px;
        border-radius: 5px;
        counter-reset: item-counter;
      }
      .item {
        background: var(--item-bg);
        padding: 15px;
        border-radius: 3px;
      }
      .item::before {
        counter-increment: item-counter;
        content: "Step " counter(item-counter) ": ";
        color: var(--primary-color);
        font-weight: bold;
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
    <div class="container">
      <h1>Dynamic Counter</h1>
      <button onclick="addItem()">Add Item</button>
      <div class="item">First item</div>
      <div class="item">Second item</div>
    </div>
    <script>
      function addItem() {
        const container = document.querySelector('.container');
        const newItem = document.createElement('div');
        newItem.classList.add('item');
        newItem.textContent = `New item ${Date.now()}`;
        container.appendChild(newItem);
      }
    </script>
  </body>
</html>
```
::

- **Explanation**: JavaScript adds new `.item` elements, and CSS counters automatically number them. Integrates with `array-methods-reference.md` (`forEach`-like appending).

## Accessibility Considerations

Ensure counters are accessible to screen readers:

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
    <title>Accessible Counter</title>
    <style>
      :root {
        --primary-color: #007bff;
        --text-color: #ffffff;
        --item-bg: #f8f9fa;
      }
      body { margin: 0; font-family: Arial, sans-serif; background: #f0f0f0; padding: 20px; }
      .container {
        display: flex;
        flex-direction: column;
        gap: 10px;
        background: linear-gradient(to right, var(--primary-color), #6c757d);
        padding: 20px;
        border-radius: 5px;
        counter-reset: item-counter;
      }
      .item {
        background: var(--item-bg);
        padding: 15px;
        border-radius: 3px;
      }
      .item::before {
        counter-increment: item-counter;
        content: counter(item-counter) ". ";
        color: var(--primary-color);
        font-weight: bold;
      }
      .item:focus {
        outline: 2px solid #ff6b6b;
      }
    </style>
  </head>
  <body>
    <div class="container" role="list">
      <h1>Accessible Counter</h1>
      <div class="item" role="listitem" tabindex="0">First item</div>
      <div class="item" role="listitem" tabindex="0">Second item</div>
      <div class="item" role="listitem" tabindex="0">Third item</div>
    </div>
  </body>
</html>
```
::

- **Explanation**: Adds `role="list"` and `role="listitem"` for screen reader compatibility, with `tabindex="0"` for keyboard navigation, aligning with `pseudo-classes-reference.md` (`:focus`).

## Best Practices
- Use `counter-reset` and `counter-increment` on parent elements.
- Style counters with `::before` or `::after` for flexibility.
- Ensure counter content is meaningful (e.g., "Step 1" vs. "1").
- Test accessibility with screen readers to ensure counter text is read.
- Handle edge cases: large lists, nested counters, no CSS support.
- Use CSS variables for consistent theming (e.g., `--primary-color`).
- Optimize performance by limiting counter scope to specific containers.

## What’s Next?

You’ve mastered CSS counters! Apply them to ordered lists in `responsive-sidebar.md` or explore **CSS Snap Scroll** for smooth scrolling effects.