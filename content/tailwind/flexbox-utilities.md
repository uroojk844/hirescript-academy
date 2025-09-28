---
title: Flexbox Utilities
description: Learn how to create flexible layouts using Tailwind's Flexbox utilities.
navigation:
  order: 8
---

# Flexbox Utilities

Welcome to the Flexbox Utilities tutorial! In this lesson, you'll learn how to use Tailwind CSS utilities to create flexible, responsive layouts using Flexbox. Flexbox is one of the most powerful layout tools in CSS, allowing you to align and distribute elements with ease.

In this tutorial, you'll learn:

- How to create flex containers and control direction
- How to align items horizontally and vertically
- How to control spacing and wrapping
- How to work with flex grow, shrink, and basis

## Creating a Flex Container

To start using Flexbox, you need to create a flex container using the `flex` class.

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
    <title>Flex Container</title>
  </head>
  <body class="p-8">
    <div class="flex bg-gray-100 p-4 space-x-2">
      <div class="bg-blue-500 text-white p-4 rounded">Item 1</div>
      <div class="bg-blue-500 text-white p-4 rounded">Item 2</div>
      <div class="bg-blue-500 text-white p-4 rounded">Item 3</div>
    </div>
  </body>
</html>
```

::

### Explanation

- `flex`: Makes the container a flexbox, arranging children horizontally by default
- Children are placed in a row side by side
- `space-x-2`: Adds horizontal spacing between flex items

## Flex Direction

Control the direction of flex items using direction utilities.

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
    <title>Flex Direction</title>
  </head>
  <body class="p-8 space-y-6">
    <div>
      <h3 class="font-bold mb-2">Row (Default)</h3>
      <div class="flex flex-row bg-gray-100 p-4 space-x-2">
        <div class="bg-purple-500 text-white p-4 rounded">1</div>
        <div class="bg-purple-500 text-white p-4 rounded">2</div>
        <div class="bg-purple-500 text-white p-4 rounded">3</div>
      </div>
    </div>

    <div>
      <h3 class="font-bold mb-2">Row Reverse</h3>
      <div class="flex flex-row-reverse bg-gray-100 p-4 space-x-2 space-x-reverse">
        <div class="bg-purple-500 text-white p-4 rounded">1</div>
        <div class="bg-purple-500 text-white p-4 rounded">2</div>
        <div class="bg-purple-500 text-white p-4 rounded">3</div>
      </div>
    </div>

    <div>
      <h3 class="font-bold mb-2">Column</h3>
      <div class="flex flex-col bg-gray-100 p-4 space-y-2">
        <div class="bg-purple-500 text-white p-4 rounded">1</div>
        <div class="bg-purple-500 text-white p-4 rounded">2</div>
        <div class="bg-purple-500 text-white p-4 rounded">3</div>
      </div>
    </div>

    <div>
      <h3 class="font-bold mb-2">Column Reverse</h3>
      <div class="flex flex-col-reverse bg-gray-100 p-4 space-y-2 space-y-reverse">
        <div class="bg-purple-500 text-white p-4 rounded">1</div>
        <div class="bg-purple-500 text-white p-4 rounded">2</div>
        <div class="bg-purple-500 text-white p-4 rounded">3</div>
      </div>
    </div>
  </body>
</html>
```

::

### Explanation

- `flex-row`: Items flow horizontally (left to right) - this is the default
- `flex-row-reverse`: Items flow horizontally but reversed (right to left)
- `flex-col`: Items stack vertically (top to bottom)
- `flex-col-reverse`: Items stack vertically but reversed (bottom to top)

## Justify Content (Horizontal Alignment)

Control how flex items are distributed along the main axis.

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
    <title>Justify Content</title>
  </head>
  <body class="p-8 space-y-4">
    <div class="flex justify-start bg-gray-100 p-4 space-x-2">
      <div class="bg-green-500 text-white p-4 rounded">Start</div>
      <div class="bg-green-500 text-white p-4 rounded">Items</div>
    </div>

    <div class="flex justify-center bg-gray-100 p-4 space-x-2">
      <div class="bg-green-500 text-white p-4 rounded">Center</div>
      <div class="bg-green-500 text-white p-4 rounded">Items</div>
    </div>

    <div class="flex justify-end bg-gray-100 p-4 space-x-2">
      <div class="bg-green-500 text-white p-4 rounded">End</div>
      <div class="bg-green-500 text-white p-4 rounded">Items</div>
    </div>

    <div class="flex justify-between bg-gray-100 p-4">
      <div class="bg-green-500 text-white p-4 rounded">Between</div>
      <div class="bg-green-500 text-white p-4 rounded">Space</div>
      <div class="bg-green-500 text-white p-4 rounded">Items</div>
    </div>

    <div class="flex justify-around bg-gray-100 p-4">
      <div class="bg-green-500 text-white p-4 rounded">Around</div>
      <div class="bg-green-500 text-white p-4 rounded">Space</div>
      <div class="bg-green-500 text-white p-4 rounded">Items</div>
    </div>

    <div class="flex justify-evenly bg-gray-100 p-4">
      <div class="bg-green-500 text-white p-4 rounded">Evenly</div>
      <div class="bg-green-500 text-white p-4 rounded">Space</div>
      <div class="bg-green-500 text-white p-4 rounded">Items</div>
    </div>
  </body>
</html>
```

::

### Explanation

- `justify-start`: Aligns items at the start (left for row, top for column)
- `justify-center`: Centers items along the main axis
- `justify-end`: Aligns items at the end (right for row, bottom for column)
- `justify-between`: Distributes items with space between them, no space at edges
- `justify-around`: Distributes items with equal space around each item
- `justify-evenly`: Distributes items with equal space between and at edges

## Align Items (Vertical Alignment)

Control how flex items are aligned along the cross axis.

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
    <title>Align Items</title>
  </head>
  <body class="p-8 space-y-4">
    <div class="flex items-start bg-gray-100 p-4 h-32 space-x-2">
      <div class="bg-red-500 text-white p-4 rounded">Start</div>
      <div class="bg-red-500 text-white p-4 rounded h-20">Tall</div>
      <div class="bg-red-500 text-white p-4 rounded">Items</div>
    </div>

    <div class="flex items-center bg-gray-100 p-4 h-32 space-x-2">
      <div class="bg-red-500 text-white p-4 rounded">Center</div>
      <div class="bg-red-500 text-white p-4 rounded h-20">Tall</div>
      <div class="bg-red-500 text-white p-4 rounded">Items</div>
    </div>

    <div class="flex items-end bg-gray-100 p-4 h-32 space-x-2">
      <div class="bg-red-500 text-white p-4 rounded">End</div>
      <div class="bg-red-500 text-white p-4 rounded h-20">Tall</div>
      <div class="bg-red-500 text-white p-4 rounded">Items</div>
    </div>

    <div class="flex items-stretch bg-gray-100 p-4 h-32 space-x-2">
      <div class="bg-red-500 text-white p-4 rounded">Stretch</div>
      <div class="bg-red-500 text-white p-4 rounded">To</div>
      <div class="bg-red-500 text-white p-4 rounded">Fill</div>
    </div>

    <div class="flex items-baseline bg-gray-100 p-4 h-32 space-x-2">
      <div class="bg-red-500 text-white p-4 rounded text-2xl">Big</div>
      <div class="bg-red-500 text-white p-4 rounded text-sm">Small</div>
      <div class="bg-red-500 text-white p-4 rounded">Normal</div>
    </div>
  </body>
</html>
```

::

### Explanation

- `items-start`: Aligns items at the start of the cross axis (top for row)
- `items-center`: Centers items along the cross axis (vertically for row)
- `items-end`: Aligns items at the end of the cross axis (bottom for row)
- `items-stretch`: Stretches items to fill the container height (default)
- `items-baseline`: Aligns items based on their text baseline

## Flex Wrap

Control whether flex items wrap to multiple lines.

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
    <title>Flex Wrap</title>
  </head>
  <body class="p-8 space-y-6">
    <div>
      <h3 class="font-bold mb-2">No Wrap (Default)</h3>
      <div class="flex flex-nowrap bg-gray-100 p-4 space-x-2">
        <div class="bg-yellow-500 text-white p-4 rounded w-48">Item 1</div>
        <div class="bg-yellow-500 text-white p-4 rounded w-48">Item 2</div>
        <div class="bg-yellow-500 text-white p-4 rounded w-48">Item 3</div>
        <div class="bg-yellow-500 text-white p-4 rounded w-48">Item 4</div>
        <div class="bg-yellow-500 text-white p-4 rounded w-48">Item 5</div>
      </div>
    </div>

    <div>
      <h3 class="font-bold mb-2">Wrap</h3>
      <div class="flex flex-wrap bg-gray-100 p-4 gap-2">
        <div class="bg-yellow-500 text-white p-4 rounded w-48">Item 1</div>
        <div class="bg-yellow-500 text-white p-4 rounded w-48">Item 2</div>
        <div class="bg-yellow-500 text-white p-4 rounded w-48">Item 3</div>
        <div class="bg-yellow-500 text-white p-4 rounded w-48">Item 4</div>
        <div class="bg-yellow-500 text-white p-4 rounded w-48">Item 5</div>
      </div>
    </div>

    <div>
      <h3 class="font-bold mb-2">Wrap Reverse</h3>
      <div class="flex flex-wrap-reverse bg-gray-100 p-4 gap-2">
        <div class="bg-yellow-500 text-white p-4 rounded w-48">Item 1</div>
        <div class="bg-yellow-500 text-white p-4 rounded w-48">Item 2</div>
        <div class="bg-yellow-500 text-white p-4 rounded w-48">Item 3</div>
        <div class="bg-yellow-500 text-white p-4 rounded w-48">Item 4</div>
        <div class="bg-yellow-500 text-white p-4 rounded w-48">Item 5</div>
      </div>
    </div>
  </body>
</html>
```

::

### Explanation

- `flex-nowrap`: Items stay on one line, may overflow (default)
- `flex-wrap`: Items wrap to multiple lines when needed
- `flex-wrap-reverse`: Items wrap to multiple lines in reverse order
- Use `gap` instead of `space-x` when wrapping to maintain consistent spacing

## Flex Grow, Shrink, and Basis

Control how flex items grow, shrink, and set their initial size.

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
    <title>Flex Grow and Shrink</title>
  </head>
  <body class="p-8 space-y-6">
    <div>
      <h3 class="font-bold mb-2">Flex Grow</h3>
      <div class="flex bg-gray-100 p-4 space-x-2">
        <div class="flex-1 bg-indigo-500 text-white p-4 rounded">Grow 1</div>
        <div class="flex-1 bg-indigo-500 text-white p-4 rounded">Grow 1</div>
        <div class="bg-indigo-500 text-white p-4 rounded">No grow</div>
      </div>
    </div>

    <div>
      <h3 class="font-bold mb-2">Different Grow Values</h3>
      <div class="flex bg-gray-100 p-4 space-x-2">
        <div class="flex-1 bg-pink-500 text-white p-4 rounded">Grow 1</div>
        <div class="flex-grow-[2] bg-pink-600 text-white p-4 rounded">Grow 2</div>
        <div class="flex-1 bg-pink-500 text-white p-4 rounded">Grow 1</div>
      </div>
    </div>

    <div>
      <h3 class="font-bold mb-2">Flex None (No Grow or Shrink)</h3>
      <div class="flex bg-gray-100 p-4 space-x-2">
        <div class="flex-1 bg-teal-500 text-white p-4 rounded">Flexible</div>
        <div class="flex-none bg-teal-600 text-white p-4 rounded w-48">Fixed width</div>
        <div class="flex-1 bg-teal-500 text-white p-4 rounded">Flexible</div>
      </div>
    </div>

    <div>
      <h3 class="font-bold mb-2">Flex Auto (Grow and Shrink)</h3>
      <div class="flex bg-gray-100 p-4 space-x-2">
        <div class="flex-auto bg-orange-500 text-white p-4 rounded">Auto 1</div>
        <div class="flex-auto bg-orange-500 text-white p-4 rounded">Auto 2</div>
        <div class="flex-auto bg-orange-500 text-white p-4 rounded">Auto 3</div>
      </div>
    </div>
  </body>
</html>
```

::

### Explanation

- `flex-1`: Item grows and shrinks, distributes space equally
- `flex-auto`: Item grows and shrinks based on its content
- `flex-none`: Item doesn't grow or shrink (fixed size)
- `flex-grow-[2]`: Item grows twice as much as `flex-1` items
- Use `flex-1` for equal-width columns

## Practical Examples

Combine flexbox utilities to create common layouts.

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
    <title>Practical Examples</title>
  </head>
  <body class="p-8 space-y-8 bg-gray-50">
    <!-- Navigation Bar -->
    <div class="flex items-center justify-between bg-blue-600 text-white p-4 rounded-lg shadow-lg">
      <div class="text-xl font-bold">Logo</div>
      <div class="flex space-x-4">
        <a href="#" class="hover:underline">Home</a>
        <a href="#" class="hover:underline">About</a>
        <a href="#" class="hover:underline">Contact</a>
      </div>
      <button class="bg-white text-blue-600 px-4 py-2 rounded font-semibold">Sign In</button>
    </div>

    <!-- Card with Icon and Text -->
    <div class="flex items-center bg-white p-6 rounded-lg shadow-md space-x-4">
      <div class="flex-none w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
        A
      </div>
      <div class="flex-1">
        <h3 class="text-lg font-bold">Card Title</h3>
        <p class="text-gray-600">This card uses flexbox to align an icon with text content.</p>
      </div>
    </div>

    <!-- Feature Grid -->
    <div class="flex flex-wrap gap-4">
      <div class="flex-1 min-w-[200px] bg-white p-6 rounded-lg shadow-md">
        <h4 class="font-bold text-green-600 mb-2">Feature 1</h4>
        <p class="text-gray-600">Description of the first feature.</p>
      </div>
      <div class="flex-1 min-w-[200px] bg-white p-6 rounded-lg shadow-md">
        <h4 class="font-bold text-green-600 mb-2">Feature 2</h4>
        <p class="text-gray-600">Description of the second feature.</p>
      </div>
      <div class="flex-1 min-w-[200px] bg-white p-6 rounded-lg shadow-md">
        <h4 class="font-bold text-green-600 mb-2">Feature 3</h4>
        <p class="text-gray-600">Description of the third feature.</p>
      </div>
    </div>

    <!-- Footer -->
    <div class="flex flex-col md:flex-row items-center justify-between bg-gray-800 text-white p-6 rounded-lg">
      <p>&copy; 2024 Company Name</p>
      <div class="flex space-x-4 mt-4 md:mt-0">
        <a href="#" class="hover:text-gray-300">Privacy</a>
        <a href="#" class="hover:text-gray-300">Terms</a>
        <a href="#" class="hover:text-gray-300">Contact</a>
      </div>
    </div>
  </body>
</html>
```

::

### Key Points

- Navigation bars use `justify-between` for logo and menu spacing
- Cards use `items-center` to vertically align icons with text
- Feature grids use `flex-wrap` with `flex-1` for responsive layouts
- Footers can switch from column to row layout using responsive classes

## Best Practices

- Use `flex` with `justify-between` for navigation bars
- Combine `items-center` and `justify-center` to center content both ways
- Use `gap` instead of `space-x/y` when items wrap
- Use `flex-1` for equal-width flexible columns
- Use `flex-none` for fixed-width elements within flex containers
- Remember: `justify-*` controls main axis, `items-*` controls cross axis
- For complex layouts, consider CSS Grid (covered in the next tutorial)

## What's Next?

You've mastered Flexbox utilities in Tailwind CSS! In the next tutorial, we'll explore the **Grid System**, which provides even more powerful layout capabilities for complex, two-dimensional designs.