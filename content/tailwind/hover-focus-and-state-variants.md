---
title: Hover, Focus, and State Variants
description: Learn how to style interactive elements using hover, focus, and other state variants in Tailwind CSS.
navigation:
  order: 11
---

# Hover, Focus, and State Variants

Welcome to the Hover, Focus, and State Variants tutorial! In this lesson, you'll learn how to add interactivity to your elements using Tailwind's state variant utilities. These utilities help you create engaging user experiences by styling elements based on user interactions.

In this tutorial, you'll learn:

- How to use hover states for interactive elements
- How to apply focus states for accessibility
- How to use active, disabled, and other state variants
- How to combine state variants with responsive design

## Hover States

Add hover effects to make elements interactive and engaging.

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
    <title>Hover States</title>
  </head>
  <body class="p-8 bg-gray-50">
    <div class="max-w-4xl mx-auto space-y-6">
      <!-- Hover Background Color -->
      <button class="bg-blue-500 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition">
        Hover for Darker Blue
      </button>

      <!-- Hover Text Color -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h3 class="text-gray-800 hover:text-blue-600 font-bold cursor-pointer transition">
          Hover to Change Text Color
        </h3>
      </div>

      <!-- Hover Shadow -->
      <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition cursor-pointer">
        <p class="text-gray-600">Hover to see shadow increase</p>
      </div>

      <!-- Hover Scale -->
      <div class="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-lg hover:scale-105 transition transform cursor-pointer">
        <p class="font-semibold">Hover to Scale Up</p>
      </div>

      <!-- Hover Border -->
      <div class="border-2 border-gray-300 hover:border-blue-500 p-6 rounded-lg transition cursor-pointer">
        <p class="text-gray-600">Hover to change border color</p>
      </div>

      <!-- Multiple Hover Effects -->
      <button class="bg-green-500 hover:bg-green-600 hover:shadow-lg hover:scale-105 text-white px-8 py-3 rounded-lg font-semibold transition transform">
        Multiple Hover Effects
      </button>
    </div>
  </body>
</html>
```

::

### Explanation

- `hover:bg-blue-700`: Changes background color on hover
- `hover:text-blue-600`: Changes text color on hover
- `hover:shadow-xl`: Increases shadow on hover
- `hover:scale-105`: Scales element to 105% on hover
- `hover:border-blue-500`: Changes border color on hover
- Add `transition` for smooth animations between states

## Focus States

Use focus states to improve accessibility and user experience for keyboard navigation.

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
    <title>Focus States</title>
  </head>
  <body class="p-8 bg-gray-50">
    <div class="max-w-2xl mx-auto space-y-6">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">Try tabbing through these elements</h2>
      
      <!-- Focus Ring -->
      <button class="bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 text-white px-6 py-3 rounded-lg font-semibold transition">
        Focus Ring on Tab
      </button>

      <!-- Focus Outline -->
      <button class="bg-purple-500 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 text-white px-6 py-3 rounded-lg font-semibold transition">
        Focus with Ring Offset
      </button>

      <!-- Input Focus -->
      <input 
        type="text" 
        placeholder="Click or tab to focus"
        class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-200 focus:outline-none transition"
      />

      <!-- Textarea Focus -->
      <textarea 
        placeholder="Focus on this textarea"
        rows="4"
        class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-4 focus:ring-green-200 focus:outline-none transition resize-none"
      ></textarea>

      <!-- Focus Within (Parent styles when child is focused) -->
      <div class="border-2 border-gray-300 focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-200 rounded-lg p-4 transition">
        <label class="block text-gray-700 font-semibold mb-2">Email Address</label>
        <input 
          type="email" 
          placeholder="Enter your email"
          class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
        />
      </div>

      <!-- Links with Focus -->
      <div class="bg-white p-6 rounded-lg shadow-md space-y-2">
        <a href="#" class="block text-blue-600 hover:text-blue-800 focus:text-blue-800 focus:underline focus:outline-none">
          Link with focus state
        </a>
        <a href="#" class="block text-blue-600 hover:text-blue-800 focus:ring-2 focus:ring-blue-400 focus:outline-none rounded px-2 py-1">
          Link with focus ring
        </a>
      </div>
    </div>
  </body>
</html>
```

::

### Explanation

- `focus:ring-4`: Adds a ring around element when focused
- `focus:ring-blue-300`: Sets the ring color
- `focus:ring-offset-2`: Adds space between element and ring
- `focus:border-blue-500`: Changes border color on focus
- `focus:outline-none`: Removes default browser outline
- `focus-within:`: Styles parent when any child is focused

## Active States

Style elements when they're being actively clicked or pressed.

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
    <title>Active States</title>
  </head>
  <body class="p-8 bg-gray-50">
    <div class="max-w-4xl mx-auto space-y-6">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">Click and hold these buttons</h2>

      <!-- Active Background -->
      <button class="bg-blue-500 hover:bg-blue-600 active:bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold transition">
        Click Me (Active State)
      </button>

      <!-- Active Scale -->
      <button class="bg-green-500 hover:bg-green-600 active:scale-95 text-white px-6 py-3 rounded-lg font-semibold transition transform">
        Press Down Effect
      </button>

      <!-- Active Shadow -->
      <button class="bg-purple-500 hover:bg-purple-600 shadow-lg active:shadow-sm text-white px-6 py-3 rounded-lg font-semibold transition">
        Shadow Reduces on Click
      </button>

      <!-- Combined States -->
      <button class="bg-red-500 hover:bg-red-600 active:bg-red-700 active:scale-95 focus:ring-4 focus:ring-red-300 text-white px-8 py-3 rounded-lg font-semibold transition transform">
        All States Combined
      </button>

      <!-- Card with Active State -->
      <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg active:shadow-sm active:scale-[0.98] transition transform cursor-pointer">
        <h3 class="font-bold text-gray-800 mb-2">Clickable Card</h3>
        <p class="text-gray-600">Click this card to see the active state</p>
      </div>
    </div>
  </body>
</html>
```

::

### Explanation

- `active:bg-blue-800`: Darker background when clicked
- `active:scale-95`: Shrinks to 95% when pressed
- `active:shadow-sm`: Reduces shadow when active
- Active states provide immediate tactile feedback
- Combine with hover and focus for complete interactivity

## Disabled States

Style elements that are disabled or non-interactive.

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
    <title>Disabled States</title>
  </head>
  <body class="p-8 bg-gray-50">
    <div class="max-w-2xl mx-auto space-y-6">
      <!-- Disabled Button -->
      <div class="space-y-4">
        <button class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition">
          Enabled Button
        </button>
        <button disabled class="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold opacity-50 cursor-not-allowed">
          Disabled Button (opacity)
        </button>
        <button disabled class="bg-gray-300 disabled:bg-gray-400 disabled:text-gray-500 disabled:cursor-not-allowed px-6 py-3 rounded-lg font-semibold">
          Disabled with Variant
        </button>
      </div>

      <!-- Disabled Inputs -->
      <div class="space-y-4">
        <input 
          type="text" 
          placeholder="Enabled input"
          class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-200 focus:outline-none transition"
        />
        <input 
          type="text" 
          placeholder="Disabled input"
          disabled
          class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
        />
      </div>

      <!-- Disabled Checkbox -->
      <div class="bg-white p-6 rounded-lg shadow-md space-y-4">
        <label class="flex items-center space-x-3 cursor-pointer">
          <input type="checkbox" class="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500" />
          <span class="text-gray-800">Enabled checkbox</span>
        </label>
        <label class="flex items-center space-x-3 cursor-not-allowed">
          <input type="checkbox" disabled class="w-5 h-5 text-blue-600 rounded disabled:opacity-50 disabled:cursor-not-allowed" />
          <span class="text-gray-500">Disabled checkbox</span>
        </label>
      </div>

      <!-- Disabled Links -->
      <div class="space-y-2">
        <a href="#" class="block text-blue-600 hover:text-blue-800 hover:underline">
          Active link
        </a>
        <span class="block text-gray-400 cursor-not-allowed">
          Disabled link (using span)
        </span>
      </div>
    </div>
  </body>
</html>
```

::

### Explanation

- `disabled`: HTML attribute to disable interactive elements
- `disabled:bg-gray-400`: Styles applied only when disabled
- `disabled:cursor-not-allowed`: Shows not-allowed cursor
- `opacity-50`: Quick way to show disabled state
- Use `cursor-not-allowed` to indicate non-interactive elements

## Group Hover

Style child elements when hovering over parent.

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
    <title>Group Hover</title>
  </head>
  <body class="p-8 bg-gray-50">
    <div class="max-w-4xl mx-auto space-y-6">
      <!-- Basic Group Hover -->
      <div class="group bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition cursor-pointer">
        <h3 class="text-gray-800 group-hover:text-blue-600 font-bold transition">
          Hover the card to change this text
        </h3>
        <p class="text-gray-600 group-hover:text-gray-800 transition">
          This paragraph also changes on card hover
        </p>
      </div>

      <!-- Card with Icon and Group Hover -->
      <div class="group bg-white p-6 rounded-lg shadow-md hover:shadow-xl hover:bg-blue-50 transition cursor-pointer">
        <div class="flex items-center space-x-4">
          <div class="w-12 h-12 bg-blue-500 group-hover:bg-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold transition">
            →
          </div>
          <div>
            <h3 class="font-bold text-gray-800 group-hover:text-blue-600 transition">Feature Title</h3>
            <p class="text-gray-600 group-hover:text-gray-700 text-sm transition">Hover to see everything change</p>
          </div>
        </div>
      </div>

      <!-- Product Card with Group Hover -->
      <div class="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer">
        <div class="h-48 bg-gradient-to-br from-purple-400 to-pink-500 group-hover:scale-110 transition transform"></div>
        <div class="p-6">
          <h3 class="font-bold text-gray-800 group-hover:text-purple-600 transition">Product Name</h3>
          <p class="text-gray-600 text-sm mt-2">Hover to zoom image and change text color</p>
          <div class="mt-4 flex items-center justify-between">
            <span class="text-2xl font-bold text-gray-800">$99</span>
            <button class="bg-purple-500 group-hover:bg-purple-600 text-white px-4 py-2 rounded transition">
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <!-- Navigation with Group Hover -->
      <nav class="bg-white rounded-lg shadow-md p-4">
        <div class="flex space-x-2">
          <a href="#" class="group px-4 py-2 rounded-lg hover:bg-blue-50 transition">
            <span class="text-gray-700 group-hover:text-blue-600 font-semibold transition">Home</span>
          </a>
          <a href="#" class="group px-4 py-2 rounded-lg hover:bg-blue-50 transition">
            <span class="text-gray-700 group-hover:text-blue-600 font-semibold transition">About</span>
          </a>
          <a href="#" class="group px-4 py-2 rounded-lg hover:bg-blue-50 transition">
            <span class="text-gray-700 group-hover:text-blue-600 font-semibold transition">Services</span>
          </a>
        </div>
      </nav>

      <!-- List with Group Hover -->
      <div class="bg-white rounded-lg shadow-md divide-y">
        <div class="group p-4 hover:bg-gray-50 transition cursor-pointer flex items-center justify-between">
          <span class="text-gray-800 group-hover:text-blue-600 transition">List Item 1</span>
          <span class="text-gray-400 group-hover:text-blue-500 transition">→</span>
        </div>
        <div class="group p-4 hover:bg-gray-50 transition cursor-pointer flex items-center justify-between">
          <span class="text-gray-800 group-hover:text-blue-600 transition">List Item 2</span>
          <span class="text-gray-400 group-hover:text-blue-500 transition">→</span>
        </div>
        <div class="group p-4 hover:bg-gray-50 transition cursor-pointer flex items-center justify-between">
          <span class="text-gray-800 group-hover:text-blue-600 transition">List Item 3</span>
          <span class="text-gray-400 group-hover:text-blue-500 transition">→</span>
        </div>
      </div>
    </div>
  </body>
</html>
```

::

### Explanation

- Add `group` class to parent element
- Use `group-hover:` prefix on children to style when parent is hovered
- Multiple children can respond to parent hover
- Useful for cards, navigation items, and list items
- Combine with transitions for smooth effects

## Combining State Variants

Create sophisticated interactions by combining multiple state variants.

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
    <title>Combined States</title>
  </head>
  <body class="p-8 bg-gray-50">
    <div class="max-w-4xl mx-auto space-y-6">
      <!-- Button with All States -->
      <button class="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:ring-4 focus:ring-blue-300 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-semibold transition">
        All States Button
      </button>

      <!-- Form with Multiple States -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <form class="space-y-4">
          <div>
            <label class="block text-gray-700 font-semibold mb-2">Username</label>
            <input 
              type="text"
              placeholder="Enter username"
              class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg hover:border-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed transition"
            />
          </div>
          
          <div>
            <label class="block text-gray-700 font-semibold mb-2">Email</label>
            <input 
              type="email"
              placeholder="Enter email"
              class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg hover:border-gray-400 focus:border-green-500 focus:ring-4 focus:ring-green-200 focus:outline-none transition"
            />
          </div>

          <button 
            type="submit"
            class="w-full bg-green-500 hover:bg-green-600 active:bg-green-700 focus:ring-4 focus:ring-green-300 text-white py-3 rounded-lg font-semibold transition"
          >
            Submit
          </button>
        </form>
      </div>

      <!-- Interactive Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="group bg-white p-6 rounded-lg shadow-md hover:shadow-xl active:shadow-sm focus:ring-4 focus:ring-blue-300 transition transform hover:scale-105 active:scale-100 cursor-pointer tabindex="0">
          <div class="w-12 h-12 bg-blue-500 group-hover:bg-blue-600 rounded-full mb-4 transition"></div>
          <h3 class="font-bold text-gray-800 group-hover:text-blue-600 transition">Card 1</h3>
          <p class="text-gray-600 text-sm mt-2">Hover, click, and tab to this card</p>
        </div>

        <div class="group bg-white p-6 rounded-lg shadow-md hover:shadow-xl active:shadow-sm focus:ring-4 focus:ring-green-300 transition transform hover:scale-105 active:scale-100 cursor-pointer tabindex="0">
          <div class="w-12 h-12 bg-green-500 group-hover:bg-green-600 rounded-full mb-4 transition"></div>
          <h3 class="font-bold text-gray-800 group-hover:text-green-600 transition">Card 2</h3>
          <p class="text-gray-600 text-sm mt-2">Interactive with all states</p>
        </div>

        <div class="group bg-white p-6 rounded-lg shadow-md hover:shadow-xl active:shadow-sm focus:ring-4 focus:ring-purple-300 transition transform hover:scale-105 active:scale-100 cursor-pointer tabindex="0">
          <div class="w-12 h-12 bg-purple-500 group-hover:bg-purple-600 rounded-full mb-4 transition"></div>
          <h3 class="font-bold text-gray-800 group-hover:text-purple-600 transition">Card 3</h3>
          <p class="text-gray-600 text-sm mt-2">Full interaction support</p>
        </div>
      </div>
    </div>
  </body>
</html>
```

::

### Explanation

- Combine `hover:`, `focus:`, `active:`, and `disabled:` on same element
- Each state can modify different properties
- Order matters: later states can override earlier ones
- Always include focus states for accessibility
- Use transitions to smooth state changes

## Best Practices

- Always add `transition` class for smooth state changes
- Include focus states for keyboard accessibility
- Use `focus:ring-*` for visible focus indicators
- Combine `hover:` and `active:` for better feedback
- Use `group-hover:` for coordinated child animations
- Add `cursor-pointer` to clickable elements
- Use `cursor-not-allowed` for disabled elements
- Don't forget mobile: hover doesn't work on touch devices
- Test keyboard navigation with Tab key
- Provide clear visual feedback for all interactive states
- Use subtle hover effects, avoid overwhelming animations
- Consider using `focus-visible:` for keyboard-only focus styles

## What's Next?

You've mastered Hover, Focus, and State Variants! In the next tutorial, we'll explore **Pseudo-classes and Pseudo-elements**, learning advanced selectors like first-child, last-child, before, and after to create even more sophisticated designs.