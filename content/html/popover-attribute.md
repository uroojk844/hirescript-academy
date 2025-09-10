---
title: HTML Popover Attribute
description: Create interactive popovers easily.
navigation:
  order: 17
---

# HTML Popover Attribute

In this tutorial, you’ll learn to use the **HTML `popover` attribute** to create lightweight, interactive popovers for tooltips, menus, or alerts. Using plain HTML, CSS, and JavaScript, you’ll build styled, dynamic popovers with CSS variables, gradients, and interactivity, perfect for enhancing user interfaces.

In this tutorial, you’ll learn:
- Setting up `popover` with `popovertarget`
- Styling popovers with CSS
- Controlling popovers with JavaScript
- Ensuring accessibility
- Best practices for popovers

## Basic Popover Setup

Create a simple popover:

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
    <title>Basic Popover</title>
    <style>
      :root {
        --primary-color: #007bff;
        --text-color: #ffffff;
        --popover-bg: #f8f9fa;
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
      button {
        padding: 10px;
        background: var(--primary-color);
        color: var(--text-color);
        border: none;
        cursor: pointer;
      }
      [popover] {
        background: var(--popover-bg);
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 15px;
        max-width: 200px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Popover Example</h1>
      <button popovertarget="myPopover">Show Popover</button>
      <div popover id="myPopover">
        <h2>Tooltip</h2>
        <p>This is a simple popover.</p>
      </div>
    </div>
  </body>
</html>
```
::

- **Explanation**: The `popover` attribute creates a popover, toggled by a button with `popovertarget`. Uses flexbox (`flexbox-layout.md`) and gradients (`css-gradients.md`).

## Styled Popover with Animation

Add styles and transitions:

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
    <title>Styled Popover</title>
    <style>
      :root {
        --primary-color: #007bff;
        --text-color: #ffffff;
        --popover-bg: #f8f9fa;
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
      button {
        padding: 10px;
        background: var(--primary-color);
        color: var(--text-color);
        border: none;
        cursor: pointer;
      }
      button:hover {
        background: #0056b3;
      }
      [popover] {
        background: var(--popover-bg);
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 15px;
        max-width: 200px;
        opacity: 0;
        transform: scale(0.8);
        transition: opacity 0.3s, transform 0.3s;
      }
      [popover]:popover-open {
        opacity: 1;
        transform: scale(1);
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Styled Popover</h1>
      <button popovertarget="myPopover">Show Popover</button>
      <div popover id="myPopover">
        <h2>Animated Tooltip</h2>
        <p>This popover animates on open.</p>
      </div>
    </div>
  </body>
</html>
```
::

- **Explanation**: Uses `:popover-open` (from `pseudo-classes-reference.md`) for transitions, enhancing visual appeal with PUBG-inspired animations.

## Dynamic Popover with JavaScript

Dynamically control popovers:

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
    <title>Dynamic Popover</title>
    <style>
      :root {
        --primary-color: #007bff;
        --text-color: #ffffff;
        --popover-bg: #f8f9fa;
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
      button {
        padding: 10px;
        background: var(--primary-color);
        color: var(--text-color);
        border: none;
        cursor: pointer;
      }
      button:hover {
        background: #0056b3;
      }
      [popover] {
        background: var(--popover-bg);
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 15px;
        max-width: 200px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Dynamic Popover</h1>
      <button onclick="showPopover('Info')">Show Info</button>
      <button onclick="showPopover('Help')">Show Help</button>
      <div popover id="myPopover">
        <h2 id="popoverTitle"></h2>
        <p id="popoverContent"></p>
      </div>
    </div>
    <script>
      function showPopover(type) {
        const popover = document.getElementById('myPopover');
        document.getElementById('popoverTitle').textContent = type;
        document.getElementById('popoverContent').textContent = `This is a ${type.toLowerCase()} popover.`;
        popover.showPopover();
      }
    </script>
  </body>
</html>
```
::

- **Explanation**: JavaScript uses `showPopover()` to dynamically update content, integrating with `array-methods-reference.md`.

## Accessibility Considerations

Ensure popovers are accessible:

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
    <title>Accessible Popover</title>
    <style>
      :root {
        --primary-color: #007bff;
        --text-color: #ffffff;
        --popover-bg: #f8f9fa;
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
      [popover] {
        background: var(--popover-bg);
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 15px;
        max-width: 200px;
      }
      [popover]:focus {
        outline: 2px solid #ff6b6b;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Accessible Popover</h1>
      <button popovertarget="myPopover" aria-label="Show tooltip">Show Popover</button>
      <div popover id="myPopover" role="tooltip" aria-labelledby="popoverTitle">
        <h2 id="popoverTitle">Tooltip</h2>
        <p>This popover is accessible.</p>
      </div>
    </div>
  </body>
</html>
```
::

- **Explanation**: Uses `role="tooltip"` and `aria-labelledby` for accessibility, with `:focus` from `pseudo-classes-reference.md`.

## Best Practices
- Use `popovertarget` for simple toggling, JavaScript for dynamic content.
- Style popovers with transitions for smooth effects.
- Ensure keyboard navigation with `tabindex` and focus management.
- Test with screen readers (e.g., NVDA, VoiceOver).
- Handle edge cases: small screens, no JavaScript, browser support (Chrome 114+, Firefox 125+, Safari 17+).
- Use CSS variables for theming (e.g., `--popover-bg`).
- Avoid overlap with `modal-dialog-box.md` by focusing on lightweight popovers.

## What’s Next?

You’ve mastered the `popover` attribute! Apply it to `responsive-sidebar.md` for tooltips or revisit `<dialog>` for modals.