---
title: CSS Text and Fonts
description: Style text and fonts in CSS.
navigation:
  order: 4
---

# CSS Text and Fonts

In this fourth tutorial, you’ll learn how to style **text** and **fonts** in CSS to enhance readability and aesthetics of HTML content.

In this tutorial, you’ll learn:
- Text properties (`text-align`, `text-decoration`)
- Font properties (`font-family`, `font-weight`)
- Custom fonts with `@font-face`

## Text Properties

Key text properties:
- `text-align`: Aligns text (left, center, right).
- `text-decoration`: Adds underlines, overlines, etc.
- `line-height`: Sets line spacing.

Example with text styling:

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
    <title>Text Styling</title>
    <style>
      h1 {
        text-align: center;
        text-decoration: underline;
      }
      p {
        line-height: 1.5;
        text-transform: uppercase;
      }
    </style>
  </head>
  <body>
    <h1>Centered Heading</h1>
    <p>Uppercase paragraph text.</p>
  </body>
</html>
```
::

## Font Properties

Key font properties:
- `font-family`: Sets the font (e.g., Arial, sans-serif).
- `font-size`: Sets text size (e.g., 16px).
- `font-weight`: Sets boldness (e.g., 700).

Example with fonts:

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
    <title>Fonts</title>
    <style>
      body {
        font-family: Arial, sans-serif;
      }
      h1 {
        font-size: 24px;
        font-weight: bold;
      }
    </style>
  </head>
  <body>
    <h1>Bold Heading</h1>
    <p>Styled with Arial.</p>
  </body>
</html>
```
::

## Best Practices
- Use web-safe fonts for compatibility.
- Ensure readable font sizes.
- Test text styles for accessibility.

## What’s Next?

You’ve learned text and font styling! Next, we’ll explore the **CSS Box Model** for layout control.