---
title: Layout and Positioning
description: Master layout and positioning utilities in Tailwind CSS for precise element placement.
navigation:
  order: 4
---

# Layout and Positioning

Welcome to the Layout and Positioning tutorial! This is one of the most fundamental aspects of Tailwind CSS. Understanding how to position and layout elements is crucial for creating well-structured, responsive designs. Tailwind provides powerful utility classes that give you complete control over element positioning without writing custom CSS.

In this tutorial, you'll learn:

- How to use position utilities (static, relative, absolute, fixed, sticky)
- Top, right, bottom, left positioning with inset utilities
- Z-index control for layering elements
- Display utilities for controlling element behavior
- Overflow utilities for content management

## Position Utilities

Tailwind provides five main position utilities that correspond to CSS position values. Each serves a different purpose in layout design.

### Static Positioning

The `static` class is the default position value. Elements flow naturally in the document.

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
    <title>Static Positioning</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body>
    <div class="p-8">
      <div class="static bg-blue-500 text-white p-4 mb-4">
        Static positioned element (default behavior)
      </div>
      <div class="bg-gray-300 p-4">
        This element flows naturally after the static element
      </div>
    </div>
  </body>
</html>
```

::

### Relative Positioning

Use `relative` to position an element relative to its normal position. This creates a positioning context for absolutely positioned children.

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
    <title>Relative Positioning</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body>
    <div class="p-8">
      <div class="relative bg-blue-500 text-white p-4 top-4 left-4">
        Relative positioned - moved 16px down and right
      </div>
      <div class="bg-gray-300 p-4 mt-4">
        This element maintains its space in the flow
      </div>
    </div>
  </body>
</html>
```

::

### Absolute Positioning

The `absolute` class positions elements relative to their nearest positioned ancestor (or viewport if none exists).

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
    <title>Absolute Positioning</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body>
    <div class="relative bg-gray-100 h-64 p-8">
      <div class="absolute top-4 right-4 bg-red-500 text-white p-4">
        Absolutely positioned in top-right
      </div>
      <div class="absolute bottom-4 left-4 bg-green-500 text-white p-4">
        Absolutely positioned in bottom-left
      </div>
      <p>This is the relatively positioned container</p>
    </div>
  </body>
</html>
```

::

## Inset Utilities

Inset utilities control the top, right, bottom, and left properties of positioned elements.

### Individual Direction Classes

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
    <title>Inset Utilities</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body>
    <div class="relative bg-gray-100 h-96 p-8">
      <div class="absolute top-0 left-0 bg-blue-500 text-white p-2">top-0 left-0</div>
      <div class="absolute top-4 right-8 bg-red-500 text-white p-2">top-4 right-8</div>
      <div class="absolute bottom-0 left-1/2 bg-green-500 text-white p-2">bottom-0 left-1/2</div>
      <div class="absolute bottom-4 right-0 bg-purple-500 text-white p-2">bottom-4 right-0</div>
    </div>
  </body>
</html>
```

::

### Shorthand Inset Classes

Use `inset-*` to set all four directions at once:

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
    <title>Inset Shorthand</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body>
    <div class="relative bg-gray-100 h-64 p-8">
      <div class="absolute inset-4 bg-blue-500 text-white p-4">
        inset-4: 16px from all sides
      </div>
    </div>
    
    <div class="relative bg-gray-200 h-64 p-8 mt-8">
      <div class="absolute inset-x-8 inset-y-4 bg-green-500 text-white p-4">
        inset-x-8 inset-y-4: 32px left/right, 16px top/bottom
      </div>
    </div>
  </body>
</html>
```

::

## Z-Index Control

Control stacking order with z-index utilities. Higher values appear on top.

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
    <title>Z-Index Control</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body>
    <div class="relative h-64 p-8">
      <div class="absolute top-8 left-8 w-32 h-32 bg-red-500 z-30 flex items-center justify-center text-white">
        z-30 (top)
      </div>
      <div class="absolute top-12 left-16 w-32 h-32 bg-blue-500 z-20 flex items-center justify-center text-white">
        z-20 (middle)
      </div>
      <div class="absolute top-16 left-24 w-32 h-32 bg-green-500 z-10 flex items-center justify-center text-white">
        z-10 (bottom)
      </div>
    </div>
  </body>
</html>
```

::

## Display Utilities

Control how elements are displayed with display utilities.

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
    <title>Display Utilities</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body>
    <div class="p-8">
      <div class="block bg-blue-500 text-white p-4 mb-4">Block element</div>
      <span class="inline-block bg-red-500 text-white p-4 mr-4">Inline-block 1</span>
      <span class="inline-block bg-green-500 text-white p-4">Inline-block 2</span>
      
      <div class="hidden bg-gray-500 p-4 mt-4">This element is hidden</div>
      
      <div class="flex bg-purple-500 text-white p-4 mt-4">
        <div class="flex-1">Flex item 1</div>
        <div class="flex-1">Flex item 2</div>
      </div>
    </div>
  </body>
</html>
```

::

## Fixed and Sticky Positioning

### Fixed Positioning

Elements with `fixed` positioning are positioned relative to the viewport.

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
    <title>Fixed Positioning</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body>
    <div class="fixed top-4 right-4 bg-blue-600 text-white p-4 rounded z-50">
      Fixed notification
    </div>
    
    <div class="fixed bottom-4 left-4 bg-green-600 text-white p-4 rounded z-50">
      Fixed chat button
    </div>
    
    <div class="h-screen p-8">
      <h1 class="text-2xl mb-4">Scroll down to see fixed elements</h1>
      <div class="h-96 bg-gray-200 p-4">Content area</div>
      <div class="h-96 bg-gray-300 p-4">More content</div>
    </div>
  </body>
</html>
```

::

### Sticky Positioning

Sticky elements stick to a position when scrolling reaches a threshold.

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
    <title>Sticky Positioning</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body>
    <div class="p-8">
      <h1 class="text-2xl mb-4">Scroll to see sticky header</h1>
      
      <div class="sticky top-0 bg-blue-600 text-white p-4 mb-4 z-10">
        Sticky navigation bar
      </div>
      
      <div class="space-y-4">
        <div class="h-64 bg-gray-200 p-4">Content section 1</div>
        <div class="h-64 bg-gray-300 p-4">Content section 2</div>
        <div class="h-64 bg-gray-200 p-4">Content section 3</div>
        <div class="h-64 bg-gray-300 p-4">Content section 4</div>
      </div>
    </div>
  </body>
</html>
```

::

## Overflow Control

Manage content overflow with overflow utilities.

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
    <title>Overflow Control</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body>
    <div class="p-8 space-y-8">
      <div class="w-64 h-32 bg-gray-100 overflow-hidden border">
        <h3 class="font-bold mb-2">Overflow Hidden</h3>
        <p>This content is much longer than the container and will be clipped when it overflows the boundaries of its parent element.</p>
      </div>
      
      <div class="w-64 h-32 bg-gray-100 overflow-scroll border">
        <h3 class="font-bold mb-2">Overflow Scroll</h3>
        <p>This content is much longer than the container and will show scrollbars when it overflows the boundaries of its parent element. You can scroll to see all content.</p>
      </div>
      
      <div class="w-64 h-32 bg-gray-100 overflow-auto border">
        <h3 class="font-bold mb-2">Overflow Auto</h3>
        <p>This content is much longer than the container and will show scrollbars only when needed, automatically managing overflow behavior.</p>
      </div>
    </div>
  </body>
</html>
```

::

## Practical Layout Example

Here's a complete example combining multiple positioning concepts:

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
    <title>Complete Layout Example</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="min-h-screen bg-gray-100">
    <!-- Fixed Header -->
    <header class="fixed top-0 left-0 right-0 bg-white shadow-md z-40">
      <div class="px-6 py-4">
        <h1 class="text-xl font-bold">My Website</h1>
      </div>
    </header>
    
    <!-- Main Content with top margin for fixed header -->
    <main class="pt-16 min-h-screen">
      <!-- Hero Section -->
      <section class="relative h-64 bg-blue-500 text-white">
        <div class="absolute inset-0 flex items-center justify-center">
          <h2 class="text-3xl font-bold">Welcome to Our Site</h2>
        </div>
        <!-- Floating Badge -->
        <div class="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm">
          New
        </div>
      </section>
      
      <!-- Content Area -->
      <section class="p-8">
        <div class="max-w-4xl mx-auto space-y-8">
          <div class="bg-white p-6 rounded shadow">
            <h3 class="text-xl font-semibold mb-4">Article 1</h3>
            <p>Content goes here...</p>
          </div>
          
          <div class="bg-white p-6 rounded shadow">
            <h3 class="text-xl font-semibold mb-4">Article 2</h3>
            <p>More content...</p>
          </div>
        </div>
      </section>
    </main>
    
    <!-- Sticky Sidebar -->
    <aside class="fixed top-20 right-4 w-64 bg-white p-4 rounded shadow hidden lg:block">
      <h4 class="font-semibold mb-4">Quick Links</h4>
      <ul class="space-y-2">
        <li><a href="#" class="text-blue-600 hover:underline">Link 1</a></li>
        <li><a href="#" class="text-blue-600 hover:underline">Link 2</a></li>
        <li><a href="#" class="text-blue-600 hover:underline">Link 3</a></li>
      </ul>
    </aside>
    
    <!-- Floating Action Button -->
    <button class="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 z-50">
      <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 12l-4-4h8l-4 4z"/>
      </svg>
    </button>
  </body>
</html>
```

::

## Key Takeaways

- **Position utilities**: `static`, `relative`, `absolute`, `fixed`, and `sticky` each serve specific layout needs
- **Inset utilities**: Control precise positioning with `top-*`, `right-*`, `bottom-*`, `left-*`, and shorthand `inset-*` classes
- **Z-index**: Manage stacking order with `z-*` utilities
- **Display utilities**: Control element behavior with `block`, `inline`, `flex`, `grid`, `hidden`, etc.
- **Overflow**: Manage content overflow with `overflow-hidden`, `overflow-scroll`, and `overflow-auto`

## What's Next?

You've mastered the fundamentals of layout and positioning in Tailwind CSS! In the next tutorial, we'll explore **Spacing and Sizing**, where you'll learn about margin, padding, width, height, and how to create consistent spacing systems throughout your designs.