---
title: Grid System
description: Learn how to create powerful two-dimensional layouts using Tailwind's Grid utilities.
navigation:
  order: 9
---

# Grid System

Welcome to the Grid System tutorial! In this lesson, you'll learn how to use Tailwind CSS Grid utilities to create complex, two-dimensional layouts. CSS Grid is perfect for creating page layouts, image galleries, and any design that requires precise control over rows and columns.

In this tutorial, you'll learn:

- How to create grid containers and define columns
- How to control grid rows and gaps
- How to place items in specific grid positions
- How to create responsive grid layouts

## Creating a Grid Container

To start using CSS Grid, create a grid container using the `grid` class and define columns with `grid-cols-*`.

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
    <title>Grid Container</title>
  </head>
  <body class="p-8">
    <div class="grid grid-cols-3 gap-4 bg-gray-100 p-4">
      <div class="bg-blue-500 text-white p-4 rounded">Item 1</div>
      <div class="bg-blue-500 text-white p-4 rounded">Item 2</div>
      <div class="bg-blue-500 text-white p-4 rounded">Item 3</div>
      <div class="bg-blue-500 text-white p-4 rounded">Item 4</div>
      <div class="bg-blue-500 text-white p-4 rounded">Item 5</div>
      <div class="bg-blue-500 text-white p-4 rounded">Item 6</div>
    </div>
  </body>
</html>
```

::

### Explanation

- `grid`: Creates a grid container
- `grid-cols-3`: Defines 3 equal-width columns
- `gap-4`: Adds spacing between grid items (1rem)
- Items automatically flow into the grid cells

## Grid Template Columns

Control the number and size of columns in your grid.

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
    <title>Grid Columns</title>
  </head>
  <body class="p-8 space-y-6">
    <div>
      <h3 class="font-bold mb-2">2 Columns</h3>
      <div class="grid grid-cols-2 gap-4">
        <div class="bg-purple-500 text-white p-4 rounded">Item 1</div>
        <div class="bg-purple-500 text-white p-4 rounded">Item 2</div>
        <div class="bg-purple-500 text-white p-4 rounded">Item 3</div>
        <div class="bg-purple-500 text-white p-4 rounded">Item 4</div>
      </div>
    </div>

    <div>
      <h3 class="font-bold mb-2">4 Columns</h3>
      <div class="grid grid-cols-4 gap-4">
        <div class="bg-purple-500 text-white p-4 rounded">1</div>
        <div class="bg-purple-500 text-white p-4 rounded">2</div>
        <div class="bg-purple-500 text-white p-4 rounded">3</div>
        <div class="bg-purple-500 text-white p-4 rounded">4</div>
        <div class="bg-purple-500 text-white p-4 rounded">5</div>
        <div class="bg-purple-500 text-white p-4 rounded">6</div>
        <div class="bg-purple-500 text-white p-4 rounded">7</div>
        <div class="bg-purple-500 text-white p-4 rounded">8</div>
      </div>
    </div>

    <div>
      <h3 class="font-bold mb-2">6 Columns</h3>
      <div class="grid grid-cols-6 gap-2">
        <div class="bg-purple-500 text-white p-4 rounded">1</div>
        <div class="bg-purple-500 text-white p-4 rounded">2</div>
        <div class="bg-purple-500 text-white p-4 rounded">3</div>
        <div class="bg-purple-500 text-white p-4 rounded">4</div>
        <div class="bg-purple-500 text-white p-4 rounded">5</div>
        <div class="bg-purple-500 text-white p-4 rounded">6</div>
      </div>
    </div>
  </body>
</html>
```

::

### Explanation

- `grid-cols-1` through `grid-cols-12`: Creates 1 to 12 equal columns
- Tailwind provides up to 12 columns by default
- Items automatically wrap to new rows when columns are filled

## Grid Column Span

Control how many columns an item should span.

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
    <title>Column Span</title>
  </head>
  <body class="p-8 space-y-6">
    <div>
      <h3 class="font-bold mb-2">Column Spanning</h3>
      <div class="grid grid-cols-3 gap-4">
        <div class="col-span-2 bg-green-500 text-white p-4 rounded">Spans 2 columns</div>
        <div class="bg-green-500 text-white p-4 rounded">1 column</div>
        <div class="bg-green-500 text-white p-4 rounded">1 column</div>
        <div class="col-span-2 bg-green-500 text-white p-4 rounded">Spans 2 columns</div>
      </div>
    </div>

    <div>
      <h3 class="font-bold mb-2">Full Width Item</h3>
      <div class="grid grid-cols-4 gap-4">
        <div class="col-span-4 bg-red-500 text-white p-4 rounded">Full width (4 columns)</div>
        <div class="col-span-2 bg-red-500 text-white p-4 rounded">Half (2 columns)</div>
        <div class="col-span-2 bg-red-500 text-white p-4 rounded">Half (2 columns)</div>
        <div class="bg-red-500 text-white p-4 rounded">1</div>
        <div class="bg-red-500 text-white p-4 rounded">2</div>
        <div class="bg-red-500 text-white p-4 rounded">3</div>
        <div class="bg-red-500 text-white p-4 rounded">4</div>
      </div>
    </div>

    <div>
      <h3 class="font-bold mb-2">Mixed Layout</h3>
      <div class="grid grid-cols-6 gap-4">
        <div class="col-span-3 bg-blue-500 text-white p-4 rounded">3 cols</div>
        <div class="col-span-3 bg-blue-500 text-white p-4 rounded">3 cols</div>
        <div class="col-span-2 bg-blue-500 text-white p-4 rounded">2 cols</div>
        <div class="col-span-4 bg-blue-500 text-white p-4 rounded">4 cols</div>
        <div class="col-span-6 bg-blue-600 text-white p-4 rounded">Full width</div>
      </div>
    </div>
  </body>
</html>
```

::

### Explanation

- `col-span-2`: Item spans 2 columns
- `col-span-3`: Item spans 3 columns
- `col-span-full`: Item spans all columns
- Use column spans to create complex layouts within grids

## Grid Rows

Control the number of rows and how items span across them.

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
    <title>Grid Rows</title>
  </head>
  <body class="p-8 space-y-6">
    <div>
      <h3 class="font-bold mb-2">Explicit Rows</h3>
      <div class="grid grid-cols-3 grid-rows-2 gap-4">
        <div class="bg-yellow-500 text-white p-4 rounded">Item 1</div>
        <div class="bg-yellow-500 text-white p-4 rounded">Item 2</div>
        <div class="bg-yellow-500 text-white p-4 rounded">Item 3</div>
        <div class="bg-yellow-500 text-white p-4 rounded">Item 4</div>
        <div class="bg-yellow-500 text-white p-4 rounded">Item 5</div>
        <div class="bg-yellow-500 text-white p-4 rounded">Item 6</div>
      </div>
    </div>

    <div>
      <h3 class="font-bold mb-2">Row Spanning</h3>
      <div class="grid grid-cols-3 grid-rows-3 gap-4">
        <div class="row-span-2 bg-pink-500 text-white p-4 rounded flex items-center justify-center">
          Spans 2 rows
        </div>
        <div class="bg-pink-500 text-white p-4 rounded">Item 2</div>
        <div class="bg-pink-500 text-white p-4 rounded">Item 3</div>
        <div class="bg-pink-500 text-white p-4 rounded">Item 4</div>
        <div class="row-span-2 bg-pink-500 text-white p-4 rounded flex items-center justify-center">
          Spans 2 rows
        </div>
        <div class="bg-pink-500 text-white p-4 rounded">Item 6</div>
        <div class="bg-pink-500 text-white p-4 rounded">Item 7</div>
      </div>
    </div>

    <div>
      <h3 class="font-bold mb-2">Row and Column Span Combined</h3>
      <div class="grid grid-cols-4 grid-rows-3 gap-4">
        <div class="col-span-2 row-span-2 bg-indigo-500 text-white p-4 rounded flex items-center justify-center">
          2×2 Box
        </div>
        <div class="bg-indigo-500 text-white p-4 rounded">1</div>
        <div class="bg-indigo-500 text-white p-4 rounded">2</div>
        <div class="bg-indigo-500 text-white p-4 rounded">3</div>
        <div class="bg-indigo-500 text-white p-4 rounded">4</div>
        <div class="col-span-2 bg-indigo-500 text-white p-4 rounded">Wide</div>
        <div class="col-span-2 bg-indigo-500 text-white p-4 rounded">Wide</div>
      </div>
    </div>
  </body>
</html>
```

::

### Explanation

- `grid-rows-2`: Creates 2 explicit rows
- `row-span-2`: Item spans 2 rows vertically
- `row-span-3`: Item spans 3 rows vertically
- Combine `col-span` and `row-span` for complex layouts

## Grid Gap

Control spacing between grid items using gap utilities.

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
    <title>Grid Gap</title>
  </head>
  <body class="p-8 space-y-6">
    <div>
      <h3 class="font-bold mb-2">No Gap</h3>
      <div class="grid grid-cols-3 gap-0">
        <div class="bg-teal-500 text-white p-4 border border-white">1</div>
        <div class="bg-teal-500 text-white p-4 border border-white">2</div>
        <div class="bg-teal-500 text-white p-4 border border-white">3</div>
      </div>
    </div>

    <div>
      <h3 class="font-bold mb-2">Small Gap (gap-2)</h3>
      <div class="grid grid-cols-3 gap-2">
        <div class="bg-teal-500 text-white p-4 rounded">1</div>
        <div class="bg-teal-500 text-white p-4 rounded">2</div>
        <div class="bg-teal-500 text-white p-4 rounded">3</div>
      </div>
    </div>

    <div>
      <h3 class="font-bold mb-2">Large Gap (gap-6)</h3>
      <div class="grid grid-cols-3 gap-6">
        <div class="bg-teal-500 text-white p-4 rounded">1</div>
        <div class="bg-teal-500 text-white p-4 rounded">2</div>
        <div class="bg-teal-500 text-white p-4 rounded">3</div>
      </div>
    </div>

    <div>
      <h3 class="font-bold mb-2">Different Horizontal and Vertical Gaps</h3>
      <div class="grid grid-cols-3 gap-x-8 gap-y-2">
        <div class="bg-teal-500 text-white p-4 rounded">1</div>
        <div class="bg-teal-500 text-white p-4 rounded">2</div>
        <div class="bg-teal-500 text-white p-4 rounded">3</div>
        <div class="bg-teal-500 text-white p-4 rounded">4</div>
        <div class="bg-teal-500 text-white p-4 rounded">5</div>
        <div class="bg-teal-500 text-white p-4 rounded">6</div>
      </div>
    </div>
  </body>
</html>
```

::

### Explanation

- `gap-0` through `gap-96`: Sets equal horizontal and vertical spacing
- `gap-x-4`: Sets only horizontal spacing between columns
- `gap-y-4`: Sets only vertical spacing between rows
- Use different `gap-x` and `gap-y` values for asymmetric spacing

## Grid Auto Flow

Control how auto-placed items flow into the grid.

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
    <title>Grid Auto Flow</title>
  </head>
  <body class="p-8 space-y-6">
    <div>
      <h3 class="font-bold mb-2">Row (Default)</h3>
      <div class="grid grid-cols-3 grid-flow-row gap-4">
        <div class="col-span-2 bg-orange-500 text-white p-4 rounded">Wide item</div>
        <div class="bg-orange-500 text-white p-4 rounded">1</div>
        <div class="bg-orange-500 text-white p-4 rounded">2</div>
        <div class="bg-orange-500 text-white p-4 rounded">3</div>
        <div class="bg-orange-500 text-white p-4 rounded">4</div>
      </div>
    </div>

    <div>
      <h3 class="font-bold mb-2">Column</h3>
      <div class="grid grid-cols-3 grid-rows-3 grid-flow-col gap-4">
        <div class="row-span-2 bg-orange-500 text-white p-4 rounded">Tall</div>
        <div class="bg-orange-500 text-white p-4 rounded">1</div>
        <div class="bg-orange-500 text-white p-4 rounded">2</div>
        <div class="bg-orange-500 text-white p-4 rounded">3</div>
        <div class="bg-orange-500 text-white p-4 rounded">4</div>
      </div>
    </div>

    <div>
      <h3 class="font-bold mb-2">Dense (Fills Gaps)</h3>
      <div class="grid grid-cols-4 grid-flow-dense gap-4">
        <div class="col-span-2 bg-orange-500 text-white p-4 rounded">Wide 1</div>
        <div class="bg-orange-500 text-white p-4 rounded">Small</div>
        <div class="col-span-2 bg-orange-500 text-white p-4 rounded">Wide 2</div>
        <div class="bg-orange-500 text-white p-4 rounded">Small</div>
        <div class="bg-orange-500 text-white p-4 rounded">Small</div>
      </div>
    </div>
  </body>
</html>
```

::

### Explanation

- `grid-flow-row`: Items flow in rows (default behavior)
- `grid-flow-col`: Items flow in columns
- `grid-flow-dense`: Attempts to fill gaps in the grid
- Use `grid-flow-dense` to avoid empty spaces in complex layouts

## Responsive Grid Layouts

Create grids that adapt to different screen sizes.

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
    <title>Responsive Grid</title>
  </head>
  <body class="p-8 space-y-8 bg-gray-50">
    <div>
      <h3 class="font-bold mb-2">Responsive Columns: 1 → 2 → 4</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-blue-500 text-white p-4 rounded">Product 1</div>
        <div class="bg-blue-500 text-white p-4 rounded">Product 2</div>
        <div class="bg-blue-500 text-white p-4 rounded">Product 3</div>
        <div class="bg-blue-500 text-white p-4 rounded">Product 4</div>
        <div class="bg-blue-500 text-white p-4 rounded">Product 5</div>
        <div class="bg-blue-500 text-white p-4 rounded">Product 6</div>
        <div class="bg-blue-500 text-white p-4 rounded">Product 7</div>
        <div class="bg-blue-500 text-white p-4 rounded">Product 8</div>
      </div>
    </div>

    <div>
      <h3 class="font-bold mb-2">Responsive Card Layout</h3>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
          <h4 class="text-xl font-bold mb-2">Main Content</h4>
          <p class="text-gray-600">This takes 2 columns on large screens, full width on mobile.</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h4 class="text-xl font-bold mb-2">Sidebar</h4>
          <p class="text-gray-600">This is 1 column on large screens, full width on mobile.</p>
        </div>
      </div>
    </div>

    <div>
      <h3 class="font-bold mb-2">Image Gallery</h3>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        <div class="aspect-square bg-gradient-to-br from-purple-400 to-pink-500 rounded"></div>
        <div class="aspect-square bg-gradient-to-br from-blue-400 to-purple-500 rounded"></div>
        <div class="aspect-square bg-gradient-to-br from-green-400 to-blue-500 rounded"></div>
        <div class="aspect-square bg-gradient-to-br from-yellow-400 to-orange-500 rounded"></div>
        <div class="aspect-square bg-gradient-to-br from-red-400 to-pink-500 rounded"></div>
        <div class="aspect-square bg-gradient-to-br from-indigo-400 to-purple-500 rounded"></div>
        <div class="aspect-square bg-gradient-to-br from-teal-400 to-green-500 rounded"></div>
        <div class="aspect-square bg-gradient-to-br from-orange-400 to-red-500 rounded"></div>
      </div>
    </div>
  </body>
</html>
```

::

### Explanation

- `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`: 1 column mobile, 2 tablet, 4 desktop
- `lg:col-span-2`: Column spanning only applies on large screens
- Responsive grids adapt to different screen sizes automatically
- Use breakpoint prefixes: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`

## Best Practices

- Use Grid for two-dimensional layouts (rows and columns)
- Use Flexbox for one-dimensional layouts (single row or column)
- Start mobile-first with `grid-cols-1`, then add larger breakpoints
- Use `gap` for consistent spacing instead of margins
- Use `col-span` and `row-span` to create featured items
- For image galleries, use `grid-cols-2 md:grid-cols-3 lg:grid-cols-4`
- Combine Grid with Flexbox for complex component layouts
- Use `aspect-square` or `aspect-video` for consistent item sizing

## What's Next?

You've mastered the Grid System in Tailwind CSS! In the next tutorial, we'll explore **Responsive Design**, covering breakpoints, mobile-first approach, and how to make your layouts work beautifully on all screen sizes.