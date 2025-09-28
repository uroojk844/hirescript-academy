---
title: Borders and Shadows
description: Learn how to add borders and shadows to elements using Tailwind CSS.
navigation:
  order: 7
---

# Borders and Shadows

Welcome to the Borders and Shadows tutorial! In this lesson, you'll learn how to use Tailwind CSS utilities to add borders, rounded corners, and shadows to your elements. These utilities help you create visually appealing designs with depth and definition.

In this tutorial, you'll learn:

- How to apply border styles, widths, and colors
- How to create rounded corners
- How to add box shadows for depth
- How to combine borders and shadows effectively

## Border Width

Tailwind provides utilities to control the width of borders on all sides or individual sides of an element.

Here's a simple example:

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
    <script src="https://cdn.tailwindcss.com"></script>
    <title>Border Width</title>
  </head>
  <body class="p-8 space-y-4">
    <div class="border p-4 bg-white">Default border (1px)</div>
    <div class="border-2 p-4 bg-white">Border 2px</div>
    <div class="border-4 p-4 bg-white">Border 4px</div>
    <div class="border-8 p-4 bg-white">Border 8px</div>
    <div class="border-t-4 p-4 bg-white">Top border only</div>
    <div class="border-x-4 p-4 bg-white">Left and right borders</div>
  </body>
</html>
```

::

### Explanation

- `border`: Applies a 1px border on all sides
- `border-2`, `border-4`, `border-8`: Sets border width (2px, 4px, 8px)
- `border-t-4`: Applies border only to the top
- `border-x-4`: Applies border to left and right sides
- Use `border-b`, `border-l`, `border-r` for bottom, left, and right borders

## Border Colors

You can customize border colors using Tailwind's color utilities.

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
    <script src="https://cdn.tailwindcss.com"></script>
    <title>Border Colors</title>
  </head>
  <body class="p-8 space-y-4">
    <div class="border-4 border-blue-500 p-4 bg-white">Blue border</div>
    <div class="border-4 border-green-600 p-4 bg-white">Green border</div>
    <div class="border-4 border-red-500 p-4 bg-white">Red border</div>
    <div class="border-4 border-purple-400 p-4 bg-white">Purple border</div>
    <div class="border-4 border-gray-300 p-4 bg-white">Gray border</div>
  </body>
</html>
```

::

### Explanation

- `border-blue-500`: Sets border color to blue (shade 500)
- `border-green-600`: Sets border color to green (shade 600)
- Colors range from 50 (lightest) to 950 (darkest)
- Combine with border width classes for full control

## Border Radius (Rounded Corners)

Create rounded corners using the `rounded` utilities.

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
    <script src="https://cdn.tailwindcss.com"></script>
    <title>Border Radius</title>
  </head>
  <body class="p-8 space-y-4">
    <div class="border-4 border-blue-500 rounded p-4 bg-white">Small rounded corners</div>
    <div class="border-4 border-blue-500 rounded-md p-4 bg-white">Medium rounded</div>
    <div class="border-4 border-blue-500 rounded-lg p-4 bg-white">Large rounded</div>
    <div class="border-4 border-blue-500 rounded-xl p-4 bg-white">Extra large rounded</div>
    <div class="border-4 border-blue-500 rounded-full p-4 bg-white">Fully rounded (pill shape)</div>
    <div class="border-4 border-blue-500 rounded-t-lg p-4 bg-white">Rounded top only</div>
  </body>
</html>
```

::

### Explanation

- `rounded`: Applies small border radius (0.25rem)
- `rounded-md`, `rounded-lg`, `rounded-xl`: Increasing sizes
- `rounded-full`: Creates a perfect circle or pill shape
- `rounded-t`, `rounded-r`, `rounded-b`, `rounded-l`: Round specific sides
- `rounded-tl`, `rounded-tr`, `rounded-br`, `rounded-bl`: Round specific corners

## Box Shadows

Add depth to your elements using box shadow utilities.

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
    <script src="https://cdn.tailwindcss.com"></script>
    <title>Box Shadows</title>
  </head>
  <body class="p-8 space-y-6 bg-gray-100">
    <div class="shadow-sm p-4 bg-white rounded">Small shadow</div>
    <div class="shadow p-4 bg-white rounded">Default shadow</div>
    <div class="shadow-md p-4 bg-white rounded">Medium shadow</div>
    <div class="shadow-lg p-4 bg-white rounded">Large shadow</div>
    <div class="shadow-xl p-4 bg-white rounded">Extra large shadow</div>
    <div class="shadow-2xl p-4 bg-white rounded">2XL shadow</div>
    <div class="shadow-inner p-4 bg-white rounded">Inner shadow</div>
    <div class="shadow-none p-4 bg-white rounded border">No shadow</div>
  </body>
</html>
```

::

### Explanation

- `shadow-sm`: Very subtle shadow
- `shadow`: Default medium shadow
- `shadow-md`, `shadow-lg`, `shadow-xl`, `shadow-2xl`: Progressively larger shadows
- `shadow-inner`: Creates an inset shadow effect
- `shadow-none`: Removes any shadow

## Combining Borders, Rounds, and Shadows

Create polished card components by combining these utilities.

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
    <script src="https://cdn.tailwindcss.com"></script>
    <title>Combined Example</title>
  </head>
  <body class="p-8 space-y-6 bg-gray-100">
    <div class="border border-gray-200 rounded-lg shadow-md p-6 bg-white">
      <h2 class="text-xl font-bold mb-2">Card with Border</h2>
      <p class="text-gray-600">This card combines border, rounded corners, and shadow.</p>
    </div>

    <div class="border-2 border-blue-500 rounded-xl shadow-lg p-6 bg-white">
      <h2 class="text-xl font-bold text-blue-600 mb-2">Highlighted Card</h2>
      <p class="text-gray-600">Thicker colored border with large shadow.</p>
    </div>

    <div class="rounded-2xl shadow-2xl p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
      <h2 class="text-xl font-bold mb-2">Gradient Card</h2>
      <p>No border, just rounded corners and shadow with gradient background.</p>
    </div>

    <div class="border-l-4 border-green-500 rounded-r-lg shadow-md p-6 bg-white">
      <h2 class="text-xl font-bold mb-2">Accent Border</h2>
      <p class="text-gray-600">Left accent border with right rounded corners.</p>
    </div>
  </body>
</html>
```

::

### Key Points

- Combine `border`, `rounded`, and `shadow` classes for complete styling
- Use subtle borders (`border-gray-200`) with shadows for elegant cards
- Colored borders draw attention to specific elements
- Gradient backgrounds work well with rounded corners and shadows

## Border Style

Control the style of borders with different line patterns.

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
    <script src="https://cdn.tailwindcss.com"></script>
    <title>Border Styles</title>
  </head>
  <body class="p-8 space-y-4">
    <div class="border-4 border-solid border-blue-500 p-4 bg-white">Solid border</div>
    <div class="border-4 border-dashed border-blue-500 p-4 bg-white">Dashed border</div>
    <div class="border-4 border-dotted border-blue-500 p-4 bg-white">Dotted border</div>
    <div class="border-4 border-double border-blue-500 p-4 bg-white">Double border</div>
    <div class="border-4 border-none p-4 bg-gray-100">No border</div>
  </body>
</html>
```

::

### Explanation

- `border-solid`: Default solid line (usually implied)
- `border-dashed`: Creates dashed line pattern
- `border-dotted`: Creates dotted line pattern
- `border-double`: Creates double line effect
- `border-none`: Removes border entirely

## Best Practices

- Use subtle shadows (`shadow-sm` or `shadow-md`) for most UI elements
- Reserve large shadows (`shadow-xl`, `shadow-2xl`) for modals or important cards
- Combine `rounded-lg` with `shadow-lg` for modern card designs
- Use border colors that match your design system
- Don't overuse shadows - too many can make a page feel cluttered
- Use `border-gray-200` or `border-gray-300` for subtle borders that define space without distraction

## What's Next?

You've learned how to add borders and shadows to create depth and visual interest! In the next tutorial, we'll explore **Flexbox Utilities**, covering how to create flexible layouts with alignment and distribution controls.