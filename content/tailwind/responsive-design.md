---
title: Responsive Design
description: Learn how to create responsive layouts that adapt to different screen sizes using Tailwind CSS.
navigation:
  order: 10
---

# Responsive Design

Welcome to the Responsive Design tutorial! In this lesson, you'll learn how to use Tailwind CSS's responsive utilities to create layouts that look great on all devices. Tailwind uses a mobile-first approach, making it easy to build responsive designs.

In this tutorial, you'll learn:

- Understanding Tailwind's breakpoint system
- How to use mobile-first responsive design
- How to apply responsive utilities
- How to hide and show elements at different screen sizes

## Understanding Breakpoints

Tailwind provides five default breakpoints for responsive design.

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
    <title>Breakpoints</title>
  </head>
  <body class="p-8">
    <div class="bg-blue-500 sm:bg-green-500 md:bg-yellow-500 lg:bg-purple-500 xl:bg-red-500 2xl:bg-pink-500 text-white p-8 rounded-lg text-center text-xl font-bold">
      <p>Resize your browser window to see the color change!</p>
      <p class="mt-4 text-sm">
        Blue (default) → Green (≥640px) → Yellow (≥768px) → Purple (≥1024px) → Red (≥1280px) → Pink (≥1536px)
      </p>
    </div>
  </body>
</html>
```

::

### Explanation

- Default (no prefix): Applies to all screen sizes (0px and up)
- `sm:` (Small): Applies at 640px and up
- `md:` (Medium): Applies at 768px and up
- `lg:` (Large): Applies at 1024px and up
- `xl:` (Extra Large): Applies at 1280px and up
- `2xl:` (2X Large): Applies at 1536px and up

## Mobile-First Approach

Tailwind uses a mobile-first strategy, meaning you style for mobile first, then add styles for larger screens.

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
    <title>Mobile First</title>
  </head>
  <body class="p-8 bg-gray-50">
    <div class="space-y-6">
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-lg md:text-2xl lg:text-3xl font-bold text-gray-800">
          Responsive Typography
        </h2>
        <p class="text-sm md:text-base lg:text-lg text-gray-600 mt-2">
          This text gets larger on bigger screens. Mobile: small → Tablet: base → Desktop: large
        </p>
      </div>

      <div class="bg-white p-4 md:p-6 lg:p-8 rounded-lg shadow-md">
        <h3 class="font-bold text-gray-800">Responsive Padding</h3>
        <p class="text-gray-600 mt-2">
          This box has p-4 on mobile, p-6 on tablet, and p-8 on desktop.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div class="bg-blue-500 text-white p-4 rounded">Card 1</div>
        <div class="bg-blue-500 text-white p-4 rounded">Card 2</div>
        <div class="bg-blue-500 text-white p-4 rounded">Card 3</div>
      </div>
      <p class="text-sm text-gray-600 text-center">
        Cards: 1 column on mobile → 2 on tablet → 3 on desktop
      </p>
    </div>
  </body>
</html>
```

::

### Explanation

- Start with mobile styles (no prefix)
- Add `md:` for tablet styles
- Add `lg:` for desktop styles
- Each breakpoint overrides the previous one
- This creates a progressive enhancement approach

## Responsive Layout Examples

Create layouts that adapt to different screen sizes.

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
    <title>Responsive Layouts</title>
  </head>
  <body class="bg-gray-100">
    <!-- Responsive Navigation -->
    <nav class="bg-blue-600 text-white p-4">
      <div class="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <div class="text-2xl font-bold">Logo</div>
        <div class="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 text-center">
          <a href="#" class="hover:text-blue-200">Home</a>
          <a href="#" class="hover:text-blue-200">About</a>
          <a href="#" class="hover:text-blue-200">Services</a>
          <a href="#" class="hover:text-blue-200">Contact</a>
        </div>
      </div>
    </nav>

    <!-- Responsive Hero Section -->
    <section class="max-w-6xl mx-auto p-4 md:p-8 lg:p-12 my-8">
      <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <div class="flex flex-col lg:flex-row">
          <div class="lg:w-1/2 p-6 md:p-8 lg:p-12">
            <h1 class="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              Responsive Hero Section
            </h1>
            <p class="text-gray-600 mb-6 text-sm md:text-base">
              This layout stacks on mobile and sits side-by-side on desktop screens.
            </p>
            <button class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 w-full md:w-auto">
              Get Started
            </button>
          </div>
          <div class="lg:w-1/2 bg-gradient-to-br from-blue-400 to-purple-500 h-64 lg:h-auto"></div>
        </div>
      </div>
    </section>

    <!-- Responsive Card Grid -->
    <section class="max-w-6xl mx-auto p-4 md:p-8">
      <h2 class="text-xl md:text-2xl font-bold text-gray-800 mb-6">Featured Items</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div class="bg-white p-4 md:p-6 rounded-lg shadow-md">
          <div class="w-12 h-12 md:w-16 md:h-16 bg-blue-500 rounded-full mb-4"></div>
          <h3 class="font-bold text-gray-800 mb-2">Feature 1</h3>
          <p class="text-gray-600 text-sm">Description text that adapts to screen size.</p>
        </div>
        <div class="bg-white p-4 md:p-6 rounded-lg shadow-md">
          <div class="w-12 h-12 md:w-16 md:h-16 bg-green-500 rounded-full mb-4"></div>
          <h3 class="font-bold text-gray-800 mb-2">Feature 2</h3>
          <p class="text-gray-600 text-sm">Description text that adapts to screen size.</p>
        </div>
        <div class="bg-white p-4 md:p-6 rounded-lg shadow-md">
          <div class="w-12 h-12 md:w-16 md:h-16 bg-purple-500 rounded-full mb-4"></div>
          <h3 class="font-bold text-gray-800 mb-2">Feature 3</h3>
          <p class="text-gray-600 text-sm">Description text that adapts to screen size.</p>
        </div>
        <div class="bg-white p-4 md:p-6 rounded-lg shadow-md">
          <div class="w-12 h-12 md:w-16 md:h-16 bg-red-500 rounded-full mb-4"></div>
          <h3 class="font-bold text-gray-800 mb-2">Feature 4</h3>
          <p class="text-gray-600 text-sm">Description text that adapts to screen size.</p>
        </div>
      </div>
    </section>
  </body>
</html>
```

::

### Key Points

- Navigation stacks vertically on mobile, horizontally on tablet/desktop
- Hero section: image below text on mobile, side-by-side on large screens
- Card grid: 1 column mobile → 2 tablet → 4 desktop
- Padding and spacing increase on larger screens

## Hiding and Showing Elements

Control element visibility at different breakpoints.

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
    <title>Show and Hide</title>
  </head>
  <body class="p-8 bg-gray-50">
    <div class="max-w-4xl mx-auto space-y-8">
      <!-- Hidden on Mobile, Visible on Desktop -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h3 class="font-bold text-gray-800 mb-4">Desktop-Only Content</h3>
        <div class="hidden md:block bg-blue-100 p-4 rounded">
          <p class="text-blue-800">This content is hidden on mobile and visible on tablet/desktop (md and up).</p>
        </div>
        <div class="md:hidden bg-yellow-100 p-4 rounded">
          <p class="text-yellow-800">This content is visible only on mobile screens (below md breakpoint).</p>
        </div>
      </div>

      <!-- Visible on Mobile, Hidden on Desktop -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h3 class="font-bold text-gray-800 mb-4">Mobile-Only Content</h3>
        <div class="lg:hidden bg-green-100 p-4 rounded">
          <p class="text-green-800">This appears on mobile and tablet, hidden on large screens.</p>
        </div>
        <div class="hidden lg:block bg-purple-100 p-4 rounded">
          <p class="text-purple-800">This appears only on large screens (lg and up).</p>
        </div>
      </div>

      <!-- Hamburger Menu Example -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h3 class="font-bold text-gray-800 mb-4">Menu Example</h3>
        <div class="flex items-center justify-between">
          <span class="font-bold">MyApp</span>
          
          <!-- Mobile Hamburger Icon -->
          <button class="md:hidden bg-blue-500 text-white px-4 py-2 rounded">
            ☰ Menu
          </button>
          
          <!-- Desktop Navigation -->
          <nav class="hidden md:flex space-x-4">
            <a href="#" class="text-blue-600 hover:text-blue-800">Home</a>
            <a href="#" class="text-blue-600 hover:text-blue-800">About</a>
            <a href="#" class="text-blue-600 hover:text-blue-800">Services</a>
            <a href="#" class="text-blue-600 hover:text-blue-800">Contact</a>
          </nav>
        </div>
      </div>

      <!-- Different Layouts at Different Sizes -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h3 class="font-bold text-gray-800 mb-4">Adaptive Layout</h3>
        
        <!-- Mobile: Stack -->
        <div class="flex flex-col md:hidden space-y-4">
          <div class="bg-red-500 text-white p-4 rounded text-center">Mobile: Stacked Item 1</div>
          <div class="bg-red-500 text-white p-4 rounded text-center">Mobile: Stacked Item 2</div>
          <div class="bg-red-500 text-white p-4 rounded text-center">Mobile: Stacked Item 3</div>
        </div>
        
        <!-- Tablet/Desktop: Row -->
        <div class="hidden md:flex space-x-4">
          <div class="flex-1 bg-blue-500 text-white p-4 rounded text-center">Desktop: Row Item 1</div>
          <div class="flex-1 bg-blue-500 text-white p-4 rounded text-center">Desktop: Row Item 2</div>
          <div class="flex-1 bg-blue-500 text-white p-4 rounded text-center">Desktop: Row Item 3</div>
        </div>
      </div>
    </div>
  </body>
</html>
```

::

### Explanation

- `hidden`: Hides element at all sizes
- `md:block`: Shows element at md breakpoint and up
- `md:hidden`: Hides element at md breakpoint and up
- `lg:hidden`: Hides element at lg breakpoint and up
- Combine with other utilities for complex responsive behaviors

## Responsive Width and Height

Control dimensions at different screen sizes.

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
    <title>Responsive Dimensions</title>
  </head>
  <body class="p-8 bg-gray-50">
    <div class="max-w-6xl mx-auto space-y-8">
      <!-- Responsive Container Width -->
      <div class="w-full md:w-3/4 lg:w-1/2 bg-white p-6 rounded-lg shadow-md mx-auto">
        <h3 class="font-bold text-gray-800 mb-2">Responsive Width Container</h3>
        <p class="text-gray-600 text-sm">
          Full width on mobile → 75% on tablet → 50% on desktop
        </p>
      </div>

      <!-- Responsive Heights -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="h-32 md:h-48 lg:h-64 bg-gradient-to-br from-pink-400 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold">
          Growing Height
        </div>
        <div class="h-32 md:h-48 lg:h-64 bg-gradient-to-br from-blue-400 to-teal-500 rounded-lg flex items-center justify-center text-white font-bold">
          Growing Height
        </div>
        <div class="h-32 md:h-48 lg:h-64 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center text-white font-bold">
          Growing Height
        </div>
      </div>
      <p class="text-sm text-gray-600 text-center">Height: 32 (mobile) → 48 (tablet) → 64 (desktop)</p>

      <!-- Responsive Max Width -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h3 class="font-bold text-gray-800 mb-4">Responsive Max Width</h3>
        <div class="max-w-sm md:max-w-2xl lg:max-w-4xl mx-auto bg-yellow-100 p-4 rounded">
          <p class="text-yellow-800 text-center">
            This box has different max-widths: sm (mobile) → 2xl (tablet) → 4xl (desktop)
          </p>
        </div>
      </div>

      <!-- Responsive Aspect Ratios -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 class="font-bold mb-2">Square on Mobile, Video on Desktop</h4>
          <div class="aspect-square md:aspect-video bg-gradient-to-br from-green-400 to-blue-500 rounded-lg"></div>
        </div>
        <div>
          <h4 class="font-bold mb-2">Video on Mobile, Square on Desktop</h4>
          <div class="aspect-video md:aspect-square bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg"></div>
        </div>
      </div>
    </div>
  </body>
</html>
```

::

### Explanation

- `w-full md:w-3/4 lg:w-1/2`: Width changes at breakpoints
- `h-32 md:h-48 lg:h-64`: Height increases on larger screens
- `max-w-sm md:max-w-2xl`: Max width constrains content differently
- `aspect-square md:aspect-video`: Aspect ratio changes with screen size

## Responsive Typography and Spacing

Scale text and spacing for different devices.

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
    <title>Responsive Typography</title>
  </head>
  <body class="bg-gray-50">
    <div class="max-w-4xl mx-auto p-4 md:p-8 lg:p-12">
      <!-- Responsive Heading Sizes -->
      <section class="bg-white p-6 md:p-8 lg:p-10 rounded-lg shadow-md mb-8">
        <h1 class="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-800 mb-4">
          Scalable Heading
        </h1>
        <h2 class="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-700 mb-4">
          Subheading That Grows
        </h2>
        <p class="text-sm md:text-base lg:text-lg text-gray-600 leading-relaxed">
          This paragraph text starts small on mobile and increases to base size on tablet and large size on desktop. 
          The line height and overall readability improve as the screen size increases.
        </p>
      </section>

      <!-- Responsive Margins and Padding -->
      <section class="bg-white rounded-lg shadow-md">
        <div class="p-4 md:p-6 lg:p-8 xl:p-10 space-y-2 md:space-y-4 lg:space-y-6">
          <div class="bg-blue-100 p-3 md:p-4 lg:p-6 rounded">
            <p class="text-blue-800 text-sm md:text-base">Box 1: Padding increases with screen size</p>
          </div>
          <div class="bg-green-100 p-3 md:p-4 lg:p-6 rounded">
            <p class="text-green-800 text-sm md:text-base">Box 2: Space between boxes also increases</p>
          </div>
          <div class="bg-purple-100 p-3 md:p-4 lg:p-6 rounded">
            <p class="text-purple-800 text-sm md:text-base">Box 3: Better readability on larger screens</p>
          </div>
        </div>
      </section>

      <!-- Responsive Gap in Grid -->
      <section class="mt-8">
        <h3 class="text-lg md:text-xl lg:text-2xl font-bold text-gray-800 mb-4">Responsive Grid Gap</h3>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 lg:gap-6">
          <div class="bg-red-500 text-white p-4 rounded text-center text-sm md:text-base">1</div>
          <div class="bg-red-500 text-white p-4 rounded text-center text-sm md:text-base">2</div>
          <div class="bg-red-500 text-white p-4 rounded text-center text-sm md:text-base">3</div>
          <div class="bg-red-500 text-white p-4 rounded text-center text-sm md:text-base">4</div>
          <div class="bg-red-500 text-white p-4 rounded text-center text-sm md:text-base">5</div>
          <div class="bg-red-500 text-white p-4 rounded text-center text-sm md:text-base">6</div>
        </div>
        <p class="text-xs md:text-sm text-gray-600 text-center mt-4">
          Gap: 0.5rem (mobile) → 1rem (tablet) → 1.5rem (desktop)
        </p>
      </section>
    </div>
  </body>
</html>
```

::

### Explanation

- Text sizes increase progressively: `text-3xl md:text-4xl lg:text-5xl`
- Padding scales up: `p-4 md:p-6 lg:p-8`
- Spacing between elements grows: `space-y-2 md:space-y-4 lg:space-y-6`
- Grid gaps increase: `gap-2 md:gap-4 lg:gap-6`

## Best Practices

- Always design mobile-first, then enhance for larger screens
- Use `max-w-*` utilities to constrain content width on large screens
- Test your designs at all breakpoints (use browser dev tools)
- Use `hidden` and `block` sparingly - prefer responsive layouts over hiding content
- Increase padding and spacing on larger screens for better readability
- Scale typography appropriately: headings can grow more dramatically than body text
- Use `sm:` sparingly - often mobile and small tablet can share the same layout
- Consider using `container` class with `mx-auto` for centered, constrained layouts
- Use responsive grid columns: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Stack elements vertically on mobile, display horizontally on desktop

## What's Next?

You've mastered Responsive Design in Tailwind CSS! In the next tutorial, we'll explore **Hover, Focus, and State Variants**, learning how to style interactive elements and create engaging user experiences.