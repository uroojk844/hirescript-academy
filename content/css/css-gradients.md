---
title: CSS Gradients
description: Create vibrant gradient effects.
navigation:
  order: 15
---

# CSS Gradients

In this tutorial, you’ll learn to create **CSS gradients** to add vibrant, dynamic backgrounds and effects to web elements. Using plain HTML, CSS, and JavaScript, you’ll explore linear, radial, and conic gradients, combine them with CSS variables for theming, and create interactive gradient effects. Gradients are perfect for modern, visually appealing designs.

In this tutorial, you’ll learn:
- Creating linear gradients for backgrounds
- Using radial gradients for circular effects
- Applying conic gradients for unique patterns
- Dynamically changing gradients with JavaScript
- Best practices for accessibility and performance

## Linear Gradients

Linear gradients transition colors along a straight line, ideal for backgrounds or buttons:

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
    <title>Linear Gradient</title>
    <style>
      :root {
        --primary-color: #007bff;
        --secondary-color: #6c757d;
        --text-color: #ffffff;
      }
      body { margin: 0; font-family: Arial, sans-serif; }
      .container {
        display: flex;
        flex-direction: column;
        gap: 20px;
        padding: 20px;
        min-height: 100vh;
        background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
      }
      .card {
        background: var(--text-color);
        padding: 20px;
        border-radius: 5px;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Linear Gradient Background</h1>
      <div class="card">
        <p>This container uses a linear gradient from blue to gray.</p>
      </div>
    </div>
  </body>
</html>
```
::

- **Explanation**: The `linear-gradient(to right, var(--primary-color), var(--secondary-color))` creates a smooth color transition from left to right, using CSS variables for theming consistency.

## Radial Gradients

Radial gradients transition colors from a central point, perfect for circular effects:

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
    <title>Radial Gradient</title>
    <style>
      :root {
        --primary-color: #ff6b6b;
        --secondary-color: #4ecdc4;
        --text-color: #ffffff;
      }
      body { margin: 0; font-family: Arial, sans-serif; }
      .container {
        display: flex;
        flex-direction: column;
        gap: 20px;
        padding: 20px;
        min-height: 100vh;
        background: radial-gradient(circle, var(--primary-color), var(--secondary-color));
      }
      .button {
        background: radial-gradient(circle, var(--text-color), var(--primary-color));
        color: var(--text-color);
        padding: 15px 30px;
        border: none;
        border-radius: 5px;
        font-size: 16px;
        cursor: pointer;
        transition: background 0.3s ease;
      }
      .button:hover {
        background: radial-gradient(circle, var(--primary-color), var(--text-color));
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Radial Gradient Button</h1>
      <button class="button">Hover Me</button>
    </div>
  </body>
</html>
```
::

- **Explanation**: The `radial-gradient(circle, var(--primary-color), var(--secondary-color))` creates a circular gradient from red to teal, with a hover effect on the button for interactivity.

## Conic Gradients

Conic gradients rotate colors around a point, creating unique patterns:

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
    <title>Conic Gradient</title>
    <style>
      :root {
        --color1: #007bff;
        --color2: #ff6b6b;
        --color3: #4ecdc4;
        --text-color: #ffffff;
      }
      body { margin: 0; font-family: Arial, sans-serif; }
      .container {
        display: flex;
        flex-direction: column;
        gap: 20px;
        padding: 20px;
        min-height: 100vh;
      }
      .conic-box {
        width: 200px;
        height: 200px;
        background: conic-gradient(var(--color1), var(--color2), var(--color3), var(--color1));
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--text-color);
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Conic Gradient Box</h1>
      <div class="conic-box">
        <p>Conic Gradient</p>
      </div>
    </div>
  </body>
</html>
```
::

- **Explanation**: The `conic-gradient` creates a pie-chart-like effect, cycling through three colors, ideal for decorative elements or dashboards.

## Dynamic Gradients with JavaScript

Dynamically change gradients using JavaScript and a color picker:

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
    <title>Dynamic Gradient</title>
    <style>
      :root {
        --color1: #007bff;
        --color2: #ff6b6b;
        --text-color: #ffffff;
      }
      body { margin: 0; font-family: Arial, sans-serif; }
      .container {
        display: flex;
        flex-direction: column;
        gap: 20px;
        padding: 20px;
        min-height: 100vh;
        background: linear-gradient(to right, var(--color1), var(--color2));
      }
      .controls {
        display: flex;
        gap: 10px;
      }
      input[type="color"] {
        padding: 5px;
        width: 50px;
      }
      .card {
        background: var(--text-color);
        padding: 20px;
        border-radius: 5px;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Dynamic Gradient Picker</h1>
      <div class="controls">
        <input type="color" id="color1" value="#007bff">
        <input type="color" id="color2" value="#ff6b6b">
      </div>
      <div class="card">
        <p>Change colors to update gradient.</p>
      </div>
    </div>
    <script>
      const color1Input = document.getElementById('color1');
      const color2Input = document.getElementById('color2');
      [color1Input, color2Input].forEach(input => {
        input.addEventListener('input', () => {
          document.documentElement.style.setProperty('--color1', color1Input.value);
          document.documentElement.style.setProperty('--color2', color2Input.value);
        });
      });
    </script>
  </body>
</html>
```
::

- **Explanation**: JavaScript updates CSS variables (`--color1`, `--color2`) based on color picker inputs, allowing real-time gradient changes, similar to dynamic theming in `css-variables-theming.md`.

## Best Practices
- Use CSS variables to manage gradient colors for easy updates.
- Combine gradients with `flex` for flexible layouts.
- Ensure sufficient color contrast for accessibility (e.g., text over gradients).
- Test browser compatibility (conic gradients require modern browsers).
- Handle edge cases: transparent gradients, small screens, no JavaScript.
- Optimize performance by avoiding complex gradients on large elements.
- Use tools like [CSS Gradient Generator](https://cssgradient.io/) for inspiration.

## What’s Next?

You’ve mastered CSS gradients! Apply them to components like buttons or backgrounds in the **UI Components** section, or explore JavaScript for more interactivity.