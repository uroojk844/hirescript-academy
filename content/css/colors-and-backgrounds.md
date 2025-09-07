---
title: CSS Colors and Backgrounds
description: Style elements with colors and backgrounds.
navigation:
  order: 3
---

# CSS Colors and Backgrounds

In this third tutorial, you’ll learn how to style HTML elements using **colors** and **backgrounds**. These properties enhance the visual appeal of your webpages.

In this tutorial, you’ll learn:
- Color formats (hex, RGB, etc.)
- Background properties (color, image)
- Applying gradients and opacity

## Color Formats

CSS supports multiple color formats:
- **Hex**: `#FF0000` (red).
- **RGB**: `rgb(255, 0, 0)`.
- **Color Names**: `red`, `blue`.

Example with colors:

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
    <title>Colors</title>
    <style>
      h1 {
        color: #0000FF;
      }
      p {
        color: rgb(0, 128, 0);
      }
      .highlight {
        color: purple;
      }
    </style>
  </head>
  <body>
    <h1>Blue Heading</h1>
    <p>Green Paragraph</p>
    <p class="highlight">Purple Text</p>
  </body>
</html>
```
::

## Background Properties

Background properties include:
- `background-color`: Sets the background color.
- `background-image`: Adds an image.
- `background-repeat`: Controls image repetition.

Example with backgrounds:

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
    <title>Backgrounds</title>
    <style>
      body {
        background-color: #f0f0f0;
      }
      .box {
        background-image: url('https://picsum.photos/150');
        background-repeat: no-repeat;
        width: 200px;
        height: 200px;
      }
    </style>
  </head>
  <body>
    <h1>Background Styling</h1>
    <div class="box"></div>
  </body>
</html>
```
::

## Best Practices
- Use accessible color contrasts.
- Optimize background images for performance.
- Test colors across devices.

## What’s Next?

You’ve learned colors and backgrounds! Next, we’ll explore **CSS Text and Fonts** for text styling.