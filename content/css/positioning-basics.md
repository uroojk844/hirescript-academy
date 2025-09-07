---
title: CSS Positioning Basics
description: Learn element positioning with CSS properties.
navigation:
  order: 6
---

# CSS Positioning Basics

In this sixth tutorial, you’ll learn about **CSS positioning** to control where elements appear on a webpage, using properties like `position`, `top`, `left`, and `z-index`.

In this tutorial, you’ll learn:
- Position types (`static`, `relative`, etc.)
- Positioning with `top`, `left`, etc.
- Stacking elements with `z-index`

## Position Types

The `position` property includes:
- `static`: Default, follows normal flow.
- `relative`: Offset from its normal position.
- `absolute`: Positioned relative to nearest positioned ancestor.
- `fixed`: Fixed relative to the viewport.
- `sticky`: Toggles between relative and fixed.

Example with positioning:

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
    <title>Positioning</title>
    <style>
      .relative {
        position: relative;
        top: 20px;
        left: 20px;
      }
      .absolute {
        position: absolute;
        top: 50px;
        right: 10px;
      }
    </style>
  </head>
  <body>
    <h1>Positioning Example</h1>
    <div class="relative">Relative Box</div>
    <div class="absolute">Absolute Box</div>
  </body>
</html>
```
::

## Z-Index

The `z-index` property controls stacking order. Higher values appear in front.

Example with `z-index`:

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
    <title>Z-Index</title>
    <style>
      .box1 {
        position: absolute;
        top: 20px;
        left: 20px;
        background: red;
        z-index: 1;
      }
      .box2 {
        position: absolute;
        top: 30px;
        left: 30px;
        background: blue;
        z-index: 2;
      }
    </style>
  </head>
  <body>
    <h1>Stacking Order</h1>
    <div class="box1">Box 1</div>
    <div class="box2">Box 2</div>
  </body>
</html>
```
::

## Best Practices
- Use `relative` for minor adjustments.
- Avoid overusing `absolute` or `fixed`.
- Test positioning for responsiveness.

## What’s Next?

You’ve learned positioning basics! Next, we’ll explore **CSS Flexbox Layout** for flexible layouts.