---
title: CSS Pseudo-Classes and Elements
description: Style dynamically with pseudo-classes and elements.
navigation:
  order: 11
---

# CSS Pseudo-Classes and Elements

In this eleventh tutorial, you’ll learn about **pseudo-classes** and **pseudo-elements** in CSS, which allow dynamic and targeted styling of HTML elements.

In this tutorial, you’ll learn:
- Using pseudo-classes (`:hover`, `:focus`)
- Using pseudo-elements (`::before`, `::after`)
- Practical interactive styling

## Pseudo-Classes

Pseudo-classes style elements based on state (e.g., `:hover`, `:focus`).

Example with pseudo-classes:

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
    <title>Pseudo-Classes</title>
    <style>
      a:hover {
        color: red;
      }
      input:focus {
        border-color: blue;
      }
    </style>
  </head>
  <body>
    <h1>Interactive Links</h1>
    <a href="#">Hover Me</a>
    <input type="text" placeholder="Focus here" />
  </body>
</html>
```
::

## Pseudo-Elements

Pseudo-elements style specific parts of an element (e.g., `::before`, `::after`).

Example with pseudo-elements:

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
    <title>Pseudo-Elements</title>
    <style>
      p::before {
        content: "★ ";
        color: gold;
      }
      p::after {
        content: "!";
      }
    </style>
  </head>
  <body>
    <h1>Styled Paragraph</h1>
    <p>Content with markers.</p>
  </body>
</html>
```
::

## Best Practices
- Use pseudo-classes for interactivity.
- Keep pseudo-element content minimal.
- Ensure accessibility for dynamic styles.

## What’s Next?

You’ve learned pseudo-classes and elements! Next, we’ll explore **CSS Variables and Preprocessors** for advanced styling.