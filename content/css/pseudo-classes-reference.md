---
title: Advance Pseudo-Classes
description: Comprehensive guide to modern pseudo-classes.
navigation:
  order: 18
---

# CSS Pseudo-Classes Reference

In this tutorial, you’ll explore a wide range of modern CSS pseudo-classes, including `:has`, `:is`, `:where`, `:checked`, `:focus-visible`, `:not`, `:nth-child`, `:focus-within`, `:disabled`, `:hover`, `:active`, `:first-child`, and `:last-child`. Using plain HTML, CSS, and JavaScript, you’ll build dynamic, accessible layouts with vibrant styles, perfect for modern web designs.

In this tutorial, you’ll learn:
- Understanding pseudo-classes and their role
- Using `:has` for parent-based styling
- Simplifying selectors with `:is` and `:where`
- Styling form inputs with `:checked`
- Enhancing accessibility with `:focus-visible`
- Advanced selection with `:not`, `:nth-child`, `:focus-within`, `:disabled`, `:hover`, `:active`, `:first-child`, `:last-child`
- Best practices and browser compatibility

## What are Pseudo-Classes?

Pseudo-classes are keywords added to CSS selectors to style elements based on their state, position, or relationships. They enable dynamic styling without JavaScript, such as highlighting hovered elements or styling checked inputs. Modern pseudo-classes like `:has` and `:focus-visible` offer advanced control for responsive UIs.

## :has Pseudo-Class

- **Description**: Selects elements containing a specified descendant, acting as a parent selector.
- **Usage**: Style containers based on child elements, e.g., highlight sections with images.
- **Syntax**: `selector:has(child-selector)`

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
    <title>:has Pseudo-Class</title>
    <style>
      :root {
        --primary-color: #007bff;
        --text-color: #ffffff;
        --card-bg: #f8f9fa;
      }
      body { margin: 0; font-family: Arial, sans-serif; background: #f0f0f0; padding: 20px; }
      .container {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
      }
      .card {
        background: var(--card-bg);
        padding: 15px;
        border-radius: 5px;
      }
      .card:has(img) {
        background: linear-gradient(to right, var(--primary-color), #6c757d);
        color: var(--text-color);
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>:has Example</h1>
      <div class="card">
        <h2>Card without Image</h2>
        <p>Plain card content.</p>
      </div>
      <div class="card">
        <h2>Card with Image</h2>
        <img src="https://via.placeholder.com/150" alt="Sample">
      </div>
    </div>
  </body>
</html>
```
::

- **Edge Cases**: `:has` doesn’t support pseudo-elements inside; supported in Chrome 105+, Firefox 121+, Safari 15.4+.

## is and where Pseudo-Classes

- **Description**: `:is` matches any selector in a list, forgiving invalid selectors, with specificity of the most specific argument. `:where` is similar but has zero specificity.
- **Usage**: Simplify selector lists or manage specificity in utilities.
- **Syntax**: `selector:is(selector-list)`, `selector:where(selector-list)`

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
    <title>:is and :where</title>
    <style>
      :root {
        --primary-color: #007bff;
        --text-color: #ffffff;
      }
      body { margin: 0; font-family: Arial, sans-serif; background: #f0f0f0; padding: 20px; }
      .container {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .container :is(h1, h2, h3) {
        color: var(--primary-color);
        margin: 0;
      }
      .container :where(.highlight, .special) {
        background: #28a745;
        color: var(--text-color);
        padding: 5px;
      }
      .container .highlight {
        font-weight: bold; /* Overrides :where due to zero specificity */
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Heading 1 (:is)</h1>
      <h2 class="highlight">Highlighted Heading 2</h2>
      <h3>Heading 3 (:is)</h3>
      <p class="special">Special Paragraph (:where)</p>
    </div>
  </body>
</html>
```
::

- **Edge Cases**: `:is` ignores invalid selectors; `:where` is ideal for low-specificity rules. Supported in Chrome 88+, Firefox 82+, Safari 14+.

## checked Pseudo-Class

- **Description**: Targets checked radio buttons, checkboxes, or select options.
- **Usage**: Create custom form input styles.
- **Syntax**: `input:checked`

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
    <title>:checked Pseudo-Class</title>
    <style>
      :root {
        --checked-color: #28a745;
        --primary-color: #007bff;
      }
      body { margin: 0; font-family: Arial, sans-serif; background: #f0f0f0; padding: 20px; }
      .form-group {
        display: flex;
        gap: 10px;
        align-items: center;
        margin: 10px;
      }
      input[type="checkbox"] {
        appearance: none;
        width: 20px;
        height: 20px;
        border: 2px solid var(--primary-color);
        border-radius: 3px;
        cursor: pointer;
      }
      input[type="checkbox"]:checked {
        background: var(--checked-color);
        border-color: var(--checked-color);
      }
      input[type="checkbox"]:checked::before {
        content: '\2713';
        color: #ffffff;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
      }
    </style>
  </head>
  <body>
    <h1>Custom Checkbox</h1>
    <div class="form-group">
      <input type="checkbox" id="agree">
      <label for="agree">I agree</label>
    </div>
  </body>
</html>
```
::

- **Edge Cases**: Works on `<input type="checkbox">`, `<input type="radio">`, `<option>`; universally supported.

## focus-visible Pseudo-Class

- **Description**: Applies styles when an element is focused via keyboard, improving accessibility.
- **Usage**: Show focus outlines for keyboard navigation only.
- **Syntax**: `selector:focus-visible`

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
    <title>:focus-visible</title>
    <style>
      :root {
        --focus-color: #007bff;
        --button-bg: #28a745;
      }
      body { margin: 0; font-family: Arial, sans-serif; background: #f0f0f0; padding: 20px; }
      button {
        padding: 10px 20px;
        background: var(--button-bg);
        color: #ffffff;
        border: none;
        cursor: pointer;
      }
      button:focus-visible {
        outline: 3px solid var(--focus-color);
        outline-offset: 2px;
      }
    </style>
  </head>
  <body>
    <h1>Keyboard Focus</h1>
    <button>Focus Me with Tab</button>
    <p>Focus outline appears only for keyboard navigation.</p>
  </body>
</html>
```
::

- **Edge Cases**: Avoids focus styles on mouse clicks; supported in Chrome 86+, Firefox 85+, Safari 15.4+.

## not, nth-child, first-child, last-child

- **Description**:
  - `:not(selector)`: Selects elements that don’t match the selector.
  - `:nth-child(n)`: Selects elements based on their position among siblings.
  - `:first-child`, `:last-child`: Select the first or last child of a parent.
- **Usage**: Style specific elements in a list or exclude certain elements.
- **Syntax**: `selector:not(selector)`, `selector:nth-child(n)`, `selector:first-child`, `selector:last-child`

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
    <title>:not, :nth-child, :first-child, :last-child</title>
    <style>
      :root {
        --primary-color: #007bff;
        --highlight-color: #ff6b6b;
        --text-color: #ffffff;
      }
      body { margin: 0; font-family: Arial, sans-serif; background: #f0f0f0; padding: 20px; }
      .container {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .item {
        padding: 10px;
        background: #e9ecef;
        border-radius: 5px;
      }
      .item:not(.special) {
        background: var(--primary-color);
        color: var(--text-color);
      }
      .item:nth-child(even) {
        border: 2px solid var(--highlight-color);
      }
      .item:first-child {
        font-weight: bold;
      }
      .item:last-child {
        font-style: italic;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Advanced Selectors</h1>
      <div class="item">First Item (Bold)</div>
      <div class="item">Second Item (Even, Bordered)</div>
      <div class="item special">Third Item (Special, No Blue)</div>
      <div class="item">Fourth Item (Even, Bordered)</div>
      <div class="item">Last Item (Italic)</div>
    </div>
  </body>
</html>
```
::

- **Edge Cases**: `:not` doesn’t support complex selectors in older browsers; `:nth-child` can use formulas (e.g., `2n+1`); universally supported.

## focus-within, disabled, hover, active

- **Description**:
  - `:focus-within`: Targets an element if it or its descendants are focused.
  - `:disabled`: Targets disabled form elements.
  - `:hover`: Targets elements under the mouse pointer.
  - `:active`: Targets elements being clicked.
- **Usage**: Enhance form interactions and user feedback.
- **Syntax**: `selector:focus-within`, `selector:disabled`, `selector:hover`, `selector:active`

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
    <title>:focus-within, :disabled, :hover, :active</title>
    <style>
      :root {
        --primary-color: #007bff;
        --disabled-color: #6c757d;
        --hover-color: #ff6b6b;
        --active-color: #28a745;
      }
      body { margin: 0; font-family: Arial, sans-serif; background: #f0f0f0; padding: 20px; }
      .form-group {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin: 10px;
        padding: 10px;
      }
      .form-group:focus-within {
        background: linear-gradient(to right, var(--primary-color), #6c757d);
        border-radius: 5px;
      }
      input {
        padding: 10px;
        border: 2px solid #ccc;
        border-radius: 3px;
      }
      input:disabled {
        background: var(--disabled-color);
        color: #ffffff;
        cursor: not-allowed;
      }
      input:hover:not(:disabled) {
        border-color: var(--hover-color);
      }
      input:active:not(:disabled) {
        border-color: var(--active-color);
      }
    </style>
  </head>
  <body>
    <h1>Interactive Form</h1>
    <div class="form-group">
      <label for="input1">Active Input</label>
      <input id="input1" type="text" placeholder="Hover or click">
    </div>
    <div class="form-group">
      <label for="input2">Disabled Input</label>
      <input id="input2" type="text" disabled placeholder="Disabled">
    </div>
  </body>
</html>
```
::

- **Edge Cases**: `:focus-within` requires focusable descendants; `:hover` and `:active` don’t apply on touch devices without adjustments; universally supported except `:focus-within` (Chrome 60+, Firefox 52+, Safari 10.1+).

## Dynamic Pseudo-Class Styling with JavaScript

Dynamically toggle classes to enhance pseudo-class effects:

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
    <title>Dynamic Pseudo-Classes</title>
    <style>
      :root {
        --primary-color: #007bff;
        --highlight-color: #ff6b6b;
        --text-color: #ffffff;
      }
      body { margin: 0; font-family: Arial, sans-serif; background: #f0f0f0; padding: 20px; }
      .container {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
      }
      .item {
        padding: 10px;
        background: #e9ecef;
        border-radius: 5px;
      }
      .item:hover {
        background: var(--primary-color);
        color: var(--text-color);
      }
      .item.active:nth-child(odd) {
        background: var(--highlight-color);
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
      <h1>Dynamic Pseudo-Classes</h1>
      <button onclick="toggleActive()">Toggle Active</button>
      <div class="item">Item 1</div>
      <div class="item">Item 2</div>
      <div class="item">Item 3</div>
    </div>
    <script>
      function toggleActive() {
        document.querySelectorAll('.item').forEach(item => {
          item.classList.toggle('active');
        });
      }
    </script>
  </body>
</html>
```
::

- **Explanation**: JavaScript toggles the `active` class, triggering `:nth-child(odd)` styles, integrating with `array-methods-reference.md`.

## Best Practices
- Use `:has` sparingly due to performance in large DOMs.
- Use `:is` to simplify selector lists, `:where` for low-specificity rules.
- Ensure `:checked` and `:focus-visible` enhance accessibility.
- Combine `:hover`, `:active` with transitions for smooth effects.
- Test `:nth-child`, `:not` for complex patterns to avoid errors.
- Check browser compatibility (e.g., `:has` needs modern browsers).
- Use CSS variables for consistent theming (e.g., `--primary-color`).
- Test edge cases: no JavaScript, touch devices, screen readers.

## What’s Next?

You’ve mastered CSS pseudo-classes! Apply them to components like `responsive-sidebar` or explore `css-gradients` for vibrant effects.