---
title: Introduction to CSS
description: Learn basics of CSS for styling HTML elements.
navigation:
  order: 1
---

# Introduction to CSS

Welcome to the first CSS tutorial! **Cascading Style Sheets (CSS)** styles HTML elements, controlling their appearance and layout. This tutorial introduces CSS syntax and ways to apply it.

In this tutorial, you’ll learn:
- What CSS is and its role
- Basic CSS syntax and selectors
- Applying CSS: inline, internal, external

## What is CSS?

CSS defines how HTML elements look, using rules with **selectors** (targeting elements) and **declarations** (properties and values). CSS "cascades," meaning styles can be inherited or overridden.

## Applying CSS

CSS can be applied in three ways:
- **Inline**: Using the `style` attribute.
- **Internal**: Using a `<style>` tag in `<head>`.
- **External**: Linking a `.css` file with `<link>`.

Example with internal CSS:

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
    <title>Basic CSS</title>
    <style>
      h1 {
        color: blue;
      }
      p {
        font-size: 16px;
      }
    </style>
  </head>
  <body>
    <h1>Welcome</h1>
    <p>This is styled with CSS.</p>
  </body>
</html>
```
::

## External CSS Example

Create a `styles.css` file and link it:

::Editor
#title
styles.css

#default
```css
body {
  background-color: #f0f0f0;
}
a {
  color: purple;
}
```
::

Link it in HTML:

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
    <title>External CSS</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <h1>Styled Page</h1>
    <a href="#">Link</a>
  </body>
</html>
```
::

## Best Practices
- Use external CSS for maintainability.
- Keep CSS rules clear and specific.
- Test styles across browsers.

## What’s Next?

You’ve learned CSS basics! Next, we’ll explore **CSS Selectors and Specificity** to target elements precisely.