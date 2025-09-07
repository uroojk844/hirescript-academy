---
title: CSS Selectors and Specificity
description: Learn to target elements with CSS selectors.
navigation:
  order: 2
---

# CSS Selectors and Specificity

In this second tutorial, you’ll learn about **CSS selectors** and **specificity**, which determine how styles are applied to HTML elements. Selectors target elements, and specificity resolves style conflicts.

In this tutorial, you’ll learn:
- Types of CSS selectors
- How specificity affects styles
- Combining selectors for precision

## CSS Selectors

Selectors target HTML elements:
- **Element**: Targets tags (e.g., `p`).
- **Class**: Targets `.classname`.
- **ID**: Targets `#idname`.

Example with different selectors:

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
    <title>Selectors</title>
    <style>
      p {
        color: blue;
      }
      .highlight {
        background-color: yellow;
      }
      #main {
        font-size: 20px;
      }
    </style>
  </head>
  <body>
    <h1 id="main">Main Heading</h1>
    <p class="highlight">Highlighted text.</p>
    <p>Normal text.</p>
  </body>
</html>
```
::

## Specificity Rules

Specificity determines which style applies when multiple rules target the same element. Higher specificity wins:
- Inline styles: Highest (1000 points).
- ID selectors: 100 points.
- Class selectors: 10 points.
- Element selectors: 1 point.

Example of specificity:

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
    <title>Specificity</title>
    <style>
      p {
        color: blue;
      }
      .highlight {
        color: red;
      }
      #special {
        color: green;
      }
    </style>
  </head>
  <body>
    <p id="special" class="highlight">Which color?</p>
  </body>
</html>
```
::

## Best Practices
- Use class selectors for reusable styles.
- Avoid overusing ID selectors due to high specificity.
- Test conflicting styles to ensure desired outcomes.

## What’s Next?

You’ve learned selectors and specificity! Next, we’ll explore **CSS Colors and Backgrounds** for visual styling.