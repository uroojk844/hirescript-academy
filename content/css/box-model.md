---
title: CSS Box Model
description: Understand the CSS box model for layouts.
navigation:
  order: 5
---

# CSS Box Model

In this fifth tutorial, you’ll learn about the **CSS box model**, which defines how elements are sized and spaced, including margins, borders, padding, and content.

In this tutorial, you’ll learn:
- Components of the box model
- Calculating element dimensions
- Box-sizing property

## Box Model Components

The box model includes:
- **Content**: The actual content (text, images).
- **Padding**: Space inside the border.
- **Border**: Surrounds the padding.
- **Margin**: Space outside the border.

Example with box model:

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
    <title>Box Model</title>
    <style>
      .box {
        width: 200px;
        padding: 20px;
        border: 2px solid black;
        margin: 10px;
      }
    </style>
  </head>
  <body>
    <h1>Box Model Example</h1>
    <div class="box">Content</div>
  </body>
</html>
```
::

## Box-Sizing Property

The `box-sizing` property controls how width and height are calculated:
- `content-box`: Width/height includes only content.
- `border-box`: Includes padding and border.

Example with `border-box`:

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
    <title>Box Sizing</title>
    <style>
      .box {
        box-sizing: border-box;
        width: 200px;
        padding: 20px;
        border: 5px solid blue;
      }
    </style>
  </head>
  <body>
    <h1>Border Box</h1>
    <div class="box">Content</div>
  </body>
</html>
```
::

## Best Practices
- Use `box-sizing: border-box` for predictable sizing.
- Avoid excessive margins/padding for performance.
- Test layouts for consistency.

## What’s Next?

You’ve learned the box model! Next, we’ll explore **CSS Positioning Basics** for element placement.